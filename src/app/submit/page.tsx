import { Masthead } from "@/components/Masthead";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { CATEGORIES } from "@/lib/proposals";

export default function SubmitPage() {
  return (
    <>
      <Masthead />
      <CategoryNav />
      <main className="mx-auto max-w-[1440px] px-6 lg:px-10 pt-12 pb-16">
        <header className="grid grid-cols-12 gap-10 pb-10 border-b border-rule">
          <div className="col-span-12 md:col-span-9">
            <div className="kicker mb-3">Submit a proposal</div>
            <h1
              className="font-display font-semibold text-ink leading-[0.98] tracking-[-0.035em] max-w-[18ch]"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)" }}
            >
              Write it as a <span className="text-accent">draft</span>. Argue
              about it later.
            </h1>
            <p className="mt-7 max-w-[60ch] text-[19px] leading-[1.55] text-ink-soft font-display italic">
              The first version doesn&apos;t need to be right. It needs to be
              specific enough to argue with.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10 pt-12">
          <section className="col-span-12 md:col-span-8">
            <form className="space-y-8">
              <div>
                <div className="kicker mb-3">Step 01 — Category</div>
                <div className="grid grid-cols-1 sm:grid-cols-4 border border-rule">
                  {CATEGORIES.map((c, i) => (
                    <label
                      key={c.code}
                      className={`relative cursor-pointer p-4 hover:bg-accent-wash transition-colors ${
                        i < CATEGORIES.length - 1
                          ? "border-b sm:border-b-0 sm:border-r border-rule"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={c.code}
                        className="sr-only peer"
                        defaultChecked={i === 0}
                      />
                      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent mb-2">
                        {c.code}
                      </div>
                      <div className="font-display font-semibold text-[14px] tracking-[-0.01em] text-ink leading-tight">
                        {c.full}
                      </div>
                      <div
                        aria-hidden
                        className="absolute inset-0 border-2 border-accent opacity-0 peer-checked:opacity-100 pointer-events-none"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="kicker mb-3">Step 02 — Title</div>
                <input
                  type="text"
                  placeholder="A specific verb. A specific noun. Skip the adjectives."
                  className="block w-full bg-paper border-b border-rule focus:border-accent outline-none py-3 text-[1.4rem] font-display tracking-[-0.01em]"
                />
                <p className="mt-2 text-[12px] text-ink-faint italic">
                  Good: &ldquo;Human-readable names in block explorers.&rdquo;{" "}
                  Bad: &ldquo;Empower the next generation of builders.&rdquo;
                </p>
              </div>

              <div>
                <div className="kicker mb-3">Step 03 — Abstract</div>
                <textarea
                  rows={4}
                  placeholder="Two or three sentences. State the problem and the proposed change. Don't sell it."
                  className="block w-full bg-paper border border-rule focus:border-accent outline-none p-4 text-[15px] leading-[1.65] resize-y"
                />
              </div>

              <div>
                <div className="kicker mb-3">Step 04 — Body</div>
                <textarea
                  rows={14}
                  placeholder={`Use headings to break sections.\n\nMotivation\nSpecification\nRationale\nOpen questions\n\nWrite as if a stranger will read this in two years.`}
                  className="block w-full bg-paper border border-rule focus:border-accent outline-none p-4 text-[15px] leading-[1.7] resize-y font-mono"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block">
                  <div className="kicker mb-2">Your name</div>
                  <input
                    type="text"
                    placeholder="As you'd like to be credited"
                    className="block w-full bg-paper border-b border-rule focus:border-accent outline-none py-2 text-[15px]"
                  />
                </label>
                <label className="block">
                  <div className="kicker mb-2">Handle</div>
                  <input
                    type="text"
                    placeholder="ENS, GitHub, or whatever you'd be reached at"
                    className="block w-full bg-paper border-b border-rule focus:border-accent outline-none py-2 text-[15px]"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-rule">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint max-w-[40ch]">
                  Drafts are saved before publication. An editor will reach
                  out within 48 hours.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="border border-rule px-5 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-ink hover:bg-tint transition-colors"
                  >
                    Save draft
                  </button>
                  <button
                    type="button"
                    className="bg-accent text-paper px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] hover:bg-accent-deep transition-colors"
                  >
                    Submit for review →
                  </button>
                </div>
              </div>
            </form>
          </section>

          <aside className="col-span-12 md:col-span-4 md:border-l md:border-rule md:pl-8">
            <div className="kicker mb-3">Before you submit</div>
            <ol className="space-y-4">
              {[
                "Read at least three accepted proposals in your category.",
                "Write the title last. Most first-draft titles are slogans.",
                "Name the failure mode if your proposal is wrong.",
                "Don't pre-answer objections. Let people raise them.",
                "Pick a status of Draft unless you're sure.",
              ].map((tip, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-[11px] text-accent tracking-[0.16em] mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] text-ink leading-[1.6]">
                    {tip}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-10 divider-dashed" />
            <div className="kicker mt-8 mb-3">What happens next</div>
            <p className="text-[14px] text-ink-soft leading-[1.65]">
              An editor reads it for clarity, not for content. If the abstract
              and body match, your draft is published within 48 hours. If they
              don&apos;t, the editor sends notes and asks you to rewrite. They
              never rewrite for you.
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
