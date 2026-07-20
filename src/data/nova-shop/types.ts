export type NovaShopCategory = "apparel" | "accessories" | "stationery";

export type NovaShopSize = "S" | "M" | "L" | "XL";

export type NovaShopProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceUsd: number;
  category: NovaShopCategory;
  /** Apparel items offer size selection */
  sizes?: NovaShopSize[];
  /** Visual accent for card ring */
  accent: "cyan" | "orange" | "green";
  /** Product image under /public/shop */
  imagePath: string;
  highlights: string[];
};

export type NovaShopProductSummary = Pick<
  NovaShopProduct,
  "slug" | "name" | "tagline" | "priceUsd" | "category" | "accent" | "imagePath"
>;

export type NovaShopCartItem = {
  slug: string;
  quantity: number;
  size?: NovaShopSize;
};

export const NOVA_SHOP_SIZES: NovaShopSize[] = ["S", "M", "L", "XL"];

export const NOVA_SHOP_CATEGORY_LABELS: Record<NovaShopCategory, string> = {
  apparel: "Apparel",
  accessories: "Accessories",
  stationery: "Stationery",
};

export const NOVA_SHOP_CATEGORY_LABELS_ES: Record<NovaShopCategory, string> = {
  apparel: "Ropa",
  accessories: "Accesorios",
  stationery: "Papelería",
};

export const NOVA_SHOP_CART_STORAGE_KEY = "nova-shop-cart";
