/** Single source of truth for public NOVA navigation — keep navbar + footer in sync. */

export const NOVA_PUBLIC_NAV = [
  { href: "/#discover", label: "Discover NOVA" },
  { href: "/courses", label: "Learning Pathways" },
  { href: "/#parents", label: "For Families" },
  { href: "/#schools", label: "For Schools" },
  { href: "/#contact", label: "Contact" },
] as const;

export const NOVA_FOOTER_EXPLORE = [
  { href: "/#discover", label: "Discover NOVA" },
  { href: "/courses", label: "Learning Pathways" },
  { href: "/#parents", label: "For Parents" },
  { href: "/#schools", label: "For Schools" },
  { href: "/#contact", label: "Contact" },
] as const;

export const NOVA_FOOTER_PORTAL = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/dashboard/student", label: "Explorer Dashboard" },
] as const;
