import type { Metadata } from "next";
import Link from "next/link";
import { NOVA_COLLEGE, NOVA_SCHOOL, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre NOVA STEM HUB — Nuestra Misión, Visión y Valores",
  description: "Conozca el compromiso de NOVA STEM HUB de empoderar a futuros innovadores a través de educación STEM de clase mundial.",
  path: "/es/about",
  locale: "es",
});

export default function AboutPageEs() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">Sobre NOVA STEM HUB</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Empoderando a futuros innovadores a través de educación STEM de clase mundial
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container max-w-4xl space-y-16">
          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Nuestra Misión</h2>
            <p className="mt-4 text-lg leading-relaxed text-nova-cyan-light/90">
              {NOVA_STEM_HUB.missionStatementEs}
            </p>
            <p className="mt-4 text-sm text-nova-cyan-light/70">
              Creemos que cada estudiante merece acceso a educación STEM práctica, lista para el futuro, que abra puertas a carreras significativas e innovación de por vida.
            </p>
          </section>

          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Nuestra Visión</h2>
            <p className="mt-4 text-lg leading-relaxed text-nova-cyan-light/90">
              Convertirnos en el ecosistema de aprendizaje STEM global de confianza que cierra la brecha entre la educación en el aula y las carreras tecnológicas del mundo real.
            </p>
            <p className="mt-4 text-sm text-nova-cyan-light/70">
              Visualizamos un mundo donde estudiantes de todos los orígenes puedan explorar tecnologías emergentes, construir proyectos auténticos y graduarse con credenciales verificables que los empleadores confían.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-white">Nuestros Valores Fundamentales</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Estudiante Primero</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Cada decisión prioriza el beneficio del estudiante, accesibilidad y resultados educativos significativos.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Excelencia Educativa</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Diseño curricular riguroso, revisión experta y mejora continua de la calidad aseguran experiencias de aprendizaje de clase mundial.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Innovación</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Abrazamos tecnologías emergentes y métodos de enseñanza para preparar estudiantes para el futuro del trabajo.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Curiosidad</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Fomentamos la maravilla, exploración y el coraje de hacer preguntas que impulsan el descubrimiento.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Integridad</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Honestidad, transparencia y comportamiento ético guían todas nuestras interacciones y decisiones.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Inclusión</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Creamos entornos de aprendizaje acogedores donde se valoran perspectivas y antecedentes diversos.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Aprendizaje de por Vida</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  La educación es un viaje, no un destino: apoyamos a estudiantes en cada etapa de su crecimiento.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Impacto en el Mundo Real</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Habilidades y proyectos se conectan a desafíos reales, creando valor para estudiantes y sus comunidades.
                </p>
              </article>
            </div>
          </section>

          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Nuestro Compromiso</h2>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Con los Estudiantes:</strong> Proporcionamos educación STEM accesible, atractiva y relevante para carreras que te empodera para tener éxito.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Con las Familias:</strong> Ofrecemos caminos educativos confiables que preparan a sus hijos para el futuro con confianza.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Con los Educadores:</strong> Entregamos currículo, herramientas y apoyo que mejoran su enseñanza e inspiran a sus estudiantes.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Con las Comunidades:</strong> Construimos capacidad local para educación STEM y contribuimos al desarrollo de la fuerza laboral.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Con el Desarrollo de la Fuerza Laboral:</strong> Alineamos nuestros programas con necesidades industriales para crear pipelines de talento calificado.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="mb-4 text-xl font-bold text-white">Explore Nuestros Programas</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={NOVA_SCHOOL.pathEs} className="nova-btn-primary nova-btn-glow">
                {NOVA_SCHOOL.name}
              </Link>
              <Link href={NOVA_COLLEGE.pathEs} className="nova-btn-primary nova-btn-glow">
                {NOVA_COLLEGE.name}
              </Link>
              <Link href="/es/language" className="nova-btn-primary nova-btn-glow">
                NOVA Language
              </Link>
            </div>
          </section>
        </div>
      </main>

      </div>
  );
}
