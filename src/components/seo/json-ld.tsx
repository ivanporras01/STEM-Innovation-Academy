import { SITE_NAME, SITE_URL, SEO_DEFAULT_DESCRIPTION, absoluteUrl } from "@/lib/seo";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SEO_DEFAULT_DESCRIPTION,
    logo: absoluteUrl("/icon.svg"),
    sameAs: [],
    areaServed: "Worldwide",
    knowsAbout: [
      "STEM education",
      "Technical employability",
      "Language learning",
      "K-12 electives",
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SEO_DEFAULT_DESCRIPTION,
    inLanguage: ["en", "es", "pt"],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function productJsonLd(input: {
  name: string;
  description: string;
  slug: string;
  priceUsd: number;
  imagePath: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: absoluteUrl(input.imagePath),
    url: absoluteUrl(`/shop/${input.slug}`),
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: input.priceUsd,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/shop/${input.slug}`),
    },
  };
}

export function courseJsonLd(input: {
  name: string;
  description: string;
  slug: string;
  pathPrefix?: string;
}) {
  const prefix = input.pathPrefix ?? "";
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    url: absoluteUrl(`${prefix}/language/${input.slug}`),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: input.slug === "english" ? "en" : input.slug === "spanish" ? "es" : "pt",
    educationalLevel: "All ages",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
