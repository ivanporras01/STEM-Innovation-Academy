"use client";

import Link from "next/link";

export default function AiTutoringError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#030b16] px-4 text-center">
      <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
      <p className="mt-2 max-w-md text-nova-cyan-light/80">
        Órbita hit an unexpected issue. Your work is still in this browser — try again, or return to tutoring setup.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="nova-btn-primary nova-btn-glow">
          Try again
        </button>
        <Link href="/ai-tutoring" className="nova-btn-secondary">
          Back to tutoring
        </Link>
      </div>
    </div>
  );
}
