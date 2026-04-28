import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { ProposalRow } from "@/components/ProposalRow";
import { StatusPill } from "@/components/StatusPill";
import {
  CATEGORIES,
  PROPOSALS,
  STATUSES,
  proposalRef,
  shortDate,
} from "@/lib/proposals";

export default function HomePage() {
  const sorted = [...PROPOSALS].sort(
    (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  const liveCount = PROPOSALS.filter(
    (p) => p.status === "Discussion" || p.status === "Last Call"
  ).length;
  const totalReplies = PROPOSALS.reduce(
    (n, p) =>
      n +
      p.discussion.reduce(
        (m, c) => m + 1 + (c.replies?.length ?? 0),
        0
      ),
    0
  );

  return (
    <>
      <Masthead />
      <CategoryNav />
      <main className="mx-auto max-w-360 px-6 lg:px-10 pt-10 pb-12">
        <section className="grid grid-cols-12 gap-10 pb-12 border-b border-rule">
          <aside className="col-span-12 md:col-span-3 order-2 md:order-1">
            <div className="kicker mb-3">From the editors</div>
            <p className="font-display italic text-ink leading-normal text-[18px]">
              This week: a quiet ship of human-readable names in block
              explorers, a draft builders&apos; retreat, and the case for treating
              Web3 as tech first.
            </p>
            <div className="mt-6 divider-dashed" />
            <dl className="mt-6 space-y-3 font-mono text-[12px] uppercase tracking-[0.12em]">
              <div className="flex justify-between">
                <dt className="text-ink-faint">Open proposals</dt>
                <dd className="text-ink tabular-nums">{PROPOSALS.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-faint">In discussion</dt>
                <dd className="text-accent tabular-nums">{liveCount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-faint">Total replies</dt>
                <dd className="text-ink tabular-nums">{totalReplies}</dd>
              </div>
            </dl>
          </aside>
          <article className="col-span-12 md:col-span-5 order-1 md:order-2 md:border-l md:border-rule md:pl-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                Featured · {proposalRef(featured)}
              </span>
              <StatusPill status={featured.status} />
            </div>
            <h2
              className="font-display font-semibold text-ink leading-[1.04] tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
            >
              <Link
                href={`/${featured.category.toLowerCase()}/${featured.slug}`}
                className="hover:text-accent-deep transition-colors"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-ink-soft">
              {featured.abstract}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              <span>By {featured.author}</span>
              <span>·</span>
              <span>{shortDate(featured.updated)}</span>
              <span>·</span>
              <span>{featured.readingMinutes} min read</span>
              <span>·</span>
              <Link
                href={`/${featured.category.toLowerCase()}/${featured.slug}`}
                className="text-accent link-underline"
              >
                Continue reading →
              </Link>
            </div>
          </article>
          <aside className="col-span-12 md:col-span-4 order-3 md:border-l md:border-rule md:pl-8">
            <div className="flex items-baseline justify-between mb-4">
              <div className="kicker">Sections</div>
              <span className="font-mono text-[11px] tabular-nums text-ink-faint">
                {String(CATEGORIES.length).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-display font-semibold text-[1.4rem] leading-[1.05] tracking-[-0.02em] mb-1">
              Four categories. One archive.
            </h3>
            <p className="font-display italic text-ink-soft text-[14px] leading-[1.55] mb-5">
              Each category collects a different kind of proposal. The format
              is the same; the audience is not.
            </p>
            <ul className="border-t border-rule">
              {CATEGORIES.map((cat) => {
                const count = PROPOSALS.filter(
                  (p) => p.category === cat.code
                ).length;
                return (
                  <li key={cat.code} className="border-b border-rule">
                    <Link
                      href={`/${cat.code.toLowerCase()}`}
                      className="group flex items-baseline justify-between gap-3 py-3 transition-colors hover:bg-accent-wash hover:px-2"
                    >
                      <div className="flex items-baseline gap-3 min-w-0">
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent shrink-0 w-10">
                          {cat.code}
                        </span>
                        <span className="font-display font-medium text-[14px] tracking-[-0.01em] text-ink truncate group-hover:text-accent-deep transition-colors">
                          {cat.full}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] tabular-nums text-ink-faint shrink-0">
                        {String(count).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </section>

        <section className="grid grid-cols-12 gap-10 pt-12">
          <div className="col-span-12 md:col-span-9">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="kicker mb-2">The list</div>
                <h2 className="headline text-[1.9rem] md:text-[2.3rem]">
                  Latest activity
                </h2>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                Sorted by recent edit
              </div>
            </div>
            <div>
              {rest.map((p, i) => (
                <ProposalRow
                  key={`${p.category}-${p.number}`}
                  proposal={p}
                  index={i}
                />
              ))}
            </div>
          </div>
          <aside className="col-span-12 md:col-span-3 md:border-l md:border-rule md:pl-8">
            <div className="kicker mb-3">Status legend</div>
            <ul className="space-y-3">
              {STATUSES.map((s) => (
                <li
                  key={s}
                  className="flex items-start justify-between gap-3"
                >
                  <StatusPill status={s} />
                  <span className="text-[12px] text-ink-soft text-right max-w-[14ch]">
                    {legendFor(s)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 divider-dashed" />
            <div className="kicker mt-8 mb-3">Reading the archive</div>
            <p className="text-[14px] text-ink-soft leading-[1.65]">
              Every proposal lives at a stable URL. Discussion is threaded one
              level deep. Decisions are kept even when rejected — the record
              matters more than the verdict.
            </p>
            <Link
              href="/about"
              className="mt-4 inline-block link-underline font-mono text-[11px] uppercase tracking-[0.14em]"
            >
              About the archive →
            </Link>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}

function legendFor(s: string): string {
  switch (s) {
    case "Draft":
      return "Sketch, open for shape";
    case "Discussion":
      return "Live argument";
    case "Last Call":
      return "Closing soon";
    case "Accepted":
      return "Approved, not yet shipped";
    case "Implemented":
      return "Live in the world";
    case "Rejected":
      return "Closed, kept for record";
    case "Living":
      return "Continuously revised";
    default:
      return "";
  }
}
