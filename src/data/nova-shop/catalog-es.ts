import type { NovaShopProduct } from "./types";

export const NOVA_SHOP_PAGE_ES = {
  heroDescription:
    "Artículos NOVA para Explorers, mentores y fans STEM — ropa, accesorios y papelería con envío internacional.",
  catalogSectionTitle: "Explora la colección",
  catalogSectionSubtitle: "Viste la misión · lleva la aventura · escribe tus descubrimientos",
  cartTitle: "Tu carrito",
  emptyCart: "Tu carrito está vacío — explora la colección y añade algo que te guste.",
  subtotal: "Subtotal",
  checkoutCta: "Proceder al checkout",
  checkoutNote:
    "Checkout por email por ahora — nuestro equipo confirmará tu pedido, tallas y envío.",
  continueShopping: "Seguir comprando",
  addToCart: "Añadir al carrito",
  addedToCart: "¡Añadido!",
  selectSize: "Elige talla",
  quantity: "Cant.",
  remove: "Quitar",
  viewProduct: "Ver producto",
  categoryFilterAll: "Todos",
} as const;

export const NOVA_SHOP_PRODUCTS_ES: Record<
  string,
  Pick<NovaShopProduct, "name" | "tagline" | "description">
> = {
  "nova-tshirt": {
    name: "Camiseta NOVA Explorer",
    tagline: "Algodón suave con el logo orbit NOVA — para días de misión y aventuras diarias.",
    description:
      "Corte unisex, algodón pre-encogido. Logo NOVA en gradiente cyan. Lavable a máquina.",
  },
  "nova-hoodie": {
    name: "Sudadera NOVA Mission",
    tagline: "Pullover acogedor para builds nocturnos y lanzamientos matutinos.",
    description:
      "Sudadera fleece con bolsillo canguro y parche orbit NOVA bordado. Tallas unisex.",
  },
  "nova-socks": {
    name: "Calcetines NOVA Signal",
    tagline: "Calcetines crew con rayas NOVA — comodidad para LABs largos.",
    description:
      "Mezcla de algodón transpirable con refuerzo en talón y punta. Talla única (EU 36–46).",
  },
  "nova-shorts": {
    name: "Shorts NOVA Adventure",
    tagline: "Shorts ligeros para talleres, excursiones y misiones de verano.",
    description:
      "Tejido secado rápido con bolsillo con cremallera. Parche NOVA. Corte unisex.",
  },
  "nova-hat": {
    name: "Gorra NOVA Mission",
    tagline: "Gorra estructurada con logo orbit bordado — sombra para descubrimientos al aire libre.",
    description:
      "Snapback ajustable. Paneles transpirables. Costura accent cyan NOVA.",
  },
  "nova-backpack": {
    name: "Mochila NOVA Explorer",
    tagline: "Espacio para tu kit, cuaderno y próxima gran idea.",
    description:
      "Compartimento acolchado para laptop (15\"), base resistente al agua, franja reflectante NOVA. 22L.",
  },
  "nova-notebook": {
    name: "Cuaderno NOVA Discovery",
    tagline: "Páginas dot-grid para bocetos, circuitos y notas de breakthrough.",
    description:
      "Tapa dura A5, 160 páginas, encuadernación plana. Briefing de misión NOVA en contraportada.",
  },
  "nova-water-bottle": {
    name: "Botella NOVA Hydration",
    tagline: "Acero inoxidable aislado — mantente hidratado en cada misión.",
    description:
      "500ml doble pared al vacío. Tapa a prueba de fugas. Wrap gradiente NOVA.",
  },
  "nova-sticker-pack": {
    name: "Pack de Stickers NOVA",
    tagline: "Diez stickers vinilo — laptops, botellas y gear que necesitan más ✦.",
    description:
      "Vinilo resistente al clima. Logos orbit NOVA, badges de misión y siluetas de buddies.",
  },
};

export function getShopProductEs(slug: string) {
  return NOVA_SHOP_PRODUCTS_ES[slug];
}
