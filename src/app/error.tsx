"use client";

import Link from "next/link";
import { NovaHeroLogoMark } from "@/components/ui/nova-logo-mark";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-nova-cyan/20 to-nova-blue/10 ring-1 ring-nova-cyan/30">
        <NovaHeroLogoMark className="h-10 w-10 min-h-10 min-w-10" />
      </span>
      <h1 className="text-2xl font-bold text-white">Mission interrupted</h1>
      <p className="mt-2 max-w-md text-nova-cyan-light/80">
        Something unexpected happened on this route. Your progress is safe — try again or head back
        to mission control.
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
