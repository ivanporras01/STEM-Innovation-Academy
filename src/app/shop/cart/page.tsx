import type { Metadata } from "next";
import { CartPageClient } from "@/components/shop/cart-page-client";
import { NOVA_SHOP_PAGE_EN } from "@/data/nova-shop/catalog-en";
import { NOVA_SHOP, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Cart | ${NOVA_SHOP.name}`,
  description: NOVA_SHOP.description,
  path: "/shop/cart",
  noIndex: true,
});

export default function ShopCartPage() {
  const copy = NOVA_SHOP_PAGE_EN;

  return (
    <div className="relative flex flex-1 flex-col">
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
          <CartPageClient locale="en" />
        </div>
      </main>

      </div>
  );
}
