/**
 * Single source of truth for public NOVA navigation — keep navbar + footer in sync.
 * Immersive entry points live inside Mission Paths as "Explore Now" (not top-level nav).
 * Do NOT add For Parents / For Schools — excluded from this version.
 */

export const NOVA_PUBLIC_NAV = [
  { href: "/#discover", label: "Discover NOVA" },
  { href: "/courses", label: "Mission Paths" },
  { href: "/#contact", label: "Contact" },
] as const;

export const NOVA_FOOTER_EXPLORE = [
  { href: "/#discover", label: "Discover NOVA" },
  { href: "/courses", label: "Mission Paths" },
  { href: "/#contact", label: "Contact" },
] as const;

export const NOVA_FOOTER_PORTAL = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/dashboard/student", label: "Explorer Dashboard" },
] as const;
