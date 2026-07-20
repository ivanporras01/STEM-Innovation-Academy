"use client";

import type { NovaShopCartItem, NovaShopSize } from "@/data/nova-shop";
import { NOVA_SHOP_CART_STORAGE_KEY } from "@/data/nova-shop";

export type { NovaShopCartItem };

function cartItemKey(slug: string, size?: NovaShopSize): string {
  return size ? `${slug}::${size}` : slug;
}

export function readCartFromStorage(): NovaShopCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NOVA_SHOP_CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as NovaShopCartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCartToStorage(items: NovaShopCartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(NOVA_SHOP_CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("nova-shop-cart-updated"));
}

export function getCartItemCount(items: NovaShopCartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(
  items: NovaShopCartItem[],
  priceLookup: (slug: string) => number | undefined,
): number {
  return items.reduce((sum, item) => {
    const price = priceLookup(item.slug) ?? 0;
    return sum + price * item.quantity;
  }, 0);
}

export function addItemToCart(
  items: NovaShopCartItem[],
  slug: string,
  quantity = 1,
  size?: NovaShopSize,
): NovaShopCartItem[] {
  const key = cartItemKey(slug, size);
  const existing = items.find((item) => cartItemKey(item.slug, item.size) === key);
  if (existing) {
    return items.map((item) =>
      cartItemKey(item.slug, item.size) === key
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }
  return [...items, { slug, quantity, size }];
}

export function updateCartItemQuantity(
  items: NovaShopCartItem[],
  slug: string,
  quantity: number,
  size?: NovaShopSize,
): NovaShopCartItem[] {
  const key = cartItemKey(slug, size);
  if (quantity <= 0) {
    return items.filter((item) => cartItemKey(item.slug, item.size) !== key);
  }
  return items.map((item) =>
    cartItemKey(item.slug, item.size) === key ? { ...item, quantity } : item,
  );
}

export function removeCartItem(
  items: NovaShopCartItem[],
  slug: string,
  size?: NovaShopSize,
): NovaShopCartItem[] {
  const key = cartItemKey(slug, size);
  return items.filter((item) => cartItemKey(item.slug, item.size) !== key);
}

export function buildCheckoutMailto(
  items: NovaShopCartItem[],
  productNames: Record<string, string>,
  subtotal: number,
  email: string,
): string {
  const lines = items.map((item) => {
    const name = productNames[item.slug] ?? item.slug;
    const sizePart = item.size ? ` (${item.size})` : "";
    return `- ${name}${sizePart} × ${item.quantity}`;
  });
  const body = [
    "Hi NOVA Shop team,",
    "",
    "I'd like to place an order:",
    "",
    ...lines,
    "",
    `Subtotal: $${subtotal.toFixed(2)} USD`,
    "",
    "Please confirm availability, shipping, and payment details.",
    "",
    "Thank you!",
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent("NOVA Shop Order")}&body=${encodeURIComponent(body)}`;
}
