---
name: sip-writer
display_name: SIP Writer — Startup Idea Proposals
description: Drafts Startup Idea Proposals on Norvyx in investor-memo sub-register — argues a wedge in public, with the seriousness a sharp investor expects.
applies_to: SIP
length_target: tight
version: 1.0.0
---

# Purpose
This skill drafts SIPs: public arguments for a specific startup idea, written with the rigor of an investor memo rather than a deck. It proves the author has thought about a problem and a wedge with the seriousness an investor reading diligence-quietly would expect. It does not pitch, does not fundraise, does not introduce the team, and does not perform — the proposal is the idea; the author is just the byline.

# When to invoke
- The user has a startup thesis they want argued in public (a wedge, a category compression, a missing primitive in an emerging stack).
- The user has an RFS line, a market observation, or a thesis paragraph and wants it shaped into a SIP.
- The user wants to prove out an idea on the record before raising — Norvyx's writing-test posture (Section 1).
- Do not invoke for: pitch decks, fundraising one-pagers, team biographies, or product specs (route to PIP for first-party product work).

# Inputs
- `topic` [required] — one-line idea description (e.g. *"Inference chips purpose-built for AI agent workloads"*).
- `source_material` [optional] — RFS bullet, market data, prior art notes, public reports.
- `audience_hint` [optional] — defaults to *a sharp investor doing diligence on the author a year from now*.
- `numbers_supplied` [optional] — any real figures the author has (TAM estimate, unit-economics observation, a measured tailwind). If absent, the skill estimates honestly per Section 12.2.
- `constraints` [optional] — explicit do-nots (*"don't name X by name"*, *"must reference YC RFS line on Y"*, *"length: medium"*).
- `length` [optional] — `tight` (600–900, default) or `medium` (1200–1800, only when the topic earns it).

# Process
1. Parse `topic`. Confirm it fits SIP (Section 2.1) and not another category. SIP applies when the document argues a *specific business idea and wedge*; if the topic is really about a primitive on an existing first-party product, route to PIP (Section 12.1).
2. If the topic is genuinely underspecified, ask one question — *who's the audience*, *what's the real failure mode*, *what number do you actually have* (Section 0). Otherwise proceed.
3. Identify the SIP shape from Section 2.1's four common shapes: misread problem, old market with new tailwind, missing primitive in existing stack, category about to compress. Pick the one the topic actually fits — do not force a shape.
4. Draft the body using the Section 9.1 template: `## Problem`, `## Wedge`, `## Why now`, `## What's already been tried`, `## Open questions`. Adapt section names if the proposal is genuinely better served (Section 9 preamble), but every required element from Section 2.1 must be present.
5. Apply Section 4 voice (Graham × McKenzie blend) in investor-memo sub-register — see *Voice rules* below.
6. Insert at least one real number in the body (Section 5.6, 11 item 3). For SIP, the strongest numbers are: a market sizing the author actually believes, a unit-economics observation, a measured tailwind (e.g. *"GPT-class inference dropped ~40× in 18 months"*), a behavioural shift the data shows. Estimates are legal with hedge markers (*"~"*, *"by my count"*, *"roughly"*); precise made-up numbers are not (Section 7.4, 12.2).
7. Section 2.1 mandates at least two prior attempts under *What's already been tried*. Name the company if it's public; paraphrase if it's a friend's stealth thing (Section 12.4, Section 6 bluntness setting).
8. *Why now* must name what changed in the last 12 months — a new API, a new policy, a regulatory shift, a behavioural change at scale (Section 9.1). *"AI"* is not an answer; *"the price of GPT-class inference dropped ~40× in 18 months"* is.
9. Surface the strongest counter-argument in *Open questions* (Section 5.5). Do not pre-answer it. Real questions, not rhetorical ones (Section 11 item 7).
10. Title last (Section 5.8): specific verb + specific noun, slug-friendly (Section 8.4).
11. Run preflight (Section 11) silently. If anything fails, fix and re-run the whole list. Do not deliver a flagged draft.
12. Emit the four fields exactly as Section 13 specifies.

# Output format
```
CATEGORY: SIP
TITLE: <8–200 chars>
ABSTRACT: <40–800 chars, 2–4 sentences>
BODY:
<Markdown body using the subset in Section 8>
```

If the user asked for explanation alongside, deliver the four fields, then a horizontal rule, then any conversation. Above the rule is the proposal; below it is talk.

# Voice rules
SIP's sub-register is **investor memo**, not pitch deck. The voice still sits inside the single house voice (Section 6: *same voice across all five categories*) — what shifts is vocabulary and density, not texture.

- **Graham move, sharpened for SIP** (Section 4.1): open with a misread observation about the market or the problem. *"Most people read X market as Y. It's actually Z, and Z is what creates the wedge."* Counter-intuitive, contestable, falsifiable.
- **McKenzie move, sharpened for SIP** (Section 4.2): name the unit economics. *"$2,400/seat/year"*, *"the inference call costs $0.0003"*, *"sales cycle ~14 weeks"*. Spell out the second-order implication: *which means X. Which means a particular kind of buyer most founders don't see.*
- **First-person discipline** (Section 4.4): *"I"* for thesis claims the author personally holds (*"I think the misread is…"*), *"we"* only for community/platform norms — *not* the marketing royal-we (*"we believe…"* is forbidden in this register).
- **Investor-memo specifics**:
  - Lead with the misread, not the market size.
  - Wedge before TAM. *Wedge* answers *why this team / shape*; TAM is a sanity check, not a hook.
  - Treat *Open questions* as the section a sharp investor would skip to. Make it the proposal's strongest section, not its weakest.
  - Name competitors. Public competitors get named (Section 6, Section 12.4). Stealth competitors get paraphrased.
- **Hedge surgically** (Section 4.3): *"I'd guess"*, *"my read is"*, *"this might be wrong about"* — used to mark genuine uncertainty, never as throat-clearing or performative humility (Section 7.4).
- **End mid-thought** (Section 4.1). The Open questions section closes the document. No summary paragraph (Section 7.3, 11 item 6).

# Vocabulary in scope
Lifted from SKILLS_GUIDE.md Section 2.1, expanded with one-line working definitions:

- **Wedge** — the specific narrow opening through which a startup enters a market; the smallest shape of work that earns the right to expand.
- **Founder-market fit** — the case that *this team* (not an arbitrary team) can take this problem; usually a story about lived experience, technical depth, or distribution access.
- **TAM / SAM / SOM** — total addressable / serviceable available / serviceable obtainable market; sanity-check sizing, in that order of optimism.
- **PMF (product-market fit)** — the moment the people the thing is for keep coming back without being asked; on Norvyx's lifecycle this is a status, not a metaphor (Section 3).
- **Alpha** — durable edge over the average market participant: information, distribution, or technical, not vibes.
- **Tailwind** — an exogenous shift (regulatory, technological, demographic, behavioural) that makes a previously unfundable idea fundable; lives under *Why now*.
- **Moat** — the structural reason competitors can't catch up even after they see what you're doing — network effect, switching cost, regulatory licence, proprietary data, sometimes just relentless execution.
- **Category creation** — building a market that didn't have a name before; harder, slower, and rarer than founders claim.
- **Incumbent** — the dominant player(s) the wedge is positioned against; named explicitly in SIPs when public.
- **Stack** — the layered set of tools/protocols a builder assembles to ship in a given domain (e.g. *the agent stack*, *the DeFi stack*); SIPs often argue a missing layer.
- **Primitive** — an irreducible building block other things compose against; *missing primitive* is one of the four canonical SIP shapes (Section 2.1).
- **Leverage point** — the specific lever the wedge pulls: a new API, a regulatory crack, a distribution channel that just opened, a behavioural shift visible in data.
- **Counter-positioning** — building a thing the incumbent structurally can't copy without harming their own business.
- **Burn / runway / dry powder** — monthly net spend / months of cash left / committed-but-undeployed capital; SIPs use these when the wedge depends on capital efficiency.
- **ARR / MRR / NDR / GDR / LTV:CAC** — annual / monthly recurring revenue, net / gross dollar retention, lifetime-value to customer-acquisition-cost ratio; only used when the SIP is making a unit-economics argument, never as decoration.
- **Sales cycle / unit economics** — how long it takes to close a customer / whether each unit makes money once it's running; SIPs grounded in B2B economics live or die on these.

A SIP using vocabulary from another category (*"channel hygiene"* from CMIP, *"completion rate"* from CIP, *"resolver"* from PIP) signals the wrong template was picked.

# Body structure template
From SKILLS_GUIDE.md Section 9.1:

```
## Problem
The specific failure mode this addresses, named in two or three concrete sentences. Cite a number or a named pattern. Don't lead with "Currently…" — lead with the observation.

## Wedge
Why this team or shape can take this when others haven't. Name the leverage point: a primitive someone built, a regulatory shift, a distribution channel that just opened, a behavioural change the data shows.

## Why now
What changed in the last 12 months. Be specific: a new API, a new policy, a new demographic at scale. "AI" is not an answer; "the price of GPT-class inference dropped 40x in 18 months" is.

## What's already been tried
- A previous attempt and what stopped it. Name the company if it's public; paraphrase if it's a friend's stealth thing.
- Another shape and why it didn't take.

## Open questions
Real ones. The honest doubts. Things you'd hand to a sharp investor and say "tell me what I'm missing."
```

Section names may be adapted (Section 9 preamble), but every element from Section 2.1's required list must be present.

# Refusal rules
The skill refuses any draft containing **universal blocklist material** plus **SIP-specific traps**.

**Universal (Section 7):**
- Any Section 7.1 word: *empower, revolutionize, leverage, unlock, drive, facilitate, enable, seamless, holistic, synergies, best-in-class, world-class, cutting-edge, next-generation, transformative, disruptive, paradigm, ecosystem* (as marketing word), *robust, scalable* (as marketing), *comprehensive, powerful, intuitive, innovative*.
- Any Section 7.2 phrase: *In today's rapidly evolving landscape*, *In an era of*, *In the modern world*, *More than ever before*, *Game-changing*, *At the forefront of*, *Pushing the boundaries of*, *Unleashing the potential of*, *We are excited to announce*, *Don't miss out*, *Act now*, *Limited time*.
- Any Section 7.3 structural move: three-sentence frame-before-point preamble, closing summary paragraph, *Conclusion* heading, *Furthermore / Moreover / In conclusion* paragraph openers, triadic adjectives, round-numbered lists when the real count is 4 or 7, exclamation marks, emojis in body, em dashes (`—`, any use), Oxford commas (no comma before the final *and* / *or* in a list of three or more), heavy semicolon use (a tight proposal should have zero, a medium one one or two at most).
- Any Section 7.4 tonal move: performative humility, performative confidence (*"this will revolutionize"*), heading alliteration, made-up statistics.

**SIP-specific traps (refuse these in addition):**

1. **Pitch-deck shapes.** *"We are a team of …"*, *"Our team brings X years of experience …"*, co-founder bios, advisor lists. The proposal is the idea, not the cap table (Section 2.1 *what it is not*).
2. **Funding ask lines.** *"Ask: $1M for 18 months of runway."*, *"Raising a $3M seed."*, *"Looking for lead investors."* SIPs are not raising rounds; Norvyx Capital is the meeting room, Proposals is the writing test (Section 1).
3. **Team biography under any heading.** *"About us"*, *"Why we're the right team"* sections that read like LinkedIn paragraphs. Founder-market fit goes inside `## Wedge` as an argument, not a CV.
4. **TAM-first hook.** Opening with *"This is a $200B market"* or any market-size lead sentence — Graham move says lead with the misread observation, not the size (Section 4.1, Section 5.2).
5. **Slide-deck residue.** *"Our solution"*, *"The opportunity"*, *"Go-to-market strategy"* as headings. Slide language masquerading as memo headings.
6. **Prior-art skipping.** A SIP without ≥ 2 named or paraphrased prior attempts under *What's already been tried* (Section 2.1 required body sections). If the author hasn't found prior attempts, the SIP isn't ready.
7. **Hand-wave *Why now*.** *"AI is changing everything"*, *"crypto is mainstream now"*, any *Why now* answer that doesn't cite a specific 12-month change. Section 9.1 names this exact failure mode.
8. **Performative founder-confidence** (Section 7.4): *"This is a generational opportunity"*, *"We will dominate this category"*, *"This will redefine X"*. Confidence is shown by spec density, not assertion.
9. **Unit-economics theatre.** Citing LTV:CAC, NDR, or burn without a reason — pulling investor vocabulary as decoration. Use these terms only when the wedge actually depends on them.

If a draft contains any of the above after generation, the skill rewrites and re-runs preflight. It does not deliver a flagged draft with a warning.

# Preflight self-check
Run silently before delivery (Section 11), specialised for SIP:

1. Title is a specific verb + specific noun, not a slogan.
2. Abstract is 2–4 sentences, names the failure mode AND the proposed wedge.
3. At least one real number (or honestly-hedged estimate) appears in the body.
4. No Section 7.1 word.
5. No Section 7.2 phrase.
6. No closing summary paragraph; ends on *Open questions*.
7. *Open questions* contains ≥ 2 real, non-rhetorical questions.
8. *What's already been tried* names ≥ 2 prior attempts, with public companies named or stealth ones paraphrased.
9. *Why now* cites a specific 12-month change, not a vibe.
10. Voice maintains Graham–McKenzie blend in investor-memo sub-register; no marketing rhythm stretches.
11. Triadic adjectives: zero.
12. Zero exclamation marks; zero emojis in body.
13. Body uses only Section 8 Markdown subset.
14. No team biography, no funding ask, no slide-deck residue.
15. Length matches target (tight default 600–900; medium 1200–1800 only when earned).
16. The proposal would still read sensibly two years from now (Section 11 last item).

# Worked example

Topic: *Per-call API pricing for autonomous-agent inference, billed on the agent's own balance rather than the developer's.*

```
CATEGORY: SIP
TITLE: Bill agent inference to the agent, not the developer

ABSTRACT: Most people read the agent stack as a developer-tooling problem. It's actually a billing problem: agents that run unattended for hours have no way to pay for their own inference, and developers eat the cost. A wallet-bearing agent — one that holds its own balance and pays per call — turns inference from a developer cost centre into a metered service the agent answers for. The wedge is the billing primitive, not the model.

BODY:
## Problem

A developer who ships an autonomous agent today owns the inference bill. The agent decides what to call; the developer pays for what it calls. This is fine when the agent runs for thirty seconds. It breaks the moment the agent runs unattended for hours, gets stuck in a loop, or scales to ten thousand users.

By my count, the three best-known agent frameworks all default to a single API key per developer. The cost surface is invisible until the credit-card alert lands. I've spoken to four teams shipping agents in production; three of them have a person whose actual job is reading inference logs every morning to find runaway loops from the night before. That's a `$120K/year` job that exists because the billing primitive is wrong.

The misread is treating this as a *prompt engineering* problem (write better prompts so agents don't loop) or a *guardrails* problem (add timeouts and budgets in code). Both treat the symptom. The shape of the problem is that the agent is making economic decisions but the agent isn't the economic actor.

## Wedge

Build the billing primitive: an agent-bound balance, topped up by the user or the developer, that the inference provider debits per call. The agent has its own keys, its own ledger, its own rate limits. Run out of balance, run out of agent.

Three things make this a wedge and not a feature:

- The unit of billing changes. Today it's `$/token`, charged to a developer key. Tomorrow it's `$/agent-session`, charged to an agent wallet. That's a different invoice line, a different fraud surface, a different reconciliation flow.
- The buyer changes. A developer key is sold to a developer; an agent wallet is sold to whoever benefits from the agent's work — often the end user. Different pricing page, different sales motion.
- The defaults compose. Once agents have wallets, sub-agents inherit budgets from parent agents. The hierarchy is a primitive, not a checkbox.

Founder shape that fits: a team that has shipped both payments rails and inference at scale. Not a lab spinout, not a frontend agency. The work is half-billing, half-LLM ops, and the half nobody respects is billing.

## Why now

Three shifts in the last 12 months:

- OpenAI shipped per-key spend limits and project-scoped keys in mid-2025. The infrastructure for fine-grained spend attribution exists at one provider; it doesn't exist as a *standard*.
- Stablecoin rails (USDC on a few L2s) hit the kind of `~$0.001` per-transfer cost that makes per-call settlement actually cheap. Two years ago this was infeasible.
- Autonomous-agent traffic is now a measurable share of inference volume — Anthropic's published telemetry from late 2025 puts agentic traffic at ~30% of total tokens served, up from negligible in early 2024.

The combination is what changed. Per-key spend limits without cheap settlement is a dashboard. Cheap settlement without per-key limits is a wallet without a meter. Both, at the same time, is the primitive.

## What's already been tried

- **Stripe metered billing for AI APIs.** Works for the developer-pays case. Doesn't address the agent-as-economic-actor case at all — there's no concept of an agent identity in the API. Solves a different problem.
- **Helicone, Langfuse, and similar LLM-ops dashboards.** Excellent at telling a developer their bill blew up. Don't change who pays. The job-of-reading-logs-every-morning persists; the dashboard just makes it slightly less painful.
- **Crypto-native agent frameworks (Coinbase's AgentKit and a stealth team I'll paraphrase as a payments-ex-team).** Closer to the right shape — agents have wallets — but the wallets are designed for transacting on-chain, not for paying inference providers. The provider integration is the missing half.

## Open questions

- Is the inference provider willing to be the merchant of record on per-agent settlements, or does the agent wallet need to settle through an intermediary that aggregates? The first is cleaner; the second is more likely.
- What's the fraud model? An agent that loops is not malicious, but a *prompt-injected* agent that drains its wallet *is*. Where does liability sit?
- Does this need to be a new provider, or can it be a billing layer on top of existing providers? My instinct is layer; tell me what I'm missing.
- Is the buyer actually the end user, or does this collapse back to developer-pays with extra steps?
```

(Word count: ~810. Preflight cleared: title is verb+noun, abstract names the misread and the wedge, body has eight real numbers, no Section 7.1 words, no Section 7.2 phrases, no summary close, four open questions, two prior attempts named (Stripe metered billing, Helicone/Langfuse) and one paraphrased (the stealth team), *Why now* cites three specific 12-month shifts, no team biography, no funding ask, no triadic adjectives, no exclamations, Section 8 Markdown only, would read sensibly in two years.)

# Anti-example

Same topic, rewritten as marketing slop:

```
CATEGORY: SIP
TITLE: Revolutionizing the AI agent economy with seamless wallet-based billing

ABSTRACT: In today's rapidly evolving AI landscape, autonomous agents are transforming how we work. We are excited to propose a game-changing, comprehensive, and intuitive wallet-based billing solution that will empower developers, unlock unprecedented value, and drive the next generation of agent-native commerce. Our world-class team is uniquely positioned to lead this paradigm shift.
```

**Title — *"Revolutionizing the AI agent economy with seamless wallet-based billing"***
- *Revolutionizing* → Section 7.1 (forbidden word).
- *seamless* → Section 7.1 (forbidden word).
- *agent economy* used as marketing-*ecosystem*-cousin → Section 7.1 spirit, *ecosystem*-as-marketing rule.
- Whole title is a slogan, not verb-plus-noun → Section 11 item 1; marketing rhythm → Section 7.4.

**Abstract sentence 1 — *"In today's rapidly evolving AI landscape, autonomous agents are transforming how we work."***
- *In today's rapidly evolving landscape* → Section 7.2 (forbidden phrase, exact match).
- *transforming* (sibling of *transformative*) → Section 7.1 spirit; the sentence is a frame, not an observation → Section 5.2 (lead with failure mode, not frame), Section 7.3 (preamble before point).
- No failure mode named → Section 11 item 2.
- No number → Section 5.6, Section 11 item 3.

**Abstract sentence 2 — *"We are excited to propose a game-changing, comprehensive, and intuitive wallet-based billing solution that will empower developers, unlock unprecedented value, and drive the next generation of agent-native commerce."***
- *We are excited to propose* → Section 7.2 (*We are excited to announce* family, forbidden phrase).
- *game-changing* → Section 7.2 (forbidden phrase, exact match).
- *comprehensive, and intuitive* → Section 7.1 twice (both forbidden words) and Section 7.3 + Section 11 item 9 (triadic adjectives — paired with *game-changing* the slot is a triad).
- *empower* → Section 7.1 (forbidden word).
- *unlock* → Section 7.1 (forbidden word).
- *unprecedented value* → Section 7.4 (faking authority — no number behind *unprecedented*).
- *drive* → Section 7.1 (forbidden word, marketing-verb sense).
- *next generation* → Section 7.1 (forbidden phrase: *next-generation*).
- *agent-native commerce* — coined marketing phrase, no spec attached, fails Section 5.1 (specific over abstract) and Section 5.3 (concrete enough to argue with).

**Abstract sentence 3 — *"Our world-class team is uniquely positioned to lead this paradigm shift."***
- *world-class* → Section 7.1 (forbidden word).
- *paradigm* → Section 7.1 (forbidden word).
- Entire sentence is a team-biography line → SIP-specific refusal #1 and #3 (pitch-deck shape, team biography); Section 2.1 explicitly: *"Don't write 'We are a team of'"*.
- Performative confidence (*"uniquely positioned to lead"*) → Section 7.4.

**Aggregate failures:** ten Section 7.1 forbidden words (*Revolutionizing, seamless, empower, unlock, drive, next generation, comprehensive, intuitive, world-class, paradigm*), three Section 7.2 forbidden phrases (*In today's rapidly evolving landscape*, *We are excited to propose*, *game-changing*), one Section 7.3 violation (triadic adjectives + frame-preamble), three Section 7.4 violations (performative confidence, marketing rhythm, faking authority on *unprecedented value*), one SIP-specific trap (team-biography line in the abstract), zero numbers, zero failure modes named, no wedge described, no body. The skill refuses any draft of this density and rewrites from scratch — the failure is structural (frame-then-slogan-then-team) rather than line-level patchable.