import { categoryByCode } from "@/lib/proposals";
import { error, json, parseJson } from "@/lib/api";
import { createCommentSchema } from "@/lib/validators";
import { addComment, getProposalIdBySlug } from "@/db/queries";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  ctx: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await ctx.params;
  const cat = categoryByCode(category);
  if (!cat) return error("Unknown category.", 404);

  const parsed = await parseJson(req, createCommentSchema);
  if (!parsed.ok) return parsed.response;

  const proposalId = await getProposalIdBySlug(cat.code, slug);
  if (!proposalId) return error("Proposal not found.", 404);

  try {
    const comment = await addComment(proposalId, parsed.data);
    return json({ comment }, 201);
  } catch (e) {
    const msg =
      e instanceof Error ? e.message : "Failed to add comment.";
    const status = /not found|do not match|one level/i.test(msg) ? 400 : 500;
    return error(msg, status);
  }
}
