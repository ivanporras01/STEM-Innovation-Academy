"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  buildCheckoutMailto,
  getCartSubtotal,
  readCartFromStorage,
  removeCartItem,
  updateCartItemQuantity,
  writeCartToStorage,
  type NovaShopCartItem,
} from "@/lib/nova-shop-cart";
import { getNovaShopProductBySlug } from "@/data/nova-shop";
import { getShopProductEn, getShopProductEs } from "@/data/nova-shop";
import { NOVA_SHOP_PAGE_EN } from "@/data/nova-shop/catalog-en";
import { NOVA_SHOP_PAGE_ES } from "@/data/nova-shop/catalog-es";
import type { AppLocale } from "@/lib/locale";
import { getLocalePathPrefix } from "@/lib/locale";
import { NOVA_SHOP } from "@/lib/novahub-brand";

type Props = {
  locale?: AppLocale;
};

export function CartPageClient({ locale = "en" }: Props) {
  const copy = locale === "es" ? NOVA_SHOP_PAGE_ES : NOVA_SHOP_PAGE_EN;
  const prefix = getLocalePathPrefix(locale);
  const shopHref = `${prefix}/shop`;
  const [items, setItems] = useState<NovaShopCartItem[]>([]);

  useEffect(() => {
    function refresh() {
      setItems(readCartFromStorage());
    }
    refresh();
    window.addEventListener("nova-shop-cart-updated", refresh);
    return () => window.removeEventListener("nova-shop-cart-updated", refresh);
  }, []);

  const subtotal = useMemo(
    () => getCartSubtotal(items, (slug) => getNovaShopProductBySlug(slug)?.priceUsd),
    [items],
  );

  const productNames = useMemo(() => {
    const names: Record<string, string> = {};
    for (const item of items) {
      const localized =
        locale === "es" ? getShopProductEs(item.slug) : getShopProductEn(item.slug);
      const product = getNovaShopProductBySlug(item.slug);
      names[item.slug] = localized?.name ?? product?.name ?? item.slug;
    }
    return names;
  }, [items, locale]);

  const checkoutHref =
    items.length > 0
      ? buildCheckoutMailto(items, productNames, subtotal, NOVA_SHOP.contactEmail)
      : "#";

  function setQuantity(slug: string, quantity: number, size?: NovaShopCartItem["size"]) {
    const updated = updateCartItemQuantity(items, slug, quantity, size);
    writeCartToStorage(updated);
    setItems(updated);
  }

  function removeItem(slug: string, size?: NovaShopCartItem["size"]) {
    const updated = removeCartItem(items, slug, size);
    writeCartToStorage(updated);
    setItems(updated);
  }

  if (items.length === 0) {
    return (
      <div className="nova-glass-island text-center">
        <p className="text-nova-cyan-light/80">{copy.emptyCart}</p>
        <Link href={shopHref} className="nova-btn-primary nova-btn-glow mt-6 inline-flex">
          {copy.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ul className="space-y-4">
        {items.map((item) => {
          const product = getNovaShopProductBySlug(item.slug);
          const localized =
            locale === "es" ? getShopProductEs(item.slug) : getShopProductEn(item.slug);
          const name = localized?.name ?? product?.name ?? item.slug;
          const price = product?.priceUsd ?? 0;
          const lineKey = item.size ? `${item.slug}-${item.size}` : item.slug;

          return (
            <li key={lineKey} className="nova-glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{name}</p>
                {item.size && (
                  <p className="text-xs text-nova-cyan-light/60">
                    {locale === "es" ? "Talla" : "Size"}: {item.size}
                  </p>
                )}
                <p className="text-sm text-nova-cyan-light/70">${price.toFixed(2)} each</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-nova-cyan-light/80">
                  {copy.quantity}
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(e) =>
                      setQuantity(item.slug, parseInt(e.target.value, 10) || 1, item.size)
                    }
                    className="w-16 rounded-lg border border-white/20 bg-white/5 px-2 py-1 text-white"
                  />
                </label>
                <p className="text-sm font-semibold text-white">
                  ${(price * item.quantity).toFixed(2)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.slug, item.size)}
                  className="text-sm text-nova-orange hover:underline"
                >
                  {copy.remove}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="nova-glass-island flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-nova-cyan-light/70">{copy.subtotal}</p>
          <p className="text-2xl font-bold text-white">${subtotal.toFixed(2)} USD</p>
          <p className="mt-2 max-w-md text-xs text-nova-cyan-light/60">{copy.checkoutNote}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={shopHref} className="nova-btn-secondary inline-flex border-white/20 text-white">
            {copy.continueShopping}
          </Link>
          <a href={checkoutHref} className="nova-btn-primary nova-btn-glow inline-flex bg-nova-orange hover:bg-nova-orange/90">
            {copy.checkoutCta}
          </a>
        </div>
      </div>
    </div>
  );
}
