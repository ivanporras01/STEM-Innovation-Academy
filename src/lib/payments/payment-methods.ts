import type { PaymentMethod } from "@prisma/client";

/** Zelle recipient — phone or email */
export const ZELLE_PAYMENT_CONTACT = {
  phone: "954-997-3487",
  email: "hectorporras0916@gmail.com",
  label: "954-997-3487 or hectorporras0916@gmail.com",
};

export type PaymentMethodOption = {
  id: PaymentMethod;
  label: string;
  description: string;
  /** Stripe handles card checkout when true */
  usesStripe?: boolean;
};

/** B2C — students never see wire transfer */
export const STUDENT_PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: "STRIPE",
    label: "Credit or debit card",
    description: "Secure checkout — Visa, Mastercard, Amex, and debit cards accepted.",
    usesStripe: true,
  },
  {
    id: "ZELLE",
    label: "Zelle",
    description: `Send payment via Zelle to ${ZELLE_PAYMENT_CONTACT.label} — we verify and unlock your path within 24 hours.`,
  },
  {
    id: "VENMO",
    label: "Venmo",
    description: "Pay @NOVASTEMHub — include your reference code so we can match your enrollment.",
  },
  {
    id: "OTHER",
    label: "Other method",
    description: "CashApp, PayPal, or another method — tell us in the reference field.",
  },
];

/** B2B — institutions include wire transfer */
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

export const PAYMENT_INSTRUCTIONS: Partial<Record<PaymentMethod, PaymentInstructionBlock>> = {
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
    heading: "Alternative payment",
    steps: [
      "Contact enrollments@steminnovationacademy.org with your reference code.",
      "Include how you'd like to pay (CashApp, PayPal, etc.).",
      "Our team will reply with instructions within one business day.",
      "Your mission path unlocks when payment is confirmed.",
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
  const student = getStudentPaymentMethod(method);
  if (student) return student.label;
  const inst = INSTITUTION_PAYMENT_METHODS.find((m) => m.id === method);
  return inst?.label ?? method;
}
