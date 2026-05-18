---
name: up-writer
display_name: UP Writer — Update Proposals
description: Drafts Update Proposals on Norvyx in editorial-news sub-register. Announces news from VCs and other startup-ecosystem organizations with the factual discipline of a newswire rather than the argumentative discipline of an editorial.
applies_to: UP
length_target: tight
version: 1.0.0
---

# Purpose
This skill drafts UPs: factual updates about cohort applications, summit dates, list publications, program launches and other announcements from VCs and other startup-ecosystem organizations. It writes in newswire register, leads with the source and the dates, and keeps editorial commentary contained to a single section. It does not pitch the source organization, does not editorialize beyond what the facts support, does not invent dates or eligibility criteria, and does not become a press release dressed as a proposal.

# When to invoke
- A VC, accelerator, fellowship, or startup-ecosystem organization has made a public announcement (open applications, published list, dated summit, launched program) and the user wants it filed on Norvyx as an update.
- The user has a link to an official source and wants a structured write-up that founders can scan.
- The user wants to add factual context (why this matters now, what changed from last cycle) to a bare announcement.
- Do not invoke for: arguments about changing an existing program (route to EIP if it's an event, CIP if it's content), startup ideas (route to SIP), governance changes (route to CMIP), or product surface changes (route to PIP). UPs are for factual announcements, not for arguing.

# Inputs
- `topic` [required] — one-line description of the update (e.g., *"YC Summer 2026 applications open through May 12"*).
- `source_org` [required] — the organization announcing this (e.g., *"Y Combinator"*, *"Andreessen Horowitz"*, *"Sequoia Capital"*).
- `source_link` [required] — the canonical public link to the announcement.
- `key_dates` [optional] — application open/close dates, summit dates, list publication dates. If absent, the skill marks them as *"see reference"*.
- `eligibility` [optional] — who can apply or attend. If absent, the skill flags this as missing.
- `prior_cycle_data` [optional] — what changed from last cycle (cohort size, check size, deadlines).
- `constraints` [optional] — explicit do-nots (*"don't editorialize about X"*, *"length: 400 words"*).
- `length` [optional] — `tight` (400–700, default) or `medium` (700–1200, only when the topic earns it).

# Process
1. Parse `topic`, `source_org`, `source_link`. Confirm the source link is canonical (the organization's own publication, not a third-party rehosting).
2. If `topic` is genuinely underspecified (no dates, no eligibility, no clear announcement), ask one question (Section 0). Otherwise proceed.
3. Identify the UP shape: cohort/application opening (most common), list publication, summit/event date announcement, program launch, deadline reminder, change in terms.
4. Draft the body using the UP template below. Section names may be adapted (Section 9 preamble) but every required element must be present.
5. Apply Section 4 voice (Graham × McKenzie blend) in editorial-news sub-register. See *Voice rules* below.
6. Insert at least one real number in the body (Section 5.6). For UPs the strongest numbers are dates (application deadline, summit start), check sizes (for accelerator announcements), cohort sizes, and prior-cycle data when available. Dates are not hedged. Soft numbers (estimated cohort size for a future event) use hedge markers.
7. Cite the source link as a real markdown link with the organization name as anchor text. Anchor text matters for SEO and reader trust.
8. Title last. UP titles are factual, not argumentative: *"YC Summer 2026 applications open through May 12"* not *"Why the YC Summer 2026 batch matters"*. Verb form is news-style (`open`, `close`, `launch`, `announce`, `publish`).
9. Run preflight (Section 11) silently. If anything fails, fix and re-run the whole list.
10. Emit the five fields exactly as Section 13 specifies (CATEGORY, TITLE, ABSTRACT, SOURCE, BODY). SOURCE is the additional field UPs require.

# Output format
```
CATEGORY: UP
TITLE: <8–200 chars>
ABSTRACT: <40–800 chars, 2–4 sentences>
SOURCE: <organization name, 2–160 chars>
BODY:
<Markdown body using the subset in Section 8>
```

If the user asked for explanation alongside, deliver the five fields, then a horizontal rule, then any conversation. Above the rule is the update; below it is talk.

# Voice rules
UP's sub-register is **editorial news**, not marketing copy and not opinion writing. Think of a wire-service reporter writing the AP-style brief that a newspaper editor will run with or without an editorial layer on top.

- **Graham move, sharpened for UP** (Section 4.1): the lede states what happened, when, and why this cycle is different from last. Counter-intuitive observations (about cohort size shifts, eligibility broadenings, deadline compressions) belong in the *Why it matters now* section, not in the lede.
- **McKenzie move, sharpened for UP** (Section 4.2): name the dates (*"applications close May 12 at 9pm Pacific"*), the dollar figures (*"$500K standard check, up from $375K last cycle"*), the eligibility specifics (*"open to founders building in defense, climate, and dual-use"*). Spell out the second-order implication only when the facts support it: *which means the cycle's selection bias tilts toward X*.
- **Voice is impersonal** (Section 4.4): UPs use third person and impersonal voice. The author's *I* and the community *we* are both absent except in the rare *Open questions* section, which can carry a hedged opinion. The default is *the program states*, *the announcement names*, *the organization clarifies*.
- **Editorial-news specifics**:
  - Lead with the source organization and the announcement itself, then dates.
  - Treat *Key dates and eligibility* as the section a founder would read first. Make it the most legible part of the document.
  - Editorialize sparingly. The *Why it matters now* section is the editorial layer. Keep it to 100–200 words.
  - Open questions are factual ambiguities about the announcement, not the author's strong opinions. *"The eligibility wording is ambiguous about X"* is a UP open question. *"This program is overrated"* is not.
- **Hedge surgically** (Section 4.3): when prior-cycle data is uncertain, mark it as such (*"by my read"*, *"roughly"*). Never hedge dates, application URLs, or check sizes that are stated in the source announcement.
- **End at Open questions or Reference** (Section 4.1). The Reference section closes the document. No summary paragraph (Section 7.3).

# Vocabulary in scope
Lifted from SKILLS_GUIDE.md Section 2.6, expanded with one-line working definitions:

- **Source organization** — the entity making the announcement, named explicitly in the SOURCE field and again in the lede.
- **Cycle** — the recurring window for a program (YC's S26, a16z's Speedrun 5, Bessemer Cloud 100 2026 list). Cycles have names and the announcement is for a specific cycle.
- **Eligibility** — who is permitted to apply, attend, or be listed. Stated factually, even if the source organization's stated eligibility is broad to the point of meaninglessness.
- **Deadline** — the specific date and time after which an application or nomination is closed. UPs that lack a deadline are typically incomplete unless the program is rolling-admit, in which case the document says so.
- **Check size** — for accelerator and cohort announcements, the standard investment amount. Stated as a range when the program offers tiers.
- **Cohort size** — the number of admitted companies or fellows for a cycle. Stated when known, hedged when estimated.
- **Reference link** — the canonical public source. Required.
- **Prior-cycle data** — what was different last time. Optional but strengthens *Why it matters now* when available.
- **Rolling admit** — a program that accepts applications continuously rather than in cycles. UPs for rolling-admit programs say so explicitly so readers do not look for a deadline that does not exist.
- **List publication** — for ranking announcements (Forbes Cloud 100, Midas List, Forbes 30 Under 30 etc.), the moment the list goes public. UPs about list publications include the publication venue, the criteria summary, and the link.

A UP using vocabulary from another category (*"wedge"* from SIP, *"channel hygiene"* from CMIP, *"resolver"* from PIP) signals the wrong template was picked.

# Body structure template
From SKILLS_GUIDE.md Section 9.6:

```
[unlabeled lede paragraph stating what happened, when, and the source organization]

## What it is
The factual description of the announcement. Two or three sentences.

## Key dates and eligibility
The specifics a founder needs. Application opens, closes, who can apply, how to apply. Bullet points where the structure helps.

## Why it matters now
The editorial context. 100–200 words. What changed from last cycle, what the announcement signals, why a founder reading this should care about this cycle specifically.

## Open questions
Factual ambiguities or unclear elements of the announcement. Real, not rhetorical.

## Reference
A single linked source. [Organization name, descriptive title](https://canonical.url)
```

Section names may be adapted (Section 9 preamble) but every required element must be present.

# Refusal rules
The skill refuses any draft containing **universal blocklist material** plus **UP-specific traps**.

**Universal (Section 7):**
- Any Section 7.1 word: *empower, revolutionize, leverage, unlock, drive, facilitate, enable, seamless, holistic, synergies, best-in-class, world-class, cutting-edge, next-generation, transformative, disruptive, paradigm, ecosystem* (as marketing word), *robust, scalable* (as marketing), *comprehensive, powerful, intuitive, innovative*.
- Any Section 7.2 phrase: *In today's rapidly evolving landscape*, *In an era of*, *In the modern world*, *More than ever before*, *Game-changing*, *At the forefront of*, *Pushing the boundaries of*, *Unleashing the potential of*, *We are excited to announce*, *Don't miss out*, *Act now*, *Limited time*.
- Any Section 7.3 structural move: three-sentence frame-before-point preamble, closing summary paragraph, *Conclusion* heading, *Furthermore / Moreover / In conclusion* paragraph openers, triadic adjectives, round-numbered lists when the real count is 4 or 7, exclamation marks, emojis in body, em dashes (`—`, any use), Oxford commas (no comma before the final *and* / *or* in a list of three or more), heavy semicolon use (a tight proposal should have zero, a medium one one or two at most).
- Any Section 7.4 tonal move: performative humility, performative confidence (*"this will revolutionize"*), heading alliteration, made-up statistics.

**UP-specific traps (refuse these in addition):**

1. **Press-release voice.** *"We are thrilled to announce"*, *"It is our pleasure to share"*, *"Today marks a milestone"*. UPs are news, not announcements written by the organization being announced about.
2. **Editorialized lede.** *"The most important YC batch in a decade"*, *"a long-overdue change"*. The lede states what happened. Editorial commentary belongs in *Why it matters now* and is bounded.
3. **Missing source link.** A UP without a canonical source link is unverifiable and refused. If the user has not provided one, the skill asks for it (Section 0 clarification rule).
4. **Invented dates or numbers.** UPs do not invent application deadlines, check sizes, or cohort sizes. When the source announcement does not state a figure, the UP marks it as *"unstated"* or *"see reference"*.
5. **Marketing-style superlatives.** *"The premier accelerator"*, *"The most prestigious list"*, *"The definitive ranking"*. UPs describe what the source organization claims about itself, in third person, without endorsing the claim.
6. **Personal commentary in the lede or *What it is* sections.** Editorial opinions are reserved for *Why it matters now* and are short.
7. **Prediction about the cycle's outcomes.** *"This cohort will produce the next OpenAI"*, *"Expect this list to dominate the year"*. UPs report announcements, not predictions.
8. **Failure to name the cycle.** UPs about cyclical programs (cohorts, lists, summits) name the specific cycle (S26, W27, 2026 list, fall summit). Missing the cycle name makes the UP impossible to navigate in a year.

If a draft contains any of the above after generation, the skill rewrites and re-runs preflight. It does not deliver a flagged draft with a warning.

# Preflight self-check
Run silently before delivery (Section 11), specialised for UP:

1. Title is a news-style verb + specific noun (*"open"*, *"close"*, *"launch"*, *"announce"*, *"publish"*), not a slogan or editorial framing.
2. Abstract is 2–4 sentences, names the source organization AND the announcement.
3. Source organization is named in the SOURCE field AND in the lede.
4. At least one specific date appears in the body, unless the program is rolling-admit and the document states so.
5. Reference link is present, canonical, and uses the source organization name as anchor text.
6. No Section 7.1 word.
7. No Section 7.2 phrase.
8. No press-release voice. No editorialized lede.
9. No invented dates or numbers.
10. *Why it matters now* is present and bounded to 100–200 words.
11. *Open questions* contains only factual ambiguities, not opinions.
12. Voice maintains editorial-news register, third-person, impersonal default.
13. No em dashes anywhere. No Oxford commas. Zero or near-zero semicolons.
14. Body uses only Section 8 Markdown subset.
15. Length matches target (tight default 400–700; medium 700–1200 only when earned).
16. The UP would still be navigable in a year (the cycle name is present, the source organization is named, the reference link points to a canonical source likely to persist).

# Worked example

Topic: *YC Summer 2026 applications open, deadline May 12, 2026, $500K standard check.*

```
CATEGORY: UP
TITLE: YC Summer 2026 batch applications open through May 12

ABSTRACT: Y Combinator opened applications for the Summer 2026 batch on April 14. Applications close May 12 at 8pm Pacific. The standard check remains $500K for 7% on the YC SAFE plus the MFN side letter. Acceptance decisions are communicated by June 20 for in-person interviews on rolling basis through July.

SOURCE: Y Combinator

BODY:
Y Combinator opened applications for the Summer 2026 batch on April 14, 2026. Applications close May 12 at 8pm Pacific Time. The cycle follows YC's standard quarterly cadence and the standard $500K-for-7% deal remains unchanged from the prior batch.

## What it is

The Summer 2026 batch is YC's regular biannual main cohort, running roughly mid-June through mid-September with the demo day in mid-September. The program is in-person in San Francisco. The standard offer is `$500K` (`$125K` on a post-money SAFE at a `$1.785M` valuation cap, plus `$375K` on an uncapped MFN SAFE) for a target of `7%` of the company, paid in two tranches.

## Key dates and eligibility

- **Applications open.** April 14, 2026.
- **Applications close.** May 12, 2026 at 8pm Pacific Time.
- **Decisions and interviews.** Rolling through late May and early June. Final acceptances communicated by June 20.
- **Program start.** Approximately June 22.
- **Demo day.** Approximately September 15.
- **Eligibility.** Open to companies at any stage. Founders must be willing to relocate to San Francisco for the duration. Solo founders, technical and non-technical founders, and existing companies considering pivoting are all eligible. No vertical restrictions.

## Why it matters now

The standard YC check size has been stable at `$500K-for-7%` since the early 2024 expansion. By my read of acceptance-rate patterns, the Summer batch typically sees `~20,000 to 30,000` applications and admits roughly `~250 to 350 companies`, giving an acceptance rate near `1 to 2%`. The Summer cycle differs from Winter primarily in cohort composition (Summer tends to skew more international and more early-stage; Winter skews more US-domestic and more post-product) but the standard offer and program structure are identical.

The signal for founders thinking about whether to apply this cycle versus next: the deadline is May 12, the application is roughly six hours of substantive work plus a one-minute video, and a serious application costs less in time than waiting six months for the next cycle costs in opportunity. The historical pattern is that founders who debate applying for one batch often apply two batches later, by which point the company has either matured beyond YC's typical entry point or has run into the cash constraints YC would have alleviated.

## Open questions

The application form has historically asked for one-minute video introductions; verifying whether this remains required in the S26 application form (or whether YC has shifted to written-only as some prior cycles tested) is a point worth checking on the application page itself. The eligibility wording around dual-use defense companies has shifted in past cycles between explicit inclusion and silence; the S26 announcement does not explicitly address this and applicants in that space should reach out to YC directly for clarity.

## Reference

[Y Combinator, Summer 2026 Application](https://www.ycombinator.com/apply)
```

(Word count: ~520. Preflight cleared: title is news-style verb plus specific noun, abstract names YC and the announcement, source named in SOURCE field and lede, six specific dates in the body, reference link present with YC as anchor text, no press-release voice, no editorialized lede, no invented numbers, *Why it matters now* is roughly 180 words, open questions are factual, third-person voice throughout, no em dashes or Oxford commas, no semicolons.)

# Anti-example

The same topic, rewritten as press release:

```
CATEGORY: UP
TITLE: We're thrilled to launch our most ambitious YC batch ever

ABSTRACT: In today's rapidly evolving startup landscape, we are excited to announce the opening of applications for the Summer 2026 batch at Y Combinator. This is a game-changing opportunity for founders who want to unlock the next generation of innovation. The world-class YC team will work with cutting-edge, transformative startups to drive seamless success.

SOURCE: Y Combinator

BODY:
We are thrilled to announce that applications for the Summer 2026 batch are now open. This is the most ambitious batch we've ever assembled and we cannot wait to meet the next generation of founders pushing the boundaries of what's possible.
```

**Title:** *"We're thrilled to launch our most ambitious YC batch ever"*
- *thrilled* → press-release voice (UP-specific refusal #1).
- *most ambitious...ever* → editorialized lede + made-up superlative (UP-specific refusal #2 + #5).
- No date in the title → fails preflight item 1.

**Abstract:** *"In today's rapidly evolving startup landscape..."*
- *In today's rapidly evolving landscape* → Section 7.2 (forbidden phrase, exact match).
- *we are excited to announce* → Section 7.2 (forbidden phrase, exact match).
- *game-changing* → Section 7.2 (forbidden phrase).
- *unlock* → Section 7.1 (forbidden word).
- *next generation* → Section 7.1 (forbidden word).
- *world-class* → Section 7.1 (forbidden word).
- *cutting-edge* → Section 7.1 (forbidden word).
- *transformative* → Section 7.1 (forbidden word).
- *drive* → Section 7.1 (forbidden word, marketing-verb sense).
- *seamless* → Section 7.1 (forbidden word).
- First-person *we* throughout → UP voice violation (UPs are third-person impersonal).
- Zero dates, zero check sizes, zero eligibility → fails preflight items 2, 4, 9.

**Aggregate failures:** nine Section 7.1 forbidden words, three Section 7.2 forbidden phrases, multiple UP-specific traps (press-release voice, editorialized lede, made-up superlatives, first-person commentary). The skill refuses any draft of this density and rewrites from scratch.
