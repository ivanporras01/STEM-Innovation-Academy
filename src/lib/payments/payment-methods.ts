import type { PaymentMethod } from "@prisma/client";

/** Zelle recipient — phone or email read from environment (kept for institutional / legacy).
 *   ZELLE_PHONE="..."
 *   ZELLE_EMAIL="..."
 */
const ZELLE_PHONE = (process.env.ZELLE_PHONE ?? "").trim();
const ZELLE_EMAIL = (process.env.ZELLE_EMAIL ?? "").trim();
export const ZELLE_PAYMENT_CONTACT = {
  phone: ZELLE_PHONE,
  email: ZELLE_EMAIL,
  label:
    ZELLE_PHONE && ZELLE_EMAIL
      ? `${ZELLE_PHONE} or ${ZELLE_EMAIL}`
      : ZELLE_PHONE || ZELLE_EMAIL || "Contact NOVA for Zelle details",
};

/**
 * PayPal receive details — set in Vercel / .env (no secrets required for friends & family / me links).
 *   NEXT_PUBLIC_PAYPAL_EMAIL="you@business.com"
 *   NEXT_PUBLIC_PAYPAL_ME="https://paypal.me/YourHandle"   (optional)
 */
export const PAYPAL_PAYMENT_CONTACT = {
  email: (process.env.NEXT_PUBLIC_PAYPAL_EMAIL ?? "").trim(),
  meLink: (process.env.NEXT_PUBLIC_PAYPAL_ME ?? "").trim(),
};

export function isPayPalConfigured(): boolean {
  return Boolean(PAYPAL_PAYMENT_CONTACT.email || PAYPAL_PAYMENT_CONTACT.meLink);
}

export function paypalReceiveLabel(): string {
  if (PAYPAL_PAYMENT_CONTACT.email && PAYPAL_PAYMENT_CONTACT.meLink) {
    return `${PAYPAL_PAYMENT_CONTACT.email} · ${PAYPAL_PAYMENT_CONTACT.meLink}`;
  }
  return (
    PAYPAL_PAYMENT_CONTACT.email ||
    PAYPAL_PAYMENT_CONTACT.meLink ||
    "NOVA STEM HUB PayPal (configure NEXT_PUBLIC_PAYPAL_EMAIL)"
  );
}

export type PaymentMethodOption = {
  id: PaymentMethod;
  label: string;
  description: string;
  /** Stripe handles card checkout when true */
  usesStripe?: boolean;
};

/**
 * B2C student checkout — provider-neutral while the payment provider decision is pending.
 * The request creates a pending enrollment that the NOVA team follows up on.
 */
export const STUDENT_PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: "OTHER",
    label: "Submit enrollment request",
    description:
      "Send your request. The NOVA team will review it and contact you with next steps and payment options.",
  },
];

/** B2B — institutions include wire transfer (unchanged for partnership flow) */
export const INSTITUTION_PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: "STRIPE",
    label: "Credit card",
    description: "Pay by card for pilot or annual licensing.",
    usesStripe: true,
  },
  {
    id: "WIRE_TRANSFER",
    label: "Wire transfer",
    description: "Bank wire for institutional contracts — invoice provided on approval.",
  },
  {
    id: "ZELLE",
    label: "Zelle",
    description: `Zelle to ${ZELLE_PAYMENT_CONTACT.label} for pilot or licensing deposits.`,
  },
  {
    id: "VENMO",
    label: "Venmo",
    description: "Venmo for business accounts when applicable.",
  },
  {
    id: "PAYPAL",
    label: "PayPal",
    description: isPayPalConfigured()
      ? `PayPal to ${paypalReceiveLabel()} for pilot or licensing deposits.`
      : "PayPal for institutional deposits when arranged with partnerships.",
  },
  {
    id: "OTHER",
    label: "Other",
    description: "Purchase order, check, or custom arrangement — describe below.",
  },
];

export type PaymentInstructionBlock = {
  heading: string;
  steps: string[];
  account?: string;
};

function buildPaypalInstructions(audience: "student" | "institution"): PaymentInstructionBlock {
  const account = isPayPalConfigured() ? paypalReceiveLabel() : undefined;
  const steps =
    audience === "student"
      ? [
          "Open PayPal (app or paypal.com) and choose Send.",
          isPayPalConfigured()
            ? `Send the exact discounted tuition to ${paypalReceiveLabel()}.`
            : "Send the exact discounted tuition to the NOVA STEM HUB PayPal account provided by enrollments.",
          "Prefer Friends & Family if available, or Goods & Services — paste your reference code in the note.",
          "After you submit this request, keep a screenshot of the PayPal confirmation.",
          "We verify within 24 hours (often same day) and unlock your mission path.",
        ]
      : [
          "Send the deposit from your institution's PayPal Business account when possible.",
          isPayPalConfigured()
            ? `Pay ${paypalReceiveLabel()}.`
            : "Use the PayPal account emailed with your invoice.",
          "Paste the reference code in the payment note.",
          "Email partnerships@steminnovationacademy.org with confirmation.",
          "We confirm within 1–2 business days and schedule onboarding.",
        ];

  return {
    heading: "Pay with PayPal",
    account,
    steps,
  };
}

export const PAYMENT_INSTRUCTIONS: Partial<Record<PaymentMethod, PaymentInstructionBlock>> = {
  PAYPAL: buildPaypalInstructions("student"),
  ZELLE: {
    heading: "Pay with Zelle",
    account: ZELLE_PAYMENT_CONTACT.label,
    steps: [
      "Open your bank's Zelle app or website.",
      `Send the exact tuition amount to ${ZELLE_PAYMENT_CONTACT.phone} or ${ZELLE_PAYMENT_CONTACT.email}.`,
      "In the memo, paste your reference code below.",
      "We verify within 24 hours (often same day) and unlock your mission path.",
    ],
  },
  VENMO: {
    heading: "Pay with Venmo",
    account: "@NOVASTEMHub",
    steps: [
      "Open Venmo and search for @NOVASTEMHub (NOVA STEM Innovation Academy).",
      "Send the exact tuition amount.",
      "Paste your reference code in the payment note.",
      "Your path unlocks once our team confirms receipt.",
    ],
  },
  OTHER: {
    heading: "Submit enrollment request",
    steps: [
      "Review the program details and tuition below.",
      "Click Submit enrollment request to create your request.",
      "The NOVA team will review your request and contact you with next steps.",
      "Your mission path unlocks after your request and payment arrangement are confirmed.",
    ],
  },
};

/** B2B — institutional licensing deposits (partnership apply flow) */
export const INSTITUTION_PAYMENT_INSTRUCTIONS: Partial<
  Record<PaymentMethod, PaymentInstructionBlock>
> = {
  WIRE_TRANSFER: {
    heading: "Wire transfer",
    account: "STEM Innovation Academy LLC — routing details emailed with invoice",
    steps: [
      "Use reference code below as the wire memo / payment reference.",
      "Send the exact deposit amount shown on this page.",
      "Email partnerships@steminnovationacademy.org with your wire confirmation.",
      "Our team verifies within 1–2 business days and schedules onboarding.",
    ],
  },
  ZELLE: {
    heading: "Pay with Zelle (business)",
    account: ZELLE_PAYMENT_CONTACT.label,
    steps: [
      "Send the deposit amount from your institution's Zelle-enabled account.",
      `Pay to ${ZELLE_PAYMENT_CONTACT.phone} or ${ZELLE_PAYMENT_CONTACT.email}.`,
      "Include the reference code in the memo field.",
      "Email your Zelle confirmation to partnerships@steminnovationacademy.org.",
      "We confirm within 24 hours and contact you to finalize licensing.",
    ],
  },
  VENMO: {
    heading: "Pay with Venmo (business)",
    account: "@NOVASTEMHub",
    steps: [
      "Send the deposit amount from your business Venmo account.",
      "Paste the reference code in the payment note.",
      "Email partnerships@steminnovationacademy.org with a screenshot if needed.",
      "Our partnerships team confirms and schedules discovery call.",
    ],
  },
  PAYPAL: buildPaypalInstructions("institution"),
  OTHER: {
    heading: "Purchase order or custom arrangement",
    steps: [
      "Email partnerships@steminnovationacademy.org with your reference code.",
      "Describe your preferred method (PO, check, ACH, etc.).",
      "We reply with institutional invoice and payment instructions.",
      "Pilot onboarding begins once deposit or PO is confirmed.",
    ],
  },
};

export function getInstitutionPaymentInstructions(
  method: PaymentMethod,
): PaymentInstructionBlock | undefined {
  return INSTITUTION_PAYMENT_INSTRUCTIONS[method];
}

export function getStudentPaymentMethod(id: PaymentMethod): PaymentMethodOption | undefined {
  return STUDENT_PAYMENT_METHODS.find((m) => m.id === id);
}

export function isStudentPaymentMethod(id: string): id is PaymentMethod {
  return STUDENT_PAYMENT_METHODS.some((m) => m.id === id);
}

export function isInstitutionPaymentMethod(id: string): id is PaymentMethod {
  return INSTITUTION_PAYMENT_METHODS.some((m) => m.id === id);
}

export function formatPaymentMethodLabel(method: PaymentMethod): string {
  if (method === "PAYPAL") return "PayPal";
  const student = getStudentPaymentMethod(method);
  if (student) return student.label;
  const inst = INSTITUTION_PAYMENT_METHODS.find((m) => m.id === method);
  return inst?.label ?? method;
}
