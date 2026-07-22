import Link from "next/link";
import type { NovaSchoolElectiveSummary } from "@/data/nova-school";
import { getSchoolElectiveEn, getSchoolElectiveEs } from "@/data/nova-school";
import type { AppLocale } from "@/lib/locale";

type Props = {
  elective: NovaSchoolElectiveSummary;
  locale?: AppLocale;
};

export function SchoolElectiveCard({ elective, locale = "en" }: Props) {
  const href =
    locale === "es"
      ? `/es/school/${elective.slug}`
      : locale === "pt"
        ? `/school/${elective.slug}`
        : `/school/${elective.slug}`;
  const es = locale === "es" ? getSchoolElectiveEs(elective.slug) : undefined;
  const en = locale === "en" || locale === "pt" ? getSchoolElectiveEn(elective.slug) : undefined;
  const title = es?.title ?? en?.title ?? elective.title;
  const tagline = es?.tagline ?? en?.tagline ?? elective.tagline;
  const electiveLabel =
    locale === "es" ? "Electiva" : locale === "pt" ? "Eletiva" : "Elective";
  const cta =
    locale === "es" ? "Ver electiva →" : locale === "pt" ? "Ver eletiva →" : "View elective →";

  return (
    <Link href={href} className="group block h-full">
      <article className="nova-glass-card flex h-full flex-col p-6 transition group-hover:border-nova-cyan/30">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-nova-cyan/30 bg-nova-cyan/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-nova-cyan-light">
            {electiveLabel}
          </span>
          <span className="text-xs text-nova-cyan-light/60">
            Middle & High School
          </span>
        </div>
        <h2 className="text-lg font-bold text-white group-hover:text-nova-cyan-light">{title}</h2>
        <p className="mt-2 flex-1 text-sm text-nova-cyan-light/80">{tagline}</p>
        <ul className="mt-4 space-y-1 text-xs text-nova-cyan-light/70">
          {elective.highlights.slice(0, 2).map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-nova-cyan group-hover:underline">{cta}</p>
      </article>
    </Link>
  );
}
