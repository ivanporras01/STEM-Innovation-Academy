import { getSiteUrl } from "@/lib/stripe";

const RESEND_API = "https://api.resend.com/emails";

function adminNotifyEmail(): string | null {
  return process.env.ADMIN_NOTIFY_EMAIL?.trim() || process.env.ADMIN_EMAIL?.trim() || null;
}

function emailFrom(): string {
  return (
    process.env.EMAIL_FROM?.trim() || "NOVA Academy <onboarding@resend.dev>"
  );
}

function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export type PendingPaymentNotifyInput = {
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  amountCents: number;
  reference: string;
  method?: string;
};

/**
 * Notify admin that a student enrollment/payment request is awaiting follow-up.
 * Returns false when skipped or failed — never throws.
 */
export async function notifyAdminPendingPayment(
  input: PendingPaymentNotifyInput
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = adminNotifyEmail();

  if (!apiKey || !to) {
    console.warn(
      "[email] Skipping pending-payment notify — set RESEND_API_KEY and ADMIN_NOTIFY_EMAIL (or ADMIN_EMAIL)"
    );
    return false;
  }

  const adminUrl = `${getSiteUrl().replace(/\/$/, "")}/dashboard/admin/payments`;
  const amount = formatUsd(input.amountCents);
  const method = input.method ?? "Enrollment request";

  const subject = `Enrollment request: ${input.studentName} — ${input.courseTitle}`;
  const html = `
    <p>A student submitted an enrollment request that is waiting for follow-up.</p>
    <ul>
      <li><strong>Student:</strong> ${escapeHtml(input.studentName)} &lt;${escapeHtml(input.studentEmail)}&gt;</li>
      <li><strong>Course:</strong> ${escapeHtml(input.courseTitle)}</li>
      <li><strong>Amount:</strong> ${escapeHtml(amount)}</li>
      <li><strong>Method:</strong> ${escapeHtml(method)}</li>
      <li><strong>NOVA reference:</strong> ${escapeHtml(input.reference)}</li>
    </ul>
    <p><a href="${escapeHtml(adminUrl)}">Review pending payments</a></p>
  `.trim();

  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailFrom(),
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[email] Resend pending-payment notify failed", res.status, body);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[email] Resend pending-payment notify error", err);
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
