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
import { buildVerificationUrl, generateCertificateQrCode } from "@/lib/certificates/qr-code";
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

  if (
    !certificate ||
    certificate.userId !== session.user.id ||
    certificate.status !== "VALID"
  ) {
    notFound();
  }

  const certLocale: AppLocale = isCertificateLocale(certificate.locale)
    ? certificate.locale
    : "en";

  const verifyUrl = buildVerificationUrl(certificate.code, certificate.verificationToken ?? undefined);
  const qrCodeDataUrl = await generateCertificateQrCode(
    certificate.code,
    certificate.verificationToken ?? undefined,
  );

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

      <CertificatePrintActions
        code={certificate.code}
        verificationToken={certificate.verificationToken ?? undefined}
      />

      <div className="mt-6">
        <NovaCertificateTemplate
          holderName={certificate.holderName}
          programTitle={certificate.programTitle}
          code={certificate.code}
          issuedAt={certificate.issuedAt.toISOString()}
          scorePercent={certificate.scorePercent}
          prefix={certificate.prefix}
          locale={certLocale}
          verifyUrl={verifyUrl}
          credentialTitle={certificate.credentialTitle ?? undefined}
          category={certificate.category ?? undefined}
          credentialLevel={certificate.credentialLevel ?? undefined}
          completionDate={certificate.completionDate?.toISOString() ?? undefined}
          learningHours={certificate.learningHours ?? undefined}
          passingScore={
            certificate.passingScore != null
              ? Math.round(certificate.passingScore * 100)
              : undefined
          }
          qrCodeDataUrl={qrCodeDataUrl}
        />
      </div>
    </DashboardShell>
  );
}
