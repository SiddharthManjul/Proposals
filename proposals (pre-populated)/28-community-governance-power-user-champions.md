CATEGORY: CMIP
TITLE: Stand up a term-limited champion program with formal recognition and a documented charter

ABSTRACT: Founders accumulate a small number of power users who do unpaid work for the product (answering support questions, creating tutorials, advocating publicly, beta-testing new features) and burn out within twelve to twenty-four months because the recognition is informal, the access is unclear and the role has no end date. The wedge is a formal champion program with twelve-month renewable terms, a documented charter naming what champions get and what they do, a recusal policy for product decisions affecting their employers and a graceful exit path for departing champions. Done right, the program runs continuously with rotation. Done wrong, it becomes either a vanity list or a hostage situation.

BODY:
Every product community that grows past a few thousand engaged users develops a layer of power users who do work the company benefits from without being employees. They write tutorials. They answer questions in Discord faster than support tickets get triaged. They speak at conferences about the product. They beta-test releases and file thoughtful bug reports. They are doing employee-shaped work, and they leave at a higher rate than employees because nothing about their relationship with the company is durable.

## What's broken

The default founder relationship with power users runs on personal goodwill. The founder knows the eight or twelve names that matter, replies to their DMs personally, occasionally sends them swag and considers the relationship managed. The names change every twelve to twenty-four months as power users burn out, get hired away (often by competitors) or quietly drift to a different product whose founder remembered to invite them to dinner.

By my count, in a typical product community of `~10,000 active members`, there are `~15 to 30` true power users (the ones doing employee-shaped work). Their median tenure as active power users sits at `~14 months`. After they go quiet, replacement power users emerge from the community organically but the transition is invisible to the founder and the institutional knowledge the previous power user accumulated walks away.

The cost is observable in three places. First, the company loses a support multiplier. One power user typically deflects `~30 to 80 support tickets per month` simply by answering questions in public channels faster than the support team. Second, the company loses an advocacy channel. Power users were producing content that brought new users into the funnel. Third, the company loses early-warning signals because the power user was the canary on product problems and now the community goes quiet about the same issues until churn catches up.

The recognition fix is harder than it looks. A vendor that just publishes a list of "top contributors" creates a vanity program that is good for marketing and does not produce durable engagement. A vendor that creates a paid relationship with power users converts the relationship from voluntary advocacy to vendor-managed labor and the audience can tell. The structure that works is in between: formal recognition with bounded authority, explicit term limits, transparent criteria and a graceful exit path.

## Proposed change

Stand up a champion program with three governance specifics.

**A documented charter.** Two pages maximum. Names the program. Names the criteria for becoming a champion (twelve months of substantive contribution, demonstrated good judgment, openness to feedback). Names what champions get (access, recognition, swag, optional travel) and what they do (the work the program expects from them). Published on the company website. Linked from product documentation.

**Twelve-month renewable terms.** A champion serves for twelve months. At end of term, the program reviews their continued contribution and either renews for another twelve months or transitions them to "alumni champion" status with continued goodwill but reduced access. Maximum: three consecutive terms (`36 months`), after which the champion rotates to alumni status mandatorily. The rotation prevents the champion list from becoming static and creates room for new champions to emerge.

**A recusal and disclosure policy.** Champions disclose their employer to the program and to the broader community. Champions employed by direct competitors are not eligible. Champions employed by integration partners disclose. Their contributions in product areas affecting that partnership are weighed accordingly. Champions employed by major customers disclose. Their feedback in product areas affecting their employer's deal is accepted but not given disproportionate weight.

The program also includes:

- **A monthly champion call.** One-hour, founder or product head attending. Honest agenda: what is shipping, what is broken, what the company is wrestling with. Champions get briefing access that the broader community does not. The honesty is the trade for the discretion.
- **Public credit.** Champion list on the company website with photos, links to their work and their employer (with permission). Champion badge in the product community. Champion recognition in monthly release notes.
- **Bounded authority.** Champions can grant other community members credit, escalate support issues, sponsor feature requests into the company's intake process and offer feedback on roadmap. They cannot make product decisions, approve sanctions or speak on behalf of the company without explicit case-by-case authorization.

What changes versus today: the recognition is named and durable (charter, public list, badge), the relationship has a known shape (twelve-month term, clear expectations both ways) and the exit is graceful (alumni status, not a quiet drift to irrelevance).

## What this is and isn't

This is a formal recognition program for power users who are already doing employee-shaped work voluntarily, with structure that makes the work sustainable and the recognition durable. It is not a payment program. Champions are not employees and the work they do remains voluntary. The compensation is recognition, access and the early-warning briefing access. Some companies layer paid relationships on top (a small monthly stipend or per-deliverable payment for specific work like conference talks). This is optional and changes the dynamics enough that founders should think carefully before adding it.

This is not a marketing program. The champions are not testimonials and the program's value is in the work they do for the community, not in their face on a marketing page. Treating champions as marketing assets is the most common failure mode of champion programs and it kills the program inside a year because champions notice they have become unpaid advertisers.

This is not a private feedback channel that bypasses the public community. Champions get briefing access but their substantive product feedback is in the same RFC or feedback process as anyone else's. The briefing is one-way (company tells them what is coming). The feedback is in the open. This protects the broader community from a perception that the real conversation is happening in private and they are seeing the marketing version.

This is not a permanent role. The term limits are non-negotiable. A power user who has served three consecutive terms (`36 months`) rotates to alumni status. The alumni network has its own continued goodwill but the active champion seats are open for new champions emerging from the community. Most champion programs that fail in year two or three fail because the founders held onto the original champions too long and the program calcified.

## Mechanics

- **Selection.** First champion cohort: founder-appointed from the existing power-user layer. Criteria explicit and published. Subsequent cohorts: nomination from current champions plus self-nomination, decided by founder team with champion-cohort input.
- **Cohort size.** Eight to twelve champions for a typical Series A community. Scale roughly with community size. A `~50,000-member` community can support `~25 to 35` champions across multiple specialty tracks (community moderators, integration builders, content creators, regional ambassadors). Do not exceed roughly one champion per thousand active members. Past that ratio the recognition dilutes.
- **Term length.** Twelve months, renewable up to three consecutive terms (`36 months` maximum), then mandatory rotation to alumni.
- **Recusal.** Disclosed employer-conflict policy. Champions at direct competitors not eligible. Champions at integration partners or major customers disclose, contribute as normal, but specific decisions involving their employer are noted in the program records.
- **Time commitment.** Roughly `4 to 8 hours/month` per champion across community work, the monthly champion call and any specific projects they take on. Champions doing more than `15 hours/month` are either being asked too much or doing employee-shaped work that should be employment.
- **Compensation.** Recognition (public credit, badge, listing). Access (monthly briefing call, early access to features). Optional travel (`$1,500 to $3,000/year` per champion for one relevant conference). No salary or per-deliverable payment by default. If specific deliverables become commercial-grade (conference keynote, white-paper-quality writing), pay specifically for those at market rate as contractor work.
- **Backfill.** When a champion rotates out (term limit, employer change, voluntary exit), the seat is open for nomination within `30 days`. Vacancies longer than `60 days` are the signal that the program is contracting and the founder should examine why.
- **Public minutes.** Quarterly summary of program activity: number of champions, retention rate, work done (in aggregate, not by champion), upcoming term-renewals and new-champion intake. Published on the company website. The transparency prevents the program from becoming an insider club.
- **Smallest viable version.** Write the charter. Recognize the existing power users formally with a public list and badge. Run one monthly call for six months. If the structure produces durable engagement (champions still active at month six and producing the work they were doing informally before), formalize term limits and the renewal process. If the structure feels heavy for the size of the community, the formalization was premature.
- **Traction metric.** Champion retention through twelve-month term. Healthy: `>80%` of champions complete their first term. Below `60%` is a signal that the program is asking for too much or rewarding too little.
- **Retention metric.** Alumni network engagement. Healthy alumni network has `>40%` of former champions continuing as casual community participants two years after rotation. Alumni networks that go silent indicate the rotation felt like a demotion rather than a graduation.

## Open questions

What about champions who develop a commercial business adjacent to the product (consultants, agencies, training providers)? Common pattern, mostly healthy for the ecosystem. The charter should require disclosure of commercial activity and prohibit champions from using their champion status as a primary marketing claim for their consulting business. Champions who clearly cross this line lose champion status without controversy.

How does the program interact with paid programs run by other parts of the company (training partner program, affiliate program, reseller program)? Carefully. Most champions will eventually qualify for at least one paid program. The line worth maintaining: champion status is recognition for community work. Paid programs are commercial relationships. The same person can hold both with proper disclosure. Confusing the two creates either champion programs that look like sales (bad) or paid programs that feel like obligations (also bad).

When does the program become political? Around year three typically, when champions develop strong opinions about who else should be a champion, the structure of the program, the company's roadmap and similar topics. This is healthy if the program has clear governance and unhealthy if decisions get made by personality rather than by the published criteria. The charter is the discipline that keeps the program functioning past year three.

What happens when a champion publicly criticizes the product? The right response depends on the nature of the criticism. Honest substantive criticism is good and the champion's status should not be threatened. The disclosure here is that champions are not company spokespeople and their public opinions are their own. The wrong response is to threaten the champion's status. That turns the program into a hostage situation and the audience notices.

For early-stage companies before they have a power-user layer, when do you start? Probably not before there are `~5 to 8` identifiable power users doing employee-shaped work. The structure adds overhead, and overhead without enough champions to amortize against is dead weight. Most companies are ready around eighteen to twenty-four months after launching their community.
