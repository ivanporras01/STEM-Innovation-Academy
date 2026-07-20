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

const PARTNER_CATEGORIES = [
  { value: "tech-company", label: "Large tech company partner" },
  { value: "community-college", label: "Community college / technical school" },
  { value: "university", label: "University partner" },
  { value: "ngo", label: "NGO / foundation" },
  { value: "other", label: "Other partner organization" },
] as const;

type Props = { locale?: AppLocale };

export function PartnerScholarshipApplyForm({ locale = "en" }: Props) {
  const [state, setState] = useState({
    name: "",
    email: "",
    age: "",
    country: "",
    trackInterest: "",
    partnerCategory: "tech-company",
    whyNeedScholarship: "",
    referrerOrg: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/scholarships/partners/apply", {
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
          We will review your partner scholarship request and contact you soon.
        </p>
        <Link href="/scholarships/partners" className="nova-btn-secondary mt-6 inline-flex border-white/20 text-white">
          Back to Partner Scholarships
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
        <label className="nova-label">Partner category</label>
        <select className="nova-input" value={state.partnerCategory} onChange={(e) => setState({ ...state, partnerCategory: e.target.value })}>
          {PARTNER_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="nova-label">Referring organization (optional)</label>
        <input className="nova-input" placeholder="Company or institution name" value={state.referrerOrg} onChange={(e) => setState({ ...state, referrerOrg: e.target.value })} />
      </div>
      <div>
        <label className="nova-label">Track of interest</label>
        <select className="nova-input" required value={state.trackInterest} onChange={(e) => setState({ ...state, trackInterest: e.target.value })}>
          <option value="">Select a track</option>
          {ALL_TRACKS.map((t) => (
            <option key={t.slug} value={t.slug}>{getCollegeTrackEn(t.slug)?.title ?? t.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="nova-label">Why do you need this partner scholarship?</label>
        <textarea className="nova-input min-h-[120px]" required value={state.whyNeedScholarship} onChange={(e) => setState({ ...state, whyNeedScholarship: e.target.value })} />
      </div>
      <button type="submit" disabled={status === "loading"} className="nova-btn-primary nova-btn-glow w-full">
        {status === "loading" ? "Submitting…" : "Submit online application"}
      </button>
    </form>
  );
}
