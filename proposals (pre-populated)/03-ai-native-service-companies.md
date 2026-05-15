CATEGORY: SIP
TITLE: YC Summer 2026 RFS on AI-Native Service Companies: replace the service firm, do not sell software to one

ABSTRACT: The 2023–2025 wave sold AI copilots to incumbent service firms. The wave that wins is the one that replaces the firm, takes the customer relationship directly and prices on the customer's underlying spend. Not on a per-seat copilot fee. The wedge in every services vertical is the same: pick a regulated buyer, pick a workflow where the inputs and outputs are already structured and become the firm the customer hires. Three verticals that fit cleanly.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on AI-Native Service Companies](https://www.ycombinator.com/rfs), authored by Gustaf Alströmer.

## Problem

Gustaf Alströmer's RFS is right that services spend dwarfs software spend. By roughly 10x at the U.S. economy level. The 2023 wave of *AI-for-service-firms* startups misread which side of the trade to be on. Selling a copilot to a 50-partner accounting firm at `$500/seat/month` caps the upside at the headcount of the firm. Becoming the accounting firm itself caps the upside at the firm's revenue. Those two numbers differ by 30x or more for any decently-sized professional services business.

The reason most founders chose the copilot trade is that becoming the service firm sounds like a labor-arbitrage play with low margins and a long ramp. That was true when the work required human judgment at every step. It stops being true at the moment a model can do 70% of the deliverable's substantive work and a human reviews the 30%. The unit economics flip: the deliverable still bills at $X, but the firm's COGS drops from sixty cents on the dollar to twelve.

The reframe is that AI-native service firms are not labor-arbitrage businesses with software wrappers. They are software businesses that happen to deliver an audited regulated work product, which is why they can charge service-firm prices for software-firm marginal cost.

## Why now

Three shifts in the last 12 months:

- Frontier models cleared the threshold for routine production of structured regulated work product (tax returns, SOC 2 control evidence, denial appeals, claim packets) at quality matching a third-year associate. The remaining 30% is judgment, regulatory edge cases and signoff, which is still human work but at one-fifth the labor leverage.
- E&Y, Deloitte and the rest of the Big Four have publicly committed to firm-wide AI tooling rollouts in the `$1B+` range. The signal isn't that they'll win the AI race. It's that they've trained their customers to expect AI-augmented pricing. The price umbrella to undercut just got raised.
- The regulatory side has begun catching up. The IRS now accepts e-filed returns from non-CPA preparers with appropriate credentials. State insurance regulators have approved AI-assisted underwriting in 30+ states. HIPAA business-associate agreements now have well-formed templates for LLM vendors. The compliance friction that made startup-grade service firms infeasible in 2022 is dropping every quarter.

## Wedge 1: Commercial insurance brokerage for one vertical

Commercial insurance brokerage is a `$200B+` annual commission market in the U.S. Brokers earn 10–15% of premium on placed business, renewals are recurring and the work (quoting, underwriting submission, certificates of insurance, claims advocacy) is structured, document-heavy and exactly the kind of work a model handles. The catch is regulatory: a broker must be licensed in every state where they bind business and licensing has continuing-education requirements that bite.

**What it is.** An AI-native commercial broker focused on one industry vertical, say, mid-market trucking fleets (`50–500 trucks`) or commercial restaurants or specialty contractors. One vertical means one set of carriers, one set of coverage forms, one set of underwriting questions, one set of common claims. The narrowness is the wedge.

**Validation looks like:** 30 paying clients in the first 18 months, average commission `$8–25K/year` per client, retention `≥ 90%` at first renewal. Renewal retention is the proof. If the AI-native broker isn't differentially valuable at renewal, the relationship was a one-time placement, not a switched relationship.

**Why the buyer pays:** the mid-market trucking fleet today gets served by a regional broker who answers email in 24 hours and charges full commission. The AI-native broker answers in 90 seconds, generates certificates of insurance instantly and prices the same. The buyer's revealed preference is for speed and information. They keep the legacy broker only because there isn't a credible alternative.

**GTM and revenue:** vertical-trade-association partnerships and direct outbound through industry-specific channels (Truckers' Trade Show, NRA Show for restaurants). One licensed broker on staff per state where the firm operates initially. Eventual cost amortizes against the book. Revenue: 10–12% commission on placed premium, plus fee income for risk-management services. At 1,000 clients averaging `$15K/year` commission, that's `$15M` ARR with structural gross margins above 70% post-licensing-cost.

**What kills it.** The carriers refusing to appoint a startup brokerage, which is a real risk for new entrants without a book. The defense is starting as a managing general agency (MGA) in partnership with one mid-size carrier looking for distribution into the chosen vertical, then expanding carrier appointments after the book proves out. The slower path also makes the wedge defensible.

## Wedge 2: Accounting and tax for a specific small-business vertical

The U.S. has roughly `1.4M` small-business owners filing partnership or corporate returns and another `25M` Schedule C filers. The average price of a small-business return prepared by a CPA is `$1,200–4,500/year`. The work is bounded, the deliverables are structured and the customer relationship is sticky. Once a CPA has prior-year returns, the switching cost is real.

**What it is.** An AI-native accounting and tax firm focused on a specific vertical. Dental practices, say or independent restaurant operators or solo software consultancies. Monthly bookkeeping, quarterly estimates, annual return and the smaller categories of advisory work (entity selection, retirement plan setup, sale-of-business prep). Priced as a flat monthly subscription, not hourly.

**Validation looks like:** 200 clients by month 18, average revenue per client `$200/month`, churn under 1% monthly. Two metrics matter: the gross margin on bookkeeping (which should clear 70% by month 12) and the retention through the first tax season (the moment of truth).

**Why the buyer pays:** the dental-practice owner today pays `$2,500–6,000/year` to a generalist CPA who knows accounting but doesn't know dental. The AI-native firm offers `$300/month` flat, knows the depreciation schedule for a Cerec mill cold and answers in minutes not days. The price point is similar, the service is differentially better, the relationship is digital.

**GTM and revenue:** dental school alumni networks and dental practice management consultants are the warm channels. Content marketing into dental practice owner forums (Dentaltown) plus partnerships with practice-broker firms (who refer at point of practice sale and acquisition). Revenue per client `$2,400–6,000/year`. At 5,000 clients, that's `$15–30M` ARR.

**What kills it.** The IRS rejecting an AI-prepared return for a non-trivial reason and the firm absorbing the penalty exposure. The defense is keeping a CPA in the signoff loop for every return in years one through three, eating the gross margin hit and using the volume to train the system to the point where the CPA's review time drops from 45 minutes to 5. The signoff loop is also a regulatory shield.

## Wedge 3: Healthcare administrative services for a specific payer-provider gap

Healthcare administration in the U.S. costs roughly `$800B/year`, almost a third of total healthcare spend. Inside that number, prior authorization, claim denial appeals, eligibility verification and revenue-cycle management are the four workflows where document-in, decision-out cycles dominate. Hospitals and health systems pay revenue-cycle vendors `2–8%` of collected revenue to do this work today.

**What it is.** An AI-native revenue-cycle services firm focused on one workflow and one provider type, say, denial-appeal management for outpatient specialty practices (gastroenterology, dermatology, orthopedics). Ingest the denied claim, the original chart notes, the payer's contract, the relevant medical policy. Produce the appeal letter with citations. Track the appeal through the payer's process. Bill the practice as a percentage of recovered revenue.

**Validation looks like:** ten outpatient specialty practices on contract within twelve months, average recovered revenue per practice `$200–600K/year`, the firm's cut at `25–35%`. Two numbers matter: appeal win-rate (industry baseline is roughly 30%. AI-native target is `≥ 55%`) and time-to-recovery (industry is 90–120 days. Target is 30–45).

**Why the buyer pays:** the outpatient specialty practice writes off `4–8%` of billed revenue to denied claims and doesn't have the staff capacity to appeal aggressively. The economics are *we take what you would have written off, we recover most of it, we keep a quarter, you keep three quarters*. There is no scenario in which the practice is worse off. The only question is whether the firm's win-rate beats the alternative of doing nothing.

**GTM and revenue:** specialty-society partnerships (American Academy of Dermatology, American Gastroenterological Association) and direct outbound to practice administrators. The salesperson is a former revenue-cycle director. Revenue is purely contingent on recovery. `25–35%` of recovered claim revenue, which at scale runs `$50–150K/year` per practice. At 200 practices, that's `$15M+` ARR with very strong unit economics because the COGS is almost entirely model inference.

**What kills it.** Payers (UnitedHealth, Anthem, the rest) building counter-AI that auto-rejects AI-generated appeals at scale. The defense is making the appeals genuinely better. Citing specific medical policies, attaching specific chart evidence, matching specific contractual terms. To the point where rejection at scale would draw regulatory attention. Insurance regulators in most states require appeal review by a clinical reviewer. That requirement is the system's structural defense.

## What's already been tried

- **Pilot.com, Bench, Botkeeper** (small-business accounting). All three tried to be the bookkeeper at scale. Bench shut down in late 2024 after running out of runway. Pilot is profitable but smaller than the 2021 valuation implied. The lesson reads as *generalist accounting at scale has thin margins. Vertical-specific accounting has thicker ones*, which is Wedge 2's bet.
- **Lemonade, Hippo, Root** (personal-lines insurance startups). Different shape from commercial brokerage but a useful data point. The personal-lines bet was *replace the consumer-facing carrier*. It's worked moderately. The commercial-brokerage bet is *replace the broker*, which has different economics: no underwriting risk, no balance sheet, just commissions. Cleaner unit economics, narrower TAM per vertical.
- **Olive AI** (healthcare administration). Raised `$850M` to automate hospital back-office. Wound down in 2023. Reads as a *too-broad-at-once* failure rather than a thesis failure. They tried to be the AI back-office for everything inside a hospital, instead of picking one workflow and one provider type. Wedge 3's discipline is the inversion of Olive.

## Open questions

- Are the regulatory licensing constraints (insurance, CPA, healthcare) a moat or a tax? My read is that it's a moat. They keep the SaaS-copilot competitors out of the firm-replacement shape, but they also slow the ramp by 12–18 months versus an unregulated category.
- Wedge 2's customer-acquisition cost is the hard problem. CPAs are typically acquired through referral, not paid acquisition. Does the AI-native shape enable a different acquisition channel (e.g., a free integration into vertical-SaaS like Dentrix) or is this just expensive content marketing in dental-trade publications for a decade?
- For all three wedges, the founder is part-domain-expert, part-software. The domain experts who exist in these fields are typically over 45 and unlikely to start a company. Where does the founder cohort come from?
- Does the LLM-vendor commercial relationship hold up at the volumes these businesses imply? A 5,000-client accounting firm running model inference on every reconciliation is a meaningful monthly bill at current API prices. The unit economics depend on that line decreasing.
