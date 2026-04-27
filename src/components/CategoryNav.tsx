import Link from "next/link";
import { CATEGORIES } from "@/lib/proposals";

type Props = {
  active?: string;
};

export function CategoryNav({ active }: Props) {
  const items = [
    { code: "ALL", label: "All", href: "/" },
    ...CATEGORIES.map((c) => ({
      code: c.code,
      label: c.label,
      href: `/${c.code.toLowerCase()}`,
    })),
  ];

  return (
    <nav className="border-y border-rule bg-paper sticky top-0 z-20">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
        <ul className="flex items-stretch overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
          {items.map((item) => {
            const isActive =
              (item.code === "ALL" && !active) || item.code === active;
            return (
              <li key={item.code} className="shrink-0">
                <Link
                  href={item.href}
                  className={[
                    "block py-3.5 px-5 text-sm font-mono uppercase tracking-[0.14em] border-r border-rule transition-colors",
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
      </div>
    </nav>
  );
}
