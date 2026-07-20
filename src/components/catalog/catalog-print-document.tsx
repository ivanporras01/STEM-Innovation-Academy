import {
  CATALOG_STATS,
  NOVA_PROGRAM_BUNDLES,
  NOVA_PROGRAM_CATALOG,
  type NovaProgram,
  type ProgramVertical,
} from "@/data/courses";
import { localizeProgram } from "@/lib/program-locale-copy";

const VERTICAL_LABELS: Record<ProgramVertical, string> = {
  school: "NOVA School — Youth Electives (9)",
  college: "NOVA College — Employability Tracks (9)",
  language: "NOVA Language — CEFR Programs (3)",
};

const PRICING_GUIDE = [
  { tier: "School standard electives", range: "$179 / elective" },
  { tier: "School premium (Coding, Robotics, IoT + demo missions)", range: "$249 / elective" },
  { tier: "Cybersecurity Teens", range: "$199 / elective" },
  { tier: "School Explorer Pass (all 9 electives)", range: "$1,299 / year" },
  { tier: "College Tier 1 tracks", range: "$749 – $949 (most $849 – $899)" },
  { tier: "Quantum Workforce — Tier 2 Advanced (QCW)", range: "$1,899 / program" },
  { tier: "College Career Starter (any 2 Tier 1 tracks)", range: "$1,499" },
  { tier: "NOVA Language (each)", range: "$449 / program" },
  { tier: "Language Trilingual Pack (EN + ES + PT)", range: "$999" },
];

function groupByVertical(programs: readonly NovaProgram[]) {
  return (["school", "college", "language"] as const).map((vertical) => ({
    vertical,
    label: VERTICAL_LABELS[vertical],
    programs: programs.filter((p) => p.vertical === vertical),
  }));
}

function ProgramBlock({ program }: { program: NovaProgram }) {
  const isQuantum = program.slug === "quantum-workforce";
  const copy = localizeProgram(program, "en");

  return (
    <article
      className={`catalog-program ${isQuantum ? "catalog-program-quantum" : ""}`}
      id={program.slug}
    >
      <header className="catalog-program-header">
        <div>
          <h3>{copy.title}</h3>
          <p className="tagline">{copy.tagline}</p>
        </div>
        <div className="tuition-badge">{program.tuitionLabel}</div>
      </header>

      <p className="description">{copy.description.replace(/\*\*/g, "")}</p>

      <dl className="meta-grid">
        <div>
          <dt>Duration</dt>
          <dd>{program.durationLabel}</dd>
        </div>
        <div>
          <dt>Age range</dt>
          <dd>{program.ageRange ?? "—"}</dd>
        </div>
        <div>
          <dt>Tuition (USD)</dt>
          <dd>${program.tuitionUsd.toLocaleString("en-US")}</dd>
        </div>
        <div>
          <dt>Access</dt>
          <dd>
            {program.access === "demo-then-paid"
              ? "Free demo mission → paid full course"
              : program.access === "paid"
                ? "Paid after registration"
                : program.access}
          </dd>
        </div>
        {program.certCode ? (
          <div>
            <dt>Certificate</dt>
            <dd>{program.certCode}</dd>
          </div>
        ) : null}
        {program.demoHref ? (
          <div className="meta-span-2">
            <dt>Preview</dt>
            <dd>
              {program.demoLabel}: {program.demoHref}
            </dd>
          </div>
        ) : null}
      </dl>

      {(copy.highlights?.length ? copy.highlights : program.highlights)?.length ? (
        <ul className="highlights">
          {(copy.highlights?.length ? copy.highlights : program.highlights)!.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}

      {program.deliveryNote ? <p className="delivery-note">{program.deliveryNote}</p> : null}

      {isQuantum ? (
        <div className="quantum-extra">
          <h4>Quantum Computing Workforce (QCW) — Tier 2 Advanced</h4>
          <p>
            12-module curriculum from qubit fundamentals to industry capstone. Interactive labs in the
            dedicated QCW platform: Bloch sphere, gate playground, optical bench simulator, and
            Qiskit-based projects. Certificate <strong>NOVA-COL-QNT</strong> verifiable at NOVA Certify.
            Pathway to IBM Quantum Developer Certification and Qiskit badges.
          </p>
          <p>
            Platform:{" "}
            <a href="https://quantum-workforce-academy.vercel.app">
              quantum-workforce-academy.vercel.app
            </a>{" "}
            · Course: quantum-computing-workforce-development
          </p>
        </div>
      ) : null}
    </article>
  );
}

export function CatalogPrintDocument() {
  const groups = groupByVertical(NOVA_PROGRAM_CATALOG);
  const generated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="catalog-print-root">
      <header className="catalog-cover">
        <p className="eyebrow">NOVA STEM HUB · Official Program Catalog</p>
        <h1>Complete Catalog — 21 Programs</h1>
        <p className="subtitle">
          NOVA School · NOVA College · NOVA Language · Quantum Workforce (QCW)
        </p>
        <p className="generated">Generated {generated} · stem-innovation-academy.vercel.app/catalog</p>
      </header>

      <section className="catalog-section">
        <h2>Catalog at a glance</h2>
        <div className="stats-row">
          <div>
            <strong>{CATALOG_STATS.totalPrograms}</strong>
            <span>Total programs</span>
          </div>
          <div>
            <strong>{CATALOG_STATS.school}</strong>
            <span>School electives</span>
          </div>
          <div>
            <strong>{CATALOG_STATS.college}</strong>
            <span>College tracks</span>
          </div>
          <div>
            <strong>{CATALOG_STATS.language}</strong>
            <span>Languages</span>
          </div>
        </div>
        <p className="access-model">
          <strong>Access model:</strong> Play to learn — syllabi, outcomes, and pricing are public with no
          login required. NOVA School offers free demo missions on Coding &amp; AI, Robotics, and IoT
          electives. Full course content unlocks when you enroll.
        </p>
      </section>

      <section className="catalog-section">
        <h2>Suggested tuition fees (USD)</h2>
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Suggested price</th>
            </tr>
          </thead>
          <tbody>
            {PRICING_GUIDE.map((row) => (
              <tr key={row.tier}>
                <td>{row.tier}</td>
                <td>{row.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {groups.map((group) => (
        <section key={group.vertical} className="catalog-section catalog-vertical">
          <h2>{group.label}</h2>
          {group.programs.map((program) => (
            <ProgramBlock key={program.slug} program={program} />
          ))}
        </section>
      ))}

      <section className="catalog-section">
        <h2>Bundle packages</h2>
        {NOVA_PROGRAM_BUNDLES.map((bundle) => (
          <article key={bundle.slug} className="bundle-block">
            <header className="catalog-program-header">
              <div>
                <h3>{bundle.title}</h3>
                <p className="tagline">{bundle.description}</p>
              </div>
              <div className="tuition-badge">{bundle.tuitionLabel}</div>
            </header>
            <p>
              <strong>${bundle.tuitionUsd.toLocaleString("en-US")}</strong>
              {bundle.savingsUsd ? ` · save ~$${bundle.savingsUsd} vs individual enrollment` : null}
            </p>
            <p className="bundle-slugs">Includes: {bundle.programSlugs.join(", ")}</p>
          </article>
        ))}
      </section>

      <footer className="catalog-footer">
        <p>
          NOVA STEM HUB · <a href="https://stem-innovation-academy.vercel.app">stem-innovation-academy.vercel.app</a>
        </p>
        <p>
          Live catalog:{" "}
          <a href="https://stem-innovation-academy.vercel.app/catalog">/catalog</a> · Quantum preview:{" "}
          <a href="https://quantum-workforce-academy.vercel.app">quantum-workforce-academy.vercel.app</a>
        </p>
        <p className="fine-print">
          Tuition shown are suggested list prices for institutional and direct enrollment. Scholarships and
          B2B licensing available. Prices subject to change.
        </p>
      </footer>
    </div>
  );
}
