"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PAYMENT_INSTRUCTIONS,
  STUDENT_PAYMENT_METHODS,
  type PaymentMethodOption,
} from "@/lib/payments/payment-methods";
import { formatPrice } from "@/lib/enrollment-access";
import { SalePriceFromCents } from "@/components/pricing/sale-price";
import { salePriceCents } from "@/lib/pricing";
import type { PaymentMethod } from "@prisma/client";

type Step = "choose" | "instructions" | "processing";

type PendingManual = {
  paymentId: string;
  reference: string;
  method: PaymentMethod;
  amountCents: number;
  courseTitle: string;
  courseSlug: string;
};

type Props = {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  priceCents: number;
  stripeAvailable?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function CheckoutModal({
  courseId,
  courseSlug,
  courseTitle,
  priceCents,
  stripeAvailable = false,
  onClose,
  onSuccess,
}: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(
    STUDENT_PAYMENT_METHODS.length === 1 ? "instructions" : "choose",
  );
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [otherNote, setOtherNote] = useState("");
  const [pending, setPending] = useState<PendingManual | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodOption | null>(
    STUDENT_PAYMENT_METHODS.length === 1 ? STUDENT_PAYMENT_METHODS[0]! : null,
  );

  const chargeCents = salePriceCents(priceCents);
  const stripeReady = stripeAvailable;

  async function submitCheckout(method: PaymentMethod) {
    setStep("processing");
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          method,
          reference: reference.trim() || undefined,
          notes: otherNote.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Checkout failed");
        setStep(STUDENT_PAYMENT_METHODS.length === 1 ? "instructions" : "choose");
        return;
      }

      if (data.enrolled) {
        onSuccess?.();
        router.refresh();
        onClose();
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.pending && data.paymentId) {
        setPending({
          paymentId: data.paymentId,
          reference: data.reference,
          method,
          amountCents: data.amountCents ?? chargeCents,
          courseTitle: data.courseTitle ?? courseTitle,
          courseSlug: data.courseSlug ?? courseSlug,
        });
        setStep("instructions");
        return;
      }

      if (data.demo && data.paymentId) {
        const confirmRes = await fetch("/api/checkout/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId: data.paymentId }),
        });
        if (confirmRes.ok) {
          onSuccess?.();
          router.refresh();
          onClose();
          return;
        }
      }

      setError("Unexpected checkout response");
      setStep(STUDENT_PAYMENT_METHODS.length === 1 ? "instructions" : "choose");
    } catch {
      setError("Something went wrong. Please try again.");
      setStep(STUDENT_PAYMENT_METHODS.length === 1 ? "instructions" : "choose");
    }
  }

  function handleMethodSelect(method: PaymentMethodOption) {
    setSelectedMethod(method);
    setError("");

    if (method.id === "STRIPE") {
      void submitCheckout("STRIPE");
      return;
    }

    setStep("instructions");
  }

  async function submitManualPayment() {
    if (!selectedMethod) return;
    if (selectedMethod.id === "OTHER" && !otherNote.trim() && !reference.trim()) {
      setError("Please describe your payment method or add a reference.");
      return;
    }
    await submitCheckout(selectedMethod.id);
  }

  const instructions = pending
    ? PAYMENT_INSTRUCTIONS[pending.method]
    : selectedMethod
      ? PAYMENT_INSTRUCTIONS[selectedMethod.id]
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className="nova-glass-island max-h-[90vh] w-full max-w-lg overflow-y-auto shadow-nova"
        role="dialog"
        aria-labelledby="checkout-title"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-nova-cyan">
              Enroll in mission path
            </p>
            <h2 id="checkout-title" className="text-xl font-bold text-white">
              {courseTitle}
            </h2>
            <p className="mt-1 text-sm text-nova-cyan-light/80">
              <SalePriceFromCents listCents={priceCents} showBadge />
              <span className="ml-1">· full path access</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-nova-cyan-light/60 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-400/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {step === "choose" && (
          <div className="space-y-3">
            <p className="text-sm text-nova-cyan-light/85">
              Pay with PayPal. Your mission path unlocks once payment is confirmed — usually within
              24 hours.
            </p>
            {STUDENT_PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => handleMethodSelect(method)}
                className="nova-glass-card w-full text-left transition hover:border-nova-cyan/40"
              >
                <p className="font-semibold text-white">{method.label}</p>
                <p className="mt-1 text-sm text-nova-cyan-light/75">{method.description}</p>
                {method.id === "STRIPE" && !stripeReady && (
                  <p className="mt-1 text-xs text-nova-orange">
                    Card checkout in demo mode — payment simulates instantly in dev.
                  </p>
                )}
              </button>
            ))}
          </div>
        )}

        {step === "processing" && (
          <div className="py-8 text-center">
            <p className="text-nova-cyan-light/80">Processing checkout…</p>
          </div>
        )}

        {step === "instructions" && !pending && selectedMethod && selectedMethod.id !== "STRIPE" && (
          <div className="space-y-4">
            {instructions && (
              <>
                <h3 className="font-semibold text-white">{instructions.heading}</h3>
                {instructions.account && (
                  <p className="rounded-xl bg-nova-cyan/10 px-4 py-2 font-mono text-sm text-nova-cyan">
                    {instructions.account}
                  </p>
                )}
                <p className="text-sm text-nova-cyan-light/85">
                  Amount due:{" "}
                  <strong className="text-white">{formatPrice(chargeCents)}</strong>
                  {chargeCents < priceCents && (
                    <span className="ml-2 text-white/45 line-through">{formatPrice(priceCents)}</span>
                  )}
                </p>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-nova-cyan-light/85">
                  {instructions.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </>
            )}
            <div>
              <label htmlFor="payment-ref" className="nova-label">
                Your PayPal confirmation or name
              </label>
              <input
                id="payment-ref"
                className="nova-input"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. PayPal transaction ID or your name"
              />
            </div>
            {selectedMethod.id === "OTHER" && (
              <div>
                <label htmlFor="other-note" className="nova-label">
                  How will you pay?
                </label>
                <input
                  id="other-note"
                  className="nova-input"
                  value={otherNote}
                  onChange={(e) => setOtherNote(e.target.value)}
                  placeholder="Describe your method"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={submitManualPayment} className="nova-btn-primary">
                I&apos;ve paid / submit PayPal request
              </button>
              {STUDENT_PAYMENT_METHODS.length > 1 && (
                <button type="button" onClick={() => setStep("choose")} className="nova-btn-secondary">
                  Back
                </button>
              )}
            </div>
          </div>
        )}

        {step === "instructions" && pending && (
          <div className="space-y-4">
            <div className="rounded-xl border border-nova-green/30 bg-nova-green/10 px-4 py-3 text-sm text-nova-green">
              Payment request received! Include reference{" "}
              <strong className="font-mono">{pending.reference}</strong> with your{" "}
              {selectedMethod?.label ?? "PayPal"} payment. We&apos;ll email you when your path
              unlocks.
            </div>
            {instructions && (
              <>
                <h3 className="font-semibold text-white">{instructions.heading}</h3>
                {instructions.account && (
                  <p className="rounded-xl bg-nova-cyan/10 px-4 py-2 font-mono text-sm text-nova-cyan">
                    {instructions.account}
                  </p>
                )}
                <p className="text-sm text-nova-cyan-light/85">
                  Amount: <strong className="text-white">{formatPrice(pending.amountCents)}</strong>
                </p>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-nova-cyan-light/85">
                  {instructions.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </>
            )}
            <p className="text-xs text-nova-cyan-light/60">
              Reference code: <span className="font-mono text-nova-cyan">{pending.reference}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  router.push("/dashboard/student");
                  onClose();
                }}
                className="nova-btn-primary"
              >
                Go to Explorer Portal
              </button>
              <button type="button" onClick={onClose} className="nova-btn-secondary">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
