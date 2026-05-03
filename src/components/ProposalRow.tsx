import Link from "next/link";
import { Proposal, proposalRef, shortDate } from "@/lib/proposals";
import { StatusPill } from "./StatusPill";

type Props = {
  proposal: Proposal;
  index?: number;
  showCategory?: boolean;
};

export function ProposalRow({ proposal, index, showCategory = true }: Props) {
  const href = `/${proposal.category.toLowerCase()}/${proposal.slug}`;
  const replyCount = countComments(proposal.discussion);

  return (
    <article className="group border-b border-rule last:border-b-0">
      <Link
        href={href}
        className="block py-5 sm:py-7 grid grid-cols-12 gap-3 sm:gap-4 transition-colors hover:bg-tint/60"
      >
        <div className="col-span-12 md:col-span-1 flex md:block items-center gap-3">
          <span className="font-mono text-[12px] text-ink-faint tabular-nums">
            {typeof index === "number"
              ? String(index + 1).padStart(2, "0")
              : proposalRef(proposal)}
          </span>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            {showCategory && (
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {proposalRef(proposal)}
              </span>
            )}
            <StatusPill status={proposal.status} />
          </div>
          <h2 className="font-display font-semibold text-ink leading-[1.12] tracking-[-0.02em] text-[1.25rem] sm:text-[1.55rem] md:text-[1.7rem] group-hover:text-accent-deep transition-colors">
            {proposal.title}
          </h2>
          <p className="mt-2 sm:mt-3 max-w-[58ch] text-[14px] sm:text-[15px] leading-[1.6] text-ink-soft">
            {proposal.abstract}
          </p>
        </div>
        <div className="col-span-12 md:col-span-3 md:text-right flex md:block flex-wrap items-baseline gap-x-3 gap-y-1">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            {shortDate(proposal.updated)}
          </div>
          <div className="text-[14px] text-ink md:mt-1">{proposal.author}</div>
          <div className="md:mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            {replyCount === 0
              ? "No replies"
              : replyCount === 1
                ? "1 reply"
                : `${replyCount} replies`}{" "}
            · {proposal.readingMinutes} min read
          </div>
        </div>
      </Link>
    </article>
  );
}

function countComments(comments: Proposal["discussion"]): number {
  return comments.reduce(
    (total, c) => total + 1 + (c.replies?.length ?? 0),
    0
  );
}
