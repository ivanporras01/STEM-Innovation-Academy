import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { ShopProductImage } from "@/components/shop/shop-product-image";
import { getNovaShopProductBySlug, novaShopProducts } from "@/data/nova-shop";
import { getShopProductEs } from "@/data/nova-shop/catalog-es";
import { NOVA_SHOP_CATEGORY_LABELS_ES } from "@/data/nova-shop";
import { NOVA_SHOP, NOVA_STEM_HUB } from "@/lib/novahub-brand";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return novaShopProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getNovaShopProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  const localized = getShopProductEs(slug);
  return {
    title: `${localized?.name ?? product.name} | ${NOVA_SHOP.name}`,
    description: localized?.description ?? product.description,
  };
}

export default async function SpanishShopProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getNovaShopProductBySlug(slug);
  if (!product) notFound();

  const localized = getShopProductEs(slug);
  const name = localized?.name ?? product.name;
  const tagline = localized?.tagline ?? product.tagline;
  const description = localized?.description ?? product.description;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-14 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-orange">
            ✦ {NOVA_STEM_HUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">{name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{tagline}</p>
          <p className="mt-3 text-sm text-nova-cyan-light/70">
            {NOVA_SHOP_CATEGORY_LABELS_ES[product.category]} · ${product.priceUsd} USD
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <ShopProductImage
              imagePath={product.imagePath}
              name={name}
              accent={product.accent}
              className="relative aspect-square w-full rounded-2xl"
              priority
            />

            <div className="space-y-6">
              <section className="nova-glass-island p-6">
                <h2 className="text-lg font-bold text-white">Sobre este artículo</h2>
                <p className="mt-3 text-sm leading-relaxed text-nova-cyan-light/85">{description}</p>
                <ul className="mt-4 space-y-1 text-sm text-nova-cyan-light/75">
                  {product.highlights.map((item) => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
              </section>

              <AddToCartButton product={product} locale="es" />

              <div className="flex flex-wrap gap-3">
                <Link href={NOVA_STEM_HUB.pathEs} className="nova-btn-secondary border-white/20 text-white">
                  ← {NOVA_STEM_HUB.name}
                </Link>
                <Link href={NOVA_SHOP.pathEs} className="nova-btn-secondary border-white/20 text-white">
                  Todos los productos
                </Link>
                <Link href={NOVA_SHOP.cartPathEs} className="nova-btn-secondary border-white/20 text-white/70">
                  Ver carrito →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
