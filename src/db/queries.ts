import { and, asc, desc, eq, max, sql } from "drizzle-orm";

import { db } from "./index";
import { admins, comments, proposals } from "./schema";
import type {
  Category,
  Comment,
  Kind,
  Proposal,
  ProposalSection,
  Status,
} from "@/lib/proposals";
import type { CommentRow, ProposalRow } from "./schema";

function toIso(d: Date | string): string {
  return d instanceof Date ? d.toISOString() : new Date(d).toISOString();
}

function rowToProposal(row: ProposalRow, discussion: Comment[]): Proposal {
  return {
    number: row.number,
    category: row.category as Category,
    kind: row.kind as Kind,
    slug: row.slug,
    title: row.title,
    abstract: row.abstract,
    status: row.status as Status,
    author: row.author,
    authorHandle: row.authorHandle,
    posted: toIso(row.posted),
    updated: toIso(row.updated),
    readingMinutes: row.readingMinutes,
    hidden: row.hidden,
    body: row.body as ProposalSection[],
    discussion,
  };
}

function buildThread(rows: CommentRow[]): Comment[] {
  const byId = new Map<string, Comment>();
  rows.forEach((r) => {
    byId.set(r.id, {
      id: r.id,
      author: r.author,
      handle: r.handle,
      date: toIso(r.createdAt),
      body: r.body,
      replies: [],
    });
  });

  const roots: Comment[] = [];
  rows.forEach((r) => {
    const node = byId.get(r.id)!;
    if (r.parentId) {
      const parent = byId.get(r.parentId);
      if (parent) {
        parent.replies = parent.replies ?? [];
        parent.replies.push(node);
        return;
      }
    }
    roots.push(node);
  });

  roots.forEach((r) => {
    if (r.replies && r.replies.length === 0) delete r.replies;
  });
  return roots;
}

async function loadDiscussionsByProposalIds(
  ids: string[]
): Promise<Map<string, Comment[]>> {
  if (ids.length === 0) return new Map();
  const rows = await db
    .select()
    .from(comments)
    .where(sql`${comments.proposalId} IN ${ids}`)
    .orderBy(asc(comments.createdAt));

  const grouped = new Map<string, CommentRow[]>();
  rows.forEach((r) => {
    const list = grouped.get(r.proposalId) ?? [];
    list.push(r);
    grouped.set(r.proposalId, list);
  });
  const out = new Map<string, Comment[]>();
  grouped.forEach((list, pid) => out.set(pid, buildThread(list)));
  return out;
}

export async function listProposals(opts?: {
  category?: Category;
  includeHidden?: boolean;
}): Promise<Proposal[]> {
  const filters = [];
  if (opts?.category) filters.push(eq(proposals.category, opts.category));
  if (!opts?.includeHidden) filters.push(eq(proposals.hidden, false));
  const where =
    filters.length === 0
      ? undefined
      : filters.length === 1
        ? filters[0]
        : and(...filters);

  const rows = await db
    .select()
    .from(proposals)
    .where(where)
    .orderBy(asc(proposals.number));

  const ids = rows.map((r) => r.id);
  const discussions = await loadDiscussionsByProposalIds(ids);

  return rows.map((r) => rowToProposal(r, discussions.get(r.id) ?? []));
}

export async function listProposalsSortedByUpdated(opts?: {
  includeHidden?: boolean;
}): Promise<Proposal[]> {
  const where = opts?.includeHidden ? undefined : eq(proposals.hidden, false);
  const rows = await db
    .select()
    .from(proposals)
    .where(where)
    .orderBy(desc(proposals.updated));
  const ids = rows.map((r) => r.id);
  const discussions = await loadDiscussionsByProposalIds(ids);
  return rows.map((r) => rowToProposal(r, discussions.get(r.id) ?? []));
}

export async function getProposalBySlug(
  category: string,
  slug: string,
  opts?: { includeHidden?: boolean }
): Promise<Proposal | null> {
  const upper = category.toUpperCase() as Category;
  const filters = [eq(proposals.category, upper), eq(proposals.slug, slug)];
  if (!opts?.includeHidden) filters.push(eq(proposals.hidden, false));
  const [row] = await db
    .select()
    .from(proposals)
    .where(and(...filters))
    .limit(1);
  if (!row) return null;

  const cmts = await db
    .select()
    .from(comments)
    .where(eq(comments.proposalId, row.id))
    .orderBy(asc(comments.createdAt));

  return rowToProposal(row, buildThread(cmts));
}

export async function nextNumberForCategory(
  category: Category
): Promise<number> {
  const [row] = await db
    .select({ max: max(proposals.number) })
    .from(proposals)
    .where(eq(proposals.category, category));
  return (row?.max ?? 0) + 1;
}

export async function createProposal(input: {
  category: Category;
  kind?: Kind;
  slug: string;
  title: string;
  abstract: string;
  author: string;
  authorHandle: string;
  body: ProposalSection[];
  status?: Status;
  readingMinutes?: number;
}): Promise<Proposal> {
  return await db.transaction(async (tx) => {
    const [maxRow] = await tx
      .select({ max: max(proposals.number) })
      .from(proposals)
      .where(eq(proposals.category, input.category));
    const nextNumber = (maxRow?.max ?? 0) + 1;

    const [row] = await tx
      .insert(proposals)
      .values({
        number: nextNumber,
        category: input.category,
        kind: input.kind ?? "Idea",
        slug: input.slug,
        title: input.title,
        abstract: input.abstract,
        author: input.author,
        authorHandle: input.authorHandle,
        body: input.body,
        status: input.status ?? "Idea",
        readingMinutes: input.readingMinutes ?? 3,
      })
      .returning();

    return rowToProposal(row, []);
  });
}

export async function updateProposalStatus(
  category: string,
  slug: string,
  status: Status
): Promise<Proposal | null> {
  const upper = category.toUpperCase() as Category;
  const [row] = await db
    .update(proposals)
    .set({ status, updated: new Date() })
    .where(and(eq(proposals.category, upper), eq(proposals.slug, slug)))
    .returning();
  if (!row) return null;
  const cmts = await db
    .select()
    .from(comments)
    .where(eq(comments.proposalId, row.id))
    .orderBy(asc(comments.createdAt));
  return rowToProposal(row, buildThread(cmts));
}

export async function setProposalHidden(
  category: string,
  slug: string,
  hidden: boolean
): Promise<Proposal | null> {
  const upper = category.toUpperCase() as Category;
  const [row] = await db
    .update(proposals)
    .set({ hidden, updated: new Date() })
    .where(and(eq(proposals.category, upper), eq(proposals.slug, slug)))
    .returning();
  if (!row) return null;
  const cmts = await db
    .select()
    .from(comments)
    .where(eq(comments.proposalId, row.id))
    .orderBy(asc(comments.createdAt));
  return rowToProposal(row, buildThread(cmts));
}

export async function deleteProposal(
  category: string,
  slug: string
): Promise<boolean> {
  const upper = category.toUpperCase() as Category;
  const result = await db
    .delete(proposals)
    .where(and(eq(proposals.category, upper), eq(proposals.slug, slug)))
    .returning({ id: proposals.id });
  return result.length > 0;
}

export async function addComment(
  proposalId: string,
  input: { author: string; handle: string; body: string; parentId?: string }
): Promise<CommentRow> {
  return await db.transaction(async (tx) => {
    if (input.parentId) {
      const [parent] = await tx
        .select({ id: comments.id, parent: comments.parentId, prop: comments.proposalId })
        .from(comments)
        .where(eq(comments.id, input.parentId))
        .limit(1);
      if (!parent) throw new Error("Parent comment not found");
      if (parent.prop !== proposalId)
        throw new Error("Parent comment does not belong to this proposal");
      if (parent.parent)
        throw new Error("Replies are limited to one level deep");
    }

    const [row] = await tx
      .insert(comments)
      .values({
        proposalId,
        parentId: input.parentId ?? null,
        author: input.author,
        handle: input.handle,
        body: input.body,
      })
      .returning();

    await tx
      .update(proposals)
      .set({ updated: new Date() })
      .where(eq(proposals.id, proposalId));

    return row;
  });
}

export async function findAdminByEmail(email: string) {
  const lower = email.trim().toLowerCase();
  const [row] = await db
    .select()
    .from(admins)
    .where(eq(admins.email, lower))
    .limit(1);
  return row ?? null;
}

export async function createAdmin(email: string, passwordHash: string) {
  const [row] = await db
    .insert(admins)
    .values({ email: email.trim().toLowerCase(), passwordHash })
    .returning();
  return row;
}

export async function updateAdminPassword(email: string, passwordHash: string) {
  const [row] = await db
    .update(admins)
    .set({ passwordHash })
    .where(eq(admins.email, email.trim().toLowerCase()))
    .returning();
  return row ?? null;
}

export async function getProposalIdBySlug(
  category: string,
  slug: string
): Promise<string | null> {
  const upper = category.toUpperCase() as Category;
  const [row] = await db
    .select({ id: proposals.id })
    .from(proposals)
    .where(and(eq(proposals.category, upper), eq(proposals.slug, slug)))
    .limit(1);
  return row?.id ?? null;
}
