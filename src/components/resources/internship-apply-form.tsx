"use client";

import Link from "next/link";
import { useState } from "react";
import {
  novaCollegeEntryTracks,
  novaCollegeAdvancedTracks,
} from "@/data/nova-college";
import { getCollegeTrackEn } from "@/data/nova-college/catalog-en";
import type { AppLocale } from "@/lib/locale";

const ALL_TRACKS = [...novaCollegeEntryTracks, ...novaCollegeAdvancedTracks];

const AVAILABILITY = [
  { value: "summer-full", label: "Full-time — summer" },
  { value: "part-time", label: "Part-time — school year" },
  { value: "remote", label: "Remote / hybrid" },
  { value: "flexible", label: "Flexible" },
] as const;

type Props = { locale?: AppLocale };

export function InternshipApplyForm({ locale = "en" }: Props) {
  const [state, setState] = useState({
    name: "",
    email: "",
    age: "",
    country: "",
    trackInterest: "",
    availability: "flexible",
    portfolioUrl: "",
    whyInterested: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/internships/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state,
          age: Number(state.age),
          locale,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submit failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="nova-glass-island mx-auto max-w-lg p-8 text-center">
        <h2 className="text-xl font-bold text-white">Application received</h2>
        <p className="mt-3 text-sm text-nova-cyan-light/80">
          Thank you — our team will match you with internship opportunities in the NOVA network.
        </p>
        <Link href="/internships" className="nova-btn-secondary mt-6 inline-flex border-white/20 text-white">
          Back to Internships
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="nova-glass-island mx-auto max-w-xl space-y-4 p-6 sm:p-8">
      {error && <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{error}</p>}
      <div>
        <label className="nova-label">Full name</label>
        <input className="nova-input" required value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
      </div>
      <div>
        <label className="nova-label">Email</label>
        <input type="email" className="nova-input" required value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="nova-label">Age</label>
          <input type="number" min={16} className="nova-input" required value={state.age} onChange={(e) => setState({ ...state, age: e.target.value })} />
        </div>
        <div>
          <label className="nova-label">Country</label>
          <input className="nova-input" required value={state.country} onChange={(e) => setState({ ...state, country: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="nova-label">Area of interest</label>
        <select className="nova-input" required value={state.trackInterest} onChange={(e) => setState({ ...state, trackInterest: e.target.value })}>
          <option value="">Select area</option>
          {ALL_TRACKS.map((t) => (
            <option key={t.slug} value={t.slug}>{getCollegeTrackEn(t.slug)?.title ?? t.title}</option>
          ))}
          <option value="school-youth">NOVA School / youth programs</option>
          <option value="general-stem">General STEM / undecided</option>
        </select>
      </div>
      <div>
        <label className="nova-label">Availability</label>
        <select className="nova-input" value={state.availability} onChange={(e) => setState({ ...state, availability: e.target.value })}>
          {AVAILABILITY.map((a) => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="nova-label">Portfolio / LinkedIn (optional)</label>
        <input className="nova-input" placeholder="https://…" value={state.portfolioUrl} onChange={(e) => setState({ ...state, portfolioUrl: e.target.value })} />
      </div>
      <div>
        <label className="nova-label">Why are you interested in a NOVA internship?</label>
        <textarea className="nova-input min-h-[120px]" required value={state.whyInterested} onChange={(e) => setState({ ...state, whyInterested: e.target.value })} />
      </div>
      <button type="submit" disabled={status === "loading"} className="nova-btn-primary nova-btn-glow w-full">
        {status === "loading" ? "Submitting…" : "Submit online application"}
      </button>
    </form>
  );
}
