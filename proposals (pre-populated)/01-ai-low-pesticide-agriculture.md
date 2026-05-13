CATEGORY: SIP
TITLE: YC Summer 2026 RFS — AI for Low-Pesticide Agriculture: replace broadcast spraying with per-plant decisions

ABSTRACT: Most reads of low-pesticide agriculture treat it as a chemistry problem — find better molecules, find natural alternatives. The shape is actually decision-granularity: a row-crop farmer makes one spray choice for 200 acres because the equipment crosses the field once, and the rational answer to "what covers the worst patch" is always "more than the average plant needs." Per-plant decision infrastructure breaks the chemistry problem into a software problem. Three wedges that earn the right to scale, each with a different buyer.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on AI for Low-Pesticide Agriculture](https://www.ycombinator.com/rfs), authored by Garry Tan.

## Problem

Garry Tan's RFS frames pesticide use as a "bad loop": chemical use rises, effectiveness falls, costs grow. The framing skips the mechanical cause. A row-crop farmer in Iowa makes roughly four spray decisions per growing season per field — pre-emergent, post-emergent, fungicide, harvest aid. Each decision applies to 100–400 acres at once because the sprayer crosses the field once. The unit of decision is the field-pass, not the plant.

When the unit of decision is the field, the optimal answer to *what should I apply?* is *whatever covers the worst patch with enough margin to be sure*. That margin is where the over-application lives. By my read of USDA per-acre application data, 60–80% of broadcast herbicide lands within five feet of plants that didn't need it. The chemistry is rational given the decision unit. Change the unit and the arithmetic changes.

The reframe is treating low-pesticide as a decision-granularity problem first, chemistry second. Better molecules help. Better targeting compounds across whatever chemistry the farmer is already using, and it compounds for every farmer at once.

## Why now

Three shifts in the last 12 months:

- John Deere's See & Spray Ultimate now ships factory-installed on new high-end sprayers and claims ~60% herbicide reduction on early adopters. Computer-vision-targeted spraying moved from skunkworks to default option in eighteen months — which means the *buyer* has been educated, but only buyers of `$500K+` machines.
- RNAi pesticides targeting Colorado potato beetle (GreenLight's *Calantha*) cleared EPA registration in late 2024. Species-specific RNA payloads are a regulatory category now, not a research prototype.
- Drone application is legal on commercial corn and soy in 30+ states under simplified Part 137 paperwork. The capital cost of *fly the field* dropped from ~$200K (manned crop duster) to ~$25K (DJI Agras T50). The actuator side of per-plant economics moved by an order of magnitude.

Per-plant vision was already viable on `$500K` machines. Cheap drones plus species-specific payloads make per-plant viable on the long tail of farms that buy used equipment and never see a See & Spray.

## Wedge 1: Retrofit vision kits for used sprayers

The 80% of US row-crop acreage that won't buy a new Deere this decade runs on used equipment, average age 11 years. They will not buy a $430K factory sprayer. They will buy a $30K kit that mounts on the boom of the sprayer they already own, watches the soil through the existing nozzle pattern, and switches individual nozzles on or off in 50-millisecond windows.

**Validation looks like:** twenty paid pilots across two states, one full season, herbicide savings measured against the farmer's own prior-year invoices on the same fields. Not white papers. Per-farm savings of `$15–40/acre` is the threshold where the kit pays back inside a season; below that, the farmer waits.

**Why the buyer pays:** the math is invoice-line legible. A 2,000-acre operation spending `$60/acre` on herbicide ($120K/season) cuts to roughly $50K in season one. The kit costs $30K. Payback inside one harvest, with the kit usable for ten more.

**GTM and revenue:** sold direct through farm-equipment dealers as a retrofit, not online. Farmers buy from people they've known for fifteen years; the moat is the dealer rolodex, not the camera. Revenue is hardware margin (~40% gross) plus a per-acre software seat that runs ~$3/acre/season for nozzle-control logic updates. At 100K acres covered, that's ~$300K of recurring on top of the hardware base.

**What kills it:** Deere or AGCO releasing a `$15K` factory-blessed retrofit through their own dealer network, two seasons after this one ships. The defence is signing exclusive dealer agreements early and making the per-acre software seat the actual product. The hardware is a vehicle for the data subscription.

## Wedge 2: Species-specific RNA payloads delivered as a service

The chemistry-half of the problem is dominated by broad-spectrum molecules — glyphosate, atrazine, dicamba — that kill everything in their class because making one molecule that targets only one species was, until 2023, prohibitively expensive. RNAi changes that. A 21-nucleotide double-stranded RNA sequence designed against a specific pest's essential gene kills that pest and nothing else, at biological doses that decay in the soil within days.

**Validation looks like:** one paid field trial per crop-pest pair, run with a university extension service that has the credibility farmers trust. Three pairs in year one — Colorado potato beetle on potatoes (regulatory path already open), corn rootworm on corn, soybean aphid on soy. Measured outcome: pest population reduction within 5% of the leading conventional, with documented zero impact on non-target species.

**Why the buyer pays:** the regulatory wind is on this side. EU is restricting neonicotinoids; California is restricting chlorpyrifos. Crops grown for export markets need a non-broad-spectrum option, and the spec sheets are starting to require it. The buyer isn't the farmer first — it's the food-brand buyer (PepsiCo's potato chip supply chain, for example) that pays a premium for *grown without neonics*.

**GTM and revenue:** sell through the food-brand contract layer, not the farm. PepsiCo, Driscoll's, McCain — these companies write contracts with grower cooperatives and can mandate inputs. Revenue is `$/acre/season` for the RNA payload plus a `$/lb` premium captured at the food-brand contract. Margins look more like specialty pharma than ag-chem because the molecule is custom and the moat is the regulatory dossier.

**What kills it:** Bayer or Syngenta acquiring a small RNAi shop and using their existing distribution to bury the standalone. Counter-position: don't try to displace conventional ag-chem at the farm; partner with food brands whose supply-chain optics make them want a single-source, single-spec input that the big-three structurally can't offer.

## Wedge 3: Per-field prescription as a managed service

The retrofit kit (Wedge 1) is hardware-first. The RNA payload (Wedge 2) is chemistry-first. The third shape is service-first: a company that operates the scouting, decision-making, and application on behalf of the farmer, charges per acre, and pockets the difference between the farmer's prior input bill and the new one.

This is the AI-native-services bet from a separate RFS, applied to row-crop ag. A team flies a drone weekly, runs the imagery through a model trained on each field's prior years, generates a prescription map, and either dispatches the farmer's own sprayer with the map or sends a contract applicator. The farmer's bill goes from "buy chemicals + run sprayer" to "pay $X/acre/season, my fields get sprayed correctly."

**Validation looks like:** ten farms in one county, one season, contract written as a guaranteed-savings clause — if the farmer's input cost doesn't drop by `≥ 25%`, the service is free that year. The bet is that the model plus per-plant application clears 35–45% reduction; the 25% floor is the price of customer acquisition.

**Why the buyer pays:** farmers under 50 in the next decade increasingly want to operate the farm, not the chemistry. Spray decisions are stressful, time-sensitive, and the wrong call costs $50K. Outsourcing it the way they outsource the combine repair is a shape they understand.

**GTM and revenue:** county-by-county, one customer-success person per ~150 farms. Land-grant university extension partnerships are the credibility unlock. Revenue per farm is roughly `$25–35/acre/season`, with COGS dominated by the contract applicator (variable) and the scouting drone team (fixed per county). Gross margin matures at 35–45% once a county has 75+ farms covered, similar to a route-density logistics business.

**What kills it:** the unit economics never clearing because the per-county fixed cost is too high. The hedge is starting in counties with `≥ 200,000 acres` of row-crop within a 30-mile radius, picking off the densest first. Don't expand until the first county is at full route density.

## What's already been tried

- **Blue River Technology (acquired by Deere in 2017).** Built the See & Spray vision stack; got distribution by selling to the OEM. The wedge worked but only at the new-sprayer price point. Used-equipment retrofit is a different shape they don't pursue.
- **Indigo Ag.** Raised over `$1B` on the microbial-seed-coating thesis; revenue never matched the valuation. The lesson isn't that microbes don't work — it's that selling a yield claim to the farmer is hard without a way to attribute the yield to the input. Microbial wedges that sell to food brands (not farmers) have a cleaner attribution story.
- **GreenLight Biosciences.** Took the RNAi-as-pesticide bet and got EPA registration in 2024, then de-listed and was acquired by Fall Line Capital for under valuation. The science worked; the public-markets shape didn't. Reads as a pricing-power problem (selling to farmers via conventional distribution) rather than a chemistry problem.

## Open questions

- Wedge 1 and Wedge 3 both fight Deere directly. Wedge 2 fights Bayer and Syngenta. Is there a fourth shape that fights no incumbent — a primitive sold to all three retrofit/chemistry/service players? My instinct is no, but I'd like to be wrong.
- Drone-based application at scale runs into FAA airspace constraints once you're flying ten swarms in a county. Does Wedge 3's economics survive a regulatory tightening, or is the whole thing capped at the first 500 counties?
- The 90% pesticide reduction in Tan's framing is set at the 90th percentile of a single field. Cutting *average* use 90% across all of US row-crop is a 25-year project, not a 10-year one. Which version are we underwriting?
- Is the farmer ever the right buyer, or does every shape here resolve into selling to the food brand and the equipment dealer instead?
