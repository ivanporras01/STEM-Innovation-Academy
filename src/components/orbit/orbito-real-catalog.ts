export type OrbitoRealId = "silver" | "sentinel" | "aero" | "orbita" | "spark";

export type OrbitoRealVariant = {
  id: OrbitoRealId;
  number: number;
  name: string;
  taglineEs: string;
  vibe: string;
  /** Frame sequence for greeting wave — robot actually changes pose */
  greetingFrames: readonly string[];
  scanFrame: string;
  idleFrame: string;
  /** ms per frame in greeting loop */
  frameInterval: number;
};

const BASE = "/orbito/real";

export const ORBITO_REAL_VARIANTS: readonly OrbitoRealVariant[] = [
  {
    id: "silver",
    number: 1,
    name: "Orbita Silver",
    taglineEs: "Igual a tu referencia — plateado premium, saludo con 4 poses reales",
    vibe: "Tu foto · Recomendado",
    greetingFrames: [
      `${BASE}/orbito-real-01-idle.png`,
      `${BASE}/orbito-real-01-wave-mid.png`,
      `${BASE}/orbito-real-01-wave-peak.png`,
      `${BASE}/orbito-real-01-wave-mid.png`,
    ],
    scanFrame: `${BASE}/orbito-real-01-scan.png`,
    idleFrame: `${BASE}/orbito-real-01-idle.png`,
    frameInterval: 900,
  },
  {
    id: "sentinel",
    number: 2,
    name: "Orbita Sentinel",
    taglineEs: "Humanoide gunmetal oscuro — visor ámbar, saludo táctico",
    vibe: "Tactical STEM",
    greetingFrames: [`${BASE}/orbito-real-02-idle.png`, `${BASE}/orbito-real-02-wave.png`],
    scanFrame: `${BASE}/orbito-real-02-wave.png`,
    idleFrame: `${BASE}/orbito-real-02-idle.png`,
    frameInterval: 1000,
  },
  {
    id: "aero",
    number: 3,
    name: "Orbita Aero",
    taglineEs: "Platino blanco ultra-moderno — brazos abiertos de bienvenida",
    vibe: "Light · Premium",
    greetingFrames: [`${BASE}/orbito-real-03-idle.png`, `${BASE}/orbito-real-03-wave.png`],
    scanFrame: `${BASE}/orbito-real-03-idle.png`,
    idleFrame: `${BASE}/orbito-real-03-idle.png`,
    frameInterval: 1000,
  },
  {
    id: "orbita",
    number: 4,
    name: "Orbita",
    taglineEs: "De frente — saludos cordiales animados: brazos abiertos y bienvenida amable",
    vibe: "Tu elección · Guía oficial NOVA",
    greetingFrames: [
      `${BASE}/orbito-real-04-idle.png`,
      `${BASE}/orbito-real-04-greet-welcome.png`,
      `${BASE}/orbito-real-04-greet-open.png`,
      `${BASE}/orbito-real-04-greet-wave.png`,
      `${BASE}/orbito-real-04-greet-open.png`,
    ],
    scanFrame: `${BASE}/orbito-real-04-scan-wave.png`,
    idleFrame: `${BASE}/orbito-real-04-idle.png`,
    frameInterval: 1100,
  },
  {
    id: "spark",
    number: 5,
    name: "Orbita Spark",
    taglineEs: "Compacto y amigable — doble saludo energético",
    vibe: "Friendly · Dynamic",
    greetingFrames: [`${BASE}/orbito-real-05-idle.png`, `${BASE}/orbito-real-05-wave.png`],
    scanFrame: `${BASE}/orbito-real-05-wave.png`,
    idleFrame: `${BASE}/orbito-real-05-idle.png`,
    frameInterval: 900,
  },
] as const;

export const DEFAULT_ORBITO_REAL_ID: OrbitoRealId = "orbita";

export function getOrbitoRealVariant(id: OrbitoRealId = DEFAULT_ORBITO_REAL_ID): OrbitoRealVariant {
  return ORBITO_REAL_VARIANTS.find((v) => v.id === id) ?? ORBITO_REAL_VARIANTS[0];
}

/** Best single frame to preview a variant without animation. */
export function getOrbitoStillFrame(variant: OrbitoRealVariant, mode: "greeting" | "scan" | "idle"): string {
  if (mode === "scan") return variant.scanFrame;
  if (mode === "idle") return variant.idleFrame;
  const frames = variant.greetingFrames;
  return frames[Math.min(2, frames.length - 1)] ?? variant.idleFrame;
}
