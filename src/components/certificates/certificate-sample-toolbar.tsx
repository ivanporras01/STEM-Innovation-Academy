"use client";

import Link from "next/link";
import { Download, Printer } from "lucide-react";
import {
  SAMPLE_CERTIFICATE_PAGE_PATH,
  getSampleCertificatePdfPath,
} from "@/lib/certificates/constants";
import { getCertificateSampleToolbarCopy } from "@/lib/certificates/copy";
import type { AppLocale } from "@/lib/locale";

type Props = {
  locale?: AppLocale;
};

const LOCALE_OPTIONS: { value: AppLocale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
];

export function CertificateSampleToolbar({ locale = "es" }: Props) {
  const copy = getCertificateSampleToolbarCopy(locale);
  const pdfPath = getSampleCertificatePdfPath(locale);

  return (
    <div className="cert-sample-toolbar print:hidden">
      <p className="cert-sample-toolbar-note">{copy.title}</p>

      <div className="cert-sample-locale-switch" role="group" aria-label={copy.languageLabel}>
        <span className="cert-sample-locale-label">{copy.languageLabel}:</span>
        {LOCALE_OPTIONS.map((option) => (
          <Link
            key={option.value}
            href={`${SAMPLE_CERTIFICATE_PAGE_PATH}?locale=${option.value}`}
            className={`cert-sample-locale-btn ${locale === option.value ? "is-active" : ""}`}
            aria-current={locale === option.value ? "page" : undefined}
          >
            {option.label}
          </Link>
        ))}
      </div>

      <div className="cert-sample-toolbar-actions">
        <a
          href={pdfPath}
          download
          className="nova-btn-primary nova-btn-glow inline-flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {copy.download}
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="nova-btn-secondary inline-flex items-center gap-2 border-white/20 text-white"
        >
          <Printer className="h-4 w-4" />
          {copy.print}
        </button>
        <Link
          href="/verify"
          className="nova-btn-secondary inline-flex items-center border-white/20 text-white"
        >
          {copy.verify}
        </Link>
      </div>
      <p className="cert-sample-toolbar-hint">{copy.hint}</p>
    </div>
  );
}
