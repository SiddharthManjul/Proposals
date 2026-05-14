import Link from "next/link";

import { Masthead } from "@/components/Masthead";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { ProposalRow } from "@/components/ProposalRow";
import { CATEGORIES } from "@/lib/proposals";
import { listProposalsSortedByUpdated } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const all = await listProposalsSortedByUpdated();

  return (
    <>
      <Masthead />
      <CategoryNav active="ARCHIVE" />
      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-12 sm:pb-16">
        <header className="pb-8 sm:pb-10 border-b border-rule">
          <div className="kicker mb-3">The archive</div>
          <h1
            className="font-display font-semibold text-ink leading-[1] sm:leading-[0.98] tracking-[-0.03em] sm:tracking-[-0.035em] max-w-[20ch]"
            style={{ fontSize: "clamp(2rem, 5.4vw, 4rem)" }}
          >
            Every <span className="text-accent">proposal</span>, sorted by
            recent edit.
          </h1>
          <p className="mt-5 sm:mt-7 max-w-[60ch] text-[15px] sm:text-[18px] leading-[1.55] text-ink-soft font-display italic">
            <span className="tabular-nums">{all.length}</span> proposal
            {all.length === 1 ? "" : "s"} across {CATEGORIES.length}{" "}
            categories. The whole record, oldest edits at the bottom.
          </p>
        </header>

        <section className="pt-6 sm:pt-10">
          <div className="flex items-end justify-between gap-3 flex-wrap mb-4 sm:mb-6">
            <div className="kicker">All proposals</div>
            <Link
              href="/submit"
              className="font-mono text-[11px] uppercase tracking-[0.14em] link-underline"
            >
              Submit a proposal →
            </Link>
          </div>
          {all.length === 0 ? (
            <p className="py-12 font-display italic text-ink-soft">
              The archive is empty. Submit the first proposal.
            </p>
          ) : (
            all.map((p, i) => (
              <ProposalRow
                key={`${p.category}-${p.number}`}
                proposal={p}
                index={i}
              />
            ))
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
