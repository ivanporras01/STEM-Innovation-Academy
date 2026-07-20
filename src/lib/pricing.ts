import { formatPrice } from "@/lib/enrollment-access";

/**
 * Single source of truth for public course/program sale pricing.
 * List prices stay in catalog / CourseProduct; sale is applied at display + charge time.
 *
 * Override via env without redeploying catalog data:
 *   NEXT_PUBLIC_COURSE_DISCOUNT_PERCENT=50
 * Set to 0 to disable the sale.
 */
const parsed = Number(process.env.NEXT_PUBLIC_COURSE_DISCOUNT_PERCENT ?? "50");

export const COURSE_DISCOUNT_PERCENT =
  Number.isFinite(parsed) && parsed >= 0 && parsed <= 100 ? Math.floor(parsed) : 50;

export function isCourseSaleActive(): boolean {
  return COURSE_DISCOUNT_PERCENT > 0;
}

/** Sale price in USD cents from a list price in cents. */
export function salePriceCents(listCents: number): number {
  if (listCents <= 0 || !isCourseSaleActive()) return listCents;
  return Math.round((listCents * (100 - COURSE_DISCOUNT_PERCENT)) / 100);
}

/** Sale price in whole USD from a list tuition USD amount. */
export function salePriceUsd(listUsd: number): number {
  if (listUsd <= 0 || !isCourseSaleActive()) return listUsd;
  return Math.round(listUsd * (100 - COURSE_DISCOUNT_PERCENT)) / 100;
}

export function formatSalePrice(listCents: number, currency = "usd"): string {
  return formatPrice(salePriceCents(listCents), currency);
}

/** Plain-text label for buttons / meta (includes sale amount). */
export function formatSalePriceLabel(listCents: number, currency = "usd"): string {
  if (!isCourseSaleActive() || listCents <= 0) return formatPrice(listCents, currency);
  return `${formatSalePrice(listCents, currency)} (${COURSE_DISCOUNT_PERCENT}% off)`;
}

/** Catalog-style string: "$124.50 / elective" from list USD. */
export function formatSaleTuitionLabel(listUsd: number, unitSuffix: string): string {
  const sale = salePriceUsd(listUsd);
  const formatted =
    sale % 1 === 0
      ? `$${sale.toLocaleString("en-US")}`
      : `$${sale.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `${formatted} ${unitSuffix}`.trim();
}
