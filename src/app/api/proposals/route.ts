import { categoryByCode } from "@/lib/proposals";
import { error, json, parseJson } from "@/lib/api";
import { createProposalSchema } from "@/lib/validators";
import {
  createProposal,
  listProposals,
  listProposalsSortedByUpdated,
} from "@/db/queries";
import { ADMIN_COOKIE, readCookie, verifySession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryParam = searchParams.get("category");
  const sort = searchParams.get("sort");
  const includeHiddenParam = searchParams.get("includeHidden") === "1";

  // Only honour includeHidden when the request comes from an authed admin.
  const isAdmin = !!verifySession(readCookie(req, ADMIN_COOKIE));
  const includeHidden = includeHiddenParam && isAdmin;

  if (categoryParam) {
    const cat = categoryByCode(categoryParam);
    if (!cat) return error("Unknown category.", 404);
    const list = await listProposals({ category: cat.code, includeHidden });
    return json({ proposals: list });
  }

  if (sort === "updated") {
    const list = await listProposalsSortedByUpdated({ includeHidden });
    return json({ proposals: list });
  }

  const list = await listProposals({ includeHidden });
  return json({ proposals: list });
}

export async function POST(req: Request) {
  const parsed = await parseJson(req, createProposalSchema);
  if (!parsed.ok) return parsed.response;

  try {
    const proposal = await createProposal(parsed.data);
    return json({ proposal }, 201);
  } catch (e) {
    const msg =
      e instanceof Error && /duplicate|unique/i.test(e.message)
        ? "A proposal with that slug already exists in this category."
        : "Failed to create proposal.";
    const status = msg.startsWith("A proposal") ? 409 : 500;
    return error(msg, status);
  }
}
