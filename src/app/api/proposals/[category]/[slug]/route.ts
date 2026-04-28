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
  const denied = requireAdmin(req);
  if (denied) return denied;

  const { category, slug } = await ctx.params;
  const cat = categoryByCode(category);
  if (!cat) return error("Unknown category.", 404);

  const parsed = await parseJson(req, updateStatusSchema);
  if (!parsed.ok) return parsed.response;

  const updated = await updateProposalStatus(cat.code, slug, parsed.data.status);
  if (!updated) return error("Proposal not found.", 404);
  return json({ proposal: updated });
}
