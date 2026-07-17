"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { dashboardRoutes } from "@/lib/auth.config";
import { NOVA_PUBLIC_NAV } from "@/lib/nova-nav";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const dashboardHref = session?.user?.role
    ? dashboardRoutes[session.user.role]
    : "/login";

  const isDashboard = pathname.startsWith("/dashboard");
  const dashboardLabel =
    session?.user?.role === "STUDENT" ? "Explorer Dashboard" : "Dashboard";

  return (
    <header className="sticky top-0 z-50 border-b border-nova-light-gray/80 bg-white/95 backdrop-blur-md">
      <div className="nova-container flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="NOVA home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-nova-cyan to-nova-blue text-lg text-white">
            ✦
          </span>
          <span className="flex flex-col leading-tight">
            <strong className="text-sm font-bold text-nova-deep-blue">NOVA</strong>
            <small className="text-[10px] text-nova-gray">STEM Innovation Academy</small>
          </span>
        </Link>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={cn("block h-0.5 w-6 bg-nova-deep-blue transition", menuOpen && "translate-y-2 rotate-45")} />
          <span className={cn("block h-0.5 w-6 bg-nova-deep-blue transition", menuOpen && "opacity-0")} />
          <span className={cn("block h-0.5 w-6 bg-nova-deep-blue transition", menuOpen && "-translate-y-2 -rotate-45")} />
        </button>

        <nav
          className={cn(
            "absolute left-0 right-0 top-[72px] flex flex-col gap-1 border-b border-nova-light-gray bg-white p-4 shadow-nova lg:static lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none",
            !menuOpen && "hidden lg:flex"
          )}
        >
          {!isDashboard &&
            NOVA_PUBLIC_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-nova-dark-gray transition hover:bg-nova-off-white hover:text-nova-cyan"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

          {session ? (
            <>
              <Link
                href={dashboardHref}
                className="rounded-lg px-3 py-2 text-sm font-medium text-nova-dark-gray transition hover:bg-nova-off-white hover:text-nova-cyan"
                onClick={() => setMenuOpen(false)}
              >
                {dashboardLabel}
              </Link>
              <Link
                href="/api/auth/signout"
                className="nova-btn-primary ml-0 mt-2 lg:ml-2 lg:mt-0"
                onClick={() => setMenuOpen(false)}
              >
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="nova-btn-primary ml-0 mt-2 lg:ml-2 lg:mt-0"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
