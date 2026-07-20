"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPrice } from "@/lib/enrollment-access";
import { formatPaymentMethodLabel } from "@/lib/payments/payment-methods";
import type { PaymentMethod, PaymentStatus } from "@prisma/client";

type PendingPayment = {
  id: string;
  amountCents: number;
  method: PaymentMethod;
  status: PaymentStatus;
  notes: string | null;
  createdAt: string;
  user: { firstName: string; lastName: string; email: string };
  course: { title: string; slug: string };
};

export function ApprovePaymentButton({ payment }: { payment: PendingPayment }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function approve() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/payments/${payment.id}/approve`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Approval failed");
        return;
      }
      setDone(true);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <span className="text-sm font-semibold text-nova-green">✓ Unlocked</span>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={approve}
        disabled={loading}
        className="nova-btn-primary text-sm disabled:opacity-60"
      >
        {loading ? "Approving…" : "Approve & unlock"}
      </button>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function PendingPaymentCard({ payment }: { payment: PendingPayment }) {
  return (
    <article className="nova-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-white">
            {payment.user.firstName} {payment.user.lastName}
          </h2>
          <p className="text-sm text-nova-cyan-light/80">{payment.user.email}</p>
        </div>
        <ApprovePaymentButton payment={payment} />
      </div>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-xs text-nova-cyan-light/50">Mission path</dt>
          <dd>{payment.course.title}</dd>
        </div>
        <div>
          <dt className="text-xs text-nova-cyan-light/50">Amount</dt>
          <dd>{formatPrice(payment.amountCents)}</dd>
        </div>
        <div>
          <dt className="text-xs text-nova-cyan-light/50">Method</dt>
          <dd>{formatPaymentMethodLabel(payment.method)}</dd>
        </div>
        <div>
          <dt className="text-xs text-nova-cyan-light/50">Reference / notes</dt>
          <dd className="font-mono text-xs">{payment.notes ?? "—"}</dd>
        </div>
      </dl>
      <p className="mt-2 font-mono text-[10px] text-white/40">{payment.id}</p>
    </article>
  );
}
