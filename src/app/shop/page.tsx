import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ShopProductCard } from "@/components/shop/shop-product-card";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { novaShopProductIndex } from "@/data/nova-shop";
import { NOVA_SHOP_PAGE_EN } from "@/data/nova-shop/catalog-en";
import { NOVA_COLLEGE, NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_SHOP, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata, PRODUCT_SEO_SNIPPETS } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: NOVA_SHOP.metadataTitle,
  description: `${NOVA_SHOP.description} ${PRODUCT_SEO_SNIPPETS.shop}.`,
  path: "/shop",
  keywords: ["NOVA Shop", "NOVA merchandise", "STEM apparel", "NOVA t-shirt", "NOVA backpack"],
});

export default function NovaShopCatalogPage() {
  const copy = NOVA_SHOP_PAGE_EN;

  return (
    <div className="relative flex min-h-screen flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: NOVA_STEM_HUB.name, path: "/" },
          { name: NOVA_SHOP.name, path: "/shop" },
        ])}
      />
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-orange/10 via-transparent to-nova-cyan/10" />
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-orange">
            {NOVA_SHOP.heroEyebrow}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">{NOVA_SHOP.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{NOVA_SHOP.tagline}</p>
          <p className="mt-3 max-w-3xl text-sm text-nova-cyan-light/80">{copy.heroDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href={NOVA_STEM_HUB.path} className="nova-btn-secondary inline-flex border-white/20 text-white">
              ← {NOVA_STEM_HUB.name}
            </Link>
            <Link href={NOVA_SHOP.cartPath} className="nova-btn-primary nova-btn-glow inline-flex bg-nova-orange hover:bg-nova-orange/90">
              View cart
            </Link>
            <Link href="/es/shop" className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              Edición en Español ↗
            </Link>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-14">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">{copy.catalogSectionTitle}</h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">{copy.catalogSectionSubtitle}</p>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {novaShopProductIndex.map((product) => (
                <ShopProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>

          <section className="nova-glass-island text-center">
            <p className="text-sm text-nova-cyan-light/80">
              Explore more of the {NOVA_STEM_HUB.name} universe —{" "}
              <Link href={NOVA_SCHOOL.path} className="text-nova-cyan hover:underline">
                {NOVA_SCHOOL.name}
              </Link>
              ,{" "}
              <Link href={NOVA_COLLEGE.path} className="text-nova-cyan hover:underline">
                {NOVA_COLLEGE.name}
              </Link>
              , and{" "}
              <Link href={NOVA_LANGUAGE.path} className="text-nova-cyan hover:underline">
                {NOVA_LANGUAGE.name}
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
