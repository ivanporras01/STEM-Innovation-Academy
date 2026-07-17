"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CompleteLessonButton({
  lessonId,
  completed,
}: {
  lessonId: string;
  completed: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(completed);

  async function handleComplete() {
    if (done) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/lessons/${lessonId}/complete`, {
        method: "POST",
      });

      if (res.ok) {
        setDone(true);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <span className="inline-flex items-center gap-2 rounded-xl bg-nova-green/10 px-4 py-2.5 text-sm font-semibold text-nova-green">
        ✓ Mission Complete
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleComplete}
      disabled={loading}
      className="nova-btn-primary disabled:opacity-60"
    >
      {loading ? "Saving..." : "Mark Mission Complete"}
    </button>
  );
}
