"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function EnrollButton({
  courseId,
  enrolled,
}: {
  courseId: string;
  enrolled: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (enrolled) {
    return (
      <span className="inline-flex items-center rounded-xl bg-nova-green/10 px-4 py-2 text-sm font-semibold text-nova-green">
        ✓ Enrolled
      </span>
    );
  }

  async function handleEnroll() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Enrollment failed");
        return;
      }

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleEnroll}
        disabled={loading}
        className="nova-btn-primary disabled:opacity-60"
      >
        {loading ? "Enrolling..." : "Enroll Now"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
