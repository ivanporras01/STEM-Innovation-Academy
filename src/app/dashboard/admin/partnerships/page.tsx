import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PartnershipApprovePanel } from "@/components/admin/partnership-approve-panel";
import { formatPaymentMethodLabel } from "@/lib/payments/payment-methods";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Partnership Applications — Admin",
};

export default async function AdminPartnershipsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN" && session.user.role !== "SCHOOL_ADMIN") {
    redirect("/dashboard/student");
  }

  const [applications, courses] = await Promise.all([
    db.partnershipApplication.findMany({ orderBy: { submittedAt: "desc" } }),
    db.course.findMany({
      where: { published: true },
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),
  ]);

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
          NOVA Partnership
        </p>
        <h1 className="text-2xl font-bold text-white">Institutional contracts</h1>
        <p className="mt-1 text-nova-cyan-light/80">
          Review applications, record payment method (including wire transfer), and bulk-enroll
          students when the contract is approved.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="nova-card text-center">
          <p className="text-nova-cyan-light/80">No partnership applications yet.</p>
          <p className="mt-2 text-sm text-nova-cyan-light/60">
            Applications from{" "}
            <Link href="/partnership/apply" className="text-nova-cyan hover:underline">
              /partnership/apply
            </Link>{" "}
            appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <article key={app.id} className="nova-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-white">{app.institutionName}</h2>
                  <p className="text-sm text-nova-cyan-light/80">
                    {app.contactName} · {app.email}
                  </p>
                </div>
                <div className="text-right text-xs text-nova-cyan-light/60">
                  <p>{formatDate(app.submittedAt)}</p>
                  <p className="font-semibold text-nova-cyan">{app.status}</p>
                </div>
              </div>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-xs text-nova-cyan-light/50">Students / year</dt>
                  <dd>{app.estimatedStudents}</dd>
                </div>
                <div>
                  <dt className="text-xs text-nova-cyan-light/50">Products</dt>
                  <dd>{app.productInterest}</dd>
                </div>
                <div>
                  <dt className="text-xs text-nova-cyan-light/50">Preferred payment</dt>
                  <dd>
                    {app.paymentMethod
                      ? formatPaymentMethodLabel(app.paymentMethod)
                      : "Not specified"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-nova-cyan-light/50">Location</dt>
                  <dd>
                    {app.city}, {app.country}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-nova-cyan-light/80">{app.message}</p>
              {session.user.role === "ADMIN" && (
                <PartnershipApprovePanel
                  application={{
                    ...app,
                    submittedAt: app.submittedAt.toISOString(),
                  }}
                  courseOptions={courses}
                />
              )}
            </article>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
