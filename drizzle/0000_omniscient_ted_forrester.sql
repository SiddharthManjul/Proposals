CREATE TYPE "public"."category" AS ENUM('CIP', 'EIP', 'CMIP', 'PIP');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('Draft', 'Discussion', 'Last Call', 'Accepted', 'Implemented', 'Rejected', 'Living');--> statement-breakpoint
CREATE TABLE "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proposal_id" uuid NOT NULL,
	"parent_id" uuid,
	"author" text NOT NULL,
	"handle" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" integer NOT NULL,
	"category" "category" NOT NULL,
	"slug" varchar(200) NOT NULL,
	"title" text NOT NULL,
	"abstract" text NOT NULL,
	"status" "status" DEFAULT 'Draft' NOT NULL,
	"author" text NOT NULL,
	"author_handle" text NOT NULL,
	"posted" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL,
	"reading_minutes" integer DEFAULT 3 NOT NULL,
	"body" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "public"."proposals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_comments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "comments_proposal_idx" ON "comments" USING btree ("proposal_id");--> statement-breakpoint
CREATE INDEX "comments_parent_idx" ON "comments" USING btree ("parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "proposals_category_slug_uniq" ON "proposals" USING btree ("category","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "proposals_category_number_uniq" ON "proposals" USING btree ("category","number");--> statement-breakpoint
CREATE INDEX "proposals_updated_idx" ON "proposals" USING btree ("updated");