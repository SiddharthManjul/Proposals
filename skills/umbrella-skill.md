---
name: norvyx-proposals-writer
display_name: Norvyx Proposals Writer
description: Umbrella skill for drafting any proposal on Norvyx Proposals. Routes by category (SIP/CIP/EIP/CMIP/PIP), applies the house voice, and enforces preflight before delivery. Use when the user asks to draft, write, or shape a Norvyx proposal, or hands you a topic without specifying which per-type skill to use.
applies_to: ALL
length_target: varies
version: 1.0.0
---

# Purpose
This skill drafts proposals for Norvyx Proposals across all five categories (SIP, CIP, EIP, CMIP, PIP). It enforces the house voice, the universal writing principles, the AI-slop blocklist, and the per-category body structure, then runs the preflight checklist before returning a draft. It does not pitch, sell, announce, or rewrite voice in the name of clarity; it does not produce content for any platform other than Norvyx Proposals.

# When to invoke
- The user wants a new Norvyx proposal drafted from a topic.
- The user provides a topic but no category, and wants the skill to pick.
- The user has source material (an RFS line, a blog post, a URL) and wants it shaped into a proposal.
- The user wants a draft that conforms to Norvyx's submit-form fields without hand-editing.
- Do not invoke for: pitch decks, fundraising memos, announcements, marketing copy, or proposals on other RFC platforms.

# Inputs
- `topic` [required] — one-line description of the proposal idea (e.g. *"A registry of verified solo founders"*).
- `category` [optional] — one of `SIP | CIP | EIP | CMIP | PIP`. If omitted, the skill picks and justifies in one sentence.
- `source_material` [optional] — pasted RFS bullet, blog post, URL, or research notes the draft should draw on.
- `constraints` [optional] — explicit constraints (e.g. *"do not name X"*, *"include the figure 71%"*, *"length: medium"*).
- `audience_hint` [optional] — who the author imagines reading first (founders / investors / mods / editors). Default: a sharp investor doing diligence a year from now.
- `length` [optional] — `tight` (600–900 words, default) or `medium` (1200–1800, only when the topic earns it).

# Process
1. Parse `topic`, `category`, `source_material`, `constraints`, `audience_hint`, `length`.
2. If `category` is omitted, choose one using SKILLS_GUIDE.md Section 2 definitions and Section 12.1 tie-break rule (when two categories fit, pick the one whose body template is harder to fake — usually PIP over CIP for product/docs ambiguity). State the chosen category and a single justifying sentence in the conversation **above** the cut-line; the four-field output remains clean.
3. Once category is known, route to the matching per-type skill (`sip-writer`, `cip-writer`, `eip-writer`, `cmip-writer`, `pip-writer`) and follow its Process section. The umbrella's job ends at routing and final preflight; the per-type skill owns the draft. If the per-type skill is unavailable, fall back to the inline routing below.
4. If the topic genuinely needs clarification — *who is the audience?*, *what's the real failure mode?*, *what number do you actually have?* — ask one short question (Section 0). Otherwise proceed.
5. Pull the body-structure template for the chosen category from Section 9 of SKILLS_GUIDE.md. Treat it as a starting scaffold, not a cage (Section 9 preamble).
6. Pull the vocabulary in scope for the chosen category from Section 2. Use those terms where they fit; do not import vocabulary from other categories.
7. Draft the body following Section 4 voice (Graham × McKenzie blend), Section 5 universal principles, and Section 6 user preferences. First-person and collective-we both legal; switch on instinct, not within a sentence (Section 4.4).
8. Insert at least one real number in the body (Section 5.6, Section 6). If the author has no number, estimate honestly with a hedge marker (Section 12.2): *"~40%"*, *"by my count"*, *"roughly half"*. Never invent precise numbers.
9. Sensitivity check (Section 12.4): name public figures and named firms when their material is on public record (YC RFS line, published blog, public firm); paraphrase otherwise. Default to anonymise when in doubt.
10. Write the title last (Section 5.8). It must be a specific verb + specific noun, slug-friendly (Section 8.4) — no heavy punctuation, no trailing words like *"a thread"*.
11. Write the abstract: 2–4 sentences, names the failure mode AND the proposed change (Section 11).
12. Confirm body uses only the supported Markdown subset (Section 8.1, 8.2): `##` headings, blank-line paragraph breaks, `-` lists, `> ` pullquotes (one per section max), inline `code`, `[link](url)`, `**bold**`, `*italic*`. No `#`/`###`, no numbered lists, no tables, no code fences, no nested lists.
13. Run the preflight checklist (Section 11) silently against the draft. If any item fails, fix and re-run the entire list. Do not deliver a draft that has not cleared every item.
14. Emit the four fields in the exact shape Section 13 specifies. If the user asked for an explanation alongside the draft, deliver the four fields, then a horizontal rule, then the explanation. Above the rule is the proposal; below it is the conversation.

# Routing rules (fallback when per-type skill unavailable)
- **SIP** — argues a *specific business idea and wedge*. Investor-memo sub-register. Body: Problem · Wedge · Why now · What's already been tried · Open questions.
- **CIP** — argues a change to docs, tutorials, translations, podcasts, newsletters, or other editorial surfaces. Editor sub-register. Body: lede · What's wrong now · The proposed change · Mechanics · Open questions.
- **EIP** — argues a change to gathering formats (conferences, demo nights, retreats, side stages). Programming-chair sub-register. Body: lede · What's wrong with the current format · Proposed format · Mechanics · Risks · Open questions.
- **CMIP** — argues a change to norms, moderation, governance, or how the community decides things. Governance-clerk sub-register. Body: lede · What's broken · Proposed change · What this is and isn't · Open questions.
- **PIP** — argues a first-party tool/surface change with spec-level detail. Engineering-RFC sub-register. Body: lede · Current state · Specification · Why this scope, not a larger one · Risks & rollout · Open questions.

Tie-break (Section 12.1): if both CIP and PIP fit (e.g. developer onboarding ambiguity), default to PIP. If both SIP and PIP fit (e.g. a missing primitive that's also a startup wedge), ask the user which lens they want.

# Output format
```
CATEGORY: <SIP | CIP | EIP | CMIP | PIP>
TITLE: <8–200 chars>
ABSTRACT: <40–800 chars, 2–4 sentences>
BODY:
<Markdown body using the subset in Section 8>
```

If `category` was omitted, prepend a single sentence above the four fields in the conversation: *"Routing this as `<CODE>` because <one-sentence reason>."* — then the four fields. Nothing else before, between, or after.

# Voice rules
- **Graham structurally** (Section 4.1): open with a sharp observation, not a frame. Short paragraphs are fine. *"And"* / *"But"* sentence openers legal. Footnotes inline as parentheticals. End mid-thought when the thought is finished — no closing summary paragraph.
- **McKenzie operationally** (Section 4.2): name money (*"$2,400/seat/year"* not *"expensive"*), name cadence (*"every 90 days"* not *"frequent"*), name the failure mode by mechanism not adjective. Spell out the second-order implication. Vary sentence length deliberately.
- **First-person discipline** (Section 4.4): *"I"* for personal positions held; *"we"* for community norms; impersonal for fact and spec. Switch on instinct; never within a sentence.
- **Specific over abstract** (Section 5.1): a real number beats an adjective every time.
- **Failure mode first, solution second** (Section 5.2). Don't lead with the fix.
- **Surface the strongest counter-argument** in the draft (Section 5.5). Do not pre-answer all objections — leave them for the discussion thread.
- **Active voice by default** (Section 5.7). Decorative adjectives get cut.
- **Hedge surgically when uncertain** (Section 4.3): *"I'd guess"*, *"in our experience"*, *"this might be wrong about"* — sparingly, never as throat-clearing.
- **Same voice across all categories** (Section 6). Vocabulary shifts per type; texture does not.

# Vocabulary in scope
Vocabulary is category-bound (Section 2). The umbrella skill uses whichever set matches the routed category. Brief reminders (full lists in SKILLS_GUIDE.md Section 2):

- **SIP** — wedge, founder-market fit, TAM/SAM/SOM, PMF, alpha, tailwind, moat, primitive, counter-positioning, burn, runway, ARR/MRR, NDR/GDR, LTV:CAC, unit economics.
- **CIP** — audience, drop-off, completion rate, voice, house style, channel, cadence, canon, discoverability, translation queue, contributor rotation, digest, canonical link.
- **EIP** — format, track, cadence, side stage, cohort, no-show rate, fireside, off-the-record, transcript, venue stipend, rotating host, CFP, accreditation.
- **CMIP** — norm, moderation handbook, rotation, rule decay, sanction, appeal, channel hygiene, public minutes, mod queue, recusal, term length, backfill.
- **PIP** — spec, primitive, endpoint, schema, migration, backwards compatibility, rate limit, feature flag, instrumentation, rollout, indexer, gateway, resolver, diff dashboard.

Cross-category contamination is a smell: a SIP using *"channel hygiene"* or a CMIP using *"LTV:CAC"* signals the wrong template was picked.

# Body structure template
Routed at draft time from SKILLS_GUIDE.md Section 9. Skeletons (start scaffolds, not cages):

**SIP** — `## Problem` · `## Wedge` · `## Why now` · `## What's already been tried` · `## Open questions`.

**CIP** — `[unlabeled lede paragraph]` · `## What's wrong now` · `## The proposed change` · `## Mechanics` · `## Open questions`.

**EIP** — `[unlabeled lede]` · `## What's wrong with the current format` · `## Proposed format` · `## Mechanics` · `## Risks` · `## Open questions`.

**CMIP** — `[unlabeled lede]` · `## What's broken` · `## Proposed change` · `## What this is and isn't` · `## Open questions`.

**PIP** — `[unlabeled lede]` · `## Current state` · `## Specification` · `## Why this scope, not a larger one` · `## Risks & rollout` · `## Open questions`.

Section names and order may be adapted if a particular proposal is better served that way (Section 9 preamble), but every required section from Section 2 must be present in some form.

# Refusal rules
The skill refuses to deliver any draft containing:

- **Any word from Section 7.1**: empower, revolutionize, leverage, unlock, drive, facilitate, enable, seamless, holistic, synergies, best-in-class, world-class, cutting-edge, next-generation, transformative, disruptive, paradigm, ecosystem (as marketing word; *"the Ethereum ecosystem"* fine, *"our ecosystem of partners"* not), robust, scalable (as marketing, not engineering precision), comprehensive, powerful, intuitive, innovative.
- **Any phrase from Section 7.2**: *In today's rapidly evolving landscape*, *In an era of*, *In the modern world*, *More than ever before*, *Game-changing*, *At the forefront of*, *Pushing the boundaries of*, *Unleashing the potential of*, *We are excited to announce*, *Don't miss out*, *Act now*, *Limited time*.
- **Any structural move from Section 7.3**: three-sentence preamble before the point, closing summary paragraph, a "Conclusion" heading, *Furthermore / Moreover / In conclusion* paragraph openers, triadic adjectives, round-numbered lists when the real count is 4 or 7, exclamation marks (anywhere, including paraphrased quotes), emojis in body text, em-dashes used as decoration.
- **Any tonal move from Section 7.4**: performative humility (*"I might be wrong, but…"*), performative confidence (*"This will revolutionize…"*), marketing rhythm (heading alliteration, parallel-construction lists for vibes), made-up statistics.
- **Category-shape violations**: pitch-deck moves in SIP (*"We are a team of…"*, *"Ask: $1M for…"*); self-promotion in CIP; sponsor pitches and speaker self-noms in EIP; named call-outs in CMIP unless on public record; bug-report shapes in PIP (*"when I click X it does Y"*).
- **Markdown outside the Section 8 subset.** Including numbered lists, tables, code fences, nested lists.

If a draft contains any of the above after generation, the skill rewrites and re-runs preflight before delivery. It does not deliver a flagged draft with a warning.

# Preflight self-check
Run silently before every delivery (Section 11). If any item fails, fix the draft and re-run the entire list:

1. Title is a specific verb + specific noun, not a slogan.
2. Abstract is 2–4 sentences and names both the failure mode and the proposed change.
3. At least one real number appears in the body.
4. No word from Section 7.1.
5. No phrase from Section 7.2.
6. No closing summary paragraph.
7. *Open questions* section exists with ≥ 2 real (non-rhetorical) questions.
8. Author voice maintains Graham–McKenzie blend; no stretches of marketing rhythm.
9. Triadic adjectives: zero.
10. Zero exclamation points; zero emojis in body.
11. Body uses only the Section 8 Markdown subset.
12. Length matches target — tight default (600–900 words), medium (1200–1800) only when the topic earns it.
13. If a competitor or person is named, the naming is on public record. Sensitive material is paraphrased.
14. The proposal would still read sensibly two years from now.

# Worked example

Drawn from SKILLS_GUIDE.md Section 10.1 (the developer-docs translation CIP):

```
CATEGORY: CIP
TITLE: Translate the developer docs into Mandarin, Korean, Vietnamese, and Turkish

ABSTRACT: Half of the active builder community ships in a language that isn't their first. The current docs are English-only and translated unofficially in three GitHub forks. This proposal funds an official translation, on a shared CMS, with credited human translators.

BODY:
[Full body reproduced from SKILLS_GUIDE.md Section 10.1. The four-field shell is included so the skill's worked example renders as a complete output specimen rather than a fragment. Refer to Section 10.1 for the body content.]
```

# Anti-example

The marketing-slop draft from SKILLS_GUIDE.md Section 10.5, with line-by-line violation annotations:

```
CATEGORY: PIP
TITLE: Empowering Web3 onboarding with seamless wallet integration

ABSTRACT: In today's rapidly evolving Web3 landscape, the onboarding experience is critical for driving user adoption. We propose a comprehensive, intuitive, and powerful wallet onboarding tutorial that will revolutionize the way new builders interact with our ecosystem and unlock unprecedented value for the entire community.
```

**Title — *"Empowering Web3 onboarding with seamless wallet integration"***
- *Empowering* → Section 7.1 (forbidden word).
- *Seamless* → Section 7.1 (forbidden word).
- The whole title is a slogan, not verb-plus-noun → Section 11 item 1, and reads as marketing rhythm → Section 7.4.

**Abstract sentence 1 — *"In today's rapidly evolving Web3 landscape, the onboarding experience is critical for driving user adoption."***
- *In today's rapidly evolving landscape* → Section 7.2 (forbidden phrase, exact match).
- *driving* (as marketing verb, "driving user adoption") → Section 7.1 (forbidden word).
- Three-sentence frame-before-point pattern begins here → Section 7.3 (forbidden structural move: preamble before getting to the point).
- No failure mode named → Section 5.2 (lead with the failure, not the frame) and Section 11 item 2 (abstract must name the failure mode).
- No number → Section 5.6, Section 11 item 3.

**Abstract sentence 2 — *"We propose a comprehensive, intuitive, and powerful wallet onboarding tutorial that will revolutionize the way new builders interact with our ecosystem and unlock unprecedented value for the entire community."***
- *comprehensive, intuitive, and powerful* → Section 7.1 three times (each a forbidden word) and Section 7.3 (triadic adjectives, forbidden structural move) and Section 11 item 9 (triadic adjectives: zero).
- *revolutionize* → Section 7.1 (forbidden word) and Section 7.4 (performative confidence: *"will revolutionize"* is the named example).
- *our ecosystem* → Section 7.1 (forbidden marketing use of *ecosystem*; *"the Ethereum ecosystem"* would be allowed, *"our ecosystem"* is the disallowed marketing usage explicitly called out).
- *unlock unprecedented value* → Section 7.1 (*unlock*, forbidden word) and Section 7.4 (marketing rhythm, faking authority with no number behind *"unprecedented value"*).
- *for the entire community* → marketing-rhythm closer, Section 7.4.
- The sentence proposes "a tutorial" — no spec, no scope cut, no failure mode named → fails Section 5.1 (specific over abstract), Section 5.3 (concrete enough to argue with), Section 11 item 2 (abstract must name the proposed change with enough specificity to argue with).

**Aggregate failures:** eight Section 7.1 forbidden words (*Empowering, seamless, driving, comprehensive, intuitive, powerful, revolutionize, unlock*), one Section 7.2 forbidden phrase (*In today's rapidly evolving landscape*), one Section 7.3 violation (triadic adjectives), one Section 7.4 violation (performative confidence + marketing rhythm), zero numbers (Section 5.6, Section 11 item 3), zero failure modes named (Section 5.2, Section 11 item 2). The model refuses to ship any draft with this density of violations and rewrites from scratch — the failure pattern is not patchable line by line because the underlying structure is frame-then-slogan rather than failure-then-change.