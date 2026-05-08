# Norvyx Proposals → Norvyx Capital: Distribution Strategy

A guide for turning the Proposals archive into the strongest top-of-funnel channel for Norvyx Capital, while preserving the Proposals DNA: editorial archive, slow-take, builders writing for builders, no AI slop.

---

## 1. The strategic fit (why this works)

Norvyx Proposals already does the unpaid emotional labor that Norvyx Capital needs:

| Capital needs | Proposals already produces |
|---|---|
| Founders building real, non-trading tech | A forum where the only acceptable proposals are *non-prediction-market, non-DEX* tech ideas |
| Thesis-aligned deal flow signal | Authors publicly arguing a thesis with their name on it |
| Editorial credibility (avoid "yet another VC blog") | Editorial archive with house rules and rejected-proposals-kept-on-record |
| A way to surface underrepresented founders | Discussion-quality, not pedigree, decides what gets read |
| Web3 → AI → deeptech expansion | Categories already designed to travel across domains |

The thesis: **Proposals is the writing test, Capital is the meeting room.** A founder who writes a clear PIP about a real problem has demonstrated, in public, the exact thing every VC tries to read out of a deck — clarity, specificity, judgment under disagreement.

Don't try to make Proposals *sell* Capital. Make Proposals *the place where founders Capital wants would already be writing.*

---

## 2. Five non-negotiables (the DNA we don't break)

If anything below conflicts with these, the change doesn't ship:

1. **No ads, no banners, no "powered by".** The archive looks like a publication, not a landing page.
2. **No CTAs inside proposal bodies.** Capital cross-promotion lives in chrome (footer, sidebar, post-publish flow), never in editorial content.
3. **Editors don't rewrite voice.** Even if a proposal becomes a fundraise, the author keeps their words.
4. **Rejected proposals stay published.** Capital must never lobby to bury a rejection; the archive is more valuable to investors *because* it shows judgment.
5. **No paywall on Proposals.** Capital is the paid product; Proposals is the front door.

---

## 3. The funnel (how a founder actually gets from Proposals → Capital)

```
Twitter / HN / Discord
        │
        ▼
  Read a proposal  ──────────────►  Save to email digest (free)
        │                                    │
        ▼                                    ▼
  Comment / argue                       Become a regular reader
        │                                    │
        ▼                                    ▼
  Submit own proposal  ◄──────────  Author profile created
        │
        ▼
  Proposal published (Draft → Discussion)
        │
        ├──── Strong signal ──► Inbound from Capital investors
        │
        └──── Author opts in ──► "Open to capital conversations" badge
                                            │
                                            ▼
                                    Norvyx Capital onboarding
                                    (profile pre-filled from proposal)
```

The handoff point is the **author profile**, not the proposal page. Profiles are where Capital and Proposals meet without contaminating either product.

---

## 4. What to add (small, surgical changes)

Each of these is one-to-three days of work and doesn't change the editorial feel.

### 4.1 Author profiles (load-bearing — do this first)
Today an author is a free-text field on a proposal. Make it a real entity.

- New `authors` table: `handle`, `display_name`, `bio` (140 chars), `links[]` (GitHub/site/X), `open_to_capital` (bool, default false), `created_at`.
- Author page at `/by/[handle]`: their proposals, their comments, their bio.
- On submit: if handle is new, create author; if existing, attach.
- Single setting on the author page: **"I'm open to capital conversations."** Pure signal, no commitment.

This is the bridge. Everything else hangs off it.

### 4.2 A fifth category, not a redesign
Add **`SIP — Startup Idea Proposals`** alongside CIP/EIP/CMIP/PIP.

- Same format as the others. Same editorial conventions.
- Body template prompts: "Problem", "Wedge", "Why now", "What's already been tried", "Open questions".
- Crucially **not** "Pitch deck" or "Funding ask". The point is to write the *idea*, not raise on it.
- Authors of SIPs that reach `Discussion` or `Last Call` are surfaced to Capital for inbound — only if `open_to_capital` is on.

This makes the connection legible without making Proposals a startup directory.

### 4.3 Capital footer module (one block, every page)
A single editorial footer card above the existing Footer:

> **Norvyx Capital** — When founders are ready to talk to capital that fits, that's the other product. Proposals is where the thinking happens; Capital is where the meetings happen.
> [Read the thesis →]

No urgency, no gradient, no logo wall. Same hairline aesthetic as the rest of the site. The link goes to a single page on Capital that explains how the two products relate (`/about-capital`).

### 4.4 Post-publish flow (the moment of highest intent)
After a proposal is published, the redirect lands on the proposal page **with a small banner above the title**, dismissible:

> Your proposal is live. If you'd like investors who match this thesis to be able to reach you, [turn on capital matching]. You can turn it off anytime.

This is the only place Capital is mentioned inside the editorial frame. It appears once, after the author has earned the right to see it.

### 4.5 RSS + weekly digest (long-term distribution)
- RSS at `/feed.xml` for proposals + `/feed/[category].xml` per category. Free, no friction, becomes a subscription primitive.
- Weekly email digest: 1 featured proposal, 3 in-discussion, 1 rejected-of-note. No marketing. The Capital mention is one line in the footer, same as on-site.

The digest is also the lowest-friction conversion to Capital — investors who read it are already pre-qualified for thesis-aligned deal flow.

### 4.6 "Filed under" → "Adjacent on Capital"
On proposal detail pages, the existing "Filed under" sidebar gets one more block underneath, only if the author has `open_to_capital`:

> **Adjacent on Capital**
> 3 investors actively writing checks in [author's sector] at [author's stage].
> [See thesis-aligned matches →]

Hidden when off. Editorial when on. Doesn't push, doesn't appear if it'd feel forced.

---

## 5. Content strategy — what Proposals publishes that pulls Capital users in

The content already does most of the work. Three deliberate additions:

1. **One Capital-aligned editorial per quarter.** Not on Proposals, *about* Proposals — written by a Capital investor (Brooklyn, Amit, or a portfolio founder) about a proposal they thought was good. Signals to readers that investors actually read here.
2. **"Implemented" is the most valuable status.** Whenever a proposal moves to Implemented, write a short note ("how it shipped") in the proposal body itself. Investors filter for "things that actually got done." This is free signal.
3. **Annual archive review.** Publish a year-end edition: "10 proposals from this year you should still read." Goes out as a long-form post on Capital's site too, linking back. Two-way distribution.

---

## 6. Technical changes (concrete, scoped)

| Change | Scope | Where |
|---|---|---|
| `authors` table + `/by/[handle]` page | Small | `src/db/schema.ts`, `src/app/by/[handle]/page.tsx` |
| `SIP` category | Trivial | `src/lib/proposals.ts` `Category` union, schema enum, migration |
| `open_to_capital` toggle on author profile | Small | new author settings page, single boolean in DB |
| Capital footer module | Trivial | new `<CapitalFooter />` component above existing `<Footer />` |
| Post-publish banner on detail page | Small | conditional render on `/[category]/[slug]` when `?just=published` |
| RSS feeds | Small | `src/app/feed.xml/route.ts` and per-category routes |
| Weekly digest cron | Medium | scheduled job + email template (Postmark or Resend) |
| "Adjacent on Capital" sidebar block | Medium | needs Capital API endpoint returning N investors by sector + stage |

The only cross-product dependency is the last one — and it can be stubbed for months. Until Capital exposes a matching API, that block stays hidden.

---

## 7. Measurement (what tells us this is working)

Don't measure clicks. Measure the funnel that matters:

- **Proposals authors with `open_to_capital = true`** — the only metric that defines whether the bridge exists.
- **Proposals → Capital signups** with attribution (UTM on the footer link).
- **Capital users who reference a proposal** during onboarding ("How did you hear about us?" → "I read X's PIP").
- **Investor inbound to authors** — track when an investor on Capital views an author profile on Proposals (cross-product analytics).
- **Outcome reports**: "I raised after publishing this proposal" → these become the strongest Capital marketing material that doesn't read as marketing.

Anti-metrics (warn if these move):

- Comment count drops → editorial frame broke.
- Bounce rate up on detail pages → Capital module is too loud.
- Author churn (people deleting accounts) → trust broken.

---

## 8. Sequencing — the order to do this in

**Now (week 1):**
- Author entity + `/by/[handle]`.
- `open_to_capital` toggle.
- Capital footer module.
- Post-publish banner.

**Soon (weeks 2–4):**
- SIP category.
- RSS feeds.
- Quarterly Capital editorial.

**Once Capital ships (month 2+):**
- "Adjacent on Capital" sidebar block.
- Weekly digest with Capital footer line.
- Cross-product analytics.

**Later:**
- Annual archive review co-published.
- Author → investor warm-intro flow (mediated, opt-in both sides).

---

## 9. Anti-patterns — things to refuse even if they look like wins

- **A "Pitch your startup" CTA.** Turns Proposals into a startup directory; kills editorial trust.
- **Public investor names commenting under proposals.** Creates pressure to perform. Investors can read; they should comment as themselves only when they have something to say, not to mark territory.
- **Tagging proposals "VC-backed" or "fundable".** Pollutes the archive with funding-stage signal that has nothing to do with idea quality.
- **A trending / leaderboard view.** Performance-optimizes the writing.
- **Sponsored proposals.** Death.
- **An "Apply to Capital" button on the proposal page.** The author profile is the right surface; the proposal is the writer's.

---

## 10. The one-liner internally

> Proposals is a publication that happens to filter for the founders Capital wants. Capital is a matching engine that happens to love founders who already write in public. Neither one sells the other; they just make each other obvious.

If a future change can be defended in those two sentences, ship it. If it can't, don't.
