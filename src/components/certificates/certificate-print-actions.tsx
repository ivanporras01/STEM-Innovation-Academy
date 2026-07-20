"use client";

import Link from "next/link";
import { Printer, Share2 } from "lucide-react";

type Props = {
  code: string;
};

export function CertificatePrintActions({ code }: Props) {
  function handlePrint() {
    window.print();
  }

  async function handleShare() {
    const url = `${window.location.origin}/verify?code=${encodeURIComponent(code)}`;
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

  return (
    <div className="space-y-3 print:hidden">
      <div className="rounded-xl border border-nova-cyan/20 bg-nova-cyan/5 px-4 py-3 text-sm text-nova-cyan-light/90">
        <p className="font-semibold text-white">¿Cómo guardar tu certificado en PDF?</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs leading-relaxed text-nova-cyan-light/80">
          <li>Haz clic en <strong className="text-white">Guardar como PDF</strong> abajo.</li>
          <li>
            En el diálogo de impresión del navegador, elige{" "}
            <strong className="text-white">Guardar como PDF</strong> (o &quot;Microsoft Print to
            PDF&quot; en Windows).
          </li>
          <li>Orientación <strong className="text-white">horizontal</strong> recomendada.</li>
          <li>Activa <strong className="text-white">Gráficos de fondo</strong> si tu navegador lo
            ofrece, para conservar colores y marcos.</li>
        </ol>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handlePrint}
          className="nova-btn-primary nova-btn-glow inline-flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Guardar como PDF
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="nova-btn-secondary inline-flex items-center gap-2 border-white/20 text-white"
        >
          <Share2 className="h-4 w-4" />
          Compartir enlace de verificación
        </button>
        <Link
          href={`/verify?code=${encodeURIComponent(code)}`}
          className="nova-btn-secondary inline-flex items-center border-white/20 text-white"
        >
          Verificar públicamente
        </Link>
      </div>
    </div>
  );
}
