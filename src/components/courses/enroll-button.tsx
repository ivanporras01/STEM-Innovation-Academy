"use client";

import { useState } from "react";
import { CheckoutModal } from "@/components/checkout/checkout-modal";
import { SalePriceFromCents } from "@/components/pricing/sale-price";
import { formatSalePriceLabel } from "@/lib/pricing";

export function EnrollButton({
  courseId,
  courseSlug,
  courseTitle,
  enrolled,
  pendingPayment,
  priceCents,
  stripeAvailable,
}: {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  enrolled: boolean;
  pendingPayment?: boolean;
  priceCents?: number;
  stripeAvailable?: boolean;
}) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const hasPrice = Boolean(priceCents && priceCents > 0);
  const priceLabel = hasPrice ? formatSalePriceLabel(priceCents!) : null;

  if (enrolled) {
    return (
      <span className="inline-flex items-center rounded-xl bg-nova-green/10 px-4 py-2 text-sm font-semibold text-nova-green">
        ✓ Mission Path Unlocked — launch your next mission below
      </span>
    );
  }

  return (
    <div className="space-y-2">
      {successMessage && (
        <div className="rounded-xl border border-nova-green/30 bg-nova-green/10 px-4 py-3 text-sm text-nova-green">
          {successMessage}
        </div>
      )}

      {pendingPayment && (
        <p className="text-sm text-nova-orange">
          Enrollment request pending — we&apos;ll unlock your path once your request and payment
          arrangement are confirmed. You can resubmit below if needed.
        </p>
      )}

      {hasPrice && (
        <p className="text-sm">
          <SalePriceFromCents listCents={priceCents!} />
        </p>
      )}

      <button
        type="button"
        onClick={() => setShowCheckout(true)}
        className="nova-btn-primary"
      >
        {pendingPayment
          ? "Complete or update enrollment request"
          : priceLabel
            ? `Request enrollment — ${priceLabel}`
            : "Request enrollment"}
      </button>

      {!enrolled && hasPrice && (
        <p className="text-xs text-nova-cyan-light/60">
          Play free demo missions first, then submit a request for full path access.
        </p>
      )}

      {showCheckout && (
        <CheckoutModal
          courseId={courseId}
          courseSlug={courseSlug}
          courseTitle={courseTitle}
          priceCents={priceCents ?? 0}
          stripeAvailable={stripeAvailable}
          onClose={() => setShowCheckout(false)}
          onSuccess={() =>
            setSuccessMessage("You're in! Your mission path is unlocked — launch when you're ready.")
          }
        />
      )}
    </div>
  );
}
