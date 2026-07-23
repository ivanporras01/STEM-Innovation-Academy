import type { Metadata } from "next";
import Link from "next/link";
import { VerifyCertificateSearch } from "@/components/verify/verify-certificate-search";
import { DEMO_CERTIFICATES } from "@/data/novahub/certificates";
import { SAMPLE_CERTIFICATE_PAGE_PATH, getSampleCertificatePdfPath } from "@/lib/certificates/constants";
import { NOVA_COLLEGE, NOVAHUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Verificar certificado | NOVA College",
  description:
    "Verifica certificados NOVA College emitidos por NOVA STEM HUB. Empleadores y estudiantes pueden confirmar credenciales.",
  path: "/es/verify",
  locale: "es",
});

export default function SpanishVerifyPage() {
  const demoCodes = DEMO_CERTIFICATES.map((c) => c.code);

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-green/10 via-transparent to-nova-cyan/10" />
        <div className="nova-container relative text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVAHUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">Verificar certificado</h1>
          <p className="mx-auto mt-4 max-w-2xl text-nova-cyan-light/85">
            Confirma que un graduado de {NOVA_COLLEGE.name} completó su programa y obtuvo credenciales
            verificables. Futuro dominio: verify.novastemhub.education
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1 py-12">
        <div className="nova-container">
          <VerifyCertificateSearch demoCodes={demoCodes} locale="es" />
          <p className="mx-auto mt-10 max-w-lg text-center text-xs text-nova-cyan-light/50">
            MVP con registro demo. Los certificados reales se emitirán al completar evaluación y
            capstone bajo supervisión institucional o beca NOVA STEM HUB.
          </p>
          <p className="mx-auto mt-4 max-w-lg text-center text-xs text-nova-cyan-light/60">
            Vista previa del diseño oficial:{" "}
            <a href={getSampleCertificatePdfPath("es")} download className="text-nova-cyan hover:underline">
              Descargar PDF de muestra
            </a>
            {" · "}
            <a href={`${SAMPLE_CERTIFICATE_PAGE_PATH}?locale=es`} className="text-nova-cyan hover:underline">
              Ver certificado de muestra
            </a>
          </p>
          <p className="mx-auto mt-4 text-center text-xs text-nova-cyan-light/50">
            <Link href="/verify" className="hover:text-nova-cyan">
              English edition →
            </Link>
          </p>
        </div>
      </main>

      </div>
  );
}
