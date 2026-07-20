/** Client-safe Stripe availability check (public key only) */
export function isStripeConfigured(): boolean {
  return Boolean(
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_")
      : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_") ||
          process.env.STRIPE_SECRET_KEY?.startsWith("sk_")
  );
}

// Server components can import from @/lib/stripe instead
export function isStripeConfiguredServer(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.startsWith("sk_"));
}
