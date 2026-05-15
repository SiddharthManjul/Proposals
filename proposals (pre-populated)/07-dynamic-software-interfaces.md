CATEGORY: SIP
TITLE: YC Summer 2026 RFS on Dynamic Software Interfaces: ship the interface compiler before the interface store

ABSTRACT: Most reads of dynamic interfaces imagine a future App Store of user-generated UI variants on top of stable primitives. That future may be real, but it is not the first wedge. The first wedge is the compiler. The thing that takes a user's stated workflow and an existing app's API surface and emits a working interface. Without that compiler, the marketplace has nothing to list. Three wedges that fit, ordered by how directly they sell to a user who can name what they want.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on Dynamic Software Interfaces](https://www.ycombinator.com/rfs), authored by Ankit Gupta.

## Problem

Ankit Gupta's RFS frames the right shift: software has historically been one-size-fits-all because building per-user interfaces was uneconomic. Coding agents change the per-interface cost from `$50K of engineering time` to `$0–5 of model-inference time`. The framing is correct. The implementation question it punts is *who builds the underlying primitives and how do they get composed?*

There are three layers stacked here. The bottom layer is the *data and operations*. The email server, the calendar database, the CRM tables. The middle layer is the *API surface and primitives*. How the data is queried and mutated. The top layer is the *interface*. What the user actually clicks. Today these three layers are bundled by every SaaS company. The bundling is what makes interface customization economically infeasible.

The reframe is that dynamic interfaces require the bottom two layers to be decoupled from the top, which is itself a substantial pre-condition. Most existing SaaS will resist the decoupling because the lock-in lives in the bundle. The startup opportunity is in the new categories where the decoupling is happening anyway and in the tools that perform the decoupling on top of legacy SaaS where the API surface is rich enough to allow it.

## Why now

Three shifts in the last 12 months:

- Frontier coding models reached the point where a working SPA targeted at a specific user workflow can be generated in `30–90 seconds` from a natural-language spec and an OpenAPI schema. The latency of *describe a UI, see a UI* dropped below the threshold where the user stays engaged.
- The MCP standard (Model Context Protocol, published late 2024) and parallel work on agent-friendly API patterns created a uniform substrate for the top-layer-compiler to target. Five years ago, every SaaS API was idiosyncratic. Today, the SaaS APIs that matter are being normalized to a common shape.
- The shift in *who configures the software*. From IT departments to end users using AI tools. Is well underway. By mid-2025, the typical knowledge worker has used at least one chat-to-tool integration. The behavioral readiness for *I tell the computer what UI I want and the computer makes it* is established in a way it wasn't 18 months ago.

## Wedge 1: An interface compiler for existing SaaS APIs

The narrowest, most concrete wedge: take an existing SaaS application with a strong public API (Salesforce, HubSpot, Jira, Linear, GitHub, Notion, Airtable, Zendesk), let the user describe the workflow they actually run and emit a custom interface that targets the SaaS's API surface. The custom interface is a real web app the user opens in their browser. The SaaS underneath is unchanged.

**What it is.** A web product where a user signs in, authenticates their existing SaaS account, describes their workflow in prose and receives a generated interface. The interface is editable. The user can ask for changes in plain language, get them in seconds. The interface is durable. Saved, shareable with their team, version-controlled. Critically, it is not a low-code builder. The user does not edit components by hand.

**Validation looks like:** 5,000 weekly active users within 12 months, average sessions per user `≥ 4/week`, conversion-to-paid `≥ 12%` at `$15–30/month`. The two metrics that matter are *retention past month three* and *the user comes back to modify the interface*. Both prove the workflow customization is real value, not a one-time novelty.

**Why the buyer pays:** the typical Salesforce or Jira user spends 20–60% of their working time inside the tool and most of that time is friction with a UI that wasn't designed for their specific workflow. The compiler turns the friction into a `$20/month` line item. The buyer is the end-user. The procurement is bottom-up, not top-down.

**GTM and revenue:** product-led-growth from inside specific SaaS user communities. Salesforce Trailblazers, Jira power-users, Linear's developer audience. The acquisition channel is workflow-specific content marketing (*"a custom Jira interface for incident commanders"*, *"a custom Salesforce view for renewal AEs"*). Revenue: `$15–30/month` per seat. At 50,000 paid seats, that's `$10–18M` ARR with very strong gross margins because the model-inference cost is amortized across the interface, not per-action.

**What kills it.** The underlying SaaS vendors (Salesforce, Atlassian) shipping native interface-customization features that displace the compiler. Salesforce's "Genie" and Atlassian's "Rovo" both move toward this. The question is execution speed. The defense is being faster, more workflow-specific and (critically) covering multiple SaaS so the user's investment in describing their workflow follows them across vendors.

## Wedge 2: A vertical SaaS shipped with the compiler built in

The compiler-on-existing-SaaS bet (Wedge 1) is a horizontal play with thin defensibility against the underlying vendor. The inversion is a new vertical SaaS. Pick a category where the existing leader is mediocre and the workflow variance across customers is high, where the interface customization is the product, not an add-on.

**What it is.** A vertical SaaS for one operating function (say, RevOps or clinical-trial management or commercial real estate property management) where every customer's instance comes with a workflow-description prompt instead of a configuration menu. The user-facing interface is generated from the prompt against a stable underlying data model. The "configuration" is text. The "training" is reading the prompt.

**Validation looks like:** 30 customers in 18 months, average ACV `$25–75K`, NRR `≥ 130%`. The differentiator metric is *time-to-first-value*. How fast a new customer sees a working interface tailored to their workflow. Target: under 2 hours. Industry baseline for vertical SaaS implementation is 30–90 days.

**Why the buyer pays:** the existing vertical-SaaS market in most categories is dominated by a leader whose product is bloated with features that any given customer doesn't use. The new entrant ships a smaller core that customizes hard for each customer's workflow. The customer pays because the implementation cost (in customer hours, not just dollars) collapses by an order of magnitude.

**GTM and revenue:** vertical-specific sales motion. Trade-press, vertical-conference circuit, partnerships with consulting firms that already do implementations in the chosen vertical. Revenue per customer `$25–75K/year`. At 300 customers, that's `$10–22M` ARR with structural gross margins above 75% because the customization cost is in inference, not professional services.

**What kills it.** Picking the wrong vertical. One where the workflow variance isn't actually that high or where the incumbent has a switching-cost moat (database lock-in, integration depth) that makes leaving them painful regardless of UI quality. The defense is choosing verticals where workflow variance is high *and* the incumbent's data model is poor enough that the switching cost is modest.

## Wedge 3: The agent-and-human shared workspace

Both wedges above assume a human user describes the workflow. The third shape assumes an agent will do most of the workflow execution and the human's role is supervision and exception handling. The interface, in this shape, is not designed for either. It is designed for the interaction *between* the two. A pane the agent writes to, a pane the human reviews and corrects from, a queue of exceptions surfaced for human judgment with the relevant context attached.

**What it is.** A workspace product where every workflow has two views. The agent's view (machine-readable, action-oriented, structured) and the human's view (legible, exception-focused, attention-economized). Customers describe the workflow once and the system generates both views and the interaction protocol between them. Use cases: customer support escalation, fraud-investigation review, content moderation, sales-call qualification follow-up, etc.

**Validation looks like:** ten paying customers within 18 months, with measurable *agent-resolves-without-escalation* rates and *human-time-per-exception* metrics. Target: agents close 70% of items without human intervention. Humans average under 90 seconds per exception. Below those numbers the workflow doesn't pay back.

**Why the buyer pays:** operations leaders are trying to figure out how to make agentic systems actually work in production. Today the typical pattern is *agent does the work, human reviews everything*, which is no labor savings. A workspace where exception-handling is the human's whole job, structured to make exception-handling fast, is what makes the agent-augmented operating model pay back.

**GTM and revenue:** sold to VPs of Operations and VPs of Customer Experience at mid-market companies. The salesperson is a former ops leader. Revenue per customer `$60–200K/year`. At 100 customers, that's `$10–20M` ARR.

**What kills it.** Existing workflow tools (Slack, Linear, ServiceNow, Zendesk) shipping native agent-workspace features. The defense is being substantially better at the *protocol* between agent and human (the data structures, the context-passing, the exception taxonomy), because that protocol is what makes the workspace actually work and it is the kind of thing the incumbents will copy poorly.

## What's already been tried

- **Retool, Internal, Appsmith** (low-code internal-tools builders). Built the *user-builds-UI-from-components* layer. Retool is profitable and large. The limit of the model is that it still requires the user to understand component composition, which is most of why low-code stalls at the IT-department layer rather than reaching end users. The compiler approach removes that constraint.
- **Bolt, Lovable, v0, GitHub Spark** (AI app generators). Generate full-stack web apps from prose. The current shape is too coarse. They generate apps, not workflow-shaped interfaces and the apps don't persist a relationship to an underlying SaaS API. Adjacent to Wedge 1 but solving a different problem.
- **Glide, Softr, Make/Zapier** (data-app builders on top of existing systems). Closer to Wedge 1's shape. The limit is the workflow-description step still requires the user to know what they want at a level of detail most users don't possess. The compiler bet is that frontier models are now good enough to bridge that detail gap.

## Open questions

- Wedge 1's strongest moat is *the data we accumulate about workflows-people-actually-want*. Is that defensible against an entrant who has the same model access but no prior dataset? My read is *yes for 18–24 months*, but the workflow data ages fast as the underlying SaaS APIs change. The moat is dynamic, not static.
- For Wedge 2, the bet on which vertical determines everything. The wrong vertical (one where the workflow variance is low) makes the customization story redundant. The right vertical (high variance, weak incumbent) is rare. The discipline is doing the vertical-selection work seriously, not following the founder's gut.
- Is there a fourth wedge. *the agent who builds the interface on demand, with no persistent product surface at all*. That is the eventual destination of this category and if so, do the persistent-product wedges (1, 2, 3) just turn into the chassis the agent runs against? That seems likely to me, but the timing is uncertain. Five years? Ten?
- The user-research question that nobody has answered cleanly: do users actually want to design their own interfaces or do they want the system to design it for them based on observed behavior? The two product motions diverge sharply.
