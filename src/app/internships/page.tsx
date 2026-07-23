import type { Metadata } from "next";
import Link from "next/link";
import { NOVA_COLLEGE } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Internships — NOVA Resources",
  description:
    "STEM internships and early-career placements through the NOVA STEM HUB partner network. Apply online.",
  path: "/internships",
});

const INTERNSHIP_AREAS = [
  "IT support & cloud operations",
  "Cybersecurity & SOC analyst shadowing",
  "Data analytics & Python projects",
  "Robotics & automation labs",
  "IoT & smart systems field work",
  "Digital marketing & startup ventures",
  "Quantum workforce (advanced — QCW pathway)",
];

export default function InternshipsPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <h1 className="text-3xl font-black sm:text-4xl">Internships</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Early-career STEM placements with NOVA partner employers and institutions. Ideal for{" "}
            {NOVA_COLLEGE.name} learners building verifiable portfolio work.
          </p>
          <Link href="/internships/apply" className="nova-btn-primary nova-btn-glow mt-8 inline-flex">
            Apply online
          </Link>
        </div>
      </section>
      <main className="nova-space-section flex-1">
        <div className="nova-container max-w-2xl">
          <h2 className="text-xl font-bold text-white">Areas we place</h2>
          <ul className="mt-4 space-y-2 text-sm text-nova-cyan-light/80">
            {INTERNSHIP_AREAS.map((area) => (
              <li key={area} className="flex gap-2">
                <span className="text-nova-cyan">•</span>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </main>
      </div>
  );
}
