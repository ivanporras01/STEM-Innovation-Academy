import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PendingPaymentCard } from "@/components/admin/pending-payments";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Pending Payments — Admin",
};

export default async function AdminPaymentsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN" && session.user.role !== "SCHOOL_ADMIN") {
    redirect("/dashboard/student");
  }

  const pendingPayments = await db.payment.findMany({
    where: {
      status: "PENDING",
      method: { in: ["ZELLE", "VENMO", "OTHER"] },
    },
    include: {
      user: { select: { firstName: true, lastName: true, email: true } },
      course: { select: { title: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell user={session.user}>
      <div className="mb-8">
        <Link
          href="/dashboard/admin"
          className="mb-2 inline-block text-sm text-nova-cyan hover:underline"
        >
          ← Admin Overview
        </Link>
        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-nova-orange">
          Enrollment payments
        </p>
        <h1 className="text-2xl font-bold text-white">Pending Zelle / Venmo / Other</h1>
        <p className="mt-1 text-nova-cyan-light/80">
          Verify payment received, then approve to unlock the Explorer&apos;s mission path instantly.
        </p>
      </div>

      {pendingPayments.length === 0 ? (
        <div className="nova-card text-center">
          <p className="text-nova-cyan-light/80">No pending manual payments — all clear!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingPayments.map((payment) => (
            <PendingPaymentCard
              key={payment.id}
              payment={{
                ...payment,
                createdAt: payment.createdAt.toISOString(),
              }}
            />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
