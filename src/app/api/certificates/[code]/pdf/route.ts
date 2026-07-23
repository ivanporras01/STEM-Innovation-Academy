import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateCertificatePdfBuffer } from "@/lib/certificates/pdf-generator";
import { requireRole } from "@/lib/auth";

type Params = { code: string };

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> },
) {
  const session = await auth();
  const { code } = await params;
  const normalized = code.trim().toUpperCase();

  const certificate = await db.certificate.findUnique({
    where: { code: normalized },
  });

  if (!certificate) {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  }

  const isOwner = session?.user?.id === certificate.userId;
  const isAdmin = session?.user?.role && requireRole(session.user.role, ["ADMIN", "SCHOOL_ADMIN"]);

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const buffer = await generateCertificatePdfBuffer({
      holderName: certificate.holderName,
      programTitle: certificate.programTitle,
      code: certificate.code,
      credentialTitle: certificate.credentialTitle,
      category: certificate.category,
      credentialLevel: certificate.credentialLevel,
      completionDate: certificate.completionDate,
      issueDate: certificate.issueDate ?? certificate.issuedAt,
      learningHours: certificate.learningHours,
      finalScore: certificate.finalScore ? Math.round(certificate.finalScore * 100) : null,
      passingScore: certificate.passingScore ? Math.round(certificate.passingScore * 100) : null,
      locale: (certificate.locale as "en" | "es" | "pt") ?? "en",
    });

    const safeFileName = `NOVA-Certificate-${certificate.code}.pdf`.replace(/[^\w\-.]/g, "-");

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${safeFileName}"`,
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    });
  } catch (err) {
    console.error("PDF generation failed:", err);
    return NextResponse.json({ error: "Failed to generate certificate PDF" }, { status: 500 });
  }
}
