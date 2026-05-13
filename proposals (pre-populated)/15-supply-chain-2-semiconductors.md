CATEGORY: SIP
TITLE: YC Summer 2026 RFS — Supply Chain 2.0 for Semiconductors: build the software the spreadsheets cannot

ABSTRACT: Most reads of semiconductor supply chain frame the problem as visibility — *if only everyone shared data, things would work*. Visibility is part of the answer; the larger gap is decision support. A typical fab planner today has the data; what they don't have is the system that runs scenario simulations across the supply chain when a node disrupts. The 2021 auto-chip shortage didn't happen because nobody saw the data; it happened because nobody had a way to act on it across firm boundaries. Three wedges where the decision layer is missing.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on Supply Chain 2.0 for Semiconductors](https://www.ycombinator.com/rfs), authored by Diana Hu.

## Problem

Diana Hu's RFS frames the right numbers: `1,400` process steps, `12` countries, `5` months end-to-end for an advanced chip. The framing's second-order observation — *managed via spreadsheets and SAP* — is the actually interesting part. SAP and spreadsheets are not failing for lack of technical capability; they are failing because the supply chain operates across firm boundaries where each participant guards their data, and the existing tooling assumes a single corporate-data-owner perspective.

The 2021 auto-chip shortage illustrated this. The data existed to predict the shortage; Toyota's supply-chain team and TSMC's planning team and the Tier-2 distributor each had visibility into their own slice. What was missing was the inter-firm coordination layer — the system that lets multiple parties run scenarios against shared assumptions, identify the breakage point, and re-allocate before the breakage compounds. Today that work happens by phone call between operations executives, with all the slowness and information asymmetry that implies.

The reframe is that semiconductor supply-chain software needs to be inter-firm-native, not corporate-data-warehouse-native. The buyer is the supply-chain function at a fabless company, an OEM, or a contract manufacturer; the value is decisions made across firm boundaries faster than competitors can.

## Why now

Three shifts in the last 12 months:

- The 2024 Taiwan-Strait crisis exercises and the ongoing tensions raised semiconductor supply-chain risk to a board-of-directors-level concern at every major OEM. The procurement budget for supply-chain visibility tools doubled at multiple Fortune 500s in 2024–2025. The buyer has the budget; the question is who they spend it with.
- Export-control complexity exploded with the U.S. Bureau of Industry and Security's published guidance on AI-chip-related controls (the `October 2022, October 2023, and December 2024` rule expansions), the EU's parallel framework, and Japan and Netherlands' bilateral controls. Semiconductor companies now require operational compliance tooling at a scale that didn't exist 24 months ago.
- The CHIPS Act deployment is converting from appropriated to operational. TSMC Arizona Fab 1 is producing wafers; Samsung Taylor begins production in 2026; Micron's New York fab broke ground in 2024. The U.S. fab-domestic supply chain — material suppliers, packaging, test, logistics — is being built from a thin base, and the participants need coordination tooling that they didn't need when production was concentrated in Taiwan and Korea.

## Wedge 1: Multi-tier supply-chain mapping and risk simulation

The narrowest, most concrete wedge: a platform that maps a chip company's full supply chain three or four tiers deep — beyond the direct suppliers most companies have visibility to — and runs scenario simulations against the mapped graph. *What happens to our 5nm wafer allocation if the Taiwan TPK packaging facility goes offline for 30 days?* The platform's value is the simulation answer plus the prescribed remediation steps.

**What it is.** A SaaS platform for semiconductor supply-chain functions at fabless companies, OEMs using meaningful chip content, and contract manufacturers. The platform ingests data from the customer's ERP (SAP, Oracle), procurement systems, and direct supplier communications. It augments that internal data with public intelligence (logistics data, trade-flow data, geopolitical-risk data) and proprietary intelligence (relationships with second- and third-tier suppliers who participate on the platform). The output is a continuously-updated supply-chain graph with simulated risk and remediation paths.

**Validation looks like:** 30 paying customers within 24 months at average ACVs `$200K–2M`. The metric that matters is *time-to-action on a real disruption* — when a node-level event happens (a fire at a substrate supplier, a logistics disruption, a regulatory change), how fast does the customer's supply-chain team identify the affected products and take remediation action? Target: under 4 hours, versus an industry baseline of 3–10 days.

**Why the buyer pays:** the supply-chain VP at a fabless semiconductor company today has a `$30M+` cost line attributable to disruption hedging — excess inventory, multi-sourcing premiums, expediting fees. The platform's value is *reduce the disruption-hedging cost by structurally better information, while improving resilience*. The math clears at any reasonable contract size for the customer base.

**GTM and revenue:** direct enterprise sales to supply-chain VPs and CSCOs at semiconductor companies, OEMs, and major industrial customers (automotive, aerospace, medical-device, telecom-equipment). The salesperson is a former semiconductor-industry supply-chain executive. Revenue per customer `$200K–2M/year`. At 100 customers averaging `$600K`, that's `$60M ARR` with strong gross margins because the data infrastructure amortizes across customers.

**What kills it.** SAP and Oracle shipping the multi-tier visibility features natively (both have programs underway). The defense is being substantially better at the *inter-firm* coordination — the second- and third-tier supplier participation that the incumbents structurally can't build because their commercial relationships are with the top-tier customer only. The startup's neutral position is the asset.

## Wedge 2: Semiconductor export-compliance automation

The export-control regime for semiconductors is now a substantial operational burden. Each shipment of a controlled chip, each transfer of design data, each customer relationship requires compliance checks against multiple overlapping regimes (U.S. EAR, U.S. ITAR, EU dual-use regulations, Japan-Netherlands bilateral controls, China-specific country controls). The work is currently done by compliance officers using lookup tables, spreadsheets, and a `$500–2K/hour` outside counsel for edge cases. The cost line for a major fabless company is `$10–40M/year`, growing.

**What it is.** A compliance-software platform that automates the work compliance officers do today. The platform ingests shipping data, customer data, product data, design-data-transfer events; runs them against the controlling export regulations (continuously updated by the platform's regulatory-content team); flags transactions that need attention; produces the documentation regulators require. Critically, the platform is built by people who understand semiconductor-specific export-control nuances (entity lists, end-use checks, controlled-technology classifications).

**Validation looks like:** 50 paying customers within 24 months at average ACVs `$100K–800K`. The metric that matters is *compliance audit readiness* — when BIS or analogous regulators ask for documentation on a specific transaction, can the customer produce it within 1 hour rather than the typical 1–5 days. The buyer is the Chief Compliance Officer or General Counsel; their willingness to pay reflects their personal regulatory exposure.

**Why the buyer pays:** the semiconductor company today operates export compliance with `5–25` compliance staff and `$1–3M/year` in outside counsel. The platform replaces a substantial fraction of the operational work, faster and more reliably. The compliance posture improves (fewer false negatives that lead to violations, fewer false positives that block legitimate shipments) and the cost line drops. Both numbers matter to the customer.

**GTM and revenue:** direct enterprise sales to General Counsels and Chief Compliance Officers at semiconductor companies, plus extension to chip-using customers (defense primes, telecom-equipment OEMs, automotive). Industry conferences (Semiconductor Industry Association, IPC, the export-control bar). Revenue per customer `$100K–800K/year`. At 100 customers averaging `$300K`, that's `$30M ARR` with very strong retention because regulatory exposure compounds in only one direction.

**What kills it.** General-purpose trade-compliance vendors (Descartes Systems, Thomson Reuters' compliance products) extending into semiconductor-specific features. The defense is depth — the regulatory content for semiconductors is genuinely specialized, and the general-purpose vendors' content quality lags. The startup also has an option to acquire or partner with the established trade-compliance vendors at year 3–5 if the strategic relationship makes sense.

## Wedge 3: A wafer- and packaging-allocation marketplace

The third wedge is the most ambitious: build a marketplace that lets fabless companies discover and contract for wafer-allocation and packaging-capacity beyond their existing supplier relationships. Today this happens through bilateral relationships negotiated months in advance; the marketplace shape allows real-time visibility into available capacity and faster contracting cycles.

**What it is.** A two-sided marketplace platform. Fab and packaging suppliers (TSMC, Samsung, GlobalFoundries, the major OSATs — ASE, Amkor, JCET — plus the long tail of regional players) list available capacity by node, process, and time window. Fabless customers query and contract through the platform. The platform handles credit checks, contract templates, dispute resolution, and post-contract operational coordination.

**Validation looks like:** 5 supplier listings and 30 customer accounts within 24 months, with `$50M+` of marketplace gross volume by month 36. The metric that matters is *whether suppliers actually list capacity on the platform* — without supplier listings the customer side has nothing to buy. The platform's two-sided dynamics are the existential problem.

**Why the buyer pays:** the fabless customer today negotiates wafer-allocation directly with the foundry, on long contracts (typically `1–3 years`) with limited flexibility. The marketplace promises faster contracts, more flexibility, and access to suppliers the customer doesn't have established relationships with. The supplier-side value is more efficient capacity utilization — capacity that today goes unsold because the customer with the need doesn't know it exists.

**GTM and revenue:** highly relationship-driven on both sides. Initial supplier-side traction probably comes from regional foundries (China-domestic, India's emerging fab capacity, the smaller European fabs) who have capacity to sell but limited customer reach. Customer-side traction comes from smaller fabless companies that can't get on TSMC or Samsung's allocation list at all. Revenue: take-rate on marketplace volume (`1–3%`). At `$1B` marketplace volume, that's `$10–30M` of revenue.

**What kills it.** The platform never reaches two-sided liquidity. Supplier-side participants don't list because their existing customer relationships are sufficient; customer-side participants don't trust capacity from suppliers they don't already know. The defense is starting with one customer class (small-to-mid fabless companies underserved by the top-tier foundries) and one supplier class (regional foundries with capacity to sell), and earning the right to expand. Two-sided marketplaces typically fail in the first 24 months or grow rapidly after that point; the discipline is surviving the first 24 months.

## What's already been tried

- **E2open, Project44, FourKites, Resilinc** (general-purpose multi-tier supply chain visibility platforms). All have semiconductor customers; none is semiconductor-native. The opportunity for Wedge 1 is depth-of-industry-knowledge that the horizontal vendors can't match.
- **Thomson Reuters trade-compliance, Descartes Systems, Veroot, Boundless.** Built general-purpose export-compliance software. Semiconductor-specific depth is the wedge; the horizontal vendors will not add it at scale because the market is small relative to their footprint.
- **TSMC's portal, Samsung Foundry's customer portal, GlobalFoundries' GF Compass.** Each foundry has its own customer-facing system. The neutral marketplace shape (Wedge 3) is structurally what the foundries cannot build because each is a participant, not a neutral operator. The historical analog is what NYMEX did for energy commodities — the exchange shape emerges where bilateral negotiation has scaled past comfortable limits.

## Open questions

- For Wedge 1, the data-sharing across firm boundaries is the structural challenge. Semiconductor companies are notoriously secretive. Is the value proposition strong enough that they'll share data on the platform, or does the platform need to operate primarily on public-data inference (logistics, trade-flow, geopolitical) augmented by customer-private data?
- Wedge 2's regulatory-content quality is the durable defensibility. The work of keeping the rules database current — across multiple jurisdictions, with rule changes every 3–6 months — is operationally expensive. Is there a way to monetize the regulatory-content layer separately (sell it to law firms, sell it to the general-purpose compliance vendors) to amortize the cost across multiple revenue streams?
- For Wedge 3, the marketplace timing is the open question. Two-sided marketplaces in industrial categories typically take `5+` years to reach critical mass. Is the venture-funding profile compatible with that timeline, or does this work as a longer-horizon strategic-investor-funded business?
- All three wedges depend on the geopolitical posture for semiconductors remaining tense. If U.S.-China tensions de-escalate substantially, some of the supply-chain visibility and export-compliance tailwinds weaken. What's the probability of that, and how do the wedges look in a relaxed-geopolitics scenario?
