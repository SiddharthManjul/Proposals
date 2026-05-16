CATEGORY: CMIP
TITLE: Run verification tiers and a public dispute-resolution process for creator and marketplace communities

ABSTRACT: Creator and two-sided marketplace founders face a different community governance problem from product communities. The community is not just chatting. It is transacting, and the cost of bad trust signals shows up directly in transaction volume and dispute volume. The wedge is two formal mechanisms: a verification tier system (anonymous, basic-verified, top-contributor, with specific criteria for each) and a public dispute-resolution process with documented appeal paths. Together they reduce the friction that suppresses transactions and concentrate enforcement on the small number of bad actors who generate disproportionate dispute volume.

BODY:
Marketplaces and creator economies fail in a specific pattern. The early adopters are tolerant. The middle adopters are not. Between ten thousand and one hundred thousand monthly active users, the marketplace either develops trust signals that make transactions feel safe, or it does not, and growth stalls at the point where each new user's first transaction goes badly enough that they leave. The trust signals are governance artifacts, not product features.

## What's broken

The default marketplace at month eighteen looks like this. There are `~25,000 active users` and `~3,000 sellers or creators`. There is no verification beyond email confirmation. Disputes flow through customer support, which receives `~140 disputes per month` of which `~80%` are resolved in favor of the buyer (often unfairly to the seller, because the alternative is a chargeback), `~15%` are resolved in favor of the seller and `~5%` produce a chargeback regardless. There is no public dispute-resolution policy. There is no appeal path beyond emailing customer support again. There is no documented difference between a first-time bad actor and a chronic pattern of bad behavior.

The cost of this structure is visible in three places. First, transactions stall when buyers feel exposed. Conversion from "view listing" to "complete transaction" sits at `~2 to 4%` versus `~6 to 9%` on comparable mature marketplaces. Second, the best sellers leave because they cannot defend themselves against bad-faith disputes. Seller churn for sellers with three or more years on the platform runs `~22%/year`. Third, the customer-support team becomes the de facto trust-and-safety team without the training or the authority for that work.

The community itself is largely silent on these failures because there is no forum where they get aired. Sellers complain in DMs to each other and to the founder. Buyers complain to friends who recommended the platform and then disappear. The founder learns about systemic trust issues through anecdotes, not through documentation.

## Proposed change

Adopt two governance mechanisms.

**A verification tier system with public criteria.** Three tiers minimum.

*Anonymous.* The default. Users have an email, no other verification. Listings allowed up to a transaction value cap (often `$200 to $500` depending on category). Cannot use payment-protection features. Cannot leave reviews with weight.

*Basic-verified.* Government ID matched to user identity, payment method on file with name match. Removes the transaction cap. Reviews count toward seller reputation. Eligible for the platform's standard dispute resolution. This tier should cover `~70 to 85%` of active sellers within six months of launch.

*Top-contributor.* Twelve-month minimum tenure, at least `~100` completed transactions, dispute rate under category-specific threshold (typically `<3%`), no unresolved policy violations. Public badge. Priority dispute review. Eligible for marketplace-funded promotion. Selected by criteria, not application. Sellers who meet the criteria are automatically upgraded.

**A public dispute-resolution process.** Documented on the company website with the title "How disputes work here". Specific contents: what counts as a dispute, what evidence each side should provide, what the timelines are (`14 days` from dispute open to first decision, `7 days` to appeal), who reviews disputes at each stage, what the appeal path is, what the outcomes can be. Published example cases (anonymized) showing how representative disputes were resolved and why. Quarterly stats published: total disputes, resolution distribution, average resolution time, appeal-reversal rate.

What changes versus today: verification carries weight (anonymous accounts are still allowed but have bounded reach), dispute resolution is consistent (same evidence and same logic gets the same outcome) and the trust-and-safety function is named (a dedicated team or named function, not a customer-support side gig).

## What this is and isn't

This is a trust infrastructure addition, not a tightening of the platform's content policies. Existing acceptable content stays acceptable. What changes is the visibility of trust signals and the predictability of dispute resolution. Users who never trip a policy will not notice the structure exists, except that their transactions feel safer to other users.

This is not anti-anonymous-account. Anonymous accounts continue to be allowed because anonymity has legitimate uses (price comparison, exploration before committing, certain protected categories). The anonymous tier is bounded, not banned. Users who want full marketplace participation can verify. Users who want partial participation can stay anonymous and accept the limits.

This is not a community-vote dispute resolution. Disputes are decided by the platform's trust-and-safety function, not by community polls. The public dispute-resolution policy makes the platform's reasoning visible and challengeable on appeal. Community input shapes the policy through periodic review, not through individual case adjudication.

## Mechanics

- **Verification cost.** Government-ID verification typically `$1 to $3` per check via a third-party identity provider. Worth absorbing as a platform cost rather than charging users. The friction of paying to verify suppresses verification rates by `~30 to 50%`.
- **Top-contributor selection.** Algorithmic, not discretionary. Criteria published. Sellers who meet criteria upgrade automatically on the next review cycle (monthly). Sellers who drop below criteria are demoted with `30-day` notice and explanation. No application process, which prevents the "favored seller" perception.
- **Dispute-resolution team.** Dedicated function distinct from customer support. Even at small scale, one named person whose primary responsibility is dispute review, not multi-tasked support reps. Team grows roughly `1 person per ~200 disputes/month` of throughput.
- **Appeal path.** First decision by trust-and-safety reviewer. Appeal reviewed by a different reviewer. Appeals with monetary value above `$1,000` reviewed by trust-and-safety lead.
- **Public minutes.** Quarterly trust-and-safety report. Total disputes opened, resolution distribution by category (in favor of buyer, in favor of seller, mutual, no-action), median resolution time, appeal volume, appeal-reversal rate. Counts only, no names. Published on the company website.
- **Policy review.** Annual cycle. Review the dispute-resolution policy with input from a representative sample of verified sellers and active buyers. Changes require thirty-day public notice before taking effect, except for changes that close a fraud loophole (which take effect immediately with publication after the fact).
- **Smallest viable version.** Start with two tiers (anonymous, verified) and a documented dispute process with a `14-day` resolution SLA. Add the top-contributor tier after twelve months. Do not over-engineer before the volume justifies the structure.
- **Traction metric.** Transaction conversion rate (view to complete) on verified-seller listings vs anonymous. The expected delta is `2x to 3x` higher on verified listings. If the delta is less than `1.5x`, verification is not delivering the trust signal it is supposed to.
- **Retention metric.** Seller retention at twelve months, segmented by tier. Top-contributor retention should run above `85%`. Basic-verified above `60%`. Anonymous below `30%`. The tier system is working when the retention curves are clearly separated.

## Open questions

Does the verification step suppress signup volume? Yes, by `~10 to 25%` depending on category. The lost signups are disproportionately concentrated in fraud-prone segments, so the net effect on platform health is positive even though the top-of-funnel number looks worse. Founders should expect to defend this trade-off to investors who track raw signup numbers.

How do you handle categories where ID verification is culturally sensitive or legally problematic? Use proxy verification (phone number plus payment method plus address) instead of government ID. Trust-and-safety throughput slows but the verification still works. Examples: adult content (where ID verification has different legal requirements), certain international markets (where government ID is not commonly held or where surfacing it has political risk).

What about disputes between two verified sellers? Use the same process with an additional step: both parties present evidence with response deadlines, decision by a senior reviewer, appeal to a second senior reviewer. Verified-vs-verified disputes are typically `~30%` of total dispute volume by month twelve and are harder to resolve than verified-vs-anonymous because both sides have legitimate-seeming evidence.

When does the verification system get attacked at scale (synthetic identity, document fraud)? Around month eighteen typically, when the platform's transaction volume becomes large enough to attract organized fraud. The defense is layered: government ID is one signal, payment-method patterns are another, behavioral signals are a third. Each layer alone is gameable. The combination is not.

How does this approach scale into adjacent platforms or categories? The structure transfers cleanly. The thresholds (transaction caps, top-contributor criteria, dispute-resolution SLAs) need re-tuning per category, but the framework holds across most marketplace shapes. The exception is purely social platforms (Reddit, Discord) where there is no transaction and the trust signal is reputation, not money. For those the verification tier maps to "tenure plus karma" instead of "tenure plus completed transactions".
