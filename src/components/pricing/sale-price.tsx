import {
  COURSE_DISCOUNT_PERCENT,
  isCourseSaleActive,
  salePriceCents,
  salePriceUsd,
} from "@/lib/pricing";
import { formatPrice } from "@/lib/enrollment-access";
import { cn } from "@/lib/utils";

type CentsProps = {
  listCents: number;
  className?: string;
  saleClassName?: string;
  showBadge?: boolean;
};

/** Struck-through list price + discounted price (cents). */
export function SalePriceFromCents({
  listCents,
  className,
  saleClassName,
  showBadge = true,
}: CentsProps) {
  if (listCents <= 0) return null;

  const sale = salePriceCents(listCents);
  if (!isCourseSaleActive() || sale >= listCents) {
    return <span className={className}>{formatPrice(listCents)}</span>;
  }

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <span className="text-white/45 line-through decoration-white/50">{formatPrice(listCents)}</span>
      <span className={cn("font-black text-nova-green", saleClassName)}>{formatPrice(sale)}</span>
      {showBadge && (
        <span className="rounded-full border border-nova-orange/40 bg-nova-orange/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-nova-orange">
          {COURSE_DISCOUNT_PERCENT}% off
        </span>
      )}
    </span>
  );
}

type UsdProps = {
  listUsd: number;
  unitSuffix?: string;
  className?: string;
  showBadge?: boolean;
};

/** Struck-through list tuition + discounted amount (USD whole/decimal). */
export function SaleTuitionDisplay({
  listUsd,
  unitSuffix = "",
  className,
  showBadge = true,
}: UsdProps) {
  if (listUsd <= 0) return null;

  const sale = salePriceUsd(listUsd);
  const fmt = (n: number) =>
    n % 1 === 0
      ? `$${n.toLocaleString("en-US")}`
      : `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (!isCourseSaleActive() || sale >= listUsd) {
    return (
      <span className={className}>
        {fmt(listUsd)}
        {unitSuffix ? ` ${unitSuffix}` : ""}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <span className="text-white/45 line-through decoration-white/50">{fmt(listUsd)}</span>
      <span className="font-black text-white">
        {fmt(sale)}
        {unitSuffix ? (
          <span className="ml-1 text-sm font-semibold text-white/70">{unitSuffix}</span>
        ) : null}
      </span>
      {showBadge && (
        <span className="rounded-full border border-nova-orange/40 bg-nova-orange/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-nova-orange">
          {COURSE_DISCOUNT_PERCENT}% off
        </span>
      )}
    </span>
  );
}
