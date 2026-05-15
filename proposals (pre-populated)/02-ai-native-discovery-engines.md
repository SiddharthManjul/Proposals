CATEGORY: SIP
TITLE: YC Summer 2026 RFS on AI-Native Discovery Engines: close the discovery loop on narrow verticals first

ABSTRACT: Most reads of AI-native discovery treat the bottleneck as model capability. Get the model to PhD-level on benchmarks and the rest follows. The actual bottleneck is the wet-lab side: experiments still cost real money and take real time and the hypothesis-to-experiment-to-result loop closes weekly at best. Wedges that ship first are the ones that pick a vertical narrow enough for the loop to close in days, with a buyer who already pays for outsourced experiments and would happily pay for faster ones.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on AI-Native Discovery Engines](https://www.ycombinator.com/rfs), authored by Jon Xu.

## Problem

Jon Xu's RFS frames the shift as "from copilot research assistants to intelligent systems that can run closed discovery loops." That framing is correct but skips over which loops actually close. A drug-discovery loop closes on the order of years (synthesis → ADMET → in vivo → readout). A materials-science loop closes on the order of months (synthesize candidate → characterize → measure property). An industrial-enzyme loop closes on the order of two to three weeks (express the protein → assay activity → screen variants). A reaction-yield optimization loop closes overnight in a well-instrumented flow chemistry rig.

If the loop closes overnight, an autonomous discovery system runs hundreds of cycles before a human team would run two. If it closes in two years, the autonomous system runs one cycle and the team has retired. The whole bet. *can the AI iterate faster than a human team?*. Is set by the wall-clock time of the slowest step in the loop, which is almost always a wet-lab step, not a compute step.

The reframe is that AI-native discovery isn't one market. It's a series of markets sorted by loop-closure time and the first ones to win are the fastest-closing ones, not the most scientifically prestigious.

## Why now

Three shifts in the last 12 months:

- Cloud lab capacity is real and accessible. Strateos, Emerald Cloud Lab and a handful of academic core-facility-as-a-service operators will execute a robot-formatted protocol on the order of `$200–800` per assay run, billable on a credit card. The wet-lab loop is API-callable for the first time at startup scale.
- Frontier models have crossed the threshold where structured hypothesis generation in chemistry and biology outperforms graduate-student baselines on retrosynthesis and protein-variant ranking benchmarks. Not at the edge of the literature. But at the kind of routine inference that fills a `Ph.D.`'s first two years.
- The protein-design models (RFdiffusion, ESM3, AlphaFold3) are open-weight or near-open. The capability is no longer locked inside DeepMind or Generate Biomedicines. A two-person team with `$200K` of cloud compute can do work that required a `$50M` lab in 2022.

## Wedge 1: Discovery-as-a-service for industrial catalysts

Specialty-chemical companies (BASF, Solvay, the long tail of mid-size firms) run catalyst-screening programs at the cost of `$2–5M` per program over 18 months. The output of a program is typically one to three catalyst candidates that improve yield, selectivity or stability on a specific reaction. The work is well-bounded, the IP rights are clean and the buyer knows exactly what a successful candidate is worth.

**What it is.** An autonomous loop that takes a target reaction (substrate, product, current best yield/selectivity), generates candidate catalyst structures, has them synthesized at a cloud lab or a contract synthesis partner, measures performance and iterates. Pay only on delivered candidates that meet the spec.

**Validation looks like:** three paid programs in year one with mid-size specialty chemical firms. Outcome metric: time from contract to first candidate that beats current best by `≥ 15%`. Floor target: four months versus the industry's eighteen. If the loop doesn't close that fast, the business doesn't work.

**Why the buyer pays:** specialty chemical R&D is the one place where the customer can write a contract that says *we'll pay $X per percent yield improvement delivered*, because they already do that internally. The bet is selling them the same outcome at a quarter of the cost and a quarter of the time, with their IP rights preserved.

**GTM and revenue:** sold through technical-buyer relationships at six or seven target accounts. The salesperson is a synthetic chemist with a Rolodex, not a sales-ops hire. Revenue per program is `$300–800K`, weighted toward success milestones. At ten concurrent programs by year three, that's `$3–8M` ARR with structural gross margins above 70% because the marginal cost is cloud-lab credits.

**What kills it.** Two failure modes. First, the loop doesn't close fast enough because the cloud lab isn't actually general-purpose for catalysis chemistry and the founder ends up building their own wet lab. At which point the unit economics look like a CRO, not a software company. Second, the buyer demands exclusivity on output and the contract math stops working. The defense on both is picking a substrate class narrow enough that one cloud-lab vendor can serve all of it (cross-coupling reactions are a reasonable first slice).

## Wedge 2: The orchestration plane between models and instruments

The hypothesis-generation models exist. The lab-automation instruments exist. The thing that doesn't exist is the connective tissue: a system that takes a model's proposed experiment, translates it into the specific protocol format the lab automation system needs, schedules the run, ingests the result and feeds it back. Today this is glued together with `Python` scripts written by a bored postdoc.

**What it is.** A platform (call it Zapier for labs, more honestly) that provides typed connectors between hypothesis-generation LLMs (or the lab's own scientists) and instruments: Strateos, ECL, lab automation suites like Hamilton Vantage and the long tail of one-off instruments via OPC-UA and SiLA2 adapters. It also handles the result side: structured ingestion of assay outputs, format normalization, write-back to the model context.

**Validation looks like:** five paying customers in year one, mix of biotech startups and corporate research groups. Usage metric: number of model-initiated experiments per week per customer. Floor: 20/week per customer by month six, which implies the platform is genuinely the orchestration layer and not just a once-a-quarter pipeline run.

**Why the buyer pays:** every research group building toward autonomous discovery hits the same orchestration problem at the same point in their roadmap. Building it in-house is six engineer-months that don't differentiate their science. Buying it for `$5K/month` per group is an obvious yes if the connector library is genuinely broad.

**GTM and revenue:** developer-first, but the developer is a computational scientist, not a software engineer. Distribution is conference talks at NeurIPS Generative Bio workshops and ACS Spring, plus open-source connector libraries for the most popular instruments. Revenue: per-seat at `$5K/month`, plus usage-based on experiments-run. At 50 customers averaging 4 seats, that's roughly `$12M` ARR.

**What kills it.** The lab automation vendors building this themselves and bundling it free with their hardware. The defense is being the *neutral* layer. Work with all vendors, owned by none. Same shape that worked for Twilio against the telco-owned messaging stacks.

## Wedge 3: Industrial enzymes as the first autonomous-discovery vertical to monetize

Therapeutic protein engineering has the largest TAM and the longest payback. Industrial enzymes. Used in laundry detergents, food processing, biofuels, paper bleaching, leather tanning. Have payback cycles of 18–24 months and a buyer (Novozymes, DuPont, the big detergent OEMs) who pays per kilogram delivered. They are protein engineering's *boring shape*and that's why they ship first.

**What it is.** A vertical-focused autonomous loop: pick three target enzymes with well-defined commercial demand (e.g., a thermostable cellulase for textile recycling, a low-temperature lipase for cold-water laundry, a phytase variant for animal feed), use protein-design models to generate variants, express and assay them at a contract-manufacturing partner, sell the winning variants under royalty or supply contracts.

**Validation looks like:** one variant per target outperforming the current commercial standard on the customer's own activity assay by `≥ 30%` within twelve months. The threshold for *the customer signs* is roughly there. Below `15%` improvement, the switching cost on industrial supply contracts is higher than the benefit.

**Why the buyer pays:** industrial enzyme buyers operate on tight margins and any input that reduces enzyme load per kilogram of product is invoice-line legible. A 30% activity improvement at parity price translates directly to gross-margin lift. The contracts are multi-year and the IP rights typically license, which lines up with a startup's economics.

**GTM and revenue:** four to six target buyers globally per category. The salesperson is an industrial biochemist with prior tenure at Novozymes or DuPont. Revenue is a mix of upfront license fees (`$500K–2M`) and per-kilogram royalties (`$0.50–5/kg`). At three commercialized variants by year four, ARR is in the `$10–25M` range with software-like gross margins on the royalty stream.

**What kills it.** Novozymes' internal R&D shipping a competitive variant before the startup does. The defense is starting with the targets they're not currently working on. There are always 10–15 enzymes where the demand is real but the incumbent's prioritization queue is full. Don't fight where they're already aimed.

## What's already been tried

- **Atomwise, Recursion, Insitro and the broader AI-drug-discovery cohort.** All bet on therapeutic targets where the loop closes in 5–10 years. Recursion is now worth materially less than its 2021 SPAC valuation. Atomwise has pivoted toward partnerships. The science isn't wrong. The loop-closure time made the unit economics brutal for venture timelines.
- **Strateos and Emerald Cloud Lab.** Built the cloud-lab primitive. Strateos sold to Ginkgo for under their last private valuation. ECL remains independent but small. The infrastructure works. The customers who actually closed loops at high frequency are the rare birds. This suggests the orchestration-plane wedge (Wedge 2) is where the value got captured, not at the wet-lab layer.
- **Coscientist (CMU, 2023) and the academic autonomous-lab papers.** Demonstrated the closed loop works on toy chemistry problems. Did not turn into a company because the chemistry was toy and the buyers were academic. Read as proof of concept, not market validation.

## Open questions

- Is the right founder shape for Wedge 1 a synthetic chemist who learned ML or an ML person who hired a synthetic chemist? My read is the first. The failure mode is the second, because the chemistry-side intuition can't be outsourced. But the historical pattern of successful biotech founders cuts the other way.
- Wedge 2 has the largest market but the weakest moat. Is there a way to layer proprietary data on top of the orchestration layer (anonymized aggregate experiment outcomes, say) that turns it from infrastructure to flywheel? Or does that break trust with customers and kill the neutral-layer thesis?
- For Wedge 3, the industrial-enzyme market is `~$8B` globally with three dominant players. Is there enough oxygen for a new entrant or does this collapse into *get acquired by Novozymes in year three* as the realistic exit? The latter is a reasonable outcome but a different shape of company.
- What's the right granularity of vertical? *Industrial enzymes* might still be too broad. The actual unit might be *enzymes for textile recycling specifically*. The narrower the wedge, the faster the loop, but the smaller the TAM.
