"use client";

import { Rocket, Award, Users, Globe, Heart } from "lucide-react";
import type { AppLocale } from "@/lib/locale";
import { getCopyLocale } from "@/lib/locale";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";

type Props = {
  locale?: AppLocale;
  className?: string;
};

const COPY = {
  en: {
    eyebrow: "Why choose NOVA",
    title: "Built for explorers, creators, and future-proof careers",
    body: `${NOVA_STEM_HUB.name} combines hands-on missions, mentor support, and verifiable certificates into one trilingual STEM ecosystem.`,
    items: [
      {
        icon: Rocket,
        title: "Play-to-learn missions",
        description: "Labs, builds, and real-world challenges designed to spark curiosity before enrollment.",
      },
      {
        icon: Award,
        title: "Verifiable certificates",
        description: "Official NOVA credentials that schools, employers, and partners can verify online.",
      },
      {
        icon: Users,
        title: "Mentor-supported growth",
        description: "Guidance from the NOVA mentor network as you move through each mission path.",
      },
      {
        icon: Globe,
        title: "Trilingual experience",
        description: "Customer journeys and key content available in English, Spanish, and Portuguese.",
      },
      {
        icon: Heart,
        title: "Access for every learner",
        description: "Scholarships and institutional partnerships help expand STEM access worldwide.",
      },
    ],
  },
  es: {
    eyebrow: "Por qué elegir NOVA",
    title: "Creado para exploradores, creadores y carreras a prueba de futuro",
    body: `${NOVA_STEM_HUB.name} combina misiones prácticas, mentoría y certificados verificables en un ecosistema STEM trilingüe.`,
    items: [
      {
        icon: Rocket,
        title: "Misiones para aprender jugando",
        description: "Laboratorios, proyectos y desafíos del mundo real diseñados para despertar la curiosidad antes de inscribirte.",
      },
      {
        icon: Award,
        title: "Certificados verificables",
        description: "Credenciales oficiales de NOVA que escuelas, empleadores y socios pueden verificar en línea.",
      },
      {
        icon: Users,
        title: "Crecimiento con mentoría",
        description: "Acompañamiento de la red de mentores de NOVA a lo largo de cada mission path.",
      },
      {
        icon: Globe,
        title: "Experiencia trilingüe",
        description: "Jornadas de usuario y contenido clave disponibles en inglés, español y portugués.",
      },
      {
        icon: Heart,
        title: "Acceso para cada estudiante",
        description: "Becas y alianzas institucionales amplían el acceso al STEM en todo el mundo.",
      },
    ],
  },
  pt: {
    eyebrow: "Por que escolher a NOVA",
    title: "Feito para exploradores, criadores e carreiras à prova do futuro",
    body: `A ${NOVA_STEM_HUB.name} combina missões práticas, mentoria e certificados verificáveis em um ecossistema STEM trilíngue.`,
    items: [
      {
        icon: Rocket,
        title: "Missões para aprender brincando",
        description: "Laboratórios, projetos e desafios do mundo real para despertar a curiosidade antes da inscrição.",
      },
      {
        icon: Award,
        title: "Certificados verificáveis",
        description: "Credenciais oficiais da NOVA que escolas, empregadores e parceiros podem verificar online.",
      },
      {
        icon: Users,
        title: "Crescimento com mentoria",
        description: "Acompanhamento da rede de mentores da NOVA ao longo de cada mission path.",
      },
      {
        icon: Globe,
        title: "Experiência trilíngue",
        description: "Jornadas do usuário e conteúdo-chave disponíveis em inglês, espanhol e português.",
      },
      {
        icon: Heart,
        title: "Acesso para cada aluno",
        description: "Bolsas e parcerias institucionais ampliam o acesso ao STEM em todo o mundo.",
      },
    ],
  },
};

export function WhyNovaBlock({ locale = "en", className = "" }: Props) {
  const lang = locale === "pt" ? "pt" : getCopyLocale(locale);
  const copy = COPY[lang];

  return (
    <section className={`nova-space-section ${className}`}>
      <div className="nova-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">{copy.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{copy.title}</h2>
          <p className="mt-3 text-nova-cyan-light/85">{copy.body}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item) => (
            <div
              key={item.title}
              className="nova-glass-card flex flex-col items-start gap-3 p-5 text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nova-cyan/15 text-nova-cyan">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-nova-cyan-light/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
