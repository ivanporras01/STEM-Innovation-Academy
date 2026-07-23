import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, requireRole } from "@/lib/auth";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import {
  getCertificatesForAdmin,
  adminIssueCertificate,
  adminRevokeCertificate,
  adminReplaceCertificate,
} from "@/lib/certificates/admin-actions";
import { Search, Award, RotateCcw, Ban, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin · Certificates — NOVA",
};

type Props = {
  searchParams: Promise<{
    q?: string;
    status?: "ALL" | "VALID" | "REVOKED" | "REPLACED";
    issued?: string;
    revoked?: string;
    replaced?: string;
    error?: string;
  }>;
};

const statusOptions = [
  { value: "ALL", label: "All statuses" },
  { value: "VALID", label: "Valid" },
  { value: "REVOKED", label: "Revoked" },
  { value: "REPLACED", label: "Replaced" },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "VALID") return <Badge variant="green">Valid</Badge>;
  if (status === "REVOKED") return <Badge variant="orange">Revoked</Badge>;
  if (status === "REPLACED") return <Badge variant="blue">Replaced</Badge>;
  return <Badge>{status}</Badge>;
}

export default async function AdminCertificatesPage({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user || !requireRole(session.user.role, ["ADMIN", "SCHOOL_ADMIN"])) {
    redirect("/login");
  }

  const { q, status = "ALL", issued, revoked, replaced, error } = await searchParams;
  const certificates = await getCertificatesForAdmin({ query: q, status });

  return (
    <DashboardShell user={session.user}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Certificates</h1>
        <p className="text-sm text-nova-cyan-light/70">
          Search, issue, replace, and revoke NOVA STEM HUB credentials.
        </p>
      </div>

      {issued && (
        <div className="mb-4 rounded-lg border border-nova-green/30 bg-nova-green/10 px-4 py-3 text-sm text-nova-green">
          Certificate issued: <strong>{issued}</strong>
        </div>
      )}
      {revoked && (
        <div className="mb-4 rounded-lg border border-nova-orange/30 bg-nova-orange/10 px-4 py-3 text-sm text-nova-orange">
          Certificate revoked.
        </div>
      )}
      {replaced && (
        <div className="mb-4 rounded-lg border border-nova-cyan/30 bg-nova-cyan/10 px-4 py-3 text-sm text-nova-cyan">
          Certificate replaced with: <strong>{replaced}</strong>
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Error: {decodeURIComponent(error)}
        </div>
      )}

      {/* Search / filter */}
      <form
        action="/dashboard/admin/certificates"
        method="GET"
        className="mb-6 flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nova-cyan-light/50" />
          <input
            type="text"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by code, certificate ID, or holder name"
            className="h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-nova-cyan-light/50 focus:border-nova-cyan"
          />
        </div>
        <select
          name="status"
          defaultValue={status}
          className="h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-nova-cyan"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="nova-btn-secondary inline-flex items-center gap-2 border-white/20 text-white"
        >
          Filter
        </button>
      </form>

      {/* Issue form */}
      <section className="nova-glass-card mb-8 p-5">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <Award className="h-5 w-5 text-nova-cyan" />
          Issue certificate manually
        </h2>
        <form action={adminIssueCertificate} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            name="userId"
            placeholder="Student user ID"
            required
            className="h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-nova-cyan"
          />
          <input
            type="text"
            name="courseId"
            placeholder="Course ID"
            required
            className="h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-nova-cyan"
          />
          <input
            type="text"
            name="locale"
            placeholder="Locale (en/es/pt)"
            defaultValue="en"
            className="h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-nova-cyan"
          />
          <input
            type="text"
            name="reason"
            placeholder="Reason (optional)"
            className="h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-nova-cyan"
          />
          <div className="sm:col-span-2 lg:col-span-4">
            <button type="submit" className="nova-btn-primary nova-btn-glow inline-flex">
              Issue certificate
            </button>
          </div>
        </form>
      </section>

      {/* Certificates table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-nova-cyan-light/80">
            <tr>
              <th className="px-4 py-3 font-medium">Certificate ID</th>
              <th className="px-4 py-3 font-medium">Holder</th>
              <th className="px-4 py-3 font-medium">Program</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Issued</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {certificates.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-nova-cyan-light/70">
                  No certificates found.
                </td>
              </tr>
            ) : (
              certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-white/5">
                  <td className="px-4 py-3 font-mono text-xs text-nova-cyan-light">
                    {cert.certificateId ?? cert.code}
                  </td>
                  <td className="px-4 py-3 text-white">
                    <div className="font-medium">{cert.holderName}</div>
                    <div className="text-xs text-nova-cyan-light/60">{cert.user.email}</div>
                  </td>
                  <td className="px-4 py-3 text-nova-cyan-light">
                    {cert.programTitle}
                    <div className="text-xs text-white/40">{cert.course.title}</div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={cert.status} />
                  </td>
                  <td className="px-4 py-3 text-nova-cyan-light/70">
                    {new Date(cert.issuedAt).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/verify/${encodeURIComponent(cert.code)}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white hover:bg-white/10"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View
                      </Link>
                      {cert.status === "VALID" && (
                        <>
                          <form action={adminReplaceCertificate} className="inline">
                            <input type="hidden" name="certificateId" value={cert.id} />
                            <input
                              type="text"
                              name="reason"
                              placeholder="Reason"
                              className="mr-2 h-7 rounded border border-white/10 bg-white/5 px-2 text-xs text-white outline-none focus:border-nova-cyan"
                            />
                            <button
                              type="submit"
                              className="inline-flex items-center gap-1 rounded-lg border border-nova-cyan/30 bg-nova-cyan/10 px-2 py-1 text-xs text-nova-cyan-light hover:bg-nova-cyan/20"
                            >
                              <RotateCcw className="h-3 w-3" />
                              Replace
                            </button>
                          </form>
                          <form action={adminRevokeCertificate} className="inline">
                            <input type="hidden" name="certificateId" value={cert.id} />
                            <input
                              type="text"
                              name="reason"
                              placeholder="Reason"
                              className="mr-2 h-7 rounded border border-white/10 bg-white/5 px-2 text-xs text-white outline-none focus:border-nova-cyan"
                            />
                            <button
                              type="submit"
                              className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1 text-xs text-red-300 hover:bg-red-500/20"
                            >
                              <Ban className="h-3 w-3" />
                              Revoke
                            </button>
                          </form>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
