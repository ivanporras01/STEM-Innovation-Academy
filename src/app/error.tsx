"use client";

import Link from "next/link";
import { NovaLogo } from "@/components/ui/nova-logo-mark";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-4">
        <NovaLogo size="sm" showText={true} />
      </div>
      <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
      <p className="mt-2 max-w-md text-nova-cyan-light/80">
        Something unexpected happened on this page. Your progress is safe — try again or go back home.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="nova-btn-primary nova-btn-glow">
          Try again
        </button>
        <Link href="/" className="nova-btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
