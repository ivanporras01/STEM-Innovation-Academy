/** Options for institutional (B2B) partnership registration */

export const CONTRACT_TERMS = [
  { value: "pilot", labelEn: "Pilot semester (3–6 months)", labelEs: "Semestre piloto (3–6 meses)" },
  { value: "annual", labelEn: "Annual license", labelEs: "Licencia anual" },
  { value: "multi-year", labelEn: "Multi-year agreement (2+ years)", labelEs: "Acuerdo multianual (2+ años)" },
] as const;

export const STUDENT_AGE_RANGES = [
  { value: "k-8", labelEn: "Elementary & middle (K–8)", labelEs: "Primaria y secundaria básica (K–8)" },
  { value: "9-12", labelEn: "High school (9–12)", labelEs: "Escuela superior (9–12)" },
  { value: "mixed-k12", labelEn: "Full K–12", labelEs: "K–12 completo" },
  { value: "16-plus", labelEn: "Post-secondary / 16+", labelEs: "Post-secundaria / 16+" },
  { value: "adult", labelEn: "Adult & workforce learners", labelEs: "Adultos y empleabilidad" },
  { value: "mixed", labelEn: "Mixed age groups", labelEs: "Grupos de edades mixtas" },
] as const;

export const HARDWARE_OPTIONS = [
  { value: "full-lab", labelEn: "Full STEM lab / makerspace", labelEs: "Lab STEM / makerspace completo" },
  { value: "partial", labelEn: "Partial — some devices & internet", labelEs: "Parcial — algunos equipos e internet" },
  { value: "minimal", labelEn: "Minimal — need NOVA hardware guidance", labelEs: "Mínimo — necesitamos guía de hardware NOVA" },
  { value: "planning", labelEn: "Planning phase — not yet equipped", labelEs: "Fase de planificación — aún sin equipos" },
] as const;

export const BUDGET_RANGES = [
  { value: "under-10k", labelEn: "Under $10,000 USD / year", labelEs: "Menos de $10,000 USD / año" },
  { value: "10k-25k", labelEn: "$10,000 – $25,000 USD / year", labelEs: "$10,000 – $25,000 USD / año" },
  { value: "25k-50k", labelEn: "$25,000 – $50,000 USD / year", labelEs: "$25,000 – $50,000 USD / año" },
  { value: "50k-plus", labelEn: "$50,000+ USD / year", labelEs: "$50,000+ USD / año" },
  { value: "undecided", labelEn: "To be determined", labelEs: "Por determinar" },
] as const;
