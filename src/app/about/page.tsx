import type { Metadata } from "next";
import Link from "next/link";
import { NOVA_COLLEGE, NOVA_SCHOOL, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About NOVA STEM HUB — Our Mission, Vision & Values",
  description: "Learn about NOVA STEM HUB's commitment to empowering future innovators through world-class STEM education.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">About NOVA STEM HUB</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Empowering future innovators through world-class STEM education
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container max-w-4xl space-y-16">
          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-nova-cyan-light/90">
              {NOVA_STEM_HUB.missionStatement}
            </p>
            <p className="mt-4 text-sm text-nova-cyan-light/70">
              We believe that every learner deserves access to practical, future-ready STEM education that opens doors to meaningful careers and lifelong innovation.
            </p>
          </section>

          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="mt-4 text-lg leading-relaxed text-nova-cyan-light/90">
              To become the trusted global STEM learning ecosystem that bridges the gap between classroom education and real-world technology careers.
            </p>
            <p className="mt-4 text-sm text-nova-cyan-light/70">
              We envision a world where learners of all backgrounds can explore emerging technologies, build authentic projects, and graduate with verifiable credentials that employers trust.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-white">Our Core Values</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Student First</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Every decision prioritizes learner benefit, accessibility, and meaningful educational outcomes.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Educational Excellence</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Rigorous curriculum design, expert review, and continuous quality improvement ensure world-class learning experiences.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Innovation</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  We embrace emerging technologies and teaching methods to prepare learners for the future of work.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Curiosity</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  We foster wonder, exploration, and the courage to ask questions that drive discovery.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Integrity</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Honesty, transparency, and ethical behavior guide all our interactions and decisions.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Inclusion</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  We create welcoming learning environments where diverse perspectives and backgrounds are valued.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Lifelong Learning</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Education is a journey, not a destination—we support learners at every stage of their growth.
                </p>
              </article>
              <article className="nova-glass-card p-6">
                <h3 className="text-lg font-semibold text-nova-cyan">Real-World Impact</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Skills and projects connect to actual challenges, creating value for learners and their communities.
                </p>
              </article>
            </div>
          </section>

          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Our Commitment</h2>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>To Learners:</strong> We provide accessible, engaging, and career-relevant STEM education that empowers you to succeed.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>To Families:</strong> We offer trustworthy educational pathways that prepare your children for the future with confidence.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>To Educators:</strong> We deliver curriculum, tools, and support that enhance your teaching and inspire your students.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>To Communities:</strong> We build local capacity for STEM education and contribute to workforce development.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>To Workforce Development:</strong> We align our programs with industry needs to create pipelines of skilled talent.
                </p>
              </div>
            </div>
          </section>

          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Educational Excellence Framework</h2>
            <p className="mt-4 text-sm text-nova-cyan-light/80">
              Every NOVA course is developed through a rigorous curriculum design process that combines pedagogical expertise with industry relevance.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>AI-Assisted Educational Development:</strong> We leverage artificial intelligence to enhance content creation while maintaining human oversight and quality control.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Instructional Design Best Practices:</strong> Our courses follow proven learning science principles including scaffolding, active learning, and formative assessment.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Progressive Learning Pathways:</strong> Skills build systematically from fundamentals to advanced concepts, ensuring learners develop confidence at each stage.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Real-World Industry Relevance:</strong> Curriculum aligns with current industry standards, tools, and practices to prepare learners for actual careers.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Hands-On Learning Experiences:</strong> Labs, projects, and capstone experiences provide practical application of theoretical knowledge.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Project-Based Learning:</strong> Learners build authentic artifacts and portfolios that demonstrate their capabilities to employers.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Continuous Quality Review:</strong> We regularly evaluate and update content based on learner feedback, industry changes, and pedagogical research.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Expert Review and Refinement:</strong> Subject matter experts review technical accuracy and educational effectiveness before publication.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Continuous Improvement:</strong> We iterate on our courses based on data, feedback, and evolving educational best practices.
                </p>
              </div>
            </div>
          </section>

          <section className="nova-glass-island p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white">Curriculum Quality Standards</h2>
            <p className="mt-4 text-sm text-nova-cyan-light/80">
              Every NOVA course is intentionally designed around core educational principles that ensure measurable learning outcomes.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Clear Learning Objectives:</strong> Each lesson and module has specific, measurable goals that guide the learning experience.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Progressive Knowledge Building:</strong> Concepts scaffold logically, with each step building on previous learning.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Active Learning:</strong> Learners engage with content through practice, experimentation, and problem-solving rather than passive consumption.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Practical Laboratories:</strong> Hands-on exercises reinforce concepts and develop technical proficiency.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Authentic Assessments:</strong> Quizzes, projects, and capstone experiences evaluate real understanding and capability.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Capstone Experiences:</strong> Where applicable, culminating projects integrate all course learning into portfolio-worthy deliverables.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Career Relevance:</strong> Skills and knowledge connect directly to industry roles and professional pathways.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-nova-cyan">✦</span>
                <p className="text-sm text-nova-cyan-light/85">
                  <strong>Future-Ready Skills:</strong> Curriculum emphasizes adaptability, problem-solving, and technologies that will shape tomorrow&apos;s workforce.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="mb-4 text-xl font-bold text-white">Explore Our Programs</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={NOVA_SCHOOL.path} className="nova-btn-primary nova-btn-glow">
                {NOVA_SCHOOL.name}
              </Link>
              <Link href={NOVA_COLLEGE.path} className="nova-btn-primary nova-btn-glow">
                {NOVA_COLLEGE.name}
              </Link>
              <Link href="/language" className="nova-btn-primary nova-btn-glow">
                NOVA Language
              </Link>
            </div>
          </section>
        </div>
      </main>

      </div>
  );
}
