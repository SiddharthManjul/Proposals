CATEGORY: SIP
TITLE: YC Summer 2026 RFS on Counter-Swarm Defense: defeat drone swarms at the cost ratio, not the missile ratio

ABSTRACT: Most reads of counter-swarm defense imagine new physics. Directed energy, exotic interceptors. The arithmetic doesn't depend on physics. It depends on the cost ratio between attacker and defender, currently `$500 per drone` versus `$3M per missile`. Any system that defends at parity-or-better cost while killing at the rate drones attack is a viable program. Three shapes that compress the ratio differently: a software command layer that lets cheap effectors fight, an attritable interceptor at scale and an autonomy-stack attack that costs nothing per kill.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on Counter-Swarm Defense](https://www.ycombinator.com/rfs), authored by Tyler Bosmeny.

## Problem

Tyler Bosmeny's RFS frames the right number: `$500` per attacking drone versus `$3M` per Patriot or NASAMS interceptor. A defender losing on cost ratio loses by attrition even when winning every engagement. The U.S. air-defense stockpile depleted by 30% during Ukraine's first eighteen months of war because the math runs against the defender on every shot.

The interesting failure mode is that the cost ratio is treated as a technology problem when it is partly a doctrine problem. The U.S. defense procurement system buys one expensive missile when ten cheap effectors would do better, because the system is structured around `MIL-STD` requirements, `IDIQ` contracts and prime contractors with a financial incentive to sell expensive things. The pull-the-cost-down problem has technical components, but the binding constraint right now is procurement architecture more than physics.

The reframe is that the problem is partly compute-and-software, partly cheap-effector manufacturing and partly *finding the procurement vehicle that doesn't require an existing prime contractor to win*. The OTA (Other Transaction Authority), the SBIR pathways extended in the 2024 NDAA and the DIU's commercial-solutions-opening process collectively let a small company sell directly into combatant commands. That structural opening is roughly two years old at scale and is the actual *why now*.

## Why now

Three shifts in the last 12 months:

- Ukraine has spent two full years operating as a live lab for counter-drone tactics, generating public after-action data that did not exist before. Specific cost-effective kill chains (acoustic-then-radar-then-EW-then-kinetic, in layered defense) are now documented in unclassified literature, not just classified channels.
- The 2024 NDAA explicitly authorized DoD to use OTA contracting for autonomous-weapons procurement at `$100M+` ceilings, bypassing the traditional Major Defense Acquisition Program (MDAP) timeline. Time-from-prototype-to-fielded-system collapsed from typical 7+ years to 18–36 months for systems that fit OTA scope.
- The Iran-Israel exchange in October 2024 and the ongoing Yemen-Red Sea drone campaign created a public-pressure case that the U.S. air-defense posture is structurally underprovisioned for the next decade. Both political parties moved toward funding alternatives to the missile-on-drone trade. The political ceiling on this category just got lifted.

## Wedge 1: A sensor-fusion command layer that turns cheap effectors into a kill chain

The kill chain (detect, track, identify, engage, assess) currently runs on a stack of disconnected systems. A radar feed goes to one screen. An RF detector feed goes to another. The electronic-warfare operator and the kinetic-effector operator coordinate by voice. Every interface is glued together by the unit's S6 shop running Excel macros. The reason a single Patriot defends a square mile is that the kill chain is too slow to use ten cheap effectors against a swarm.

**What it is.** A software platform that ingests sensor feeds from heterogeneous sources (radars, RF detectors, acoustic arrays, IR cameras, electro-optical platforms), fuses them into a single tactical picture, performs threat classification and prioritization and routes engagement orders to whichever effector is best positioned. Critically, it is effector-agnostic: it can dispatch a `$5K` interceptor, a `$50` shotgun round at close range, a `$200K` jammer or a `$1.4M` Stinger. The platform is the substrate. The effector is the consumable.

**Validation looks like:** one OTA contract within 12 months with a combatant command or service-level component (Marine Corps Force Design 2030, Army Air Defense, USAF AOC modernization), `$5–25M` initial scope. The metric that matters is *engagement decision time*, measured against the unit's prior baseline. Target: 80% reduction.

**Why the buyer pays:** the combatant commander whose forward operating base gets hit by Shahed drones every week is the buyer. The political pressure on visible failures has reached the point where the procurement system will fund an alternative if one exists. The contract vehicle (OTA) lets the customer buy without prime-contractor gating.

**GTM and revenue:** direct DoD outbound, anchored on one or two retired flag officers as senior advisors who can navigate the procurement pathway. The DIU and AFWERX vehicles are the initial entry points. Revenue is `$10–50M/year` per major customer at full deployment. At three customers, that's `$50–150M` ARR with very high gross margins because the platform is software and the effectors are the customer's spend.

**What kills it.** Anduril, Palantir (specifically Maven Smart System)and Shield AI are running the same play. The market has multiple sophisticated competitors. The defense is being faster, narrower and more effector-agnostic than they are. The two largest competitors have an interest in tying the command layer to their own effector portfolios. An independent integration layer is differently positioned.

## Wedge 2: An attritable interceptor designed for the counter-drone economic point

Air defense at the `$500-drone` cost point needs an effector that costs `$5–25K`, not `$1.4M`. The Stinger and similar man-portable systems were designed for hypothetical Soviet helicopter threats in the 1970s and re-purposed for drones because they were available, not because the economics worked. An interceptor designed from the ground up for low-cost air defense looks fundamentally different: a `1–3 kg` airframe, commodity propulsion, vision-guided terminal homing, low-end IMU, no exotic seeker.

**What it is.** A purpose-built counter-drone interceptor manufactured at `$5–15K/unit` initial cost (target `$2–4K` at scale). Launched from ground-based pods, ship-mounted launchers or larger air platforms. Vision-guided with an onboard NVIDIA Orin-class compute unit running an open-weight YOLO descendant. Designed for production at `10K+ units/year`, which is the volume that drone swarms imply.

**Validation looks like:** a contract for `1,000+ units` from one DoD customer within 18 months, with live-fire test against representative threats demonstrating `≥ 80%` PK (probability of kill) at design ranges. The unit cost number and the kill rate are the two metrics that determine whether anyone in the Pentagon cares.

**Why the buyer pays:** the same combatant command buying the C2 software (Wedge 1) needs effectors that match the C2 layer's engagement throughput. Currently no U.S. effector exists at the right cost point. Foreign options (Israeli SmartShooter, Polish FlyEye derivatives) exist but procurement of foreign-origin lethal systems is politically constrained. The market is the gap between *we know we need cheap interceptors* and *no domestic option exists*.

**GTM and revenue:** Anduril (Roadrunner-M), Shield AI (V-BAT and successors)and a handful of pre-revenue startups (CHAOS Industries, Allen Control Systems) are circling this. Distribution is DoD direct. Revenue depends on per-unit cost trajectory. At `$8K/unit` average sale and 5,000 units/year delivered, that's `$40M`. At fully-scaled production of 50,000/year, the business is `$200M+` revenue with industrial-product gross margins.

**What kills it.** Manufacturing the interceptor at a cost point that competitors can't beat is the actual hard problem. The defense is locating production where labor and supply chain favor low-cost manufacturing (Mexico, possibly Vietnam for non-ITAR components) and designing for `≥ 90%` commercial-off-the-shelf parts. If the bill of materials is full of custom milling and exotic alloys, the unit-cost target slips and the business doesn't work.

## Wedge 3: Autonomy-stack attacks against the attacker's own decision system

Drones at the cheap end of the spectrum are autonomous: they execute mission profiles on board, sometimes with GPS waypoints, sometimes with vision-based navigation, sometimes with terminal target recognition. Each of those autonomy components has a known attack surface. GPS can be spoofed. Vision navigation can be deceived with adversarial patterns. Datalinks can be hijacked or replayed. The third counter-swarm wedge is to attack the attacker's decision system rather than shoot the drone down.

**What it is.** A software-and-RF-equipment company that produces effectors targeted at drone autonomy stacks. Multi-mode GPS spoofers that drive a drone off-course rather than denying GPS entirely (denial is detectable. Spoofing is not). Acoustic and visual decoys that deceive terminal vision systems. RF protocol-aware datalink interception. The kill is non-kinetic: the drone flies somewhere it wasn't supposed to and either crashes, lands harmlessly or returns to a location the defender controls.

**Validation looks like:** demonstrated kill against representative threats in DoD test ranges within 12 months. The metric is *cost per kill*. Target: under `$50` per defeated drone, because the effector reuses indefinitely.

**Why the buyer pays:** non-kinetic kills are politically valuable. A kinetic engagement near civilian population centers (Saudi oilfields, U.S. domestic critical infrastructure, NATO airfields in dense areas) is constrained by collateral damage rules. A non-kinetic kill doesn't trigger those rules. Domestic infrastructure defense (DHS, DOE for critical-energy sites, FBI for domestic counter-terrorism) is a distinct and growing buyer for this shape that the kinetic-only shape can't address.

**GTM and revenue:** dual-market. DoD international (combatant commands operating in dense environments) and DHS-domestic (critical infrastructure protection grants, the new FAA counter-drone authorities). Revenue per system `$200K–2M`. At 40 deployed systems, that's `$15–50M` annual depending on mix.

**What kills it.** Drone autonomy stacks are improving fast. Visual-navigation and GPS-spoofing-resistant inertial systems are within the next two product cycles for state-actor-built drones. The defense is staying ahead by attacking new autonomy primitives as they emerge. The wedge is dynamic, not static. This is a *running war*, which is uncomfortable for venture investors who prefer steady-state defensibility.

## What's already been tried

- **Anduril.** Built the most credible commercial defense-software stack since SpaceX. Lattice OS is the closest existing analog to Wedge 1, paired with their own effector portfolio (Roadrunner, Ghost). The competitive constraint on Wedge 1 is real. The differentiation has to be *more effector-agnostic, faster integration cycle*. Anduril structurally cannot be effector-neutral because their P&L depends on selling effectors.
- **Shield AI, Saronic, Allen Control Systems.** Each in slightly different segments (autonomous aviation, autonomous maritime, counter-UAS specifically). The cohort proves the procurement-vehicle thesis works. New entrants land government contracts inside 18 months when the technology is real.
- **CISA's counter-UAS pilot programs** and the FBI's prior counter-drone work at major events. The domestic infrastructure-defense buyer has been validated in pilots but procurement is constrained by Title 18 limitations on jamming and kinetic action. Only specific federal agencies can deploy counter-drone systems on U.S. soil. This regulatory mapping is the gating consideration for Wedge 3's domestic side.

## Open questions

- The procurement vehicle (OTA, DIU CSO, SBIR Phase III) is the central enabler. If the next administration narrows OTA usage back toward MDAP, what happens to the entire defense-startup cohort, this one included? My read is the legislative authorization is durable, but I am not confident.
- Wedge 2's unit economics depend on cost reduction below `$5K/unit` at scale. The Stinger production lines historically couldn't get below `$120K/unit` because the supply chain is small-volume. Is a fundamentally different manufacturing approach (Shenzhen-style PCB-driven design) compatible with DoD reliability requirements? Some say yes. The production data isn't yet on the table.
- For Wedge 3, the legal posture for non-kinetic effectors is genuinely unsettled domestically. The export side (DoD overseas) is clearer. Does the domestic side ever open or is the business 80% international military, 20% federal-domestic-only? The answer changes the TAM by a factor of 4.
- Is *defense* the right framing for an AI-and-software-heavy team or does this team naturally extend into dual-use applications (commercial airspace integration, port security, prison-drone interdiction) once the kill-chain technology exists? My instinct says yes. Defense customers will not stop a dual-use commercial side as long as ITAR exposures are managed.
