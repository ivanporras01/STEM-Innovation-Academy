import type { NovaShopProduct } from "./types";

export const NOVA_SHOP_PAGE_EN = {
  heroDescription:
    "NOVA-branded gear for Explorers, mentors, and STEM fans — apparel, accessories, and stationery shipped worldwide.",
  catalogSectionTitle: "Shop the collection",
  catalogSectionSubtitle: "Wear the mission · carry the adventure · write your discoveries",
  cartTitle: "Your cart",
  emptyCart: "Your cart is empty — explore the collection and add something you love.",
  subtotal: "Subtotal",
  checkoutCta: "Proceed to checkout",
  checkoutNote:
    "Checkout via email for now — our team will confirm your order, sizes, and shipping details.",
  continueShopping: "Continue shopping",
  addToCart: "Add to cart",
  addedToCart: "Added!",
  selectSize: "Select size",
  quantity: "Qty",
  remove: "Remove",
  viewProduct: "View product",
  categoryFilterAll: "All",
} as const;

export const NOVA_SHOP_PRODUCTS_EN: Record<
  string,
  Pick<NovaShopProduct, "name" | "tagline" | "description">
> = {
  "nova-tshirt": {
    name: "NOVA Explorer T-Shirt",
    tagline: "Soft cotton tee with the NOVA orbit logo — for mission days and everyday adventures.",
    description:
      "Unisex fit, pre-shrunk cotton blend. NOVA cyan gradient logo on chest. Machine washable.",
  },
  "nova-hoodie": {
    name: "NOVA Mission Hoodie",
    tagline: "Cozy pullover for late-night builds and early-morning launches.",
    description:
      "Mid-weight fleece hoodie with kangaroo pocket and embroidered NOVA orbit badge. Unisex sizing.",
  },
  "nova-socks": {
    name: "NOVA Signal Socks",
    tagline: "Crew socks with subtle NOVA stripes — comfort for long LAB sessions.",
    description:
      "Breathable cotton blend with reinforced heel and toe. One size fits most (EU 36–46 / US 5–12).",
  },
  "nova-shorts": {
    name: "NOVA Adventure Shorts",
    tagline: "Lightweight shorts for workshops, field trips, and summer missions.",
    description:
      "Quick-dry fabric with zip pocket. NOVA logo patch. Unisex fit with adjustable drawcord.",
  },
  "nova-hat": {
    name: "NOVA Mission Cap",
    tagline: "Structured cap with embroidered orbit logo — shade for outdoor discovery.",
    description:
      "Adjustable snapback. Breathable panels. NOVA cyan accent stitching.",
  },
  "nova-backpack": {
    name: "NOVA Explorer Backpack",
    tagline: "Room for your kit, notebook, and next big idea.",
    description:
      "Padded laptop sleeve (up to 15\"), water-resistant base, reflective NOVA stripe. 22L capacity.",
  },
  "nova-notebook": {
    name: "NOVA Discovery Notebook",
    tagline: "Dot-grid pages for sketches, circuits, and breakthrough notes.",
    description:
      "A5 hardcover, 160 pages, lay-flat binding. NOVA mission briefing inside cover.",
  },
  "nova-water-bottle": {
    name: "NOVA Hydration Bottle",
    tagline: "Insulated stainless steel — stay fueled through every mission.",
    description:
      "500ml double-wall vacuum insulation. Leak-proof lid. NOVA gradient wrap.",
  },
  "nova-sticker-pack": {
    name: "NOVA Sticker Pack",
    tagline: "Ten vinyl stickers — laptops, bottles, and gear that need more ✦.",
    description:
      "Weather-resistant vinyl. Assorted NOVA orbit logos, mission badges, and buddy silhouettes.",
  },
};

export function getShopProductEn(slug: string) {
  return NOVA_SHOP_PRODUCTS_EN[slug];
}
