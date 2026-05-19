import Link from "next/link";
import { CATEGORIES, PROPOSAL_CATEGORIES } from "@/lib/proposals";

type Props = {
  active?: string;
};

export function CategoryNav({ active }: Props) {
  const proposalItems = [
    { code: "ALL", label: "All", href: "/" },
    ...CATEGORIES.filter((c) =>
      (PROPOSAL_CATEGORIES as readonly string[]).includes(c.code)
    ).map((c) => ({
      code: c.code,
      label: c.label,
      href: `/${c.code.toLowerCase()}`,
    })),
    { code: "ARCHIVE", label: "Archive", href: "/archive" },
  ];

  const isUpdatesActive = active === "UPDATES" || active === "UP";
  const isProposalsActive = !isUpdatesActive;

  return (
    <nav className="border-b border-rule bg-paper sticky top-0 z-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* MOBILE — Top-level Proposals / Updates split */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 border-t border-rule -mx-4 sm:-mx-6">
            <Link
              href="/"
              className={[
                "block py-3.5 text-center text-[13px] font-mono uppercase tracking-[0.16em] border-r border-rule transition-colors",
                isProposalsActive
                  ? "text-accent bg-accent-wash"
                  : "text-ink-soft hover:text-ink hover:bg-tint",
              ].join(" ")}
              aria-current={isProposalsActive ? "page" : undefined}
            >
              Proposals
            </Link>
            <Link
              href="/updates"
              className={[
                "block py-3.5 text-center text-[13px] font-mono uppercase tracking-[0.16em] transition-colors",
                isUpdatesActive
                  ? "text-accent bg-accent-wash"
                  : "text-ink-soft hover:text-ink hover:bg-tint",
              ].join(" ")}
              aria-current={isUpdatesActive ? "page" : undefined}
            >
              Updates
            </Link>
          </div>
          {/* MOBILE — Category pills, only when on the Proposals side */}
          {isProposalsActive && (
            <div className="border-t border-rule-soft -mx-4 sm:-mx-6">
              <div className="flex justify-center overflow-x-auto no-scrollbar">
                <ul className="flex items-stretch">
                  {proposalItems.map((item, i) => {
                    const isActive =
                      (item.code === "ALL" && !active) || item.code === active;
                    const isLast = i === proposalItems.length - 1;
                    return (
                      <li key={item.code} className="flex-shrink-0">
                        <Link
                          href={item.href}
                          className={[
                            "block py-2.5 px-2.5 text-center text-[10.5px] font-mono uppercase tracking-[0.12em] transition-colors whitespace-nowrap",
                            isLast ? "" : "border-r border-rule-soft",
                            isActive
                              ? "text-accent"
                              : "text-ink-soft hover:text-ink",
                          ].join(" ")}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP — Single-row with Proposals/Updates groups */}
        <div className="hidden md:block border-t border-rule">
          <div className="flex items-stretch">
            <ul className="flex items-stretch flex-1 overflow-x-auto">
              <li className="flex-shrink-0 self-center pr-5 flex items-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  Proposals
                </span>
              </li>
              {proposalItems.map((item, i) => {
                const isActive =
                  (item.code === "ALL" && !active) || item.code === active;
                const isLast = i === proposalItems.length - 1;
                return (
                  <li
                    key={item.code}
                    className="flex-1 min-w-[80px] lg:min-w-[96px]"
                  >
                    <Link
                      href={item.href}
                      className={[
                        "block py-3.5 px-4 text-center text-sm font-mono uppercase tracking-[0.14em] transition-colors",
                        isLast ? "" : "border-r border-rule",
                        isActive
                          ? "text-accent bg-accent-wash"
                          : "text-ink-soft hover:text-ink hover:bg-tint",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="w-px bg-rule" />
            <ul className="flex items-stretch flex-shrink-0">
              <li className="flex-shrink-0 self-center px-5 flex items-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  Updates
                </span>
              </li>
              <li className="min-w-[100px] lg:min-w-[112px]">
                <Link
                  href="/updates"
                  className={[
                    "block py-3.5 px-4 text-center text-sm font-mono uppercase tracking-[0.14em] transition-colors",
                    isUpdatesActive
                      ? "text-accent bg-accent-wash"
                      : "text-ink-soft hover:text-ink hover:bg-tint",
                  ].join(" ")}
                >
                  Updates
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
