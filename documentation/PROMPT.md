# Claude.ai Prompt — Norvyx Proposals Writer

Three prompts to use in order. Paste them as messages in a single Claude conversation.

---

## Prompt 1 — Session opener

> Send this **once** at the start of a new conversation, with `SKILLS_GUIDE.md` attached as a file. Wait for Claude's confirmation before going on to Prompt 2.

```
You are the house writer for Norvyx Proposals — a forum-style editorial archive where founders, communities, and investors write proposals, debate, and decisions with their names attached.

Read the attached SKILLS_GUIDE.md in full. It is your single source of truth. Internalise:
  • Sections 1–3 (what Norvyx is, the five proposal types, the lifecycle)
  • Sections 4–6 (the Graham × McKenzie voice, the universal principles, the locked-in preferences)
  • Section 7 (the AI-slop blocklist — every word and phrase here is a hard refuse)
  • Section 8 (the body Markdown subset and field constraints)
  • Sections 9–10 (per-type templates and worked examples — these are tonal targets)
  • Section 11 (the preflight checklist you must run on every draft)
  • Section 13 (the exact output format I expect)

When you've read it, reply with three things and nothing else:
  1. The five category codes and what each one is in one sentence.
  2. The five lifecycle statuses in order.
  3. Five words from the Section 7 blocklist that you commit to never producing.

Do not write any proposals yet. I'll send the first topic in a follow-up message.
```

This first round forces Claude to demonstrate it has actually read the guide. If the reply is generic ("I'll write professionally!") or invents categories, restart the session — the model didn't read the file.

---

## Prompt 2 — Drafting a single proposal

> Send this **for every proposal you want drafted**. Replace the bracketed sections. Reuse this template throughout the session.

```
Draft a proposal for Norvyx Proposals.

CATEGORY: [SIP | CIP | EIP | CMIP | PIP]
TOPIC: [one or two sentences naming the idea, in your own words]

SOURCE MATERIAL (optional, paste raw — link or quote):
[paste a YC RFS line, a16z Big Ideas bullet, a Conviction thesis paragraph, an EF RFP description, a blog post, etc. Leave blank if none.]

CONSTRAINTS (optional):
- length: [tight (600–900) | medium (1200–1800) | unspecified — you choose]
- numbers I have: [paste any numbers you want included verbatim, or "none — estimate one"]
- naming: [public — name competitors and people | sensitive — anonymise | mixed]
- must include: [terms, frameworks, or references that must appear]
- must not include: [topics, names, or phrasings to avoid beyond the standard blocklist]

If the topic is genuinely ambiguous, ask one clarifying question — only one, and only if needed. Otherwise produce the proposal directly in the Section 13 output format:

CATEGORY: <code>
TITLE: <8–200 chars>
ABSTRACT: <40–800 chars, 2–4 sentences>
BODY:
<markdown body using the supported subset>

Run the Section 11 preflight checklist silently before responding. If any item fails, fix the draft and re-check before sending. Do not list the checklist in your reply.

After the BODY, draw a single horizontal rule (---) and add one short paragraph telling me:
  • which Graham move and which McKenzie move you used
  • which numbers in the body are real (from source material) and which you estimated
  • the strongest counter-argument you intentionally surfaced in "Open questions"

That's the only commentary I want. Everything above the rule is the proposal.
```

---

## Prompt 3 — Iteration on a draft

> Send this **when a draft needs revising**. Be specific about what's off — vague feedback produces vague rewrites.

```
The draft above needs work. Specifics:

WHAT'S OFF:
- [paste the offending sentence or paragraph in quotes]
- [name the rule from SKILLS_GUIDE.md it violates — e.g. "Section 7.1 — uses 'leverage'", "Section 5 principle 2 — leads with the solution, not the failure mode", "Section 4.3 — has a closing summary paragraph"]

WHAT TO DO:
- [the specific fix, in one sentence — e.g. "rewrite the lede so it opens with the failure mode, not the proposal", "cut the third paragraph entirely", "swap 'leverage' for the verb the sentence actually wants"]

KEEP:
- [anything in the current draft that you want preserved verbatim — quote it]

Re-run the Section 11 preflight checklist on the revised version. Output the four fields again in the Section 13 format. Do not include the explanation paragraph this time unless I ask for it.
```

---

## Use pattern in practice

A typical session:

1. **Start a new conversation** in claude.ai with the SKILLS_GUIDE.md attached.
2. **Paste Prompt 1.** Verify the reply is real.
3. **Paste Prompt 2** with your first topic. Take the output.
4. **Paste it into `/submit` on Norvyx Proposals.** Save as Idea.
5. If the draft needs revision: stay in the same conversation, **paste Prompt 3** with the specific fix.
6. For the next proposal: stay in the same conversation, paste another **Prompt 2** with new bracketed values. Claude already knows the rules from Prompt 1 — don't re-explain them.

One conversation can produce 8–15 proposals before context drift starts mattering. When drift starts (Claude begins reaching for *"comprehensive"* or *"streamlined"*, gets sloppy on numbers, opens with a frame paragraph), start a fresh conversation with Prompt 1 again. That resets the model.

---

## Quick reference — bracketed values for Prompt 2

**Categories (one of):**
`SIP` (startup idea) · `CIP` (content) · `EIP` (event) · `CMIP` (community) · `PIP` (product)

**Length targets:**
- `tight` → 600–900 words. Default for most topics.
- `medium` → 1200–1800 words. Use when the topic earns the room — multi-step specs, governance with public process, deep historical context.

**Naming modes:**
- `public` → cite competitors, people, firms, RFS lines by name when public record.
- `sensitive` → anonymise community grievances, internal disputes, private conversations.
- `mixed` (default) → public when public, sensitive when sensitive. Claude judges per claim.

---

## Topic input examples (paste-ready)

For when you're seeding the platform from RFS lists. Each becomes a Prompt 2 fill-in.

**SIP from YC Summer 2026 RFS:**
```
CATEGORY: SIP
TOPIC: Inference chips purpose-built for AI agent workloads — high concurrency, low single-call latency, designed around the request shape that swarms of agents actually generate.
SOURCE MATERIAL:
"Inference chips for agents" — Y Combinator RFS Summer 2026, championed by [partner].
CONSTRAINTS:
- length: tight
- numbers I have: none — estimate one
- naming: public
- must include: a comparison to today's GPU economics
- must not include: anything about training-time chips; this is inference-only
```

**SIP from Conviction:**
```
CATEGORY: SIP
TOPIC: Autonomous HR helpdesks for SMBs — eliminate the half-FTE that small companies spend answering benefits, payroll, and PTO questions.
SOURCE MATERIAL:
"Autonomous HR helpdesks for SMBs" — Conviction Big Ideas, 2026.
CONSTRAINTS:
- length: tight
- numbers I have: none — estimate one
- naming: mixed
- must include: a sentence on why this hasn't worked before
- must not include: comparisons to consumer ChatGPT
```

**CIP — meta editorial direction:**
```
CATEGORY: CIP
TOPIC: A monthly "what investors actually read this month" column written by a rotating community member, drawn from public proposal-thread engagement.
CONSTRAINTS:
- length: tight
- numbers I have: none — estimate one
- naming: mixed
```

**PIP — platform itself:**
```
CATEGORY: PIP
TOPIC: A small "Adjacent on Capital" sidebar block on author profiles, surfacing thesis-aligned investors only when the author has opted in to capital matching.
CONSTRAINTS:
- length: medium
- numbers I have: none — estimate one
- naming: sensitive
- must include: a section on why this is opt-in
```

---

## When Claude misbehaves

| Symptom | Likely cause | Fix |
|---|---|---|
| Drafts feel like marketing copy | Lost the blocklist | Paste Section 7.1 + 7.2 verbatim, ask for a rewrite |
| Round-numbered lists everywhere | Reverted to default LLM rhythm | Ask for the *real* number; remove items rather than padding to five |
| Closes every proposal with a summary paragraph | Lost Section 4.3 | Quote the rule and ask for the closing paragraph to be cut |
| Forgets the four-field output format | Context drift | Re-paste Section 13 of SKILLS_GUIDE.md |
| Suddenly sycophantic ("Great topic!") | New session, didn't read the guide | Re-run Prompt 1 |
| Names a sensitive person Brooklyn meant to anonymise | `naming` constraint missed | Paste Prompt 3 with the specific person + replacement phrasing |

---

## One-line summary

> *Prompt 1 sets the rules, Prompt 2 drafts each proposal, Prompt 3 fixes what's off. Always start with `SKILLS_GUIDE.md` attached. When the voice slips, restart the conversation.*
