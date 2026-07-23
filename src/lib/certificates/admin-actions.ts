"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  issueCertificate,
  revokeCertificate,
  replaceCertificate,
} from "@/lib/certificates/issue-certificate";
import type { Prisma, CertificateStatus, Role } from "@prisma/client";

const ADMIN_ROLES: Role[] = ["ADMIN", "SCHOOL_ADMIN"];

function assertAdmin(sessionUser: { role: Role } | undefined) {
  if (!sessionUser || !requireRole(sessionUser.role, ADMIN_ROLES)) {
    throw new Error("Unauthorized");
  }
}

export async function getCertificatesForAdmin(options?: {
  query?: string;
  status?: "ALL" | CertificateStatus;
  limit?: number;
}) {
  const session = await auth();
  assertAdmin(session?.user);

  const { query, status = "ALL", limit = 100 } = options ?? {};
  const where: Prisma.CertificateWhereInput = {};

  if (query && query.trim()) {
    const normalized = query.trim();
    where.OR = [
      { code: { contains: normalized.toUpperCase() } },
      { holderName: { contains: normalized } },
      { certificateId: { contains: normalized.toUpperCase() } },
    ];
  }

  if (status && status !== "ALL") {
    where.status = status;
  }

  return db.certificate.findMany({
    where,
    orderBy: { issuedAt: "desc" },
    take: limit,
    include: {
      user: {
        select: { firstName: true, lastName: true, email: true, role: true },
      },
      course: {
        select: { title: true, slug: true },
      },
    },
  });
}

export async function adminIssueCertificate(formData: FormData) {
  const session = await auth();
  assertAdmin(session?.user);

  const userId = formData.get("userId") as string;
  const courseId = formData.get("courseId") as string;
  const locale = (formData.get("locale") as string) || undefined;
  const reason = (formData.get("reason") as string) || undefined;

  if (!userId || !courseId) {
    redirect("/dashboard/admin/certificates?error=missing-fields");
  }

  const result = await issueCertificate({
    userId,
    courseId,
    locale,
    adminOverride: true,
    metadata: {
      issuedByAdminId: session?.user?.id,
      reason,
    } as Prisma.InputJsonValue,
  });

  if (!result.ok) {
    redirect(`/dashboard/admin/certificates?error=${encodeURIComponent(result.error)}`);
  }

  redirect(`/dashboard/admin/certificates?issued=${encodeURIComponent(result.certificate.code)}`);
}

export async function adminRevokeCertificate(formData: FormData) {
  const session = await auth();
  assertAdmin(session?.user);

  const certificateId = formData.get("certificateId") as string;
  const reason = (formData.get("reason") as string) || undefined;

  if (!certificateId) {
    redirect("/dashboard/admin/certificates?error=missing-certificate-id");
  }

  const result = await revokeCertificate({
    certificateId,
    reason,
    adminId: session?.user?.id,
  });

  if (!result.ok) {
    redirect(`/dashboard/admin/certificates?error=${encodeURIComponent(result.error)}`);
  }

  redirect("/dashboard/admin/certificates?revoked=1");
}

export async function adminReplaceCertificate(formData: FormData) {
  const session = await auth();
  assertAdmin(session?.user);

  const certificateId = formData.get("certificateId") as string;
  const reason = (formData.get("reason") as string) || undefined;

  if (!certificateId) {
    redirect("/dashboard/admin/certificates?error=missing-certificate-id");
  }

  const result = await replaceCertificate({
    certificateId,
    reason,
    adminId: session?.user?.id,
  });

  if (!result.ok) {
    redirect(`/dashboard/admin/certificates?error=${encodeURIComponent(result.error)}`);
  }

  redirect(`/dashboard/admin/certificates?replaced=${encodeURIComponent(result.certificate.code)}`);
}
