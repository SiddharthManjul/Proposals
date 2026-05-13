CATEGORY: SIP
TITLE: YC Summer 2026 RFS — Company Brain: build it for one process, not the whole company

ABSTRACT: The "company brain" framing implies a single horizontal product per company. The realistic shape is the opposite — a vertical brain that owns one process end-to-end, deeply, with the operational responsibility for outcomes that come with it. Selling a knowledge-graph platform with "you build the skills" is a developer-tools business with weak economics. Selling a process owner that happens to use a knowledge graph is a services-with-software-margin business with strong ones. Three process-shaped wedges that earn their seats.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on Company Brain](https://www.ycombinator.com/rfs), authored by Tom Blomfield.

## Problem

Tom Blomfield's RFS identifies the right bottleneck: domain knowledge, not model capability, is what blocks AI automation inside operating companies. The disagreement is about which shape captures the value. A horizontal platform that promises to *ingest your knowledge and produce a queryable company brain* has been tried at least six times since 2023 — Glean, Sana, Coda AI, Notion AI, Microsoft Copilot — and the typical outcome is a six-figure pilot that never expands because the brain is correct in the abstract and useless in practice.

The useful-in-practice version is process-specific. A *refund decision brain* is a thing you can build and measure: how many refund decisions does it make, what's the override rate, what's the customer-satisfaction delta, what's the dollar exposure. A *general company brain* is a slogan; it can't be measured because nobody is on the hook for an outcome.

The reframe is that the unit of *brain* is the process, and the buyer is the process owner — the VP of customer support, the head of revenue operations, the head of underwriting. The platform brain has many buyers and no buyer. The process brain has one buyer who cares deeply, signs a contract, and renews when the metric moves.

## Why now

Three shifts in the last 12 months:

- The skills-file primitive (Anthropic's published Skills format and the open variants) has matured to the point where a domain-specific behavior can be expressed in a 50–500 line markdown file plus an evaluation harness, instead of fine-tuning a model. The artifact a company-brain provider hands over is now version-controllable, auditable, and small.
- Operating companies have been through enough failed AI pilots by mid-2025 to know what *doesn't* work. The procurement organization will no longer fund *horizontal AI platform*; it will fund *AI that owns this specific KPI*. The buyer is sophisticated where it wasn't 18 months ago.
- Long-context models (1M+ tokens, with structured retrieval) cleared the threshold where ingesting a substantial portion of a company's process documentation, prior tickets, and policy history fits in working context without complex RAG infrastructure. The system-integration work that used to cost six engineer-months collapsed.

## Wedge 1: A customer-support brain that owns tier-1 and tier-2 resolution

Customer support is the operating function where the cost of bad knowledge is most visible. A typical mid-market SaaS company runs `30–80` support agents, average tenure 14 months, ticket volume `~$15–40/ticket` fully loaded. Most tickets are *we've seen this exact issue 500 times*; the agent's job is mostly retrieving the prior resolution and applying it.

**What it is.** A managed support service that takes over tier-1 and progressively tier-2 ticket resolution. The underlying system is a company-specific brain — every prior ticket, every internal runbook, every product spec, every change log, every customer account context — wrapped in a model that responds, escalates, or hands off. Critically, the company doesn't license the platform. They contract the *resolution*, billed per-ticket or per-active-user.

**Validation looks like:** ten paying customers within 18 months, average ticket volume per customer `2,000–10,000/month`, resolution metric `≥ 60%` deflection at customer-satisfaction parity within six months of go-live. The numbers that matter are deflection rate and CSAT delta; if either is off, the contract doesn't renew.

**Why the buyer pays:** the head of support today pays `$50–120/agent/year` for a help-desk platform (Zendesk, Intercom) and `$60–100K` fully loaded per agent. Replacing 40% of agent capacity with a resolution service that bills `$2–4` per resolved ticket is a budget-line shift, not a budget-line addition. The wedge is *we charge less than your current per-ticket cost and you can lay off the headcount, or redeploy it to retention work*.

**GTM and revenue:** sold direct to VP-of-Support at mid-market SaaS (`$50M–500M` ARR companies). The salesperson is a former head of support, not a software AE. Revenue per customer `$200K–2M/year` depending on volume. At 30 customers averaging `$500K`, that's `$15M` ARR with gross margins above 65% because the model-inference COGS is well below the per-ticket revenue.

**What kills it.** Zendesk and Intercom shipping their own native AI resolution layer (both already have it; the question is quality). The defense is being a service, not a platform — the buyer doesn't have to integrate, train, or operate it, which is the work that the platform-AI products require. The customer-success cost has to stay low for this to work; one heavyweight integration per account kills the unit economics.

## Wedge 2: A post-acquisition integration brain for PE-backed roll-ups

Private equity firms running buy-and-build strategies (think the wave of healthcare services roll-ups, IT services roll-ups, HVAC roll-ups in the last decade) face an identical problem at each acquisition: take the acquired company's operating practices, surface where they diverge from the platform's playbook, and execute the migration. This work is currently done by a `$300–500K/year` "VP of Operations" hired post-close, who spends 12–18 months touring the new company, building spreadsheets, and rewriting processes.

**What it is.** A service plus software offering for PE platforms running 8+ portfolio companies. Each portco onboards into a *platform brain* that ingests their existing process documentation, identifies divergences from the platform's reference operating model, generates a prioritized migration plan, and tracks execution. The PE firm gets a coherent operating picture across all portcos for the first time; the portco gets faster, cheaper integration.

**Validation looks like:** three PE platform contracts in year one, each covering 6–15 portfolio companies. The metric that matters is *time from close to playbook adoption*, measured against the PE firm's prior baseline. Target: 50% reduction. If the PE firm doesn't see that, they don't renew across the rest of the portfolio.

**Why the buyer pays:** PE firms compete on operational improvement. A platform that demonstrably accelerates post-close integration is a fee-line item they already understand — they pay operating partners `$500K–1.5M/year` for similar work today. The platform shape is *outcome-priced consulting with software margins*, which is what every PE firm wishes their operating partner cost line looked like.

**GTM and revenue:** sold to PE operating-partner organizations directly, at 30–50 target firms in the U.S. and Europe. The relationships exist via LP networks; the salesperson is an ex-McKinsey operations partner. Revenue per PE platform `$1.5–4M/year`. At 15 PE platforms, that's `$25–60M` ARR with gross margins clearing 60% once the playbook templates accumulate across multiple portfolios.

**What kills it.** PE firms not actually buying outside vendors for portfolio operating work; the historical pattern is in-housing it. The defense is starting with mid-size PE firms (`$2–10B` AUM) where the operating-partner bench isn't already built out, then expanding upmarket once the case studies exist.

## Wedge 3: A regulated-industry process brain for one regulatory regime

Banks, insurance carriers, hospitals, and pharma operate under regulatory regimes where every operational decision has audit consequences. The cost of *knowledge inconsistency* is concrete and large: a bank with inconsistent KYC procedures across branches pays compliance settlements; an insurance carrier with inconsistent claims adjudication pays bad-faith judgments. The operating layer in regulated industries is exactly where a process brain creates measurable value, and it's exactly where the platform-AI products have been refused entry because compliance won't sign off on a black box.

**What it is.** A process brain narrowed to one regulatory regime and one process — say, KYC/CIP onboarding at community banks, or claims adjudication at workers-comp carriers, or prior-authorization processing at Medicaid managed-care plans. The system is auditable line by line, the decision logic is explicit, the human-in-the-loop for material decisions is mandatory, and every output carries a citation chain back to the controlling regulation or policy.

**Validation looks like:** five regulated customers within 18 months, each in the same vertical for the first cohort. The metric is *decision consistency*, measured as the rate at which the same input produces different outputs across the customer's existing human operators. Target: take the baseline disagreement rate from `15–25%` to under `3%`. Regulators see this as risk reduction; auditors see it as control effectiveness.

**Why the buyer pays:** the chief compliance officer at a community bank is the buyer. They are personally on the hook when regulators find inconsistent procedures. A tool that demonstrably reduces the inconsistency is purchased at a price point that reflects their personal risk exposure, not the software's cost of production.

**GTM and revenue:** vertical regulatory-conference circuit (ICBA for community banks, NAIC for insurance, AHIP for healthcare payers), plus partnerships with the audit firms that already serve these customers. Revenue per customer `$300K–1.5M/year`. At 30 customers in one vertical, that's `$10–25M` ARR with very strong retention because regulatory wind blows in only one direction.

**What kills it.** A regulator publishing guidance that effectively requires using a specific vendor or framework, and the startup not being that vendor. The defense is engaging regulators early and being the reference vendor in the published guidance. Same play that ICE and DTCC ran in market-structure regulation a generation ago.

## What's already been tried

- **Glean, Sana, Coda AI, Notion AI** (horizontal company-brain platforms). All built the *ingest-everything-then-query* product. Glean has the most traction at `~$100M+` ARR and a `$2B+` valuation, but the customers are largely using it as a smarter search engine, not for autonomous process work. The lesson reads as *horizontal-brain monetizes as enterprise search, not as automation*, which is a different and lower-multiple business.
- **DigitalGenius, Ada, Cresta** (vertical support-AI platforms). Closer to Wedge 1's shape. The platform-licensing model has plateaued at mid-eight-figure ARRs; the *service* shape (pay-per-resolved-ticket) is differently positioned and not yet served by these incumbents.
- **TripleBlind, Hyperscience, Workfusion** (regulated-process automation, predecessors to Wedge 3). Built deterministic-RPA-style workflow automation for banks and insurers. Modestly successful businesses with low growth profiles. The LLM-native version of this category is open and the incumbents haven't moved fast enough.

## Open questions

- For Wedge 1, the support team being replaced is also the team that historically owns *training data quality*. If the resolution service replaces them entirely, who maintains the brain's accuracy as the product changes? My read is that this requires a continuous-evaluation loop with the customer's product team, which is a separate motion to build.
- Wedge 2's PE buyers are notorious for not paying for *innovation* outside the portcos themselves. Does the operating-partner organization actually have a budget for this, or do you have to bill it through the portcos? The latter is cleaner but adds 8+ buyers per platform.
- The Wedge 3 vertical (which regulated industry first?) determines the next 5 years of the business. Community banking has the lowest barrier to entry and the smallest TAM; pharma is the inverse. What's the right starting vertical?
- Is the Anthropic Skills format the right primitive, or does the durable thing turn out to be a different artifact shape entirely (typed-state-machine, structured-prompt-graph, something else)? The skill-as-markdown-file approach is a 2025 convergence; it may not be the 2028 convergence.
