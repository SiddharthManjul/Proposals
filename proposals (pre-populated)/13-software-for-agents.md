CATEGORY: SIP
TITLE: YC Summer 2026 RFS on Software for Agents: build the agent-side of the infrastructure the human-side already has

ABSTRACT: Most reads of "software for agents" jump to *MCP everything* and stop there. The MCP protocol is the kernel, not the platform. Around it is a stack the human-internet built over twenty years: directories, authentication, payments, observability, abuse handling, trust signals. Agents need every layer of it, restructured for non-human callers. The wedges that win are the ones that recreate a specific human-internet primitive at the agent layer first. Three primitives whose absence is most painful today.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on Software for Agents](https://www.ycombinator.com/rfs), authored by Aaron Epstein.

## Problem

Aaron Epstein's RFS frames the right shift: agents will outnumber humans on the internet within a decade and the software substrate built for humans (visual interfaces, anti-bot defenses, manual signup flows, credit-card-based payments) is hostile to agents by construction. The framing skips which parts of the substrate get rebuilt first.

The naive answer is *MCP for everything*. Every tool exposes an MCP endpoint, agents call it, problem solved. The MCP standard is real and helpful, but it solves the *protocol* problem, not the *coordination* problems around the protocol. How does an agent discover that a tool exists? How does it sign up without human intervention? How does it pay? How does the provider know the agent is who it says it is? How does abuse get handled when the abuser is itself software? Each of those questions is its own infrastructure layer.

The reframe is that *software for agents* is not one product. It is the agent-layer rebuild of a multi-layer infrastructure stack (DNS, directories, OAuth, Stripe, Cloudflare, App Store review) that took the human-internet 25 years to construct. The startup opportunities are at specific layers, not at the meta-platform. The strongest wedges are the layers where the current absence creates the most acute pain for the agent-builder customer.

## Why now

Three shifts in the last 12 months:

- The MCP protocol crossed the threshold of *real adoption*. Anthropic, OpenAI's Operator, Cursor, Cline and a growing share of the agent-framework ecosystem support it natively. The number of public MCP servers grew from `~50` in early 2024 to over `2,000` by late 2025. There is now a fragmented agent-tool ecosystem that needs coordination, where 18 months ago there was nothing to coordinate.
- The first agent companies hit scale-of-use that exposes the coordination gaps. Cursor's MCP usage statistics, Devin's tool-call volume, the various Operator-class consumer agents. Each generates `millions of agent-initiated API calls per week` against third-party tools and the lack of structured discovery, authentication and payment infrastructure is now a tangible operational cost.
- The browser-companies (Anthropic Browser, OpenAI's Atlas, Perplexity's Comet, Google's Project Mariner) all entered the consumer-agent space in 2025 with explicit roadmaps for agent commerce. The end-state where agents transact at scale is no longer speculative. It is being built by the largest companies in the space, which creates near-term demand for the supporting infrastructure.

## Wedge 1: An agent-discoverable tool directory with semantic search

The narrowest, most concrete wedge: the agent equivalent of an App Store, but designed for runtime discovery rather than user browsing. Every MCP server, every agent-friendly API, every CLI tool gets registered with structured metadata about what it does, what inputs it accepts, what it costs, what authentication it requires and what trust signals it carries. Agents query the directory at runtime (asking, for example, *find me a tool that converts USD to EUR with current rates*) and get back a ranked list with all the information needed to actually use the tool.

**What it is.** A registry product. Free public tier with self-service registration for tool providers. Paid tier for tool providers who want enhanced placement, analytics on agent usage and the ability to set programmatic terms (per-call pricing, agent-specific rate limits, abuse thresholds). Free for agents to query. Revenue comes from tool providers. The directory operator runs trust-and-safety, semantic-search infrastructure and the API surface.

**Validation looks like:** `10,000+` registered tools within 18 months, `500,000+` agent queries per day by month 24and meaningful revenue (`$100K+ MRR`) from tool providers paying for enhanced services. The two leading indicators are *tools registered per week* (provider-side adoption) and *queries per registered tool* (agent-side use).

**Why the buyer pays:** the tool provider's alternative is being undiscoverable to agents. Buried in a sea of MCP servers with no way for an agent to find theirs. Paying for placement is similar to paying for SEO or App Store ASO. It is the cost of being findable. The willingness to pay is real for tool providers whose business depends on agent traffic.

**GTM and revenue:** developer-first distribution through agent-framework integrations (LangChain, LlamaIndex, Cursor, Cline, Anthropic's own Claude integrations) and explicit partnerships with the major agent platforms to make the registry the default discovery layer. Revenue: `$50–500/month` per tool provider on the paid tier, plus enterprise contracts with the largest providers (`$10–100K/year`). At 2,000 paid tools averaging `$200/month`, that's `$5M ARR`. The number scales with the agent ecosystem.

**What kills it.** Anthropic, OpenAI or Google building their own native directory and making it the default in their agent platforms. All three are likely to attempt this. The discovery layer is too strategic to leave to a neutral third party. The defense is being the *neutral cross-platform directory*. A tool registered in one place is discoverable by every agent regardless of platform, which is structurally what no single platform can offer.

## Wedge 2: Programmatic agent identity and authentication

Today's agent landscape has a fundamental authentication problem. An agent acting on behalf of a user authenticates by either *holding the user's credentials* (insecure, audit-unfriendly, bad blast radius if compromised) or *being granted broad OAuth scopes* (over-permissioned, hard to revoke, no granular accountability for what the agent did). The human-internet's authentication infrastructure (OAuth 2.0, OIDC, SAML) doesn't model the agent-as-actor case. The second wedge fills that gap.

**What it is.** An identity-and-access platform for agents. Each agent gets a verifiable identity backed by a cryptographic credential. Each authorization the agent receives is scoped, time-limited and signed against the user's intent. Every action the agent takes is auditable back to a specific authorization. Third-party services integrate with the platform via OIDC-compatible flows (familiar to developers) but with agent-specific extensions (machine-readable consent records, attestation of agent behavior, structured revocation).

**Validation looks like:** integration with `50+` agent platforms and `200+` service providers within 18 months. Real volume of `10M+` agent-mediated authentications per week by month 24. Enterprise customers (financial services, healthcare) on signed contracts for `$100K–500K/year` for high-assurance variants.

**Why the buyer pays:** the service provider is the buyer for the enterprise contracts. A bank that wants to allow agent-driven account access today either says *no* or accepts unacceptable security posture. The platform's promise is *yes, with cryptographically auditable controls*. The agent platforms (Anthropic, OpenAI, the agent-framework vendors) are the buyer for the integration partnerships, paying a per-authentication fee that's small individually but meaningful at scale.

**GTM and revenue:** dual motion. Developer-led distribution to agent platforms (free integration), enterprise sales motion to service providers (`$50K–500K/year` per service-provider contract). Revenue blend: enterprise contracts (`60%` of revenue) plus usage-based fees on agent platforms (`40%`). At 100 enterprise customers averaging `$200K` plus `$1M ARR` from usage, that's `$21M ARR`.

**What kills it.** Auth0/Okta, Microsoft, Google or Anthropic shipping native agent-identity features inside their existing identity products. All have the engineering capability. The question is execution speed. The defense is being the *neutral cross-platform identity layer*. An agent identity works across all platforms, all service providers, with consistent semantics, which no single incumbent has an incentive to build.

## Wedge 3: Per-call agent commerce with machine-resolvable pricing and payment

Today's agent-to-service commerce is bolted on top of human payment infrastructure. An agent that needs to pay for an API call either uses a developer's credit card (no per-call accountability, large blast radius) or relies on the service to offer a "free tier" that's typically rate-limited to the point of uselessness for production agent workloads. There is no native per-call pricing-and-payment mechanism that matches the granularity at which agents actually consume services.

**What it is.** A payments platform built for the agent-to-service commerce shape. Agents hold balances (denominated in dollars, with optional crypto rails for international payments). Services publish machine-readable pricing. *this endpoint costs $0.003 per call, billed in $0.50 increments*. And the platform handles settlement. The platform handles fraud, dispute resolution and per-agent spending limits. Settlement to service providers is daily or weekly, similar to current payment infrastructure cadence.

**Validation looks like:** `1,000+` service providers integrated within 18 months, `$5M+` of monthly settlement volume by month 24. The leading indicator is *agents that hold balances and make repeated small purchases*, because that pattern of usage is what proves the per-call commerce model works at scale.

**Why the buyer pays:** the service provider's alternative is offering a *free tier with rate limits* or *enterprise contracts with custom pricing*, neither of which serves the long tail of one-off agent usage. The platform unlocks a new revenue category (small, predictable, per-call payments from agents) that the existing payment infrastructure doesn't support. The willingness to pay is real because the alternative is leaving money on the table.

**GTM and revenue:** dual motion. Agents register and load balances (free, similar to Stripe's developer onboarding), services integrate to accept payment (free integration, take-rate on transactions). Revenue: standard payments take-rate (`2.5–3.5%` on transactions) plus optional value-added services (fraud monitoring, multi-currency, treasury management for agent balances). At `$500M/year` settlement volume, that's `$12–17M` of net revenue with payments-business margins.

**What kills it.** Stripe extending into the agent-commerce shape (they have the technology, the relationships and the regulatory licensing already). The defense is being purpose-built for the agent shape rather than retrofitted. Agent-specific pricing models, per-agent risk scoring, structured machine-readable invoices. Features that Stripe will build but on a slower timeline. The startup also has the option of being acquired by Stripe at year 3–5. Not a bad outcome.

## What's already been tried

- **Smithery, mcp.run, glama, OpenAI's Operator integrations.** All build pieces of Wedge 1's discovery directory at smaller scale or with narrower scope. Smithery is the most mature of the cohort. Its position is good but the broader category is open. The neutral-cross-platform play remains contestable.
- **Auth0, Okta, ClerkAI.** Built the human-identity layer at various scales. Auth0 sold to Okta for `$6.5B`. Clerk is the modern AI-native iteration. None has shipped a genuinely agent-native identity model. Their work supports agents as a degraded human case rather than as a first-class actor.
- **Stripe, Adyen, the broader payments ecosystem.** Built the human-and-business payments layer at scale. None has shipped agent-commerce-native features. Stripe's recent moves into "AI commerce" are positioned but not yet productized. The first credible agent-commerce platform that ships could become the durable layer or get acquired by Stripe.

## Open questions

- For Wedge 1, the directory's content quality (no slop, no spam, real tools that work) is the durable defensibility. How does the directory operator scale trust-and-safety as the long tail of registered tools grows by 100x? My read is *aggressive curation, paid quality tiers and reputation systems that compound over time*, but this is operationally hard.
- Wedge 2's authentication model has to interoperate with existing OAuth ecosystems while extending them. Designing the protocol extensions in a way that gets adopted by major services (Google APIs, Microsoft Graph, Salesforce) is partly a technical and partly a political problem. Is there a way to land enough early-adopter services to establish gravitational pull or does the network effect work against the startup?
- For Wedge 3, the regulatory posture (money transmitter licensing, KYC/AML obligations) is non-trivial. The platform either becomes a regulated payments business (long ramp, expensive licensing) or partners with one (faster, less margin), which shape does the founder team gravitate to?
- All three wedges fight large incumbents whose existing products extend into the agent space. The window for an independent startup to establish position is probably 18–36 months before the incumbents close it. What's the right execution velocity to lock in the position before that window closes?
