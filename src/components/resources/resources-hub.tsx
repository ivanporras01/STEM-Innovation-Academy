import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { getNovaStemHubNav } from "@/lib/nova-nav";
import type { AppLocale } from "@/lib/locale";
import { BookOpen, Briefcase, Building2, DollarSign } from "lucide-react";

const SECTION_ICONS = [BookOpen, DollarSign, Briefcase, Building2] as const;

const COPY: Record<AppLocale, { subtitle: string; description: string }> = {
  en: {
    subtitle:
      "Programs, funding, careers, and institutions — everything you need to explore, apply, and partner with NOVA.",
    description:
      "A single hub for the NOVA ecosystem: browse the catalog, request enrollment, explore scholarships, internships, and partnership options.",
  },
  es: {
    subtitle:
      "Programas, financiamiento, carreras e instituciones — todo lo que necesitas para explorar, aplicar y asociarte con NOVA.",
    description:
      "Un único centro para el ecosistema NOVA: explora el catálogo, solicita inscripción, becas, pasantías y opciones de partnership.",
  },
  pt: {
    subtitle:
      "Programas, financiamento, carreiras e instituições — tudo que você precisa para explorar, candidatar-se e parceirir com a NOVA.",
    description:
      "Um único hub para o ecossistema NOVA: explore o catálogo, solicite inscrição, bolsas, estágios e opções de parceria.",
  },
};

export function ResourcesHub({ locale }: { locale: AppLocale }) {
  const hub = getNovaStemHubNav(locale);
  const copy = COPY[locale];

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-cyan/10 via-transparent to-nova-blue/10" />
        <PageHero title={hub.megaTitle} subtitle={copy.subtitle} description={copy.description} />
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container">
          <div className="grid gap-6 md:grid-cols-2">
            {hub.sections.map((section, idx) => {
              const Icon = SECTION_ICONS[idx % SECTION_ICONS.length];
              return (
                <div key={section.title} className="nova-glass-island flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-nova-cyan" aria-hidden />
                    <h2 className="text-lg font-bold text-white">{section.title}</h2>
                  </div>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group block rounded-lg border border-white/5 p-3 transition hover:border-nova-cyan/30 hover:bg-white/5"
                        >
                          <span className="font-semibold text-white group-hover:text-nova-cyan-light">
                            {link.label}
                          </span>
                          {link.description && (
                            <p className="mt-1 text-xs text-nova-cyan-light/70">{link.description}</p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
