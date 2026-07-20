/**
 * NOVA STEM HUB locale policy
 *
 * EN (default): NOVA STEM HUB (/), NOVA School (/school), NOVA College (/college).
 * ES (separate): Spanish editions under /es/*.
 * PT (separate): Portuguese editions under /pt/* (hub, language, school & college catalog pages).
 */

export const DEFAULT_LOCALE = "en" as const;
export const SPANISH_LOCALE = "es" as const;
export const PORTUGUESE_LOCALE = "pt" as const;

export type AppLocale = typeof DEFAULT_LOCALE | typeof SPANISH_LOCALE | typeof PORTUGUESE_LOCALE;

export const LOCALE_PATHS = {
  en: {
    hub: "/",
    school: "/school",
    college: "/college",
    language: "/language",
    shop: "/shop",
    scholarships: "/scholarships",
    mission: "/mission",
    verify: "/verify",
    roadmap: "/roadmap",
    partnership: "/partnership",
    catalog: "/catalog",
    internships: "/internships",
    partnerScholarships: "/scholarships/partners",
    news: "/news",
    home: "/",
  },
  es: {
    hub: "/es",
    school: "/es/school",
    college: "/es/college",
    language: "/es/language",
    shop: "/es/shop",
    scholarships: "/es/scholarships",
    mission: "/es/mission",
    verify: "/es/verify",
    roadmap: "/es/roadmap",
    partnership: "/es/partnership",
    catalog: "/catalog",
    internships: "/es/internships",
    partnerScholarships: "/scholarships/partners",
    news: "/es/news",
    home: "/es",
  },
  pt: {
    hub: "/pt",
    school: "/pt/school",
    college: "/pt/college",
    language: "/pt/language",
    shop: "/shop",
    scholarships: "/scholarships",
    mission: "/mission",
    verify: "/verify",
    roadmap: "/roadmap",
    partnership: "/partnership",
    catalog: "/catalog",
    internships: "/internships",
    partnerScholarships: "/scholarships/partners",
    news: "/pt/news",
    home: "/pt",
  },
} as const;

/** URL prefix for a locale — empty string for English (default). */
export function getLocalePathPrefix(locale: AppLocale): string {
  if (locale === "es") return "/es";
  if (locale === "pt") return "/pt";
  return "";
}

export function getLocaleFromPath(pathname: string): AppLocale {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/pt" || pathname.startsWith("/pt/")) return "pt";
  return "en";
}

/** Resolve UI locale from the current pathname (same logic as navbar / locale switcher). */
export function getPageLocale(pathname: string): AppLocale {
  return getLocaleFromPath(pathname);
}

export function isSpanishPath(pathname: string): boolean {
  return getLocaleFromPath(pathname) === "es";
}

export function isPortuguesePath(pathname: string): boolean {
  return getLocaleFromPath(pathname) === "pt";
}

/** Locales with dedicated UI copy bundles — Portuguese falls back to English. */
export type CopyLocale = typeof DEFAULT_LOCALE | typeof SPANISH_LOCALE;

export function getCopyLocale(locale: AppLocale): CopyLocale {
  return locale === "es" ? "es" : "en";
}

/** Strip /es or /pt prefix — returns path relative to English routes. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/es" || pathname === "/pt") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3) || "/";
  if (pathname.startsWith("/pt/")) return pathname.slice(3) || "/";
  return pathname;
}

/**
 * Map the current path to the equivalent route in another locale.
 * Portuguese has full coverage for hub + language; other PT routes fall back to /pt.
 */
export function switchLocalePath(pathname: string, target: AppLocale): string {
  const base = stripLocalePrefix(pathname);

  if (target === "en") {
    return base || "/";
  }

  const prefix = target === "es" ? "/es" : "/pt";

  if (base === "/" || base === "") {
    return prefix;
  }

  if (target === "pt") {
    if (
      base.startsWith("/language") ||
      base.startsWith("/school") ||
      base.startsWith("/college") ||
      base.startsWith("/news")
    ) {
      return `${prefix}${base}`;
    }
    if (base.startsWith("/shop")) return base;
    return prefix;
  }

  return `${prefix}${base}`;
}
