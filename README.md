# Monad Proposals

A working archive of community proposals, debate, and decisions for the Monad ecosystem. Forum-style platform with five proposal categories, threaded discussion, and an editorial-archive aesthetic.

## Categories

| Code   | Full name                         | Scope                                                          |
| ------ | --------------------------------- | -------------------------------------------------------------- |
| `BIP`  | Blitz Improvement Proposals       | Changes to the Monad Blitz one-day hackathon series.           |
| `CIP`  | Content Improvement Proposals     | Docs, tutorials, translations, podcasts, public writing.       |
| `EIP`  | Event Idea Proposals              | Conferences, demo nights, retreats, side stages.               |
| `CMIP` | Community Improvement Proposals   | Norms, governance, mentorship, moderation.                     |
| `PIP`  | Product Improvement Proposals     | Explorer, RPC, starter kits, wallet flows, the docs site.      |

## Stack

- **Next.js 16.2.4** (App Router, Turbopack, React 19)
- **TypeScript** in strict mode
- **Tailwind v4** with `@theme inline` design tokens
- **next/font** — Space Grotesk (display) + Ubuntu (body) self-hosted
- Static generation for every route (proposal pages prerendered via `generateStaticParams`)

No backend yet. Proposals live in `src/lib/proposals.ts` as typed sample data; replace with a real source when one exists.

## Design tokens

Defined in `src/app/globals.css`:

| Token       | Value                       | Use                              |
| ----------- | --------------------------- | -------------------------------- |
| `--paper`   | `#ffffff`                   | Background                       |
| `--ink`     | `#281e32`                   | Body text                        |
| `--accent`  | `#fe6601`                   | Headlines, status, accents       |
| `--ink-soft`/`--ink-faint` | `#5b5263` / `#8b8390` | Secondary text, metadata |
| `--rule`    | `rgba(40,30,50,0.12)`       | Hairline borders                 |
| `--tint`    | `#faf7f2`                   | Hover/wash backgrounds           |

Display font: **Space Grotesk**. Body font: **Ubuntu**. Mono: system mono for IDs and metadata.

## Routes

```
/                       — masthead, featured, category strip, latest activity
/[category]             — listing for one category (e.g. /bip, /cmip, /pip)
/[category]/[slug]      — proposal detail with metadata, discussion, reply form
/about                  — archive philosophy and house rules
/submit                 — proposal submission form
```

`[category]` accepts the lowercase code (`bip`, `cip`, `eip`, `cmip`, `pip`). 404 otherwise.

## Project layout

```
src/
├── app/
│   ├── layout.tsx              — root layout, fonts, global metadata
│   ├── globals.css             — design tokens + editorial typographic styles
│   ├── page.tsx                — homepage
│   ├── about/page.tsx
│   ├── submit/page.tsx
│   └── [category]/
│       ├── page.tsx            — category index
│       └── [slug]/page.tsx     — proposal detail
├── components/
│   ├── Masthead.tsx            — top nameplate with issue/date line
│   ├── CategoryNav.tsx         — sticky horizontal section nav
│   ├── ProposalRow.tsx         — list-row for the archive feed
│   ├── StatusPill.tsx          — Draft / Discussion / Last Call / Accepted / …
│   ├── CommentThread.tsx       — threaded discussion (1 level deep)
│   └── Footer.tsx              — colophon and section links
└── lib/
    └── proposals.ts            — types, sample proposals, helpers
```

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (next build)
npm run start        # serve the production build
npm run lint         # eslint
```

## Adding a proposal

While there's no backend, edit `src/lib/proposals.ts` and append to the `PROPOSALS` array. Required fields:

```ts
{
  number: 5,
  category: "BIP",
  slug: "kebab-case-slug",
  title: "A specific verb. A specific noun.",
  abstract: "Two or three sentences.",
  status: "Draft" | "Discussion" | "Last Call" | "Accepted" | "Implemented" | "Rejected" | "Living",
  author: "Full Name",
  authorHandle: "handle.eth",
  posted: "2026-04-09",
  updated: "2026-04-22",
  readingMinutes: 6,
  body: [{ heading?, paragraphs?, list?, pullquote? }, ...],
  discussion: [{ id, author, handle, date, body, replies? }, ...],
}
```

Routes regenerate automatically — `generateStaticParams` reads from this array.

## Editorial conventions

- Titles use specific verbs and nouns. No "empower", no "revolutionize".
- Abstracts state the problem and the proposed change. They don't sell.
- Rejected proposals stay in the archive — the reasoning matters more than the verdict.
- Author voice is preserved. Editors copy-edit, they don't rewrite.
- Discussion is threaded one level deep on purpose.

## Roadmap

- Real persistence layer (DB + auth) once the team is ready.
- Markdown body rendering for user-submitted proposals.
- Search and filtering across categories.
- RSS / Atom feed of new proposals and status changes.
