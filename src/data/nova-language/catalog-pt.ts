export const NOVA_LANGUAGE_PAGE_PT = {
  heroDescription:
    "Três programas de idiomas — inglês, espanhol e português — com labs de conversação, contexto cultural e certificados de conclusão.",
  coursesSectionTitle: "Programas de idiomas",
  coursesSectionSubtitle:
    "3 cursos · trilhas alinhadas ao CEFR · prática oral · certificados verificáveis",
  b2bTitle: "Licencie NOVA Language para sua instituição",
  b2bBody:
    "Adicione inglês, espanhol ou português ao seu campus — currículo + plataforma + guia do facilitador.",
  b2bCta: "Contactar NOVA STEM HUB",
} as const;

export const NOVA_LANGUAGE_COURSES_PT: Record<
  string,
  Pick<{ title: string; tagline: string; description: string }, "title" | "tagline" | "description">
> = {
  english: {
    title: "Aprenda Inglês",
    tagline: "Da primeira conversa à fluência profissional — gramática, speaking e confiança real.",
    description:
      "Programa estruturado de inglês: listening, speaking, reading e writing — trilha CEFR A1→B2 para estudantes do mundo todo.",
  },
  spanish: {
    title: "Aprenda Espanhol",
    tagline: "Fale, leia e conecte — espanhol prático para viagem, trabalho e vida diária.",
    description:
      "Programa completo de espanhol com labs de conversação, gramática em contexto e habilidades culturais.",
  },
  portuguese: {
    title: "Aprenda Português",
    tagline: "Fundamentos do português brasileiro e europeu — pronúncia, conversação e básico profissional.",
    description:
      "Programa de português com gramática essencial, prática oral e nuances culturais para aprendizes globais.",
  },
};

export function getLanguageCoursePt(slug: string) {
  return NOVA_LANGUAGE_COURSES_PT[slug];
}
