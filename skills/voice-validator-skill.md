---
name: voice-validator
display_name: Norvyx Voice Validator
description: Grades a Norvyx proposal draft against SKILLS_GUIDE.md house rules and produces a structured violation report. Never rewrites the draft. Use when the user asks to validate, review, grade, or check a Norvyx proposal, or pastes a four-field draft and asks if it passes.
applies_to: ALL
length_target: tight
version: 1.0.0
---

# Purpose
This skill grades a draft proposal against SKILLS_GUIDE.md and produces a structured violation report. It checks the draft for forbidden words and phrases (Section 7.1, 7.2), structural and tonal moves (Section 7.3, 7.4), principle-level lapses (Section 5), and preflight failures (Section 11). It outputs a verdict (PASS / SOFT-FAIL / HARD-FAIL), every violation with line quote and section citation, a voice diagnostic, a numerical-density count, and a prioritised fix list. It does not rewrite the draft — that's the author's job, or the per-type writer skill's job.

# When to invoke
- The user pastes a four-field proposal draft and asks whether it passes.
- The user explicitly asks to validate, review, grade, or check a draft against the house rules.
- An upstream skill (any of the per-type writers, or the umbrella) wants to verify a draft before delivery and chooses to delegate the check.
- Do not invoke for: drafting (use the per-type writers or umbrella); rewriting (validator never rewrites); copyediting unrelated to Norvyx house rules.

# Inputs
- `draft` [required] — the full four-field proposal: CATEGORY, TITLE, ABSTRACT, BODY. If any of the four fields is missing, the validator returns a HARD-FAIL with *"draft is malformed: missing field <X>"* and runs no further checks.
- `strictness` [optional] — `soft` (warnings only) or `strict` (any failure rejects the draft). Default `strict`. Soft strictness only loosens the verdict on Section 7.3 (structural) and Section 7.4 (tonal) violations; it never loosens Section 7.1 (word blocklist) or Section 7.2 (phrase blocklist) or any Section 11 hard item.
- `category_override` [optional] — if the validator should grade against a different category than the one in the draft's CATEGORY field. Rarely used; primarily for the umbrella skill checking a routing decision.

# Process
1. Parse the draft into its four fields. If any field is missing or malformed, return HARD-FAIL immediately with a one-line reason.
2. Identify the category from the CATEGORY field (or `category_override`). Pull the category-specific traps from the matching per-type skill's *Refusal rules* section, in addition to the universal Section 7 blocklists.
3. Run the **Section 7.1 word scan** across TITLE, ABSTRACT, and BODY. For each hit, record the exact phrase, the line it appears on, and the Section 7.1 citation. Word-boundary aware — *empower* and *empowering* both hit; *power* alone does not unless used as the marketing word *"powerful"*.
4. Run the **Section 7.2 phrase scan**. Phrases are matched case-insensitive but token-aware (*"in today's rapidly evolving"* matches across capitalisation; partial matches like *"in an evolving"* do not).
5. Run the **Section 7.3 structural scan**: three-sentence preamble before the point, closing summary paragraph, *Conclusion* heading, *Furthermore / Moreover / In conclusion* paragraph openers, triadic adjectives, round-numbered lists when the real count is 4 or 7, exclamation marks, emojis in body, decorative em-dashes (em-dash carrying no structural load — usually inserting an aside, intensifier, or punchline rather than separating a clause).
6. Run the **Section 7.4 tonal scan**: performative humility (*"I might be wrong, but…"*, *"forgive me if…"*), performative confidence (*"this will revolutionize"*, *"clearly the right approach"*), heading alliteration (three or more headings starting with the same letter or sound), made-up statistics (precise figures with no source and no hedge marker — flag for review, not auto-fail).
7. Run the **Section 5 principle scan**: did the draft lead with the failure mode rather than a frame (5.2)? Is the proposal concrete enough to argue with (5.3)? Was the strongest counter-argument surfaced (5.5)? At least one real number (5.6)? Active voice and unadorned diction (5.7)?
8. Run the **Section 11 preflight scan**: every numbered item in Section 11, plus the category-specific preflight items from the matching per-type skill.
9. Run the **category-specific trap scan** from the per-type skill's *Refusal rules*: SIP — pitch-deck shapes, funding asks, team biography, TAM-first hook; CIP — self-promotion, announcement-as-proposal, complaint-without-change, vague-pages, audience-as-everyone, cadence-as-adjective, mechanics-skipping; EIP — sponsor pitch, speaker self-nomination, travel-budget headline, no host shape, no success criterion, no risks, hype-cycle openers; CMIP — personal call-outs (non-negotiable), bans/removals as the proposal, vote-styled framing, vibes-based diagnosis, no governance specificity, missing *What this is and isn't*, ban-list logic; PIP — bug-report shapes (non-negotiable), feature requests without specs, third-party adoption pitches, no scope cut, no rollout plan, no instrumentation commitment, spec-creep, vague ownership.
10. Run the **numerical-density count**: count distinct real numbers in BODY. *"~140 visits"*, *"$2,400/seat/year"*, *"every 90 days"*, *"three rules"* — each counts once. Verdict: zero numbers → fail; ≥ 1 real → pass.
11. Compute the **voice diagnostic**: one paragraph judging whether the Graham × McKenzie blend is healthy. Failure modes to name when present — too marketing (Section 7.4 rhythm dominant), too academic (passive voice and hedging dominant), too hedged (every claim qualified, no contestable observations), too cynical (snark substituting for spec).
12. Compute the **verdict**:
    - **HARD-FAIL** if any of: malformed draft; ≥ 1 Section 7.1 word; ≥ 1 Section 7.2 phrase; any Section 11 hard item failed; any non-negotiable category-specific trap (CMIP personal call-out, PIP bug-report shape).
    - **SOFT-FAIL** if no HARD-FAIL triggers but: Section 7.3 structural violation present, Section 7.4 tonal violation present, Section 5 principle lapse present, or non-hard preflight items failed. Under `strict` strictness, SOFT-FAIL escalates to HARD-FAIL. Under `soft` strictness, SOFT-FAIL remains SOFT-FAIL.
    - **PASS** if no violations on any scan. PASS is never returned if any Section 7.1 word, any Section 7.2 phrase, or any Section 11 hard item is present, regardless of strictness.
13. Build the **recommended fixes** list, prioritised by severity: HARD-FAIL items first (each as one sentence), then SOFT-FAIL items, then voice-diagnostic suggestions. Never include fixes longer than one sentence.
14. Output the report in the format below. Do not rewrite the draft. Do not include suggested replacement copy beyond a 3–8 word phrase fragment when calling out an exact-replacement opportunity.

# Output format
The validator produces a structured report with seven sections, in this order. No preamble, no postamble.

```
VERDICT: <PASS | SOFT-FAIL | HARD-FAIL>

## Section 7 violations
- [<7.1 | 7.2 | 7.3 | 7.4>] "<exact line quote>" — <one-clause description of the violation>
- (repeat per violation; "none" if none)

## Section 5 principle lapses
- [<principle number>] "<exact line quote>" — <one-clause description>
- (repeat; "none" if none)

## Section 11 preflight failures
- [item <N>] <description of the failed check> — offending line: "<quote>" (or "missing entirely" if structural)
- (repeat; "none" if none)

## Voice diagnostic
<One paragraph judging Graham × McKenzie blend health. Name the failure mode if present (too marketing / too academic / too hedged / too cynical). If healthy, say so in one sentence.>

## Numerical density
<integer count> real numbers in body. Verdict: <PASS | FAIL>.

## Recommended fixes
- <single-sentence fix, highest severity first>
- (repeat, prioritised by severity)
```

If the verdict is PASS, the *Section 7 violations*, *Section 5 principle lapses*, and *Section 11 preflight failures* sections each contain the single line `none`. The voice diagnostic and numerical density still run. The recommended fixes section may be empty (`none`) or contain optional voice-tightening suggestions explicitly labelled as optional.

# Voice rules
The validator's own output voice is governance-clerk register: precise, citation-heavy, no marketing rhythm, no decorative adjectives. It quotes the draft exactly when calling out violations — paraphrasing a violation defeats the audit trail. It does not editorialise about the draft author. It does not soften HARD-FAIL verdicts to be polite; the verdict is the verdict. Section citations are mandatory on every violation line.

# Vocabulary in scope
- **Verdict** — the overall outcome of the validation: PASS, SOFT-FAIL, or HARD-FAIL.
- **Hard item** — a Section 11 preflight check whose failure forces a HARD-FAIL regardless of strictness (items 1, 2, 3, 4, 5, 6, 7, 11 from the universal preflight; per-category preflights add their own hard items).
- **Soft item** — a Section 11 check whose failure forces SOFT-FAIL under `soft` strictness and HARD-FAIL under `strict`.
- **Non-negotiable trap** — a category-specific refusal that triggers HARD-FAIL under any strictness (CMIP personal call-out; PIP bug-report shape).
- **Numerical density** — count of distinct real numbers in BODY; the diagnostic for Section 5.6 (specific over abstract).
- **Voice diagnostic** — qualitative one-paragraph judgment of the Graham × McKenzie blend, separate from the rule-based scans.
- **Strictness** — `strict` (default; any failure rejects) or `soft` (warnings only on Section 7.3/7.4/non-hard preflight).
- **Audit trail** — the exact line quotes plus section citations that let an author verify each call.

# Body structure template
The validator does not draft proposals; it has no body structure to template. Its output is the seven-section report defined under *Output format*.

# Refusal rules
- **Never rewrite the draft.** The validator does not produce alternative copy beyond 3–8 word phrase fragments when calling out an exact-replacement opportunity. If the user asks the validator to rewrite, return the report and a one-line note: *"The validator does not rewrite. Run the per-type writer skill against the recommended fixes."*
- **Never return PASS** for a draft containing any Section 7.1 word, any Section 7.2 phrase, or that fails any Section 11 hard item, regardless of `soft` strictness. Soft only loosens 7.3 and 7.4.
- **Never soften the verdict** to be polite. PASS / SOFT-FAIL / HARD-FAIL is the report's first line and its plainest claim.
- **Never editorialise** about the author's intent, character, or competence. Quote violations, cite sections, recommend fixes — that's the whole job.
- **Never invent line numbers** or violations. If a section of the draft is missing, the report says *"missing entirely"*; it does not fabricate a quote.
- **Never fix the draft silently** in the report. Recommended fixes are descriptions of what to change; the change itself happens elsewhere.

# Preflight self-check
The validator's own output runs through this before delivery:

1. Verdict line is present and is exactly one of PASS, SOFT-FAIL, HARD-FAIL.
2. All seven sections are present in the output, in order.
3. Every violation line includes a section citation in brackets.
4. Every violation line includes an exact quote from the draft (or *"missing entirely"* for structural absences).
5. No section is silently empty — empty sections say `none`.
6. The voice diagnostic is exactly one paragraph, not bulleted.
7. Numerical density reports an integer plus PASS or FAIL.
8. Recommended fixes are single sentences, prioritised by severity, with no fixes longer than one sentence.
9. The output contains no marketing rhythm, no Section 7.1 words used non-quotatively (the validator may quote a forbidden word from the draft; it must not use one in its own prose).
10. The output contains no rewritten draft copy beyond 3–8 word phrase fragments.

# Worked example

Input: a deliberately-violating CIP draft with three planted issues — one Section 7.1 word, one missing-numbers preflight failure, one closing-summary structural move.

```
CATEGORY: CIP
TITLE: Refresh the contributor onboarding doc

ABSTRACT: New contributors find the onboarding doc confusing and outdated. We should rewrite it with clearer structure and better examples. The proposal is to leverage existing community feedback and rewrite the doc.

BODY:
The contributor onboarding doc was written when the community was much smaller. It hasn't been updated in a long time, and new contributors regularly tell us they couldn't find what they needed.

## What's wrong now

The doc is too long. It mixes setup instructions with cultural norms and with the contribution workflow. New contributors don't know what to read first. Several of them have written their own informal guides in side channels, which fragments the canon further.

## The proposed change

A three-part rewrite. Part one: a 5-minute setup. Part two: cultural norms in a separate page. Part three: the contribution workflow with a worked example.

## Mechanics

The current docs maintainer drafts each part. An editor reviews. Ships within four weeks.

## Open questions

- Should the cultural-norms page be merged with the existing community handbook, or kept separate?
- Who maintains the worked example as the workflow evolves?

## Conclusion

In conclusion, the onboarding doc has been a problem for a while, and this rewrite would solve the main issues that contributors have been raising.
```

Validator output on this draft (under `strict` strictness):

```
VERDICT: HARD-FAIL

## Section 7 violations
- [7.1] "leverage existing community feedback" — *leverage* is on the Section 7.1 forbidden word list.
- [7.3] "## Conclusion" — *Conclusion* heading is a forbidden structural move.
- [7.3] "In conclusion, the onboarding doc has been a problem…" — *In conclusion* paragraph opener is forbidden.
- [7.3] closing summary paragraph present after *Open questions* — Section 7.3 forbids closing summary paragraphs; the document must end on Open questions.

## Section 5 principle lapses
- [5.6] body contains no real numbers — *"much smaller"*, *"a long time"*, *"too long"*, *"several of them"* are all qualitative; no count, percentage, dollar figure, cadence, or measurement appears.
- [5.1] "regularly tell us" — vague quantifier; principle 5.1 (specific over abstract) requires a count or rate.

## Section 11 preflight failures
- [item 3] no real number in body — see Section 5.6 lapse above.
- [item 6] closing summary paragraph present — document does not end on Open questions.
- [item 8] *Mechanics* does not name the budget shape; only names who drafts and the timeline.
- [item 2] abstract names the failure ("confusing and outdated") but not the proposed change at the right grain — *"rewrite it with clearer structure"* is not concrete enough to argue with.

## Voice diagnostic
The draft sits in the too-academic/too-vague register. The Graham move is missing — there's no contestable observation to anchor the document, just a softened complaint. The McKenzie move is absent — no cadence, no count, no dollar figure, no measurable failure. The closing summary paragraph and *In conclusion* opener push the voice further into generic-blog-post territory. Tightening would mean leading with a count (e.g. *"by my count, four of the last six contributors wrote their own informal guides"*) and cutting the conclusion entirely.

## Numerical density
0 real numbers in body. Verdict: FAIL.

## Recommended fixes
- Remove the *## Conclusion* heading and the closing summary paragraph; document must end on *Open questions*.
- Replace *"leverage existing community feedback"* with a non-blocklisted phrasing such as *"draw on community feedback"*.
- Add at least one real number to *What's wrong now* — count of side-channel guides, last-update date of the doc, or contributor drop-off if measurable.
- Tighten the abstract's proposed change to name the three-part structure explicitly (5-minute setup, norms page, workflow with worked example).
- Add a budget-shape line to *Mechanics* (editor hours, any contractor cost, or *"no new spend"* if accurate).
```

A cleaner draft passing the validator would receive the same seven-section structure with `none` lines under *Section 7 violations*, *Section 5 principle lapses*, and *Section 11 preflight failures*; an integer ≥ 1 under numerical density with verdict PASS; a one-sentence healthy voice diagnostic; and an empty or short *optional* recommended-fixes list. Verdict: PASS.

# Anti-example

The validator does not have a marketing-slop anti-example because the validator does not draft. The closest analogue — a *bad validator output* — would look like this, and is forbidden:

```
The draft is mostly good, but I noticed a few small issues. The word "leverage" might not be the best choice, and the conclusion paragraph could probably be tightened. Overall, with some polish, this could be a strong proposal! I'd suggest rewriting the abstract as: "New contributors find the onboarding doc unclear, and we propose a three-part rewrite to fix that, with the goal of empowering future contributors and unlocking smoother ramp-up times."
```

**Line-by-line on why this validator output is itself a refusal-trigger:**

- *"mostly good"*, *"a few small issues"*, *"with some polish"* → softening the verdict to be polite. The validator's *Refusal rules* explicitly forbid this; the verdict line must be exactly PASS, SOFT-FAIL, or HARD-FAIL with no qualifying language.
- *"might not be the best choice"* → hedged citation. The validator must cite the section (Section 7.1) and state the rule, not editorialise about word choice.
- *"this could be a strong proposal!"* → exclamation mark; Section 7.3 forbids exclamations anywhere, including in the validator's own output.
- *"I'd suggest rewriting the abstract as:"* followed by replacement copy → the validator never rewrites. Refusal rule #1.
- The replacement copy itself contains *empowering* and *unlocking* — Section 7.1 forbidden words used non-quotatively in the validator's own prose. Even if the validator did rewrite (which it must not), it cannot emit forbidden words in its own output. Preflight item 9.
- No verdict line, no seven-section structure, no citations, no quotes — fails preflight items 1, 2, 3, 4 simultaneously.

The validator's own output is governed by the same discipline it audits drafts for. A validator report that softens, hedges, rewrites, or uses Section 7.1 words in its prose has failed its own preflight and must be rewritten before delivery.