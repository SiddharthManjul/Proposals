-- Reframe Status from editorial workflow to venture lifecycle.
--
-- Old enum: Draft | Discussion | Last Call | Accepted | Implemented | Rejected | Living
-- New enum: Idea | Execution | MVP | PMF | Production
--
-- Mapping:
--   Draft, Discussion, Rejected → Idea
--   Last Call, Accepted         → Execution
--   Implemented                 → Production
--   Living                      → PMF
--
-- This migration is idempotent. It handles three starting states:
--   1. Fresh old enum (Draft/Discussion/...) — runs the full migration.
--   2. Partial state from a previous failed run (status_old exists)   — recovers.
--   3. Already migrated (Idea/Execution/...)                          — no-op.

DO $migrate$
BEGIN
  -- Recovery: clean up leftover status_old from a previous failed attempt.
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_old') THEN
    IF EXISTS (
      SELECT 1 FROM pg_type
      WHERE typname = 'status'
        AND oid != (SELECT oid FROM pg_type WHERE typname = 'status_old')
    ) THEN
      RAISE NOTICE 'Recovery: both status and status_old exist — dropping status_old';
      DROP TYPE "status_old";
    ELSE
      RAISE NOTICE 'Recovery: only status_old exists — renaming back to status';
      ALTER TYPE "status_old" RENAME TO "status";
    END IF;
  END IF;

  -- If the enum still has the old labels, run the migration.
  IF EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'status')
      AND enumlabel = 'Draft'
  ) THEN
    RAISE NOTICE 'Applying lifecycle status migration';

    ALTER TABLE "proposals" ALTER COLUMN "status" DROP DEFAULT;
    ALTER TYPE "status" RENAME TO "status_old";
    CREATE TYPE "status" AS ENUM ('Idea', 'Execution', 'MVP', 'PMF', 'Production');

    ALTER TABLE "proposals"
      ALTER COLUMN "status" TYPE "status"
      USING (
        CASE "status"::text
          WHEN 'Draft'        THEN 'Idea'
          WHEN 'Discussion'   THEN 'Idea'
          WHEN 'Rejected'     THEN 'Idea'
          WHEN 'Last Call'    THEN 'Execution'
          WHEN 'Accepted'     THEN 'Execution'
          WHEN 'Implemented'  THEN 'Production'
          WHEN 'Living'       THEN 'PMF'
          ELSE 'Idea'
        END::"status"
      );

    ALTER TABLE "proposals" ALTER COLUMN "status" SET DEFAULT 'Idea'::"status";
    DROP TYPE "status_old";

    RAISE NOTICE 'Done.';
  ELSE
    RAISE NOTICE 'status enum already migrated — nothing to do.';
  END IF;
END
$migrate$;
