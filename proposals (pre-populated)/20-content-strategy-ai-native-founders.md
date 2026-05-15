CATEGORY: CIP
TITLE: Publish a reproducible quarterly benchmark and treat it as the marketing

ABSTRACT: AI-native product founders default to marketing claims ("`10x` faster", "state of the art", "production-ready") with no reproducible evidence. The buyer for AI-native products is technical and increasingly skeptical of these claims after two years of inflated benchmarks and curated demos. Marketing copy does not drive trial. Trial does not drive trust, because users cannot independently verify performance. The wedge is a public, reproducible benchmark, published quarterly on the venues researchers actually read, with open code and honest losses. Done well, the benchmark replaces a marketing function entirely.

BODY:
The AI buyer in 2026 is exhausted. Every product page claims state-of-the-art. Every demo is curated. Every blog post cites an internal benchmark that the buyer cannot reproduce. The signal-to-noise ratio of vendor marketing has collapsed to the point where serious engineering teams no longer read it; they read the underlying research, run their own evals and trust the result. The companies that win the technical-buyer trade in this environment are the ones who publish like researchers.

## What's wrong now

Look at the homepage of the typical AI-infrastructure startup. The hero claim names a number (`"10x faster inference"`, `"94% accuracy"`, `"40% cost reduction"`) without saying what it was measured against, on what task, with what hardware, at what precision. The footnote, if it exists, links to a self-published blog post that cites an internal benchmark on a custom dataset.

This pattern reads as marketing to the marketing team that wrote it. To the technical buyer, who has been burned three times in the last year by similar claims, it reads as untrustworthy. The technical buyer then does one of two things: (a) ignores the product entirely or (b) commits to a multi-week internal eval before signing, which adds friction the founder cannot afford.

By my read of AI-buyer survey data and the dozen technical buyers I have asked, roughly `70%` of technical-buyer evaluations now begin with the question *"can I reproduce your headline number?"* When the answer is no, the conversation stops. When the answer is yes, the product enters serious consideration in under a week.

The cost asymmetry is what makes this fixable. The founder who publishes a real benchmark spends `$20 to $40K` per benchmark in engineering time, compute and writing. The same founder running a marketing-content team to *avoid* publishing benchmarks spends `$300K+/year` and reaches a buyer audience that has already discounted the marketing claims. The benchmark is cheaper and works.

## The proposed change

Replace marketing claims as the primary outbound content with a reproducible quarterly benchmark. One benchmark per quarter, on a well-defined eval, with open code, open methodology and head-to-head numbers against the most credible competitors. Honest losses included. The benchmark is the marketing.

What changes versus today: the medium (research-style writeup instead of marketing blog), the venue (arXiv, Papers With Code, GitHub instead of company blog), the voice (engineering-RFC, not marketing-pitch), the audience (technical buyers and researchers, not procurement officers) and the credibility shape (verifiable, not asserted).

A benchmark in this context is a full artifact: the dataset (open if possible, methodology if proprietary), the code (public repository, single command to reproduce), the hardware (named SKUs), the precision (FP16, INT8, BF16, named), the comparison set (three or four competitors, including the open-source baseline), the result table (with confidence intervals) and the analysis (where the product wins, where it loses, what the buyer should infer). It is not a vendor whitepaper. It is a research artifact published on the venues researchers read.

## Mechanics

- **Cadence.** One major benchmark per quarter. Four per year. Each benchmark scoped to a specific evaluation, not the whole product. Examples of scope: *"throughput on long-context inference for Llama-class models at 70B"*, *"retrieval quality on RAG over financial documents"*, *"latency on agentic workloads with tool-calling"*.
- **Author.** An ML engineer or research engineer, working with the founder. The author writes under their real name. The benchmark goes through internal review (the engineer who built the system they are benchmarking against must agree the methodology is fair, even if they wish the numbers were different).
- **Methodology bar.** Code public on day one. Compute receipts published (which provider, what instance type, what total wall-clock time). Comparison baselines reproduced on the same hardware as the product, with the same methodology. No selective dataset filtering. Document any decisions that affect the headline number (e.g., quantization choice, batch size).
- **Honest losses.** Every benchmark includes at least one task where the product underperforms a competitor. State the loss in the abstract. Explain the cause. The customer trusts the wins more because the losses are admitted.
- **Distribution.** Submit to arXiv on publish day. Push the code repository to GitHub. Submit to Papers With Code with the result table. Post a technical thread on Twitter/X the same morning. Submit to HackerNews. Pitch to one ML-newsletter ed (e.g., Import AI, The Batch). For papers ready for it, submit to a NeurIPS workshop, ICLR workshop or MLSys workshop.
- **Budget per benchmark.** `$15 to $30K` (compute, engineering time, writing, illustration). Annual: roughly `$80K to $120K` for four. Compare to a marketing-content team's `$250K+/year`.
- **Smallest viable version.** Skip the comparison sweep for the first benchmark. Just publish reproducible numbers for your own system on a well-known eval. The comparison sweep is the second benchmark, once you have the reproducibility pipeline working.
- **Traction metric.** Inbound from engineering teams citing the benchmark by name. Floor: `15 qualified inbound conversations per benchmark` within `60 days` of publication. Stretch: `50+`. Secondary: arXiv citation count after a year (a healthy benchmark gets `10 to 40 citations` in its first year).
- **Retention metric.** Repeat readers of the benchmark series. Track the email list of subscribers who sign up after reading a benchmark. Healthy list growth: `~500` net subscribers per benchmark, `>60%` of whom open the next quarter's release email.

## Open questions

What do you do when your product loses to a well-funded competitor on the benchmark you committed to running? Two options. (a) Publish anyway, name the loss in the abstract and explain the conditions under which your product still wins. (b) Re-scope the benchmark to the use case where your product genuinely leads, and publish that instead. Option (a) is more honest and harder. Both can work. Suppressing the result entirely is the wrong move because the technical-buyer community will run the comparison themselves and conclude you knew the result and hid it.

Benchmarks are gameable. How do you avoid optimizing for the benchmark rather than the customer use case? Publish multiple benchmarks across the product's surface area, not just the one your team has tuned for. Include real-customer-derived workload distributions, not just synthetic benchmarks. If a customer would not recognize the workload as theirs, the benchmark is the wrong one.

For early-stage products where the benchmark would be embarrassingly far behind the leaders, when do you start this strategy? Probably as soon as the product is good enough to win on one narrow dimension. Publish the narrow benchmark first. Establish the methodology and credibility. Expand the surface area as the product matures. Companies that wait until they are "ready" usually wait too long.

How does the benchmark interact with the rest of marketing? The benchmark replaces the technical-claims part of marketing entirely. It does not replace customer case studies (still valuable), conference talks (the benchmark fuels these) or partnership-driven distribution. Roughly: benchmark is the trust artifact, case studies are the relevance artifact and partnerships are the distribution channel. All three compose.

Is there a version of this strategy for AI-native products that aren't infrastructure (e.g., a vertical AI application for legal or healthcare)? Yes, with the caveat that the benchmark format shifts. For vertical AI, the equivalent artifact is a customer-validated accuracy study on the specific domain task, published with the customer's permission. The reproducibility bar is harder because the data is often private, but the format (open methodology, named baselines, honest losses) translates.
