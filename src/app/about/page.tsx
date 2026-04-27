import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { CATEGORIES } from "@/lib/proposals";

export default function AboutPage() {
  return (
    <>
      <Masthead />
      <CategoryNav />
      <main className="mx-auto max-w-[1180px] px-6 lg:px-10 pt-12 pb-16">
        <article className="grid grid-cols-12 gap-10">
          <header className="col-span-12 pb-10 border-b border-rule">
            <div className="kicker mb-3">About the archive</div>
            <h1
              className="font-display font-semibold text-ink leading-[0.98] tracking-[-0.035em] max-w-[18ch]"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)" }}
            >
              A working <span className="text-accent">archive</span>, edited in
              the open.
            </h1>
            <p className="mt-7 max-w-[60ch] text-[19px] leading-[1.55] text-ink-soft font-display italic">
              Monad Proposals is where the people building on Monad write down
              the things they want changed, and argue about them in public.
            </p>
          </header>

          <div className="col-span-12 md:col-span-8 pt-8 prose-body">
            <p className="dropcap">
              Most decisions in most ecosystems happen in private channels and
              are announced afterwards. The choices look inevitable in
              retrospect because the alternatives were never written down. This
              archive exists to keep the alternatives.
            </p>
            <p>
              A proposal here can be small. It can be a draft someone abandoned
              halfway. It can be rejected — most of the rejected ones stay,
              because the reasoning matters more than the verdict. The format
              is borrowed from technical RFCs but the tone is closer to a
              community letters page.
            </p>

            <h2>What lives here</h2>
            <p>
              Five categories, all run on the same format. Each proposal has
              an abstract, a body, a status, and a discussion thread. Authors
              are credited. Editors do not rewrite voice.
            </p>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.code}>
                  <strong className="font-display">{c.full} ({c.code}).</strong>{" "}
                  {c.blurb}
                </li>
              ))}
            </ul>

            <h2>How statuses move</h2>
            <p>
              A proposal starts as a <em>Draft</em>. It enters <em>Discussion</em>{" "}
              when the author thinks the shape is roughly right and wants
              feedback. It hits <em>Last Call</em> when discussion has settled
              and the author is asking for objections. Then it becomes{" "}
              <em>Accepted</em>, <em>Rejected</em>, or — for proposals that are
              never finished — <em>Living</em>, meaning the document keeps
              moving.
            </p>
            <p>
              Acceptance is not implementation. <em>Implemented</em> is its own
              status, and it gets used sparingly — only when the thing the
              proposal asked for actually exists in the world.
            </p>

            <h2>What this archive is not</h2>
            <ul>
              <li>
                It is not a vote. Comment counts and reply chains do not
                determine outcomes.
              </li>
              <li>
                It is not an announcement channel. Nothing here is news.
              </li>
              <li>
                It is not moderated by the foundation. Moderation is run by
                community members on a published rotation.
              </li>
            </ul>

            <h2>Editing and credit</h2>
            <p>
              Authors keep editorial control of their own proposals. Editors
              copy-edit for clarity and fix typos. Discussion is preserved
              verbatim, except where moderation removes a comment — in which
              case a placeholder is left in the thread with a one-line reason.
            </p>
            <blockquote>
              The record matters more than the verdict. We keep rejected
              proposals because we want to remember what we considered.
            </blockquote>
          </div>

          <aside className="col-span-12 md:col-span-4 pt-8 md:border-l md:border-rule md:pl-8">
            <div className="kicker mb-3">Three rules</div>
            <ol className="space-y-5">
              {[
                {
                  n: "01",
                  t: "Read before you reply",
                  b: "If your reply could have been written without reading the proposal, don't post it.",
                },
                {
                  n: "02",
                  t: "Argue with the substance",
                  b: "Disagreement is welcome. Performance isn't. Cite specifics, not vibes.",
                },
                {
                  n: "03",
                  t: "Keep the record",
                  b: "Edits are tracked. Deletions need a reason. The archive outlives the argument.",
                },
              ].map((r) => (
                <li key={r.n}>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-mono text-[11px] text-accent tracking-[0.16em]">
                      {r.n}
                    </span>
                    <span className="font-display font-semibold text-[1.05rem] tracking-[-0.01em]">
                      {r.t}
                    </span>
                  </div>
                  <p className="text-[14px] text-ink-soft leading-[1.6] pl-7">
                    {r.b}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-10 divider-dashed" />
            <div className="mt-8">
              <Link
                href="/submit"
                className="inline-block bg-accent text-paper px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] hover:bg-accent-deep transition-colors"
              >
                Submit a proposal →
              </Link>
            </div>
          </aside>
        </article>
      </main>
      <Footer />
    </>
  );
}
