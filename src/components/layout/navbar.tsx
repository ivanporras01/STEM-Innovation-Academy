"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { dashboardRoutes } from "@/lib/auth.config";
import { getNovaHeaderNav, getNovaStemHubNav } from "@/lib/nova-nav";
import { getLocaleFromPath } from "@/lib/locale";
import { NOVA_SCHOOL, getNavBrandContext } from "@/lib/novahub-brand";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { StemHubNavMenu } from "@/components/layout/stem-hub-nav-menu";
import { NovaLogo } from "@/components/ui/nova-logo-mark";

const HEADER_HEIGHT = "h-[88px]";
const MOBILE_NAV_TOP = "top-[88px]";

/** Horizontal nav from lg+ — header container is wider so all tabs fit at ~1280px */
const DESKTOP_NAV = "hidden lg:flex";
const AI_TUTORING_PATH = "/ai-tutoring";

const COMING_SOON_BADGE =
  "rounded-full border border-nova-orange/40 bg-nova-orange/10 px-1.5 py-0.5 font-bold uppercase tracking-wide text-nova-orange";

function isActiveNav(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const locale = getLocaleFromPath(pathname);
  const headerNav = getNovaHeaderNav(locale);
  const stemHubNav = getNovaStemHubNav(locale);
  const brand = getNavBrandContext(pathname);

  const dashboardHref = session?.user?.role ? dashboardRoutes[session.user.role] : "/login";
  const isDashboard = pathname.startsWith("/dashboard");
  const onPortal = pathname.startsWith("/dashboard");

  const closeMobile = () => setMenuOpen(false);

  return (
    <header className="nova-glass-nav sticky top-0 z-50 transition-colors">
      <div
        className={cn(
          "nova-header-container nova-header-bar grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1.5 sm:gap-2 lg:gap-2.5",
          HEADER_HEIGHT,
        )}
      >
        {/* Brand lockup stays legible without competing with navigation at narrow widths. */}
        <div className="nova-header-brand relative z-20 shrink-0">
          <Link
            href={brand.homeHref}
            className="group flex items-center gap-2 sm:gap-2.5"
            aria-label={`${brand.name} — ${brand.homeLabel}`}
          >
            <NovaLogo
              size="md"
              showText={false}
              className="transition group-hover:[&_circle:last-of-type]:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]"
            />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="whitespace-nowrap text-sm font-bold tracking-tight text-white sm:text-base">NOVA</span>
              <span className="mt-1 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em] text-nova-cyan-light/80 sm:text-[10px]">
                STEM HUB
              </span>
            </span>
          </Link>
        </div>

        {/* Primary tabs — School → College → Language → AI Tutoring → NOVA Resources. */}
        {!isDashboard && (
          <nav
            className={cn(
              DESKTOP_NAV,
              "nova-header-primary relative z-10 min-w-0 items-center justify-center",
            )}
            aria-label="NOVA products"
          >
            <div className="flex flex-wrap items-center justify-center gap-0.5 lg:gap-1">
              {headerNav.map((link) => {
                if (link.kind === "resources") {
                  return <StemHubNavMenu key={link.href} hub={stemHubNav} variant="desktop" />;
                }

                const active = isActiveNav(pathname, link.href);
                const isAiTutoring = link.href === AI_TUTORING_PATH;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex shrink-0 rounded-lg px-2.5 text-xs font-medium transition 2xl:px-3 2xl:text-sm",
                      isAiTutoring
                        ? "flex-col items-center gap-0.5 py-1.5"
                        : "items-center whitespace-nowrap py-2",
                      active
                        ? "bg-nova-cyan/15 text-nova-cyan-light shadow-[inset_0_0_0_1px_rgba(0,180,216,0.35)]"
                        : "text-white/85 hover:bg-white/10 hover:text-nova-cyan-light",
                    )}
                  >
                    <span className={isAiTutoring ? "whitespace-nowrap leading-tight" : undefined}>
                      {link.label}
                    </span>
                    {isAiTutoring && (
                      <span className={cn(COMING_SOON_BADGE, "text-[8px] leading-none")}>Coming Soon</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        {/* Spacer when dashboard hides center nav */}
        {isDashboard && <div className="min-w-0" aria-hidden />}

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="col-start-3 row-start-1 flex shrink-0 flex-col gap-1.5 rounded-lg p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nova-cyan lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={cn("block h-0.5 w-6 bg-white transition", menuOpen && "translate-y-2 rotate-45")} />
          <span className={cn("block h-0.5 w-6 bg-white transition", menuOpen && "opacity-0")} />
          <span className={cn("block h-0.5 w-6 bg-white transition", menuOpen && "-translate-y-2 -rotate-45")} />
        </button>

        {/* Right actions — never shrink, isolated from center nav */}
        <div
          className={cn(
            DESKTOP_NAV,
            "nova-header-actions relative z-20 col-start-3 row-start-1 shrink-0 items-center justify-end gap-1 2xl:gap-1.5",
          )}
        >
          <LocaleSwitcher />
          {session ? (
            <>
              {!onPortal && locale !== "pt" && (
                <Link
                  href={dashboardHref}
                  className="whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium text-white/85 transition hover:bg-white/10 hover:text-nova-cyan-light 2xl:px-2.5 2xl:text-sm"
                  title={NOVA_SCHOOL.portalName}
                >
                  <span className="2xl:hidden">Portal</span>
                  <span className="hidden 2xl:inline">{NOVA_SCHOOL.portalName}</span>
                </Link>
              )}
              <Link
                href="/api/auth/signout"
                className="nova-btn-primary nova-btn-glow whitespace-nowrap px-3 text-xs 2xl:text-sm"
              >
                Sign Out
              </Link>
            </>
          ) : locale !== "pt" ? (
            <>
              <Link
                href="/register"
                className="nova-btn-secondary whitespace-nowrap border-white/25 px-2.5 py-2 text-xs text-white 2xl:px-3 2xl:text-sm"
              >
                Register
              </Link>
              <Link href="/login" className="nova-btn-primary nova-btn-glow whitespace-nowrap px-3 text-xs 2xl:text-sm">
                Login
              </Link>
            </>
          ) : null}
        </div>
      </div>

      {/* Mobile / tablet drawer — below lg */}
      <nav
        className={cn(
          "absolute left-0 right-0 z-40 flex flex-col gap-3 border-b border-white/10 bg-[#0a1628] p-4 shadow-nova backdrop-blur-xl lg:hidden",
          MOBILE_NAV_TOP,
          !menuOpen && "hidden",
        )}
      >
        {!isDashboard && (
          <>
            <div className="flex flex-col gap-1">
              {headerNav.map((link) => {
                if (link.kind === "resources") {
                  return <StemHubNavMenu key={link.href} hub={stemHubNav} variant="mobile" onNavigate={closeMobile} />;
                }

                const active = isActiveNav(pathname, link.href);
                const isAiTutoring = link.href === AI_TUTORING_PATH;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                      isAiTutoring ? "inline-flex flex-col items-start gap-1" : "flex items-center gap-1",
                      active
                        ? "bg-nova-cyan/15 text-nova-cyan-light"
                        : "text-white/90 hover:bg-white/10 hover:text-nova-cyan-light",
                    )}
                    onClick={closeMobile}
                  >
                    <span>{link.label}</span>
                    {isAiTutoring && (
                      <span className={cn(COMING_SOON_BADGE, "text-[9px] leading-none")}>Coming Soon</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
          <LocaleSwitcher onNavigate={closeMobile} />
          {session ? (
            <>
              {!onPortal && locale !== "pt" && (
                <Link
                  href={dashboardHref}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/10"
                  onClick={closeMobile}
                >
                  {NOVA_SCHOOL.portalName}
                </Link>
              )}
              <Link
                href="/api/auth/signout"
                className="nova-btn-primary nova-btn-glow text-sm"
                onClick={closeMobile}
              >
                Sign Out
              </Link>
            </>
          ) : locale !== "pt" ? (
            <>
              <Link
                href="/register"
                className="nova-btn-secondary border-white/25 text-sm text-white"
                onClick={closeMobile}
              >
                Register
              </Link>
              <Link href="/login" className="nova-btn-primary nova-btn-glow text-sm" onClick={closeMobile}>
                Login
              </Link>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
