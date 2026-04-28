import { categoryByCode } from "@/lib/proposals";
import { error, json, parseJson } from "@/lib/api";
import { createProposalSchema } from "@/lib/validators";
import {
  createProposal,
  listProposals,
  listProposalsSortedByUpdated,
} from "@/db/queries";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryParam = searchParams.get("category");
  const sort = searchParams.get("sort");

  if (categoryParam) {
    const cat = categoryByCode(categoryParam);
    if (!cat) return error("Unknown category.", 404);
    const list = await listProposals({ category: cat.code });
    return json({ proposals: list });
  }

  if (sort === "updated") {
    const list = await listProposalsSortedByUpdated();
    return json({ proposals: list });
  }

  const list = await listProposals();
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
