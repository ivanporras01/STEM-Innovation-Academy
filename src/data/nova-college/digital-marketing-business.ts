import type { NovaCollegeCourse, NovaCollegeModule } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { DIGITAL_MARKETING_BUSINESS_LESSONS } from "./lessons/digital-marketing-business-lessons";

const RAW_MODULES: NovaCollegeModule[] = [
  {
    order: 1,
    title: "Digital marketing fundamentals & business careers",
    description:
      "Marketing funnel, customer personas, ethical digital citizenship, and entry-level career paths in marketing, e-commerce, and growth roles.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "digital-marketing-ecosystem-roles",
        "The digital marketing ecosystem and entry-level roles",
        "Social media manager, content strategist, growth associate, e-commerce coordinator — skills and salary paths.",
        4,
      ),
      theoryLesson(
        "customer-personas-journey",
        "Customer personas and the buyer journey",
        "Awareness, consideration, conversion; empathy maps; inclusive messaging for diverse audiences.",
        4,
      ),
      theoryLesson(
        "digital-marketing-career-paths",
        "Digital marketing careers and portfolio strategy",
        "Entry-level roles, networking, LinkedIn presence, and building a professional portfolio.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Persona & journey map for a startup brand",
      description: "Research a fictional or local small business; deliver persona + journey map presentation.",
      hours: 4,
    },
  },
  {
    order: 2,
    title: "Brand strategy & visual storytelling",
    description: "Brand identity, tone of voice, Canva/design basics, and storytelling that connects.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "brand-identity-tone-voice",
        "Brand identity, tone of voice, and value proposition",
        "Logo systems, color psychology, brand guidelines, and consistent messaging.",
        4,
      ),
      theoryLesson(
        "visual-content-canva",
        "Visual content with Canva and design principles",
        "Templates, hierarchy, accessibility, short-form graphics for Instagram, TikTok, and LinkedIn.",
        4,
      ),
      theoryLesson(
        "storytelling-copywriting-basics",
        "Storytelling and copywriting basics",
        "Hooks, CTAs, benefit-driven copy, and inclusive language.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Mini brand kit + 5 social posts",
      description: "Create brand kit and five on-brand posts for a social-impact or wellness startup scenario.",
      hours: 4,
    },
  },
  {
    order: 3,
    title: "Social media strategy & community management",
    description: "Platform strategy, content calendars, engagement, and community safety.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "platform-strategy-instagram-tiktok-linkedin",
        "Platform strategy: Instagram, TikTok, LinkedIn, and X",
        "Audience fit, content formats, posting cadence, and cross-platform repurposing.",
        4,
      ),
      theoryLesson(
        "content-calendar-engagement",
        "Content calendars and community engagement",
        "Editorial planning, UGC, comments/DMs, crisis basics, and moderation guidelines.",
        4,
      ),
      theoryLesson(
        "social-analytics-kpis",
        "Social KPIs and reporting basics",
        "Reach, engagement rate, saves, clicks, and weekly report templates.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: 2-week content calendar + engagement plan",
      description: "Build calendar for a college club or nonprofit; include engagement and moderation rules.",
      hours: 4,
    },
  },
  {
    order: 4,
    title: "Content marketing & SEO foundations",
    description: "Blog strategy, keyword research, on-page SEO, and content that ranks and converts.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "content-marketing-funnel",
        "Content marketing and the marketing funnel",
        "Blog posts, lead magnets, email capture, and nurturing sequences.",
        4,
      ),
      theoryLesson(
        "seo-keyword-research",
        "SEO basics and keyword research",
        "Search intent, Google Search Console intro, meta titles, and ethical SEO.",
        4,
      ),
      theoryLesson(
        "video-short-form-basics",
        "Short-form video and reels strategy",
        "Hooks, captions, accessibility (subtitles), and batch filming workflows.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: SEO-optimized blog post + keyword brief",
      description: "Write 800-word article with keyword research sheet and meta description.",
      hours: 4,
    },
  },
  {
    order: 5,
    title: "Email marketing & marketing automation",
    description: "Mailchimp/HubSpot basics, segmentation, A/B tests, and GDPR/consent.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "email-campaigns-segmentation",
        "Email campaigns and audience segmentation",
        "Welcome series, newsletters, subject lines, and deliverability basics.",
        4,
      ),
      theoryLesson(
        "marketing-automation-crm",
        "Marketing automation and CRM intro",
        "Triggers, tags, simple workflows, and handoff to sales.",
        4,
      ),
      theoryLesson(
        "privacy-consent-gdpr-marketing",
        "Privacy, consent, and ethical marketing",
        "Opt-in, unsubscribe, CAN-SPAM/GDPR awareness, and data minimization.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: 3-email welcome sequence in Mailchimp (sandbox)",
      description: "Design segmented welcome flow with metrics to track.",
      hours: 4,
    },
  },
  {
    order: 6,
    title: "Paid ads & performance marketing intro",
    description: "Meta Ads and Google Ads fundamentals, budgets, and ROAS for small businesses.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "meta-ads-fundamentals",
        "Meta Ads Manager fundamentals",
        "Campaign objectives, audiences, creatives, and pixel/conversion basics.",
        4,
      ),
      theoryLesson(
        "google-ads-search-display",
        "Google Ads search & display intro",
        "Keywords, ad copy, quality score, and landing page alignment.",
        4,
      ),
      theoryLesson(
        "budget-roas-reporting",
        "Budgets, ROAS, and performance reporting",
        "Daily caps, A/B ad creatives, and client-ready performance slides.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Mock ad campaign plan (no live spend required)",
      description: "Full campaign brief: audience, creatives, budget, KPIs, and 2-week optimization plan.",
      hours: 4,
    },
  },
  {
    order: 7,
    title: "E-commerce, analytics & business tools",
    description: "Shopify/store basics, Google Analytics 4, and connecting marketing to revenue.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "ecommerce-shopify-basics",
        "E-commerce fundamentals and Shopify store basics",
        "Product pages, checkout, shipping messaging, and trust signals.",
        4,
      ),
      theoryLesson(
        "google-analytics-4-reports",
        "Google Analytics 4 — reports that matter",
        "Traffic sources, events, conversions, and UTM tagging.",
        4,
      ),
      theoryLesson(
        "excel-sheets-marketing-dashboards",
        "Spreadsheet dashboards for marketers",
        "Campaign trackers, cohort views, and executive summary one-pagers.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: GA4 + UTM campaign tracker",
      description: "Set up GA4 demo property, UTM links, and weekly marketing dashboard in Sheets.",
      hours: 4,
    },
  },
  {
    order: 8,
    title: "Portfolio, freelancing & capstone launch",
    description: "Case studies, freelance proposals, interviews, and capstone campaign kickoff.",
    contactHours: 15,
    lessons: [
      theoryLesson(
        "marketing-portfolio-case-study",
        "Building a marketing portfolio case study",
        "Problem, strategy, channels, results, and visual storytelling.",
        4,
      ),
      theoryLesson(
        "freelance-proposals-pricing",
        "Freelance proposals and pricing for digital marketing",
        "Scopes, retainers, Upwork/Fiverr ethics, and client communication.",
        3,
      ),
      theoryLesson(
        "capstone-campaign-planning",
        "Capstone planning — full-funnel campaign",
        "Choose a wellness, education, or social-impact brand; define SMART goals and channel mix.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Capstone milestone 1 — strategy deck",
      description: "Submit persona, channel strategy, content calendar outline, and KPI framework.",
      hours: 5,
    },
  },
];

export const digitalMarketingBusinessCourse: NovaCollegeCourse = {
  title: "Digital Marketing & Business Growth",
  slug: "digital-marketing-business",
  tagline:
    "Brand, content, social, and ads — build real campaigns and launch a creative business career.",
  description:
    "120-hour employability track for digital marketing, social media, and e-commerce growth — creative and business-focused, with no heavy coding or hardware required. Aligned to Meta Certified Digital Marketing Associate and Google Digital Marketing & E-commerce Certificate domains.",
  targetAudience:
    "Students 16–25+ seeking creative and business-tech careers in marketing, entrepreneurship, and digital brand building — no prior technical experience required.",
  durationHours: 120,
  prerequisites: [
    "Computer literacy and internet access",
    "Interest in communication, design, and business",
    "English technical reading (portfolio artifacts may be bilingual)",
  ],
  learningOutcomes: [
    "Develop brand strategy, personas, and multi-channel content calendars.",
    "Create visual and video content with industry-standard tools (Canva, etc.).",
    "Plan and report on social, email, and paid campaigns with ethical data use.",
    "Apply SEO and content marketing to drive organic growth.",
    "Use GA4 and spreadsheet dashboards to connect marketing to business outcomes.",
    "Build a portfolio case study suitable for entry-level digital marketing roles.",
  ],
  certificationAlignment: {
    primary: [
      "Meta Certified Digital Marketing Associate (conceptual alignment)",
      "Google Digital Marketing & E-commerce Certificate (domain alignment)",
    ],
    secondary: ["HubSpot Inbound Marketing (intro)", "Canva Design Essentials"],
    examPrepHours: 12,
    notes:
      "Free tiers of Canva, Mailchimp sandbox, and GA4 demo sufficient for all labs. Paid ad labs use mock budgets — no live spend required.",
  },
  formatBreakdown: {
    theoryHours: 48,
    labsProjectsHours: 48,
    softSkillsHours: 12,
    examPrepHours: 12,
  },
  modules: attachContentToModules(RAW_MODULES, DIGITAL_MARKETING_BUSINESS_LESSONS),
  capstone: {
    title: "Capstone: Full-funnel campaign for a social-impact or small-business brand",
    description:
      "End-to-end marketing case study — research, brand kit, 4-week content calendar, email sequence, mock paid ads plan, analytics report, and portfolio presentation.",
    deliverables: [
      "Strategy deck with personas & KPIs",
      "Brand kit + 10+ content pieces",
      "Email sequence + social calendar",
      "Mock ads plan + GA4/UTM report",
      "Portfolio case study (PDF or web)",
      "12-minute presentation with Q&A",
    ],
    hours: 8,
  },
  assessmentRubric: {
    components: [
      {
        name: "Module labs & campaign deliverables",
        weight: 40,
        description: "Complete, on-brand, documented marketing artifacts.",
      },
      {
        name: "Capstone campaign case study",
        weight: 30,
        description: "Coherent full-funnel strategy with measurable KPIs.",
      },
      {
        name: "Analytics & reporting quality",
        weight: 15,
        description: "Valid metrics, UTM discipline, and actionable insights.",
      },
      {
        name: "Portfolio & presentation",
        weight: 15,
        description: "Professional storytelling and critique participation.",
      },
    ],
    passingCriteria:
      "Final grade ≥80/100, capstone approved, attendance ≥85%. Verifiable certificate NOVA-COL-DMK issued on completion.",
  },
  facilitatorNotes: [
    "Use fictional brands or local nonprofits for capstone — no real ad spend required in pilot.",
    "Pair with NOVA School Digital Marketing elective for vertical alignment in B2B licenses.",
    "Encourage bilingual portfolio pieces when students work in multiple languages.",
  ],
  employabilitySkills: [
    "Brand & content strategy",
    "Social media management",
    "SEO & content marketing",
    "Email marketing & automation",
    "Paid ads planning (Meta/Google)",
    "GA4 & marketing analytics",
    "Canva & visual storytelling",
    "Portfolio case studies",
  ],
  verifyCertificatePrefix: "NOVA-COL-DMK",
};
