import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getUserCertificates } from "@/lib/certificates/service";
import { Award, ExternalLink, FileDown } from "lucide-react";
import { PASSING_SCORE_PERCENT } from "@/lib/certificates/constants";

export const metadata: Metadata = {
  title: "Mis certificados — NOVA",
};

export default async function StudentCertificatesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const certificates = await getUserCertificates(session.user.id);

  return (
    <DashboardShell user={session.user}>
      <div className="mb-8">
        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-nova-cyan">
          Certificados
        </p>
        <h1 className="text-2xl font-bold text-white">Mis certificados NOVA</h1>
        <p className="mt-1 text-nova-cyan-light/80">
          Certificados emitidos al aprobar el examen final con {PASSING_SCORE_PERCENT}% o más (hasta 3
          intentos por curso).
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="nova-glass-card p-8 text-center">
          <Award className="mx-auto mb-4 h-10 w-10 text-nova-cyan/50" />
          <p className="text-white">Aún no tienes certificados.</p>
          <p className="mt-2 text-sm text-nova-cyan-light/70">
            Completa un curso, aprueba el examen final y tu certificado aparecerá aquí.
          </p>
          <Link href="/courses" className="nova-btn-primary nova-btn-glow mt-6 inline-flex">
            Ver Mission Paths
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map((cert) => (
            <article key={cert.id} className="nova-glass-card flex flex-col p-5">
              <p className="text-xs font-mono uppercase tracking-wider text-nova-cyan/70">
                {cert.prefix}
              </p>
              <h2 className="mt-1 font-semibold text-white">{cert.programTitle}</h2>
              <p className="mt-2 text-sm text-nova-cyan-light/80">
                Puntaje: <strong className="text-nova-green">{cert.scorePercent}%</strong> ·{" "}
                {cert.issuedAt.toLocaleDateString("es-PR")}
              </p>
              <p className="mt-1 font-mono text-xs text-white/50">{cert.code}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/dashboard/student/certificates/${cert.code}`}
                  className="nova-btn-primary nova-btn-glow inline-flex text-sm"
                >
                  Ver certificado
                </Link>
                <Link
                  href={`/api/certificates/${encodeURIComponent(cert.code)}/pdf`}
                  className="nova-btn-secondary inline-flex items-center gap-1 border-white/20 text-sm text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Descargar PDF
                  <FileDown className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={`/verify?code=${encodeURIComponent(cert.code)}`}
                  className="nova-btn-secondary inline-flex items-center gap-1 border-white/20 text-sm text-white"
                >
                  Verificar
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
