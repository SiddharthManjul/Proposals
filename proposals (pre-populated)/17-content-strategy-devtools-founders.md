CATEGORY: CIP
TITLE: Stand up a quarterly missing-manual series for devtools founders

ABSTRACT: Devtools founders default to a marketing blog and a polished landing page. Both lose to the actual differentiator (technical depth) because the developer who buys devtools does not read landing pages or listicles. The wedge is the one piece of writing that does not exist anywhere else: a deeply researched, code-heavy "missing manual" for the integration pattern the founder's product sits inside. One canonical piece per quarter, plus a short cadence of supporting posts, beats a weekly marketing-blog motion at every funnel stage.

BODY:
Developers do not read landing pages. They never have. The landing-page-and-blog motion that works for B2B SaaS leaks 80% of the funnel for devtools, because the audience starts in a search query for "how do I X with Y" and ends in an open IDE, with no time for marketing copy in between. The content that actually moves devtools companies is the artifact a developer sends to their teammate in Slack with the words *"this is the only thing I've found that explains this properly."*

## What's wrong now

Walk the content output of the typical Series A devtools company. You will find: a homepage with a hero claim, three or four feature cards, a "use cases" page and a blog publishing 1.5 posts per week. The posts are mostly listicles (*"7 reasons we love Postgres"*) or company updates (*"introducing v2.4"*).

By my count, the blog's median post gets `~300 unique visitors` in its first 90 days. The conversion from blog reader to trial sign-up runs around `0.5 to 1.2%`. The cost per acquired developer through blog content sits between `$80 and $200` once you account for the marketing-content writer's salary and the founder review cycles.

Compare that to the rare technical deep-dive the same company publishes once a year. The numbers I see, both from founders I talk to and from public Substack data, are different by an order of magnitude. The deep-dive does `15,000 to 80,000` reads, drives sign-ups at `4 to 9%` and gets cited in other people's posts for years. The cost is higher per piece (a senior engineer writing for two weeks runs `$20 to $40K` fully loaded) but the cost per acquired developer collapses to `$10 to $30`.

The conclusion is uncomfortable for a marketing team but obvious from the numbers. Devtools companies are publishing the wrong thing at the wrong cadence. The blog is a tax. The deep-dive is the product of marketing.

## The proposed change

Retire the marketing blog. Stand up a *missing-manual series* in its place. One major piece per quarter, plus two short technical notes per month from engineering on whatever they shipped.

A *missing manual* is a 4,000 to 9,000 word, code-heavy piece on a specific integration pattern with a popular framework or library, written by someone who has actually shipped it in production. Not "an introduction to X". Not "best practices for X". The one piece of writing that exists nowhere else: *the manual the framework's documentation forgot to write*. Examples in the wild that work: Tigris's S3-compatibility deep dives, Turbopuffer's vector-search engineering notes, ReplicaCache's cache-invalidation post that did 200K reads in 2024.

The short notes between quarterly pieces are not blog filler. They are documented engineering work: a benchmark you ran, a bug you found in someone else's library, a public-repo example you pushed up. Three to four hundred words. Written in the same voice as the major pieces. No marketing copy.

What changes versus today is the choice of *what to write*, not how often. The cadence question (*"should we publish twice a week or once a week?"*) is the wrong question. The right question is *what is the one thing only we can write*, and the answer should justify the time it takes to write it well.

## Mechanics

- **Author.** The founder or the founding engineer writes the quarterly piece, with editing help. Outsourced content marketers cannot write missing manuals because they have not shipped the system. Hiring a developer-advocate is the right move at Series B, not before.
- **Cadence.** One major piece per quarter (target: 5,000 to 8,000 words). Two short engineering notes per month. Total: 4 majors and 24 shorts per year. Less volume than a typical blog. More work per piece.
- **Topic selection.** Maintain a public list of three or four candidate topics with rough outlines. Test reception on Twitter or in your relevant Slack/Discord. Write the one with the most signal.
- **Budget.** Founder/CTO time, plus `$3 to $5K` per major piece for technical editing, code review, illustration and benchmark verification. `$60K` annual budget covers the year cleanly.
- **Distribution.** Submit each major piece to HackerNews on the publish morning. Twitter thread breakdown the same day. Pitch a guest spot on a relevant podcast (LWN, Software Engineering Daily, The Changelog) the week before. Cross-post to dev.to and lobste.rs if the audience overlaps. Don't worry about LinkedIn.
- **Newsletter.** Monthly digest by email with one paragraph each on what shipped, what we wrote, what we read. Subscribers compound. Send to existing customers as well as prospects, since retention content lives here too.
- **Smallest viable version.** Skip the major pieces entirely for the first two months. Ship four short engineering notes. Measure pickup. Use the pickup pattern to choose the first major topic. Don't write the missing manual until you have evidence of what readers actually want.
- **Traction metric.** Acquired developers per major piece, measured at 90 days post-publish. Floor target: 100 trial sign-ups per piece. Stretch: 400.
- **Retention metric.** Newsletter open rate and click-through. Healthy is `>40%` open, `>8%` click. Below those numbers the list is the wrong audience.

## Open questions

The buyer of a `$50K+` devtool is rarely the developer who reads the missing manual. The CTO or VP-Engineering signs the contract; the IC developer reads, evangelizes internally and influences the buy. How much should the content budget split between these audiences? My read is roughly `80/20` toward the IC, because the IC is the harder audience to win and the signal travels upward inside the buyer's org without your help. But this depends heavily on company size and contract shape.

What happens when a competitor copies the playbook? Missing-manual content has a half-life. The first piece on a specific integration pattern eats most of the search volume for that query for two to four years, then degrades. The defense is cadence: keep shipping. A company on the fourth or fifth quarterly piece has compounded reputation that a new entrant cannot duplicate from one piece.

Is there a version of this strategy for founders who do not personally write well? In practice, the answer is "hire your second engineer with this in mind." The technical author who can ship the missing manual is also the technical author who can ship complex product features. Skill correlation is high.

Does this approach work for closed-source devtools? Less well than for open-source-adjacent products. Closed-source devtools tend to live in mid-market sales motions where the buyer pays more attention to G2 reviews than to technical writing. But even then, the deep-dive establishes the trust that the sales motion eventually closes on.
