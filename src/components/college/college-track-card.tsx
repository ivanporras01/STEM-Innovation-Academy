import Link from "next/link";
import type { NovaCollegeTrackSummary } from "@/data/nova-college";
import { getCollegeTrackEn } from "@/data/nova-college/catalog-en";
import type { AppLocale } from "@/lib/locale";

type Props = {
  track: NovaCollegeTrackSummary;
  locale?: AppLocale;
};

export function CollegeTrackCard({ track, locale = "en" }: Props) {
  const isAdvanced = track.tier === "advanced";
  const en = getCollegeTrackEn(track.slug);
  const href =
    locale === "es"
      ? `/es/college/${track.slug}`
      : locale === "pt"
        ? `/college/${track.slug}`
        : `/college/${track.slug}`;
  const title = locale === "es" ? track.title : (en?.title ?? track.title);
  const tagline = locale === "es" ? track.tagline : (en?.tagline ?? track.tagline);
  const cta =
    locale === "es" ? "Ver programa →" : locale === "pt" ? "Ver trilha →" : "View program →";
  const tier1Label =
    locale === "es" ? "Tier 1 · Entrada" : locale === "pt" ? "Tier 1 · Entrada" : "Tier 1 · Entry";
  const tier2Label =
    locale === "es" ? "Tier 2 · Avanzado" : locale === "pt" ? "Tier 2 · Avançado" : "Tier 2 · Advanced";
  const modulesLabel = locale === "es" ? "módulos" : locale === "pt" ? "módulos" : "modules";

  return (
    <Link href={href} className="group block h-full">
      <article className="nova-glass-card flex h-full flex-col p-6 transition group-hover:border-nova-cyan/30">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {isAdvanced ? (
            <span className="rounded-full border border-nova-orange/40 bg-nova-orange/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-nova-orange">
              {tier2Label}
            </span>
          ) : (
            <span className="rounded-full border border-nova-cyan/30 bg-nova-cyan/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-nova-cyan-light">
              {tier1Label}
            </span>
          )}
          <span className="text-xs text-nova-cyan-light/60">
            ~{track.durationHours}h · {track.moduleCount} {modulesLabel}
          </span>
        </div>
        <h2 className="text-lg font-bold text-white group-hover:text-nova-cyan-light">
          {title}
        </h2>
        <p className="mt-2 flex-1 text-sm text-nova-cyan-light/80">{tagline}</p>
        <ul className="mt-4 space-y-1 text-xs text-nova-cyan-light/70">
          {track.primaryCerts.slice(0, 2).map((cert) => (
            <li key={cert}>✓ {cert}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-nova-cyan group-hover:underline">{cta}</p>
      </article>
    </Link>
  );
}
