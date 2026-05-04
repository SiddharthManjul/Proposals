import { categoryByCode } from "@/lib/proposals";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { updateProposalSchema } from "@/lib/validators";
import {
  deleteProposal,
  getProposalBySlug,
  setProposalHidden,
  updateProposalStatus,
} from "@/db/queries";

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

    const parsed = await parseJson(req, updateProposalSchema);
    if (!parsed.ok) return parsed.response;

    let updated = null;

    if (parsed.data.hidden !== undefined) {
      updated = await setProposalHidden(cat.code, slug, parsed.data.hidden);
      if (!updated) return error("Proposal not found.", 404);
    }

    if (parsed.data.status !== undefined) {
      updated = await updateProposalStatus(
        cat.code,
        slug,
        parsed.data.status
      );
      if (!updated) return error("Proposal not found.", 404);
    }

    if (!updated) return error("No changes.", 400);
    return json({ proposal: updated });
  } catch (e) {
    console.error("[PATCH /api/proposals/.../...] failed:", e);

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
        "Database is out of sync with the app — run `npm run db:migrate` to apply the pending migration, then retry.",
        500
      );
    }

    return error(causeMessage || wrapper || "Failed to update proposal.", 500);
  }
}

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ category: string; slug: string }> }
) {
  try {
    const denied = requireAdmin(req);
    if (denied) return denied;

    const { category, slug } = await ctx.params;
    const cat = categoryByCode(category);
    if (!cat) return error("Unknown category.", 404);

    const ok = await deleteProposal(cat.code, slug);
    if (!ok) return error("Proposal not found.", 404);
    return json({ ok: true });
  } catch (e) {
    console.error("[DELETE /api/proposals/.../...] failed:", e);
    const wrapper = e instanceof Error ? e.message : "";
    const cause = (e as { cause?: unknown })?.cause;
    const causeMessage =
      cause instanceof Error ? cause.message : "";
    return error(causeMessage || wrapper || "Failed to delete proposal.", 500);
  }
}
