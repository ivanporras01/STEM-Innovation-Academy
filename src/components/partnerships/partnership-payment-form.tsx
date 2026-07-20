"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PaymentMethod, PaymentStatus } from "@prisma/client";
import { formatPrice } from "@/lib/enrollment-access";
import type { AppLocale } from "@/lib/locale";
import { getCopyLocale } from "@/lib/locale";
import {
  formatPaymentMethodLabel,
  getInstitutionPaymentInstructions,
  INSTITUTION_PAYMENT_METHODS,
} from "@/lib/payments/payment-methods";
import { buildPartnershipReference } from "@/lib/partnerships/deposit";
import { PARTNERSHIP_PATH } from "@/data/novahub/partnerships";

type ApplicationSummary = {
  id: string;
  institutionName: string;
  email: string;
  paymentMethod: PaymentMethod | null;
  paymentStatus: PaymentStatus;
  depositCents: number;
};

type Props = {
  application: ApplicationSummary;
  locale?: AppLocale;
  stripeAvailable?: boolean;
  paidReturn?: boolean;
  cancelled?: boolean;
};

const COPY = {
  en: {
    title: "Complete institutional payment",
    subtitle:
      "Your partnership application was received. Submit your licensing deposit to move forward — our team reviews within 5–7 business days.",
    amountLabel: "Licensing deposit",
    methodLabel: "Payment method",
    stripeHint: "Secure card checkout for pilot or annual licensing deposits.",
    stripeDemo: "Card checkout in demo mode — payment simulates instantly in dev.",
    referenceLabel: "Your reference (wire memo / confirmation #)",
    referencePlaceholder: "e.g. PO number or wire confirmation",
    otherNoteLabel: "Additional notes (optional)",
    submitStripe: "Pay deposit by card",
    submitManual: "Submit payment confirmation",
    processing: "Processing payment…",
    pendingTitle: "Payment submitted — pending verification",
    pendingBody:
      "Include your reference code with your payment. Our partnerships team will email you at {email} once verified and schedule onboarding.",
    completedTitle: "Deposit confirmed",
    completedBody:
      "Thank you! Our partnerships team will contact you within 5–7 business days to finalize licensing and pilot scope.",
    backPartnership: "Back to NOVA Partnership",
    errorGeneric: "Something went wrong. Please try again.",
    cancelled: "Checkout cancelled — you can try again when ready.",
  },
  es: {
    title: "Completa el pago institucional",
    subtitle:
      "Recibimos tu solicitud de partnership. Envía el depósito de licencia para continuar — nuestro equipo revisa en 5–7 días hábiles.",
    amountLabel: "Depósito de licencia",
    methodLabel: "Método de pago",
    stripeHint: "Pago seguro con tarjeta para depósitos piloto o licencia anual.",
    stripeDemo: "Checkout en modo demo — el pago se simula al instante en desarrollo.",
    referenceLabel: "Tu referencia (memo de transferencia / confirmación)",
    referencePlaceholder: "ej. número de PO o confirmación bancaria",
    otherNoteLabel: "Notas adicionales (opcional)",
    submitStripe: "Pagar depósito con tarjeta",
    submitManual: "Enviar confirmación de pago",
    processing: "Procesando pago…",
    pendingTitle: "Pago enviado — pendiente de verificación",
    pendingBody:
      "Incluye tu código de referencia con el pago. Nuestro equipo escribirá a {email} cuando se verifique y agendará el onboarding.",
    completedTitle: "Depósito confirmado",
    completedBody:
      "¡Gracias! Nuestro equipo de partnerships te contactará en 5–7 días hábiles para finalizar la licencia y el alcance piloto.",
    backPartnership: "Volver a NOVA Partnership",
    errorGeneric: "Algo salió mal. Por favor intenta de nuevo.",
    cancelled: "Checkout cancelado — puedes intentar de nuevo cuando quieras.",
  },
} as const;

export function PartnershipPaymentForm({
  application,
  locale = "en",
  stripeAvailable = false,
  paidReturn = false,
  cancelled = false,
}: Props) {
  const copy = COPY[getCopyLocale(locale)];
  const router = useRouter();
  const partnershipPath = locale === "es" ? "/es/partnership" : PARTNERSHIP_PATH;

  const method = application.paymentMethod ?? "WIRE_TRANSFER";
  const methodMeta = INSTITUTION_PAYMENT_METHODS.find((m) => m.id === method);
  const instructions = getInstitutionPaymentInstructions(method);
  const referenceCode = buildPartnershipReference(application.id);

  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(cancelled ? copy.cancelled : "");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(
    application.paymentStatus === "COMPLETED" || paidReturn,
  );
  const [pendingManual, setPendingManual] = useState(false);

  async function submitPayment() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/partnerships/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: application.id,
          reference: reference.trim() || undefined,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? copy.errorGeneric);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.demo) {
        const confirmRes = await fetch("/api/partnerships/payment/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applicationId: application.id }),
        });
        if (confirmRes.ok) {
          setSubmitted(true);
          router.refresh();
          return;
        }
      }

      if (data.pending) {
        setPendingManual(true);
        router.refresh();
        return;
      }

      setError(copy.errorGeneric);
    } catch {
      setError(copy.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="nova-glass-island mx-auto max-w-xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-nova-green/20 text-2xl text-nova-green">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-white">{copy.completedTitle}</h2>
        <p className="mt-3 text-nova-cyan-light/85">{copy.completedBody}</p>
        <Link
          href={partnershipPath}
          className="nova-btn-primary nova-btn-glow mt-6 inline-flex"
        >
          {copy.backPartnership}
        </Link>
      </div>
    );
  }

  if (pendingManual) {
    return (
      <div className="nova-glass-island mx-auto max-w-xl space-y-4">
        <div className="rounded-xl border border-nova-green/30 bg-nova-green/10 px-4 py-3 text-sm text-nova-green">
          {copy.pendingTitle}
        </div>
        <p className="text-sm text-nova-cyan-light/85">
          {copy.pendingBody.replace("{email}", application.email)}
        </p>
        {instructions && (
          <>
            <h3 className="font-semibold text-white">{instructions.heading}</h3>
            {instructions.account && (
              <p className="rounded-xl bg-nova-cyan/10 px-4 py-2 font-mono text-sm text-nova-cyan">
                {instructions.account}
              </p>
            )}
            <p className="text-sm text-nova-cyan-light/85">
              Amount:{" "}
              <strong className="text-white">{formatPrice(application.depositCents)}</strong>
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-nova-cyan-light/85">
              {instructions.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </>
        )}
        <p className="text-xs text-nova-cyan-light/60">
          Reference: <span className="font-mono text-nova-cyan">{referenceCode}</span>
        </p>
        <Link href={partnershipPath} className="nova-btn-secondary inline-flex border-white/20 text-white">
          {copy.backPartnership}
        </Link>
      </div>
    );
  }

  return (
    <div className="nova-glass-island mx-auto max-w-xl space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-nova-orange">
          Step 2 · Payment
        </p>
        <h2 className="mt-2 text-2xl font-black text-white">{copy.title}</h2>
        <p className="mt-2 text-sm text-nova-cyan-light/85">{copy.subtitle}</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
        <p className="font-semibold text-white">{application.institutionName}</p>
        <p className="text-nova-cyan-light/70">{application.email}</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-400/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-nova-cyan/20 bg-nova-cyan/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase text-nova-cyan">{copy.amountLabel}</p>
          <p className="mt-1 text-xl font-black text-white">
            {formatPrice(application.depositCents)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase text-nova-cyan-light/70">
            {copy.methodLabel}
          </p>
          <p className="mt-1 font-semibold text-white">{formatPaymentMethodLabel(method)}</p>
          {methodMeta && (
            <p className="mt-1 text-xs text-nova-cyan-light/70">{methodMeta.description}</p>
          )}
        </div>
      </div>

      <p className="rounded-xl bg-nova-orange/10 px-4 py-2 font-mono text-sm text-nova-orange">
        Reference: {referenceCode}
      </p>

      {method === "STRIPE" ? (
        <div className="space-y-3">
          <p className="text-sm text-nova-cyan-light/85">{copy.stripeHint}</p>
          {!stripeAvailable && (
            <p className="text-xs text-nova-orange">{copy.stripeDemo}</p>
          )}
          <button
            type="button"
            disabled={loading}
            onClick={() => void submitPayment()}
            className="nova-btn-primary nova-btn-glow w-full disabled:opacity-60"
          >
            {loading ? copy.processing : copy.submitStripe}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {instructions && (
            <>
              <h3 className="font-semibold text-white">{instructions.heading}</h3>
              {instructions.account && (
                <p className="rounded-xl bg-nova-cyan/10 px-4 py-2 font-mono text-sm text-nova-cyan">
                  {instructions.account}
                </p>
              )}
              <ol className="list-decimal space-y-2 pl-5 text-sm text-nova-cyan-light/85">
                {instructions.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </>
          )}
          <div>
            <label htmlFor="payment-ref" className="nova-label">
              {copy.referenceLabel}
            </label>
            <input
              id="payment-ref"
              className="nova-input"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder={copy.referencePlaceholder}
            />
          </div>
          {method === "OTHER" && (
            <div>
              <label htmlFor="payment-notes" className="nova-label">
                {copy.otherNoteLabel}
              </label>
              <input
                id="payment-notes"
                className="nova-input"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}
          <button
            type="button"
            disabled={loading}
            onClick={() => void submitPayment()}
            className="nova-btn-primary nova-btn-glow w-full disabled:opacity-60"
          >
            {loading ? copy.processing : copy.submitManual}
          </button>
        </div>
      )}
    </div>
  );
}
