"use client";

import Link from "next/link";
import { Printer, Share2, FileDown, Link2 } from "lucide-react";

type Props = {
  code: string;
  verificationToken?: string;
};

export function CertificatePrintActions({ code, verificationToken }: Props) {
  function handlePrint() {
    window.print();
  }

  function getVerifyUrl(): string {
    const base = `${window.location.origin}/verify/${encodeURIComponent(code)}`;
    return verificationToken ? `${base}?token=${encodeURIComponent(verificationToken)}` : base;
  }

  async function handleShare() {
    const url = getVerifyUrl();
    if (navigator.share) {
      await navigator.share({
        title: "Certificado NOVA STEM HUB",
        text: `Verifica mi certificado NOVA: ${code}`,
        url,
      });
      return;
    }
    await navigator.clipboard.writeText(url);
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(getVerifyUrl());
  }

  return (
    <div className="space-y-3 print:hidden">
      <div className="rounded-xl border border-nova-cyan/20 bg-nova-cyan/5 px-4 py-3 text-sm text-nova-cyan-light/90">
        <p className="font-semibold text-white">¿Cómo guardar o compartir tu certificado?</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs leading-relaxed text-nova-cyan-light/80">
          <li>
            <strong className="text-white">Descargar PDF</strong> genera un archivo de alta calidad
            listo para imprimir.
          </li>
          <li>
            <strong className="text-white">Copiar enlace de verificación</strong> permite a terceros
            validar tu credencial en la página pública.
          </li>
          <li>
            Si prefieres, usa <strong className="text-white">Guardar como PDF</strong> del navegador.
          </li>
        </ol>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/api/certificates/${encodeURIComponent(code)}/pdf`}
          className="nova-btn-primary nova-btn-glow inline-flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileDown className="h-4 w-4" />
          Descargar PDF
        </Link>
        <button
          type="button"
          onClick={handleCopyLink}
          className="nova-btn-secondary inline-flex items-center gap-2 border-white/20 text-white"
        >
          <Link2 className="h-4 w-4" />
          Copiar enlace de verificación
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="nova-btn-secondary inline-flex items-center gap-2 border-white/20 text-white"
        >
          <Share2 className="h-4 w-4" />
          Compartir
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="nova-btn-secondary inline-flex items-center gap-2 border-white/20 text-white"
        >
          <Printer className="h-4 w-4" />
          Imprimir
        </button>
      </div>
    </div>
  );
}
