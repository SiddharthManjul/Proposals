import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  jsonb,
  varchar,
  uniqueIndex,
  index,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

import type { ProposalSection } from "@/lib/proposals";

export const categoryEnum = pgEnum("category", [
  "CIP",
  "EIP",
  "CMIP",
  "PIP",
]);

export const statusEnum = pgEnum("status", [
  "Draft",
  "Discussion",
  "Last Call",
  "Accepted",
  "Implemented",
  "Rejected",
  "Living",
]);

export const proposals = pgTable(
  "proposals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    number: integer("number").notNull(),
    category: categoryEnum("category").notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    title: text("title").notNull(),
    abstract: text("abstract").notNull(),
    status: statusEnum("status").notNull().default("Draft"),
    author: text("author").notNull(),
    authorHandle: text("author_handle").notNull(),
    posted: timestamp("posted", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updated: timestamp("updated", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    readingMinutes: integer("reading_minutes").notNull().default(3),
    body: jsonb("body").$type<ProposalSection[]>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => ({
    bySlug: uniqueIndex("proposals_category_slug_uniq").on(t.category, t.slug),
    byNumber: uniqueIndex("proposals_category_number_uniq").on(
      t.category,
      t.number
    ),
    byUpdated: index("proposals_updated_idx").on(t.updated),
  })
);

export const admins = pgTable(
  "admins",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => ({
    emailUniq: uniqueIndex("admins_email_uniq").on(t.email),
  })
);

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    proposalId: uuid("proposal_id")
      .notNull()
      .references(() => proposals.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id").references((): AnyPgColumn => comments.id, {
      onDelete: "cascade",
    }),
    author: text("author").notNull(),
    handle: text("handle").notNull(),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => ({
    byProposal: index("comments_proposal_idx").on(t.proposalId),
    byParent: index("comments_parent_idx").on(t.parentId),
  })
);

export type ProposalRow = typeof proposals.$inferSelect;
export type ProposalInsert = typeof proposals.$inferInsert;
export type CommentRow = typeof comments.$inferSelect;
export type CommentInsert = typeof comments.$inferInsert;
export type AdminRow = typeof admins.$inferSelect;
export type AdminInsert = typeof admins.$inferInsert;
