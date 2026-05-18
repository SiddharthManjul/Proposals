/**
 * Hand-applied migration: 0006_add_up_category_and_source
 *
 * Adds the `UP` value to the `category` enum and adds a nullable `source`
 * text column to the `proposals` table. Idempotent.
 *
 * Run with:  bun run scripts/_apply-up-migration.ts
 */

import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: "require" });

async function main() {
  try {
    console.log("Applying 0006_add_up_category_and_source...");

    await sql.begin(async (tx) => {
      const enumExists = await tx`
        SELECT 1
        FROM pg_enum
        WHERE enumlabel = 'UP'
          AND enumtypid = (
            SELECT oid FROM pg_type WHERE typname = 'category'
          )
      `;
      if (enumExists.length === 0) {
        await tx.unsafe(`ALTER TYPE "public"."category" ADD VALUE 'UP'`);
        console.log("  added UP to category enum");
      } else {
        console.log("  UP already in category enum (skipping)");
      }
    });

    await sql.unsafe(
      `ALTER TABLE "proposals" ADD COLUMN IF NOT EXISTS "source" text`
    );
    console.log("  ensured proposals.source column exists");

    await sql`
      INSERT INTO drizzle.__drizzle_migrations (hash, created_at)
      VALUES ('0006_add_up_category_and_source', ${Date.now()})
      ON CONFLICT DO NOTHING
    `;
    console.log("  recorded migration in drizzle journal");

    console.log("Migration applied successfully.");
  } catch (e) {
    console.error("Migration failed:");
    console.error(e);
    process.exitCode = 1;
  } finally {
    await sql.end();
  }
}

main();
