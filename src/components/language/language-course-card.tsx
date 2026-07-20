import Link from "next/link";
import type { NovaLanguageCourseSummary } from "@/data/nova-language";
import { getLanguageCourseEn, getLanguageCourseEs, getLanguageCoursePt } from "@/data/nova-language";
import type { AppLocale } from "@/lib/locale";
import { getLocalePathPrefix } from "@/lib/locale";

type Props = {
  course: NovaLanguageCourseSummary;
  locale?: AppLocale;
};

export function LanguageCourseCard({ course, locale = "en" }: Props) {
  const prefix = getLocalePathPrefix(locale);
  const href = `${prefix}/language/${course.slug}`;
  const localized =
    locale === "es"
      ? getLanguageCourseEs(course.slug)
      : locale === "pt"
        ? getLanguageCoursePt(course.slug)
        : getLanguageCourseEn(course.slug);
  const title = localized?.title ?? course.title;
  const tagline = localized?.tagline ?? course.tagline;
  const cta =
    locale === "es" ? "Ver curso →" : locale === "pt" ? "Ver curso →" : "View course →";
  const levelLabel = locale === "es" ? "nivel" : locale === "pt" ? "nível" : "level";

  return (
    <Link href={href} className="group block h-full">
      <article className="nova-glass-card flex h-full flex-col border border-nova-green/20 p-6 transition group-hover:border-nova-green/40">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-nova-green/30 bg-nova-green/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-nova-green">
            {course.targetLanguage}
          </span>
          <span className="text-xs text-nova-cyan-light/60">
            {levelLabel} {course.cefrLevel}
          </span>
        </div>
        <h2 className="text-lg font-bold text-white group-hover:text-nova-cyan-light">{title}</h2>
        <p className="mt-2 flex-1 text-sm text-nova-cyan-light/80">{tagline}</p>
        <ul className="mt-4 space-y-1 text-xs text-nova-cyan-light/70">
          {course.highlights.slice(0, 2).map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-nova-green group-hover:underline">{cta}</p>
      </article>
    </Link>
  );
}
