"use client";

import Link from "next/link";
import { CalendarDays, Feather, ShieldCheck, Star } from "lucide-react";
import { NovaLogo } from "@/components/ui/nova-logo-mark";
import { getCertificateTemplateCopy } from "@/lib/certificates/copy";
import type { AppLocale } from "@/lib/locale";

export type NovaCertificateTemplateProps = {
  holderName: string;
  programTitle: string;
  code: string;
  issuedAt: string;
  scorePercent: number;
  prefix?: string;
  verifyUrl?: string;
  locale?: AppLocale;
  sampleMode?: boolean;
};

const CERT_VERIFY_DISPLAY = "verify.novastemhub.education";

function NovaCertCorner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M4 44V12C4 6 8 4 12 4H44"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 44C4 38 6 34 10 30"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="12" cy="4" r="1.5" fill="#F5C451" />
      <circle cx="4" cy="12" r="1" fill="#F5C451" opacity="0.8" />
    </svg>
  );
}

function NovaCertSignatoryBlock({
  side,
  title,
  hubLabel,
}: {
  side: "left" | "right";
  title: string;
  hubLabel: string;
}) {
  return (
    <div className={`nova-cert-signatory nova-cert-signatory-${side}`} aria-label={title}>
      <Feather aria-hidden className="nova-cert-quill" />
      <div className="nova-cert-signature-line" aria-hidden />
      <p>{title}</p>
      <small>{hubLabel}</small>
    </div>
  );
}

function NovaCertLaurelSeal({ hubLabel }: { hubLabel: string }) {
  return (
    <div className="nova-cert-laurel" aria-label={hubLabel}>
      <svg className="nova-cert-laurel-wreath" viewBox="0 0 120 100" aria-hidden>
        <path
          d="M18 72C8 58 6 42 14 28C20 18 28 14 34 16"
          stroke="#D4AF37"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M102 72C112 58 114 42 106 28C100 18 92 14 86 16"
          stroke="#D4AF37"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="22" cy="48" rx="3" ry="6" fill="#D4AF37" opacity="0.55" transform="rotate(-35 22 48)" />
        <ellipse cx="30" cy="38" rx="2.5" ry="5" fill="#D4AF37" opacity="0.5" transform="rotate(-20 30 38)" />
        <ellipse cx="98" cy="48" rx="3" ry="6" fill="#D4AF37" opacity="0.55" transform="rotate(35 98 48)" />
        <ellipse cx="90" cy="38" rx="2.5" ry="5" fill="#D4AF37" opacity="0.5" transform="rotate(20 90 38)" />
      </svg>
      <div className="nova-cert-seal">
        <span>NOVA</span>
        <small>STEM HUB</small>
        <i>★ ★ ★</i>
      </div>
    </div>
  );
}

export function NovaCertificateTemplate({
  holderName,
  programTitle,
  code,
  issuedAt,
  scorePercent,
  prefix,
  verifyUrl = "https://stem-innovation-academy.vercel.app/verify",
  locale = "en",
  sampleMode = false,
}: NovaCertificateTemplateProps) {
  const copy = getCertificateTemplateCopy();
  const formattedDate = new Date(issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const verificationUrl = sampleMode
    ? `https://${CERT_VERIFY_DISPLAY}`
    : verifyUrl;
  const verifyPath = verificationUrl.replace(/^https?:\/\/[^/]+/, "") || "/verify";
  const verifyDisplay = sampleMode
    ? CERT_VERIFY_DISPLAY
    : verificationUrl.replace(/^https?:\/\//, "");

  return (
    <article
      id="nova-certificate"
      data-sample={sampleMode ? "true" : "false"}
      data-locale={locale}
      className="nova-certificate relative mx-auto min-h-[520px] w-full max-w-4xl select-none rounded-sm bg-[#030810] shadow-2xl shadow-black/60 print:shadow-none"
    >
      <div className="nova-cert-outer-border absolute inset-0 rounded-sm" aria-hidden />
      <div className="nova-cert-inner relative m-[6px] flex flex-col items-center p-5 text-white sm:p-7 md:p-8">
        <div className="nova-cert-cosmic-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="nova-cert-noise pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />
        <div className="pointer-events-none absolute inset-[5px] border border-[#00E5FF]/80" />
        <div className="pointer-events-none absolute inset-[9px] border border-[#D4AF37]/85" />

        <NovaCertCorner className="nova-cert-corner nova-cert-corner-tl pointer-events-none absolute left-3 top-3 h-10 w-10" />
        <NovaCertCorner className="nova-cert-corner nova-cert-corner-tr pointer-events-none absolute right-3 top-3 h-10 w-10 scale-x-[-1]" />
        <NovaCertCorner className="nova-cert-corner nova-cert-corner-bl pointer-events-none absolute bottom-3 left-3 h-10 w-10 scale-y-[-1]" />
        <NovaCertCorner className="nova-cert-corner nova-cert-corner-br pointer-events-none absolute bottom-3 right-3 h-10 w-10 scale-[-1]" />

        {sampleMode && (
          <div
            className="nova-cert-sample-watermark pointer-events-none absolute inset-0 z-20"
            data-label={`${copy.sampleBanner} · VOID`}
            aria-hidden
          />
        )}

        <div className="relative z-10 flex w-full flex-col items-center text-center">
          <div className="nova-cert-body flex w-full flex-1 flex-col items-center text-center">
          <header className="flex w-full flex-col items-center text-center">
            <NovaLogo size="lg" />
            <p className="nova-cert-hub-label mt-2">{copy.hub}</p>
            <p className="nova-cert-location-line mt-1">
              {copy.onlineCourse} · {copy.location}
            </p>
            <div className="nova-cert-gold-divider mt-2" aria-hidden />
          </header>

          <h2 className="nova-cert-achievement-title mt-3 w-full text-center font-serif text-[clamp(1.5rem,3.6vw,2.35rem)] font-bold uppercase leading-none text-[#F5C451]">
            {copy.title}
          </h2>

          <p className="nova-cert-presented-to mt-3 w-full text-center">{copy.certifies}</p>

          <div className="nova-cert-name-divider mt-2">
            <span aria-hidden />
            <b>◆</b>
            <span aria-hidden />
          </div>
          <h1 className="nova-cert-holder-name mx-auto mt-1 w-full max-w-[92%] text-center font-serif text-[clamp(1.85rem,5vw,3.2rem)] font-normal italic leading-none text-white">
            {holderName}
          </h1>
          <div className="nova-cert-name-divider mt-2">
            <span aria-hidden />
            <b>◆</b>
            <span aria-hidden />
          </div>

          <p className="nova-cert-completed mt-3 w-full text-center">{copy.completed}</p>
          <h3 className="nova-cert-program-title mx-auto mt-1 max-w-2xl px-4 text-center text-[clamp(1rem,2.1vw,1.35rem)] font-bold uppercase tracking-[0.22em] text-[#00E5FF]">
            {programTitle}
          </h3>
          <p className="nova-cert-excellence mx-auto max-w-lg px-4 text-center">{copy.excellence}</p>

          <div className="nova-cert-stats mx-auto grid w-full max-w-3xl grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
            <div className="nova-cert-data-card nova-cert-data-card-left flex items-center justify-end gap-2.5 text-right">
              <div>
                <p>{copy.assessment}</p>
                <strong>{scorePercent}%</strong>
                <small>{copy.minimum}</small>
              </div>
              <div className="nova-cert-hex">
                <Star strokeWidth={2} />
              </div>
            </div>

            <NovaCertLaurelSeal hubLabel={copy.hub} />

            <div className="nova-cert-data-card nova-cert-data-card-right flex items-center justify-start gap-2.5 text-left">
              <div className="nova-cert-hex">
                <CalendarDays strokeWidth={2} />
              </div>
              <div>
                <p>{copy.date}</p>
                <strong className="nova-cert-date">{formattedDate}</strong>
              </div>
            </div>
          </div>
          </div>

          <footer className="nova-cert-footer mt-auto w-full flex-shrink-0 border-t border-[#D4AF37]/35 pt-2">
            <div className="nova-cert-footer-grid">
              <NovaCertSignatoryBlock
                side="left"
                title={copy.academicDirector}
                hubLabel={copy.hub}
              />

              <div className="nova-cert-verification">
                <div className="nova-cert-qr" aria-label={copy.verifyCode} />
                <div className="nova-cert-verification-copy">
                  {prefix && !sampleMode && <small className="nova-cert-prefix">{prefix}</small>}
                  <strong>{copy.verifyCertificate}</strong>
                  <p>{copy.scanToVerify}</p>
                  <Link href={verifyPath}>{verifyDisplay}</Link>
                  {!sampleMode && (
                    <small className="nova-cert-code">
                      {copy.verifyCode}: {code}
                    </small>
                  )}
                </div>
              </div>

              <NovaCertSignatoryBlock
                side="right"
                title={copy.programDirector}
                hubLabel={copy.hub}
              />
            </div>

            <div className="nova-cert-verified-badge">
              <ShieldCheck strokeWidth={1.5} />
              <span>
                {copy.verified}
                <small>{copy.novaCertified}</small>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
