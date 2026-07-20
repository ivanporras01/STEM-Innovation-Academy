export type {
  NovaShopCartItem,
  NovaShopCategory,
  NovaShopProduct,
  NovaShopProductSummary,
  NovaShopSize,
} from "./types";

export {
  NOVA_SHOP_PAGE_EN,
  NOVA_SHOP_PRODUCTS_EN,
  getShopProductEn,
} from "./catalog-en";
export {
  NOVA_SHOP_PAGE_ES,
  NOVA_SHOP_PRODUCTS_ES,
  getShopProductEs,
} from "./catalog-es";

export {
  NOVA_SHOP_CART_STORAGE_KEY,
  NOVA_SHOP_CATEGORY_LABELS,
  NOVA_SHOP_CATEGORY_LABELS_ES,
  NOVA_SHOP_SIZES,
} from "./types";

import type { NovaShopProduct, NovaShopProductSummary } from "./types";

const APPAREL_SIZES = ["S", "M", "L", "XL"] as const;

function shopImage(slug: string) {
  return `/shop/${slug}.png`;
}

export const novaShopProducts: NovaShopProduct[] = [
  {
    slug: "nova-tshirt",
    name: "NOVA Explorer T-Shirt",
    tagline: "Soft cotton tee with the NOVA orbit logo — for mission days and everyday adventures.",
    description:
      "Unisex fit, pre-shrunk cotton blend. NOVA cyan gradient logo on chest. Machine washable.",
    priceUsd: 28,
    category: "apparel",
    sizes: [...APPAREL_SIZES],
    accent: "cyan",
    imagePath: shopImage("nova-tshirt"),
    highlights: ["Unisex fit", "Pre-shrunk cotton", "NOVA gradient logo"],
  },
  {
    slug: "nova-hoodie",
    name: "NOVA Mission Hoodie",
    tagline: "Cozy pullover for late-night builds and early-morning launches.",
    description:
      "Mid-weight fleece hoodie with kangaroo pocket and embroidered NOVA orbit badge. Unisex sizing.",
    priceUsd: 52,
    category: "apparel",
    sizes: [...APPAREL_SIZES],
    accent: "orange",
    imagePath: shopImage("nova-hoodie"),
    highlights: ["Mid-weight fleece", "Embroidered badge", "Kangaroo pocket"],
  },
  {
    slug: "nova-socks",
    name: "NOVA Signal Socks",
    tagline: "Crew socks with subtle NOVA stripes — comfort for long LAB sessions.",
    description:
      "Breathable cotton blend with reinforced heel and toe. One size fits most (EU 36–46 / US 5–12).",
    priceUsd: 14,
    category: "apparel",
    accent: "green",
    imagePath: shopImage("nova-socks"),
    highlights: ["Cotton blend", "Reinforced heel/toe", "One size fits most"],
  },
  {
    slug: "nova-shorts",
    name: "NOVA Adventure Shorts",
    tagline: "Lightweight shorts for workshops, field trips, and summer missions.",
    description:
      "Quick-dry fabric with zip pocket. NOVA logo patch. Unisex fit with adjustable drawcord.",
    priceUsd: 34,
    category: "apparel",
    sizes: [...APPAREL_SIZES],
    accent: "cyan",
    imagePath: shopImage("nova-shorts"),
    highlights: ["Quick-dry fabric", "Zip pocket", "Adjustable fit"],
  },
  {
    slug: "nova-hat",
    name: "NOVA Mission Cap",
    tagline: "Structured cap with embroidered orbit logo — shade for outdoor discovery.",
    description:
      "Adjustable snapback. Breathable panels. NOVA cyan accent stitching.",
    priceUsd: 24,
    category: "accessories",
    accent: "orange",
    imagePath: shopImage("nova-hat"),
    highlights: ["Adjustable snapback", "Embroidered orbit logo", "Breathable panels"],
  },
  {
    slug: "nova-backpack",
    name: "NOVA Explorer Backpack",
    tagline: "Room for your kit, notebook, and next big idea.",
    description:
      "Padded laptop sleeve (up to 15\"), water-resistant base, reflective NOVA stripe. 22L capacity.",
    priceUsd: 58,
    category: "accessories",
    accent: "cyan",
    imagePath: shopImage("nova-backpack"),
    highlights: ["15\" laptop sleeve", "Water-resistant base", "22L capacity"],
  },
  {
    slug: "nova-water-bottle",
    name: "NOVA Hydration Bottle",
    tagline: "Insulated stainless steel — stay fueled through every mission.",
    description:
      "500ml double-wall vacuum insulation. Leak-proof lid. NOVA gradient wrap.",
    priceUsd: 22,
    category: "accessories",
    accent: "green",
    imagePath: shopImage("nova-water-bottle"),
    highlights: ["500ml insulated", "Leak-proof lid", "NOVA gradient wrap"],
  },
  {
    slug: "nova-sticker-pack",
    name: "NOVA Sticker Pack",
    tagline: "Ten vinyl stickers — laptops, bottles, and gear that need more ✦.",
    description:
      "Weather-resistant vinyl. Assorted NOVA orbit logos, mission badges, and buddy silhouettes.",
    priceUsd: 8,
    category: "accessories",
    accent: "orange",
    imagePath: shopImage("nova-sticker-pack"),
    highlights: ["10 vinyl stickers", "Weather-resistant", "Assorted designs"],
  },
  {
    slug: "nova-notebook",
    name: "NOVA Discovery Notebook",
    tagline: "Dot-grid pages for sketches, circuits, and breakthrough notes.",
    description:
      "A5 hardcover, 160 pages, lay-flat binding. NOVA mission briefing inside cover.",
    priceUsd: 16,
    category: "stationery",
    accent: "green",
    imagePath: shopImage("nova-notebook"),
    highlights: ["A5 dot-grid", "160 pages", "Lay-flat binding"],
  },
];

export function getNovaShopProductBySlug(slug: string): NovaShopProduct | undefined {
  return novaShopProducts.find((product) => product.slug === slug);
}

export const novaShopProductIndex: NovaShopProductSummary[] = novaShopProducts.map((product) => ({
  slug: product.slug,
  name: product.name,
  tagline: product.tagline,
  priceUsd: product.priceUsd,
  category: product.category,
  accent: product.accent,
  imagePath: product.imagePath,
}));
