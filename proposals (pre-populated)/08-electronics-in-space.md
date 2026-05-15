CATEGORY: SIP
TITLE: YC Summer 2026 RFS on Electronics in Space: build compute that fits the orbital constraint set, not Earth's

ABSTRACT: Most reads of compute-in-space borrow from Earth datacenter thinking. Racks of GPUs, conventional cooling, abundant power. Orbital constraints invert almost every assumption: power is hard, cooling is harder, mass is paid for in dollars-per-gram and radiation makes commercial silicon fail unpredictably. The shape of the wedge is purpose-built compute primitives for orbital constraints, not orbital deployments of Earth-designed parts. Three wedges that fit, ordered by how soon the customer needs the part.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on Electronics in Space](https://www.ycombinator.com/rfs), authored by Philip Johnston.

## Problem

Philip Johnston's RFS frames the central fact: reusable rockets dropped the cost of putting mass into orbit by `~10x` between 2018 and 2025and the next decade will see another `2–5x` reduction as Starship goes fully operational. The compute capacity that fits in a given budget at the new launch cost is no longer marginal. It is meaningful, possibly comparable to mid-size terrestrial datacenters by 2030.

The framing skips the harder constraint: the part has to actually work in orbit. Commercial inference silicon (NVIDIA H100, AMD MI300, the consumer-grade chips used in current cubesats) was designed for Earth. Specifically: stable temperature with active cooling, ground-level cosmic-ray flux, atmospheric pressure for convective heat transfer, abundant clean power and replaceability when parts fail. Every one of those assumptions breaks in orbit. The H100 in a satellite is a 700W heat source with no convective cooling, exposed to 100x the cosmic-ray flux of sea level, dependent on a power budget tighter than its design point and unreplaceable for its operational lifetime.

The reframe is that orbital compute is not *Earth compute in space*. It is a different design point that happens to do similar work. The companies that win are the ones that build for the orbital design point from the silicon up, not the ones that adapt terrestrial parts.

## Why now

Three shifts in the last 12 months:

- SpaceX's Starlink V3 satellites have onboard compute meaningfully beyond what previous LEO satellites carried and SpaceX is operating its own private launch capacity at the volume where orbital compute deployment is a self-customer rather than a third-party-customer question. The first credible buyer-of-orbital-compute that isn't a government contractor now exists at scale.
- The radiation-hardened-by-design (RHBD) tooling for CMOS at 7nm and below matured in 2024. Microchip's SAMRH series, Ramon.Space's RC64and the academic work at Stanford and TU Delft show that radiation tolerance no longer requires legacy node processes. Modern-node performance is now compatible with space-grade reliability.
- The U.S. Space Force's Hybrid Space Architecture and analogous European Space Agency programs explicitly committed budget to *commercial inference in orbit* as a procurement category, with `$200M–500M/year` initial appropriations and 5-year ramps. The buyer is publicly funded and the procurement vehicle is named.

## Wedge 1: A space-design-point inference accelerator ASIC

The narrowest wedge: build a purpose-designed AI inference chip for orbital constraints. Target performance: `100–300 TOPS` at `30–80 W` power draw, single-event-upset rate below `1 fault per 1000 hours` at typical LEO orbit, mass under `150 grams` including package and thermal interface. Generic enough to run modern transformer inference, narrow enough to make the constraints math work.

**What it is.** An ASIC company. Co-located silicon and packaging design, fabless model, first parts produced on a Tier-1 foundry's space-qualified process node (Samsung's RHBD program or GlobalFoundries' AeroFlex, depending on availability). Software: an open-weight model runtime targeting the chip, compatible with PyTorch's export pipeline so customer models are portable.

**Validation looks like:** first silicon at 24 months, first orbital test mission at 36 months, three pre-orders for production parts at 48 months. The metric the customer actually cares about is `$/TOPS-hour` delivered in orbit. Target: `30–60%` of the cost of using a terrestrial-grade part in orbit, after accounting for failure rates and replacement cost.

**Why the buyer pays:** the buyer is a satellite operator with a need for onboard inference. Earth-observation companies (Planet, Maxar, Capella), comsat operators with content-delivery use cases (Starlink, Project Kuiper)and government remote-sensing customers (NRO, NASA's commercial-satellite contracts). Their current alternatives are *carry a commercial GPU and accept poor reliability* or *carry a legacy radiation-hardened CPU and accept poor performance*. The new option fits between them.

**GTM and revenue:** highly relationship-driven sales to a small set of satellite primes (Lockheed, Northrop, RTX, Airbus DS, plus the newer SpaceX/Planet/Capella cohort). Initial deals are co-development contracts with `$5–15M` NRE plus per-unit pricing. At 5,000 parts/year by year five, revenue is `$50–150M` with high gross margins because the parts are sold at fab cost plus space-premium.

**What kills it.** Capital intensity. ASIC development with space qualification costs `$80–200M` to first silicon, which is a lot relative to most startup rounds. The defense is staging. The chip targets a customer with a publicly committed program (Space Force HSA, ESA's CIMR) that can fund the NRE through development. Without an anchor customer the timeline gets fragile.

## Wedge 2: A compute-bus satellite platform built around high-density inference

The second wedge inverts the first: instead of selling chips to satellite primes, build the satellite. Specifically, a small-to-medium satellite bus (`50–250 kg` class) whose entire design is optimized for carrying high-density compute. Cooling, power, thermal mass and radiator surface area are sized for compute payload, not for sensors. The satellite is a compute appliance in orbit. Customers rent inference time on it.

**What it is.** A vertically integrated company that designs, manufactures, launches and operates compute-optimized satellites. The bus carries modular compute payloads. Current generation commercial silicon for short-mission-life applications, rad-hardened parts for long-mission applications, custom payloads for specific customers. Revenue is *inference time as a service*, priced per TOPS-hour or per inference request.

**Validation looks like:** one satellite in orbit within 30 months, demonstrating production-rate inference on representative workloads. Five paying customers within 42 months at average ACVs `$500K–3M`. The metric is *cost per inference delivered* and *latency to ground for the inference output*. Both have to clear customer-specific thresholds.

**Why the buyer pays:** the customer's alternative is downlinking raw sensor data to terrestrial datacenters and inferring there. That alternative is bandwidth-bound: a high-resolution Earth-observation satellite generates `~1 TB/day` of raw imagery and downlinking it costs `$0.50–5 per GB` depending on station availability. Processing in orbit, downlinking only the structured output, is faster and cheaper for any customer whose output is much smaller than their input.

**GTM and revenue:** sold to satellite-data customers (intelligence agencies, commercial Earth-observation buyers, large agribusiness, insurance companies running parametric coverage). Direct sales motion. Revenue per satellite `$3–8M/year` once at full utilization. At 20 satellites in operation, that's `$60–160M` ARR.

**What kills it.** The capital-intensity problem here is dramatic. Each satellite costs `$15–40M` all-in plus launch. Without recurring revenue from a meaningful base of customers, the cash burn is unsustainable. The defense is staging: first satellite covers one anchor customer that pre-pays the bus, subsequent satellites scale only as the customer pipeline can pre-fund them.

## Wedge 3: Distributed-inference orchestration across satellite constellations

The third shape is software-first and capital-light. Satellite constellations are already in orbit (Starlink has 6,000+, Planet has 200+, OneWeb 600+, Iridium and others). Many of them have idle compute and idle bandwidth between operational duty cycles. The orchestration wedge is software that pools that capacity across constellations and operators, sells aggregated inference services to ground customers and routes the workload across whatever orbital compute is currently available.

**What it is.** A software company that builds the orchestration layer: APIs that customers call, scheduler that decides which satellite in which constellation handles the request, settlement layer that pays the constellation operator for compute and downlink. The startup owns no satellites. It is an aggregator of capacity, the way Cloudflare is an aggregator of edge compute.

**Validation looks like:** integration with three constellation operators within 18 months and first ten customers using the aggregated service. The proof is *requests served from multiple constellations*, demonstrating the aggregation actually works rather than being a single-operator wrapper.

**Why the buyer pays:** the customer doesn't want to think about which satellite serves their request. They want an API endpoint that runs inference *in orbit* without choosing operators. The orchestration layer provides exactly that abstraction. Customers in regulated industries also benefit from multi-operator redundancy.

**GTM and revenue:** developer-focused. Clear documentation, fast onboarding, transparent per-request pricing. Distribution through existing satellite-data partner ecosystems (UP42, Skywatch, Sentinel Hub) plus direct enterprise sales to the largest data buyers. Revenue is a margin on top of the underlying compute and bandwidth. At scale, this looks like a typical infrastructure-aggregator P&L with 20–40% gross margins.

**What kills it.** Constellation operators wanting to capture the value themselves rather than sell capacity wholesale. The defense is the multi-operator argument. No single operator can serve all customer geographies, all latency requirements, all redundancy constraints. The aggregator's value is durable as long as no operator becomes dominant. (SpaceX's Starlink scale is the genuine risk here.)

## What's already been tried

- **Ramon.Space, Mercury Systems, BAE Systems space-electronics division.** Built the rad-hardened-by-design generation of space-grade processors. Mostly legacy nodes, oriented toward government customers and high-reliability long-mission applications. The commercial-grade modern-node design point is the gap Wedge 1 targets. The established players have organizational reasons (cost structure, customer mix) for not entering it.
- **Loft Orbital, Spire, Capella Space.** Built the *satellite-as-a-service* business model in different segments. Loft for general hosted payloads, Spire for weather and tracking, Capella for synthetic aperture radar imagery. Each demonstrates that customers will buy outcomes from orbit rather than building their own satellites. None is specifically a compute-bus company. Wedge 2 is the compute-specific version of that pattern.
- **Lonestar Data Holdings, Axiom Space's compute-in-space initiatives.** Cislunar data centers and ISS-attached compute. Both are demonstrating customer demand at the high end. The economics at LEO-deployed compute (where Wedge 2 sits) are very different from cislunar. LEO arrives first.

## Open questions

- The bet on which orbit determines everything. LEO has the lowest launch cost and shortest latency to ground, but the highest debris risk and atmospheric drag. GEO has longer mission lives but the radiation environment is worse. MEO is the under-utilized middle. For inference specifically, LEO seems right. For long-mission archival or training, GEO or MEO might.
- Wedge 1's first-silicon timeline (24+ months) and capital intensity (`$80M+`) is harder than typical YC scope. Is there a non-ASIC first product (say, an FPGA-based reference design with a software stack) that proves customer demand before committing to fab? The risk is that FPGA performance won't hit the TOPS/W targets and the proof point doesn't transfer.
- For Wedge 2, the bandwidth-cost-to-ground question is the actual sensitivity variable. If laser-link constellations (Starlink V3+ optical links, Project Kuiper's laser plans) make terrestrial downlink so cheap that *inferring on the ground* stops being expensive, the orbital-compute thesis weakens significantly. What's the cost trajectory of `$/Gbps-hour` to ground in 2028?
- For all three wedges, the customer base is structurally small (3–10 satellite primes, 10–30 satellite operators, plus government). Does the small customer base support a venture-scale outcome or does this collapse to a profitable-but-modest specialist company?
