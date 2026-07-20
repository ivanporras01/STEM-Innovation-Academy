"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, Download, ShieldCheck, Target } from "lucide-react";
import {
  PASSING_SCORE_PERCENT,
  SAMPLE_CERTIFICATE_PAGE_PATH,
  SAMPLE_CERTIFICATE_PDF_BY_LOCALE,
} from "@/lib/certificates/constants";
import { getCertificatePromoCopy } from "@/lib/certificates/copy";
import { NovaCertificateTemplate } from "@/components/certificates/nova-certificate-template";
import { getPageLocale, LOCALE_PATHS, type AppLocale } from "@/lib/locale";

type Props = {
  programTitle?: string;
  locale?: AppLocale;
  /** Compact layout for sidebars / enrollment cards */
  compact?: boolean;
  className?: string;
};

const REQUIREMENT_ICONS = [Target, Award, ShieldCheck];

export function CertificatePreviewPromo({
  programTitle,
  locale: localeProp,
  compact = false,
  className = "",
}: Props) {
  const pathname = usePathname();
  const locale: AppLocale = localeProp ?? getPageLocale(pathname);
  const copy = getCertificatePromoCopy(locale);
  const displayProgram = programTitle ?? copy.sampleProgram;
  const sampleDate = new Date().toISOString();

  return (
    <section
      className={`nova-cert-preview-promo overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#0B1D3A]/90 via-[#071428]/95 to-[#040d1a]/90 ${className}`}
      aria-labelledby="cert-preview-heading"
    >
      <div className={`${compact ? "p-5" : "p-6 sm:p-8"}`}>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5D76E]/80">
          {copy.eyebrow}
        </p>
        <h2
          id="cert-preview-heading"
          className={`mt-2 font-black text-white ${compact ? "text-lg" : "text-xl sm:text-2xl"}`}
        >
          {copy.title}
        </h2>
        {!compact && (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-nova-cyan-light/80">
            {copy.subtitle}
          </p>
        )}

        <ul className={`mt-4 grid gap-2 ${compact ? "sm:grid-cols-1" : "sm:grid-cols-3"}`}>
          {copy.requirements.map((req, index) => {
            const Icon = REQUIREMENT_ICONS[index] ?? Award;

            return (
            <li
              key={req.label}
              className="flex items-start gap-2.5 rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm"
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#F5D76E]" aria-hidden />
              <div>
                <p className="font-semibold text-white">{req.label}</p>
                <p className="text-xs text-nova-cyan-light/65">{req.detail}</p>
              </div>
            </li>
            );
          })}
        </ul>

        <div className={`relative mt-6 ${compact ? "scale-[0.92] origin-top" : ""}`}>
          <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-white/40">
            {copy.sampleNote}
          </p>
          <NovaCertificateTemplate
            holderName={copy.placeholderName}
            programTitle={displayProgram}
            code="NOVA-SAMPLE-0000"
            issuedAt={sampleDate}
            scorePercent={PASSING_SCORE_PERCENT}
            locale={locale}
            sampleMode
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href={SAMPLE_CERTIFICATE_PDF_BY_LOCALE[locale]}
            download
            className="nova-btn-primary nova-btn-glow inline-flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {copy.downloadSample}
          </a>
          <Link
            href={`${SAMPLE_CERTIFICATE_PAGE_PATH}?locale=${locale}`}
            className="nova-btn-secondary inline-flex items-center gap-2 border-[#D4AF37]/30 text-white hover:border-[#F5D76E]/50"
          >
            {copy.viewSample}
          </Link>
          <Link
            href={LOCALE_PATHS[locale].verify}
            className="nova-btn-secondary inline-flex items-center gap-2 border-[#D4AF37]/30 text-white hover:border-[#F5D76E]/50"
          >
            <ShieldCheck className="h-4 w-4 text-[#F5D76E]" />
            {copy.verifyCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
