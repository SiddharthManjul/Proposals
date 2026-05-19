import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { ProposalRow } from "@/components/ProposalRow";
import { FilteredProposalsList } from "@/components/FilteredProposalsList";
import { HeroSearchBar, HeroSearchHints } from "@/components/HeroSearchBar";
import { StatusPill } from "@/components/StatusPill";
import { KindBadge } from "@/components/KindBadge";
import {
  CATEGORIES,
  STATUSES,
  proposalRef,
  shortDate,
  type Proposal,
  type Status,
} from "@/lib/proposals";
import { listProposalsSortedByUpdated } from "@/db/queries";

export const dynamic = "force-dynamic";

const MOBILE_LATEST_LIMIT = 5;
const DESKTOP_PAGE_SIZE = 8;

export default async function HomePage() {
  const [sorted, recentUpdates] = await Promise.all([
    listProposalsSortedByUpdated({ onlyProposals: true }),
    listProposalsSortedByUpdated({ onlyUpdates: true }),
  ]);

  if (sorted.length === 0) {
    return <EmptyState />;
  }

  const featured = sorted[0];
  const rest = sorted.slice(1);

  const liveCount = sorted.filter(
    (p) => p.status === "Execution" || p.status === "MVP"
  ).length;
  const totalReplies = sorted.reduce(
    (n, p) =>
      n +
      p.discussion.reduce((m, c) => m + 1 + (c.replies?.length ?? 0), 0),
    0
  );

  return (
    <>
      <Masthead />
      <CategoryNav />
      <main className="mx-auto max-w-360 px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-10 sm:pb-12">
        {/* MOBILE LAYOUT — Featured → Latest activity → distinct break → editor / sections / lifecycle */}
        <div className="md:hidden">
          <FeaturedArticle p={featured} />

          <section className="mt-10 pt-8 border-t border-rule">
            <div className="mb-5">
              <div className="kicker mb-2">The list</div>
              <h2 className="headline text-[1.6rem]">Latest activity</h2>
            </div>
            <FilteredProposalsList proposals={rest} pageSize={6} />
          </section>

          {/* Strong distinction between the feed and the supporting matter */}
          <div className="mt-12 mb-8">
            <div className="border-t-[3px] border-accent" />
            <div className="mt-3 kicker">Also in this issue</div>
          </div>

          <section className="space-y-10">
            <div>
              <div className="kicker mb-3">From the editors</div>
              <p className="font-display italic text-ink leading-normal text-[17px]">
                The archive of record for founders thinking out loud, the
                communities holding them up, and the investors quietly reading
                before they reach out.
              </p>
              <div className="mt-5 divider-dashed" />
              <dl className="mt-5 space-y-3 font-mono text-[12px] uppercase tracking-[0.12em]">
                <div className="flex justify-between">
                  <dt className="text-ink-faint">Open proposals</dt>
                  <dd className="text-ink tabular-nums">{sorted.length}</dd>
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
            </div>

            <SectionsBlock proposals={sorted} />

            <div>
              <div className="kicker mb-3">Lifecycle</div>
              <ul className="space-y-3">
                {STATUSES.map((s) => (
                  <li
                    key={s}
                    className="flex items-start justify-between gap-3"
                  >
                    <StatusPill status={s} />
                    <span className="text-[12px] text-ink-soft text-right max-w-[18ch]">
                      {legendFor(s)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 divider-dashed" />
              <div className="kicker mt-6 mb-3">Reading the archive</div>
              <p className="text-[14px] text-ink-soft leading-[1.65]">
                Every proposal lives at a stable URL. Status reflects where the
                venture is, not where the document is.
              </p>
              <Link
                href="/about"
                className="mt-4 inline-block link-underline font-mono text-[11px] uppercase tracking-[0.14em]"
              >
                About the archive →
              </Link>
            </div>
          </section>
        </div>

        {/* DESKTOP HERO SEARCH — prominent above the editorial grid */}
        <section className="hidden md:block pb-8 sm:pb-10 border-b border-rule">
          <div className="kicker mb-3">Find a proposal or update</div>
          <HeroSearchBar
            proposalCount={sorted.length}
            updateCount={recentUpdates.length}
          />
          <HeroSearchHints />
        </section>

        {/* DESKTOP LAYOUT — unchanged */}
        <section className="hidden md:grid grid-cols-12 gap-8 md:gap-10 pt-8 sm:pt-10 pb-10 sm:pb-12 border-b border-rule">
          <aside className="col-span-12 md:col-span-3 min-w-0">
            <div className="kicker mb-3">From the editors</div>
            <p className="font-display italic text-ink leading-normal text-[18px]">
              The archive of record for founders thinking out loud, the
              communities holding them up, and the investors quietly reading
              before they reach out.
            </p>
            <div className="mt-6 divider-dashed" />
            <dl className="mt-6 space-y-3 font-mono text-[12px] uppercase tracking-[0.12em]">
              <div className="flex justify-between">
                <dt className="text-ink-faint">Open proposals</dt>
                <dd className="text-ink tabular-nums">{sorted.length}</dd>
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
          <article className="col-span-12 md:col-span-5 min-w-0 md:border-l md:border-rule md:pl-8">
            <FeaturedArticleInner p={featured} />
          </article>
          <aside className="col-span-12 md:col-span-4 min-w-0 md:border-l md:border-rule md:pl-8">
            <SectionsBlock proposals={sorted} />
          </aside>
        </section>

        <section className="hidden md:grid grid-cols-12 gap-8 md:gap-10 pt-10 sm:pt-12">
          <div className="col-span-12 md:col-span-9 min-w-0">
            <div className="flex items-end justify-between gap-3 flex-wrap mb-5 sm:mb-6">
              <div>
                <div className="kicker mb-2">The list</div>
                <h2 className="headline text-[1.6rem] sm:text-[1.9rem] md:text-[2.3rem]">
                  Latest activity
                </h2>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                Sorted by recent edit
              </div>
            </div>
            <FilteredProposalsList
              proposals={rest}
              pageSize={DESKTOP_PAGE_SIZE}
            />
          </div>
          <aside className="col-span-12 md:col-span-3 min-w-0 md:border-l md:border-rule md:pl-8">
            {recentUpdates.length > 0 && (
              <>
                <div className="flex items-baseline justify-between mb-3">
                  <div className="kicker">From updates</div>
                  <Link
                    href="/updates"
                    className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent hover:text-accent-deep transition-colors"
                  >
                    See all →
                  </Link>
                </div>
                <ul className="space-y-3 mb-8">
                  {recentUpdates.slice(0, 4).map((u) => (
                    <li
                      key={`${u.category}-${u.number}`}
                      className="border-b border-rule-soft pb-3 last:border-b-0"
                    >
                      <Link
                        href={`/${u.category.toLowerCase()}/${u.slug}`}
                        className="block hover:text-accent transition-colors"
                      >
                        {u.source && (
                          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent mb-1">
                            {u.source}
                          </div>
                        )}
                        <div className="text-[13px] text-ink leading-tight font-display font-medium">
                          {u.title}
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint mt-1.5">
                          {shortDate(u.updated)}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="divider-dashed mb-8" />
              </>
            )}
            <div className="kicker mb-3">Lifecycle</div>
            <ul className="space-y-3">
              {STATUSES.map((s) => (
                <li
                  key={s}
                  className="flex items-start justify-between gap-3"
                >
                  <StatusPill status={s} />
                  <span className="text-[12px] text-ink-soft text-right max-w-[16ch]">
                    {legendFor(s)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 divider-dashed" />
            <div className="kicker mt-8 mb-3">Reading the archive</div>
            <p className="text-[14px] text-ink-soft leading-[1.65]">
              Every proposal lives at a stable URL. Status reflects where the
              venture is, not where the document is.
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

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
}: {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}) {
  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);
  const prevHref = currentPage <= 2 ? "/" : `/?page=${currentPage - 1}`;
  const nextHref = `/?page=${currentPage + 1}`;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Latest activity pages"
      className="mt-8 pt-6 border-t border-rule flex items-center justify-between gap-4 flex-wrap"
    >
      {hasPrev ? (
        <Link
          href={prevHref}
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:text-accent transition-colors"
        >
          ← Previous
        </Link>
      ) : (
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint cursor-default">
          ← Previous
        </span>
      )}
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint tabular-nums">
        {firstItem}–{lastItem} of {totalItems} · Page {currentPage} of {totalPages}
      </span>
      {hasNext ? (
        <Link
          href={nextHref}
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:text-accent transition-colors"
        >
          Next →
        </Link>
      ) : (
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint cursor-default">
          Next →
        </span>
      )}
    </nav>
  );
}

function FeaturedArticle({ p }: { p: Proposal }) {
  return (
    <article>
      <FeaturedArticleInner p={p} />
    </article>
  );
}

function FeaturedArticleInner({ p }: { p: Proposal }) {
  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Featured · {proposalRef(p)}
        </span>
        <KindBadge kind={p.kind} />
        <StatusPill status={p.status} />
      </div>
      <h2
        className="font-display font-semibold text-ink leading-[1.04] tracking-[-0.03em] wrap-anywhere hyphens-auto"
        style={{ fontSize: "clamp(1.65rem, 3.2vw, 2.6rem)" }}
      >
        <Link
          href={`/${p.category.toLowerCase()}/${p.slug}`}
          className="hover:text-accent-deep transition-colors"
        >
          {p.title}
        </Link>
      </h2>
      <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-ink-soft wrap-anywhere">
        {p.abstract}
      </p>
      <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
        <span>By {p.author}</span>
        <span className="hidden sm:inline">·</span>
        <span>{shortDate(p.updated)}</span>
        <span className="hidden sm:inline">·</span>
        <span>{p.readingMinutes} min read</span>
        <span className="hidden sm:inline">·</span>
        <Link
          href={`/${p.category.toLowerCase()}/${p.slug}`}
          className="text-accent link-underline"
        >
          Continue reading →
        </Link>
      </div>
    </>
  );
}

function SectionsBlock({ proposals }: { proposals: Proposal[] }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <div className="kicker">Sections</div>
        <span className="font-mono text-[11px] tabular-nums text-ink-faint">
          {String(CATEGORIES.length).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-display font-semibold text-[1.3rem] sm:text-[1.4rem] leading-[1.05] tracking-[-0.02em] mb-1">
        Five categories. One archive.
      </h3>
      <p className="font-display italic text-ink-soft text-[14px] leading-[1.55] mb-5">
        Each category collects a different kind of proposal. The format is the
        same; the audience is not.
      </p>
      <ul className="border-t border-rule">
        {CATEGORIES.map((cat) => {
          const count = proposals.filter((p) => p.category === cat.code).length;
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
    </div>
  );
}

function EmptyState() {
  return (
    <>
      <Masthead />
      <CategoryNav />
      <main className="mx-auto max-w-360 px-4 sm:px-6 lg:px-10 pt-20 pb-16 text-center">
        <div className="kicker mb-3 justify-center">The archive is empty</div>
        <h1
          className="font-display font-semibold text-ink leading-[0.98] tracking-[-0.035em] mx-auto max-w-[18ch]"
          style={{ fontSize: "clamp(2rem, 5.4vw, 4rem)" }}
        >
          Nothing here <span className="text-accent">yet</span>.
        </h1>
        <p className="mt-6 mx-auto max-w-[55ch] text-[15px] sm:text-[17px] leading-[1.6] text-ink-soft font-display italic">
          Submit the first proposal, or run{" "}
          <code className="font-mono text-[14px]">npm run db:seed</code> to load
          the sample archive.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/submit"
            className="bg-accent text-paper px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] hover:bg-accent-deep transition-colors"
          >
            Submit a proposal →
          </Link>
          <Link
            href="/about"
            className="border border-rule px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] hover:bg-tint transition-colors"
          >
            About the archive
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function legendFor(s: Status): string {
  switch (s) {
    case "Idea":
      return "On the page, not built";
    case "Execution":
      return "Being built now";
    case "MVP":
      return "First version, real users";
    case "PMF":
      return "Found its audience";
    case "Production":
      return "Live, at scale";
  }
}
