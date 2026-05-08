# Proposal draft — How Norvyx Proposals and Norvyx Capital relate

Paste-ready draft for the submit form at `/submit`. The body uses the small Markdown subset the parser supports: `## Heading`, `- item`, `> pullquote`, blank lines for paragraphs, and the inline tokens `**bold**`, `*italic*`, `` `code` ``, `[label](url)`.

---

## Field — Category

`CMIP — Community Improvement Proposal`

(It's about how this community relates to the adjacent product. CIP would also defend, but CMIP is the better home.)

## Field — Title

```
How Norvyx Proposals and Norvyx Capital relate
```

## Field — Abstract

```
Two products live under the Norvyx name: Proposals, this archive, and Capital, a two-sided matching engine for founders and investors. The two are deliberately separate, deliberately linked, and built to make each other obvious without contaminating either. This proposal writes that relationship down so it stays consistent as both products grow.
```

## Field — Author

```
Brooklyn
```

## Field — Handle

```
brooklyn
```

## Field — Body

Paste everything between the rule lines below into the body field as-is.

---

```
Norvyx Proposals is an archive. Norvyx Capital is a matching engine. They share a parent brand, a design system, and a philosophy about how serious work gets done — but they are two separate products, with two separate audiences, and that separation is the point.

This document is the canonical version of how the two relate. If a future change to either product can't be defended against this document, the change is wrong, or the document needs updating first.

## What each one is

**Proposals** is a slow-take editorial archive where founders, communities, and investors write things down — proposals, debate, decisions — with their names attached. Authors keep editorial control. Editors copy-edit, they don't rewrite. Rejected proposals stay published, because the reasoning matters more than the verdict.

**Capital** is a two-sided matching engine. One side is founders looking for grants, accelerators, angels, and VCs. The other side is investors looking for thesis-aligned deal flow. The matching is computed by *Saturn*, a learned ranker that gets sharper every time a founder reports an outcome and every time an investor accepts or passes on a match.

## The one-line thesis

> Proposals is the writing test. Capital is the meeting room.

A founder who writes a clear proposal in public has demonstrated the exact thing every investor reads decks to find — clarity, specificity, judgment under disagreement. Capital is where that demonstrated judgment turns into a conversation about money. One product without the other works; both together compound.

## Why they are separate products

The temptation is to merge them into one funnel — a place where you write your proposal and "convert" into a fundraising profile. We are explicitly not doing that. Three reasons:

- **Proposals must remain editorial.** The moment writing here becomes a way to pitch, the writing changes. Authors start performing for an imagined investor reader instead of arguing with the actual community. The archive's value collapses.
- **Capital must remain neutral.** If the matching engine privileges founders who happen to also write proposals, it stops being the best matching engine and starts being a club. Investors will notice within a quarter.
- **The metrics don't mix.** Proposals is measured by quality of writing and discussion. Capital is measured by match quality, deployment velocity, investor retention. Mixing the metrics produces a product that does both badly.

## How they connect

The connection is a single, opt-in surface: the *author profile*. Every author on Proposals has a profile page. On that page is one toggle — `I'm open to capital conversations`. It defaults to off. When on, two things happen:

- The author's profile becomes visible to investors on Capital who match the author's stated sector and stage.
- A small *Adjacent on Capital* block appears on the author's proposal pages, surfacing investors whose thesis aligns with what the proposal argues.

Nothing else changes. Comments are still public. The proposal still reads the same. The archive doesn't tag who is "fundable." We don't add a leaderboard. We don't promote authors with the toggle on. **The toggle is signal, not status.**

## What lives where

Proposals owns:

- The five proposal categories and their editorial standards.
- The threaded discussion and the moderation handbook.
- The author profile and bio.
- The right to publish, edit, and reject submissions.

Capital owns:

- The investor side of the matching graph entirely.
- The Saturn ranker, the data foundation, and the verified founder fields (employment, traction, prior ventures).
- The paid product and all billing.
- The right to surface, hide, or rank a founder profile inside its own product.

Neither product reaches into the other's domain. Capital does not edit proposals. Proposals does not see fundraising data.

## What we will never do

A short list of things that look like wins and are not:

- A `Pitch your startup` CTA on a proposal page. Turns the archive into a startup directory.
- Tagging proposals "VC-backed" or "fundable." Pollutes the archive with a signal that has nothing to do with idea quality.
- Letting investors comment under proposals from a verified-investor account. Creates pressure to perform. Investors are welcome to comment, but as people, not as institutions.
- Sponsored proposals. *Death.*
- A trending or leaderboard view. Performance-optimizes the writing.
- Paywalling any part of Proposals. Capital is the paid product; Proposals is the front door.

## Where the line is, in one sentence

> Proposals is a publication that happens to filter for the founders Capital wants. Capital is a matching engine that happens to love founders who already write in public. Neither sells the other; they just make each other obvious.

## Open questions

- Should the *open to capital* toggle be visible on the author's public profile, or kept private and visible only to investors on Capital? Argument for visible: transparency. Argument for private: avoids social pressure to opt in.
- How do we handle authors who publish a proposal and later raise a round through Capital? Do we attach a small *raised after publishing this* line on the proposal page once the round is on record? It's powerful signal, but risks making the toggle into a status game.
- When Capital opens to international markets, how should the *Adjacent on Capital* block handle authors in jurisdictions Capital does not yet operate in? Hide the block? Show it with a `not yet available in your region` note?

These are real questions, not rhetorical ones. Replies welcome.
```

---

## After publishing

1. Note the URL Next.js redirects to (e.g. `/cmip/how-norvyx-proposals-and-norvyx-capital-relate`).
2. Move the proposal from `Draft` to `Discussion` from `/admin`.
3. Swap the placeholder text in `src/components/CapitalCard.tsx` (`Full thesis — coming as a proposal`) for a link to the published proposal URL.
