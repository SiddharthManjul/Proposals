import Link from "next/link";
import { CATEGORIES, PROPOSAL_CATEGORIES } from "@/lib/proposals";

type Props = {
  active?: string;
};

export function CategoryNav({ active }: Props) {
  const proposalItems = [
    { code: "ALL", label: "All", href: "/" },
    ...CATEGORIES.filter((c) =>
      PROPOSAL_CATEGORIES.includes(c.code as (typeof PROPOSAL_CATEGORIES)[number])
    ).map((c) => ({
      code: c.code,
      label: c.label,
      href: `/${c.code.toLowerCase()}`,
    })),
    { code: "ARCHIVE", label: "Archive", href: "/archive" },
  ];

  const updatesItem = { code: "UPDATES", label: "Updates", href: "/updates" };
  const isUpdatesActive = active === "UPDATES" || active === "UP";

  return (
    <nav className="border-y border-rule bg-paper sticky top-0 z-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-stretch">
          <ul className="flex items-stretch flex-1 overflow-x-auto -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <li className="flex-shrink-0 self-center pr-3 sm:pr-5 hidden sm:flex items-center">
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
                  className="flex-1 min-w-[64px] sm:min-w-[80px] lg:min-w-[96px]"
                >
                  <Link
                    href={item.href}
                    className={[
                      "block py-3 px-2 sm:py-3.5 sm:px-4 text-center text-[12px] sm:text-sm font-mono uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-colors",
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
          <div className="hidden md:block w-px bg-rule" />
          <ul className="flex items-stretch flex-shrink-0">
            <li className="flex-shrink-0 self-center px-3 sm:px-5 hidden sm:flex items-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                Updates
              </span>
            </li>
            <li className="min-w-[88px] sm:min-w-[100px] lg:min-w-[112px] border-l border-rule sm:border-l-0">
              <Link
                href={updatesItem.href}
                className={[
                  "block py-3 px-2 sm:py-3.5 sm:px-4 text-center text-[12px] sm:text-sm font-mono uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-colors",
                  isUpdatesActive
                    ? "text-accent bg-accent-wash"
                    : "text-ink-soft hover:text-ink hover:bg-tint",
                ].join(" ")}
              >
                {updatesItem.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
