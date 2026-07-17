import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";

const pathways = [
  {
    id: "CODING_AI",
    title: "Coding & Artificial Intelligence",
    description:
      "Learn Python, data science, and AI fundamentals through hands-on projects. Build chatbots, train models, and solve real-world problems with code.",
    color: "from-nova-cyan to-nova-blue",
    slug: "intro-python-ai",
    topics: ["Python", "Machine Learning", "Data Visualization", "Ethics in AI"],
  },
  {
    id: "ROBOTICS",
    title: "Robotics & Engineering Design",
    description:
      "Design, build, and program robots using the engineering design process. From line followers to competition-ready autonomous systems.",
    color: "from-nova-orange to-nova-deep-blue",
    slug: "robotics-engineering",
    topics: ["Engineering Design", "Arduino", "Sensors & Actuators", "Competition Prep"],
  },
  {
    id: "IOT",
    title: "IoT & Smart Systems",
    description:
      "Connect sensors, microcontrollers, and cloud platforms to build intelligent systems for homes, schools, and communities.",
    color: "from-nova-green to-nova-blue",
    slug: "iot-smart-systems",
    topics: ["Sensors", "Cloud Dashboards", "Smart Agriculture", "Environmental Monitoring"],
  },
];

export default function PathwaysPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="nova-container">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-nova-cyan">
              Founding Pathways
            </p>
            <h1 className="text-3xl font-bold text-nova-deep-blue sm:text-4xl">
              Three Pathways to Innovation
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-nova-gray">
              Every NOVA Explorer chooses a pathway — or explores all three — through
              project-based learning designed for middle and high school students.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pathways.map((pathway) => (
              <article key={pathway.id} className="nova-card flex flex-col overflow-hidden p-0">
                <div className={`bg-gradient-to-br ${pathway.color} p-6 text-white`}>
                  <h2 className="text-xl font-bold">{pathway.title}</h2>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-nova-gray">
                    {pathway.description}
                  </p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {pathway.topics.map((topic) => (
                      <Badge key={topic} variant="cyan">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={`/courses/${pathway.slug}`}
                    className="nova-btn-primary w-full text-center"
                  >
                    Explore Pathway →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
