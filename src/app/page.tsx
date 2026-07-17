import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-nova-deep-blue via-nova-blue to-nova-deep-blue py-20 text-white sm:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-nova-cyan/20 blur-3xl" />
            <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-nova-orange/10 blur-3xl" />
          </div>

          <div className="nova-container relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-nova-cyan-light">
                Project-Based STEM Education
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Every student is a{" "}
                <span className="bg-gradient-to-r from-nova-cyan to-nova-cyan-light bg-clip-text text-transparent">
                  NOVA
                </span>{" "}
                waiting to shine.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-nova-cyan-light/90">
                STEM Innovation Academy empowers middle and high school students to
                explore technology, build meaningful projects, and become confident innovators.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/pathways" className="nova-btn-primary bg-nova-cyan hover:bg-nova-cyan-light">
                  Explore Learning Pathways
                </Link>
                <Link href="/login" className="nova-btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white">
                  Enter NOVA Portal
                </Link>
              </div>
              <div className="mt-10 flex gap-6 text-sm font-semibold text-nova-cyan-light">
                <span>Learn</span>
                <span className="text-nova-cyan">•</span>
                <span>Build</span>
                <span className="text-nova-cyan">•</span>
                <span>Innovate</span>
              </div>
            </div>

            <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
              <div className="absolute inset-0 rounded-full border border-nova-cyan/20" />
              <div className="absolute inset-8 rounded-full border border-nova-cyan/30" />
              <div className="absolute inset-16 rounded-full border border-dashed border-nova-cyan/40" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue text-4xl shadow-nova-lg">
                ✦
              </div>
              <span className="absolute left-0 top-1/4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                Learn
              </span>
              <span className="absolute right-0 top-1/3 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                Build
              </span>
              <span className="absolute bottom-1/4 left-1/4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                Innovate
              </span>
            </div>
          </div>
        </section>

        {/* Discover */}
        <section id="discover" className="py-20">
          <div className="nova-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-nova-cyan">
                Discover NOVA
              </p>
              <h2 className="text-3xl font-bold text-nova-deep-blue">
                More than a classroom — an innovation ecosystem
              </h2>
              <p className="mt-4 text-lg text-nova-gray">
                Project NOVA combines guided learning, mentor support, hands-on labs,
                and authentic STEM projects. Students don&apos;t just study technology — they build with it.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Project-Based Learning",
                  desc: "Every lesson connects to a real project you can showcase in your NOVA portfolio.",
                },
                {
                  title: "Innovation Mentors",
                  desc: "Experienced mentors guide labs, review work, and help students grow as innovators.",
                },
                {
                  title: "Three STEM Pathways",
                  desc: "Coding & AI, Robotics, and IoT — each designed for authentic engineering experiences.",
                },
              ].map((item) => (
                <div key={item.title} className="nova-card text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-nova-cyan/10 text-xl text-nova-cyan">
                    ✦
                  </div>
                  <h3 className="mb-2 font-semibold text-nova-deep-blue">{item.title}</h3>
                  <p className="text-sm text-nova-gray">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pathways preview */}
        <section id="pathways" className="bg-white py-20">
          <div className="nova-container">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-nova-cyan">
                  Learning Pathways
                </p>
                <h2 className="text-3xl font-bold text-nova-deep-blue">
                  Choose your innovation journey
                </h2>
              </div>
              <Link href="/courses" className="nova-btn-secondary">
                View All Courses
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Coding & AI",
                  desc: "Python, machine learning, and AI ethics through real projects.",
                  href: "/courses/intro-python-ai",
                  gradient: "from-nova-cyan/20 to-nova-blue/10",
                },
                {
                  title: "Robotics & Engineering",
                  desc: "Design and program robots using the engineering design process.",
                  href: "/courses/robotics-engineering",
                  gradient: "from-nova-orange/20 to-nova-deep-blue/10",
                },
                {
                  title: "IoT & Smart Systems",
                  desc: "Connect sensors and cloud services to build intelligent systems.",
                  href: "/courses/iot-smart-systems",
                  gradient: "from-nova-green/20 to-nova-cyan/10",
                },
              ].map((pathway) => (
                <Link
                  key={pathway.title}
                  href={pathway.href}
                  className={`nova-card bg-gradient-to-br ${pathway.gradient} transition hover:shadow-nova`}
                >
                  <h3 className="mb-2 text-lg font-bold text-nova-deep-blue">{pathway.title}</h3>
                  <p className="mb-4 text-sm text-nova-gray">{pathway.desc}</p>
                  <span className="text-sm font-semibold text-nova-cyan">
                    Explore Pathway →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Parents & Schools */}
        <section id="parents" className="py-20">
          <div className="nova-container grid gap-8 lg:grid-cols-2">
            <div className="nova-card">
              <h2 className="mb-3 text-xl font-bold text-nova-deep-blue">For Parents</h2>
              <p className="text-nova-gray">
                Track your child&apos;s progress, view achievements, and stay connected with
                Innovation Mentors through the NOVA Portal. Transparent learning with real outcomes.
              </p>
            </div>
            <div id="schools" className="nova-card">
              <h2 className="mb-3 text-xl font-bold text-nova-deep-blue">For Schools</h2>
              <p className="text-nova-gray">
                Partner with NOVA for pilot programs, roster management, progress reporting,
                and a complete STEM curriculum aligned with project-based learning principles.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="bg-nova-deep-blue py-20 text-white">
          <div className="nova-container text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-nova-cyan-light">
              The Journey Begins Here
            </p>
            <h2 className="text-3xl font-bold">Ready to help another NOVA shine?</h2>
            <p className="mx-auto mt-4 max-w-xl text-nova-cyan-light/80">
              Join the NOVA learning platform or contact us about enrollment and school partnerships.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register" className="nova-btn-primary bg-nova-cyan">
                Create Account
              </Link>
              <a
                href="mailto:info@steminnovationacademy.org"
                className="nova-btn-secondary border-white/20 bg-transparent text-white hover:border-white hover:text-white"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
