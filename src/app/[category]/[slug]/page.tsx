import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { CommentThread } from "@/components/CommentThread";
import { StatusPill } from "@/components/StatusPill";
import {
  PROPOSALS,
  categoryByCode,
  formatDate,
  getProposal,
  proposalRef,
} from "@/lib/proposals";

export function generateStaticParams() {
  return PROPOSALS.map((p) => ({
    category: p.category.toLowerCase(),
    slug: p.slug,
  }));
}

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const cat = categoryByCode(category);
  const proposal = getProposal(category, slug);
  if (!cat || !proposal) return notFound();

  const replyCount = proposal.discussion.reduce(
    (n, c) => n + 1 + (c.replies?.length ?? 0),
    0
  );

  const related = PROPOSALS.filter(
    (p) => p.category === proposal.category && p.slug !== proposal.slug
  ).slice(0, 4);

  return (
    <>
      <Masthead />
      <CategoryNav active={cat.code} />
      <main className="mx-auto max-w-360 px-6 lg:px-10 pt-10 pb-16">
        {/* Breadcrumb */}
        <nav className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint mb-8 flex items-center gap-2">
          <Link href="/" className="link-underline">
            Archive
          </Link>
          <span>/</span>
          <Link
            href={`/${cat.code.toLowerCase()}`}
            className="link-underline"
          >
            {cat.full}
          </Link>
          <span>/</span>
          <span className="text-ink">{proposalRef(proposal)}</span>
        </nav>

        <article className="grid grid-cols-12 gap-10">
          {/* Title block */}
          <header className="col-span-12 pb-10 border-b border-rule">
            <div className="flex items-center gap-4 mb-5 flex-wrap">
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
                {proposalRef(proposal)}
              </span>
              <StatusPill status={proposal.status} size="md" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                {proposal.readingMinutes} min read
              </span>
            </div>
            <h1
              className="font-display font-semibold text-ink leading-[0.98] tracking-[-0.035em] max-w-[24ch]"
              style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.4rem)" }}
            >
              {proposal.title}
            </h1>
            <p className="mt-7 max-w-[60ch] text-[19px] leading-[1.55] text-ink-soft font-display italic">
              {proposal.abstract}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              <span>
                <span className="text-ink-soft">By</span>{" "}
                <span className="text-ink normal-case tracking-normal text-[13px] font-body">
                  {proposal.author}
                </span>{" "}
                <span className="text-ink-faint">@{proposal.authorHandle}</span>
              </span>
              <span>·</span>
              <span>Posted {formatDate(proposal.posted)}</span>
              <span>·</span>
              <span>Updated {formatDate(proposal.updated)}</span>
            </div>
          </header>

          {/* Body + sidebar */}
          <div className="col-span-12 md:col-span-8 pt-10">
            <div className="prose-body">
              {proposal.body.map((section, i) => (
                <section key={i} className="mb-2">
                  {section.heading ? (
                    <h2>{section.heading}</h2>
                  ) : i === 0 ? null : null}
                  {section.paragraphs?.map((p, j) => {
                    const isFirst = i === 0 && j === 0;
                    return (
                      <p key={j} className={isFirst ? "dropcap" : undefined}>
                        {p}
                      </p>
                    );
                  })}
                  {section.list && (
                    <ul>
                      {section.list.map((li, j) => (
                        <li key={j}>{li}</li>
                      ))}
                    </ul>
                  )}
                  {section.pullquote && (
                    <blockquote>{section.pullquote}</blockquote>
                  )}
                </section>
              ))}
            </div>
          </div>

          <aside className="col-span-12 md:col-span-4 pt-10 md:border-l md:border-rule md:pl-8">
            <div className="kicker mb-3">Metadata</div>
            <dl className="font-mono text-[12px] space-y-2.5">
              <Meta term="Reference" value={proposalRef(proposal)} />
              <Meta term="Category" value={cat.full} />
              <Meta term="Status" value={proposal.status} />
              <Meta term="Author" value={proposal.author} />
              <Meta term="Handle" value={`@${proposal.authorHandle}`} />
              <Meta term="Posted" value={formatDate(proposal.posted)} />
              <Meta term="Last edit" value={formatDate(proposal.updated)} />
              <Meta term="Replies" value={String(replyCount)} />
            </dl>
            <div className="mt-8 divider-dashed" />
            <div className="kicker mt-8 mb-3">Cite this proposal</div>
            <code className="block bg-tint p-3 text-[12px] leading-relaxed break-all">
              norvyx.org/proposals/{cat.code.toLowerCase()}/{proposal.slug}
            </code>
            <div className="kicker mt-8 mb-3">Filed under</div>
            <ul className="space-y-1.5">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.category.toLowerCase()}/${r.slug}`}
                    className="text-[14px] link-underline"
                  >
                    <span className="font-mono text-[11px] text-accent uppercase tracking-[0.14em] mr-2">
                      {proposalRef(r)}
                    </span>
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </article>

        {/* Discussion */}
        <section className="mt-16 pt-10 border-t border-rule">
          <div className="flex items-end justify-between mb-2 flex-wrap gap-3">
            <div>
              <div className="kicker mb-2">The conversation</div>
              <h2 className="headline text-[2rem] md:text-[2.4rem]">
                {replyCount === 0
                  ? "No replies yet"
                  : replyCount === 1
                    ? "One reply"
                    : `${replyCount} replies`}
              </h2>
            </div>
            <p className="font-display italic text-ink-soft text-[15px] max-w-[42ch]">
              Read first, then reply. Disagreement is welcome — performance
              isn&apos;t.
            </p>
          </div>

          <div className="mt-8">
            <CommentThread comments={proposal.discussion} />
          </div>

          {/* Reply form */}
          <div className="mt-10 border border-rule p-6 md:p-8">
            <div className="kicker mb-3">Add to the record</div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                    Your name
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Reema Khan"
                    className="mt-1 block w-full bg-paper border-b border-rule focus:border-accent outline-none py-2 text-[15px]"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                    Handle
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. reema.eth"
                    className="mt-1 block w-full bg-paper border-b border-rule focus:border-accent outline-none py-2 text-[15px]"
                  />
                </label>
              </div>
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                  Reply
                </span>
                <textarea
                  rows={6}
                  placeholder="State your position. Cite specifics. Don't argue with the headline."
                  className="mt-1 block w-full bg-paper border border-rule focus:border-accent outline-none p-3 text-[15px] leading-[1.6] resize-y"
                />
              </label>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                  Replies are public, edited only for typos, and kept
                  permanently
                </p>
                <button
                  type="button"
                  className="bg-accent text-paper px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] hover:bg-accent-deep transition-colors"
                >
                  Post reply →
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-rule-soft pb-2.5">
      <dt className="text-ink-faint uppercase tracking-[0.12em]">{term}</dt>
      <dd className="text-ink text-right">{value}</dd>
    </div>
  );
}
