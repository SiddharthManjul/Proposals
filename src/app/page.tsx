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
      <main className="mx-auto max-w-[1180px] px-6 lg:px-10 pt-10 pb-12">
        <section className="grid grid-cols-12 gap-10 pb-12 border-b border-rule">
          <aside className="col-span-12 md:col-span-3 order-2 md:order-1">
            <div className="kicker mb-3">From the editors</div>
            <p className="font-display italic text-ink leading-[1.5] text-[18px]">
              This week: a long argument about Blitz judging, a quiet ship of
              human-readable names in the explorer, and a draft retreat.
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
          <article className="col-span-12 md:col-span-9 order-1 md:order-2 md:border-l md:border-rule md:pl-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                Featured · {proposalRef(featured)}
              </span>
              <StatusPill status={featured.status} />
            </div>
            <h2
              className="font-display font-semibold text-ink leading-[1.02] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)" }}
            >
              <Link
                href={`/${featured.category.toLowerCase()}/${featured.slug}`}
                className="hover:text-accent-deep transition-colors"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.65] text-ink-soft">
              {featured.abstract}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
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
        </section>

        <section className="py-12 border-b border-rule">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <div>
              <div className="kicker mb-2">Sections</div>
              <h2 className="headline text-[1.9rem] md:text-[2.3rem]">
                Five categories. One archive.
              </h2>
            </div>
            <p className="font-display italic text-ink-soft max-w-[42ch] text-[15px]">
              Each category collects a different kind of proposal. The format
              is the same; the audience is not.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-rule">
            {CATEGORIES.map((cat, i) => {
              const count = PROPOSALS.filter(
                (p) => p.category === cat.code
              ).length;
              return (
                <Link
                  key={cat.code}
                  href={`/${cat.code.toLowerCase()}`}
                  className={`group p-6 transition-colors hover:bg-accent-wash ${
                    i < CATEGORIES.length - 1
                      ? "border-b md:border-b-0 md:border-r border-rule"
                      : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {cat.code}
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-ink-faint">
                      {String(count).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-[1.05rem] leading-[1.2] tracking-[-0.01em] text-ink mb-2 group-hover:text-accent-deep transition-colors">
                    {cat.full}
                  </h3>
                  <p className="text-[13px] leading-[1.55] text-ink-soft">
                    {cat.blurb}
                  </p>
                </Link>
              );
            })}
          </div>
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
