CATEGORY: CMIP
TITLE: Stand up an RFC repo and a rotating maintainer council for devtool product communities

ABSTRACT: Devtool communities default to an unstructured Discord that fails the audience they need most: the engaged contributors who already think in open-source governance shapes. The wedge is to adopt three artifacts from healthy open-source projects: an RFC repo where significant product changes get proposed, a five-seat maintainer council with rotating community seats and published minutes from monthly council meetings. Discord remains the conversation layer. The repo and the council become the governance record.

BODY:
Devtool founders ship to an audience that has spent years contributing to open-source projects. That audience expects three things from a community they invest time in: a way to propose changes that gets seriously considered, a transparent process for how decisions get made and recognition that scales with contribution. Discord alone delivers none of these. The community a devtool builds tends to fail not because the product is wrong but because the governance structure is missing.

## What's broken

The default devtool community is a Discord workspace with `5 to 12` channels (general, help, announcements, feedback, off-topic, releases). The founder reads the feedback channel daily for the first six months, then quarterly. Engaged community members write detailed posts that receive a thumbs-up emoji from the founder and no follow-up.

By my count, the typical Series A devtool Discord workspace has `~3,000 members` at month 24, `~150` posting in any given week and `~10` consistently substantive contributors. Those `10 people` are the community's actual structure. They answer help-channel questions before the founder gets to them. They write the documentation pull requests. They steer debates when threads go sideways. They are doing maintainer-shaped work without the title, the recognition or the authority.

The cost of this informal structure is observable. Contributors burn out without recognition (median tenure of the most substantive contributors is `~14 months` before they go quiet). The founder remains the bottleneck for all decisions because no one else has the authority to make them. Product feedback that goes into Discord disappears into chat scrollback within a week and the same feature requests resurface in slightly different forms three months later. The mod queue, when there is one, sits at zero and then suddenly accumulates `20 to 40` flagged items during a controversy with no documented process for handling them.

## Proposed change

Adopt three governance artifacts borrowed from open-source-project practice.

**An RFC repo.** A public GitHub repository where significant product changes (more than one engineer-month of work, one surface area changed, or more than ten affected customers) get proposed as RFCs. RFC template includes: motivation, proposed solution, alternatives considered, who is affected and open questions. Public discussion period of `14 days` before the council decides. Anyone can submit.

**A rotating maintainer council.** Five seats. Three from the community, one from the founding team, one named employee (rotates among the engineering team annually). Six-month terms for community seats, staggered so two seats turn over each quarter. Community seats: nominated by current council members plus self-nomination, decided by current council vote. The council meets monthly.

**Published minutes.** Within seven days of each council meeting, minutes go up on the RFC repo. Minutes include RFCs reviewed, decisions made, dissenting opinions, action items and next meeting date. The minutes are searchable and citable. Discord stays the conversation layer. The repo is the governance record.

What changes versus today: the recognition (council seats are public credit), the format (RFCs and minutes, not Discord scrollback), the cadence (monthly, scheduled, predictable, not ad-hoc) and the decision surface (visible, dissent-tolerant, citable).

## What this is and isn't

This is a feedback-and-recognition mechanism with governance structure, modeled on open-source projects. It is not handing over product direction to the community. The founder retains final call on what ships, on the company's commercial priorities and on the product roadmap. The council's authority is advisory: review RFCs, surface community needs, advise on changes and help maintain community norms. The council does not control the company.

The council also is not a vote-based decision body. Council recommendations are recommendations. The founder can override. The council's existence creates an explicit channel where the override is visible and explainable. When the founder overrides consistently, the council learns the founder's real priorities or the founder learns the council's collective wisdom. Both outcomes improve over the alternative of decisions made silently in private.

This is not a customer-facing marketing program. Council members are credited publicly because credit is the compensation for unpaid work, not because the program is meant to generate marketing impressions.

## Mechanics

- **Selection.** First three community seats: founder-appointed from the `10` most substantive existing contributors. Subsequent terms: nomination process described above. Anti-stacking rule: no more than one council member from the same employer at any time.
- **Term length.** Six months for community seats. Staggered so two community seats turn over each quarter. Founder seat and employee seat are permanent (employee seat rotates internally).
- **Recusal.** Council members recuse from RFCs that directly affect their employer's product, contracts or competitive position. Recusal recorded in minutes.
- **Time commitment.** Roughly two hours per month per council member. RFC review during the month plus a one-hour council meeting.
- **Compensation.** Council seats are unpaid for community members. Company-sponsored conference travel covered: `$1,500/year` per community member for one relevant conference. Some companies experiment with monthly honorariums (`~$200/month`). This works for some communities and creates expectation overhead for others. Default to unpaid plus conference travel.
- **Public credit.** Council members listed on the company's "Governance" page. Credited in monthly release notes. Eligible for a "Community Maintainer" Discord role and a badge on the company's documentation site.
- **First-year goal.** Three council cycles by end of year one. The founder should be receiving more RFC traffic than direct DMs about feature requests.
- **Smallest viable version.** Start with just the RFC repo and one council meeting per quarter. If the RFC repo gets meaningful submissions in the first three months, scale to monthly cadence and add the rotation. If submissions stay near zero, the community is not ready for the structure and the founder should re-examine the community's actual size and engagement before formalizing further.

## Open questions

How does the council handle commercially-sensitive RFCs (pricing changes, monetization shifts, competitive responses)? The council reviews public RFCs only. Commercial decisions stay with the founder team and are not RFCs in this sense. The boundary should be explicit in the council charter so members do not feel excluded from work that was never theirs to influence.

When does the council outgrow its usefulness? Probably when the company reaches more than `~50 engineers` and the product surface area exceeds what a five-person council can review meaningfully. At that point the council either splits by product domain (sub-councils per major surface area) or transitions to a higher-level advisory body with per-domain RFC reviewers replacing its day-to-day function. Most companies that adopt this structure run it for three to five years before needing to evolve it.

What about closed-source devtools where the community cannot see the codebase? The council and RFC process still work with one modification. RFCs cover API contracts, behavior changes, deprecations and surface-area additions. The implementation details remain internal. The contract between the product and its users is the governance surface, not the code.

What happens when the council disagrees with the founder on a high-stakes decision? The founder overrides, the override is recorded in minutes, and the dissenting council members can resign if they feel the disagreement is severe. Resignation is a legitimate exit, not a crisis. Most healthy councils have at least one resignation in the first two years and the structure survives.
