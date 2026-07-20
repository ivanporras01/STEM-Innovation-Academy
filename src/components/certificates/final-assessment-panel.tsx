"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  MAX_ASSESSMENT_ATTEMPTS,
  PASSING_SCORE_PERCENT,
} from "@/lib/certificates/constants";
import type { PublicFinalExamQuestion } from "@/lib/certificates/final-exam";
import type { AppLocale } from "@/lib/locale";
import { Award, CheckCircle2, RotateCcw } from "lucide-react";

type AttemptRecord = {
  attemptNumber: number;
  scorePercent: number;
  passed: boolean;
  createdAt: string;
};

type AssessmentState = {
  attemptsUsed: number;
  maxAttempts: number;
  passingScorePercent: number;
  attempts: AttemptRecord[];
  passed: boolean;
  certificateCode: string | null;
  canAttempt: boolean;
  blockReason: string | null;
  enrolled: boolean;
  questions: PublicFinalExamQuestion[];
};

type Props = {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  locale?: AppLocale;
};

const COPY = {
  en: {
    title: "Final assessment & certificate",
    intro: `Pass with ${PASSING_SCORE_PERCENT}% or higher. You have up to ${MAX_ASSESSMENT_ATTEMPTS} attempts.`,
    start: "Start final assessment",
    submit: "Submit assessment",
    submitting: "Grading…",
    passed: "Congratulations! You passed.",
    failed: "You did not reach the passing score.",
    attemptsLeft: "Attempts remaining",
    viewCert: "View & print certificate",
    verify: "Verify certificate",
    score: "Your score",
    history: "Attempt history",
    locked: "Assessment locked",
    notEnrolled: "Enroll in this path to unlock the final assessment.",
  },
  es: {
    title: "Examen final y certificado",
    intro: `Aprueba con ${PASSING_SCORE_PERCENT}% o más. Tienes hasta ${MAX_ASSESSMENT_ATTEMPTS} intentos.`,
    start: "Iniciar examen final",
    submit: "Enviar examen",
    submitting: "Calificando…",
    passed: "¡Felicitaciones! Aprobaste.",
    failed: "No alcanzaste la nota mínima de aprobación.",
    attemptsLeft: "Intentos restantes",
    viewCert: "Ver e imprimir certificado",
    verify: "Verificar certificado",
    score: "Tu puntaje",
    history: "Historial de intentos",
    locked: "Examen bloqueado",
    notEnrolled: "Inscríbete en este programa para desbloquear el examen final.",
  },
  pt: {
    title: "Avaliação final e certificado",
    intro: `Aprove com ${PASSING_SCORE_PERCENT}% ou mais. Você tem até ${MAX_ASSESSMENT_ATTEMPTS} tentativas.`,
    start: "Iniciar avaliação final",
    submit: "Enviar avaliação",
    submitting: "Corrigindo…",
    passed: "Parabéns! Você foi aprovado.",
    failed: "Você não atingiu a nota mínima.",
    attemptsLeft: "Tentativas restantes",
    viewCert: "Ver e imprimir certificado",
    verify: "Verificar certificado",
    score: "Sua pontuação",
    history: "Histórico de tentativas",
    locked: "Avaliação bloqueada",
    notEnrolled: "Inscreva-se neste programa para desbloquear a avaliação final.",
  },
} as const;

export function FinalAssessmentPanel({
  courseId,
  courseTitle,
  courseSlug,
  locale = "es",
}: Props) {
  const copy = COPY[locale] ?? COPY.en;
  const [state, setState] = useState<AssessmentState | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<{
    passed: boolean;
    scorePercent: number;
    certificateCode: string | null;
    attemptsRemaining: number;
  } | null>(null);
  const [error, setError] = useState("");

  const loadStatus = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/certificates/attempt?courseId=${encodeURIComponent(courseId)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error loading assessment");
        return;
      }
      setState(data);
    } catch {
      setError("No se pudo cargar el examen.");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!state?.questions.length) return;

    const unanswered = state.questions.some((q) => answers[q.id] === undefined);
    if (unanswered) {
      setError(locale === "es" ? "Responde todas las preguntas." : "Answer all questions.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/certificates/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, answers, locale }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error submitting");
        return;
      }
      setLastResult({
        passed: data.passed,
        scorePercent: data.scorePercent,
        certificateCode: data.certificateCode,
        attemptsRemaining: data.attemptsRemaining,
      });
      setStarted(false);
      setAnswers({});
      await loadStatus();
    } catch {
      setError("Error al enviar el examen.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="nova-card animate-pulse p-6 text-sm text-nova-cyan-light/70">
        {locale === "es" ? "Cargando examen final…" : "Loading final assessment…"}
      </div>
    );
  }

  if (!state?.enrolled) {
    return (
      <div className="nova-card border-white/10 p-6">
        <p className="text-sm text-nova-cyan-light/80">{copy.notEnrolled}</p>
      </div>
    );
  }

  return (
    <div id="final-assessment" className="nova-card border-nova-cyan/20 p-6">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nova-cyan/15 text-nova-cyan">
          <Award className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{copy.title}</h3>
          <p className="mt-1 text-sm text-nova-cyan-light/80">{copy.intro}</p>
          <p className="mt-1 text-xs text-white/50">
            {courseTitle} · {state.attemptsUsed}/{state.maxAttempts}{" "}
            {locale === "es" ? "intentos usados" : "attempts used"}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-400/30 bg-red-950/30 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      {lastResult && (
        <div
          className={`mb-4 rounded-xl border px-4 py-3 ${
            lastResult.passed
              ? "border-nova-green/40 bg-nova-green/10"
              : "border-nova-orange/40 bg-nova-orange/10"
          }`}
        >
          <p className="font-semibold text-white">
            {lastResult.passed ? copy.passed : copy.failed}
          </p>
          <p className="mt-1 text-sm text-white/80">
            {copy.score}: <strong>{lastResult.scorePercent}%</strong>
            {!lastResult.passed && (
              <> · {copy.attemptsLeft}: {lastResult.attemptsRemaining}</>
            )}
          </p>
          {lastResult.certificateCode && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`/dashboard/student/certificates/${lastResult.certificateCode}`}
                className="nova-btn-primary nova-btn-glow inline-flex text-sm"
              >
                {copy.viewCert}
              </Link>
              <Link
                href={`/verify?code=${encodeURIComponent(lastResult.certificateCode)}`}
                className="nova-btn-secondary inline-flex border-white/20 text-sm text-white"
              >
                {copy.verify}
              </Link>
            </div>
          )}
        </div>
      )}

      {state.passed && state.certificateCode && !lastResult && (
        <div className="mb-4 rounded-xl border border-nova-green/40 bg-nova-green/10 px-4 py-3">
          <p className="flex items-center gap-2 font-semibold text-nova-green">
            <CheckCircle2 className="h-4 w-4" />
            {copy.passed}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={`/dashboard/student/certificates/${state.certificateCode}`}
              className="nova-btn-primary nova-btn-glow inline-flex text-sm"
            >
              {copy.viewCert}
            </Link>
          </div>
        </div>
      )}

      {state.attempts.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
            {copy.history}
          </p>
          <ul className="space-y-1 text-sm">
            {state.attempts.map((a) => (
              <li key={a.attemptNumber} className="flex justify-between text-nova-cyan-light/80">
                <span>
                  #{a.attemptNumber} · {new Date(a.createdAt).toLocaleDateString()}
                </span>
                <span className={a.passed ? "text-nova-green" : "text-nova-orange"}>
                  {a.scorePercent}% {a.passed ? "✓" : "✗"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!state.passed && !state.canAttempt && state.blockReason && (
        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-nova-cyan-light/80">
          <p className="font-medium text-white">{copy.locked}</p>
          <p className="mt-1">{state.blockReason}</p>
        </div>
      )}

      {!state.passed && state.canAttempt && !started && (
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="nova-btn-primary nova-btn-glow inline-flex w-full justify-center sm:w-auto"
        >
          {copy.start}
        </button>
      )}

      {!state.passed && state.canAttempt && started && state.questions.length > 0 && (
        <form onSubmit={handleSubmit} className="mt-2 space-y-5">
          {state.questions.map((q, idx) => (
            <fieldset key={q.id} className="rounded-xl border border-white/10 p-4">
              <legend className="mb-3 text-sm font-medium text-white">
                {idx + 1}. {q.prompt}
              </legend>
              <div className="space-y-2">
                {q.options.map((option, optionIndex) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-white/5"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === optionIndex}
                      onChange={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: optionIndex }))
                      }
                      className="mt-1"
                    />
                    <span className="text-sm text-nova-cyan-light/90">{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="nova-btn-primary nova-btn-glow inline-flex disabled:opacity-60"
            >
              {submitting ? copy.submitting : copy.submit}
            </button>
            <button
              type="button"
              onClick={() => {
                setStarted(false);
                setAnswers({});
              }}
              className="nova-btn-secondary inline-flex items-center gap-2 border-white/20 text-white"
            >
              <RotateCcw className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </form>
      )}

      {!state.passed && state.canAttempt && started && state.questions.length === 0 && (
        <button type="button" onClick={() => loadStatus()} className="text-sm text-nova-cyan hover:underline">
          Reload questions
        </button>
      )}

      <input type="hidden" name="courseSlug" value={courseSlug} />
    </div>
  );
}
