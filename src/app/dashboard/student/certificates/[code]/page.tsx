import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { NovaCertificateTemplate } from "@/components/certificates/nova-certificate-template";
import { CertificatePrintActions } from "@/components/certificates/certificate-print-actions";
import { db } from "@/lib/db";
import type { AppLocale } from "@/lib/locale";
import { isCertificateLocale } from "@/lib/certificates/locale";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return { title: `Certificado ${code} — NOVA` };
}

export default async function StudentCertificateDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { code } = await params;
  const normalized = code.trim().toUpperCase();

  const certificate = await db.certificate.findUnique({
    where: { code: normalized },
  });

  if (!certificate || certificate.userId !== session.user.id) {
    notFound();
  }

  const certLocale: AppLocale = isCertificateLocale(certificate.locale)
    ? certificate.locale
    : "en";

  return (
    <DashboardShell user={session.user}>
      <div className="mb-6">
        <Link
          href="/dashboard/student/certificates"
          className="inline-flex items-center gap-2 text-sm text-nova-cyan hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a mis certificados
        </Link>
      </div>

      <CertificatePrintActions code={certificate.code} />

      <div className="mt-6">
        <NovaCertificateTemplate
          holderName={certificate.holderName}
          programTitle={certificate.programTitle}
          code={certificate.code}
          issuedAt={certificate.issuedAt.toISOString()}
          scorePercent={certificate.scorePercent}
          prefix={certificate.prefix}
          locale={certLocale}
        />
      </div>
    </DashboardShell>
  );
}
