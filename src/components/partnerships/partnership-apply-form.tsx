"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  INSTITUTION_TYPES,
  PARTNERSHIP_PATH,
  PRODUCT_INTERESTS,
} from "@/data/novahub/partnerships";
import {
  BUDGET_RANGES,
  CONTRACT_TERMS,
  HARDWARE_OPTIONS,
  STUDENT_AGE_RANGES,
} from "@/lib/institution-registration";
import type { AppLocale } from "@/lib/locale";
import { getCopyLocale } from "@/lib/locale";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { INSTITUTION_PAYMENT_METHODS } from "@/lib/payments/payment-methods";

type PartnershipFormState = {
  institutionName: string;
  legalName: string;
  institutionType: string;
  website: string;
  taxId: string;
  yearEstablished: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  billingContactName: string;
  billingEmail: string;
  billingPhone: string;
  decisionMakerName: string;
  decisionMakerTitle: string;
  decisionMakerEmail: string;
  productInterest: string;
  estimatedStudents: string;
  studentAgeRange: string;
  targetLaunchDate: string;
  contractTerm: string;
  budgetRange: string;
  currentStemOfferings: string;
  hardwareInfrastructure: string;
  message: string;
  paymentMethod: string;
  acceptTerms: boolean;
};

type Props = {
  locale?: AppLocale;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-white/10 pb-2 text-sm font-bold uppercase tracking-wider text-nova-cyan">
      {children}
    </h2>
  );
}

const COPY = {
  en: {
    submitError: "We couldn't submit your registration. Please try again.",
    networkError: "Something went wrong. Please try again.",
    stepHint: "Step 1 of 2 — after submitting you'll complete your licensing deposit.",
    institution: "Institution",
    institutionName: "Institution name",
    institutionNamePlaceholder: "Lincoln Technical High School",
    legalName: "Legal entity name (if different)",
    institutionType: "Institution type",
    website: "Website (optional)",
    taxId: "Tax ID / EIN (optional)",
    yearEstablished: "Year established (optional)",
    address: "Institution address",
    streetAddress: "Street address",
    city: "City",
    stateProvince: "State / province",
    postalCode: "Postal / ZIP code",
    country: "Country",
    countryPlaceholder: "United States, Canada, Spain…",
    primaryContact: "Primary contact",
    contactName: "Full name",
    contactRole: "Role / title",
    contactRolePlaceholder: "Principal, STEM Director, Dean…",
    email: "Work email",
    phone: "Phone",
    billing: "Billing contact",
    billingContactName: "Full name",
    billingEmail: "Billing email",
    billingPhone: "Billing phone",
    decisionMaker: "Decision maker",
    decisionMakerName: "Full name",
    decisionMakerTitle: "Title",
    decisionMakerEmail: "Email",
    program: "Program scope",
    productInterest: "Products of interest",
    estimatedStudents: "Estimated students per year",
    estimatedStudentsPlaceholder: "e.g. 120",
    studentAgeRange: "Student age range",
    targetLaunchDate: "Target launch date",
    targetLaunchDatePlaceholder: "e.g. Fall 2026",
    contractTerm: "Preferred contract term",
    budgetRange: "Annual budget range (USD)",
    currentStemOfferings: "Current STEM offerings",
    currentStemPlaceholder: "Robotics club, AP CS, makerspace hours…",
    hardwareInfrastructure: "Hardware / infrastructure",
    payment: "Payment",
    paymentMethod: "Preferred payment method",
    paymentMethodHint:
      "You'll complete your licensing deposit on the next screen — card, wire, Zelle, Venmo, or custom.",
    message: "Goals & timeline",
    messagePlaceholder:
      `Student age range, timeline for launch, why ${NOVA_STEM_HUB.name}, pilot scope…`,
    acceptTerms:
      "I confirm the information is accurate and agree to be contacted about NOVA School and/or NOVA College licensing.",
    disclaimer:
      "By submitting, you proceed to institutional payment. Our partnerships team reviews within 5–7 business days.",
    submitting: "Submitting…",
    submit: "Continue to payment",
  },
  es: {
    submitError: "No pudimos enviar tu registro. Intenta de nuevo.",
    networkError: "Algo salió mal. Por favor intenta de nuevo.",
    stepHint: "Paso 1 de 2 — después enviarás el depósito de licencia.",
    institution: "Institución",
    institutionName: "Nombre de la institución",
    institutionNamePlaceholder: "Colegio Técnico Nacional",
    legalName: "Razón social (si difiere)",
    institutionType: "Tipo de institución",
    website: "Sitio web (opcional)",
    taxId: "ID fiscal (opcional)",
    yearEstablished: "Año de fundación (opcional)",
    address: "Dirección institucional",
    streetAddress: "Dirección",
    city: "Ciudad",
    stateProvince: "Estado / provincia",
    postalCode: "Código postal",
    country: "País",
    countryPlaceholder: "Estados Unidos, España, México…",
    primaryContact: "Contacto principal",
    contactName: "Nombre completo",
    contactRole: "Cargo / rol",
    contactRolePlaceholder: "Rector, Director STEM, Decano…",
    email: "Correo institucional",
    phone: "Teléfono",
    billing: "Contacto de facturación",
    billingContactName: "Nombre completo",
    billingEmail: "Correo de facturación",
    billingPhone: "Teléfono de facturación",
    decisionMaker: "Responsable de decisión",
    decisionMakerName: "Nombre completo",
    decisionMakerTitle: "Cargo",
    decisionMakerEmail: "Correo",
    program: "Alcance del programa",
    productInterest: "Productos de interés",
    estimatedStudents: "Estudiantes estimados por año",
    estimatedStudentsPlaceholder: "ej. 120",
    studentAgeRange: "Rango de edades",
    targetLaunchDate: "Fecha objetivo de lanzamiento",
    targetLaunchDatePlaceholder: "ej. Otoño 2026",
    contractTerm: "Término de contrato preferido",
    budgetRange: "Presupuesto anual (USD)",
    currentStemOfferings: "Oferta STEM actual",
    currentStemPlaceholder: "Club de robótica, AP CS, makerspace…",
    hardwareInfrastructure: "Hardware / infraestructura",
    payment: "Pago",
    paymentMethod: "Método de pago preferido",
    paymentMethodHint:
      "Completarás el depósito de licencia en la siguiente pantalla — tarjeta, transferencia, Zelle, Venmo u otro.",
    message: "Objetivos y cronograma",
    messagePlaceholder:
      `Rango de edades, cronograma, por qué ${NOVA_STEM_HUB.name}, alcance piloto…`,
    acceptTerms:
      "Confirmo que la información es correcta y acepto ser contactado sobre licencias NOVA School y/o NOVA College.",
    disclaimer:
      "Al enviar, continúas al pago institucional. Nuestro equipo revisa en 5–7 días hábiles.",
    submitting: "Enviando…",
    submit: "Continuar al pago",
  },
} as const;

export function PartnershipApplyForm({ locale = "en" }: Props) {
  const copy = COPY[getCopyLocale(locale)];
  const router = useRouter();
  const isEs = locale === "es";

  const [form, setForm] = useState<PartnershipFormState>({
    institutionName: "",
    legalName: "",
    institutionType: INSTITUTION_TYPES[0].id,
    website: "",
    taxId: "",
    yearEstablished: "",
    streetAddress: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "",
    contactName: "",
    contactRole: "",
    email: "",
    phone: "",
    billingContactName: "",
    billingEmail: "",
    billingPhone: "",
    decisionMakerName: "",
    decisionMakerTitle: "",
    decisionMakerEmail: "",
    productInterest: PRODUCT_INTERESTS[2].id,
    estimatedStudents: "",
    studentAgeRange: STUDENT_AGE_RANGES[0].value,
    targetLaunchDate: "",
    contractTerm: CONTRACT_TERMS[0].value,
    budgetRange: BUDGET_RANGES[0].value,
    currentStemOfferings: "",
    hardwareInfrastructure: HARDWARE_OPTIONS[0].value,
    message: "",
    paymentMethod: "WIRE_TRANSFER",
    acceptTerms: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: keyof PartnershipFormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function optionLabel<T extends { value: string; labelEn: string; labelEs: string }>(
    option: T,
  ): string {
    return isEs ? option.labelEs : option.labelEn;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.acceptTerms) {
      setError(isEs ? "Debes aceptar los términos." : "You must accept the partnership terms.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/partnerships/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          estimatedStudents: Number(form.estimatedStudents),
          acceptTerms: true,
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? copy.submitError);
        return;
      }

      const paymentPath = isEs
        ? `/es/partnership/apply/payment?applicationId=${data.id}`
        : `/partnership/apply/payment?applicationId=${data.id}`;
      router.push(paymentPath);
    } catch {
      setError(copy.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="nova-glass-island mx-auto max-w-2xl space-y-8">
      <p className="rounded-xl border border-nova-orange/30 bg-nova-orange/10 px-4 py-3 text-sm text-nova-orange">
        {copy.stepHint}
      </p>

      {error && (
        <div className="rounded-xl border border-red-400/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <section className="space-y-4">
        <SectionTitle>{copy.institution}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="institutionName" className="nova-label">
              {copy.institutionName}
            </label>
            <input
              id="institutionName"
              required
              className="nova-input"
              value={form.institutionName}
              onChange={(e) => update("institutionName", e.target.value)}
              placeholder={copy.institutionNamePlaceholder}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="legalName" className="nova-label">
              {copy.legalName}
            </label>
            <input
              id="legalName"
              className="nova-input"
              value={form.legalName}
              onChange={(e) => update("legalName", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="institutionType" className="nova-label">
              {copy.institutionType}
            </label>
            <select
              id="institutionType"
              required
              className="nova-input"
              value={form.institutionType}
              onChange={(e) => update("institutionType", e.target.value)}
            >
              {INSTITUTION_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {isEs ? type.labelEs : type.labelEn}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="website" className="nova-label">
              {copy.website}
            </label>
            <input
              id="website"
              type="url"
              className="nova-input"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="https://"
            />
          </div>
          <div>
            <label htmlFor="taxId" className="nova-label">
              {copy.taxId}
            </label>
            <input
              id="taxId"
              className="nova-input"
              value={form.taxId}
              onChange={(e) => update("taxId", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="yearEstablished" className="nova-label">
              {copy.yearEstablished}
            </label>
            <input
              id="yearEstablished"
              className="nova-input"
              value={form.yearEstablished}
              onChange={(e) => update("yearEstablished", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle>{copy.address}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="streetAddress" className="nova-label">
              {copy.streetAddress}
            </label>
            <input
              id="streetAddress"
              required
              className="nova-input"
              value={form.streetAddress}
              onChange={(e) => update("streetAddress", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="city" className="nova-label">
              {copy.city}
            </label>
            <input
              id="city"
              required
              className="nova-input"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="stateProvince" className="nova-label">
              {copy.stateProvince}
            </label>
            <input
              id="stateProvince"
              required
              className="nova-input"
              value={form.stateProvince}
              onChange={(e) => update("stateProvince", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="nova-label">
              {copy.postalCode}
            </label>
            <input
              id="postalCode"
              required
              className="nova-input"
              value={form.postalCode}
              onChange={(e) => update("postalCode", e.target.value)}
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
      </section>

      <section className="space-y-4">
        <SectionTitle>{copy.primaryContact}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contactName" className="nova-label">
              {copy.contactName}
            </label>
            <input
              id="contactName"
              required
              className="nova-input"
              value={form.contactName}
              onChange={(e) => update("contactName", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contactRole" className="nova-label">
              {copy.contactRole}
            </label>
            <input
              id="contactRole"
              required
              className="nova-input"
              value={form.contactRole}
              onChange={(e) => update("contactRole", e.target.value)}
              placeholder={copy.contactRolePlaceholder}
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
            />
          </div>
          <div>
            <label htmlFor="phone" className="nova-label">
              {copy.phone}
            </label>
            <input
              id="phone"
              type="tel"
              required
              className="nova-input"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle>{copy.billing}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="billingContactName" className="nova-label">
              {copy.billingContactName}
            </label>
            <input
              id="billingContactName"
              required
              className="nova-input"
              value={form.billingContactName}
              onChange={(e) => update("billingContactName", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="billingPhone" className="nova-label">
              {copy.billingPhone}
            </label>
            <input
              id="billingPhone"
              type="tel"
              required
              className="nova-input"
              value={form.billingPhone}
              onChange={(e) => update("billingPhone", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="billingEmail" className="nova-label">
              {copy.billingEmail}
            </label>
            <input
              id="billingEmail"
              type="email"
              required
              className="nova-input"
              value={form.billingEmail}
              onChange={(e) => update("billingEmail", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle>{copy.decisionMaker}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="decisionMakerName" className="nova-label">
              {copy.decisionMakerName}
            </label>
            <input
              id="decisionMakerName"
              required
              className="nova-input"
              value={form.decisionMakerName}
              onChange={(e) => update("decisionMakerName", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="decisionMakerTitle" className="nova-label">
              {copy.decisionMakerTitle}
            </label>
            <input
              id="decisionMakerTitle"
              required
              className="nova-input"
              value={form.decisionMakerTitle}
              onChange={(e) => update("decisionMakerTitle", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="decisionMakerEmail" className="nova-label">
              {copy.decisionMakerEmail}
            </label>
            <input
              id="decisionMakerEmail"
              type="email"
              required
              className="nova-input"
              value={form.decisionMakerEmail}
              onChange={(e) => update("decisionMakerEmail", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle>{copy.program}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="productInterest" className="nova-label">
              {copy.productInterest}
            </label>
            <select
              id="productInterest"
              required
              className="nova-input"
              value={form.productInterest}
              onChange={(e) => update("productInterest", e.target.value)}
            >
              {PRODUCT_INTERESTS.map((product) => (
                <option key={product.id} value={product.id}>
                  {isEs ? product.labelEs : product.labelEn}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="estimatedStudents" className="nova-label">
              {copy.estimatedStudents}
            </label>
            <input
              id="estimatedStudents"
              type="number"
              required
              min={1}
              max={100000}
              className="nova-input"
              value={form.estimatedStudents}
              onChange={(e) => update("estimatedStudents", e.target.value)}
              placeholder={copy.estimatedStudentsPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="studentAgeRange" className="nova-label">
              {copy.studentAgeRange}
            </label>
            <select
              id="studentAgeRange"
              required
              className="nova-input"
              value={form.studentAgeRange}
              onChange={(e) => update("studentAgeRange", e.target.value)}
            >
              {STUDENT_AGE_RANGES.map((option) => (
                <option key={option.value} value={option.value}>
                  {optionLabel(option)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="targetLaunchDate" className="nova-label">
              {copy.targetLaunchDate}
            </label>
            <input
              id="targetLaunchDate"
              required
              className="nova-input"
              value={form.targetLaunchDate}
              onChange={(e) => update("targetLaunchDate", e.target.value)}
              placeholder={copy.targetLaunchDatePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="contractTerm" className="nova-label">
              {copy.contractTerm}
            </label>
            <select
              id="contractTerm"
              required
              className="nova-input"
              value={form.contractTerm}
              onChange={(e) => update("contractTerm", e.target.value)}
            >
              {CONTRACT_TERMS.map((option) => (
                <option key={option.value} value={option.value}>
                  {optionLabel(option)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budgetRange" className="nova-label">
              {copy.budgetRange}
            </label>
            <select
              id="budgetRange"
              required
              className="nova-input"
              value={form.budgetRange}
              onChange={(e) => update("budgetRange", e.target.value)}
            >
              {BUDGET_RANGES.map((option) => (
                <option key={option.value} value={option.value}>
                  {optionLabel(option)}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="currentStemOfferings" className="nova-label">
              {copy.currentStemOfferings}
            </label>
            <textarea
              id="currentStemOfferings"
              required
              rows={3}
              className="nova-input resize-y"
              value={form.currentStemOfferings}
              onChange={(e) => update("currentStemOfferings", e.target.value)}
              placeholder={copy.currentStemPlaceholder}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="hardwareInfrastructure" className="nova-label">
              {copy.hardwareInfrastructure}
            </label>
            <select
              id="hardwareInfrastructure"
              required
              className="nova-input"
              value={form.hardwareInfrastructure}
              onChange={(e) => update("hardwareInfrastructure", e.target.value)}
            >
              {HARDWARE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {optionLabel(option)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle>{copy.payment}</SectionTitle>
        <div>
          <label htmlFor="paymentMethod" className="nova-label">
            {copy.paymentMethod}
          </label>
          <select
            id="paymentMethod"
            className="nova-input"
            value={form.paymentMethod}
            onChange={(e) => update("paymentMethod", e.target.value)}
          >
            {INSTITUTION_PAYMENT_METHODS.map((method) => (
              <option key={method.id} value={method.id}>
                {method.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-nova-cyan-light/60">{copy.paymentMethodHint}</p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <label htmlFor="message" className="nova-label">
            {copy.message}
          </label>
          <textarea
            id="message"
            required
            rows={5}
            className="nova-input resize-y"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={copy.messagePlaceholder}
          />
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-nova-cyan-light/85">
          <input
            type="checkbox"
            className="mt-1"
            checked={form.acceptTerms}
            onChange={(e) => update("acceptTerms", e.target.checked)}
          />
          <span>{copy.acceptTerms}</span>
        </label>
      </section>

      <p className="text-xs text-nova-cyan-light/60">{copy.disclaimer}</p>

      <button
        type="submit"
        disabled={loading}
        className="nova-btn-primary nova-btn-glow w-full disabled:opacity-60"
      >
        {loading ? copy.submitting : copy.submit}
      </button>

      <p className="text-center text-sm text-nova-cyan-light/70">
        <Link href={isEs ? "/es/partnership" : PARTNERSHIP_PATH} className="text-nova-cyan hover:underline">
          {isEs ? "Volver al overview de partnership" : "Back to partnership overview"}
        </Link>
      </p>
    </form>
  );
}
