CATEGORY: CMIP
TITLE: Publish a moderation handbook with tiered roles and a documented appeal process for consumer-app communities

ABSTRACT: Consumer and prosumer app communities (typically Discord or Reddit) default to founder-as-moderator until the community is too large to moderate, then collapse into either toxicity or over-moderation. The wedge is to publish a moderation handbook on day one, before it is needed, with three governance specifics: tiered moderator roles with defined authority, a documented sanction-and-appeal process and a transition plan from founder-moderation to community-moderation that runs on terms, not on burnout.

BODY:
Every founder running a consumer-app community has the same trajectory. Months one through six: the founder is on every channel, answering every question, handling every conflict. Months seven through twelve: the community grows past the founder's bandwidth and the most engaged members begin doing moderation work informally. Months thirteen through eighteen: a controversy hits, the founder is unavailable for forty-eight hours, the informal mods make decisions without authority, the decisions are inconsistent and the community fractures. By month twenty-four, half of the founders have a community that is either over-moderated and silent or under-moderated and hostile.

## What's broken

Walk a Series A consumer-app Discord. The server has `~8,000 members` and `~600 weekly active`, and the founder-as-moderator pattern is visibly fraying. The founder appears in three channels a day, less than that during product crunch weeks. Two or three community members have de facto mod authority that no one announced and no one can revoke. A sanction yesterday (a user warned for harassment) was handled in a thread. Today the same behavior from a different user got banned. There are `~22 mod actions per month` and `~9 appeals reaching the founder's DMs`. Of those appeals, `4 reversed` (the original sanction was wrong), `3 received no response` (founder was overloaded) and `2 received conflicting responses` from the founder and from the informal mod who had acted.

The handbook does not exist. The roles do not exist. The appeal process does not exist. The community runs on the founder's residual availability, which is the wrong dependency. When the founder is in product crunch (every quarter, roughly), the moderation system simply pauses. When the moderation system pauses, norm violators learn the pause's schedule and the worst behavior concentrates there.

The cost of this pattern is observable in churn. The cohort that experiences a moderation incident without resolution leaves the community within `~30 days`, often quietly, and their churn correlates with churn from the product itself. Healthy moderation is a retention mechanism the founder did not realize was a retention mechanism until it failed.

## Proposed change

Publish a moderation handbook before the community needs one. The handbook contains:

**A code of conduct.** Two pages maximum. Plain-language rules. Examples of behavior that violates each rule. No legalese. The rules should be the ones the founder would enforce instinctively, written down so others can enforce them the same way.

**Three tiers of moderator role.** Members (read and post, default), Helpers (mark help-channel answers as resolved, pin notable threads, no sanction authority), Moderators (issue warnings, mute up to seven days, escalate bans), Admins (issue bans, handle appeals). The founder is an Admin. Most communities need two to three Moderators and one to two additional Admins by month twelve.

**A sanction-and-appeal process.** Documented in the handbook: who can sanction whom, what each sanction means in practice, how to appeal, who reviews appeals and the SLA on appeal review (`14 days`, ideally `7`). All sanctions logged in a private mod-log channel with name, action, reason and the rule violated. Appeals reviewed by an Admin other than the one who issued the sanction.

**A transition plan from founder-moderation to community-moderation.** Specific milestones. At `~3,000 members`, recruit two Helpers. At `~6,000 members`, recruit one Moderator. At `~10,000 members`, recruit a second Moderator and the first non-founder Admin. The transition runs on terms (six months for Helpers, twelve months for Moderators and Admins, renewable), not on burnout.

What changes versus today: the authority (named and bounded, not informal), the documentation (handbook and mod-log, not memory and DMs), the consistency (same sanction for the same behavior regardless of which mod acts) and the appeal path (named, time-bounded, reviewed by a different person).

## What this is and isn't

This is a documentation refresh and a role-formalization, not a tightening of moderation standards. The behaviors the community considers acceptable do not change. What changes is who can enforce them, how and how a sanctioned member can appeal. Members who never trip a rule will not notice the structure exists, which is the point.

This is also not a recall of current informal moderators. The members who have been doing mod-shaped work informally should be the first invited into formal roles. The transition formalizes their authority and makes their decisions easier to defend.

This is not a vote-based community. The handbook is written by the founder team. It is not put to a community vote. The community's input shapes the handbook through feedback after publication, not approval before. Communities that try to draft handbooks by vote tend to produce documents nobody enforces.

## Mechanics

- **Authoring.** The founder writes the first version. Two to four pages total. Includes the code of conduct, the role tiers and the sanction-and-appeal process. Published as a pinned post in the community plus a permanent page on the company website.
- **Role recruitment.** Helpers and Moderators recruited from existing engaged members. Selection criteria: tenure of `~6 months minimum`, demonstrated good judgment in past disputes, willingness to commit `~2 to 5 hours/week`. Founder-appointed for the first cycle, then nominated by current mods for subsequent terms.
- **Term length.** Helpers: six-month terms, renewable indefinitely. Moderators: twelve-month terms, renewable once (so a maximum of `24 consecutive months`). Admins: twelve-month terms, renewable.
- **Backfill.** If a Moderator or Admin role becomes vacant mid-term, fill within `14 days` from the Helper pool or by founder appointment. Vacancies longer than `14 days` are the single most common cause of moderation system breakdown.
- **Compensation.** Unpaid. Optional: free annual subscription to the product (for prosumer apps where the product has a paid tier), public credit on the company's website, mod-only Discord role and badge.
- **Mod-log.** Private channel visible only to Helpers and above. Every mod action logged within `24 hours` with name, action, reason and rule citation.
- **Public minutes.** Monthly summary of moderation activity: counts of warnings, mutes, bans and appeals, broken down by rule violated. Posted publicly. Counts only, no names. This transparency is the discipline that prevents drift toward arbitrary enforcement.
- **Smallest viable version.** Write and publish the handbook. Recruit two Helpers. Do not add tiers or mod-log until growth justifies it. A community of `~2,000 members` does not need the full structure but benefits from the published handbook on day one.

## Open questions

What if the community has already grown past `10,000 members` without governance and the founder is trying to retrofit? Harder, but the order of operations is the same: write the handbook first, then formalize the informal mods, then publish past sanction history (sanitized) so the community sees the new structure as catching up to existing practice. Expect a controversial transition period of two to three months during which previously-tolerated behavior becomes sanctioned for the first time. This is unavoidable but survivable.

What about platforms where the community lives outside the founder's control (Reddit, Twitter)? On Reddit the founder can be a subreddit moderator and use the same governance shape, with the caveat that Reddit's own admin authority sits above the subreddit. On Twitter/X the community is fundamentally ungoverned and the founder's options narrow to participating with their own account and avoiding the moderation problem entirely.

How do you handle the moderator who was a great Helper and a bad Moderator? Term limits do most of this work. A Moderator whose decisions consistently get reversed on appeal should not be renewed. The non-renewal is the procedure, not a confrontation.

What is the right cadence for revisiting the handbook itself? Annually, with community feedback collected in the month before revision. Rules that have not been enforced in the last twelve months should be considered for removal. Rules that were unwritten but enforced consistently should be considered for inclusion. The handbook should be a living document that reflects what the community actually does, not what it aspires to.
