CATEGORY: SIP
TITLE: YC Summer 2026 RFS — Industrial Capabilities in Space: pick the first step that has a paying NASA customer

ABSTRACT: Most reads of space industrialization frame it as a 30-year arc to lunar mining and orbital manufacturing. The arc may be real but it is not investable on a venture timeline. The investable wedges are the narrow first steps where NASA's Artemis program, commercial lunar payload services, or specific commercial customers already have appropriated budget. The discipline is picking the first industrial capability that has a paying customer in 2027, not the spectacular capability that has one in 2040. Three shapes that fit.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on Industrial Capabilities in Space](https://www.ycombinator.com/rfs), authored by Adi Oltean.

## Problem

Adi Oltean's RFS frames the long-arc vision: extract silicon, aluminum, iron, titanium from lunar and asteroid sources; manufacture structures and components in space; build the industrial substrate that makes the rest of space economy possible. The vision is internally coherent and probably correct on a multi-decade timeframe.

The framing skips the venture-timeline problem. A pure-play lunar mining company today has no revenue path inside 10 years. The customer who eventually pays for refined lunar regolith — a future generation of orbital construction projects, propellant depots, large-scale lunar habitats — does not yet exist. The TAM is genuinely zero today, projected as substantial later. That's the wrong shape for raising venture capital, even patient venture capital.

The reframe is that the industrialization of space is a sequence of narrow customer-funded steps, each of which justifies its own economics and earns the right to the next. The Apollo program didn't justify Saturn V by inventing a moon economy; it justified it by Cold War strategic logic, and the industrial spinoffs followed. In the 2026 version, the strategic logic is supplanted by the *commercial precursor* logic: NASA, Space Force, and a handful of commercial actors will pay real money for narrow capabilities today, and the path to lunar mining runs through those capabilities, not directly.

## Why now

Three shifts in the last 12 months:

- The Commercial Lunar Payload Services (CLPS) program has demonstrated regular cadence — Intuitive Machines, Firefly Aerospace, Astrobotic — landing payloads on the lunar surface every 6–12 months by 2025–2026. The transportation primitive that makes any lunar surface activity possible is now an off-the-shelf service at `$1.2–2M/kg` of delivered payload, dropping fast.
- NASA's Lunar Surface Innovation Initiative (LSII) and the analogous ESA programs published explicit RFPs for *in-situ resource utilization (ISRU) demonstrations* in 2024 with `$50–200M` award ceilings and 2026–2028 delivery windows. The first payable customer for ISRU technology is named and budgeted.
- Starship's first full-orbital test in 2024 and the rapid iteration toward operational service compress the marginal launch cost for large-mass payloads to LEO and TLI (trans-lunar injection) by another factor of 5–10 over Falcon Heavy. The mass budget for an industrial-demo payload is no longer the binding constraint; the demo can carry the equipment it actually needs.

## Wedge 1: A lunar ISRU oxygen-production demonstrator

NASA's near-term ISRU priority is *lunar oxygen production* — extracting oxygen from lunar regolith via electrolytic or thermochemical processes — because oxygen is the propellant component that dominates the mass budget for any sustained lunar architecture. The first company that demonstrates oxygen production on the lunar surface at meaningful rate is the company NASA contracts to scale it.

**What it is.** A small (`200–500 kg`) ISRU payload designed for delivery via CLPS, demonstrating oxygen extraction from lunar regolith at a rate of `1–10 kg/day` for a mission duration of `≥ 14 days` (one lunar daylight period). The technology choice is the engineering question — molten regolith electrolysis (FFC Cambridge variant), carbothermal reduction with hydrogen, or vacuum pyrolysis — and the right answer depends on regolith handling, power budget, and demonstration-vs-production trade-offs.

**Validation looks like:** one CLPS-delivered demonstrator on the lunar surface within 36 months, producing measurable oxygen at the spec rate, with downstream contract from NASA for a follow-on production-scale unit. The customer milestone is *the contract for the second unit*, not the first; the first is the proof point.

**Why the buyer pays:** NASA's appropriated ISRU budget is real and growing — `$200M+/year` by FY2027 per the published agency plans. The customer is direct: NASA's ESDMD organization, with Space Force as a secondary buyer for cislunar logistics. Beyond NASA, the commercial customers (Lockheed for lunar lander propellant top-up, Astrobotic for sustained surface operations) are circling but not yet contracting.

**GTM and revenue:** highly relationship-driven sales to NASA program offices, with a small team of former NASA engineers and senior commercial-space veterans as the primary interface. Revenue is primarily through cost-plus and milestone contracts — `$30–80M` for the first demonstrator, scaling to `$200M+` for follow-on production units. At three contracts in five years, revenue is `$300M+` cumulative with cash-flow profile typical of cost-plus government contracting.

**What kills it.** Two failure modes. First, the technical demonstration fails on the lunar surface, and the company loses credibility with the only customer that matters. The defense is extensive Earth-side test campaigns before launch, with simulated regolith and vacuum/temperature chambers replicating lunar conditions. Second, NASA's appropriations get cut by an administration change, the program slows, and the timeline stretches past venture-viable. Hedging this requires not being purely a NASA-only customer; international space agency (ESA, JAXA, ISRO) and emerging commercial-space customers should be in the pipeline.

## Wedge 2: In-space manufacturing of components that benefit from microgravity

Most space manufacturing pitches focus on *making things in space that we use on Earth* (fiber optics, pharmaceuticals, special alloys). The economics rarely work because Earth-side competitors are too cheap. The cleaner shape inverts the trade: manufacture things in space that we use *in space*, where the alternative is shipping from Earth at `$2,000–5,000/kg`.

**What it is.** An in-orbit manufacturing platform — initially small (`100–300 kg` payload class), mounted on a hosted satellite bus or as an ISS-attached experiment — producing satellite components (mirror substrates, optical baffles, deployable structures, antenna feeds) using microgravity-compatible processes (3D printing in vacuum, optical-grade glass forming, large-aperture mirror casting). Customers are satellite manufacturers whose components would benefit from microgravity production and who are willing to pay the premium for in-space delivery.

**Validation looks like:** one orbital demonstrator within 30 months, producing components to spec for at least one customer satellite. Three signed customer contracts within 42 months. The metric is *delivered components to spec*, not just *components produced* — quality is the variable that determines whether customers come back.

**Why the buyer pays:** a large-aperture space telescope mirror produced on Earth has to be designed to survive launch loads, which constrains its size and adds mass. A mirror produced in space — never subjected to launch loads — can be larger and lighter. The customer is paying for the *constraints removed*, which compound to mission performance.

**GTM and revenue:** sold to satellite primes and large mission operators (Lockheed, Northrop, government remote-sensing programs). Revenue per component contract `$2–20M`. The business shape is more like specialty manufacturing than software services — low order volume, high contract value, long sales cycles. At ten active contracts averaging `$8M`, revenue is `$80M/year` with strong gross margins on the components produced because the inputs (Earth-sourced raw materials, low-mass relative to value) are inexpensive.

**What kills it.** The pipeline of customers willing to design missions around in-space-manufactured components is small. The current commercial buyers are conservative; the government buyers are slow. The defense is starting with the components where the in-space production advantage is most dramatic (very large optics, very thin deployable structures) and pre-selling Phase A studies with major primes before committing to production capability.

## Wedge 3: Robotic surface operations and regolith handling as a service

The third shape isn't about producing anything specific; it's about being the company that operates on the lunar (or asteroid) surface — moving regolith, excavating, transporting payloads between landers, surveying terrain, conducting maintenance — for whoever has a payload there. The bet is that lunar surface activity will diversify rapidly (NASA missions, commercial landers, eventually orbital propellant infrastructure) and each of those actors needs surface operations they don't want to build in-house.

**What it is.** A robotics company building a small fleet of teleoperated and semi-autonomous lunar surface rovers (`200–600 kg` class), delivered to the lunar surface via CLPS, operated from Earth, contracted out for specific tasks: regolith excavation for ISRU customers, payload transport between landing sites, in-situ instrument deployment for science missions, terrain survey for site selection. Revenue model is fee-for-service per operation, not vehicle sales.

**Validation looks like:** one rover delivered to the lunar surface within 36 months, executing two customer tasks (one NASA, one commercial), with follow-on contracts secured for the next mission. The metric is *paid customer tasks completed*, which proves the service-business shape works.

**Why the buyer pays:** the lunar lander companies (Intuitive Machines, Firefly, Astrobotic) and the surface-payload operators (ISRU companies including Wedge 1's shape, science-instrument operators, future commercial habitats) all face the same problem: their core competency is their primary mission, not surface logistics. Hiring surface logistics out the same way Earth-side companies hire trucking is the rational shape.

**GTM and revenue:** relationship sales to surface-mission operators, anchored on a small number of multi-year master service agreements with major customers. Revenue per task `$5–30M`. At ten tasks per year by year five, revenue is `$50–200M/year` with high gross margins because the vehicle has long operational life and the marginal cost per task is operational, not capital.

**What kills it.** Each lunar surface mission today is bespoke and the customers expect bespoke service. Getting to a *standardized service* model requires both customer education and a reliable enough vehicle that customers trust standardization. The defense is starting with the bespoke contracts (effectively a robotics-services consultancy on the lunar surface) and earning the right to standardize over time.

## What's already been tried

- **Planetary Resources, Deep Space Industries.** Both took the *asteroid mining* shape at venture scale in the 2010s; both shut down or pivoted. The lesson reads as *don't pick the most ambitious version of the thesis first*. The proximate cause was capital running out before the customer existed; the deeper cause was the customer not existing at all.
- **Made In Space (acquired by Redwire), Varda Space Industries.** Built the in-orbit manufacturing thesis at smaller scope. Made In Space focused on ISS-hosted manufacturing of fiber optics; the unit economics did not close. Varda pivoted toward pharmaceutical production in microgravity with reentry capsules — different shape, different customer, currently raising follow-on funding. Both demonstrate that *manufacturing in space* requires picking the specific customer carefully.
- **Honeybee Robotics (acquired by Blue Origin).** Built lunar and Mars-surface robotic capabilities under NASA contracts for decades. The business is real and durable, but it operates on cost-plus contracting and has not scaled to a venture-style outcome. Wedge 3 is the venture-style version of Honeybee's business; the question is whether the commercial customer base diversifies enough to support a different P&L shape.

## Open questions

- For all three wedges, the time-to-revenue is 24–36 months minimum and the time-to-meaningful-revenue is 4–6 years. Is this consistent with YC's program structure, or does the timing argue for a different funding shape (DARPA / NASA SBIR Phase II + private VC blend)?
- Wedge 1's technology selection (which oxygen-extraction process) is the highest-leverage decision and the one with the least public consensus. NASA's RFPs have been technology-agnostic; multiple processes are being funded in parallel. Is there a way to demonstrate value before committing to one process, or is the choice unavoidable early?
- For Wedge 2, *which component* is the right first product. Optical mirrors are the most-discussed example but the lead time on a customer mission is 5+ years. Are there shorter-cycle components (cube-sat structures, specific antenna feeds, ISS-attached experimental hardware) where revenue can start earlier?
- The dependency on NASA appropriations is structural across all three wedges. Is there a non-NASA customer base substantial enough to hedge — commercial satellite primes, foreign space agencies, Space Force lunar logistics — or does the entire category depend on the U.S. civil space budget?
