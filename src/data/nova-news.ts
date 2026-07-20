/**
 * NOVA News — curated STEM market & skills feed aligned to NOVA School / College / Language tracks.
 * Editorial briefing style: high information density for discoverability and return visits.
 */

export type NovaNewsCategory =
  | "AI & Coding"
  | "Robotics"
  | "IoT & Hardware"
  | "Quantum"
  | "Careers & Jobs"
  | "Languages & Global"
  | "Digital Skills"
  | "EdTech Market";

export type NovaNewsItem = {
  id: string;
  title: string;
  summary: string;
  category: NovaNewsCategory;
  relatedTrack: string;
  source: string;
  region: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  tags: string[];
  featured?: boolean;
  marketSignal?: string;
};

export const NOVA_NEWS_CATEGORIES: NovaNewsCategory[] = [
  "AI & Coding",
  "Robotics",
  "IoT & Hardware",
  "Quantum",
  "Careers & Jobs",
  "Languages & Global",
  "Digital Skills",
  "EdTech Market",
];

export const NOVA_NEWS_TICKER = [
  "AI skills demand up across LatAm hiring boards",
  "Robotics internships open for high-school builders",
  "IoT edge devices hit new low-cost thresholds",
  "Quantum literacy listed in early workforce roadmaps",
  "English + tech stacks remain top dual-skill combo",
  "Digital marketing roles seek data-fluent creators",
  "EdTech enrollments rise for project-based STEM",
  "Employers prioritize portfolio proof over résumé alone",
] as const;

export const NOVA_MARKET_PULSE: Array<{ label: string; value: string; trend: "up" | "steady" | "watch" }> = [
  { label: "AI / ML roles (global signal)", value: "+18% YoY interest", trend: "up" },
  { label: "Robotics technician pipelines", value: "Hiring active", trend: "up" },
  { label: "IoT / embedded junior posts", value: "Steady demand", trend: "steady" },
  { label: "Quantum awareness courses", value: "Early adoption", trend: "watch" },
  { label: "Bilingual STEM talent", value: "Premium signal", trend: "up" },
  { label: "Creator + analytics hybrids", value: "Hot skill mix", trend: "up" },
];

/** Dense curated briefing pack — refresh periodically; dates relative to Jul 2026 hub launch window. */
export const NOVA_NEWS_ITEMS: NovaNewsItem[] = [
  {
    id: "ai-skills-premium-2026",
    title: "Employers keep paying a premium for practical AI builders—not just prompt users",
    summary:
      "Hiring managers across software and operations say they want candidates who can ship small automations, evaluate model output, and document decisions. Portfolio demos beat buzzword résumés.",
    category: "AI & Coding",
    relatedTrack: "NOVA College · Coding & AI",
    source: "Workforce briefing",
    region: "Global / LatAm",
    publishedAt: "2026-07-20",
    readMinutes: 4,
    tags: ["AI", "hiring", "portfolios"],
    featured: true,
    marketSignal: "Skill premium",
  },
  {
    id: "robotics-classroom-to-shopfloor",
    title: "From classroom robots to shop-floor assistants: youth robotics pathways expand",
    summary:
      "Schools and bootcamps pairing mechanical basics with sensors and control logic are feeding technician and mechatronics feeder roles. Competition kits remain a strong signal of persistence.",
    category: "Robotics",
    relatedTrack: "NOVA School · Robotics",
    source: "Industry education desk",
    region: "Americas",
    publishedAt: "2026-07-19",
    readMinutes: 3,
    tags: ["robotics", "youth", "mechatronics"],
    featured: true,
    marketSignal: "Pathway growth",
  },
  {
    id: "iot-smart-campus-wave",
    title: "Smart-campus IoT projects move from demos to maintenance budgets",
    summary:
      "Universities and training centers that started with temperature and occupancy sensors are budgeting for dashboards, alerts, and student-built monitoring. Edge + cloud literacy is the new baseline.",
    category: "IoT & Hardware",
    relatedTrack: "NOVA School · IoT",
    source: "Campus tech watch",
    region: "Global",
    publishedAt: "2026-07-19",
    readMinutes: 3,
    tags: ["IoT", "sensors", "dashboards"],
    featured: true,
    marketSignal: "Budget shift",
  },
  {
    id: "quantum-literacy-not-phd",
    title: "Quantum literacy enters early career roadmaps—without requiring a PhD",
    summary:
      "Employers adjacent to computing, finance, and research labs increasingly ask for conceptual quantum fluency: qubits, noise, and use-case realism. Short workforce modules are rising fast.",
    category: "Quantum",
    relatedTrack: "NOVA College · Quantum Workforce",
    source: "Emerging tech desk",
    region: "Global",
    publishedAt: "2026-07-18",
    readMinutes: 5,
    tags: ["quantum", "workforce", "literacy"],
    featured: true,
    marketSignal: "Early adoption",
  },
  {
    id: "bilingual-stem-advantage",
    title: "Bilingual STEM talent remains a competitive edge in cross-border teams",
    summary:
      "English + Spanish/Portuguese fluency combined with technical delivery shows up in remote hiring and regional hubs. Language is treated as a career accelerator, not a soft extra.",
    category: "Languages & Global",
    relatedTrack: "NOVA Language",
    source: "Talent mobility brief",
    region: "LatAm / US",
    publishedAt: "2026-07-18",
    readMinutes: 3,
    tags: ["languages", "remote", "STEM"],
    marketSignal: "Talent premium",
  },
  {
    id: "digital-marketing-data-fluent",
    title: "Digital marketing roles want creators who can read the numbers",
    summary:
      "Campaigns still need storytelling—but teams now expect basic analytics, experimentation, and AI-assisted content workflows. Hybrid creator-analyst profiles are winning interviews.",
    category: "Digital Skills",
    relatedTrack: "NOVA College · Digital Marketing",
    source: "Creative economy watch",
    region: "Global",
    publishedAt: "2026-07-17",
    readMinutes: 4,
    tags: ["marketing", "analytics", "AI content"],
    marketSignal: "Hybrid skills",
  },
  {
    id: "edtech-project-based-surge",
    title: "Project-based STEM platforms see stronger completion than lecture-only catalogs",
    summary:
      "Completion and referral metrics favor guided build tracks with mentor checkpoints. Learners share projects publicly—driving organic discovery for schools and hubs.",
    category: "EdTech Market",
    relatedTrack: "NOVA STEM HUB",
    source: "EdTech market brief",
    region: "Global",
    publishedAt: "2026-07-17",
    readMinutes: 4,
    tags: ["edtech", "completion", "projects"],
    marketSignal: "Engagement up",
  },
  {
    id: "internship-signal-portfolios",
    title: "Internships increasingly shortlist by GitHub, robot logs, and sensor dashboards",
    summary:
      "Application essays still matter, but recruiters skim for evidence of shipped work: commits, wiring photos, and clear READMEs. Structured youth electives help students produce that proof.",
    category: "Careers & Jobs",
    relatedTrack: "NOVA School · Mission Paths",
    source: "Internship network desk",
    region: "Americas",
    publishedAt: "2026-07-16",
    readMinutes: 3,
    tags: ["internships", "portfolios", "hiring"],
    marketSignal: "Proof over pitch",
  },
  {
    id: "python-automation-ops",
    title: "Python automation remains the fastest on-ramp into ops and data support roles",
    summary:
      "Small scripts that clean sheets, call APIs, or schedule reports are cited in junior offers. Foundations in Python + problem decomposition stay evergreen across industries.",
    category: "AI & Coding",
    relatedTrack: "NOVA College · Coding & AI",
    source: "Skills ladder brief",
    region: "Global",
    publishedAt: "2026-07-16",
    readMinutes: 3,
    tags: ["Python", "automation", "ops"],
  },
  {
    id: "cobots-sme-adoption",
    title: "Collaborative robots expand in SMEs—creating demand for local technicians",
    summary:
      "As cobot prices soften, small manufacturers need people who can set up cells, teach paths, and troubleshoot sensors. Regional training partners are racing to supply that talent.",
    category: "Robotics",
    relatedTrack: "NOVA School · Robotics",
    source: "Manufacturing tech desk",
    region: "LatAm / Global",
    publishedAt: "2026-07-15",
    readMinutes: 4,
    tags: ["cobots", "SME", "technicians"],
  },
  {
    id: "mqtt-dashboards-standard",
    title: "MQTT + simple dashboards become the default student IoT stack",
    summary:
      "Educators standardize on lightweight messaging and visual boards so projects survive beyond the demo day. Students who can explain data flow stand out in interviews.",
    category: "IoT & Hardware",
    relatedTrack: "NOVA School · IoT",
    source: "Maker education desk",
    region: "Global",
    publishedAt: "2026-07-15",
    readMinutes: 3,
    tags: ["MQTT", "dashboards", "IoT"],
  },
  {
    id: "quantum-error-awareness",
    title: "Error awareness—not circuit depth—defines beginner quantum credibility",
    summary:
      "Briefings stress that newcomers who understand noise and limits communicate better with research teams than those chasing toy algorithms alone.",
    category: "Quantum",
    relatedTrack: "NOVA College · Quantum Workforce",
    source: "Quantum education watch",
    region: "Global",
    publishedAt: "2026-07-14",
    readMinutes: 4,
    tags: ["quantum", "noise", "education"],
  },
  {
    id: "english-for-tech-standups",
    title: "Workplace English for standups and tickets becomes a measurable STEM skill",
    summary:
      "Teams measure clarity in async updates and code reviews. Language tracks tied to tech scenarios outperform generic conversation courses for career outcomes.",
    category: "Languages & Global",
    relatedTrack: "NOVA Language",
    source: "Workplace language desk",
    region: "Global",
    publishedAt: "2026-07-14",
    readMinutes: 3,
    tags: ["English", "standup", "async"],
  },
  {
    id: "short-form-stem-content",
    title: "Short-form STEM explainers drive enrollment discovery—if accuracy holds",
    summary:
      "Creators who pair hooks with correct mental models convert better than hype clips. Schools that coach ethical content craft see stronger organic reach.",
    category: "Digital Skills",
    relatedTrack: "NOVA College · Digital Marketing",
    source: "Attention economy brief",
    region: "Global",
    publishedAt: "2026-07-13",
    readMinutes: 3,
    tags: ["content", "STEM", "discovery"],
  },
  {
    id: "credentials-verify-trend",
    title: "Verifiable credentials gain trust as employers fight résumé fraud",
    summary:
      "Links that confirm completion and skills are climbing in application checklists. Platforms with public verify flows reduce friction for hiring partners.",
    category: "EdTech Market",
    relatedTrack: "NOVA STEM HUB · Verify",
    source: "Credentials market desk",
    region: "Global",
    publishedAt: "2026-07-13",
    readMinutes: 3,
    tags: ["credentials", "verify", "trust"],
  },
  {
    id: "first-job-apprentice-models",
    title: "Apprentice-style first jobs reward consistent weekly shipping habits",
    summary:
      "Programs that require weekly demos and mentor feedback map cleanly onto junior workflows. Consistency beats intensity for long-term employability signals.",
    category: "Careers & Jobs",
    relatedTrack: "NOVA College",
    source: "Career pathways desk",
    region: "Americas",
    publishedAt: "2026-07-12",
    readMinutes: 4,
    tags: ["apprenticeship", "habits", "junior"],
  },
  {
    id: "ai-safety-basics-hiring",
    title: "AI safety basics enter junior interview rubrics at larger firms",
    summary:
      "Candidates are asked how they check for bias, hallucinated facts, and unsafe automation. Lightweight ethics modules are becoming table stakes.",
    category: "AI & Coding",
    relatedTrack: "NOVA College · Coding & AI",
    source: "Hiring practice watch",
    region: "Global",
    publishedAt: "2026-07-12",
    readMinutes: 3,
    tags: ["AI safety", "interviews", "ethics"],
  },
  {
    id: "drone-inspection-skills",
    title: "Inspection drones pull robotics learners toward field technician roles",
    summary:
      "Flight safety, imaging, and reporting skills open outdoor tech careers. Youth who document missions carefully look hire-ready faster.",
    category: "Robotics",
    relatedTrack: "NOVA School · Robotics",
    source: "Field tech desk",
    region: "Americas",
    publishedAt: "2026-07-11",
    readMinutes: 3,
    tags: ["drones", "inspection", "field"],
  },
  {
    id: "energy-iot-monitoring",
    title: "Energy cost pressure accelerates IoT monitoring in schools and SMEs",
    summary:
      "Simple power and HVAC monitoring projects double as climate and cost literacy. Hardware + storytelling combo resonates with institutional buyers.",
    category: "IoT & Hardware",
    relatedTrack: "NOVA School · IoT",
    source: "Energy & ops brief",
    region: "LatAm",
    publishedAt: "2026-07-11",
    readMinutes: 3,
    tags: ["energy", "IoT", "cost"],
  },
  {
    id: "women-in-stem-pipelines",
    title: "Women-in-STEM pipelines strengthen when projects are public and mentored",
    summary:
      "Visibility plus mentorship correlates with persistence through intermediate coding and robotics. Community showcases remain a retention lever.",
    category: "Careers & Jobs",
    relatedTrack: "NOVA STEM HUB",
    source: "Equity in STEM desk",
    region: "Global",
    publishedAt: "2026-07-10",
    readMinutes: 4,
    tags: ["equity", "mentorship", "STEM"],
  },
  {
    id: "portuguese-tech-hubs",
    title: "Portuguese-speaking tech hubs keep expanding remote collaboration lanes",
    summary:
      "Brazil and Portugal talent corridors value bilingual documentation and async English. Language products tied to tech workflows see rising interest.",
    category: "Languages & Global",
    relatedTrack: "NOVA Language",
    source: "Regional talent desk",
    region: "PT / BR",
    publishedAt: "2026-07-10",
    readMinutes: 3,
    tags: ["Portuguese", "remote", "hubs"],
  },
  {
    id: "no-code-plus-code",
    title: "No-code tools raise the floor—but code literacy still decides the ceiling",
    summary:
      "Teams adopt no-code for speed, then hit limits that reward learners who can extend with scripts and APIs. Dual fluency is the durable strategy.",
    category: "Digital Skills",
    relatedTrack: "NOVA College · Coding & AI",
    source: "Product ops brief",
    region: "Global",
    publishedAt: "2026-07-09",
    readMinutes: 3,
    tags: ["no-code", "APIs", "literacy"],
  },
  {
    id: "institutional-licensing-wave",
    title: "Institutions prefer licensed STEM platforms with facilitator guides ready day one",
    summary:
      "Schools and colleges buying curriculum want turnkey labs, certificates, and partner support—not raw content dumps. Partnership models continue to scale.",
    category: "EdTech Market",
    relatedTrack: "NOVA Partnership",
    source: "B2B education desk",
    region: "Global",
    publishedAt: "2026-07-09",
    readMinutes: 4,
    tags: ["B2B", "licensing", "facilitators"],
  },
  {
    id: "cyber-basics-for-builders",
    title: "Cyber hygiene basics become required for student builders shipping public apps",
    summary:
      "Auth, secrets handling, and safe sharing appear in junior checklists. Coding tracks that teach secure defaults reduce real-world incident risk.",
    category: "AI & Coding",
    relatedTrack: "NOVA College · Coding & AI",
    source: "Security education desk",
    region: "Global",
    publishedAt: "2026-07-08",
    readMinutes: 3,
    tags: ["security", "builders", "hygiene"],
  },
];

export function getNovaNewsSorted() {
  return [...NOVA_NEWS_ITEMS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getNovaNewsFeatured() {
  return getNovaNewsSorted().filter((item) => item.featured);
}
