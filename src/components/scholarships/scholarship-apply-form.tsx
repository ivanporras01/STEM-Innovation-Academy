"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  novaCollegeEntryTracks,
  novaCollegeAdvancedTracks,
} from "@/data/nova-college";
import { getCollegeTrackEn } from "@/data/nova-college/catalog-en";
import {
  getScholarshipById,
  getScholarshipBySlug,
  SCHOLARSHIP_PROGRAMS,
} from "@/data/novahub/scholarships";
import type { AppLocale } from "@/lib/locale";
import { getCopyLocale } from "@/lib/locale";

const ALL_TRACKS = [...novaCollegeEntryTracks, ...novaCollegeAdvancedTracks];

type ScholarshipFormState = {
  name: string;
  email: string;
  age: string;
  country: string;
  trackInterest: string;
  whyNeedScholarship: string;
  institution: string;
  programId: string;
};

type Props = {
  locale?: AppLocale;
};

const COPY = {
  en: {
    submitError: "We couldn't submit your application. Please try again.",
    networkError: "Something went wrong. Please try again.",
    successTitle: "We received your application",
    successBody:
      "We will contact you soon. Approval is not automatic — we review each application carefully.",
    backToScholarships: "Back to Scholarships",
    exploreCollege: "Explore NOVA College",
    programLabel: "Scholarship program",
    fullName: "Full name",
    email: "Email",
    age: "Age",
    country: "Country",
    countryPlaceholder: "United States, Canada, Spain…",
    trackInterest: "Track of interest",
    whyNeed: "Why do you need this scholarship?",
    whyPlaceholder: "Tell us about your situation, motivation, and what you hope to achieve with NOVA College…",
    institution: "School or institution (if applicable)",
    institutionPlaceholder: "Optional — required for Institutional Nomination Scholarship",
    disclaimer:
      "By submitting, you agree that we will review your application manually. There is no instant approval or guaranteed seat.",
    submitting: "Submitting…",
    submit: "Submit scholarship application",
  },
  es: {
    submitError: "No pudimos enviar tu solicitud. Intenta de nuevo.",
    networkError: "Algo salió mal. Por favor intenta de nuevo.",
    successTitle: "Recibimos tu solicitud",
    successBody:
      "Te contactaremos pronto. La aprobación no es automática — revisamos cada solicitud con cuidado.",
    backToScholarships: "Volver a Becas",
    exploreCollege: "Explorar NOVA College",
    programLabel: "Programa de beca",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    age: "Edad",
    country: "País",
    countryPlaceholder: "Estados Unidos, España, México…",
    trackInterest: "Track de interés",
    whyNeed: "¿Por qué necesitas esta beca?",
    whyPlaceholder:
      "Cuéntanos tu situación, motivación y qué esperas lograr con NOVA College…",
    institution: "Colegio o institución (si aplica)",
    institutionPlaceholder: "Opcional — requerido para Beca Institucional",
    disclaimer:
      "Al enviar, aceptas que revisemos tu solicitud manualmente. No hay aprobación instantánea ni garantía de cupo.",
    submitting: "Enviando…",
    submit: "Enviar solicitud de beca",
  },
} as const;

export function ScholarshipApplyForm({ locale = "en" }: Props) {
  const copy = COPY[getCopyLocale(locale)];
  const scholarshipsPath = locale === "es" ? "/es/scholarships" : "/scholarships";
  const collegePath = locale === "es" ? "/es/college" : "/college";

  const searchParams = useSearchParams();
  const defaultProgram = searchParams.get("program") ?? "techhub-beca";
  const program = getScholarshipBySlug(defaultProgram) ?? SCHOLARSHIP_PROGRAMS[0];
  const initialEligibleTracks = ALL_TRACKS.filter((t) =>
    program.tracksEligible.includes(t.slug),
  );

  const [form, setForm] = useState<ScholarshipFormState>({
    name: "",
    email: "",
    age: "",
    country: "",
    trackInterest: initialEligibleTracks[0]?.slug ?? "",
    whyNeedScholarship: "",
    institution: "",
    programId: program.id,
  });

  const selectedProgram = getScholarshipById(form.programId) ?? program;
  const eligibleTracks = ALL_TRACKS.filter((t) =>
    selectedProgram.tracksEligible.includes(t.slug),
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/scholarships/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? copy.submitError);
        return;
      }

      setSuccess(true);
    } catch {
      setError(copy.networkError);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="nova-glass-island mx-auto max-w-xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-nova-cyan/20 text-2xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-white">{copy.successTitle}</h2>
        <p className="mt-3 text-nova-cyan-light/85">{copy.successBody}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={scholarshipsPath}
            className="nova-btn-secondary inline-flex border-white/20 text-white"
          >
            {copy.backToScholarships}
          </Link>
          <Link href={collegePath} className="nova-btn-primary nova-btn-glow inline-flex">
            {copy.exploreCollege}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="nova-glass-island mx-auto max-w-xl space-y-5">
      {error && (
        <div className="rounded-xl border border-red-400/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="programId" className="nova-label">
          {copy.programLabel}
        </label>
        <select
          id="programId"
          required
          className="nova-input"
          value={form.programId}
          onChange={(e) => {
            const selected = getScholarshipById(e.target.value) ?? SCHOLARSHIP_PROGRAMS[0];
            const tracks = ALL_TRACKS.filter((t) => selected.tracksEligible.includes(t.slug));
            setForm((prev) => ({
              ...prev,
              programId: selected.id,
              trackInterest: tracks[0]?.slug ?? prev.trackInterest,
            }));
          }}
        >
          {SCHOLARSHIP_PROGRAMS.map((p) => (
            <option key={p.id} value={p.id}>
              {locale === "es" ? p.nameEs : p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="nova-label">
          {copy.fullName}
        </label>
        <input
          id="name"
          required
          className="nova-input"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="María García López"
        />
      </div>

      <div>
        <label htmlFor="email" className="nova-label">
          {copy.email}
        </label>
        <input
          id="email"
          type="email"
          required
          className="nova-input"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="tu@email.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="age" className="nova-label">
            {copy.age}
          </label>
          <input
            id="age"
            type="number"
            required
            min={16}
            max={99}
            className="nova-input"
            value={form.age}
            onChange={(e) => update("age", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country" className="nova-label">
            {copy.country}
          </label>
          <input
            id="country"
            required
            className="nova-input"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            placeholder={copy.countryPlaceholder}
          />
        </div>
      </div>

      <div>
        <label htmlFor="trackInterest" className="nova-label">
          {copy.trackInterest}
        </label>
        <select
          id="trackInterest"
          required
          className="nova-input"
          value={form.trackInterest}
          onChange={(e) => update("trackInterest", e.target.value)}
        >
          {eligibleTracks.map((track) => {
            const en = getCollegeTrackEn(track.slug);
            const label = locale === "es" ? track.title : (en?.title ?? track.title);
            return (
              <option key={track.slug} value={track.slug}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label htmlFor="whyNeedScholarship" className="nova-label">
          {copy.whyNeed}
        </label>
        <textarea
          id="whyNeedScholarship"
          required
          rows={5}
          className="nova-input resize-y"
          value={form.whyNeedScholarship}
          onChange={(e) => update("whyNeedScholarship", e.target.value)}
          placeholder={copy.whyPlaceholder}
        />
      </div>

      <div>
        <label htmlFor="institution" className="nova-label">
          {copy.institution}
        </label>
        <input
          id="institution"
          className="nova-input"
          value={form.institution}
          onChange={(e) => update("institution", e.target.value)}
          placeholder={copy.institutionPlaceholder}
        />
      </div>

      <p className="text-xs text-nova-cyan-light/60">{copy.disclaimer}</p>

      <button
        type="submit"
        disabled={loading}
        className="nova-btn-primary nova-btn-glow w-full disabled:opacity-60"
      >
        {loading ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
