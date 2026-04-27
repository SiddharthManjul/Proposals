export type Category = "BIP" | "CIP" | "EIP" | "CMIP" | "PIP";

export type Status =
  | "Draft"
  | "Discussion"
  | "Last Call"
  | "Accepted"
  | "Implemented"
  | "Rejected"
  | "Living";

export type Comment = {
  id: string;
  author: string;
  handle: string;
  date: string;
  body: string;
  replies?: Comment[];
};

export type Proposal = {
  number: number;
  category: Category;
  slug: string;
  title: string;
  abstract: string;
  status: Status;
  author: string;
  authorHandle: string;
  posted: string;
  updated: string;
  readingMinutes: number;
  body: ProposalSection[];
  discussion: Comment[];
};

export type ProposalSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  pullquote?: string;
};

export const CATEGORIES: {
  code: Category;
  label: string;
  full: string;
  blurb: string;
}[] = [
  {
    code: "BIP",
    label: "BIPs",
    full: "Blitz Improvement Proposals",
    blurb:
      "Changes to how Monad Blitz — the one-day hackathon series — is run, judged, and supported between cities.",
  },
  {
    code: "CIP",
    label: "CIPs",
    full: "Content Improvement Proposals",
    blurb:
      "Editorial direction for documentation, tutorials, translations, podcasts, and the public writing the ecosystem produces.",
  },
  {
    code: "EIP",
    label: "EIPs",
    full: "Event Idea Proposals",
    blurb:
      "Conferences, demo nights, retreats, side stages — anything that gathers builders in a room.",
  },
  {
    code: "CMIP",
    label: "CMIPs",
    full: "Community Improvement Proposals",
    blurb:
      "Norms, governance, mentorship, moderation — how the community treats itself and decides things.",
  },
  {
    code: "PIP",
    label: "PIPs",
    full: "Product Improvement Proposals",
    blurb:
      "First-party tools and surfaces: explorer, RPC, starter kits, wallet flows, the documentation site itself.",
  },
];

export const STATUSES: Status[] = [
  "Draft",
  "Discussion",
  "Last Call",
  "Accepted",
  "Implemented",
  "Rejected",
  "Living",
];

const lorem = (s: string[]) => s;

export const PROPOSALS: Proposal[] = [
  {
    number: 1,
    category: "BIP",
    slug: "standardize-blitz-judging-rubric",
    title: "Standardize the Blitz judging rubric across cities",
    abstract:
      "Each Blitz currently invents its own scoring sheet the night before. Teams who travel between cities cannot calibrate, and judges quietly disagree on what 'shipped' means. This proposal locks in a four-axis rubric and lets organizers add one local axis on top.",
    status: "Discussion",
    author: "Reema Khan",
    authorHandle: "reema.eth",
    posted: "2026-04-09",
    updated: "2026-04-22",
    readingMinutes: 6,
    body: [
      {
        paragraphs: [
          "The first three Blitz events used wildly different rubrics. Bangalore weighted technical novelty at 50%. Lisbon weighted demo polish at 40%. Seoul didn't publish weights at all and asked judges to vote on a five-star scale. Teams who travelled to multiple events had to rebuild their pitch each time, and at least two judges reported being unsure whether they were rating the idea or the prototype.",
          "A standard rubric isn't about flattening taste. It's about giving judges a shared vocabulary so disagreements happen on substance rather than on what 'fit' means.",
        ],
      },
      {
        heading: "Specification",
        paragraphs: [
          "Every Blitz must publish, before submissions open, a scoring sheet built from the four mandatory axes below. Organizers may add at most one local axis (for example, an event whose theme is 'consumer onboarding' may add a fifth axis weighted up to 15%).",
        ],
        list: [
          "Working code (30%) — what runs end-to-end, on-chain, in front of judges, without staging tricks.",
          "Idea quality (30%) — is the problem real, is the wedge defensible, would a builder want to keep working on this Monday morning.",
          "Craft (20%) — interface, copy, latency, the small choices that show care.",
          "Story (20%) — can the team explain in two minutes why this exists.",
        ],
      },
      {
        heading: "Why these weights",
        paragraphs: [
          "Working code and idea quality are tied because the failure mode at hackathons swings between two extremes — beautiful slideware with no repo, and impressive plumbing for a problem nobody has. Splitting them 30/30 forces both to clear a bar.",
          "Craft sits at 20% because most one-day projects will be rough, and we don't want to punish teams who chose to ship the unsexy half. Story sits at 20% because builders who can't articulate the wedge tend to abandon the project on Monday.",
        ],
        pullquote:
          "Standardization isn't about flattening taste. It's about giving judges a shared vocabulary so disagreements happen on substance.",
      },
      {
        heading: "Open questions",
        list: [
          "Should the local axis cap be 10% or 15%? Lisbon organizers want more room.",
          "Do we publish judge weights or only aggregate scores?",
          "Should there be a separate prize for projects that score below average on Story but above average on Working Code? (i.e. the 'quiet shippers' carve-out).",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Tomás Reyes",
        handle: "treyes",
        date: "2026-04-10",
        body: "I co-organized Lisbon and the 40% on demo polish was a mistake we already corrected internally. Happy to have it written down. One concern: a 15% local axis is too small for events with a strong vertical theme — we lose the ability to actually weight the thing the event is about.",
        replies: [
          {
            id: "c1r1",
            author: "Reema Khan",
            handle: "reema.eth",
            date: "2026-04-10",
            body: "Fair. I'd accept 20% if we cap the number of local axes at one and require organizers to publish the rationale a week before submissions open.",
          },
        ],
      },
      {
        id: "c2",
        author: "Hyojin Park",
        handle: "hyojin",
        date: "2026-04-11",
        body: "Seoul didn't publish weights because we couldn't agree on them in time. A standard rubric would have saved us a 2am argument. +1.",
      },
      {
        id: "c3",
        author: "Devon Maher",
        handle: "dev.maher",
        date: "2026-04-15",
        body: "I'd push back on the Story axis. Some teams are non-native English speakers and we keep penalizing them for accents disguised as 'clarity'. If we keep it, judges need explicit guidance to score on substance, not delivery.",
      },
    ],
  },
  {
    number: 2,
    category: "BIP",
    slug: "tooling-track-every-blitz",
    title: "Reserve a Tooling track at every Blitz",
    abstract:
      "Hackathon submissions skew toward consumer demos because they look better on stage. Tooling — debuggers, indexers, fixtures, test harnesses — is what later builders quietly depend on. A reserved track ensures it doesn't get out-shouted.",
    status: "Accepted",
    author: "Tomás Reyes",
    authorHandle: "treyes",
    posted: "2026-03-22",
    updated: "2026-04-04",
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          "Every Blitz so far has produced two or three pieces of tooling that other teams quietly forked the next month. None of them won. They were not even shortlisted, because consumer demos polish better in twelve hours than tooling does.",
          "This proposal does not change overall judging. It carves out one of the four podium spots for the highest-scoring tooling submission, judged against the same rubric. If no tooling submission clears the threshold, the spot returns to the general pool.",
        ],
      },
      {
        heading: "What counts as tooling",
        list: [
          "Indexers, query layers, schema introspection.",
          "Local development frameworks, fixtures, mock RPC.",
          "Observability — tracing, profiling, gas analysis.",
          "Editor tooling, CLI wrappers, test harnesses.",
          "Anything where the user is another builder, not an end user.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Anik Dasgupta",
        handle: "anik",
        date: "2026-03-23",
        body: "Strong yes. I judged Bangalore and the indexer that came out of that weekend is now used by four teams I know of. It got fifth.",
      },
      {
        id: "c2",
        author: "Marcie Olsen",
        handle: "marcie",
        date: "2026-03-25",
        body: "I'd want the 'no submission, spot returns' rule explicit on the website, otherwise people will assume there's always a tooling winner and dilute the bar.",
      },
    ],
  },
  {
    number: 3,
    category: "BIP",
    slug: "post-event-capital-pool",
    title: "Post-event capital pool for the top three projects",
    abstract:
      "Most Blitz winners abandon the project within four weeks. The bottleneck is rarely conviction — it's the gap between hackathon prize and pre-seed. A small, fast follow-on check, decided by the same judges within ten days, would close it.",
    status: "Discussion",
    author: "Anik Dasgupta",
    authorHandle: "anik",
    posted: "2026-04-14",
    updated: "2026-04-26",
    readingMinutes: 5,
    body: [
      {
        paragraphs: [
          "We surveyed 38 teams who placed top three across the last four Blitz events. Twenty-six had stopped working on the project within a month. When asked why, the most common answer was not 'lost interest' — it was 'I had to go back to my job and I couldn't justify two more weeks unpaid'.",
          "Hackathon prize money is structured as recognition. It's small, taxed as income in most jurisdictions, and arrives weeks after the event. It does not function as runway. A post-event capital pool, structured as a SAFE on standard terms, would.",
        ],
      },
      {
        heading: "Mechanism",
        list: [
          "Each Blitz reserves a capital pool — proposed size: $75k per event, drawn from the events budget.",
          "Top three teams are eligible. They opt in within seven days.",
          "Standard SAFE: $20k–$25k each, post-money, on a shared template published in advance.",
          "Decision made by the same judging panel within ten days. No additional pitch, no additional deck.",
        ],
      },
      {
        heading: "Risks",
        paragraphs: [
          "The obvious risk is selection: judges optimize for what looks good on stage and we end up with a portfolio of demos. The mitigation is that every check is small enough that a miss costs less than running a single conference booth.",
          "The non-obvious risk is reputational. If the foundation is seen as the easy first check, it crowds out angels who would otherwise underwrite better terms. The carve-out: only the top three are eligible, and only at events; no rolling program.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Sasha Volkov",
        handle: "sasha.v",
        date: "2026-04-15",
        body: "I'd push back on $75k per event. That's a $300k/year line item before counting venue, food, travel. Let's pilot one event first.",
      },
      {
        id: "c2",
        author: "Reema Khan",
        handle: "reema.eth",
        date: "2026-04-16",
        body: "Pilot makes sense. I'd add: publish the SAFE template a month before the event so teams can have it reviewed by counsel before they decide to opt in.",
      },
      {
        id: "c3",
        author: "Felix Brand",
        handle: "felixb",
        date: "2026-04-20",
        body: "Counter-proposal: instead of a SAFE, do an unconditional grant ($15k, no equity). Equity at this stage is messy and the foundation isn't set up to be a cap-table participant.",
      },
    ],
  },
  {
    number: 4,
    category: "BIP",
    slug: "mentor-sla-small-cities",
    title: "Mentor sign-up SLAs for small-city Blitz events",
    abstract:
      "Small-city Blitz events systematically run short on mentors. This is a coordination problem, not a goodwill one. A pre-published SLA — minimum hours, response time, refund of travel if commitment lapses — would fix it.",
    status: "Draft",
    author: "Hyojin Park",
    authorHandle: "hyojin",
    posted: "2026-04-21",
    updated: "2026-04-24",
    readingMinutes: 3,
    body: [
      {
        paragraphs: [
          "This is a draft. The intent is to start a conversation, not to lock in numbers yet. Feedback below is welcome.",
          "Small-city events struggle because mentors signal interest without committing. Hub cities don't have this problem because mentors are local; small cities depend on travelers, and travelers cancel.",
        ],
      },
      {
        heading: "Sketch",
        list: [
          "Mentors commit to a minimum block (e.g. 4 hours over Saturday).",
          "Travel is reimbursed only if the commitment is met or cancelled with 14 days' notice.",
          "Organizers publish the mentor list one week before the event. No anonymous mentors.",
          "If three or more mentors drop within 7 days of the event, the foundation is on the hook to backfill.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Anita Joseph",
        handle: "anita.j",
        date: "2026-04-22",
        body: "Naming mentors publicly is the most important line in here. Half the no-shows are people who never planned to come and signed up for the badge.",
      },
    ],
  },
  {
    number: 5,
    category: "BIP",
    slug: "remote-teams-alongside-in-person",
    title: "Allow remote teams to submit alongside in-person",
    abstract:
      "A remote track was rejected last cycle. This is a softer alternative: remote teams compete in a parallel bracket, judged on the same rubric, but with separate prizes and explicit ineligibility for the in-person podium.",
    status: "Last Call",
    author: "Devon Maher",
    authorHandle: "dev.maher",
    posted: "2026-03-30",
    updated: "2026-04-25",
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          "The previous proposal failed because mixing remote and in-person teams created a fairness problem: in-person teams have mentor access, in-person teams have the rooftop dinner, in-person teams talk to judges in hallways. A remote team that wins the in-person bracket implicitly devalues the local event.",
          "The compromise here is to keep them separate. Remote teams submit through the same form, are scored against the same rubric, but compete against each other and have a separate (smaller) prize pool. They are ineligible for the in-person podium and the capital pool, if BIP-3 passes.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Casey Ng",
        handle: "casey",
        date: "2026-04-01",
        body: "This is the right shape. Last call from me — happy to land it.",
      },
      {
        id: "c2",
        author: "Tomás Reyes",
        handle: "treyes",
        date: "2026-04-12",
        body: "Agreed. One ask: publish the remote bracket prize pool on the same page as the in-person one, so it doesn't feel hidden.",
      },
    ],
  },
  {
    number: 1,
    category: "CIP",
    slug: "translate-docs-mandarin-korean-vietnamese-turkish",
    title: "Translate the developer docs into Mandarin, Korean, Vietnamese, and Turkish",
    abstract:
      "Half of the active builder community ships in a language that isn't their first. The current docs are English-only and translated unofficially in three GitHub forks. This proposal funds an official translation, on a shared CMS, with credited human translators.",
    status: "Implemented",
    author: "Wei Lin",
    authorHandle: "weilin",
    posted: "2026-01-12",
    updated: "2026-04-02",
    readingMinutes: 5,
    body: [
      {
        paragraphs: [
          "This proposal was accepted in February and shipped on April 1. Translations are now live for the four target languages, with versioning tied to the English source. This page is preserved as a record.",
          "Translators are credited on each page. Updates to the English docs trigger a translation queue with a 14-day SLA. Discrepancies are flagged with a banner until resolved.",
        ],
      },
      {
        heading: "What was actually built",
        list: [
          "i18n integrated into the docs site, four locales live.",
          "Six paid translators on annual retainers, with backups.",
          "A diff dashboard that shows which translated pages are stale.",
          "Per-locale feedback form that routes to the responsible translator.",
        ],
      },
      {
        heading: "What we'd do differently",
        paragraphs: [
          "The CMS migration ate three weeks we hadn't budgeted. If we expand to a fifth language, we'll skip the CMS evaluation and go straight to the one we ended up on.",
          "Code samples are not translated. Comments inside code samples were a debate we never settled — currently they remain in English and we will revisit if feedback comes in.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "N. Hartwell",
        handle: "n.hartwell",
        date: "2026-04-04",
        body: "The 14-day SLA is the part I was most worried about. So far it's holding. Worth re-checking in 90 days when the novelty wears off.",
      },
    ],
  },
  {
    number: 2,
    category: "CIP",
    slug: "weekly-written-digest-rotating-authors",
    title: "A weekly written digest authored by a rotating community member",
    abstract:
      "The current newsletter is written by the foundation's comms team. It reads like a foundation newsletter. A digest written by a different community member every week — paid, edited, but not house-styled — would be more honest and more read.",
    status: "Accepted",
    author: "Marcie Olsen",
    authorHandle: "marcie",
    posted: "2026-02-08",
    updated: "2026-03-15",
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          "Newsletters written by foundations sound like newsletters written by foundations. They cannot help it. The voice is institutional because the writer answers to an institution.",
          "The proposal: pay a different community member each week to write the digest. They pick what to include, they write in their voice, and an editor (one person, part-time) does line-edits but does not change the take.",
        ],
        pullquote:
          "Newsletters written by foundations sound like newsletters written by foundations. They cannot help it.",
      },
      {
        heading: "Mechanics",
        list: [
          "Rotation pool of ~16 authors, each writing roughly twice a year.",
          "Honorarium per issue. Published rate, not negotiated case by case.",
          "One paid editor. No house style guide; minimal rewriting.",
          "Authors can decline a week without penalty. Backup writer on call.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Joaquim Albuquerque",
        handle: "joaquim",
        date: "2026-02-09",
        body: "I'd want the editor's role spelled out in writing. The risk is the editor becomes the de facto voice over six months of soft pressure.",
      },
    ],
  },
  {
    number: 3,
    category: "CIP",
    slug: "replace-long-tutorials-with-chaptered-shorts",
    title: "Replace tutorial videos longer than 12 minutes with chaptered shorts",
    abstract:
      "Long-form tutorials get good completion rates from people who already know what they're doing. Beginners bounce at minute four and never come back. Splitting into 4–6 minute chaptered shorts lets people resume and skip without losing place.",
    status: "Draft",
    author: "Joaquim Albuquerque",
    authorHandle: "joaquim",
    posted: "2026-04-19",
    updated: "2026-04-23",
    readingMinutes: 3,
    body: [
      {
        paragraphs: [
          "We pulled three months of YouTube analytics. Tutorials over 12 minutes have a median drop-off at 38%. Tutorials under 6 minutes have a median drop-off at 12%. The drop-off is not gradual — it spikes between minute 3 and 5 of long videos.",
          "This proposal is to re-cut the existing nine long-form tutorials into chaptered series, not to commission new ones. The originals stay up for completion's sake.",
        ],
      },
    ],
    discussion: [],
  },
  {
    number: 4,
    category: "CIP",
    slug: "rfc-of-the-month-newsletter",
    title: "An 'RFC of the Month' highlight in the newsletter",
    abstract:
      "Most readers never visit this forum. A monthly highlight — one proposal, why it matters, what's still being argued — would route attention to the conversations that need it.",
    status: "Discussion",
    author: "N. Hartwell",
    authorHandle: "n.hartwell",
    posted: "2026-04-12",
    updated: "2026-04-22",
    readingMinutes: 3,
    body: [
      {
        paragraphs: [
          "Activity here clusters around five or six engaged people per proposal. Many of the proposals that need broader input — community norms, event scheduling, anything that touches non-technical builders — get the least.",
          "A monthly highlight written by the digest editor, not the proposal author, would route attention without giving the author a megaphone.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Marcie Olsen",
        handle: "marcie",
        date: "2026-04-13",
        body: "If CIP-2 passes I'd want this folded into the rotating-author format rather than handled by the editor. Otherwise the editor accumulates more soft authority than the role should have.",
      },
    ],
  },
  {
    number: 1,
    category: "EIP",
    slug: "quarterly-open-house-team-office-hours",
    title: "Quarterly Open House — 90 minutes of team office hours, on the record",
    abstract:
      "AMAs are theater. Office hours, on the record, with the same three or four people every quarter, would build the kind of accountability that AMAs only perform.",
    status: "Accepted",
    author: "Sasha Volkov",
    authorHandle: "sasha.v",
    posted: "2026-02-26",
    updated: "2026-03-30",
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          "The AMA format rewards charisma over substance. Questions are pre-screened by tone and ordered by upvotes, which means the median question is a wish and the loudest question is a complaint.",
          "Open House would be different in three specific ways: same three people every quarter (so accountability accumulates); 90 minutes uninterrupted (so people stop performing the format); recorded and transcribed (so quotes are quotable).",
        ],
        pullquote:
          "AMAs reward charisma over substance. Office hours, with the same people, on the record, would not.",
      },
      {
        heading: "Format",
        list: [
          "Quarterly cadence. Published date locked 90 days in advance.",
          "Three rotating team members; one of them is always engineering, one always operations.",
          "Live, no slides, no script. Questions submitted live in the chat.",
          "Transcript published within 72 hours. Edits limited to typos.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Priya Subramanian",
        handle: "priyas",
        date: "2026-03-01",
        body: "The transcript-within-72-hours line is what makes this work. Without it it's just a longer AMA.",
      },
    ],
  },
  {
    number: 2,
    category: "EIP",
    slug: "side-stage-token2049-small-builders",
    title: "Side stage at Token2049 dedicated to small builders",
    abstract:
      "The main stage at large conferences is reserved for people with PR teams. A side stage — eight slots, twenty minutes each, no slides longer than three lines — would surface builders who actually ship.",
    status: "Discussion",
    author: "Priya Subramanian",
    authorHandle: "priyas",
    posted: "2026-04-05",
    updated: "2026-04-21",
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          "The proposal is small in dollars and large in attention. Eight builders, twenty minutes each, two days. The slot is decided by an open call, not by who knows the foundation.",
          "Constraint: no marketing slides. The talk is a demo or it's a reading from the codebase. This is enforced by the host, who has the floor to interrupt.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Felix Brand",
        handle: "felixb",
        date: "2026-04-08",
        body: "Yes — the no-slides rule is the only thing that keeps this from collapsing into the main stage. Hold it.",
      },
      {
        id: "c2",
        author: "Casey Ng",
        handle: "casey",
        date: "2026-04-14",
        body: "Could we pre-record one of the eight, for builders who can't travel? It would change the format slightly but expand the pool.",
      },
    ],
  },
  {
    number: 3,
    category: "EIP",
    slug: "annual-builders-retreat",
    title: "Annual Builder's Retreat outside the conference circuit",
    abstract:
      "Conferences are sales floors. A retreat — fifty people, five days, no press, no recording — would be where the actual conversations happen.",
    status: "Draft",
    author: "Felix Brand",
    authorHandle: "felixb",
    posted: "2026-04-23",
    updated: "2026-04-26",
    readingMinutes: 3,
    body: [
      {
        paragraphs: [
          "Draft. Intentionally light on details until interest is gauged.",
          "Rough shape: fifty invited builders, five days, somewhere remote and cheap, no press, no recording, no panels. A few prepared sessions; mostly unstructured time. Cost split between foundation and attendees on a sliding scale.",
        ],
      },
    ],
    discussion: [],
  },
  {
    number: 4,
    category: "EIP",
    slug: "monthly-demo-night-five-cities",
    title: "Monthly Demo Night hosted in five rotating cities",
    abstract:
      "Demo Night was a side project that worked. This proposal turns it into a recurring monthly event in five cities, with a shared budget, shared format, and local hosts.",
    status: "Implemented",
    author: "Casey Ng",
    authorHandle: "casey",
    posted: "2025-11-04",
    updated: "2026-02-18",
    readingMinutes: 3,
    body: [
      {
        paragraphs: [
          "Demo Night ran informally for six months in three cities. This proposal — accepted in November and now in steady-state — formalized it into a monthly format with five host cities, a fixed venue stipend, and a shared sign-up page.",
          "Numbers from the first quarter of formal operation: 14 events, 87 demos, 1,400 attendees. The shared sign-up page reduced no-shows from ~40% to ~22%.",
        ],
      },
    ],
    discussion: [],
  },
  {
    number: 1,
    category: "CMIP",
    slug: "mentorship-pairing-first-time-builders",
    title: "Mentorship pairing for first-time builders",
    abstract:
      "First-time builders ask the same five questions in the same five threads. A short, time-bounded pairing program — three calls, no obligation after — would catch them earlier and lighter.",
    status: "Accepted",
    author: "Anita Joseph",
    authorHandle: "anita.j",
    posted: "2026-02-14",
    updated: "2026-03-28",
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          "The Discord is a high-volume environment. Beginners ask, get answered, then ask the same question two weeks later because the answer was buried by the time they had context for it.",
          "Pairing solves this not because mentors give better answers — they don't, the Discord answers are good — but because beginners can ask follow-ups without feeling like they're using a public channel as a tutor.",
        ],
      },
      {
        heading: "Shape",
        list: [
          "Three 30-minute calls, scheduled across two months.",
          "No obligation to continue. No expectation that the pairing becomes a friendship.",
          "Mentors are unpaid, but they get a clean exit after three calls.",
          "Matched on stack and timezone, not on personality.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "D. Okafor",
        handle: "d.okafor",
        date: "2026-02-15",
        body: "The 'clean exit' line is what makes this sustainable. Most mentor programs guilt mentors into continuing past the point where it's useful.",
      },
    ],
  },
  {
    number: 2,
    category: "CMIP",
    slug: "discord-moderation-handbook-refresh",
    title: "Refresh the Discord moderation handbook",
    abstract:
      "The current handbook predates the current community. It assumes a smaller, more technical audience, and three of its rules haven't been enforced in months. Better to rewrite than to keep ignoring.",
    status: "Discussion",
    author: "D. Okafor",
    authorHandle: "d.okafor",
    posted: "2026-04-02",
    updated: "2026-04-24",
    readingMinutes: 5,
    body: [
      {
        paragraphs: [
          "The handbook was written when the server had ~800 members and was mostly developers. It now has ~9,000 members and includes a meaningful contingent of non-technical contributors. The rules that worked at 800 don't always work at 9,000.",
          "Three rules are silently no longer enforced: the ban on link-shorteners, the requirement to use real names in #introductions, and the 24-hour cooldown after a temporary mute. Mods don't enforce them because they no longer see the original reasoning.",
        ],
      },
      {
        heading: "What this is and isn't",
        paragraphs: [
          "This is a documentation refresh. It is not a relaxation of moderation. Several rules will be tightened — particularly around impersonation, which the original handbook did not anticipate.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Anita Joseph",
        handle: "anita.j",
        date: "2026-04-03",
        body: "Strong support. The undocumented rule decay is worse than the rules being slightly off — at least documented rules can be argued with.",
      },
      {
        id: "c2",
        author: "Ben Tashkov",
        handle: "ben.t",
        date: "2026-04-09",
        body: "Could the rewrite be done in public? A draft channel where the new handbook is line-edited by anyone, not just the mod team?",
      },
    ],
  },
  {
    number: 3,
    category: "CMIP",
    slug: "community-grants-committee-public-minutes",
    title: "A community-run grants committee with public minutes",
    abstract:
      "Foundation-run grants are fast but opaque. A community-run committee — five rotating members, public minutes, capped check size — would be slower but legible. Both can coexist.",
    status: "Draft",
    author: "Ben Tashkov",
    authorHandle: "ben.t",
    posted: "2026-04-18",
    updated: "2026-04-25",
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          "Draft. This is intentionally not a replacement for the existing grants program — it's an addition with different tradeoffs.",
        ],
      },
      {
        heading: "Sketch",
        list: [
          "Five committee members, rotating annually, two-year staggered terms.",
          "Quarterly meeting, public minutes published within seven days.",
          "Cap per check: $25k. Total annual budget: $400k.",
          "Decisions by simple majority. Conflicts of interest disclosed and recused.",
        ],
      },
    ],
    discussion: [],
  },
  {
    number: 4,
    category: "CMIP",
    slug: "retire-general-channel",
    title: "Retire the catch-all 'general' channel",
    abstract:
      "The proposal was to delete #general and force conversations into topic-specific channels. After two weeks of discussion the consensus was that this would be a net loss. Preserved as a record.",
    status: "Rejected",
    author: "M. Aldrich",
    authorHandle: "maldrich",
    posted: "2026-03-08",
    updated: "2026-03-22",
    readingMinutes: 2,
    body: [
      {
        paragraphs: [
          "This proposal was rejected on March 22 after two weeks of discussion. The strongest argument against, made by several long-time members, was that #general is the only channel where new members feel they can post without being off-topic. Removing it would push them to silence, not to the right channel.",
          "Preserved here as a record. The underlying problem — that #general accumulates noise — remains real and is being addressed via better pinned messages and a weekly digest.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Anita Joseph",
        handle: "anita.j",
        date: "2026-03-15",
        body: "The 'where do new members post' argument is the deciding one for me. Withdrawing my support.",
      },
    ],
  },
  {
    number: 1,
    category: "PIP",
    slug: "human-readable-names-explorer",
    title: "Human-readable names in the explorer",
    abstract:
      "Addresses are not memorable. Most other ecosystems solved this two years ago and we still surface 0x-prefixed hex everywhere a human will read it. This proposal lays out a minimal first version.",
    status: "Last Call",
    author: "Simone Carter",
    authorHandle: "simonec",
    posted: "2026-03-11",
    updated: "2026-04-22",
    readingMinutes: 6,
    body: [
      {
        paragraphs: [
          "We are the only major chain whose explorer still shows 0x-prefixed hex by default. Every other ecosystem has solved this; we just haven't agreed on which name service to lean on.",
          "This proposal is to ship a minimum viable name layer in the explorer first. Not a full name service — just a resolver that displays a human-readable name when one exists, with an obvious way to view the underlying address.",
        ],
        pullquote:
          "Most other ecosystems solved this two years ago. We still surface 0x-prefixed hex everywhere a human will read it.",
      },
      {
        heading: "Scope",
        list: [
          "Resolver only, no registry. We index existing names from a list of approved providers.",
          "Names always display with a small badge indicating the source provider.",
          "Hover or click reveals the underlying address. Copy-to-clipboard always copies the address, never the name.",
          "Reserved namespace for the foundation and core team — addresses in this set always show their team name.",
        ],
      },
      {
        heading: "Why a resolver, not a registry",
        paragraphs: [
          "Building a registry creates obligations: governance, dispute resolution, brand-name squatting policy, the works. None of those are problems we want to take on first-party.",
          "A resolver lets the existing name services compete on quality and lets us upgrade without locking in.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Yuki Tanaka",
        handle: "yuki",
        date: "2026-03-13",
        body: "Strong yes on resolver-not-registry. The day we operate a registry is the day we start getting subpoenas.",
      },
      {
        id: "c2",
        author: "Hari Rao",
        handle: "harir",
        date: "2026-03-19",
        body: "The badge indicating source provider should be small but always visible — otherwise the resolver becomes a phishing surface within a year.",
      },
      {
        id: "c3",
        author: "Alex Petrov",
        handle: "alexp",
        date: "2026-04-04",
        body: "Last call from me. The reserved-namespace line is the right call; we want a clean way to handle the small set of names that absolutely must be unambiguous.",
      },
    ],
  },
  {
    number: 2,
    category: "PIP",
    slug: "wallet-onboarding-tutorial-starter-kit",
    title: "Wallet onboarding tutorial in the docs starter kit",
    abstract:
      "Most starter kits assume the user already has a wallet and funds. The first 90 seconds for a new builder is currently a self-guided expedition. A first-class tutorial would close the funnel.",
    status: "Accepted",
    author: "Alex Petrov",
    authorHandle: "alexp",
    posted: "2026-02-19",
    updated: "2026-03-26",
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          "We pulled funnel data on the docs starter kit. Of users who land on the 'first transaction' page without a wallet installed, 71% leave within four minutes. Of users who land with a wallet installed, 18% leave within four minutes.",
          "This proposal commissions a first-class onboarding tutorial — wallet install, testnet funds, first transaction — that lives at the start of the starter kit, not as a sidebar note three pages in.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Simone Carter",
        handle: "simonec",
        date: "2026-02-21",
        body: "The 71%/18% split is striking. Once you see that number you cannot defend the current flow.",
      },
    ],
  },
  {
    number: 3,
    category: "PIP",
    slug: "native-batched-transactions-explorer",
    title: "Native batched-transactions UI in the explorer",
    abstract:
      "Batched transactions show up in the explorer as a wall of internal calls with no clear boundaries. A first-class batched view — collapsed by default, expandable per call — would make them legible without flattening detail.",
    status: "Draft",
    author: "Yuki Tanaka",
    authorHandle: "yuki",
    posted: "2026-04-17",
    updated: "2026-04-26",
    readingMinutes: 3,
    body: [
      {
        paragraphs: [
          "Open batched transactions are unreadable today. They're rendered as a flat list of internal calls. There is no boundary between 'one logical operation' and 'next logical operation'.",
          "Sketch: the explorer detects known batching contracts and groups internal calls into logical batches, each collapsible. Default view shows three or four labelled batches; expanding shows the calls underneath.",
        ],
      },
    ],
    discussion: [],
  },
  {
    number: 4,
    category: "PIP",
    slug: "public-rpc-gateway-sandbox",
    title: "Public RPC gateway for sandbox testing",
    abstract:
      "Builders running tutorials currently have to provision their own RPC, which is a half-day distraction at the worst possible moment in their first week. A rate-limited public sandbox gateway would close that gap.",
    status: "Discussion",
    author: "Hari Rao",
    authorHandle: "harir",
    posted: "2026-04-08",
    updated: "2026-04-24",
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          "The first wall a new builder hits is RPC provisioning. Most pick a free tier, sign up, paste a key, and lose twenty minutes to it. The lucky ones never come back.",
          "A foundation-operated sandbox gateway — rate-limited, key-less, suitable only for tutorials and toy apps — would be enough to get someone through their first transaction. It would not be a production gateway.",
        ],
      },
      {
        heading: "Constraints",
        list: [
          "Strict rate limit per IP. No keys, no signups, no support tickets.",
          "Sandbox network only. Mainnet gateway is explicitly out of scope.",
          "Documentation makes the limits obvious. Production usage links to commercial providers.",
        ],
      },
    ],
    discussion: [
      {
        id: "c1",
        author: "Simone Carter",
        handle: "simonec",
        date: "2026-04-10",
        body: "Mainnet out of scope is the right call. The minute we run a free mainnet RPC, every tutorial app ships pointing at it and we end up operating a critical dependency.",
      },
    ],
  },
];

export function categoryByCode(code: string): (typeof CATEGORIES)[number] | undefined {
  return CATEGORIES.find((c) => c.code.toLowerCase() === code.toLowerCase());
}

export function proposalsByCategory(code: Category): Proposal[] {
  return PROPOSALS.filter((p) => p.category === code).sort((a, b) =>
    a.number > b.number ? 1 : -1
  );
}

export function getProposal(category: string, slug: string): Proposal | undefined {
  return PROPOSALS.find(
    (p) =>
      p.category.toLowerCase() === category.toLowerCase() &&
      p.slug === slug
  );
}

export function proposalRef(p: Proposal): string {
  return `${p.category}-${String(p.number).padStart(3, "0")}`;
}

export function statusTone(status: Status): "neutral" | "live" | "settled" | "declined" {
  switch (status) {
    case "Draft":
      return "neutral";
    case "Discussion":
    case "Last Call":
      return "live";
    case "Accepted":
    case "Implemented":
    case "Living":
      return "settled";
    case "Rejected":
      return "declined";
  }
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function shortDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
