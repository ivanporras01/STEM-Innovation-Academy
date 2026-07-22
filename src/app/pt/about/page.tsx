import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NOVA_COLLEGE, NOVA_SCHOOL, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre NOVA STEM HUB — Nossa Missão, Visão e Valores",
  description: "Conheça o compromisso da NOVA STEM HUB de empoderar futuros inovadores através de educação STEM de classe mundial.",
  path: "/pt/about",
  locale: "pt",
});

export default function AboutPagePt() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVA_STEM_HUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">Sobre NOVA STEM HUB</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Empoderando futuros inovadores através de educação STEM de classe mundial
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container max-w-4xl space-y-16">
          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Nossa Missão</h2>
            <p className="mt-4 text-lg leading-relaxed text-nova-cyan-light/90">
              {NOVA_STEM_HUB.missionStatementPt}
            </p>
            <p className="mt-4 text-sm text-nova-cyan-light/70">
              Acreditamos que cada estudante merece acesso a educação STEM prática, pronta para o futuro, que abra portas para carreiras significativas e inovação ao longo da vida.
            </p>
          </section>

          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Nossa Visão</h2>
            <p className="mt-4 text-lg leading-relaxed text-nova-cyan-light/90">
              Tornar-nos o ecossistema de aprendizado STEM global confiável que fecha a lacuna entre educação em sala de aula e carreiras tecnológicas do mundo real.
            </p>
            <p className="mt-4 text-sm text-nova-cyan-light/70">
              Visualizamos um mundo onde estudantes de todas as origens possam explorar tecnologias emergentes, construir projetos autênticos e graduar-se com credenciais verificáveis que os empregadores confiam.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-white">Nossos Valores Fundamentais</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Estudante em Primeiro Lugar</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Cada decisão prioriza o benefício do estudante, acessibilidade e resultados educacionais significativos.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Excelência Educacional</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Design curricular rigoroso, revisão especializada e melhoria contínua da qualidade asseguram experiências de aprendizado de classe mundial.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Inovação</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Abraçamos tecnologias emergentes e métodos de ensino para preparar estudantes para o futuro do trabalho.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Curiosidade</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Fomentamos a maravilha, exploração e a coragem de fazer perguntas que impulsionam a descoberta.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Integridade</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Honestidade, transparência e comportamento ético guiam todas as nossas interações e decisões.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Inclusão</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Criamos ambientes de aprendizado acolhedores onde perspectivas e origens diversas são valorizadas.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Aprendizado ao Longo da Vida</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Educação é uma jornada, não um destino: apoiamos estudantes em cada etapa de seu crescimento.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Impacto no Mundo Real</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Habilidades e projetos conectam-se a desafios reais, criando valor para estudantes e suas comunidades.
                </p>
              </article>
            </div>
          </section>

          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Nosso Compromisso</h2>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Com os Estudantes:</strong> Fornecemos educação STEM acessível, envolvente e relevante para carreiras que te empodera para ter sucesso.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Com as Famílias:</strong> Oferecemos caminhos educacionais confiáveis que preparam seus filhos para o futuro com confiança.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Com os Educadores:</strong> Entregamos currículo, ferramentas e suporte que melhoram seu ensino e inspiram seus estudantes.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Com as Comunidades:</strong> Construímos capacidade local para educação STEM e contribuímos para o desenvolvimento da força laboral.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Com o Desenvolvimento da Força Laboral:</strong> Alinhamos nossos programas com necessidades industriais para criar pipelines de talento qualificado.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="mb-4 text-xl font-bold text-white">Explore Nossos Programas</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/pt/school" className="nova-btn-primary nova-btn-glow">
                {NOVA_SCHOOL.name}
              </Link>
              <Link href="/pt/college" className="nova-btn-primary nova-btn-glow">
                {NOVA_COLLEGE.name}
              </Link>
              <Link href="/pt/language" className="nova-btn-primary nova-btn-glow">
                NOVA Language
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
