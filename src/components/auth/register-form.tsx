"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  resolveStudentEnrollRedirect,
  resolveStudentLoginFallback,
} from "@/lib/post-register-redirect";
import {
  GENDER_OPTIONS,
  GRADE_LEVELS,
  HOW_HEARD_OPTIONS,
  PREFERRED_LANGUAGES,
} from "@/lib/student-registration";

const INITIAL_FORM = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "STUDENT" as "STUDENT" | "MENTOR" | "PARENT",
  dateOfBirth: "",
  phone: "",
  gender: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  country: "",
  postalCode: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelation: "",
  guardianName: "",
  guardianEmail: "",
  guardianPhone: "",
  currentSchoolName: "",
  gradeLevel: "",
  graduationYear: "",
  preferredLanguage: "en",
  howHeardAboutNova: "",
  acceptTerms: false,
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-white/10 pb-2 text-sm font-bold uppercase tracking-wider text-nova-cyan">
      {children}
    </h2>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="nova-label">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isStudent = form.role === "STUDENT";

  function update<K extends keyof typeof INITIAL_FORM>(field: K, value: (typeof INITIAL_FORM)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Registration failed");
        return;
      }

      if (form.role === "STUDENT") {
        const destination = resolveStudentEnrollRedirect(callbackUrl);
        const signInResult = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        });

        if (signInResult?.error) {
          router.push(resolveStudentLoginFallback(callbackUrl));
          return;
        }

        router.push(destination);
        router.refresh();
        return;
      }

      const loginQuery = new URLSearchParams({ registered: "1" });
      if (callbackUrl) loginQuery.set("callbackUrl", callbackUrl);
      router.push(`/login?${loginQuery.toString()}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const currentYear = new Date().getFullYear();
  const gradYears = Array.from({ length: 12 }, (_, i) => String(currentYear + i));

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <section className="space-y-4">
        <SectionTitle>Account type</SectionTitle>
        <Field id="role" label="I am registering as" required>
          <select
            id="role"
            className="nova-input"
            value={form.role}
            onChange={(e) => update("role", e.target.value as typeof form.role)}
          >
            <option value="STUDENT">NOVA Explorer (student)</option>
            <option value="PARENT">Parent / Guardian</option>
            <option value="MENTOR">Innovation Mentor</option>
          </select>
        </Field>
        {isStudent && (
          <p className="text-xs text-nova-cyan-light/70">
            Complete student profile below — the same information schools and colleges typically
            require for enrollment records.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <SectionTitle>Personal information</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="firstName" label="Legal first name" required>
            <input
              id="firstName"
              required
              className="nova-input"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </Field>
          <Field id="middleName" label="Middle name">
            <input
              id="middleName"
              className="nova-input"
              value={form.middleName}
              onChange={(e) => update("middleName", e.target.value)}
            />
          </Field>
          <Field id="lastName" label="Legal last name" required>
            <input
              id="lastName"
              required
              className="nova-input"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </Field>
          <Field id="gender" label="Gender">
            <select
              id="gender"
              className="nova-input"
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="">Select (optional)</option>
              {GENDER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          {isStudent && (
            <>
              <Field id="dateOfBirth" label="Date of birth" required>
                <input
                  id="dateOfBirth"
                  type="date"
                  required={isStudent}
                  className="nova-input"
                  value={form.dateOfBirth}
                  onChange={(e) => update("dateOfBirth", e.target.value)}
                />
              </Field>
              <Field id="preferredLanguage" label="Preferred language" required>
                <select
                  id="preferredLanguage"
                  className="nova-input"
                  value={form.preferredLanguage}
                  onChange={(e) => update("preferredLanguage", e.target.value)}
                >
                  {PREFERRED_LANGUAGES.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          )}
        </div>
      </section>

      {isStudent && (
        <>
          <section className="space-y-4">
            <SectionTitle>Contact &amp; address</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="phone" label="Mobile phone" required>
                <input
                  id="phone"
                  type="tel"
                  required={isStudent}
                  className="nova-input"
                  placeholder="+1 (787) 555-0100"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </Field>
              <Field id="email" label="Student email (login)" required>
                <input
                  id="email"
                  type="email"
                  required
                  className="nova-input sm:col-span-2"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </Field>
              <Field id="streetAddress" label="Street address" required>
                <input
                  id="streetAddress"
                  required={isStudent}
                  className="nova-input sm:col-span-2"
                  value={form.streetAddress}
                  onChange={(e) => update("streetAddress", e.target.value)}
                />
              </Field>
              <Field id="city" label="City" required>
                <input
                  id="city"
                  required={isStudent}
                  className="nova-input"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </Field>
              <Field id="stateProvince" label="State / province" required>
                <input
                  id="stateProvince"
                  required={isStudent}
                  className="nova-input"
                  value={form.stateProvince}
                  onChange={(e) => update("stateProvince", e.target.value)}
                />
              </Field>
              <Field id="country" label="Country" required>
                <input
                  id="country"
                  required={isStudent}
                  className="nova-input"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                />
              </Field>
              <Field id="postalCode" label="Postal / ZIP code" required>
                <input
                  id="postalCode"
                  required={isStudent}
                  className="nova-input"
                  value={form.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="space-y-4">
            <SectionTitle>Emergency contact</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="emergencyContactName" label="Full name" required>
                <input
                  id="emergencyContactName"
                  required={isStudent}
                  className="nova-input"
                  value={form.emergencyContactName}
                  onChange={(e) => update("emergencyContactName", e.target.value)}
                />
              </Field>
              <Field id="emergencyContactRelation" label="Relationship" required>
                <input
                  id="emergencyContactRelation"
                  required={isStudent}
                  className="nova-input"
                  placeholder="e.g. Aunt, Neighbor"
                  value={form.emergencyContactRelation}
                  onChange={(e) => update("emergencyContactRelation", e.target.value)}
                />
              </Field>
              <Field id="emergencyContactPhone" label="Phone" required>
                <input
                  id="emergencyContactPhone"
                  type="tel"
                  required={isStudent}
                  className="nova-input"
                  value={form.emergencyContactPhone}
                  onChange={(e) => update("emergencyContactPhone", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="space-y-4">
            <SectionTitle>Parent / guardian</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="guardianName" label="Full name" required>
                <input
                  id="guardianName"
                  required={isStudent}
                  className="nova-input"
                  value={form.guardianName}
                  onChange={(e) => update("guardianName", e.target.value)}
                />
              </Field>
              <Field id="guardianPhone" label="Phone" required>
                <input
                  id="guardianPhone"
                  type="tel"
                  required={isStudent}
                  className="nova-input"
                  value={form.guardianPhone}
                  onChange={(e) => update("guardianPhone", e.target.value)}
                />
              </Field>
              <Field id="guardianEmail" label="Email" required>
                <input
                  id="guardianEmail"
                  type="email"
                  required={isStudent}
                  className="nova-input sm:col-span-2"
                  value={form.guardianEmail}
                  onChange={(e) => update("guardianEmail", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="space-y-4">
            <SectionTitle>Academic background</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="currentSchoolName" label="Current school / institution" required>
                <input
                  id="currentSchoolName"
                  required={isStudent}
                  className="nova-input sm:col-span-2"
                  value={form.currentSchoolName}
                  onChange={(e) => update("currentSchoolName", e.target.value)}
                />
              </Field>
              <Field id="gradeLevel" label="Grade level" required>
                <select
                  id="gradeLevel"
                  required={isStudent}
                  className="nova-input"
                  value={form.gradeLevel}
                  onChange={(e) => update("gradeLevel", e.target.value)}
                >
                  <option value="">Select grade level</option>
                  {GRADE_LEVELS.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="graduationYear" label="Expected graduation year" required>
                <select
                  id="graduationYear"
                  required={isStudent}
                  className="nova-input"
                  value={form.graduationYear}
                  onChange={(e) => update("graduationYear", e.target.value)}
                >
                  <option value="">Select year</option>
                  {gradYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="howHeardAboutNova" label="How did you hear about NOVA?">
                <select
                  id="howHeardAboutNova"
                  className="nova-input sm:col-span-2"
                  value={form.howHeardAboutNova}
                  onChange={(e) => update("howHeardAboutNova", e.target.value)}
                >
                  <option value="">Select (optional)</option>
                  {HOW_HEARD_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>
        </>
      )}

      {!isStudent && (
        <section className="space-y-4">
          <SectionTitle>Account access</SectionTitle>
          <Field id="email" label="Email" required>
            <input
              id="email"
              type="email"
              required
              className="nova-input"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </Field>
        </section>
      )}

      <section className="space-y-4">
        <SectionTitle>Secure login</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="password" label="Password" required>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              className="nova-input"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />
          </Field>
          <Field id="confirmPassword" label="Confirm password" required>
            <input
              id="confirmPassword"
              type="password"
              required
              minLength={6}
              className="nova-input"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
            />
          </Field>
        </div>
      </section>

      {isStudent && (
        <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-nova-cyan-light/85">
          <input
            type="checkbox"
            className="mt-1"
            checked={form.acceptTerms}
            onChange={(e) => update("acceptTerms", e.target.checked)}
          />
          <span>
            I confirm that the information provided is accurate. I agree to NOVA STEM HUB&apos;s
            enrollment policies, code of conduct, and communication with my parent/guardian and
            emergency contact regarding my progress.
          </span>
        </label>
      )}

      <button type="submit" disabled={loading} className="nova-btn-primary nova-btn-glow w-full disabled:opacity-60">
        {loading
          ? "Creating your account..."
          : isStudent
            ? "Create account & continue to payment"
            : "Complete registration"}
      </button>

      <p className="text-center text-sm text-nova-cyan-light/70">
        Already have an account?{" "}
        <Link
          href={
            callbackUrl
              ? `/login?callbackUrl=${encodeURIComponent(resolveStudentEnrollRedirect(callbackUrl))}`
              : "/login"
          }
          className="font-semibold text-nova-cyan hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
