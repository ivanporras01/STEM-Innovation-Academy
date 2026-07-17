"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SubmissionForm({
  assignmentId,
  existingContent,
  status,
}: {
  assignmentId: string;
  existingContent?: string;
  status?: string;
}) {
  const router = useRouter();
  const [content, setContent] = useState(existingContent ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error ?? "Submission failed");
        return;
      }

      setMessage("Submission saved successfully!");
      router.refresh();
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const readOnly = status === "REVIEWED";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="submission" className="nova-label">Your submission</label>
        <textarea
          id="submission"
          rows={8}
          required
          readOnly={readOnly}
          className="nova-input resize-y font-mono text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your code, project description, or lab report here..."
        />
      </div>

      {!readOnly && (
        <button type="submit" disabled={loading} className="nova-btn-primary disabled:opacity-60">
          {loading ? "Submitting..." : status === "SUBMITTED" ? "Update Submission" : "Submit Assignment"}
        </button>
      )}

      {message && (
        <p className={`text-sm ${message.includes("success") ? "text-nova-green" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
