import type { Metadata } from "next";
import Link from "next/link";
import { ShopProductCard } from "@/components/shop/shop-product-card";
import { novaShopProductIndex } from "@/data/nova-shop";
import { NOVA_SHOP_PAGE_ES } from "@/data/nova-shop/catalog-es";
import { NOVA_COLLEGE, NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_SHOP, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${NOVA_SHOP.name} — Edición en Español`,
  description: NOVA_SHOP.description,
  path: "/es/shop",
  locale: "es",
});

export default function SpanishNovaShopCatalogPage() {
  const copy = NOVA_SHOP_PAGE_ES;

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <h1 className="text-3xl font-black sm:text-4xl">{NOVA_SHOP.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{NOVA_SHOP.taglineEs}</p>
          <p className="mt-3 max-w-3xl text-sm text-nova-cyan-light/80">{copy.heroDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href={NOVA_STEM_HUB.pathEs} className="nova-btn-secondary inline-flex border-white/20 text-white">
              ← {NOVA_STEM_HUB.name}
            </Link>
            <Link href={NOVA_SHOP.cartPathEs} className="nova-btn-primary nova-btn-glow inline-flex bg-nova-orange hover:bg-nova-orange/90">
              Ver carrito
            </Link>
            <Link href={NOVA_SHOP.path} className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              English edition ↗
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
                <ShopProductCard key={product.slug} product={product} locale="es" />
              ))}
            </div>
          </section>

          <section className="nova-glass-island text-center">
            <p className="text-sm text-nova-cyan-light/80">
              Explora más del universo {NOVA_STEM_HUB.name} —{" "}
              <Link href="/es/school" className="text-nova-cyan hover:underline">
                {NOVA_SCHOOL.name}
              </Link>
              ,{" "}
              <Link href="/es/college" className="text-nova-cyan hover:underline">
                {NOVA_COLLEGE.name}
              </Link>
              , y{" "}
              <Link href="/es/language" className="text-nova-cyan hover:underline">
                {NOVA_LANGUAGE.name}
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      </div>
  );
}
