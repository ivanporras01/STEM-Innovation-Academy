/**
 * Orbita speaks with a feminine English voice whenever the browser provides one.
 * Agreed product rule: Orbita's tutoring voice is feminine.
 */
export const ORBITA_SPEECH_RATE = 0.95;
export const ORBITA_FEMININE_PITCH = 1.05;

export type OrbitaVoiceSelection = {
  voice: SpeechSynthesisVoice | null;
  lang: "en-US" | "en-GB";
  feminine: boolean;
  label: string;
};

const FEMININE_VOICE_HINTS = [
  "google uk english female",
  "google us english female",
  "microsoft zira",
  "microsoft hazel",
  "microsoft susan",
  "microsoft aria",
  "microsoft jenny",
  "microsoft sonia",
  "zira",
  "samantha",
  "victoria",
  "karen",
  "susan",
  "hazel",
  "serena",
  "moira",
  "tessa",
  "fiona",
  "veena",
  "allison",
  "ava",
  "jenny",
  "aria",
  "sonia",
  "natasha",
  "female",
  "woman",
] as const;

const MASCULINE_VOICE_HINTS = [
  "google uk english male",
  "google us english male",
  "microsoft david",
  "microsoft mark",
  "microsoft james",
  "microsoft guy",
  "male",
  "david",
  "daniel",
  "mark",
  "james",
  "fred",
  "alex",
  "george",
  "guy",
  "tom",
  "ravi",
] as const;

type VoiceWithGender = SpeechSynthesisVoice & { gender?: string };

function isEnglishVoice(voice: SpeechSynthesisVoice): boolean {
  return voice.lang.toLowerCase().startsWith("en");
}

function looksMasculine(voice: SpeechSynthesisVoice): boolean {
  const name = voice.name.toLowerCase();
  if ((voice as VoiceWithGender).gender === "male") return true;
  return MASCULINE_VOICE_HINTS.some((hint) => name.includes(hint.toLowerCase()));
}

function looksFeminine(voice: SpeechSynthesisVoice): boolean {
  const name = voice.name.toLowerCase();
  if ((voice as VoiceWithGender).gender === "female") return true;
  return FEMININE_VOICE_HINTS.some((hint) => name.includes(hint.toLowerCase()));
}

function scoreFeminineVoice(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  let score = 0;

  if ((voice as VoiceWithGender).gender === "female") score += 120;
  if (looksFeminine(voice)) score += 40;
  if (looksMasculine(voice)) score -= 80;

  for (const hint of FEMININE_VOICE_HINTS) {
    if (name.includes(hint.toLowerCase())) {
      score += hint.toLowerCase().includes("female") || hint.toLowerCase().includes("zira") ? 60 : 35;
    }
  }

  if (name.includes("zira")) score += 25;
  if (name.includes("samantha")) score += 20;
  if (name.includes("google") && name.includes("female")) score += 30;

  return score;
}

export function pickOrbitaFeminineVoice(voices: SpeechSynthesisVoice[]): OrbitaVoiceSelection {
  const english = voices.filter(isEnglishVoice);
  const pool = english.length > 0 ? english : voices;
  const femininePool = pool.filter((voice) => looksFeminine(voice) && !looksMasculine(voice));
  const candidates = femininePool.length > 0 ? femininePool : pool.filter((voice) => !looksMasculine(voice));
  const finalPool = candidates.length > 0 ? candidates : pool;

  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -Infinity;

  for (const voice of finalPool) {
    const score = scoreFeminineVoice(voice);
    if (score > bestScore) {
      bestScore = score;
      best = voice;
    }
  }

  if (!best) {
    best = english[0] ?? voices[0] ?? null;
  }

  const feminine = Boolean(best && looksFeminine(best) && !looksMasculine(best));
  const lang = best?.lang.toLowerCase().startsWith("en-gb") ? "en-GB" : "en-US";
  const label = best?.name
    ? feminine
      ? `Feminine · ${best.name}`
      : `Preferred · ${best.name}`
    : "Feminine voice unavailable";

  return { voice: best, lang, feminine, label };
}

let cachedSelection: OrbitaVoiceSelection | null = null;

export function getOrbitaVoice(): OrbitaVoiceSelection {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return { voice: null, lang: "en-US", feminine: false, label: "Voice unavailable" };
  }

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedSelection = pickOrbitaFeminineVoice(voices);
    return cachedSelection;
  }

  return cachedSelection ?? { voice: null, lang: "en-US", feminine: false, label: "Loading feminine voice…" };
}

export function ensureOrbitaVoicesLoaded(onReady?: () => void): () => void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return () => {};
  }

  const synth = window.speechSynthesis;

  const refresh = () => {
    const voices = synth.getVoices();
    if (voices.length === 0) return;
    cachedSelection = pickOrbitaFeminineVoice(voices);
    onReady?.();
  };

  refresh();
  synth.addEventListener("voiceschanged", refresh);
  synth.getVoices();

  return () => synth.removeEventListener("voiceschanged", refresh);
}

export function configureOrbitaUtterance(
  utterance: SpeechSynthesisUtterance,
  selection?: OrbitaVoiceSelection,
  volume = 1,
): OrbitaVoiceSelection {
  const resolved = selection ?? getOrbitaVoice();
  utterance.rate = ORBITA_SPEECH_RATE;
  utterance.pitch = resolved.feminine ? ORBITA_FEMININE_PITCH : 1.12;
  utterance.volume = Math.min(1, Math.max(0, volume));
  utterance.lang = resolved.lang;
  if (resolved.voice) utterance.voice = resolved.voice;
  return resolved;
}

export function speakWithOrbitaVoice(
  text: string,
  options?: { onEnd?: () => void; onError?: () => void; volume?: number },
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !text) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  configureOrbitaUtterance(utterance, undefined, options?.volume ?? 1);

  if (options?.onEnd) utterance.onend = options.onEnd;
  if (options?.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
}
