"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReviewSubmissionForm({
  submissionId,
  maxScore,
}: {
  submissionId: string;
  maxScore: number;
}) {
  const router = useRouter();
  const [score, setScore] = useState(maxScore);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/submissions/${submissionId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, feedback }),
      });

      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3 border-t border-nova-light-gray pt-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="nova-label">Score (max {maxScore})</label>
          <input
            type="number"
            min={0}
            max={maxScore}
            className="nova-input"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <label className="nova-label">Feedback</label>
        <textarea
          rows={3}
          className="nova-input resize-y"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Great work! Consider..."
        />
      </div>
      <button type="submit" disabled={loading} className="nova-btn-primary text-sm disabled:opacity-60">
        {loading ? "Saving..." : "Submit Review"}
      </button>
    </form>
  );
}
