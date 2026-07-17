"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-nova-off-white px-4 text-center">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-nova-orange/20 text-2xl">
        ⚠
      </span>
      <h1 className="text-2xl font-bold text-nova-deep-blue">Something went wrong</h1>
      <p className="mt-2 max-w-md text-nova-gray">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={reset} className="nova-btn-primary">
          Try Again
        </button>
        <Link href="/" className="nova-btn-secondary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
