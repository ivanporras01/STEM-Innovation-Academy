/**
 * NOVA STEM HUB SEO & marketing configuration.
 * Set NEXT_PUBLIC_SITE_URL when custom domain is live (e.g. https://novastemhub.education).
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID when Google Analytics is ready.
 */

import type { Metadata } from "next";
import { NOVA_COLLEGE, NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_SHOP, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { stripLocalePrefix, switchLocalePath, type AppLocale } from "@/lib/locale";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://stem-innovation-academy.vercel.app";

export const SITE_NAME = NOVA_STEM_HUB.name;

export const SEO_KEYWORDS = [
  "NOVA STEM Hub",
  "STEM education",
  "School",
  "College",
  "Languages",
  "Shop",
  "youth STEM electives",
  "middle school STEM",
  "high school STEM",
  "technical employability",
  "career readiness",
  "learn English Spanish Portuguese",
  "verifiable certificates",
  "B2B STEM licensing",
  "mission paths",
  "quantum computing workforce",
  "cybersecurity training",
  "robotics engineering",
  "coding and AI",
  "data analytics",
  "IoT smart systems",
  "cloud technician",
  "language learning online",
] as const;

export const SEO_TWITTER_HANDLE = "@novastemhub";

export const SEO_DEFAULT_DESCRIPTION =
  "NOVA STEM Hub — youth STEM electives (School), employability tracks (College), and language programs (English, Spanish, Portuguese). Global, inclusive STEM education with verifiable certificates and institutional partnerships.";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/** hreflang alternates for a path (locale-aware self-canonical). */
export function buildLanguageAlternates(relativePath: string) {
  const base = stripLocalePrefix(relativePath);
  const selfPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  return {
    canonical: absoluteUrl(selfPath),
    languages: {
      en: absoluteUrl(switchLocalePath(base, "en")),
      es: absoluteUrl(switchLocalePath(base, "es")),
      pt: absoluteUrl(switchLocalePath(base, "pt")),
      "x-default": absoluteUrl(switchLocalePath(base, "en")),
    },
  };
}

export type PageSeoInput = {
  title: string;
  description: string;
  /** Path including locale prefix, e.g. `/shop` or `/es/language`. */
  path: string;
  keywords?: string[];
  ogImagePath?: string;
  noIndex?: boolean;
  locale?: AppLocale;
};

export function buildPageMetadata(input: PageSeoInput): Metadata {
  const {
    title,
    description,
    path,
    keywords = [...SEO_KEYWORDS],
    ogImagePath = "/opengraph-image",
    noIndex = false,
    locale = "en",
  } = input;

  const ogImage = absoluteUrl(ogImagePath);
  const htmlLang = locale === "es" ? "es" : locale === "pt" ? "pt" : "en";

  return {
    title: { absolute: title },
    description,
    keywords: keywords.join(", "),
    metadataBase: new URL(SITE_URL),
    alternates: buildLanguageAlternates(path),
    openGraph: {
      type: "website",
      locale: htmlLang === "es" ? "es_ES" : htmlLang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: ["en_US", "es_ES", "pt_BR"],
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: SEO_TWITTER_HANDLE,
      site: SEO_TWITTER_HANDLE,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    category: "education",
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

/** Root layout defaults — extended by per-page metadata. */
export function buildRootMetadata(): Metadata {
  return {
    ...buildPageMetadata({
      title: NOVA_STEM_HUB.metadataTitle,
      description: SEO_DEFAULT_DESCRIPTION,
      path: "/",
    }),
    title: {
      default: NOVA_STEM_HUB.metadataTitle,
      template: NOVA_STEM_HUB.metadataTemplate,
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    manifest: "/manifest.webmanifest",
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export const PRODUCT_SEO_SNIPPETS = {
  school: `${NOVA_SCHOOL.electiveCount} youth electives · Middle & High School`,
  college: `${NOVA_COLLEGE.trackCount} employability tracks · verifiable certificates`,
  language: `${NOVA_LANGUAGE.courseCount} programs · English · Spanish · Portuguese`,
  shop: `Official ${NOVA_SHOP.name} merchandise · apparel · accessories · stationery`,
} as const;
