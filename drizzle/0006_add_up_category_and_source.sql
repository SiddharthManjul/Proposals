-- Add UP (Update Proposal) category and an optional source column.
--
-- UPs are announcements and updates from VCs and other startup-ecosystem
-- organizations. They live in their own corner of the platform alongside
-- the five proposal categories (SIP, CIP, EIP, CMIP, PIP).
--
-- The `source` column stores the announcing organization for UPs
-- (e.g., "Y Combinator", "Andreessen Horowitz"). It is nullable so the
-- existing five proposal categories are unaffected.

DO $migrate$
BEGIN
  -- Add UP to the category enum, idempotent.
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'UP'
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'category')
  ) THEN
    EXECUTE 'ALTER TYPE "public"."category" ADD VALUE ''UP''';
  END IF;
END
$migrate$;

-- Add the source column, idempotent.
ALTER TABLE "proposals" ADD COLUMN IF NOT EXISTS "source" text;
