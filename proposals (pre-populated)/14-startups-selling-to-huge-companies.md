CATEGORY: SIP
TITLE: YC Summer 2026 RFS — Startups Selling to Huge Companies: build for the F100 buyer with budget but no native vendor

ABSTRACT: Most reads of "startups selling to huge companies" assume the constraint is access. The constraint isn't access; F100 buyers are returning calls at unprecedented rates. The constraint is the early-stage startup's ability to navigate F100 procurement — security review, vendor onboarding, compliance attestation, master service agreements — without a 9-month delay that kills the deal. The wedge is the product narrow enough that F100 procurement can fast-track it, big enough to be worth fast-tracking. Three shapes that fit.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on Startups Selling to Huge Companies](https://www.ycombinator.com/rfs), authored by Harshita Arora and Brad Flora.

## Problem

Harshita Arora and Brad Flora's RFS is right that the F100 buyer's posture changed in 2024–2025. Senior executives at large companies are now actively seeking AI-native startups to solve specific problems, in a way that was true of two or three companies in 2022 and is broadly true now. The framing skips the second-order problem this creates: the procurement infrastructure inside the F100 was built for a different kind of vendor.

A typical F100 procurement process for a new vendor involves: security review (`60–120 days`), legal review (`30–60 days`), MSA negotiation (`30–90 days`), vendor onboarding into the buyer's systems (`14–30 days`), and pilot scoping with multiple internal stakeholders (`30–60 days`). The total is `7–14 months`, and the startup is not paid during this period. The startup needs `$5–15M` of bank to survive a deal cycle, which is exactly the founder-friendly cohort the F100 is now reaching out to.

The reframe is that the bottleneck is procurement-and-survival, not relationship-and-access. The startups that win against this RFS are not the ones with the best technology; they're the ones whose product is shaped to survive F100 procurement velocity. Three product shapes get through the procurement filter cleanly.

## Why now

Three shifts in the last 12 months:

- F100 procurement organizations published, formally and informally, *AI-vendor fast-track* programs by mid-2025. JPMorgan's published AI vendor framework, Walmart's startup-engagement program, and analogous programs at Microsoft, Amazon, and the major industrial conglomerates explicitly shortened the security and legal review for vendors meeting specified criteria (SOC 2 Type II + specific AI-safety attestations). The procurement infrastructure adapted; founders haven't all caught up.
- The legacy *system integrators* (Accenture, Deloitte, Cognizant, Infosys) saw their AI-implementation revenue grow faster than their headcount, which is structurally the signal that the F100 is buying AI capacity faster than the SIs can build it. The SI-shaped revenue is leaking to startups that ship product instead of consulting.
- Recent YC companies have publicly landed `$3–10M` first-year contracts with F100 customers (the RFS itself references this; the data on it has accumulated over the last 12 months). The pattern is now documented enough that the path is replicable, not exceptional.

## Wedge 1: An AI deployment platform built for F100 security and compliance review

The narrowest, most enabling wedge: the infrastructure that makes a startup's AI product *F100-procurement-friendly* without the startup needing to build security and compliance work in-house. Specifically — a hosted platform that provides SOC 2 Type II, HIPAA, FedRAMP, ISO 27001, and similar attestations as a service, plus the AI-specific frameworks (NIST AI RMF, model-risk-management documentation, third-party model evaluation) that F100 customers require for AI vendors specifically. Startups build their product on the platform; the platform provides the procurement-friendly wrapping.

**What it is.** A managed AI deployment platform. Startup customer integrates their model and product workflow into the platform; platform handles compliance, security, audit logging, model evaluation, deployment isolation per F100 customer. The end F100 customer signs a single procurement-friendly contract with the platform's vendor of record, even though the actual product is the startup's.

**Validation looks like:** 100 startup customers within 18 months, with collective F100-customer contract volume of `$50M+/year`. The proof point is *time-from-startup-onboard-to-first-F100-deal-closed* — target under 90 days, versus the 7–14 month industry baseline. If the platform doesn't compress that timeline, the value proposition collapses.

**Why the buyer pays:** the startup customer pays because building security and compliance in-house costs `$500K–2M` and 12+ months of engineering. The F100 customer pays because the platform's vendor-of-record posture clears procurement faster than the startup directly. The platform sits in the middle and charges both sides — usage-based fees from the startup, often passed through to the F100 customer as a line item.

**GTM and revenue:** distribution through YC, accelerator programs, and developer-conference channels for the startup customer side. Direct enterprise sales to F100 procurement and CIO offices for awareness. Revenue: usage-based fees (per inference call, per active F100 deal) plus floor subscription per startup customer (`$2–10K/month`). At 500 startup customers averaging `$60K/year`, that's `$30M ARR` with high gross margins because the compliance infrastructure amortizes.

**What kills it.** AWS, Azure, and GCP shipping native versions — they have the compliance baseline and the F100 customer relationships. The defense is being substantially better at the *AI-specific* compliance work, which the hyperscalers will provide but more slowly and with less depth. Also: the startup customer's preference for a neutral platform that isn't tied to one cloud provider, which a hyperscaler-owned solution structurally is.

## Wedge 2: A domain-specific AI product for one F100 operational function

The opposite end from Wedge 1's horizontal infrastructure: pick one specific operational function inside F100 companies (financial-services trading compliance, healthcare-payer claims operations, industrial-manufacturing quality control, energy-utility grid operations, retail-bank fraud investigation, etc.), build the AI-native product for that function, sell it directly to the function's executive owner. Narrow enough that the procurement scope is bounded; deep enough that the value is large.

**What it is.** Pick one example: AI-native trading-compliance surveillance for investment banks. The product ingests trade data, communications, market context; uses ML and LLMs to identify potential violations (spoofing, layering, insider-information leakage); produces investigation packets that compliance officers can act on. The buyer is the Chief Compliance Officer at a tier-1 or tier-2 investment bank. The contract value `$2–10M/year`. The target customer base is `~30 banks globally`.

**Validation looks like:** three paying customers within 18 months, each generating measurable reduction in either false-positive surveillance alerts (target: `≥ 60%` reduction) or true-positive identification (target: `≥ 30%` improvement). The functional metric matters because compliance is judged on outcomes, not promises.

**Why the buyer pays:** the CCO today operates a surveillance program with `$30–100M/year` in costs (technology, headcount, consulting). The cost line is rising every year as regulatory expectations grow. A new product that reduces the cost line by `20–40%` while improving effectiveness is a top-of-quarter agenda item for the CCO. The contract value reflects the scale of the cost line, not the marginal cost of the product.

**GTM and revenue:** highly targeted relationship sales to a known customer set (the `30 banks` in this example). The salesperson is a former bank-CCO or former financial-regulator. Revenue per customer `$3–10M/year`. At 15 customers, that's `$45–150M ARR` with very strong retention because regulated-industry switching costs are real.

**What kills it.** Bloomberg, NICE Actimize, or one of the established compliance-software vendors releasing an AI-native version. The defense is being substantially better at the AI-native workflow specifically; the incumbents have entrenched relationships but face the same *legacy code as liability* problem as in the SaaS-challengers RFS. Also: the regulatory posture for AI in compliance is itself developing; being the company that helps regulators shape the AI-in-compliance frameworks is differentiating.

## Wedge 3: Procurement-aware tooling that helps AI startups close F100 deals

The third wedge serves the other side: the startup that has an F100 customer in the funnel but doesn't know how to close the deal under F100 procurement constraints. The product is a combination of software and services — tooling that automates the standard procurement deliverables (security questionnaires, vendor onboarding paperwork, data-flow diagrams, model documentation packets) plus expert services from former F100 procurement leaders who navigate the relationship.

**What it is.** Hybrid product-services. SaaS platform for managing the F100 sales process: standardized security questionnaire responses, automated documentation generation, MSA template library, pilot-scoping playbooks. Wrapped around expert services: a small team of former F100 procurement leaders and former vendor-side enterprise sales leaders who advise the startup on each deal. Sold as a per-deal success fee (`5–10%` of contract value over 12 months) plus a base subscription (`$5–15K/month` for active customers).

**Validation looks like:** 50 startup customers within 18 months, collective F100 contract volume closed of `$100M+`. The metric is *deal velocity* — startups using the product close their first F100 deal in under 6 months on average, versus the industry baseline of 12–18 months.

**Why the buyer pays:** the startup founder who has a `$3M` F100 deal in the pipeline but no idea how to navigate the procurement gauntlet pays a `5–10%` success fee enthusiastically — the alternative is the deal slipping out of the founder's grasp. The willingness to pay is set by the perceived risk of failure, not by the cost of the service itself.

**GTM and revenue:** distribution through YC, Sequoia Scout, and similar early-stage networks. Direct outbound to series-A and series-B AI startups with announced enterprise customers. Revenue: success fees (variable, large) plus base subscription (predictable, smaller). At 100 startup customers averaging `$200K/year` blended revenue, that's `$20M ARR` with services-business margin structure (`40–55%`).

**What kills it.** The startup customers building this capability in-house once they hit a certain size, leaving the platform as a tool only for early-stage. The defense is moving up-market over time — extending the service to deal-by-deal advisory for late-stage startups (`$10M+` deals where the 5% success fee is `$500K+`) and to F100-procurement-as-a-service for the buyer side (helping F100 procurement teams structure their AI-vendor evaluations efficiently). Two-sided platform if it works; useful single-sided business if not.

## What's already been tried

- **Vanta, Drata, Secureframe** (compliance-automation platforms). Built the SOC 2 / HIPAA / ISO automation layer at scale. Vanta is `$1B+` ARR. The AI-specific extension is open — none of the incumbents has yet built the AI-vendor-compliance-as-a-service layer that Wedge 1 targets, though they all could.
- **Snorkel AI, Scale AI, Cohere, Anthropic, OpenAI** (enterprise AI vendors with F100 customer bases). Each has demonstrated that F100 customers will pay for AI products; each has built proprietary procurement-handling capabilities in-house at material cost. The market exists; the question is whether the infrastructure-layer wedges (1 and 3) can scale the pattern beyond the largest players.
- **Onyx, Glean, Hebbia, Harvey** (vertical AI products for F100 functions). The validation that domain-specific products can land at F100 customers in months rather than years. Harvey's growth at law firms is the clearest example; Hebbia's at financial services is the second clearest. Wedge 2's bet is that the pattern replicates across more functions, with appropriate domain depth in each.

## Open questions

- For Wedge 1, the compliance-platform space is crowded with general-purpose vendors. Is the AI-specific differentiation enough to justify a new vendor, or do the existing vendors (Vanta, Drata) just add AI-specific features and capture the segment?
- Wedge 2's vertical-selection problem is similar to other RFS responses: which function, at which industry, with which size of contract value? Trading compliance is one example; the broader question is whether the same wedge shape generalizes across multiple verticals from one company or requires N companies for N verticals.
- Wedge 3's services-heavy P&L is uncomfortable for some venture investors. Is the product evolution path that automates the services over time credible, or is this fundamentally a services business with software wrapping?
- All three wedges depend on the F100 procurement-friendliness trend continuing. If a major incident (an AI vendor with F100 deal causes a major public failure), the procurement velocity could revert to 2022 baselines. What probability should we assign to that?
