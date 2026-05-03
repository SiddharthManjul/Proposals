import { Masthead } from "@/components/Masthead";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { SubmitForm } from "./SubmitForm";

export default function SubmitPage() {
  return (
    <>
      <Masthead />
      <CategoryNav />
      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-12 sm:pb-16">
        <header className="grid grid-cols-12 gap-6 md:gap-10 pb-8 sm:pb-10 border-b border-rule">
          <div className="col-span-12 md:col-span-9">
            <div className="kicker mb-3">Submit a proposal</div>
            <h1
              className="font-display font-semibold text-ink leading-[1] sm:leading-[0.98] tracking-[-0.03em] sm:tracking-[-0.035em] max-w-[18ch]"
              style={{ fontSize: "clamp(2rem, 6vw, 4.6rem)" }}
            >
              Write it as a <span className="text-accent">draft</span>. Argue
              about it later.
            </h1>
            <p className="mt-5 sm:mt-7 max-w-[60ch] text-[16px] sm:text-[19px] leading-[1.55] text-ink-soft font-display italic">
              The first version doesn&apos;t need to be right. It needs to be
              specific enough to argue with.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8 md:gap-10 pt-8 sm:pt-12">
          <section className="col-span-12 md:col-span-8">
            <SubmitForm />
          </section>

          <aside className="col-span-12 md:col-span-4 pt-2 md:pt-0 md:border-l md:border-rule md:pl-8">
            <div className="kicker mb-3">Before you submit</div>
            <ol className="space-y-4">
              {[
                "Read at least three accepted proposals in your category.",
                "Write the title last. Most first-draft titles are slogans.",
                "Name the failure mode if your proposal is wrong.",
                "Don't pre-answer objections. Let people raise them.",
                "All submissions land as Draft and are moved by an editor.",
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
              An editor reads it for clarity, not for content. Status moves
              from Draft → Discussion → Last Call → Accepted/Rejected as the
              conversation develops. The thread stays threaded one level deep.
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
