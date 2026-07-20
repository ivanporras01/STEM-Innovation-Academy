"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { INSTITUTION_PAYMENT_METHODS } from "@/lib/payments/payment-methods";
import type { PartnershipStatus } from "@prisma/client";

type Application = {
  id: string;
  institutionName: string;
  contactName: string;
  email: string;
  estimatedStudents: number;
  productInterest: string;
  status: PartnershipStatus;
  paymentMethod: string | null;
  message: string;
  submittedAt: string;
};

export function PartnershipApprovePanel({
  application,
  courseOptions,
}: {
  application: Application;
  courseOptions: { id: string; title: string }[];
}) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState(
    application.paymentMethod ?? "WIRE_TRANSFER"
  );
  const [paymentNotes, setPaymentNotes] = useState("");
  const [bulkEmails, setBulkEmails] = useState("");
  const [createSchoolAdmin, setCreateSchoolAdmin] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    courseOptions.map((c) => c.id)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<string | null>(null);

  if (application.status !== "PENDING") {
    return (
      <p className="text-sm text-nova-cyan-light/70">
        Status: <strong className="text-white">{application.status}</strong>
      </p>
    );
  }

  async function approve() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/partnerships/${application.id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod,
          paymentNotes,
          createSchoolAdmin,
          bulkEmails: bulkEmails.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean),
          courseIds: selectedCourses,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Approval failed");
        return;
      }
      setResult(
        `Approved! School created, ${data.studentsEnrolled} students registered, ${data.enrollmentRecords} enrollments.`
      );
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
      {result && (
        <div className="rounded-xl border border-nova-green/30 bg-nova-green/10 px-4 py-3 text-sm text-nova-green">
          {result}
        </div>
      )}
      <div>
        <label className="nova-label">Institution payment method</label>
        <select
          className="nova-input"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          {INSTITUTION_PAYMENT_METHODS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="nova-label">Payment notes (invoice #, wire ref, etc.)</label>
        <input
          className="nova-input"
          value={paymentNotes}
          onChange={(e) => setPaymentNotes(e.target.value)}
          placeholder="Optional"
        />
      </div>
      <div>
        <label className="nova-label">Student emails (one per line)</label>
        <textarea
          className="nova-input min-h-[80px] resize-y"
          value={bulkEmails}
          onChange={(e) => setBulkEmails(e.target.value)}
          placeholder="student1@school.edu&#10;student2@school.edu"
        />
      </div>
      <div>
        <p className="nova-label">Mission paths to enroll</p>
        <div className="flex flex-wrap gap-2">
          {courseOptions.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm text-nova-cyan-light/85">
              <input
                type="checkbox"
                checked={selectedCourses.includes(c.id)}
                onChange={(e) => {
                  setSelectedCourses((prev) =>
                    e.target.checked ? [...prev, c.id] : prev.filter((id) => id !== c.id)
                  );
                }}
              />
              {c.title}
            </label>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-nova-cyan-light/85">
        <input
          type="checkbox"
          checked={createSchoolAdmin}
          onChange={(e) => setCreateSchoolAdmin(e.target.checked)}
        />
        Create SCHOOL_ADMIN for {application.contactName} ({application.email})
      </label>
      <button
        type="button"
        onClick={approve}
        disabled={loading}
        className="nova-btn-primary disabled:opacity-60"
      >
        {loading ? "Approving contract…" : "Approve contract & bulk enroll"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
