"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCartItemCount, readCartFromStorage } from "@/lib/nova-shop-cart";
import { getLocaleFromPath } from "@/lib/locale";
import { NOVA_SHOP } from "@/lib/novahub-brand";

export function ShopCartButton({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const cartHref = locale === "es" ? NOVA_SHOP.cartPathEs : NOVA_SHOP.cartPath;
  const label = locale === "es" ? "Carrito" : "Cart";
  const [count, setCount] = useState(0);

  useEffect(() => {
    function refresh() {
      setCount(getCartItemCount(readCartFromStorage()));
    }
    refresh();
    window.addEventListener("nova-shop-cart-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("nova-shop-cart-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <Link
      href={cartHref}
      className="relative shrink-0 rounded-lg px-2 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-nova-cyan-light 2xl:px-3"
      aria-label={`${label}${count > 0 ? `, ${count} items` : ""}`}
      title={label}
    >
      <span aria-hidden>🛒</span>
      {!compact && <span className="ml-1">{label}</span>}
      {compact && <span className="ml-1 hidden 2xl:inline">{label}</span>}
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-nova-orange px-1 text-[10px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
