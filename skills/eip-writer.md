---
name: eip-writer
display_name: EIP Writer — Event Idea Proposals
description: Drafts Event Idea Proposals on Norvyx in programming-chair sub-register — argues for formats that gather builders in a room, with named mechanics and named risks.
applies_to: EIP
length_target: tight
version: 1.0.0
---

# Purpose
This skill drafts EIPs: proposals about how the community gathers — conferences, demo nights, retreats, side stages, recurring local events. It argues for a specific format with named cadence, named host shape, named budget envelope, and named risks. It does not pitch sponsors, does not nominate speakers (including the author), does not ask for travel budget, and does not complain about an existing event without proposing a concrete alternative format.

# When to invoke
- The user wants to argue for a new recurring event format (quarterly retreat, monthly demo night, weekly office hours).
- The user wants to change an existing event's format because it's failing on attendance, no-shows, or content quality.
- The user wants to reserve a track or slot for an under-represented type of work.
- The user wants to stand up a recurring local event in N cities.
- Do not invoke for: sponsor pitches, speaker self-nominations, travel-budget requests, post-mortems of past events without a forward-looking format proposal.

# Inputs
- `topic` [required] — one-line description of the event change (e.g. *"Quarterly invite-only off-the-record retreat for fifty builders, no press, no recording"*).
- `failure_data` [optional] — attendance numbers, no-show rates, completion/stay-rates, panel-vs-fireside watch-time, prior-iteration names. If absent, the skill estimates honestly per Section 12.2.
- `format_constraints` [optional] — duration, cadence, max attendance, recording policy, invite policy.
- `budget_hint` [optional] — venue stipend ceiling, sponsor stance (none / first-party-only / open).
- `host_shape` [optional] — single host vs rotating committee, with names if public.
- `constraints` [optional] — explicit do-nots (*"don't name the failed conference by name"*, *"must include the figure 71%"*, *"length: medium"*).
- `length` [optional] — `tight` (600–900, default) or `medium` (1200–1800, only when the topic earns it).

# Process
1. Parse `topic`. Confirm it fits EIP (Section 2.3) and not another category. EIP applies when the document argues for a *gathering format* — physical, virtual, or hybrid. If the topic is editorial content that happens to live in a podcast, it's CIP. If the topic is a moderation rotation, it's CMIP. EIP is about people in a room (or call) at a scheduled time.
2. If the topic is genuinely underspecified, ask one question — *who's the audience*, *what's the real failure mode*, *what number do you actually have* (Section 0). Otherwise proceed.
3. Identify the EIP shape from Section 2.3's four common shapes: run X format quarterly with Y constraints; reserve a track/slot for under-represented work; replace AMA-style with structured Q&A on the record; stand up a recurring local event in N cities. Pick the one the topic actually fits — do not force a shape.
4. Draft the body using the Section 9.3 template: unlabeled lede, `## What's wrong with the current format`, `## Proposed format`, `## Mechanics`, `## Risks`, `## Open questions`. Section names may be adapted (Section 9 preamble) but every required element from Section 2.3 must be present.
5. Apply Section 4 voice (Graham × McKenzie blend) in programming-chair sub-register — see *Voice rules* below.
6. Cite at least one real number in `## What's wrong with the current format` (Section 5.6, 11 item 3). For EIP the strongest numbers are: attendance, no-show rate, drop-off after lunch, panel watch-time vs fireside watch-time, registration-to-attendance ratio, venue capacity vs RSVPs. Estimates are legal with hedges (*"~"*, *"by my count"*, *"roughly"*); precise made-up numbers are not.
7. *Proposed format* must name: duration, cadence, constraints, host shape, success criterion (Section 9.3, Section 2.3 required body sections). A format proposal without a success criterion is a wish.
8. *Mechanics* must specify: venue, budget envelope, decision-making process for slots/speakers (Section 9.3). Name the money — *"$8,000 venue stipend per event"* beats *"a modest budget"* (Section 4.2).
9. *Risks* must name what could go wrong with the simplest mitigation per risk, not hedged (Section 9.3, Section 2.3). The honest version of the worst case, plus the one thing that prevents it.
10. *Open questions* must surface the strongest counter-argument (Section 5.5, Section 11 item 7). Real questions, not rhetorical ones.
11. Title last (Section 5.8): specific verb + specific noun, slug-friendly (Section 8.4). For EIP titles, the shape is usually [cadence/quality] + [format] + [defining constraint]: *"Quarterly Open House — 90 minutes of team office hours, on the record"* (Section 10.2 example).
12. Run preflight (Section 11) silently. If anything fails, fix and re-run the whole list. Do not deliver a flagged draft.
13. Emit the four fields exactly as Section 13 specifies.

# Output format
```
CATEGORY: EIP
TITLE: <8–200 chars>
ABSTRACT: <40–800 chars, 2–4 sentences>
BODY:
<Markdown body using the subset in Section 8>
```

If the user asked for explanation alongside, deliver the four fields, then a horizontal rule, then any conversation. Above the rule is the proposal; below it is talk.

# Voice rules
EIP's sub-register is **programming chair**, not event marketer. Think of someone who has run twenty conferences writing a memo to the program committee about what to fix in the next one. The voice still sits inside the single house voice (Section 6: *same voice across all five categories*) — what shifts is vocabulary and density, not texture.

- **Graham move, sharpened for EIP** (Section 4.1): open with a contestable observation about the current event culture. *"AMAs are theater"* (Section 10.2 example). Counter-intuitive, falsifiable, earns the cynicism in the body.
- **McKenzie move, sharpened for EIP** (Section 4.2): name the cadence (*"every 90 days"*), name the venue stipend (*"$8,000 per event"*), name the no-show rate (*"~32%"*). Spell out the second-order implication: *which means we over-invite, which means the room composition is wrong, which means the conversations don't happen.*
- **First-person discipline** (Section 4.4): *"I"* for programming judgments held personally (*"I'd push back on the open-call format here"*); *"we"* for community/programming norms (*"we run on-the-record by default"*) — *not* the marketing royal-we (*"we are excited to announce"* is Section 7.2 forbidden).
- **Programming-chair specifics**:
  - Lead with what's wrong with the current event landscape, not with the new event's name.
  - Treat *Mechanics* as the section a co-organiser would skip to. Make it the strongest part of the document.
  - Name the host. A format without a named host shape (single host, rotating, committee with terms) hides accountability.
  - Name the success criterion. *"Twenty meaningful introductions per attendee"* beats *"a great atmosphere"*.
  - Name the kill criterion. Under what condition do we retire this format after a year? An event without a kill criterion is permanent by accident.
- **Hedge surgically** (Section 4.3): *"my read is"*, *"by my count"*, *"this might be wrong about"* — to mark genuine uncertainty about audience size or no-show estimates, never as throat-clearing.
- **End mid-thought** (Section 4.1). The Open questions section closes the document. No summary paragraph (Section 7.3, 11 item 6).

# Vocabulary in scope
Lifted from SKILLS_GUIDE.md Section 2.3, expanded with one-line working definitions:

- **Format** — the structural shape of an event (panel, fireside, demo night, retreat, office hours); the choice of format determines almost everything else.
- **Track** — a parallel programming stream within a larger event, usually with its own audience and its own chair.
- **Cadence** — the regular interval at which a recurring event runs (*"quarterly"*, *"first Thursday of the month"*); cadence drift is the most common failure mode.
- **Side stage** — a smaller, less formal programming surface running alongside a main event; usually where the actual conversations happen.
- **Cohort** — a fixed group of attendees who go through an event together; produces stronger ties than a rotating audience but doesn't scale linearly.
- **Attendance** — the count of people who actually showed up, distinct from registrations; the gap between the two is itself a metric.
- **No-show rate** — fraction of registrants who didn't attend; the headline diagnostic for invite-quality and cadence-fit.
- **Panel** — three to five people on stage with a moderator, on the record; tends to default to safe answers unless the moderator is sharp.
- **Fireside** — a one-on-one on-stage conversation, on the record; higher signal than panels when the interviewer is prepared.
- **Off-the-record** — a stated rule that nothing said in the room is publishable or attributable; enables franker conversation, only works if enforced.
- **Transcript** — a published record of an on-the-record session; the artefact that lets the event compound over time.
- **Venue stipend** — the budget line for room rental, AV, and food, separate from speaker or staff costs; the line that scales with attendance.
- **Rotating host** — a host shape where the chair role passes between named people on a stated rotation, preventing single-host burnout and voice monoculture.
- **Invite-only** — admission gated by curation rather than registration; trades reach for room composition.
- **Open call** — admission via a public submission form (CFP for talks, RSVP for attendees); higher reach, more variance in room composition.
- **CFP (Call for Proposals)** — the structured open call for talks; succeeds or fails on the explicit rubric for what gets selected.
- **Sponsor** — an external party providing funds or in-kind support, usually in exchange for visibility; sponsorship terms are the single most common cause of event culture decay.
- **Accreditation** — formal recognition of an event by a body (academic, professional, regulatory) that admits attendees toward a credential.

An EIP using vocabulary from another category (*"resolver"* from PIP, *"wedge"* from SIP, *"recusal"* from CMIP, *"canonical link"* from CIP) signals the wrong template was picked.

# Body structure template
From SKILLS_GUIDE.md Section 9.3:

```
[Lede — the observation about the current event landscape.]

## What's wrong with the current format
Or what's missing. If there's data on attendance, completion, no-shows, names of past iterations — cite.

## Proposed format
Duration, cadence, constraints. Name the host shape. Name the success criterion.

## Mechanics
Venue, budget envelope, decision-making process for slots/speakers.

## Risks
What could go wrong, and the simplest mitigation. Named, not hedged.

## Open questions
```

Section names may be adapted (Section 9 preamble), but every element from Section 2.3's required list must be present.

# Refusal rules
The skill refuses any draft containing **universal blocklist material** plus **EIP-specific traps**.

**Universal (Section 7):**
- Any Section 7.1 word: *empower, revolutionize, leverage, unlock, drive, facilitate, enable, seamless, holistic, synergies, best-in-class, world-class, cutting-edge, next-generation, transformative, disruptive, paradigm, ecosystem* (as marketing word), *robust, scalable* (as marketing), *comprehensive, powerful, intuitive, innovative*.
- Any Section 7.2 phrase: *In today's rapidly evolving landscape*, *In an era of*, *In the modern world*, *More than ever before*, *Game-changing*, *At the forefront of*, *Pushing the boundaries of*, *Unleashing the potential of*, *We are excited to announce*, *Don't miss out*, *Act now*, *Limited time*.
- Any Section 7.3 structural move: three-sentence frame-before-point preamble, closing summary paragraph, *Conclusion* heading, *Furthermore / Moreover / In conclusion* paragraph openers, triadic adjectives, round-numbered lists when the real count is 4 or 7, exclamation marks, emojis in body, em dashes (`—`, any use), Oxford commas (no comma before the final *and* / *or* in a list of three or more), heavy semicolon use (a tight proposal should have zero, a medium one one or two at most).
- Any Section 7.4 tonal move: performative humility, performative confidence, heading alliteration, made-up statistics.

**EIP-specific traps (refuse these in addition):**

1. **Sponsor-pitch shapes.** *"This event is brought to you by…"*, *"sponsorship tiers: Gold $10K, Silver $5K…"*, *"sponsor opportunities available"*. EIPs are not sponsor decks (Section 2.3 *what it is not*). Sponsorship is a budget-line discussion in *Mechanics*, not a pitch surface.
2. **Speaker self-nomination.** *"I propose myself as the keynote speaker"*, *"as someone who has spoken at X conferences…"*. EIPs argue for formats, not for speaking slots (Section 2.3 *what it is not*). If the author wants a slot, that's a CFP submission to whatever event already exists, not a Norvyx proposal.
3. **Travel-budget requests.** *"This proposal would cover flights and accommodation for the organising team"*, *"$3K travel reimbursement per speaker"* as the headline ask. Travel costs are a budget-envelope sub-line, not the proposal's purpose (Section 2.3 *what it is not*).
4. **Complaint without alternative format.** *"The current conference is bad"*, *"the panels are boring"* without a concrete proposed format with cadence/host/success criterion. Section 2.3 *what it is not*.
5. **No-host shape.** *"A committee will decide"* without naming term length, rotation, or named seats. Section 9.3 requires named host shape; vague committees hide accountability.
6. **No success criterion.** Proposing an event format without naming what success looks like in measurable terms by which the event could be retired or renewed (Section 9.3, EIP-specific *Voice rules* above). *"A great atmosphere"* is not a success criterion.
7. **No risks section, or risks-as-disclaimers.** *"Risks are minimal"*, *"as with any event there are challenges"*. Section 9.3 mandates named risks with the simplest mitigation per risk; hedged risks aren't risks.
8. **Performative inclusivity.** *"A welcoming, inclusive, and diverse environment"* — triadic adjectives (Section 7.3, Section 11 item 12) and marketing rhythm (Section 7.4). If the event has explicit inclusion mechanics (track reservations, scholarship slots, named outreach to under-represented groups), describe the mechanics; don't decorate with adjectives.
9. **Hype-cycle openers.** *"The biggest event of the year"*, *"the must-attend gathering"*, *"the conference everyone is talking about"*. Section 7.4 (marketing rhythm), Section 7.2 (*Don't miss out / Act now* family). EIPs are programming-committee documents, not event-marketing copy.
10. **Capacity claims without venue.** *"Will host 500 attendees"* without naming the venue type or stipend. Capacity is a venue constraint; stating it as ambition without infrastructure is a wish.

If a draft contains any of the above after generation, the skill rewrites and re-runs preflight. It does not deliver a flagged draft with a warning.

# Preflight self-check
Run silently before delivery (Section 11), specialised for EIP:

1. Title is a specific verb + specific noun, not a slogan.
2. Abstract is 2–4 sentences, names the failure mode AND the proposed format.
3. At least one real number (or honestly-hedged estimate) appears in the body — typically in `## What's wrong with the current format`.
4. No Section 7.1 word.
5. No Section 7.2 phrase.
6. No closing summary paragraph; ends on *Open questions*.
7. *Open questions* contains ≥ 2 real, non-rhetorical questions, including the strongest counter-argument.
8. *Proposed format* names: duration, cadence, constraints, host shape, success criterion.
9. *Mechanics* names: venue (or venue type), budget envelope with figures, decision-making process for slots/speakers.
10. *Risks* names ≥ 2 named risks with the simplest mitigation per risk; no hedged-risk language.
11. Voice maintains Graham–McKenzie blend in programming-chair sub-register; no marketing rhythm stretches.
12. Triadic adjectives: zero.
13. Zero exclamation marks; zero emojis in body.
14. Body uses only Section 8 Markdown subset.
15. No sponsor-pitch lines, no speaker self-nominations, no travel-budget asks as headline.
16. Length matches target (tight default 600–900; medium 1200–1800 only when earned).
17. The proposal would still read sensibly two years from now (Section 11 last item).

# Worked example

Topic: *Replace the existing monthly online demo night with a quarterly in-person Builder Showcase — six demos, ninety minutes, on-the-record transcript, rotating host across three cities.*

```
CATEGORY: EIP
TITLE: Replace the monthly online demo night with a quarterly in-person Builder Showcase

ABSTRACT: The monthly online demo night has decayed into background noise. Average live attendance is ~22 against a registered list of 380 — a no-show rate north of 90% — and the demos themselves have shrunk to two-minute rehearsed pitches that nobody asks questions about. A quarterly in-person Builder Showcase, six demos at ninety minutes, with a rotating host across three cities and a published transcript, would trade reach for room composition and earn back the questions.

BODY:
Online demo nights work for a quarter, then they don't. Ours stopped working roughly six months ago. The right move is not to fix the format — the format is the problem — but to replace it with one that solves the problem the original was supposed to solve: builders meeting builders who are working on adjacent things.

## What's wrong with the current format

The monthly online demo night has been running for fourteen months. Three observable problems:

- Live attendance is ~22 against a registered list of 380. By my count that's a no-show rate above 90%, and the live audience has been shrinking ~3 attendees per month for the last six months.
- Demos have collapsed to two-minute rehearsed pitches. The Q&A slot averages 1.2 questions per demo, most of them softballs from the host. The conversation that was supposed to happen — the *"have you talked to the team doing X"* moment — doesn't.
- The recording is the artefact, but only ~140 unique views per recording. Builders who'd benefit from the introduction don't watch later, and the live audience is too small to make the introduction in the room.

The misread is treating the problem as production quality. The problem is room composition. A demo night without the right people in the room is a screencast.

## Proposed format

Quarterly in-person *Builder Showcase*. Constraints:

- **Duration:** 90 minutes plus 60 minutes of unstructured time after.
- **Cadence:** quarterly, first Saturday of the second month of each quarter.
- **Six demos** at eight minutes each, plus four minutes of questions per demo. Total programmed time: 72 minutes. The remaining 18 minutes is intro, transitions, and a five-minute closing.
- **Host shape:** rotating chair across three cities (Bangalore, Berlin, Brooklyn — three of the four most-active community geographies by signup data). Each chair holds the role for two consecutive Showcases, then rotates.
- **Recording policy:** on the record, transcript published within seven days; demos may opt out per-demo before the event, not retroactively.
- **Invite shape:** open call for demos, invite-only for attendance, capped at 40 attendees per city.
- **Success criterion:** ≥ 30 attendees per Showcase across the year, ≥ 4 questions per demo on average, and at least one publicly-reported introduction-to-collaboration per quarter (the *"I met X at the Showcase, we shipped Y together"* anecdote, surfaced via a post-event survey).

## Mechanics

- **Venue.** Founders Startup House (Bangalore), an equivalent shared-house venue (Berlin), and a Brooklyn studio TBD. Venue type is the constraint, not specific addresses — anywhere with seating for 40 and a room people can stand around in afterward.
- **Budget envelope.** ~$1,200 venue stipend per city per event (food, AV rental, coffee). At three cities, four times a year, that's ~$14,400 annual venue spend. No speaker fees. No travel reimbursement for demoers — this is a local event in three cities, not a flying circus.
- **Decision-making.** Demo selection by a three-person rotating panel per city, drawing from the open-call submissions. Panel terms last two Showcases, then rotation. Selection rubric is published before each open call closes.
- **Smallest viable version.** Run the first Showcase in one city only (Bangalore), with three demos rather than six. If the room hits 30 attendees and 4-questions-per-demo, scale to all three cities the next quarter. If not, retire the format and write the post-mortem.

## Risks

- **No-show rate stays high even in person.** Mitigation: invite-only with a reply-confirmation 48 hours before; cap admission at 40 to make the over-invite ratio legible to the chair.
- **One city's chair burns out.** Mitigation: two-Showcase term limits, with the next chair shadowing the current one for the second event.
- **Demos become rehearsed pitches again.** Mitigation: the four-minute Q&A is enforced, and the chair is briefed to ask the first question themselves, sharply.
- **The transcript becomes the only artefact and the room atrophies.** Mitigation: cap recordings to demo segments only; the post-demo unstructured 60 minutes is off the record by default.

## Open questions

- The strongest counter-argument: *the online demo night reaches ~140 viewers via recording; the in-person Showcase tops out at 40 attendees, so reach drops by 70%.* My read is that 40 in-room is worth more than 140 watching-later for the introduction problem we're trying to solve, but I'd want the community manager's honest take on which population matters more.
- Three cities now, or one for the first year? My instinct is one — but the rotation argument is that geographic equity is part of the format, not a later add-on.
- Do we publish the demo selection rubric before or after the first open call closes? Publishing before invites gaming; publishing after invites the *"why was X selected over Y"* fight.
- What's the kill criterion if the format works in two cities but not the third? Retire the third city, or retire the rotation entirely?
```

(Word count: ~830. Preflight cleared: title is verb+noun, abstract names the failure mode (~22 attendance, 90% no-show) and the proposed format (quarterly six-demo Showcase, rotating chair, three cities), body has thirteen real numbers (~22 live, 380 registered, 90% no-show, ~3/month decline, 14 months running, 1.2 questions/demo, ~140 views, 90 minutes, 60 minutes after, six demos, 8+4 minutes, 72/18 split, 40 cap, 30 threshold, ~$1,200 stipend, ~$14,400 annual, 70% reach drop, two-Showcase terms, 48 hours), no Section 7.1 words, no Section 7.2 phrases, no summary close, four open questions including the strongest counter-argument, *Proposed format* names duration/cadence/constraints/host shape/success criterion, *Mechanics* names venue type/budget figures/decision process, *Risks* names four risks with one mitigation each, voice in programming-chair sub-register, no triadic adjectives, no exclamations, Section 8 Markdown only, no sponsor pitch, no self-nomination, no travel-budget headline, would read sensibly in two years.)

# Anti-example

Same topic, rewritten as marketing slop:

```
CATEGORY: EIP
TITLE: Unleashing the potential of our community with a game-changing builder event experience

ABSTRACT: In today's rapidly evolving builder landscape, in-person gatherings are more important than ever before. We are excited to announce a transformative, world-class, and innovative quarterly Builder Showcase that will empower our community, drive unprecedented engagement, and unlock the next chapter of in-person events. Don't miss out — this will be the must-attend event of the year. Sponsorship tiers available: Gold $15K, Silver $8K, Bronze $3K.
```

**Title — *"Unleashing the potential of our community with a game-changing builder event experience"***
- *Unleashing the potential of* → Section 7.2 (forbidden phrase, exact match).
- *our community* (used as marketing-possessive object, *ecosystem*-cousin) → Section 7.1 spirit (*ecosystem*-as-marketing rule generalised).
- *game-changing* → Section 7.2 (forbidden phrase, exact match).
- *experience* (as marketing-noun close) → Section 7.4 (marketing rhythm).
- Whole title is a slogan, not verb-plus-noun → Section 11 item 1.

**Abstract sentence 1 — *"In today's rapidly evolving builder landscape, in-person gatherings are more important than ever before."***
- *In today's rapidly evolving landscape* → Section 7.2 (forbidden phrase, exact match).
- *more important than ever before* → Section 7.2 (*More than ever before*, forbidden phrase, exact match).
- Frame, not observation → Section 5.2 (lead with failure mode), Section 7.3 (preamble before point).
- No failure mode named → Section 11 item 2.
- No number → Section 5.6, Section 11 item 3.

**Abstract sentence 2 — *"We are excited to announce a transformative, world-class, and innovative quarterly Builder Showcase that will empower our community, drive unprecedented engagement, and unlock the next chapter of in-person events."***
- *We are excited to announce* → Section 7.2 (forbidden phrase, exact match).
- *transformative, world-class, and innovative* → Section 7.1 three times (each a forbidden word) and Section 7.3 + Section 11 item 12 (triadic adjectives).
- *empower* → Section 7.1 (forbidden word).
- *drive* → Section 7.1 (forbidden word, marketing-verb sense).
- *unprecedented engagement* → Section 7.4 (faking authority — no number behind *unprecedented*).
- *unlock* → Section 7.1 (forbidden word).
- *next chapter of in-person events* → Section 7.4 (performative confidence + marketing rhythm); also EIP-specific refusal #9 (hype-cycle opener territory).
- The sentence functions as an announcement → CIP-style anti-pattern, and for EIP it skips the failure mode entirely (Section 5.2).

**Abstract sentence 3 — *"Don't miss out — this will be the must-attend event of the year."***
- *Don't miss out* → Section 7.2 (forbidden phrase, exact match).
- *the must-attend event of the year* → EIP-specific refusal #9 (hype-cycle opener) and Section 7.4 (marketing rhythm).
- Performative confidence (*"this will be"*) → Section 7.4.
- Em-dash used as decoration (the dash carries no structural load) → Section 7.3 (em-dashes as decoration).

**Abstract sentence 4 — *"Sponsorship tiers available: Gold $15K, Silver $8K, Bronze $3K."***
- The entire sentence is a sponsor-pitch shape → EIP-specific refusal #1 (Section 2.3 *what it is not* — *"a sponsor pitch"*).
- Round-numbered tier list with the real count of 3 — fine count, but the tier shape itself is a sponsor-deck artefact, not a programming proposal.
- Functions as the abstract's punchline, signalling the document is a sponsor deck masquerading as a proposal.

**Aggregate failures:** seven Section 7.1 forbidden words (*transformative, world-class, innovative, empower, drive, unlock* — six explicit, plus *next-generation* implied via *next chapter* phrasing pattern), four Section 7.2 forbidden phrases (*In today's rapidly evolving landscape*, *more than ever before*, *We are excited to announce*, *Unleashing the potential of*, *game-changing*, *Don't miss out* — six, in fact), one Section 7.3 violation (triadic adjectives) plus one Section 7.3 violation (decorative em-dash), three Section 7.4 violations (performative confidence, marketing rhythm, faking authority on *unprecedented engagement*), three EIP-specific traps (sponsor-pitch closing line, hype-cycle opener via *must-attend event of the year*, no failure mode + no proposed format details + no mechanics + no risks anywhere), zero numbers about the failing event, zero failure modes named, no body. The skill refuses any draft of this density and rewrites from scratch — the failure is structural (frame-then-announcement-then-hype-then-sponsor-pitch) rather than line-level patchable.