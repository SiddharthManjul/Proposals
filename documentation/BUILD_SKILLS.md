# Claude.ai Prompts — Build the Norvyx Proposals Writing Skills

Send these to claude.ai (with `SKILLS_GUIDE.md` attached) **to generate the skill files themselves**. The output of these prompts is the skills you'll later use — see `PROMPT.md` for how to use them once they exist.

Recommended order: 1 → 2 → 3 (run 5×, once per category) → 4 → 5. Each prompt is meant to be sent in the same conversation.

---

## How to use this file

1. Start a new conversation at claude.ai.
2. **Attach `SKILLS_GUIDE.md`** (or paste it as the first message if attachment isn't available).
3. Paste **Prompt 1** and verify the response.
4. Paste **Prompt 2**. Save the output as `skills/norvyx-proposals-writer.md`.
5. Paste **Prompt 3** five times — once per category code (SIP, CIP, EIP, CMIP, PIP). Save each output as `skills/<code-lower>-writer.md`.
6. Paste **Prompt 4**. Save as `skills/voice-validator.md`.
7. Paste **Prompt 5** to make Claude stress-test its own output. Use the verdict to revise any skill that failed.

The output format expected throughout is **portable Markdown with YAML frontmatter**, so a generated skill can be:
- pasted into a Claude Project as a custom instruction,
- saved as a `.skill` for Claude Code,
- renamed to `.mdc` for Cursor rules,
- or used directly as a system prompt for any model.

---

## Target skill schema (every prompt below references it)

Every skill the model generates must follow this structure exactly:

```markdown
---
name: <kebab-case-slug>
display_name: <Human-Readable Title>
description: <one-line summary, ≤160 chars>
applies_to: <SIP | CIP | EIP | CMIP | PIP | ALL>
length_target: <tight | medium | varies>
version: 1.0.0
---

# Purpose
<2–3 sentences on what this skill does and what it doesn't do.>

# When to invoke
<bulleted list of trigger conditions — when the user / orchestrator should use this skill rather than another.>

# Inputs
<bulleted list of fields the caller must or may provide. Mark each [required] or [optional].>

# Process
<step-by-step internal logic the model follows when running this skill. Numbered. Should reference specific sections of SKILLS_GUIDE.md by number where relevant.>

# Output format
<exact shape of the return — the four-field format from Section 13 of SKILLS_GUIDE.md, plus any skill-specific extras.>

# Voice rules
<concentrated voice instructions. Pull from SKILLS_GUIDE.md Sections 4–5, but specialised for the proposal type.>

# Vocabulary in scope
<owned terms with one-line definitions. 8–15 terms.>

# Body structure template
<starting section structure for the proposal body, copied or adapted from SKILLS_GUIDE.md Section 9.>

# Refusal rules
<what this skill must never produce. Pull from SKILLS_GUIDE.md Section 7, sharpened for the proposal type.>

# Preflight self-check
<numbered list of checks the model runs before delivering. Pull from SKILLS_GUIDE.md Section 11, type-specialised.>

# Worked example
<one full proposal in the four-field output format, drawn from SKILLS_GUIDE.md Section 10 or freshly written. Should pass every preflight check.>

# Anti-example
<one full proposal in the same format, but written in marketing slop, with annotations explaining what each line violates. This calibrates the model's refusal threshold.>
```

---

## Prompt 1 — Bootstrap & acknowledgment

Send this first. It primes the conversation and surfaces any misreads of the guide before you build anything on top.

```
You are about to build a set of writing skills for a platform called Norvyx Proposals. The attached SKILLS_GUIDE.md is your single source of truth — every rule, vocabulary item, and refusal in the skills you generate must be traceable to a specific section of that guide.

Read SKILLS_GUIDE.md in full. Then reply with exactly five things, in this order, and nothing else:

  1. The five proposal category codes and what each one is, in one sentence per code, paraphrased — not copied verbatim from the guide.
  2. The five lifecycle statuses, in order, with a one-clause gloss for each.
  3. The two writers whose voices the platform aims to blend, and the single most distinctive move you'd copy from each.
  4. Eight specific words from the AI-slop blocklist (Section 7.1) that you commit to never producing — pick the eight most likely to slip into your default LLM output.
  5. The exact four-field output format every proposal must use (Section 13), in the literal shape the platform expects.

If you cannot answer any of these from the attached file, say so. Do not invent. Do not begin building skills until I confirm.
```

If the reply is generic, paraphrased poorly, or invents categories, restart the conversation — Claude didn't actually read the guide.

---

## Prompt 2 — Generate the master "Norvyx Proposals Writer" skill

Send this once. It produces the umbrella skill that routes between the five types and applies the universal rules. Save the output as `skills/norvyx-proposals-writer.md`.

```
Generate a single, complete skill called "Norvyx Proposals Writer" that serves as the umbrella entry point for all proposal-writing work on the platform.

This skill must:
  • Cover all five categories (applies_to: ALL).
  • Take a topic + optional category hint as input. If the category is omitted, the skill picks one and justifies the pick in one sentence before drafting.
  • Apply every universal rule from SKILLS_GUIDE.md Sections 4–7 regardless of category.
  • Route to the right body-structure template from Section 9 based on the chosen category.
  • Run the Section 11 preflight checklist silently before delivering, and refuse to deliver any draft that fails a check.
  • Produce output in the Section 13 format exactly.

Output the skill in the schema I provided in BUILD_SKILLS.md ("Target skill schema" section), filled in completely. Every field. No placeholders, no "TBD", no truncation.

Two specific calibrations:
  • The "Worked example" must be one of the four examples in Section 10 of SKILLS_GUIDE.md, reproduced exactly in the four-field output format.
  • The "Anti-example" must be the marketing-slop wallet-onboarding draft from Section 10.5 of SKILLS_GUIDE.md, plus a line-by-line annotation showing which forbidden word or structural move each phrase violates (cite the Section 7.x sub-section by number).

Do not write any preamble. Do not explain what you're doing. Output the skill markdown directly. The first line of your reply must be the YAML frontmatter opener (---).
```

---

## Prompt 3 — Generate one per-type skill

Send this **five times** in the same conversation, once per code. Replace `<CODE>` and `<NAME>` each time. Save outputs as `skills/sip-writer.md`, `skills/cip-writer.md`, etc.

```
Generate the per-type writing skill for category <CODE> (<NAME>).

Use the same target skill schema. The skill must:
  • Set applies_to: <CODE>.
  • Specialise the voice rules to <CODE>'s register (e.g. SIP leans investment-memo, PIP leans engineering-RFC) — but stay inside the single house voice defined by SKILLS_GUIDE.md Section 4. Sub-register, not a separate voice.
  • Reproduce the body-structure template for <CODE> from SKILLS_GUIDE.md Section 9.
  • Reproduce the vocabulary list for <CODE> from Section 2 of the guide, but expand each term with a one-line definition the model can use to disambiguate. The expanded list should be 10–15 terms.
  • Include refusal rules that combine the universal blocklist (Section 7) with category-specific traps. Examples:
      – SIP must refuse pitch-deck shapes ("we are a team of…", "ask: $1M for…").
      – CIP must refuse self-promotion ("our newsletter is the best…").
      – EIP must refuse sponsor-pitch shapes.
      – CMIP must refuse personal call-outs by name.
      – PIP must refuse bug-report shapes ("when I click X it does Y").
    Include at least three category-specific refusals beyond the universal ones.
  • Include a "Worked example" for <CODE>: a full four-field proposal (CATEGORY/TITLE/ABSTRACT/BODY) at tight length (600–900 words), written in house voice, that would pass preflight. Use a topic of your choosing that's plausible for the category. Do not reuse a topic from SKILLS_GUIDE.md's existing examples — generate a fresh one so the skill has its own anchor.
  • Include an "Anti-example": the same topic, rewritten in marketing slop, with line-by-line annotations citing the specific Section 7 violations.

Run a preflight check on the worked example before including it. If the example fails any item from Section 11, fix it before output.

Output the skill markdown directly with no preamble. First line must be ---.
```

Run this prompt **once for each of**:
- `<CODE>` = `SIP`, `<NAME>` = `Startup Idea Proposals`
- `<CODE>` = `CIP`, `<NAME>` = `Content Improvement Proposals`
- `<CODE>` = `EIP`, `<NAME>` = `Event Idea Proposals`
- `<CODE>` = `CMIP`, `<NAME>` = `Community Improvement Proposals`
- `<CODE>` = `PIP`, `<NAME>` = `Product Improvement Proposals`

---

## Prompt 4 — Generate the voice validator skill

Send this once. It produces a separate skill whose only job is to evaluate a draft against the house rules. Save as `skills/voice-validator.md`.

```
Generate a skill called "Norvyx Voice Validator" whose sole purpose is to grade a draft proposal against SKILLS_GUIDE.md and produce a structured violation report.

Use the target skill schema. Specifically:

  • applies_to: ALL
  • Inputs:
      – draft (required) — the full four-field proposal (CATEGORY / TITLE / ABSTRACT / BODY)
      – strictness (optional) — "soft" (warnings only) | "strict" (any failure rejects the draft); default "strict"
  • Output format: a structured report, not a rewritten draft. Sections required:
      1. Verdict — PASS / SOFT-FAIL / HARD-FAIL
      2. Section 7 violations — every forbidden word / phrase / structural move found, with line quote and Section 7.x citation
      3. Section 5 violations — principle-level lapses (e.g. lead with solution not failure mode), with line quote and principle number
      4. Section 11 preflight failures — any checklist item the draft fails, with the offending line
      5. Voice diagnostic — one paragraph judging Graham × McKenzie blend health (too marketing? too academic? too hedged?)
      6. Numerical density — count of real numbers in body, with verdict ("none" → fail; "≥1, real" → pass)
      7. Recommended fixes — bulleted, each one a single sentence, prioritised by severity

  • This skill MUST NOT rewrite the draft. It outputs the report only. The author or another skill does the rewrite.
  • Refusal rules: this skill never produces a verdict of PASS for a draft that contains any Section 7.1 word, any Section 7.2 phrase, or that fails any Section 11 hard item. "Soft" strictness only loosens the verdict on Section 7.3 (structural) and Section 7.4 (tonal) — never on the word/phrase blocklists.

Worked example: invent a draft that has three deliberate violations (one Section 7.1 word, one missing-numbers preflight failure, one closing-summary structural move). Show the validator's full output report on it. Then show a clean draft passing the validator.

Output the skill markdown directly, first line ---.
```

---

## Prompt 5 — Stress-test the generated skills

Send this last, after you have all six skill files. It forces Claude to use its own outputs and surfaces gaps before you start using the skills for real.

```
You have produced six skill files in this conversation: the umbrella writer, five per-type writers, and the voice validator. Now stress-test them.

Pick one topic from each list below and use the corresponding per-type skill to draft a proposal. Then run the voice validator skill on each draft. Report results in a single table.

Topics:
  • SIP: "Inference chips purpose-built for AI agent workloads."
  • CIP: "Replace the existing 'getting started' tutorial with a chaptered series scoped to a 90-second first transaction."
  • EIP: "Quarterly invite-only off-the-record retreat for fifty builders, no press, no recording."
  • CMIP: "Rotate moderation duty among community members on six-week shifts with public minutes."
  • PIP: "A first-class explainer panel in the explorer for batched transactions, default-collapsed."

For each topic:
  1. Run the per-type skill silently to draft.
  2. Run the voice validator silently against the draft.
  3. Report only:
      – Category
      – Title (from the draft)
      – Validator verdict (PASS / SOFT-FAIL / HARD-FAIL)
      – Top three issues from the validator's report (or "none" if PASS)
      – Word count

Then, after the table, write one paragraph per skill (six paragraphs total) summarising how well the skill performed and what to tighten in v1.1. Be specific — name sections, fields, or refusal rules that need work.

Do not paste the full drafts. The goal of this prompt is to evaluate the skills, not produce content.
```

The output of Prompt 5 is your v1.1 punch list. Apply the suggested tightenings by sending follow-ups like:

> Update `skills/sip-writer.md`: tighten Section "Refusal rules" by adding the trap you identified in Prompt 5 — "must refuse SIP drafts that lead with team biography." Output the full revised skill, no diff.

---

## After all five prompts

You should now have six files in `skills/`:

```
skills/
├── norvyx-proposals-writer.md   # umbrella, applies_to: ALL
├── sip-writer.md
├── cip-writer.md
├── eip-writer.md
├── cmip-writer.md
├── pip-writer.md
└── voice-validator.md
```

Move on to `PROMPT.md` for the day-to-day usage prompts. Those assume the skills exist and are loaded as context.

---

## When skill generation goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| Skill output skips fields ("TBD", "[example here]") | Model trying to be polite about scope | Re-paste with: *"the previous output had placeholders. Re-emit the full skill with every field populated. No TBDs."* |
| Worked example uses forbidden words | Model drafted too quickly | Paste the offending sentence + the Section 7 citation + ask for a fresh worked example |
| Vocabulary list is too generic ("good", "important") | Model didn't lift from Section 2 | Re-paste with the exact Section 2 vocabulary list and ask for that list expanded |
| Refusal rules are vague ("avoid marketing") | Model paraphrased Section 7 instead of citing | Ask for verbatim Section 7 forbidden words, then category-specific traps as additions |
| Anti-example is half-hearted | Model unwilling to produce real bad writing | Paste Section 10.5 of SKILLS_GUIDE.md and ask for the same level of explicit violation density |
| Skill drifts from the schema | Long conversation, context drift | Restart from Prompt 1 in a new conversation |

---

## One-line summary

> *Prompt 1 confirms understanding. Prompt 2 builds the umbrella skill. Prompt 3 (×5) builds per-type skills. Prompt 4 builds the validator. Prompt 5 stress-tests the lot. Tighten what Prompt 5 surfaces, then move to `PROMPT.md` for usage.*
