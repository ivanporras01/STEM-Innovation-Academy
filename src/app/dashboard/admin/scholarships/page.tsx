import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getScholarshipApplications } from "@/lib/scholarships/applications";
import { SCHOLARSHIP_PROGRAMS } from "@/data/novahub/scholarships";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solicitudes de beca — Admin",
};

export default async function AdminScholarshipsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN" && session.user.role !== "SCHOOL_ADMIN") {
    redirect("/dashboard/student");
  }

  const applications = await getScholarshipApplications();
  const programNames = Object.fromEntries(
    SCHOLARSHIP_PROGRAMS.map((p) => [p.id, p.nameEs]),
  );

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
          NOVA STEM HUB Becas
        </p>
        <h1 className="text-2xl font-bold text-white">Solicitudes de beca</h1>
        <p className="mt-1 text-nova-cyan-light/80">
          Revisión manual — {applications.length} solicitud{applications.length !== 1 ? "es" : ""}{" "}
          registrada{applications.length !== 1 ? "s" : ""}
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="nova-card text-center">
          <p className="text-nova-cyan-light/80">Aún no hay solicitudes.</p>
          <p className="mt-2 text-sm text-nova-cyan-light/60">
            Las solicitudes de{" "}
            <Link href="/scholarships/apply" className="text-nova-cyan hover:underline">
              /scholarships/apply
            </Link>{" "}
            aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <article key={app.id} className="nova-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-white">{app.name}</h2>
                  <p className="text-sm text-nova-cyan-light/80">{app.email}</p>
                </div>
                <div className="text-right text-xs text-nova-cyan-light/60">
                  <p>{formatDate(new Date(app.submittedAt))}</p>
                  <p className="font-mono text-[10px] text-white/40">{app.id}</p>
                </div>
              </div>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-xs text-nova-cyan-light/50">Programa</dt>
                  <dd>{programNames[app.programId] ?? app.programId}</dd>
                </div>
                <div>
                  <dt className="text-xs text-nova-cyan-light/50">Edad / País</dt>
                  <dd>
                    {app.age} · {app.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-nova-cyan-light/50">Track</dt>
                  <dd className="font-mono text-xs">{app.trackInterest}</dd>
                </div>
                {app.institution && (
                  <div>
                    <dt className="text-xs text-nova-cyan-light/50">Institución</dt>
                    <dd>{app.institution}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase text-nova-cyan-light/50">
                  Motivación
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-nova-cyan-light/85">
                  {app.whyNeedScholarship}
                </p>
              </div>
              <div className="mt-3 flex gap-2">
                <a
                  href={`mailto:${app.email}?subject=Beca%20NOVA%20STEM%20HUB%20—%20${encodeURIComponent(app.name)}`}
                  className="nova-btn-secondary text-xs"
                >
                  Responder por email
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
