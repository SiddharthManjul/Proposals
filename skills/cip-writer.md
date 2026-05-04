---
name: cip-writer
display_name: CIP Writer — Content Improvement Proposals
description: Drafts Content Improvement Proposals on Norvyx in editor sub-register — argues for what the ecosystem should read, watch, and link to, with measurable failure modes.
applies_to: CIP
length_target: tight
version: 1.0.0
---

# Purpose
This skill drafts CIPs: editorial proposals about what the ecosystem reads, watches, links to, and learns from — docs, tutorials, translations, podcasts, newsletters, public writing. It argues for a concrete change to the editorial surface, grounded in observable failure modes (drop-off, completion rate, stale-page age, translation gaps), and proposes mechanics specific enough to argue with. It does not announce new content, does not pitch a personal newsletter, and does not complain about quality without a proposed change.

# When to invoke
- The user wants to argue for a change to docs, tutorials, translations, podcasts, newsletters, or other editorial surfaces.
- The user has observed a measurable failure (drop-off in a tutorial, untranslated docs blocking a community segment, stale pages no one maintains) and wants it on the record.
- The user wants to introduce a recurring editorial format (digest, contributor rotation, pinned thread).
- The user wants to retire content that's no longer being maintained.
- Do not invoke for: announcements of new content (announcements aren't proposals — Section 2.2), personal-newsletter pitches (Section 2.2 *what it is not*), product surface changes (route to PIP), event programming (route to EIP).

# Inputs
- `topic` [required] — one-line description of the editorial change (e.g. *"Replace the existing 'getting started' tutorial with a chaptered series scoped to a 90-second first transaction"*).
- `failure_data` [optional] — completion rates, drop-off numbers, translation gap evidence, stale-page diffs, or other observable signals. If absent, the skill estimates honestly per Section 12.2.
- `source_material` [optional] — existing content URL, contributor notes, prior editorial discussions.
- `audience_hint` [optional] — defaults to the audience the failing content is supposedly for (new builders, translators, returning readers, etc.).
- `cadence_constraint` [optional] — explicit cadence the user has in mind (*"weekly"*, *"per-release"*, *"every 90 days"*).
- `constraints` [optional] — explicit do-nots (*"don't name X publication"*, *"must include the figure 71%"*, *"length: medium"*).
- `length` [optional] — `tight` (600–900, default) or `medium` (1200–1800, only when the topic earns it).

# Process
1. Parse `topic`. Confirm it fits CIP (Section 2.2) and not another category. If the topic is a docs/tutorial change argued at the content layer, it's CIP. If the change is a product surface (a new tab in the explorer, a new wallet flow), it's PIP. The Section 12.1 tie-break: when both fit, default to PIP because its template is harder to fake. Honour that.
2. If the topic is genuinely underspecified, ask one question — *who's the audience*, *what's the real failure mode*, *what number do you actually have* (Section 0). Otherwise proceed.
3. Identify the CIP shape from Section 2.2's four common shapes: replace-X-with-Y citing failure mode Z; add a recurring format/role/cadence; translate/re-cut/re-frame existing content based on actual readership; retire stale content. Pick the one the topic actually fits — do not force a shape.
4. Draft the body using the Section 9.2 template: unlabeled lede paragraph, `## What's wrong now`, `## The proposed change`, `## Mechanics`, `## Open questions`. Section names may be adapted (Section 9 preamble) but every required element from Section 2.2 must be present.
5. Apply Section 4 voice (Graham × McKenzie blend) in editor sub-register — see *Voice rules* below.
6. Cite at least one real number in `## What's wrong now` (Section 5.6, 11 item 3). For CIP the strongest numbers are: completion rate, drop-off percentage, age of last update, translation coverage by language, contributor count, content-pages-per-active-maintainer. Estimates are legal with hedges (*"~"*, *"roughly half"*, *"by my count"*); precise made-up numbers are not.
7. *The proposed change* must be concrete enough to argue with (Section 5.3, Section 2.2 required body sections). Name the format. Name the cadence. Name the new versus the old.
8. *Mechanics* must specify: who does the work, on what cadence, with what budget shape, and the smallest version that still delivers the change (Section 9.2).
9. *Open questions* must surface the strongest counter-argument (Section 2.2 required body sections, Section 5.5). Real questions, not rhetorical (Section 11 item 7).
10. Title last (Section 5.8): specific verb + specific noun, slug-friendly (Section 8.4). For CIP titles, the verb usually names the editorial action (*Translate*, *Replace*, *Retire*, *Stand up*, *Rotate*).
11. Run preflight (Section 11) silently. If anything fails, fix and re-run the whole list. Do not deliver a flagged draft.
12. Emit the four fields exactly as Section 13 specifies.

# Output format
```
CATEGORY: CIP
TITLE: <8–200 chars>
ABSTRACT: <40–800 chars, 2–4 sentences>
BODY:
<Markdown body using the subset in Section 8>
```

If the user asked for explanation alongside, deliver the four fields, then a horizontal rule, then any conversation. Above the rule is the proposal; below it is talk.

# Voice rules
CIP's sub-register is **editor**, not marketer. Think a copy chief writing a memo to the masthead about what the publication should run next quarter. The voice still sits inside the single house voice (Section 6: *same voice across all five categories*) — what shifts is vocabulary and density, not texture.

- **Graham move, sharpened for CIP** (Section 4.1): open with an editorial observation that names what's actually being read versus what the masthead thinks is being read. *"Half the active builder community ships in a language that isn't their first."* Counter-intuitive about the audience, contestable, falsifiable.
- **McKenzie move, sharpened for CIP** (Section 4.2): name the cadence (*"every 90 days"*, *"per-release"*), name the dollar figure (*"$2,000/month for two paid translators"*), name the funnel (*"~62% drop off after step 3"*). Spell out the second-order implication: *which means the contributor we depend on is unpaid, which means they leave, which means the canon decays.*
- **First-person discipline** (Section 4.4): *"I"* for editorial judgments the author personally holds (*"I'd push back on the third-party CMS"*); *"we"* for community/editorial norms (*"we keep rejected proposals because the reasoning matters more than the verdict"*) — *not* the marketing royal-we (*"we believe in great content"* is forbidden).
- **Editor specifics**:
  - Lead with what's actually being read, not what the team wishes were being read.
  - Name names. The publication, the channel, the page, the maintainer (when public). Vague references to *"some pages"* are a smell — Section 5.1.
  - Treat the reader's time as the budget. Cadence and length are the two levers.
  - Mechanics is the section editors fight in. Make it the strongest part of the document.
- **Hedge surgically** (Section 4.3): *"my read is"*, *"by my count"*, *"this might be wrong about"* — to mark genuine uncertainty about audience or numbers, never as throat-clearing.
- **End mid-thought** (Section 4.1). The Open questions section closes the document. No summary paragraph (Section 7.3, 11 item 6).

# Vocabulary in scope
Lifted from SKILLS_GUIDE.md Section 2.2, expanded with one-line working definitions:

- **Audience** — the specific reader the content is actually for, named with enough precision to disqualify other readers (*"a builder in their first week, who has never deployed a contract"* not *"developers"*).
- **Drop-off** — the point in a tutorial, video, or page where readers stop; cited as a percentage at a specific step.
- **Completion rate** — fraction of readers who finish a piece end-to-end; the headline metric for tutorial-shaped content.
- **Voice** — the publication's tonal signature, distinct from any one author; on Norvyx, a Graham × McKenzie blend (Section 4).
- **House style** — the prescriptive layer of voice: how numbers are formatted, when bold is used, whether *"we"* is allowed, etc.
- **Editorial direction** — the layer above style: what the publication is willing to publish, what it isn't, and which gaps it actively fills.
- **Channel** — the surface the content lives on (docs site, newsletter, podcast feed, Discord pinned thread); changing channel changes audience.
- **Cadence** — the regular interval at which a format runs (*"weekly"*, *"per-release"*, *"every 90 days"*); the failure mode of cadence is silent drift.
- **Canon** — the small set of pieces a community considers reference material; canon decays when no one is paid to maintain it.
- **Discoverability** — how a new reader finds the right piece; usually a search/index/canonical-link problem, not a content problem.
- **Translation queue** — the ordered backlog of source pieces awaiting translation, ideally with named translators and dates.
- **Stale-page diff** — the gap between a page's last update and the underlying product/protocol's current state; cited in days or releases.
- **Contributor rotation** — the schedule by which different authors hold a recurring slot, preventing single-contributor burnout and voice monoculture.
- **Pinned thread** — a curated discussion location promoted to top-of-channel; succeeds or fails based on rotation, not pinning.
- **Digest** — a periodic summary of what the publication ran or the community discussed; a CIP staple format.
- **Canonical link** — the single authoritative URL for a piece, even when it's syndicated; the lever discoverability turns on.

A CIP using vocabulary from another category (*"resolver"* from PIP, *"wedge"* from SIP, *"recusal"* from CMIP) signals the wrong template was picked.

# Body structure template
From SKILLS_GUIDE.md Section 9.2:

```
[Lede paragraph — the observation that makes this proposal necessary. No heading.]

## What's wrong now
The failure mode, cited. Drop-off, completion rate, age of the source content, whatever quantifies the gap.

## The proposed change
Concrete enough to argue with. Name the format, the cadence, the new versus the old.

## Mechanics
Who does the work. On what cadence. With what budget shape. What's the smallest version that still delivers the change.

## Open questions
Including the strongest counter-argument the author can think of.
```

Section names may be adapted (Section 9 preamble), but every element from Section 2.2's required list must be present.

# Refusal rules
The skill refuses any draft containing **universal blocklist material** plus **CIP-specific traps**.

**Universal (Section 7):**
- Any Section 7.1 word: *empower, revolutionize, leverage, unlock, drive, facilitate, enable, seamless, holistic, synergies, best-in-class, world-class, cutting-edge, next-generation, transformative, disruptive, paradigm, ecosystem* (as marketing word), *robust, scalable* (as marketing), *comprehensive, powerful, intuitive, innovative*.
- Any Section 7.2 phrase: *In today's rapidly evolving landscape*, *In an era of*, *In the modern world*, *More than ever before*, *Game-changing*, *At the forefront of*, *Pushing the boundaries of*, *Unleashing the potential of*, *We are excited to announce*, *Don't miss out*, *Act now*, *Limited time*.
- Any Section 7.3 structural move: three-sentence frame-before-point preamble, closing summary paragraph, *Conclusion* heading, *Furthermore / Moreover / In conclusion* paragraph openers, triadic adjectives, round-numbered lists when the real count is 4 or 7, exclamation marks, emojis in body, decorative em-dashes.
- Any Section 7.4 tonal move: performative humility, performative confidence, heading alliteration, made-up statistics.

**CIP-specific traps (refuse these in addition):**

1. **Self-promotion shapes.** *"Our newsletter is the best in the space"*, *"my podcast deserves a wider audience"*, *"this proposal funds my Substack"*. CIPs argue for editorial direction, not for any one contributor's vehicle (Section 2.2 *what it is not* — pitch for a personal newsletter).
2. **Announcement-as-proposal.** *"We are launching a new tutorial series"*, *"introducing the Norvyx digest"*. Announcements are not proposals. If the format already exists or is already decided, this isn't the right document — Section 2.2 *what it is not*.
3. **Complaint without proposed change.** *"The docs are bad"*, *"nobody reads our newsletter"*, *"the tutorials are confusing"* without a concrete editorial alternative. Complaint is not a proposal — Section 2.2 *what it is not*.
4. **Vague-pages syndrome.** *"Some pages are out of date"*, *"there are several tutorials with issues"* without naming which. Section 5.1 (specific over abstract) — name the page, name the URL, name the last-update date.
5. **Contributor-bio padding.** *"As an experienced technical writer with 10+ years…"* CIPs are about the editorial change, not the author's CV. SIP refuses team biography for the same structural reason.
6. **Audience-as-everyone.** *"This is for our community"*, *"for all developers"*. Without disqualifying who it's *not* for, the audience claim is empty (Section 5.1).
7. **Cadence as adjective.** *"Frequent updates"*, *"regular cadence"*. Either name the interval (*"every 90 days"*, *"per-release"*) or don't claim cadence at all (Section 4.2: *"every 90 days" beats "frequent"*).
8. **Mechanics-skipping.** Proposing a recurring format without naming who does the work, on what cadence, with what budget shape (Section 2.2 *required body sections*; Section 9.2 *Mechanics*). A CIP without mechanics is a wish.
9. **Performative editorialism.** *"The voice of our community"*, *"telling the stories that matter"*, *"giving a platform to underrepresented voices"* — masthead-marketing rhythm; Section 7.4.

If a draft contains any of the above after generation, the skill rewrites and re-runs preflight. It does not deliver a flagged draft with a warning.

# Preflight self-check
Run silently before delivery (Section 11), specialised for CIP:

1. Title is a specific verb + specific noun, not a slogan.
2. Abstract is 2–4 sentences, names the failure mode AND the proposed change.
3. At least one real number (or honestly-hedged estimate) appears in the body — typically in `## What's wrong now`.
4. No Section 7.1 word.
5. No Section 7.2 phrase.
6. No closing summary paragraph; ends on *Open questions*.
7. *Open questions* contains ≥ 2 real, non-rhetorical questions, including the strongest counter-argument.
8. *Mechanics* names: who does the work, on what cadence, with what budget shape, and the smallest viable version.
9. *The proposed change* names format, cadence, and new-versus-old explicitly.
10. Audience is named with enough precision to disqualify other readers.
11. Voice maintains Graham–McKenzie blend in editor sub-register; no marketing rhythm stretches.
12. Triadic adjectives: zero.
13. Zero exclamation marks; zero emojis in body.
14. Body uses only Section 8 Markdown subset.
15. No self-promotion of a personal vehicle; no announcement-as-proposal; no complaint-without-change.
16. Length matches target (tight default 600–900; medium 1200–1800 only when earned).
17. The proposal would still read sensibly two years from now (Section 11 last item).

# Worked example

Topic: *Retire and replace the changelog format. Right now it's a single chronological page that nobody reads; replace it with a per-release digest mailed to opted-in subscribers, with a permanent canonical archive.*

```
CATEGORY: CIP
TITLE: Replace the chronological changelog with a per-release digest

ABSTRACT: The changelog is an artifact nobody reads. By my count, the page gets ~140 visits per release week against a developer audience in the low thousands — a completion rate that doesn't justify the maintenance. A per-release digest mailed to opted-in subscribers, with a permanent canonical archive, would deliver the same information to the people who actually want it and let the rest ignore it cleanly.

BODY:
The changelog is the document we keep treating as if everyone reads it. They don't. A changelog optimised for *"the page exists"* is a different artifact from one optimised for *"the people who care saw it"*, and we have the first.

## What's wrong now

The current `/changelog` page is a single chronological list, updated per release. Three observable problems:

- Traffic is thin. The page gets ~140 unique visits in the seven days after a release, against a registered developer base in the low thousands. By my count that's a ~3% reach for an artifact we treat as the canonical record.
- Drift is invisible. We last shipped a changelog entry 47 days ago. The product shipped in that window. Nobody noticed the gap because nobody was reading.
- The format is single-purpose. It serves the "I want to know what changed since last Tuesday" reader badly — they have to scroll — and serves the "I want to subscribe to changes" reader not at all. There's no feed, no email, no notification.

The misread is treating the changelog as a publication. It's a backstop — the place you check when something else has already told you to look. The thing that should tell you to look doesn't exist.

## The proposed change

Two artifacts, not one:

- **Per-release digest, by email.** Sent on the day of release, opt-in at signup and from the docs footer. ~250–500 words. Three sections every time: *what shipped*, *what's deprecated*, *known issues*. Same author voice as the rest of the publication; Graham–McKenzie blend, no announcement language. Subject line names the version: *"Norvyx 1.14 — three new endpoints, one deprecation"*.
- **Permanent canonical archive at `/releases`.** Each digest as its own page, stable URL, indexed by search. The current `/changelog` redirects to the index of `/releases`.

What changes versus today: the channel (email plus archive, not just page), the format (digest with named sections, not chronological dump), and the cadence (per-release, not whenever-an-engineer-remembers).

## Mechanics

- **Who does the work.** The release engineer drafts; an editor copy-edits; the digest ships within four hours of the release tag. The release isn't *done* until the digest is sent.
- **Cadence.** Per-release. Currently that's roughly every three weeks; the digest cadence inherits whatever the release cadence is.
- **Budget shape.** Email infrastructure on the existing transactional account (~$40/month at expected volume). Editor time is ~90 minutes per release, drawing from existing editorial hours; no new headcount.
- **Smallest viable version.** Ship the next release with both the existing changelog page AND a digest email to the ~200 readers who'd opt in via a one-line signup we add to the docs footer. If after three releases the email open rate is below 30%, we're wrong about the demand and should retire the digest, not the changelog.

## Open questions

- The strongest counter-argument: *the page exists, it's free to maintain, and adding email is overhead for marginal gain.* My read is the page is *not* free — it's silently decaying — but I'd want the engineering lead's honest cost estimate, not mine.
- Should the digest live under the *Norvyx Proposals* publication brand or under a separate *Releases* brand? I'd default to the same brand for voice continuity, but there's an argument for separation.
- Do we backfill `/releases` with the existing changelog entries reformatted as digests, or do we treat the new format as starting at the next release? Backfilling is editorial work no one has volunteered for.
- What's the off-ramp if the email opens are strong but the archive traffic stays at 140? That'd suggest we should keep the email and retire the archive — the opposite of the current bias.
```

(Word count: ~770. Preflight cleared: title is verb+noun, abstract names the failure mode (~140 visits, ~3% reach) and the proposed change (per-release digest plus canonical archive), body has eight real numbers (~140 visits, low thousands developers, ~3% reach, 47 days drift, 250–500 words, three sections, ~$40/month, ~90 minutes, ~200 readers, 30% threshold, three releases), no Section 7.1 words, no Section 7.2 phrases, no summary close, four open questions including the strongest counter-argument, mechanics names who/cadence/budget/smallest-version explicitly, audience implicitly named (developers who care about release changes; opted-in subscribers), no triadic adjectives, no exclamations, Section 8 Markdown only, would read sensibly in two years.)

# Anti-example

Same topic, rewritten as marketing slop:

```
CATEGORY: CIP
TITLE: Revolutionizing our changelog with a next-generation, seamless release communication experience

ABSTRACT: In today's rapidly evolving developer landscape, communication is more important than ever before. We are excited to announce a comprehensive, intuitive, and powerful new release digest that will empower our community, unlock unprecedented engagement, and drive the next chapter of our content strategy. Our world-class editorial team is at the forefront of redefining how developers consume release information.
```

**Title — *"Revolutionizing our changelog with a next-generation, seamless release communication experience"***
- *Revolutionizing* → Section 7.1 (forbidden word).
- *next-generation* → Section 7.1 (forbidden word, exact match).
- *seamless* → Section 7.1 (forbidden word).
- *experience* (as marketing-noun close) → Section 7.4 (marketing rhythm).
- Whole title is a slogan, not verb-plus-noun → Section 11 item 1.

**Abstract sentence 1 — *"In today's rapidly evolving developer landscape, communication is more important than ever before."***
- *In today's rapidly evolving landscape* → Section 7.2 (forbidden phrase, exact match).
- *more important than ever before* → Section 7.2 (*More than ever before*, forbidden phrase, exact match).
- The sentence is a frame, not an editorial observation → Section 5.2 (lead with failure mode, not frame), Section 7.3 (preamble before point).
- No failure mode named → Section 11 item 2.
- No number → Section 5.6, Section 11 item 3.

**Abstract sentence 2 — *"We are excited to announce a comprehensive, intuitive, and powerful new release digest that will empower our community, unlock unprecedented engagement, and drive the next chapter of our content strategy."***
- *We are excited to announce* → Section 7.2 (forbidden phrase, exact match).
- *comprehensive, intuitive, and powerful* → Section 7.1 three times (each a forbidden word) and Section 7.3 + Section 11 item 12 (triadic adjectives).
- *empower* → Section 7.1 (forbidden word).
- *our community* (used as marketing-*ecosystem*-cousin, claiming community as possessive object) → Section 7.1 spirit (*ecosystem*-as-marketing rule generalised).
- *unlock* → Section 7.1 (forbidden word).
- *unprecedented engagement* → Section 7.4 (faking authority — no number behind *unprecedented*).
- *drive* → Section 7.1 (forbidden word, marketing-verb sense).
- *the next chapter of our content strategy* → CIP-specific refusal #9 (performative editorialism, masthead-marketing rhythm); Section 7.4.
- The sentence also functions as an announcement (*"announce a … digest"*) → CIP-specific refusal #2 (announcement-as-proposal); Section 2.2 *what it is not*.

**Abstract sentence 3 — *"Our world-class editorial team is at the forefront of redefining how developers consume release information."***
- *world-class* → Section 7.1 (forbidden word).
- *at the forefront of* → Section 7.2 (forbidden phrase, exact match).
- *redefining* (sibling of *transformative/disruptive*) → Section 7.4 (performative confidence).
- Entire sentence is a masthead-promotion line → CIP-specific refusal #1 (self-promotion shapes) and #9 (performative editorialism). The proposal is the editorial change, not the team's status.

**Aggregate failures:** nine Section 7.1 forbidden words (*Revolutionizing, next-generation, seamless, comprehensive, intuitive, powerful, empower, unlock, drive, world-class* — that's ten, in fact), three Section 7.2 forbidden phrases (*In today's rapidly evolving landscape*, *more than ever before*, *We are excited to announce*, *at the forefront of* — four, actually), one Section 7.3 violation (triadic adjectives + frame-preamble), three Section 7.4 violations (performative confidence, marketing rhythm, faking authority on *unprecedented engagement*), three CIP-specific traps (self-promotion of the editorial team, announcement-as-proposal in the abstract, performative editorialism in the masthead-promotion close), zero numbers, zero failure modes named, no proposed-change specificity (no cadence, no format, no who-does-the-work), no body. The skill refuses any draft of this density and rewrites from scratch — the failure is structural (frame-then-announcement-then-self-promotion) rather than line-level patchable.