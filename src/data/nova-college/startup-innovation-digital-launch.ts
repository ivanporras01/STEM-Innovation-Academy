import type { NovaCollegeCourse, NovaCollegeModule } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { STARTUP_INNOVATION_LESSONS } from "./lessons/startup-innovation-digital-launch-lessons";

const RAW_MODULES: NovaCollegeModule[] = [
  {
    order: 1,
    title: "Entrepreneurship mindset & opportunity discovery",
    description:
      "Innovation culture, problem-solution fit, customer discovery interviews, and ethical entrepreneurship for youth and young adults.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "startup-ecosystem-roles",
        "The startup ecosystem and entry-level roles",
        "Founder's associate, growth intern, product coordinator, accelerator programs, and intrapreneurship paths.",
        4,
      ),
      theoryLesson(
        "problem-solution-fit",
        "Problems worth solving — empathy interviews & JTBD",
        "Jobs-to-be-done, pain points, inclusive design, and validating demand before building.",
        4,
      ),
      theoryLesson(
        "ethical-entrepreneurship",
        "Ethical entrepreneurship & social impact",
        "Stakeholders, sustainability, diversity in teams, and responsible innovation.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Customer discovery — 5 empathy interviews",
      description:
        "Interview five potential users; synthesize insights into problem statement and opportunity brief.",
      hours: 4,
    },
  },
  {
    order: 2,
    title: "Business model canvas & value proposition",
    description:
      "Lean Canvas, revenue models, unit economics intro, and competitive positioning for digital ventures.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "lean-canvas-business-model",
        "Lean Canvas & business model patterns",
        "SaaS, marketplace, D2C, freemium, and subscription models — when each fits.",
        4,
      ),
      theoryLesson(
        "value-proposition-design",
        "Value proposition design & messaging",
        "Unique value, differentiation, positioning statements, and landing-page copy.",
        4,
      ),
      theoryLesson(
        "competitive-landscape",
        "Competitive landscape & SWOT for startups",
        "Direct/indirect competitors, moats, and honest gap analysis.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Lean Canvas + one-page pitch narrative",
      description: "Complete canvas for a venture idea; write a 200-word elevator pitch.",
      hours: 4,
    },
  },
  {
    order: 3,
    title: "MVP, no-code & digital product basics",
    description:
      "Minimum viable product, prototyping with no-code/low-code tools, user testing, and iteration loops.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "mvp-build-measure-learn",
        "MVP philosophy — build, measure, learn",
        "Scope control, fake-door tests, concierge MVP, and avoiding over-engineering.",
        4,
      ),
      theoryLesson(
        "nocode-prototyping-tools",
        "No-code & low-code prototyping",
        "Landing pages, forms, simple apps (Bubble, Glide, Webflow intro), and Figma wireframes.",
        4,
      ),
      theoryLesson(
        "user-testing-feedback",
        "User testing & feedback loops",
        "Usability sessions, NPS intro, prioritizing backlog from feedback.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Clickable MVP prototype",
      description:
        "Ship a no-code landing page + waitlist or demo flow; run 3 user tests and document iterations.",
      hours: 4,
    },
  },
  {
    order: 4,
    title: "Digital launch & growth for startups",
    description:
      "Go-to-market for early-stage ventures — launch checklist, organic growth, partnerships, and metrics that matter pre-PMF.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "gtm-launch-checklist",
        "Go-to-market & launch checklist",
        "Pre-launch, launch day, post-launch; channel selection for zero-budget startups.",
        4,
      ),
      theoryLesson(
        "organic-growth-community",
        "Organic growth, community & founder-led marketing",
        "Build in public, communities, referrals, and content loops — complements Digital Marketing track.",
        4,
      ),
      theoryLesson(
        "startup-metrics-pmf",
        "Startup metrics & product-market fit signals",
        "Activation, retention, churn, cohort basics, and when to pivot vs persevere.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: 30-day launch plan + KPI dashboard",
      description: "Channel plan, content hooks, and spreadsheet dashboard for 3 core metrics.",
      hours: 4,
    },
  },
  {
    order: 5,
    title: "Financial literacy & startup economics",
    description:
      "P&L basics, cash flow, pricing, break-even, and reading a cap table intro — no CPA required.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "startup-finance-basics",
        "Startup finance for non-accountants",
        "Revenue, COGS, gross margin, burn rate, runway, and basic P&L reading.",
        4,
      ),
      theoryLesson(
        "pricing-unit-economics",
        "Pricing strategy & unit economics",
        "Cost-plus vs value-based pricing, CAC/LTV intro, and pricing experiments.",
        4,
      ),
      theoryLesson(
        "fundraising-landscape",
        "Funding landscape — bootstrapping to angels",
        "Bootstrapping, grants, friends & family, angels, pre-seed — realistic paths for students.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: 12-month financial model (simple)",
      description: "Spreadsheet with revenue assumptions, expenses, runway, and break-even scenario.",
      hours: 4,
    },
  },
  {
    order: 6,
    title: "Pitching, storytelling & investor readiness",
    description:
      "Pitch decks, demo day prep, storytelling frameworks, and Q&A handling for accelerators and competitions.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "pitch-deck-structure",
        "Pitch deck structure that wins attention",
        "Problem, solution, market, traction, team, ask — 10-slide narrative arc.",
        4,
      ),
      theoryLesson(
        "storytelling-demo-day",
        "Storytelling & demo day performance",
        "Hooks, pacing, visuals, rehearsal, and managing nerves.",
        4,
      ),
      theoryLesson(
        "investor-qa-due-diligence",
        "Investor Q&A & due diligence basics",
        "Tough questions, honesty, data room intro, and red flags to avoid.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: 10-slide pitch deck + 3-minute pitch video",
      description: "Record pitch; peer critique using rubric; revise deck v2.",
      hours: 4,
    },
  },
  {
    order: 7,
    title: "Legal, operations & team building",
    description:
      "Entity types intro, IP basics, contracts, cofounder agreements, and hiring first teammates ethically.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "legal-entities-ip-basics",
        "Legal entities & IP basics for founders",
        "LLC vs corp intro, trademarks, NDAs, and when to consult a lawyer.",
        4,
      ),
      theoryLesson(
        "cofounder-team-culture",
        "Cofounders, equity splits & team culture",
        "Roles, vesting intro, conflict resolution, and inclusive hiring.",
        4,
      ),
      theoryLesson(
        "operations-tools-startups",
        "Operations stack for early startups",
        "Notion, Slack, CRM lite, project boards, and vendor selection on a budget.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Founder operating manual (1-pager)",
      description: "Roles, weekly cadence, tool stack, and decision log template for capstone team.",
      hours: 4,
    },
  },
  {
    order: 8,
    title: "Capstone — launch a venture portfolio piece",
    description:
      "Integrate discovery, canvas, MVP, GTM, finance, and pitch into a demo-ready startup portfolio.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "capstone-venture-selection",
        "Capstone venture selection & scope",
        "Choose impact or commercial idea; define MVP scope and success metrics.",
        4,
      ),
      theoryLesson(
        "portfolio-founder-brand",
        "Founder portfolio & personal brand",
        "LinkedIn, AngelList/Wellfound intro, portfolio site, and mentor outreach.",
        4,
      ),
      theoryLesson(
        "demo-day-prep-rubric",
        "Demo day prep & assessment rubric",
        "Rehearsal schedule, backup plans, and judging criteria alignment.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Capstone milestone — integrated venture dossier",
      description:
        "Submit canvas, MVP link, financial snapshot, pitch deck, and 90-second demo video.",
      hours: 4,
    },
  },
];

export const startupInnovationDigitalLaunchCourse: NovaCollegeCourse = {
  title: "Startup Innovation & Digital Launch",
  slug: "startup-innovation-digital-launch",
  tagline:
    "From idea to launch — lean startup, MVP, pitch, and digital go-to-market for the next generation of founders.",
  description:
    "120-hour employability track for entrepreneurship, startup operations, and digital product launch — pairs naturally with Digital Marketing & Business Growth for full-stack founder skills. Aligned to Lean Startup methodology, NSF I-Corps customer discovery domains, and entry-level founder's associate / accelerator program expectations.",
  targetAudience:
    "Students 16–25+ interested in startups, social entrepreneurship, and digital ventures — ideal for community college innovation labs and technical schools with maker or business programs.",
  durationHours: 120,
  prerequisites: [
    "Computer literacy and internet access",
    "Interest in business, innovation, or social impact",
    "No prior coding required (no-code MVP labs included)",
  ],
  learningOutcomes: [
    "Validate problems through structured customer discovery and JTBD framing.",
    "Design business models with Lean Canvas and articulate clear value propositions.",
    "Build and test no-code MVPs with user feedback loops.",
    "Create go-to-market plans and track early-stage startup metrics.",
    "Model basic finances, pricing, and runway for pre-revenue ventures.",
    "Deliver investor-ready pitch decks and demo-day presentations.",
    "Understand legal, IP, and team-building basics for early-stage founders.",
    "Produce a capstone venture dossier suitable for accelerators and employer portfolios.",
  ],
  certificationAlignment: {
    primary: [
      "Lean Startup / Customer Discovery (I-Corps-style alignment)",
      "Founder Institute / accelerator readiness (conceptual)",
    ],
    secondary: [
      "Google Digital Marketing & E-commerce (launch module overlap)",
      "HubSpot Startup Growth playbook (intro)",
    ],
    examPrepHours: 10,
    notes:
      "Free tiers of Webflow, Glide, Notion, and Canva sufficient for labs. Capstone uses fictional or campus/social-impact ventures — no live fundraising required.",
  },
  formatBreakdown: {
    theoryHours: 48,
    labsProjectsHours: 48,
    softSkillsHours: 12,
    examPrepHours: 12,
  },
  modules: attachContentToModules(RAW_MODULES, STARTUP_INNOVATION_LESSONS),
  capstone: {
    title: "Capstone: Launch dossier — from idea to demo day",
    description:
      "End-to-end venture package — discovery evidence, Lean Canvas, live MVP link, 12-month financial snapshot, GTM plan, pitch deck, and live or recorded demo.",
    deliverables: [
      "Customer discovery summary (5+ interviews)",
      "Lean Canvas + competitive analysis",
      "No-code MVP with user-test report",
      "30-day GTM plan + KPI dashboard",
      "Simple financial model & pricing rationale",
      "10-slide pitch deck + demo video",
      "Founder portfolio one-pager",
    ],
    hours: 8,
  },
  assessmentRubric: {
    components: [
      {
        name: "Module labs & discovery artifacts",
        weight: 35,
        description: "Evidence-based validation and documented iterations.",
      },
      {
        name: "Capstone venture dossier",
        weight: 35,
        description: "Coherent venture story from problem to launch plan.",
      },
      {
        name: "Pitch & presentation",
        weight: 20,
        description: "Clear narrative, timing, and Q&A readiness.",
      },
      {
        name: "Team collaboration & ethics",
        weight: 10,
        description: "Inclusive teamwork and responsible entrepreneurship.",
      },
    ],
    passingCriteria:
      "Final grade ≥80/100, capstone approved, attendance ≥85%. Verifiable certificate NOVA-COL-STU issued on completion.",
  },
  facilitatorNotes: [
    "Pair with NOVA School Startup & Business elective for vertical K-12 → college pathways.",
    "Recommend Digital Marketing track as elective for students who want deeper paid/SEO skills.",
    "Use campus innovation challenges or local SBDC mentors for demo day when available.",
  ],
  employabilitySkills: [
    "Customer discovery & validation",
    "Lean Canvas & business modeling",
    "No-code MVP prototyping",
    "Go-to-market planning",
    "Startup financial modeling",
    "Pitch deck & demo day delivery",
    "Founder operations & tooling",
    "Portfolio & personal branding",
  ],
  verifyCertificatePrefix: "NOVA-COL-STU",
};
