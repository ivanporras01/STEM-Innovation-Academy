import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PathwayIcon, type PathwayKey } from "@/components/ui/pathway-icon";

const NOVA_PILLARS = [
  {
    num: "01",
    title: "Learn",
    desc: "Structured lessons, demonstrations, simulations, guided practice, and knowledge checks that build real STEM foundations.",
  },
  {
    num: "02",
    title: "Build",
    desc: "Coding, robotics, engineering, IoT, prototypes, and authentic STEM challenges — hands-on from day one.",
  },
  {
    num: "03",
    title: "Innovate",
    desc: "Improve ideas, iterate on projects, and solve problems the way real engineers and creators do.",
  },
  {
    num: "04",
    title: "Inspire",
    desc: "Present your work, grow a digital portfolio, and inspire others with what you've discovered and built.",
  },
] as const;

const HOW_NOVA_WORKS = [
  {
    step: "1",
    title: "Discover",
    desc: "Structured online learning introduces concepts through engaging, mission-style content.",
  },
  {
    step: "2",
    title: "Practice",
    desc: "Guided activities reinforce skills with interactive stations and real-world scenarios.",
  },
  {
    step: "3",
    title: "Build",
    desc: "Practical STEM projects connect learning to authentic engineering and innovation work.",
  },
  {
    step: "4",
    title: "Meet a Mentor",
    desc: "Monthly two-hour mentor-led sessions provide guidance, feedback, and community.",
  },
  {
    step: "5",
    title: "Share",
    desc: "Present achievements and showcase progress in a growing digital STEM portfolio.",
  },
] as const;

const FOUNDING_PATHWAYS = [
  {
    id: "CODING_AI" as PathwayKey,
    title: "Coding & Artificial Intelligence",
    grades: "Middle & High School",
    desc: "Programming fundamentals, Python, AI concepts, and computational thinking through real projects.",
    href: "/courses/intro-python-ai",
    gradient: "from-nova-cyan/20 to-nova-blue/10",
  },
  {
    id: "ROBOTICS" as PathwayKey,
    title: "Robotics & Engineering Design",
    grades: "Middle & High School",
    desc: "Engineering design process, electronics, microcontrollers, and robotics challenges.",
    href: "/courses/robotics-engineering",
    gradient: "from-nova-orange/20 to-nova-deep-blue/10",
  },
  {
    id: "IOT" as PathwayKey,
    title: "IoT & Emerging Technologies",
    grades: "Middle & High School",
    desc: "Smart devices, sensors, wireless systems, cloud integration, and emerging tech.",
    href: "/courses/iot-smart-systems",
    gradient: "from-nova-green/20 to-nova-cyan/10",
  },
] as const;

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
                Practical STEM Education for Future Innovators
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Every learner is a{" "}
                <span className="bg-gradient-to-r from-nova-cyan to-nova-cyan-light bg-clip-text text-transparent">
                  NOVA
                </span>{" "}
                waiting to shine.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-nova-cyan-light/90">
                NOVA – STEM Innovation Academy helps middle and high school learners explore
                technology, develop practical skills, build meaningful projects, and grow into
                confident innovators.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="nova-btn-primary bg-nova-cyan hover:bg-nova-cyan-light"
                >
                  Explore Mission Paths
                </Link>
                <Link
                  href="/experiences"
                  className="nova-btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white"
                >
                  Launch a Mission
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-nova-cyan-light">
                <span>Learn</span>
                <span className="text-nova-cyan">•</span>
                <span>Build</span>
                <span className="text-nova-cyan">•</span>
                <span>Innovate</span>
                <span className="text-nova-cyan">•</span>
                <span>Inspire</span>
              </div>
            </div>

            <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
              <div className="absolute inset-0 rounded-full border border-nova-cyan/20" />
              <div className="absolute inset-8 rounded-full border border-nova-cyan/30" />
              <div className="absolute inset-16 rounded-full border border-dashed border-nova-cyan/40" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue text-lg font-bold shadow-nova-lg">
                NOVA
              </div>
              {(["Learn", "Build", "Innovate", "Inspire"] as const).map((label, i) => {
                const positions = [
                  "left-0 top-1/4",
                  "right-0 top-1/3",
                  "bottom-1/4 left-1/4",
                  "bottom-1/3 right-1/4",
                ];
                return (
                  <span
                    key={label}
                    className={`absolute ${positions[i]} rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur`}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* Discover NOVA */}
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
                NOVA combines structured online learning, Innovation Mentor support, hands-on
                labs, and authentic STEM projects. Explorers don&apos;t just study technology — they
                build with it.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "Project-Based Discovery",
                  desc: "Every quest connects to a real project you can showcase in your NOVA portfolio.",
                },
                {
                  num: "02",
                  title: "Innovation Mentors",
                  desc: "Experienced mentors guide labs, review work, and help Explorers grow as innovators.",
                },
                {
                  num: "03",
                  title: "Three Mission Paths",
                  desc: "Coding & AI, Robotics, and IoT — structured paths with immersive missions and mentor support.",
                },
              ].map((item) => (
                <div key={item.title} className="nova-card text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-nova-cyan/10 text-sm font-bold text-nova-cyan">
                    {item.num}
                  </div>
                  <h3 className="mb-2 font-semibold text-nova-deep-blue">{item.title}</h3>
                  <p className="text-sm text-nova-gray">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The NOVA Experience */}
        <section id="experience" className="bg-white py-20">
          <div className="nova-container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-nova-cyan">
                The NOVA Experience
              </p>
              <h2 className="text-3xl font-bold text-nova-deep-blue">
                Learn. Build. Innovate. Inspire.
              </h2>
              <p className="mt-4 text-nova-gray">
                Four pillars guide every Explorer journey — from first discovery to sharing
                breakthrough work with the world.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {NOVA_PILLARS.map((pillar) => (
                <div key={pillar.title} className="nova-card border-t-4 border-t-nova-cyan">
                  <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-nova-cyan">
                    {pillar.num}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-nova-deep-blue">{pillar.title}</h3>
                  <p className="text-sm text-nova-gray">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Paths overview */}
        <section id="pathways" className="py-20">
          <div className="nova-container">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-nova-cyan">
                  Mission Paths
                </p>
                <h2 className="text-3xl font-bold text-nova-deep-blue">
                  Three paths to innovation
                </h2>
                <p className="mt-2 max-w-2xl text-nova-gray">
                  Each mission path offers structured phases, hands-on builds, and mentor support —
                  designed for middle and high school Explorers.
                </p>
              </div>
              <Link href="/courses" className="nova-btn-secondary shrink-0">
                View All Mission Paths
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {FOUNDING_PATHWAYS.map((pathway) => (
                <Link
                  key={pathway.title}
                  href={pathway.href}
                  className={`nova-card bg-gradient-to-br ${pathway.gradient} transition hover:shadow-nova`}
                >
                  <PathwayIcon
                    pathway={pathway.id}
                    variant="card"
                    className="mb-4 h-14 w-14 text-2xl"
                  />
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-nova-cyan">
                    {pathway.grades}
                  </p>
                  <h3 className="mb-2 text-lg font-bold text-nova-deep-blue">{pathway.title}</h3>
                  <p className="mb-4 text-sm text-nova-gray">{pathway.desc}</p>
                  <span className="text-sm font-semibold text-nova-cyan">
                    Explore Mission Path →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How NOVA Works */}
        <section id="how-it-works" className="bg-nova-deep-blue py-20 text-white">
          <div className="nova-container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-nova-cyan-light">
                How NOVA Works
              </p>
              <h2 className="text-3xl font-bold">Your monthly innovation rhythm</h2>
              <p className="mt-4 text-nova-cyan-light/80">
                NOVA Explorers work independently during the month and participate in one
                two-hour mentor-led session each month.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {HOW_NOVA_WORKS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-nova border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-nova-cyan text-sm font-bold text-nova-deep-blue">
                    {item.step}
                  </span>
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="text-sm text-nova-cyan-light/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portal */}
        <section id="portal" className="border-y border-nova-light-gray bg-white py-16">
          <div className="nova-container text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-nova-cyan">
              NOVA Portal
            </p>
            <h2 className="text-2xl font-bold text-nova-deep-blue sm:text-3xl">
              The NOVA Portal is coming soon
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-nova-gray">
              Secure access for Explorers, Innovation Mentors, and administrators — all in one
              place.
            </p>
            <Link href="/login" className="nova-btn-secondary mt-6 inline-flex">
              Preview Login
            </Link>
          </div>
        </section>

        {/* Journey CTA */}
        <section id="contact" className="bg-nova-deep-blue py-20 text-white">
          <div className="nova-container text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-nova-cyan-light">
              The Journey Begins Here
            </p>
            <h2 className="text-3xl font-bold">
              Help another NOVA Explorer discover what is possible.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-nova-cyan-light/80">
              Connect with NOVA to learn about Explorer enrollment, mentorship, and sponsorship
              opportunities.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register" className="nova-btn-primary bg-nova-cyan">
                Create Explorer Account
              </Link>
              <a
                href="mailto:info@steminnovationacademy.org"
                className="nova-btn-secondary border-white/20 bg-transparent text-white hover:border-white hover:text-white"
              >
                Contact NOVA
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
