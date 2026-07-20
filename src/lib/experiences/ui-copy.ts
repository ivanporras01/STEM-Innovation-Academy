import type { AppLocale } from "@/lib/locale";
import type { ExperienceStageId } from "./catalog";

export const EXPERIENCE_STAGE_LABELS: Record<
  AppLocale,
  Record<ExperienceStageId, string>
> = {
  en: {
    launch: "Mission Launch",
    buddy: "Choose Your Buddy",
    briefing: "Mission Briefing",
    lab: "Interactive LAB",
    quiz: "Innovation Check",
    reflection: "Explorer Reflection",
    debrief: "Mission Debrief",
    achievement: "Achievement Unlocked",
  },
  es: {
    launch: "Lanzamiento de misión",
    buddy: "Elige tu Buddy",
    briefing: "Briefing de misión",
    lab: "LAB interactivo",
    quiz: "Chequeo de innovación",
    reflection: "Reflexión del explorador",
    debrief: "Debrief de misión",
    achievement: "Logro desbloqueado",
  },
  pt: {
    launch: "Lançamento da missão",
    buddy: "Escolha seu Buddy",
    briefing: "Briefing da missão",
    lab: "LAB interativo",
    quiz: "Checagem de inovação",
    reflection: "Reflexão do explorador",
    debrief: "Debrief da missão",
    achievement: "Conquista desbloqueada",
  },
};

export const EXPERIENCE_UI = {
  en: {
    acceptMission: "Accept Mission →",
    continueWithBuddy: "Continue with My Buddy →",
    back: "Back",
    enterLab: "Enter the LAB →",
    claimAchievement: "Claim Achievement ✦",
    missionLive: "● Mission Live",
    exploreNow: "Explore Now",
    selected: "Selected",
    of: "of",
    missionCompleteContinue: "Mission Complete — Continue →",
    labClearedTitle: "LAB cleared",
    labClearedBody: "Great work — advance to lock in your mission progress.",
    congratulations: "Congratulations!",
    missionCompleteGreeting: "Mission complete — you earned this badge.",
    muteSound: "Mute sound",
    unmuteSound: "Unmute sound",
  },
  es: {
    acceptMission: "Activar la misión →",
    continueWithBuddy: "Continuar con mi Buddy →",
    back: "Atrás",
    enterLab: "Entrar al LAB →",
    claimAchievement: "Reclamar logro ✦",
    missionLive: "● Misión en vivo",
    exploreNow: "Explore Now",
    selected: "Seleccionado",
    of: "de",
    missionCompleteContinue: "Misión completa — Continuar →",
    labClearedTitle: "LAB superado",
    labClearedBody: "Excelente — avanza para asegurar el progreso de tu misión.",
    congratulations: "¡Felicidades!",
    missionCompleteGreeting: "Misión completa — ganaste esta insignia.",
    muteSound: "Silenciar sonido",
    unmuteSound: "Activar sonido",
  },
  pt: {
    acceptMission: "Ativar a missão →",
    continueWithBuddy: "Continuar com meu Buddy →",
    back: "Voltar",
    enterLab: "Entrar no LAB →",
    claimAchievement: "Reivindicar conquista ✦",
    missionLive: "● Missão ao vivo",
    exploreNow: "Explore Now",
    selected: "Selecionado",
    of: "de",
    missionCompleteContinue: "Missão completa — Continuar →",
    labClearedTitle: "LAB concluído",
    labClearedBody: "Ótimo trabalho — avance para travar o progresso da missão.",
    congratulations: "Parabéns!",
    missionCompleteGreeting: "Missão completa — você conquistou este distintivo.",
    muteSound: "Silenciar som",
    unmuteSound: "Ativar som",
  },
} as const;

/** Prefer Spanish/Portuguese when the browser advertises those languages. */
export function localeFromAcceptLanguage(header: string | null): AppLocale {
  if (!header) return "en";
  const lower = header.toLowerCase();
  // Order matters: first matching preference wins via quality-ish scan of tags.
  const tags = lower.split(",").map((part) => part.trim().split(";")[0] ?? "");
  for (const tag of tags) {
    if (tag.startsWith("es")) return "es";
    if (tag.startsWith("pt")) return "pt";
    if (tag.startsWith("en")) return "en";
  }
  if (/\bes[-_]/.test(lower) || /(^|,)\s*es\b/.test(lower)) return "es";
  if (/\bpt[-_]/.test(lower) || /(^|,)\s*pt\b/.test(lower)) return "pt";
  return "en";
}
