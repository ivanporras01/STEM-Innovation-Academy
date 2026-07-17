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
  const isCosmicRoute = !pathname.startsWith("/api");

  const dashboardLabel = "NOVA Portal";
  const onPortal = pathname.startsWith("/dashboard");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors",
        isCosmicRoute ? "nova-glass-nav" : "nova-glass-nav-light"
      )}
    >
      <div className="nova-container flex h-[72px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="NOVA home">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-nova-cyan to-nova-blue text-lg text-white shadow-[0_0_20px_rgba(0,180,216,0.45)] transition group-hover:shadow-[0_0_28px_rgba(0,180,216,0.6)]">
            ✦
          </span>
          <span className="flex flex-col leading-tight">
            <strong
              className={cn(
                "text-sm font-bold",
                isCosmicRoute ? "text-white" : "text-nova-deep-blue"
              )}
            >
              NOVA
            </strong>
            <small
              className={cn(
                "text-[10px]",
                isCosmicRoute ? "text-nova-cyan-light/80" : "text-nova-gray"
              )}
            >
              STEM Innovation Academy
            </small>
          </span>
        </Link>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={cn(
              "block h-0.5 w-6 transition",
              isCosmicRoute ? "bg-white" : "bg-nova-deep-blue",
              menuOpen && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 transition",
              isCosmicRoute ? "bg-white" : "bg-nova-deep-blue",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 transition",
              isCosmicRoute ? "bg-white" : "bg-nova-deep-blue",
              menuOpen && "-translate-y-2 -rotate-45"
            )}
          />
        </button>

        <nav
          className={cn(
            "absolute left-0 right-0 top-[72px] flex flex-col gap-1 border-b p-4 shadow-nova lg:static lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none",
            isCosmicRoute
              ? "border-white/10 bg-[#0a1628]/70 backdrop-blur-xl lg:bg-transparent"
              : "border-nova-light-gray bg-white lg:bg-transparent",
            !menuOpen && "hidden lg:flex"
          )}
        >
          {!isDashboard &&
            NOVA_PUBLIC_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  isCosmicRoute
                    ? "text-white/85 hover:bg-white/10 hover:text-nova-cyan-light"
                    : "text-nova-dark-gray hover:bg-nova-off-white hover:text-nova-cyan"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

          {session ? (
            <>
              {!onPortal && (
                <Link
                  href={dashboardHref}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    isCosmicRoute
                      ? "text-white/85 hover:bg-white/10 hover:text-nova-cyan-light"
                      : "text-nova-dark-gray hover:bg-nova-off-white hover:text-nova-cyan"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {dashboardLabel}
                </Link>
              )}
              <Link
                href="/api/auth/signout"
                className="nova-btn-primary nova-btn-glow ml-0 mt-2 lg:ml-2 lg:mt-0"
                onClick={() => setMenuOpen(false)}
              >
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="nova-btn-primary nova-btn-glow ml-0 mt-2 lg:ml-2 lg:mt-0"
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
