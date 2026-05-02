import { categoryByCode } from "@/lib/proposals";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { updateStatusSchema } from "@/lib/validators";
import { getProposalBySlug, updateProposalStatus } from "@/db/queries";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await ctx.params;
  const cat = categoryByCode(category);
  if (!cat) return error("Unknown category.", 404);

  const proposal = await getProposalBySlug(cat.code, slug);
  if (!proposal) return error("Proposal not found.", 404);
  return json({ proposal });
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ category: string; slug: string }> }
) {
  try {
    const denied = requireAdmin(req);
    if (denied) return denied;

    const { category, slug } = await ctx.params;
    const cat = categoryByCode(category);
    if (!cat) return error("Unknown category.", 404);

    const parsed = await parseJson(req, updateStatusSchema);
    if (!parsed.ok) return parsed.response;

    const updated = await updateProposalStatus(
      cat.code,
      slug,
      parsed.data.status
    );
    if (!updated) return error("Proposal not found.", 404);
    return json({ proposal: updated });
  } catch (e) {
    console.error("[PATCH /api/proposals/.../...] failed:", e);

    // Drizzle wraps the postgres.js error and puts it on `cause`. The wrapper
    // message looks like "Failed query: <sql>" — we want the inner Postgres
    // error message (e.g. "invalid input value for enum status: 'Idea'").
    const wrapper = e instanceof Error ? e.message : "";
    const cause = (e as { cause?: unknown })?.cause;
    const causeMessage =
      cause instanceof Error
        ? cause.message
        : cause && typeof cause === "object" && "message" in cause
          ? String((cause as { message: unknown }).message)
          : "";
    const combined = `${causeMessage} ${wrapper}`;

    if (/invalid input value for enum/i.test(combined)) {
      return error(
        "Database is out of sync with the app — the `status` enum doesn't have the new lifecycle values. Run `npm run db:migrate` to apply the pending migration, then retry.",
        500
      );
    }

    return error(causeMessage || wrapper || "Failed to update proposal.", 500);
  }
}
