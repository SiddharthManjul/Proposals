# Backend Guide

Norvyx Proposals runs on Next.js 16 (App Router) with PostgreSQL via Drizzle ORM. This guide covers everything needed to bring the backend up locally and operate it.

## 1. Stack overview

| Layer        | Choice                                    |
| ------------ | ----------------------------------------- |
| DB           | PostgreSQL 14+                            |
| ORM          | Drizzle ORM (`drizzle-orm`)               |
| Driver       | `postgres` (postgres.js)                  |
| Migrations   | Drizzle Kit                               |
| Validation   | Zod                                       |
| API          | Next.js Route Handlers under `/api/*`     |
| Auth (mod)   | Bearer token via `ADMIN_TOKEN` env var    |

Only the public routes need to be hit from the browser. Mutating proposal status (`PATCH /api/proposals/...`) is gated behind the admin token.

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/norvyx_proposals
DATABASE_SSL=          # set to "1" if your provider requires SSL (Neon/Supabase/RDS)
ADMIN_TOKEN=some-long-random-string
```

`.env.local` is loaded automatically by Next.js. The seed script and Drizzle Kit also read it (via `dotenv/config`).

## 3. First-time database setup

### Option A — local Postgres

```bash
# create the database (any one of these works)
createdb norvyx_proposals
# or
psql -U postgres -c "CREATE DATABASE norvyx_proposals;"
```

### Option B — hosted Postgres

Spin up a database on Neon, Supabase, Railway, RDS, etc. Copy the connection string into `DATABASE_URL` and set `DATABASE_SSL=1` if the provider requires SSL.

## 4. Schema and migrations

Schema lives in `src/db/schema.ts`. Generated SQL migrations live in `drizzle/`.

```bash
# Generate a new migration after editing the schema
npm run db:generate

# Push the current schema directly (good for local dev / first run)
npm run db:push

# Apply pending migrations against DATABASE_URL (use this in CI / prod)
npm run db:migrate

# Open the Drizzle Studio inspector
npm run db:studio
```

For the very first run, the simplest path is:

```bash
npm run db:push     # creates tables, enums, indexes
npm run db:seed     # loads the 17 sample proposals
```

## 5. Seed data

`scripts/seed.ts` truncates `proposals` and `comments` then inserts the 17 sample proposals (4 CIPs, 4 EIPs, 4 CMIPs, 5 PIPs) and their comment threads.

```bash
npm run db:seed
```

To wipe and re-seed in one shot:

```bash
npm run db:reset
```

(This runs `drizzle-kit drop` → `db:push` → `db:seed`. **Destructive.**)

## 6. Running the app

```bash
npm install
npm run dev          # http://localhost:3000
```

The pages (`/`, `/[category]`, `/[category]/[slug]`) read from the database on every request (`export const dynamic = "force-dynamic"`).

If the database is empty, the homepage shows a placeholder pointing at `npm run db:seed`.

## 7. API reference

All endpoints accept and return JSON. Errors come back as `{ error: string, issues?: ZodIssue[] }`.

### `GET /api/proposals`

List all proposals.

| Query           | Meaning                                  |
| --------------- | ---------------------------------------- |
| `category=cip`  | Filter to a single category (CIP/EIP/CMIP/PIP) |
| `sort=updated`  | Sort by `updated` desc instead of category/number |

```bash
curl http://localhost:3000/api/proposals
curl http://localhost:3000/api/proposals?category=pip
curl http://localhost:3000/api/proposals?sort=updated
```

### `POST /api/proposals`

Create a proposal. The next per-category number is assigned automatically.

```bash
curl -X POST http://localhost:3000/api/proposals \
  -H "Content-Type: application/json" \
  -d '{
    "category": "PIP",
    "slug": "ship-better-error-pages",
    "title": "Ship better error pages in the explorer",
    "abstract": "Today the explorer 500s into a stack trace…",
    "author": "Jane Doe",
    "authorHandle": "jane.eth",
    "body": [
      { "paragraphs": ["The first paragraph."] },
      { "heading": "Specification", "list": ["Bullet one", "Bullet two"] }
    ]
  }'
```

Returns `201 Created` with `{ proposal }`. Returns `409 Conflict` if `(category, slug)` already exists. Returns `422` with Zod issues if validation fails.

### `GET /api/proposals/:category/:slug`

Read a single proposal with its full discussion thread.

```bash
curl http://localhost:3000/api/proposals/pip/human-readable-names-explorer
```

### `PATCH /api/proposals/:category/:slug` *(admin)*

Change the status of a proposal. Requires `Authorization: Bearer <ADMIN_TOKEN>`.

```bash
curl -X PATCH http://localhost:3000/api/proposals/cip/rfc-of-the-month-newsletter \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "Accepted"}'
```

### `POST /api/proposals/:category/:slug/comments`

Add a top-level comment, or reply to an existing one (one level deep — replies to replies are rejected with 400).

```bash
# Top-level comment
curl -X POST http://localhost:3000/api/proposals/pip/human-readable-names-explorer/comments \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Hari Rao",
    "handle": "harir",
    "body": "Strong yes from me."
  }'

# Reply
curl -X POST http://localhost:3000/api/proposals/pip/human-readable-names-explorer/comments \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Yuki Tanaka",
    "handle": "yuki",
    "body": "Agreed.",
    "parentId": "<uuid-of-top-level-comment>"
  }'
```

Posting any comment also bumps the parent proposal's `updated` timestamp.

## 8. Direct SQL (cheat sheet)

If you ever need to poke the DB directly:

```sql
-- Connect
\c norvyx_proposals

-- Inspect tables
\dt
\d proposals
\d comments

-- Counts
SELECT category, COUNT(*) FROM proposals GROUP BY category ORDER BY category;
SELECT status, COUNT(*) FROM proposals GROUP BY status ORDER BY status;

-- Recent activity
SELECT category, number, slug, status, updated
FROM proposals ORDER BY updated DESC LIMIT 10;

-- Comment count per proposal
SELECT p.category, p.number, p.slug, COUNT(c.*) AS replies
FROM proposals p LEFT JOIN comments c ON c.proposal_id = p.id
GROUP BY p.id ORDER BY replies DESC LIMIT 10;

-- Wipe and re-seed (DESTRUCTIVE)
TRUNCATE TABLE comments, proposals RESTART IDENTITY CASCADE;
```

## 9. File map

```
.
├── .env.example                          — variables you must set
├── BACKEND.md                            — this guide
├── drizzle.config.ts                     — Drizzle Kit config
├── drizzle/                              — generated SQL migrations
├── scripts/
│   └── seed.ts                           — npm run db:seed
└── src/
    ├── db/
    │   ├── index.ts                      — lazy postgres + drizzle client
    │   ├── schema.ts                     — tables, enums, indexes
    │   └── queries.ts                    — typed query functions used by pages + API
    ├── lib/
    │   ├── api.ts                        — JSON helpers, parseJson, requireAdmin
    │   ├── proposals.ts                  — types and category metadata (no data)
    │   └── validators.ts                 — Zod schemas for every input
    └── app/api/
        └── proposals/
            ├── route.ts                  — GET/POST /api/proposals
            └── [category]/[slug]/
                ├── route.ts              — GET/PATCH single proposal
                └── comments/route.ts     — POST a comment
```

## 10. Common operations

| You want to…                      | Run                                                      |
| --------------------------------- | -------------------------------------------------------- |
| Stand up a fresh DB locally       | `createdb norvyx_proposals && npm run db:push && npm run db:seed` |
| Apply schema changes in dev       | `npm run db:push`                                        |
| Cut a migration to commit         | `npm run db:generate` (commit the new file in `drizzle/`)|
| Apply migrations on a server      | `npm run db:migrate`                                     |
| Browse the DB visually            | `npm run db:studio`                                      |
| Wipe and reseed                   | `npm run db:reset`                                       |
| Reset just the data, keep schema  | `psql $DATABASE_URL -c "TRUNCATE comments, proposals RESTART IDENTITY CASCADE" && npm run db:seed` |

## 11. Admin panel

A minimal editorial UI is mounted at **`/admin`**. Auth is normal email + password — accounts live in the `admins` table, passwords are scrypt-hashed.

### Setup

In `.env`:

```
SESSION_SECRET=<long random string>   # openssl rand -base64 32
```

`SESSION_SECRET` only signs session cookies; rotating it logs everyone out.

Then create an admin account from the terminal:

```bash
npm run admin -- create you@gmail.com YourPassword123
# or via env vars
ADMIN_EMAIL=you@gmail.com ADMIN_PASSWORD=YourPassword123 npm run admin -- create
```

Other admin commands:

```bash
npm run admin -- list                              # show all admins
npm run admin -- reset you@gmail.com NewPassword   # change password
```

### Signing in

1. Visit `/admin` → enter your email + password from `npm run admin -- create`.
2. The server verifies the password with scrypt against `admins.password_hash`, then sets `norvyx_admin` — an HttpOnly, SameSite=Lax, HMAC-signed cookie lasting **30 days**.
3. From then on, PATCH calls to `/api/proposals/<cat>/<slug>` succeed because the cookie travels automatically.
4. "Sign out" clears the cookie via `POST /api/admin/logout`.

### Auth endpoints

| Verb | Path                       | Purpose                                       |
| ---- | -------------------------- | --------------------------------------------- |
| POST | `/api/admin/login`         | `{ email, password }` → sets cookie           |
| POST | `/api/admin/logout`        | clears cookie                                 |
| GET  | `/api/admin/session`       | `{ authenticated, email?, expiresAt? }`       |

### Mutation auth

`PATCH /api/proposals/[category]/[slug]` requires the admin session cookie. If you need to script status changes, sign in once via curl and reuse the cookie:

```bash
# Sign in, save cookie jar
curl -c admin.cookies -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@gmail.com","password":"YourPassword123"}'

# Use it
curl -b admin.cookies -X PATCH http://localhost:3000/api/proposals/cip/some-slug \
  -H "Content-Type: application/json" \
  -d '{"status":"Accepted"}'
```

## 12. End-to-end flows

- **Public submission** — `/submit` is a client form that POSTs to `/api/proposals`. The body field accepts a small Markdown subset: `## Heading` opens a section, `- item` is a list, blank lines split paragraphs. Slug is auto-derived from the title; per-category number is assigned by the API. On success the user is redirected to the new proposal's URL.
- **Comments** — every proposal page has a working top-level comment form, and each comment shows a Reply button that opens an inline form. Replies are limited to one level deep (server-enforced).
- **Status changes** — only via the admin panel or a manual `PATCH` to the API with the bearer token.

## 13. Things deliberately not in scope yet

- **User accounts / auth.** Authors are free-text right now. Wire up NextAuth (or your IdP of choice) when ready, then replace the `author`/`authorHandle` fields on writes with the authenticated user.
- **Rate limiting.** Add an Upstash / Redis layer in front of the comment + create-proposal endpoints before opening to the world.
- **Markdown rendering.** Body sections are stored as structured JSON. If you switch to Markdown for user submissions, render with `react-markdown` + `rehype-sanitize`.
- **Search.** The DB has the data; add Postgres full-text search (`tsvector`) or external (Meilisearch) when needed.
