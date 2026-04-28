import Link from "next/link";
import { CATEGORIES } from "@/lib/proposals";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-rule">
      <div className="border-t-[3px] border-accent" />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-12">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <h3 className="font-display font-semibold text-2xl tracking-[-0.02em]">
              Norvyx <span className="text-accent">Proposals</span>
            </h3>
            <p className="mt-3 text-[14px] text-ink-soft max-w-[40ch] leading-relaxed">
              An archive of proposals, debate, and decisions from the builders'
              web. Edited by builders, hosted in the open, read on weekends.
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="kicker mb-3">Categories</div>
            <ul className="space-y-1.5">
              {CATEGORIES.map((c) => (
                <li key={c.code}>
                  <Link
                    href={`/${c.code.toLowerCase()}`}
                    className="text-[14px] link-underline"
                  >
                    {c.full}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="kicker mb-3">Index</div>
            <ul className="space-y-1.5">
              <li>
                <Link href="/about" className="text-[14px] link-underline">
                  About this archive
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-[14px] link-underline">
                  Submit a proposal
                </Link>
              </li>
              <li>
                <Link href="/" className="text-[14px] link-underline">
                  Latest activity
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-2">
            <div className="kicker mb-3">Colophon</div>
            <p className="text-[13px] text-ink-soft leading-relaxed">
              Set in Space Grotesk and Ubuntu. Built openly. Comments are
              moderated by the community, not by a single team.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          <span>© {new Date().getFullYear()} Norvyx Proposals</span>
          <span>
            Edited from a desk somewhere · No tracking, no autoplay, no AI slop
          </span>
        </div>
      </div>
    </footer>
  );
}
