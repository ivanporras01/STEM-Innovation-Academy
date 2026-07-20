export const NOVA_LANGUAGE_PAGE_ES = {
  heroDescription:
    "Tres programas de idiomas — inglés, español y portugués — con labs de conversación, contexto cultural y certificados de finalización.",
  coursesSectionTitle: "Programas de idiomas",
  coursesSectionSubtitle:
    "3 cursos · rutas alineadas al MCER · práctica oral · certificados verificables",
  b2bTitle: "Licencia NOVA Language para tu institución",
  b2bBody:
    "Añade inglés, español o portugués a tu campus — currículo + plataforma + guía del facilitador.",
  b2bCta: "Contactar NOVA STEM HUB",
} as const;

export const NOVA_LANGUAGE_COURSES_ES: Record<
  string,
  Pick<{ title: string; tagline: string; description: string }, "title" | "tagline" | "description">
> = {
  english: {
    title: "Aprende Inglés",
    tagline: "De la primera conversación a la fluidez profesional — gramática, speaking y confianza real.",
    description:
      "Programa estructurado de inglés: listening, speaking, reading y writing — ruta MCER A1→B2 para estudiantes de todo el mundo.",
  },
  spanish: {
    title: "Aprende Español",
    tagline: "Habla, lee y conecta — español práctico para viaje, trabajo y vida diaria.",
    description:
      "Programa completo de español con labs de conversación, gramática en contexto y habilidades culturales.",
  },
  portuguese: {
    title: "Aprende Portugués",
    tagline: "Bases del portugués brasileño y europeo — pronunciación, conversación y profesional básico.",
    description:
      "Programa de portugués con gramática esencial, práctica oral y matices culturales para aprendices globales.",
  },
};

export function getLanguageCourseEs(slug: string) {
  return NOVA_LANGUAGE_COURSES_ES[slug];
}
