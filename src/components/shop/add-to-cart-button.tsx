"use client";

import { useState } from "react";
import type { NovaShopProduct, NovaShopSize } from "@/data/nova-shop";
import { NOVA_SHOP_SIZES } from "@/data/nova-shop";
import { addItemToCart, readCartFromStorage, writeCartToStorage } from "@/lib/nova-shop-cart";
import type { AppLocale } from "@/lib/locale";
import { NOVA_SHOP_PAGE_EN } from "@/data/nova-shop/catalog-en";
import { NOVA_SHOP_PAGE_ES } from "@/data/nova-shop/catalog-es";

type Props = {
  product: NovaShopProduct;
  locale?: AppLocale;
};

export function AddToCartButton({ product, locale = "en" }: Props) {
  const copy = locale === "es" ? NOVA_SHOP_PAGE_ES : NOVA_SHOP_PAGE_EN;
  const [size, setSize] = useState<NovaShopSize | undefined>(product.sizes?.[1] ?? product.sizes?.[0]);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (product.sizes && !size) return;
    const current = readCartFromStorage();
    const updated = addItemToCart(current, product.slug, 1, size);
    writeCartToStorage(updated);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-4">
      {product.sizes && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-nova-cyan-light/70">
            {copy.selectSize}
          </p>
          <div className="flex flex-wrap gap-2">
            {NOVA_SHOP_SIZES.filter((s) => product.sizes!.includes(s)).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  size === s
                    ? "border-nova-cyan bg-nova-cyan/20 text-white"
                    : "border-white/20 text-nova-cyan-light/80 hover:border-white/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={!!product.sizes && !size}
        className="nova-btn-primary nova-btn-glow inline-flex disabled:cursor-not-allowed disabled:opacity-50"
      >
        {added ? copy.addedToCart : copy.addToCart}
      </button>
    </div>
  );
}
