CREATE TYPE "public"."kind" AS ENUM('Idea', 'Improvement');--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "kind" "kind" DEFAULT 'Idea' NOT NULL;