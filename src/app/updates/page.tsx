import Link from "next/link";

import { Masthead } from "@/components/Masthead";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { UpdateRow } from "@/components/UpdateRow";
import { listProposalsSortedByUpdated } from "@/db/queries";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;

export default async function UpdatesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const all = await listProposalsSortedByUpdated({ onlyUpdates: true });

  const { page: pageParam } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const currentPage = Math.min(
    totalPages,
    Math.max(1, parseInt(pageParam ?? "1", 10) || 1)
  );
  const paged = all.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <>
      <Masthead />
      <CategoryNav active="UPDATES" />
      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-12 sm:pb-16">
        <header className="pb-8 sm:pb-10 border-b border-rule">
          <div className="flex items-center gap-3 mb-3">
            <div className="kicker">The wire</div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent border border-accent px-2 py-0.5">
              Updates
            </span>
          </div>
          <h1
            className="font-display font-semibold text-ink leading-[1] sm:leading-[0.98] tracking-[-0.03em] sm:tracking-[-0.035em] max-w-[22ch]"
            style={{ fontSize: "clamp(2rem, 5.4vw, 4rem)" }}
          >
            <span className="text-accent">News and announcements</span> from the
            startup ecosystem.
          </h1>
          <p className="mt-5 sm:mt-7 max-w-[60ch] text-[15px] sm:text-[18px] leading-[1.55] text-ink-soft font-display italic">
            Cohort applications, summit dates, list publications, program
            launches. The factual record of what is happening, sourced from the
            people running it.
          </p>
        </header>

        <section className="pt-6 sm:pt-10">
          <div className="flex items-end justify-between gap-3 flex-wrap mb-4 sm:mb-6">
            <div>
              <div className="kicker mb-1">All updates</div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                Sorted by recent edit ·{" "}
                <span className="tabular-nums">{all.length}</span> update
                {all.length === 1 ? "" : "s"}
              </p>
            </div>
            <Link
              href="/submit?kind=update"
              className="font-mono text-[11px] uppercase tracking-[0.14em] link-underline"
            >
              Submit an update →
            </Link>
          </div>
          {all.length === 0 ? (
            <p className="py-12 font-display italic text-ink-soft">
              No updates yet. Submit the first one.
            </p>
          ) : (
            paged.map((u, i) => (
              <UpdateRow
                key={`${u.category}-${u.number}`}
                update={u}
                index={(currentPage - 1) * PAGE_SIZE + i}
              />
            ))
          )}
          {totalPages > 1 && (
            <UpdatesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={PAGE_SIZE}
              totalItems={all.length}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function UpdatesPagination({
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
  const prevHref =
    currentPage <= 2 ? "/updates" : `/updates?page=${currentPage - 1}`;
  const nextHref = `/updates?page=${currentPage + 1}`;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Updates pages"
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
        {firstItem}–{lastItem} of {totalItems} · Page {currentPage} of{" "}
        {totalPages}
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
