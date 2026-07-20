import Link from "next/link";
import type { NovaShopProductSummary } from "@/data/nova-shop";
import { getShopProductEn, getShopProductEs } from "@/data/nova-shop";
import {
  NOVA_SHOP_CATEGORY_LABELS,
  NOVA_SHOP_CATEGORY_LABELS_ES,
} from "@/data/nova-shop";
import type { AppLocale } from "@/lib/locale";
import { getLocalePathPrefix } from "@/lib/locale";
import { ShopProductImage } from "@/components/shop/shop-product-image";

type Props = {
  product: NovaShopProductSummary;
  locale?: AppLocale;
};

export function ShopProductCard({ product, locale = "en" }: Props) {
  const prefix = getLocalePathPrefix(locale);
  const href = `${prefix}/shop/${product.slug}`;
  const localized =
    locale === "es" ? getShopProductEs(product.slug) : getShopProductEn(product.slug);
  const name = localized?.name ?? product.name;
  const tagline = localized?.tagline ?? product.tagline;
  const categoryLabels =
    locale === "es" ? NOVA_SHOP_CATEGORY_LABELS_ES : NOVA_SHOP_CATEGORY_LABELS;
  const cta = locale === "es" ? "Ver producto →" : "View product →";

  return (
    <Link href={href} className="group block h-full">
      <article className="nova-glass-card flex h-full flex-col overflow-hidden border border-white/10 transition group-hover:border-nova-cyan/30">
        <ShopProductImage
          imagePath={product.imagePath}
          name={name}
          accent={product.accent}
          className="relative h-48 w-full"
        />
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-nova-cyan-light">
              {categoryLabels[product.category]}
            </span>
            <span className="text-sm font-bold text-white">${product.priceUsd}</span>
          </div>
          <h2 className="text-lg font-bold text-white group-hover:text-nova-cyan-light">{name}</h2>
          <p className="mt-2 flex-1 text-sm text-nova-cyan-light/75">{tagline}</p>
          <p className="mt-4 text-sm font-semibold text-nova-cyan group-hover:underline">{cta}</p>
        </div>
      </article>
    </Link>
  );
}
