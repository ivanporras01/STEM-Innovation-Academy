"use client";

import { useState } from "react";
import Link from "next/link";
import type { VerifiedCertificate } from "@/data/novahub/certificates";
import type { AppLocale } from "@/lib/locale";
import { getCopyLocale } from "@/lib/locale";

type Props = {
  demoCodes: string[];
  locale?: AppLocale;
};

const COPY = {
  en: {
    codeLabel: "Certificate code",
    verify: "Verify certificate",
    verifying: "Verifying…",
    invalidCode: "Invalid code",
    verifyError: "We couldn't verify. Please try again.",
    validBadge: "✓ Valid certificate",
    holder: "Holder",
    program: "Program",
    code: "Code",
    issued: "Issued",
    cohort: "Cohort",
    viewProgram: "View program",
    score: "Score",
    demoCodes: "Demo codes to try",
  },
  es: {
    codeLabel: "Código de certificado",
    verify: "Verificar certificado",
    verifying: "Verificando…",
    invalidCode: "Código no válido",
    verifyError: "No pudimos verificar. Intenta de nuevo.",
    validBadge: "✓ Certificado válido",
    holder: "Titular",
    program: "Programa",
    code: "Código",
    issued: "Emitido",
    cohort: "Cohorte",
    viewProgram: "Ver programa",
    score: "Puntaje del examen",
    demoCodes: "Códigos demo para probar",
  },
} as const;

export function VerifyCertificateSearch({ demoCodes, locale = "en" }: Props) {
  const copy = COPY[getCopyLocale(locale)];
  const collegeBase = locale === "es" ? "/es/college" : "/college";

  const [code, setCode] = useState("");
  const [result, setResult] = useState<VerifiedCertificate | null | "not_found">(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function lookup(searchCode: string) {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/verify?code=${encodeURIComponent(searchCode.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? copy.invalidCode);
        setResult("not_found");
        return;
      }
      setResult(data.certificate);
    } catch {
      setError(copy.verifyError);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim()) lookup(code);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <form onSubmit={handleSubmit} className="nova-glass-island space-y-4 p-6">
        <label htmlFor="cert-code" className="nova-label">
          {copy.codeLabel}
        </label>
        <input
          id="cert-code"
          className="nova-input font-mono uppercase"
          placeholder="NOVA-COL-IT-2026-DEMO01"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />
        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="nova-btn-primary nova-btn-glow w-full disabled:opacity-60"
        >
          {loading ? copy.verifying : copy.verify}
        </button>
      </form>

      {error && (
        <div className="rounded-xl border border-red-400/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {result && result !== "not_found" && (
        <div className="nova-glass-island border-nova-green/30 p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-nova-green/20 px-3 py-1 text-xs font-bold uppercase text-nova-green">
              {copy.validBadge}
            </span>
            {result.isDemo && (
              <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] text-white/50">
                Demo
              </span>
            )}
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-nova-cyan-light/60">{copy.holder}</dt>
              <dd className="font-semibold text-white">{result.holderName}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">{copy.program}</dt>
              <dd className="text-white">{result.trackTitle}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">{copy.code}</dt>
              <dd className="font-mono text-nova-cyan-light">{result.code}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">{copy.issued}</dt>
              <dd className="text-white">{result.issuedAt}</dd>
            </div>
            {result.scorePercent != null && (
              <div>
                <dt className="text-nova-cyan-light/60">{copy.score}</dt>
                <dd className="font-semibold text-nova-green">{result.scorePercent}%</dd>
              </div>
            )}
            {result.cohort && (
              <div>
                <dt className="text-nova-cyan-light/60">{copy.cohort}</dt>
                <dd className="text-white">{result.cohort}</dd>
              </div>
            )}
          </dl>
          <Link
            href={`${collegeBase}/${result.trackSlug}`}
            className="mt-4 inline-block text-sm text-nova-cyan hover:underline"
          >
            {copy.viewProgram} {result.trackTitle} →
          </Link>
        </div>
      )}

      <div className="text-center">
        <p className="mb-3 text-xs text-nova-cyan-light/50">{copy.demoCodes}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {demoCodes.map((demo) => (
            <button
              key={demo}
              type="button"
              onClick={() => {
                setCode(demo);
                lookup(demo);
              }}
              className="rounded-lg border border-white/10 px-3 py-1 font-mono text-[10px] text-nova-cyan-light/70 hover:border-nova-cyan/30 hover:text-white"
            >
              {demo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
