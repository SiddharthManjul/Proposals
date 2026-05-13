CATEGORY: SIP
TITLE: YC Summer 2026 RFS — Inference Chips for Agent Workflows: capture the inefficiency in software before silicon

ABSTRACT: Most reads of agent-inference inefficiency jump to *build a new chip*. Silicon is the right answer eventually; it is not the right answer first, for two reasons. Silicon takes 30+ months to first revenue, and the 60% performance gap on agent workloads is largely software-shaped — scheduling, KV-cache management, batching policies. Capture the software-layer arbitrage now, validate the workload shape, and let the silicon move come after the customer relationship and workload data exist. Three wedges that fit, ordered by capital intensity.

BODY:
This proposal responds to [Y Combinator's Summer 2026 Request for Startups on Inference Chips for Agent Workflows](https://www.ycombinator.com/rfs), authored by Diana Hu.

## Problem

Diana Hu's RFS frames the right number: GPUs run agent workloads at `30–40%` of peak utilization, versus `75–90%` on training and dense-batched single-shot inference. The gap is real and growing as agentic traffic scales — the same RFS references Anthropic's published telemetry indicating agentic traffic has reached a meaningful share of total inference (commonly cited around `20–35%` depending on the customer mix).

The framing skips *why* the gap exists in a way that determines what fixes it. The 30–40% utilization isn't a memory-bandwidth or compute-density problem. It's a *scheduling* problem: agent workloads have unpredictable branching, variable-length context that grows over the loop's lifetime, frequent tool-call pauses where the GPU sits idle waiting on external systems, and bursty bursts of inference activity separated by long quiet periods. Today's serving stacks (vLLM, TGI, NVIDIA's TensorRT-LLM) batch poorly across these shapes because their batching policies were optimized for a different traffic pattern.

The reframe is that the inefficiency lives in the scheduling layer first, the kernel layer second, the silicon layer third. The right ordering for capturing the value is to fix the scheduling, then the kernels, then the silicon — because each step generates the workload data the next step needs to design against. Companies that try to fix silicon first end up shipping parts optimized against simulated workloads that don't match production.

## Why now

Three shifts in the last 12 months:

- Agent inference moved from research to production at meaningful scale. The publicly reported numbers from Anthropic, OpenAI, and the major agent platforms (Cursor, Devin, Replit) suggest agentic traffic crossed the threshold where it dominates the inference cost line for code-generation customers. The serving inefficiency now translates to large absolute dollar amounts.
- NVIDIA's announced $20B Groq acquisition in mid-2025 confirmed that the hyperscaler view is that agent-optimized inference is a distinct silicon market, not a software optimization on existing GPUs. The acquisition closed the door on Groq as an independent competitor but opened a procurement category at NVIDIA that will get filled.
- The MCP (Model Context Protocol) and the parallel standardization of tool-calling APIs created the first uniform interface across agentic workloads. The traffic pattern is now characterizable at the protocol level, not just the per-application level, which makes a horizontal scheduling-layer product feasible.

## Wedge 1: An inference-routing and scheduling layer for agent workloads on existing GPUs

The narrowest, lowest-capital wedge: a software layer that sits between agent applications and inference providers (OpenAI, Anthropic, self-hosted vLLM or TGI clusters) and routes traffic to optimize for the agent workload's characteristics. KV-cache-aware routing (keep a session's calls on the same node), branching prediction (pre-warm caches for likely tool-call follow-ups), tool-call-aware scheduling (deprioritize the agent's request when it's waiting on a slow external API), structured-output batching (batch JSON-mode requests separately from chat requests).

**What it is.** A drop-in SDK and HTTP gateway that agent developers point their inference calls at. The gateway authenticates against the developer's existing provider accounts, applies the scheduling and routing policies, and forwards. The promise is *the same agent workload runs 2–3x cheaper or 2–4x faster on the same underlying infrastructure*.

**Validation looks like:** 50 agent companies as paid customers within 18 months, with measurable cost-reduction or latency-improvement numbers in their own production systems. Target: median customer sees `≥ 40%` cost reduction at constant throughput, or `≥ 50%` latency reduction at constant cost. Below those numbers the customer doesn't switch.

**Why the buyer pays:** the customer is a CTO at an agent-product company watching their OpenAI bill grow `30–50%/month`. The gateway promises that bill grows slower without changing the application. The wedge is *cheaper inference with zero customer engineering work*, which is the rare *unambiguous yes* in enterprise procurement.

**GTM and revenue:** developer-first distribution through agent-developer communities, content marketing on inference cost optimization, partnerships with agent-framework vendors (LangChain, LlamaIndex). Revenue is take-rate on routed traffic — `5–10%` of the underlying inference spend — which at scale clears the platform's own costs and leaves substantial margin. At customers spending `$50K–500K/month` on inference, take is `$30–250K/year/customer`. At 200 customers averaging `$150K/year`, that's `$30M` ARR with very strong gross margins because the platform is pure software.

**What kills it.** OpenAI, Anthropic, or AWS Bedrock shipping native agent-aware scheduling in their managed APIs. Both are inevitable; the question is timing. The defense is being the *neutral routing layer* across multiple providers — once the customer routes through the gateway, switching providers is the gateway's decision, not the customer's, which makes the gateway the durable abstraction. Multi-provider routing also lets the gateway capture price arbitrage across providers.

## Wedge 2: An open-source serving stack specialized for agent workloads

vLLM and TGI are the dominant open serving stacks. Both were designed before agentic inference dominated and have well-documented limitations on the workload (continuous batching policies that hurt sessions with persistent KV-cache, scheduling that doesn't model tool-call pauses, no native support for prefix-sharing across an agent's many calls in the same session). The second wedge is an open-source serving stack rebuilt for the agent workload, with the company's revenue coming from managed deployments and commercial features (observability, fine-grained access control, multi-tenant isolation).

**What it is.** A serving stack — distributed across GPU nodes, supporting the major model families (Llama, Mistral, Qwen, the inference-optimized open models) — purpose-designed for agent workloads. The differentiating internals: session-affinity scheduling so KV-cache for an agent's session stays on one node, hierarchical prefix-cache sharing so common system prompts amortize across users, continuous batching with tool-call awareness, native streaming with structured-output support.

**Validation looks like:** 5,000 weekly active organizations on the open-source build within 18 months, with `100+` paying customers on the managed/commercial tier at average ACVs of `$50–200K/year`. The open-source adoption is the leading indicator; the managed-tier revenue is the lagging.

**Why the buyer pays:** the self-host-ing customers are running their own inference for cost, latency, or compliance reasons (frontier-model API spend hurts at scale, on-prem requirements, data-residency in non-cloud-region geographies). They are buying the open-source stack for free; the managed tier and commercial features cost money and provide ops leverage they don't want to build in-house.

**GTM and revenue:** open-source distribution with the standard playbook — strong public benchmarks, prominent demos, conference presence, partnerships with the major open-model providers. Commercial tier sold to engineering organizations at companies running self-hosted inference (financial services, healthcare, defense, regulated industries plus the open-source-preferring tech companies). Revenue: managed tier `$50–200K/customer/year` plus enterprise support contracts. At 200 paying customers averaging `$120K`, that's `$24M` ARR with structurally good margins because the open-source community contributes ongoing kernel work.

**What kills it.** vLLM and TGI shipping their own agent-workload optimizations and capturing the open-source mindshare back. Both are likely; vLLM has the resources at Anyscale and TGI has Hugging Face. The defense is being substantially better at the specific workload — not a 10% improvement but a 2–3x improvement — by virtue of being designed for it from the start. Also: contributing back to vLLM and TGI strategically while keeping the differentiating innovations in the proprietary build.

## Wedge 3: Purpose-built inference silicon for agentic workloads

The third wedge is the Diana-Hu-RFS-suggests-it shape: build the silicon. The motivation is the same as before — the 30–40% utilization gap on existing GPUs is real and large — but the bet is now that hardware specialization can close the gap from the silicon side. Specifically: faster context switching between models (the operating-cost dominator for multi-model agent workflows), large on-chip KV-cache for execution-graph caching, hardware speculative-decoding support for the iterative branching agent patterns produce, and an instruction set tuned for the actual agent workload shape (not the training workload).

**What it is.** A fabless silicon company. First-product target: an inference accelerator at `7nm` or `5nm` process, `~$30B` of internal SRAM dedicated to KV-cache, programmable execution-graph scheduling, performance target `2–5x` H100 on representative agent benchmarks at `40–60%` of the power budget. Software: a runtime that compiles standard model formats (HuggingFace Transformers, ONNX) to the chip's instruction set.

**Validation looks like:** first silicon at 30 months, first paying customer at 36 months, three pre-orders at 42 months. The metric the customer cares about is `$/token-served` on their specific agent workload, not abstract TOPS or memory bandwidth. The bet is that real workloads measured on real chips will outperform GPUs at the cost line.

**Why the buyer pays:** hyperscalers (AWS, GCP, Azure) and the AI-infra companies (CoreWeave, Lambda, Crusoe) are buying GPUs at `$25–40K/unit` with three-year amortization schedules. The chip's value proposition is *we replace your H100s on this workload at a lower TCO over 3 years*. The financial buyer at the hyperscaler is sophisticated; they will run the workload, measure the savings, and write a contract.

**GTM and revenue:** highly relationship-driven sales to a small set of buyers (the top 6–10 inference-capacity buyers globally). Initial deals are co-development contracts with `$20–50M` NRE plus per-unit pricing. At full ramp the unit economics look like the rest of the AI silicon market — high per-unit revenue, moderate gross margins, very high gross dollars. The exit shape is acquisition by a hyperscaler or strategic; the comparable is Groq's acquisition by NVIDIA at the announced `$20B`.

**What kills it.** Capital intensity and timeline are the obvious risks; silicon companies in this category have raised `$300M–1B` of pre-revenue funding (Tenstorrent, Cerebras, Groq, the Etched/Sohu cohort). The defense is staging — the first product targets one workload category narrowly, the second expands. Also: NVIDIA's H200, B100, and beyond will close some of the gap as they ship; the silicon has to outperform the moving GPU baseline, not the H100 of 2024.

## What's already been tried

- **Groq, Cerebras, SambaNova, Tenstorrent, Etched.** All built specialized inference silicon at various form factors. Groq's success — acquired for $20B by NVIDIA — is the clearest validation that the category exists at venture scale; the others are at various stages of finding their workload-customer fit. None has specifically optimized for agent workloads as the primary design point.
- **Together AI, Anyscale, Modal, Fireworks.** Built inference-as-a-service businesses on top of existing GPU infrastructure with software optimizations. Together AI is largest at `~$100M+` ARR, growing fast. The bet here is *we optimize the software layer better than the customer can themselves*, which is adjacent to Wedge 1's pitch but at the infrastructure layer rather than the routing layer.
- **vLLM (Anyscale), TGI (Hugging Face), TensorRT-LLM (NVIDIA).** The major open-source serving stacks. Each is well-funded by its parent organization and difficult to displace head-on. Wedge 2's bet is that *workload specialization* creates enough differential value to carve out a viable share without displacing the incumbents.

## Open questions

- Wedge 1's biggest risk is the model providers (OpenAI, Anthropic) capturing the optimization themselves at the API layer. They have all the workload data and engineering depth to do this; the question is whether they prioritize it. My read is *yes within 18 months*, which puts time pressure on the routing-gateway shape.
- For Wedge 2, the open-source dynamics are favorable now but reverse if a hyperscaler takes a position. AWS funding a competing project could re-segment the market. The hedge is becoming the standard tool inside enough deployed environments that switching cost is real.
- Wedge 3's exit path runs through hyperscaler acquisition or strategic acquisition. The historical multiple on AI silicon companies has been very high but volatile; the comp set is small. Is the right shape for the founder *build to be acquired in 3–5 years* or *build to IPO in 8–10*? The answer changes the funding profile and the team shape.
- All three wedges depend on the agent-workload-share-of-inference number continuing to grow. If frontier models converge toward *one-shot reasoning that obviates much of the iterative agent loop*, the workload share could plateau or decline. What probability should we assign to that?
