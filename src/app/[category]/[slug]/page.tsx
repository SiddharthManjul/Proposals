import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { CommentThread } from "@/components/CommentThread";
import { StatusPill } from "@/components/StatusPill";
import { categoryByCode, formatDate, proposalRef } from "@/lib/proposals";
import { getProposalBySlug, listProposals } from "@/db/queries";
import { CommentForm } from "./CommentForm";

export const dynamic = "force-dynamic";

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const cat = categoryByCode(category);
  if (!cat) return notFound();

  const proposal = await getProposalBySlug(cat.code, slug);
  if (!proposal) return notFound();

  const replyCount = proposal.discussion.reduce(
    (n, c) => n + 1 + (c.replies?.length ?? 0),
    0
  );

  const sameCategory = await listProposals({ category: cat.code });
  const related = sameCategory
    .filter((p) => p.slug !== proposal.slug)
    .slice(0, 4);

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
            <CommentThread
              comments={proposal.discussion}
              category={cat.code}
              slug={proposal.slug}
            />
          </div>

          <CommentForm category={cat.code} slug={proposal.slug} />
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
