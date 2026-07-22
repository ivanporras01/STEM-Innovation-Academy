import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartPageClient } from "@/components/shop/cart-page-client";
import { NOVA_SHOP_PAGE_ES } from "@/data/nova-shop/catalog-es";
import { NOVA_SHOP, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Carrito | ${NOVA_SHOP.name}`,
  description: NOVA_SHOP.description,
  path: "/es/shop/cart",
  noIndex: true,
  locale: "es",
});

export default function SpanishShopCartPage() {
  const copy = NOVA_SHOP_PAGE_ES;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-14 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-orange">
            ✦ {NOVA_STEM_HUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">{copy.cartTitle}</h1>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container max-w-3xl">
          <CartPageClient locale="es" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
