import Link from "next/link";

export function CapitalCard() {
  return (
    <section className="mt-16 sm:mt-20 border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="col-span-12 md:col-span-3">
            <div className="kicker">The other product</div>
            <h2
              className="mt-3 font-display font-semibold tracking-[-0.025em] leading-[1] sm:leading-[0.98]"
              style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)" }}
            >
              Norvyx <span className="text-accent">Capital</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:border-l md:border-rule md:pl-8 lg:pl-10">
            <p className="font-display italic text-ink leading-[1.55] text-[16px] sm:text-[18px] max-w-[55ch]">
              Proposals is the writing test. Capital is the meeting room.
            </p>
            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-[1.7] text-ink-soft max-w-[60ch]">
              When founders are ready to talk to capital that fits, that's the
              other product — a two-sided matching engine for grants,
              accelerators, angels, and VCs. Authors here can opt in to be
              reachable. Investors read here long before they reach out.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 md:border-l md:border-rule md:pl-8 lg:pl-10 flex flex-col gap-3 sm:gap-4">
            {/* TODO: when the "How Proposals and Capital relate" proposal is published, swap the href to its URL. */}
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              Full thesis — coming as a proposal
            </span>
            <Link
              href="/submit"
              className="inline-block link-underline font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:text-accent-deep transition-colors"
            >
              Write a proposal →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
