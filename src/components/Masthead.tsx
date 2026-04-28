import Link from "next/link";

const ISSUE_DATE = "Vol. I · No. 17 — April 2026";

export function Masthead() {
  return (
    <header className="border-b border-rule">
      <div className="border-t-[3px] border-accent" />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="flex items-center justify-between pt-3 pb-2 text-[11px] uppercase tracking-[0.16em] text-ink-faint font-mono">
          <span>{ISSUE_DATE}</span>
          <span className="hidden sm:inline">
            A working archive of community proposals
          </span>
          <span className="flex items-center gap-4">
            <Link href="/admin" className="link-underline">
              Admin
            </Link>
            <Link href="/submit" className="link-underline">
              Submit a proposal →
            </Link>
          </span>
        </div>
        <div className="divider-dashed" />
        <div className="flex flex-col items-center pt-7 pb-6 text-center">
          <Link href="/" className="block group">
            <h1
              className="font-blanka text-ink leading-[0.95]"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)" }}
            >
              Norvyx <span className="text-accent">Proposals</span>
            </h1>
          </Link>
          <p className="mt-3 max-w-2xl font-display italic text-[15px] md:text-base text-ink-soft">
            An archive of ideas, debate, and decisions from the people building
            the next layer of the web — starting with Web3, then AI, deeptech,
            and the domains that come next.
          </p>
        </div>
      </div>
    </header>
  );
}
