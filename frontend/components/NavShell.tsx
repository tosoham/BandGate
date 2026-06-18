"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

type NavItem = { href: string; label: string };

const ITEMS: NavItem[] = [
  { href: "/intake", label: "Intake" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ledger", label: "Promise Ledger" },
  { href: "/audit", label: "Audit Trail" },
];

export function NavShell() {
  const pathname = usePathname();

  // The login screen owns the full viewport — no chrome there.
  if (!pathname || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <nav className="navShell" aria-label="Primary">
      <Link href="/intake" className="navBrand">
        <span className="navBrandMark">
          <Logo size={20} />
        </span>
        <span>BandGate</span>
      </Link>
      <ul>
        {ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={pathname.startsWith(item.href) ? "navLink navLinkActive" : "navLink"}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <form action="/api/auth/logout" method="post" className="navLogout">
        <button type="submit">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign out
        </button>
      </form>
    </nav>
  );
}
