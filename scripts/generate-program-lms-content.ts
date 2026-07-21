/**
 * Generates high-quality LMS curriculum TypeScript sources.
 * Run: npx tsx scripts/generate-program-lms-content.ts
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..");

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

type TopicLesson = {
  slug: string;
  title: string;
  description: string;
  domain: string;
  focus: string;
  steps: string[];
  pitfalls: string[];
  artifact: string;
  glossary: [string, string][];
  refs: [string, string][];
};

function buildLessonTs(t: TopicLesson): string {
  const sections = [
    {
      heading: "Professional context",
      body: `${t.description} In ${t.domain}, ${t.focus}. Document decisions so a teammate can continue without a meeting.`,
    },
    {
      heading: "Core concepts",
      body: t.steps.map((s, i) => `${i + 1}. ${s}`).join(" "),
    },
    {
      heading: "Quality controls & pitfalls",
      body: `Watch for: ${t.pitfalls.join("; ")}. Verify with evidence before you close the work.`,
    },
    {
      heading: "Employability practice",
      body: `Produce this artifact: ${t.artifact}. Prepare a 60–90 second STAR story that names the tool, the evidence, and the measurable outcome.`,
    },
    {
      heading: "Mastery checklist",
      body: `Explain “${t.title}” without notes, list two risks if a control is skipped, and name one KPI that proves the work succeeded.`,
    },
  ];

  const glossary = t.glossary
    .map(([term, def]) => `    { term: ${JSON.stringify(term)}, definition: ${JSON.stringify(def)} }`)
    .join(",\n");
  const refs = t.refs
    .map(
      ([title, url]) =>
        `    { title: ${JSON.stringify(title)}, url: ${JSON.stringify(url)}, author: "Industry reference" }`,
    )
    .join(",\n");

  return `  ${JSON.stringify(t.slug)}: buildLesson({
    sections: [
${sections.map((s) => `      { heading: ${JSON.stringify(s.heading)}, body: ${JSON.stringify(s.body)} }`).join(",\n")}
    ],
    summary: ${JSON.stringify(`You can apply “${t.title}” with a clear workflow, evidence trail, and interview-ready story.`)},
    careerInsight: ${JSON.stringify(`Hiring managers care that you can execute “${t.title}” under constraints — time, budget, and incomplete information — then explain the result with metrics.`)},
    glossary: [
${glossary}
    ],
    references: [
${refs}
    ],
  })`;
}

function writeCollegeLessons(file: string, exportName: string, lessons: TopicLesson[]) {
  const body = `import type { LessonContent } from "../types";
import { buildLesson } from "./content-builder";

/** High-quality English theory content for LMS unlock + /es college readers. */
export const ${exportName}: Record<string, LessonContent> = {
${lessons.map(buildLessonTs).join(",\n\n")}
};
`;
  fs.writeFileSync(path.join(root, file), body, "utf8");
  console.log("Wrote", file, lessons.length, "lessons");
}

const dmk: TopicLesson[] = [
  {
    slug: "digital-marketing-ecosystem-roles",
    title: "The digital marketing ecosystem and entry-level roles",
    description: "Map the modern marketing stack from awareness to retention.",
    domain: "digital marketing & growth",
    focus: "entry roles include social coordinator, content associate, and junior growth analyst",
    steps: [
      "List funnel stages and the KPI each stage owns",
      "Match 3 job postings to skills you can practice this month",
      "Build a 6-month learning plan tied to portfolio artifacts",
    ],
    pitfalls: ["collecting tools without a portfolio", "vanity metrics without revenue context", "copying campaigns without audience research"],
    artifact: "Role map + 90-day skill plan in one page",
    glossary: [
      ["Funnel", "Stages from awareness to conversion and retention"],
      ["KPI", "Metric that indicates progress toward a business goal"],
      ["Growth", "Systematic experiments that improve acquisition or retention"],
    ],
    refs: [
      ["Meta Blueprint", "https://www.facebook.com/business/learn"],
      ["Google Digital Garage", "https://grow.google/digitalgarage/"],
    ],
  },
  {
    slug: "customer-personas-journey",
    title: "Customer personas and the buyer journey",
    description: "Turn vague audiences into researched personas and journey maps.",
    domain: "brand strategy",
    focus: "empathy maps and inclusive messaging beat guesswork",
    steps: [
      "Interview or survey at least 5 target users",
      "Draft one primary and one secondary persona",
      "Map awareness → consideration → conversion moments and friction",
    ],
    pitfalls: ["stereotypes instead of evidence", "ignoring accessibility needs", "one-size copy for every channel"],
    artifact: "Persona card + journey map PDF",
    glossary: [
      ["Persona", "Evidence-based profile of a priority customer segment"],
      ["JTBD", "Jobs to be done — the progress a customer seeks"],
      ["Friction", "Steps that slow or stop conversion"],
    ],
    refs: [
      ["NN/g Personas", "https://www.nngroup.com/articles/persona/"],
      ["HubSpot Buyer Journey", "https://blog.hubspot.com/sales/buyer-journey"],
    ],
  },
  {
    slug: "digital-marketing-career-paths",
    title: "Digital marketing careers and portfolio strategy",
    description: "Design a portfolio that proves you can ship campaigns.",
    domain: "career readiness",
    focus: "case studies outperform certificate lists alone",
    steps: [
      "Choose 2–3 case study formats (social, email, SEO, ads mock)",
      "Write problem → strategy → execution → result for each",
      "Publish a simple portfolio site or PDF with clear CTAs",
    ],
    pitfalls: ["pretty mockups with no strategy narrative", "no metrics or learning notes", "outdated screenshots"],
    artifact: "Portfolio outline with 3 case study shells",
    glossary: [
      ["Case study", "Structured story of a marketing problem and outcome"],
      ["CTA", "Call to action — the next step you ask the audience to take"],
      ["Proof", "Evidence: metrics, creatives, or process docs"],
    ],
    refs: [
      ["LinkedIn Learning Marketing", "https://www.linkedin.com/learning/"],
      ["Canva Design School", "https://www.canva.com/designschool/"],
    ],
  },
  {
    slug: "brand-identity-tone-voice",
    title: "Brand identity, tone of voice, and value proposition",
    description: "Define a brand system teams can execute consistently.",
    domain: "branding",
    focus: "voice, visual system, and value prop must agree",
    steps: [
      "Write positioning: for whom, what, why better",
      "Draft tone attributes with do/don't examples",
      "Create a one-page brand kit (logo rules, colors, type, voice)",
    ],
    pitfalls: ["inconsistent voice across channels", "inaccessible color contrast", "vague value props"],
    artifact: "Mini brand kit (1–2 pages)",
    glossary: [
      ["Value proposition", "Clear promise of benefit to a specific audience"],
      ["Tone of voice", "How the brand sounds in writing and speech"],
      ["Brand kit", "Reusable visual and verbal guidelines"],
    ],
    refs: [
      ["WCAG Contrast", "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"],
      ["Canva Brand Kit", "https://www.canva.com/"],
    ],
  },
  {
    slug: "visual-content-canva",
    title: "Visual content with Canva and design principles",
    description: "Ship on-brand graphics using hierarchy, contrast, and accessibility.",
    domain: "visual design",
    focus: "templates accelerate quality when you still apply principles",
    steps: [
      "Apply hierarchy: one focal point, supporting text, clear CTA",
      "Check contrast and alt-text plan for social posts",
      "Export platform-correct sizes and a reusable template",
    ],
    pitfalls: ["crowded layouts", "illegible text on busy photos", "missing safe margins"],
    artifact: "5 on-brand social graphics + template file",
    glossary: [
      ["Hierarchy", "Visual order that guides the eye"],
      ["Contrast", "Difference that makes text and UI readable"],
      ["Safe margin", "Padding that prevents edge clipping"],
    ],
    refs: [
      ["Canva Design School", "https://www.canva.com/designschool/"],
      ["Material Design Basics", "https://m3.material.io/"],
    ],
  },
  {
    slug: "storytelling-copywriting-basics",
    title: "Storytelling and copywriting basics",
    description: "Write hooks, benefits, and CTAs that respect the reader.",
    domain: "copywriting",
    focus: "clarity and honesty beat hype",
    steps: [
      "Rewrite features as audience benefits",
      "Draft 5 hooks and A/B two of them",
      "End with a single, specific CTA",
    ],
    pitfalls: ["fear tactics", "jargon walls", "multiple competing CTAs"],
    artifact: "Copy sheet: hook variants + final post/email",
    glossary: [
      ["Hook", "Opening line that earns attention"],
      ["Benefit", "Outcome the audience cares about"],
      ["CTA", "Clear next action"],
    ],
    refs: [
      ["Nielsen Norman Group Writing", "https://www.nngroup.com/articles/"],
      ["Mailchimp Style", "https://styleguide.mailchimp.com/"],
    ],
  },
  {
    slug: "platform-strategy-instagram-tiktok-linkedin",
    title: "Platform strategy: Instagram, TikTok, LinkedIn, and X",
    description: "Match format and cadence to audience and goal.",
    domain: "social strategy",
    focus: "repurpose smartly — do not clone blindly",
    steps: [
      "Pick primary platform based on persona research",
      "Define content pillars (3–5 themes)",
      "Plan cadence and repurposing rules",
    ],
    pitfalls: ["posting everywhere with no strategy", "ignoring comments/DMs", "unsafe UGC"],
    artifact: "Platform strategy one-pager",
    glossary: [
      ["Content pillar", "Recurring theme that anchors a calendar"],
      ["Cadence", "Publishing rhythm"],
      ["UGC", "User-generated content"],
    ],
    refs: [
      ["Meta Business Help", "https://www.facebook.com/business/help"],
      ["LinkedIn Marketing Solutions", "https://business.linkedin.com/marketing-solutions"],
    ],
  },
  {
    slug: "content-calendar-engagement",
    title: "Content calendars and community engagement",
    description: "Plan editorial work and safe community management.",
    domain: "community",
    focus: "moderation rules protect brand and audience",
    steps: [
      "Build a 2-week calendar with owners and statuses",
      "Write engagement macros for FAQs",
      "Document escalation for harassment or crisis",
    ],
    pitfalls: ["no owner for posts", "deleting criticism without process", "late replies on time-sensitive topics"],
    artifact: "Calendar + moderation guideline sheet",
    glossary: [
      ["Editorial calendar", "Schedule of planned content"],
      ["Moderation", "Rules for keeping community safe"],
      ["Escalation", "When and how to involve a lead"],
    ],
    refs: [
      ["Hootsuite Blog Calendars", "https://blog.hootsuite.com/"],
      ["Community Guidelines examples", "https://transparency.fb.com/"],
    ],
  },
  {
    slug: "social-analytics-kpis",
    title: "Social KPIs and reporting basics",
    description: "Report what matters — not vanity metrics alone.",
    domain: "analytics",
    focus: "tie metrics to goals and next experiments",
    steps: [
      "Select 3 primary KPIs for a campaign goal",
      "Build a weekly report template (reach, engagement, clicks, saves)",
      "Recommend one change based on the data",
    ],
    pitfalls: ["screenshot dumps without insight", "comparing unlike time windows", "ignoring CTR/landing quality"],
    artifact: "Weekly social report template filled with sample data",
    glossary: [
      ["Engagement rate", "Interactions relative to reach or followers"],
      ["CTR", "Click-through rate"],
      ["Insight", "Actionable interpretation of data"],
    ],
    refs: [
      ["Meta Insights", "https://www.facebook.com/business/insights"],
      ["Sprout Social Metrics", "https://sproutsocial.com/insights/"],
    ],
  },
  {
    slug: "content-marketing-funnel",
    title: "Content marketing and the marketing funnel",
    description: "Create content that educates and nurtures.",
    domain: "content marketing",
    focus: "lead magnets only work with ethical capture and follow-up",
    steps: [
      "Map one asset per funnel stage",
      "Draft a lead magnet outline and nurture email idea",
      "Define success metric for the asset",
    ],
    pitfalls: ["content without distribution", "gated junk content", "no nurture plan"],
    artifact: "Funnel content map + lead magnet outline",
    glossary: [
      ["Lead magnet", "Useful asset offered in exchange for contact permission"],
      ["Nurture", "Follow-up sequence that builds trust"],
      ["TOFU/MOFU/BOFU", "Top/middle/bottom of funnel content"],
    ],
    refs: [
      ["Content Marketing Institute", "https://contentmarketinginstitute.com/"],
      ["HubSpot Content", "https://blog.hubspot.com/marketing"],
    ],
  },
  {
    slug: "seo-keyword-research",
    title: "SEO basics and keyword research",
    description: "Align pages to search intent ethically.",
    domain: "SEO",
    focus: "intent and usefulness beat keyword stuffing",
    steps: [
      "List seed topics from persona pains",
      "Classify intent (informational, commercial, transactional)",
      "Draft title, H1, meta description, and outline",
    ],
    pitfalls: ["keyword stuffing", "thin duplicate pages", "ignored mobile readability"],
    artifact: "Keyword brief + on-page outline",
    glossary: [
      ["Search intent", "What the searcher wants to accomplish"],
      ["On-page SEO", "Content and HTML signals on the page"],
      ["SERP", "Search engine results page"],
    ],
    refs: [
      ["Google Search Central", "https://developers.google.com/search"],
      ["Moz Beginner's Guide", "https://moz.com/beginners-guide-to-seo"],
    ],
  },
  {
    slug: "video-short-form-basics",
    title: "Short-form video and reels strategy",
    description: "Plan hooks, captions, and accessible short video.",
    domain: "video",
    focus: "subtitles and clear audio are non-negotiable",
    steps: [
      "Storyboard a 15–30s reel: hook, value, CTA",
      "Batch film 3 variants",
      "Add captions and check safe zones",
    ],
    pitfalls: ["no captions", "slow intros", "unclear CTA"],
    artifact: "Reel storyboard + captioned draft",
    glossary: [
      ["Hook", "First 1–3 seconds that earn watch time"],
      ["Safe zone", "Area not covered by UI overlays"],
      ["Batching", "Filming multiple assets in one session"],
    ],
    refs: [
      ["YouTube Creator Tips", "https://www.youtube.com/creators/"],
      ["TikTok Creative Center", "https://ads.tiktok.com/business/creativecenter"],
    ],
  },
  {
    slug: "email-campaigns-segmentation",
    title: "Email campaigns and audience segmentation",
    description: "Write welcome flows and segmented newsletters.",
    domain: "email marketing",
    focus: "relevance and consent drive deliverability",
    steps: [
      "Draft a 3-email welcome sequence",
      "Define 2 segments and message differences",
      "Write subject lines that set honest expectations",
    ],
    pitfalls: ["buying lists", "no unsubscribe clarity", "walls of text"],
    artifact: "Welcome sequence copy doc",
    glossary: [
      ["Segmentation", "Grouping contacts by behavior or attributes"],
      ["Deliverability", "Likelihood emails reach the inbox"],
      ["Open rate", "Percent of delivered emails opened"],
    ],
    refs: [
      ["Mailchimp Guides", "https://mailchimp.com/resources/"],
      ["CAN-SPAM Overview", "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business"],
    ],
  },
  {
    slug: "marketing-automation-crm",
    title: "Marketing automation and CRM intro",
    description: "Use tags, triggers, and simple workflows.",
    domain: "automation",
    focus: "automate follow-ups without losing the human handoff",
    steps: [
      "Map a trigger → action → exit condition",
      "Define tags that sales and marketing share",
      "Document when a human must intervene",
    ],
    pitfalls: ["over-automation spam", "messy tag systems", "no sales handoff"],
    artifact: "Workflow diagram + tag dictionary",
    glossary: [
      ["Trigger", "Event that starts an automation"],
      ["CRM", "System of record for contacts and deals"],
      ["Handoff", "Passing a lead to sales with context"],
    ],
    refs: [
      ["HubSpot Academy", "https://academy.hubspot.com/"],
      ["Salesforce Trailhead", "https://trailhead.salesforce.com/"],
    ],
  },
  {
    slug: "privacy-consent-gdpr-marketing",
    title: "Privacy, consent, and ethical marketing",
    description: "Practice consent-first marketing and data minimization.",
    domain: "compliance & ethics",
    focus: "trust is a growth asset",
    steps: [
      "Audit a signup form for clear consent language",
      "List data you collect and why each field is needed",
      "Write an unsubscribe / data request response template",
    ],
    pitfalls: ["pre-checked consent", "dark patterns", "retaining unused data"],
    artifact: "Consent checklist + privacy note for a campaign",
    glossary: [
      ["Consent", "Freely given, informed permission"],
      ["Data minimization", "Collect only what you need"],
      ["GDPR", "EU regulation on personal data protection"],
    ],
    refs: [
      ["ICO GDPR Guidance", "https://ico.org.uk/for-organisations/"],
      ["FTC Advertising Guidance", "https://www.ftc.gov/business-guidance"],
    ],
  },
  {
    slug: "meta-ads-fundamentals",
    title: "Meta Ads Manager fundamentals",
    description: "Plan campaigns without requiring live spend.",
    domain: "paid social",
    focus: "objectives, audiences, and creative must align",
    steps: [
      "Choose campaign objective for a mock brand",
      "Define audience, placements, and creative angles",
      "Write a test plan (what you will learn first)",
    ],
    pitfalls: ["broad objectives with no KPI", "weak creative", "no learning agenda"],
    artifact: "Mock Meta campaign brief",
    glossary: [
      ["Objective", "What Meta optimizes delivery toward"],
      ["Audience", "Who is eligible to see the ad"],
      ["Pixel", "Tracking snippet for site events"],
    ],
    refs: [
      ["Meta Ads Guide", "https://www.facebook.com/business/ads"],
      ["Meta Blueprint", "https://www.facebook.com/business/learn"],
    ],
  },
  {
    slug: "google-ads-search-display",
    title: "Google Ads search & display intro",
    description: "Align keywords, ads, and landing pages.",
    domain: "paid search",
    focus: "Quality Score rewards relevance",
    steps: [
      "Build a keyword theme with match-type notes",
      "Write 2 RSA-style headlines and descriptions",
      "Check landing page message match",
    ],
    pitfalls: ["buying competitor trademarks carelessly", "mismatched landing pages", "no negatives"],
    artifact: "Search campaign outline + ad copy",
    glossary: [
      ["Quality Score", "Relevance signal affecting cost and rank"],
      ["RSA", "Responsive search ad"],
      ["Negative keyword", "Query you exclude from matching"],
    ],
    refs: [
      ["Google Ads Help", "https://support.google.com/google-ads"],
      ["Google Skillshop", "https://skillshop.withgoogle.com/"],
    ],
  },
  {
    slug: "budget-roas-reporting",
    title: "Budgets, ROAS, and performance reporting",
    description: "Connect spend to outcomes with honest reporting.",
    domain: "performance",
    focus: "ROAS without context can mislead",
    steps: [
      "Set daily/weekly caps for a mock budget",
      "Define ROAS target and learning period",
      "Build a client slide: spend, results, next tests",
    ],
    pitfalls: ["optimizing too early", "hiding fees", "no experiment backlog"],
    artifact: "Performance report slide + optimization plan",
    glossary: [
      ["ROAS", "Return on ad spend"],
      ["Learning period", "Time needed before judging an experiment"],
      ["Cap", "Budget limit that protects spend"],
    ],
    refs: [
      ["Google Ads Reporting", "https://support.google.com/google-ads/answer/2404038"],
      ["Meta Reporting", "https://www.facebook.com/business/help"],
    ],
  },
  {
    slug: "ecommerce-shopify-basics",
    title: "E-commerce fundamentals and Shopify store basics",
    description: "Design product pages and trust signals that convert.",
    domain: "e-commerce",
    focus: "clarity in shipping, returns, and proof builds trust",
    steps: [
      "Outline a PDP: title, benefits, proof, FAQ, CTA",
      "List trust signals (reviews, policies, contact)",
      "Plan cart abandonment message ethically",
    ],
    pitfalls: ["hidden fees", "weak product photos", "confusing returns"],
    artifact: "Product page wireframe + trust checklist",
    glossary: [
      ["PDP", "Product detail page"],
      ["Trust signal", "Evidence that reduces purchase anxiety"],
      ["AOV", "Average order value"],
    ],
    refs: [
      ["Shopify Learn", "https://www.shopify.com/learn"],
      ["Baymard Institute", "https://baymard.com/"],
    ],
  },
  {
    slug: "google-analytics-4-reports",
    title: "Google Analytics 4 — reports that matter",
    description: "Read traffic, events, and conversions with UTMs.",
    domain: "web analytics",
    focus: "UTM discipline makes channel reporting trustworthy",
    steps: [
      "Define key events for a demo property",
      "Create UTM conventions for campaign links",
      "Build a weekly acquisition + conversion snapshot",
    ],
    pitfalls: ["messy UTM names", "vanity pageviews only", "no conversion definition"],
    artifact: "UTM dictionary + GA4 weekly snapshot template",
    glossary: [
      ["Event", "User interaction tracked in analytics"],
      ["UTM", "URL parameters that label traffic sources"],
      ["Conversion", "Valued event tied to a business goal"],
    ],
    refs: [
      ["GA4 Docs", "https://support.google.com/analytics"],
      ["Google Analytics Academy", "https://analytics.google.com/analytics/academy/"],
    ],
  },
  {
    slug: "excel-sheets-marketing-dashboards",
    title: "Spreadsheet dashboards for marketers",
    description: "Build campaign trackers executives can scan in 60 seconds.",
    domain: "reporting ops",
    focus: "one-pagers beat 20-tab chaos",
    steps: [
      "Create a campaign tracker with status and owner",
      "Add KPI summary and sparkline-ready columns",
      "Write an executive summary blurb from the numbers",
    ],
    pitfalls: ["manual copy errors", "no data dictionary", "hiding assumptions"],
    artifact: "Marketing dashboard sheet + data dictionary",
    glossary: [
      ["Dashboard", "At-a-glance view of key metrics"],
      ["Data dictionary", "Definitions for each field"],
      ["Owner", "Person accountable for a row or KPI"],
    ],
    refs: [
      ["Google Sheets Help", "https://support.google.com/docs/topic/9054603"],
      ["Microsoft Excel Training", "https://support.microsoft.com/excel"],
    ],
  },
  {
    slug: "marketing-portfolio-case-study",
    title: "Building a marketing portfolio case study",
    description: "Tell a coherent problem-to-result story.",
    domain: "portfolio",
    focus: "visuals support the narrative — they do not replace it",
    steps: [
      "Outline problem, audience, strategy, channels, results, learnings",
      "Select 3–5 visuals with captions",
      "Add a reflection: what you would change next",
    ],
    pitfalls: ["pretty slides with no logic", "inflated metrics", "no role clarity"],
    artifact: "Case study draft (PDF outline)",
    glossary: [
      ["Narrative arc", "Beginning, conflict, resolution structure"],
      ["Learning", "Insight that improves the next campaign"],
      ["Role clarity", "What you personally owned"],
    ],
    refs: [
      ["Behance Case Studies", "https://www.behance.net/"],
      ["CXL Portfolio Advice", "https://cxl.com/blog/"],
    ],
  },
  {
    slug: "freelance-proposals-pricing",
    title: "Freelance proposals and pricing for digital marketing",
    description: "Scope retainers ethically and communicate clearly.",
    domain: "freelance business",
    focus: "clear scope prevents conflict",
    steps: [
      "Write a proposal: goals, deliverables, timeline, price, exclusions",
      "Choose project vs retainer and explain why",
      "Draft a kickoff checklist and revision policy",
    ],
    pitfalls: ["unlimited revisions", "underpricing without costs", "vague deliverables"],
    artifact: "Sample proposal + pricing sheet",
    glossary: [
      ["Scope", "What is included and excluded"],
      ["Retainer", "Ongoing monthly engagement"],
      ["Revision policy", "How many change rounds are included"],
    ],
    refs: [
      ["Freelancers Union Resources", "https://www.freelancersunion.org/"],
      ["SBA Starting a Business", "https://www.sba.gov/business-guide"],
    ],
  },
  {
    slug: "capstone-campaign-planning",
    title: "Capstone planning — full-funnel campaign",
    description: "Plan a SMART, multi-channel campaign for a real or mock brand.",
    domain: "capstone",
    focus: "coherence across brand, content, email, and measurement",
    steps: [
      "Set SMART goals and constraints",
      "Choose channel mix and calendar outline",
      "Define KPI framework and reporting cadence",
    ],
    pitfalls: ["too many channels", "goals without measurement", "no risk plan"],
    artifact: "Capstone strategy deck outline",
    glossary: [
      ["SMART", "Specific, Measurable, Achievable, Relevant, Time-bound"],
      ["Channel mix", "Combination of paid/owned/earned channels"],
      ["Risk plan", "What you will do if a tactic underperforms"],
    ],
    refs: [
      ["Google Digital Marketing Certificate", "https://grow.google/certificates/digital-marketing-ecommerce/"],
      ["Meta Certification", "https://www.facebook.com/business/learn/certification"],
    ],
  },
];

const startup: TopicLesson[] = [
  {
    slug: "startup-ecosystem-roles",
    title: "The startup ecosystem and entry-level roles",
    description: "Navigate founders, operators, accelerators, and early-career paths.",
    domain: "entrepreneurship",
    focus: "roles range from founder associate to growth intern and product coordinator",
    steps: [
      "Map local/global ecosystem players (accelerators, VCs, communities)",
      "Compare founder vs operator career paths",
      "Identify 3 skills you can demonstrate without funding",
    ],
    pitfalls: ["glorifying hustle without learning", "ignoring compliance basics", "networking without a clear ask"],
    artifact: "Ecosystem map + role target sheet",
    glossary: [
      ["Accelerator", "Program that mentors and often funds early startups"],
      ["Intrapreneurship", "Innovation inside an existing company"],
      ["Operator", "Person who executes product, growth, or ops"],
    ],
    refs: [
      ["Y Combinator Library", "https://www.ycombinator.com/library"],
      ["Startup School", "https://www.startupschool.org/"],
    ],
  },
  {
    slug: "problem-solution-fit",
    title: "Problems worth solving — empathy interviews & JTBD",
    description: "Validate demand before you build.",
    domain: "customer discovery",
    focus: "interviews beat assumptions",
    steps: [
      "Write interview script focused on past behavior",
      "Complete 5 empathy interviews",
      "Synthesize a problem statement and JTBD",
    ],
    pitfalls: ["leading questions", "interviewing only friends", "pitching instead of listening"],
    artifact: "Interview notes + problem brief",
    glossary: [
      ["JTBD", "Jobs to be done framework"],
      ["Problem-solution fit", "Evidence the problem is real and your approach helps"],
      ["Synthesis", "Turning raw notes into patterns"],
    ],
    refs: [
      ["The Mom Test (summary resources)", "https://www.momtestbook.com/"],
      ["IDEO Design Kit", "https://www.designkit.org/"],
    ],
  },
  {
    slug: "ethical-entrepreneurship",
    title: "Ethical entrepreneurship & social impact",
    description: "Build with stakeholders, inclusion, and sustainability in mind.",
    domain: "responsible innovation",
    focus: "ethics is a design constraint, not a poster",
    steps: [
      "List stakeholders affected by your idea",
      "Identify one inclusion risk and one mitigation",
      "Write an ethical commitment for your venture",
    ],
    pitfalls: ["impact washing", "excluding users from research", "ignoring data ethics"],
    artifact: "Stakeholder map + ethics commitment",
    glossary: [
      ["Stakeholder", "Anyone affected by the venture"],
      ["Inclusion", "Designing so more people can participate safely"],
      ["Impact washing", "Claiming social good without evidence"],
    ],
    refs: [
      ["UN SDGs", "https://sdgs.un.org/goals"],
      ["OECD Responsible Business", "https://www.oecd.org/"],
    ],
  },
  {
    slug: "lean-canvas-business-model",
    title: "Lean Canvas & business model patterns",
    description: "Choose a model that fits the problem and customer.",
    domain: "business modeling",
    focus: "SaaS, marketplace, D2C, and freemium each have tradeoffs",
    steps: [
      "Fill Lean Canvas for your idea",
      "Compare two model patterns and pick one with rationale",
      "List assumptions that must be tested next",
    ],
    pitfalls: ["copying a famous model blindly", "unrealistic channels", "ignoring costs"],
    artifact: "Completed Lean Canvas",
    glossary: [
      ["Lean Canvas", "One-page business model for startups"],
      ["SaaS", "Software as a service subscription model"],
      ["Marketplace", "Platform connecting buyers and sellers"],
    ],
    refs: [
      ["Lean Canvas", "https://leanstack.com/lean-canvas"],
      ["Business Model Patterns", "https://www.strategyzer.com/"],
    ],
  },
  {
    slug: "value-proposition-design",
    title: "Value proposition design & messaging",
    description: "Write positioning and landing-page copy that differentiates.",
    domain: "positioning",
    focus: "unique value must be testable",
    steps: [
      "Draft value prop: customer, job, benefit, differentiator",
      "Write landing hero + subhead + CTA",
      "Test with 3 users for clarity",
    ],
    pitfalls: ["buzzword soup", "feature lists without benefits", "unclear who it is for"],
    artifact: "Value prop + landing copy draft",
    glossary: [
      ["Positioning", "How you want to be perceived vs alternatives"],
      ["Differentiator", "Why a customer would choose you"],
      ["Landing page", "Focused page designed for a conversion"],
    ],
    refs: [
      ["Value Proposition Canvas", "https://www.strategyzer.com/library/the-value-proposition-canvas"],
      ["Unbounce Landing Pages", "https://unbounce.com/landing-page-articles/"],
    ],
  },
  {
    slug: "competitive-landscape",
    title: "Competitive landscape & SWOT for startups",
    description: "Analyze competitors honestly and find gaps.",
    domain: "strategy",
    focus: "moats are rare early — learning speed matters more",
    steps: [
      "List direct and indirect competitors",
      "Complete SWOT with evidence notes",
      "Name one gap you can own in 90 days",
    ],
    pitfalls: ["claiming no competitors", "feature comparison only", "ignoring substitutes"],
    artifact: "Competitive matrix + SWOT",
    glossary: [
      ["SWOT", "Strengths, Weaknesses, Opportunities, Threats"],
      ["Moat", "Sustainable advantage that is hard to copy"],
      ["Substitute", "Alternative way customers solve the job"],
    ],
    refs: [
      ["Porter's Five Forces overview", "https://hbr.org/"],
      ["CB Insights research", "https://www.cbinsights.com/"],
    ],
  },
  {
    slug: "mvp-build-measure-learn",
    title: "MVP philosophy — build, measure, learn",
    description: "Scope an MVP that teaches, not just ships.",
    domain: "product",
    focus: "fake-door and concierge MVPs reduce waste",
    steps: [
      "Define the riskiest assumption",
      "Design the smallest test that can falsify it",
      "Set success/fail thresholds before building",
    ],
    pitfalls: ["overbuilding v1", "no measurement plan", "moving goalposts"],
    artifact: "MVP experiment brief",
    glossary: [
      ["MVP", "Minimum viable product"],
      ["Concierge MVP", "Manually delivering the service behind a simple front"],
      ["Fake-door test", "Measuring interest before building the feature"],
    ],
    refs: [
      ["Lean Startup principles", "http://theleanstartup.com/principles"],
      ["Y Combinator MVP advice", "https://www.ycombinator.com/library"],
    ],
  },
  {
    slug: "nocode-prototyping-tools",
    title: "No-code & low-code prototyping",
    description: "Ship clickable prototypes with modern no-code tools.",
    domain: "prototyping",
    focus: "speed to learning beats perfect code early",
    steps: [
      "Wireframe key screens in Figma or paper",
      "Build a landing + waitlist or simple app flow",
      "Document what is real vs mocked",
    ],
    pitfalls: ["tool hopping", "prototype that cannot be tested", "no analytics on the page"],
    artifact: "Clickable prototype + test notes",
    glossary: [
      ["No-code", "Building software with visual tools"],
      ["Wireframe", "Low-fidelity layout of screens"],
      ["Waitlist", "Signup used to measure demand"],
    ],
    refs: [
      ["Figma Learn", "https://help.figma.com/"],
      ["Webflow University", "https://university.webflow.com/"],
    ],
  },
  {
    slug: "user-testing-feedback",
    title: "User testing & feedback loops",
    description: "Run usability sessions and prioritize backlog honestly.",
    domain: "research",
    focus: "observe behavior; do not defend the design",
    steps: [
      "Write 3 tasks for a usability session",
      "Run 3 tests and note friction",
      "Prioritize backlog: severity × frequency",
    ],
    pitfalls: ["helping users mid-task", "tiny sample with huge claims", "ignoring accessibility issues"],
    artifact: "Usability notes + prioritized backlog",
    glossary: [
      ["Usability", "How easily users complete tasks"],
      ["NPS", "Net Promoter Score — loyalty signal"],
      ["Backlog", "Ordered list of work to do"],
    ],
    refs: [
      ["NN/g Usability Testing", "https://www.nngroup.com/articles/usability-testing-101/"],
      ["Gov.uk Service Manual", "https://www.gov.uk/service-manual"],
    ],
  },
  {
    slug: "gtm-launch-checklist",
    title: "Go-to-market & launch checklist",
    description: "Plan pre-launch, launch day, and post-launch learning.",
    domain: "go-to-market",
    focus: "zero-budget channels still need a checklist",
    steps: [
      "Build pre/during/post launch checklist",
      "Select 2 primary channels for week one",
      "Define launch success metrics",
    ],
    pitfalls: ["big bang with no waitlist", "no support plan", "ignoring feedback day 1"],
    artifact: "30-day launch checklist",
    glossary: [
      ["GTM", "Go-to-market plan"],
      ["Launch", "First coordinated public release"],
      ["Channel", "Path to reach customers"],
    ],
    refs: [
      ["Product Hunt Ship", "https://www.producthunt.com/"],
      ["Indie Hackers", "https://www.indiehackers.com/"],
    ],
  },
  {
    slug: "organic-growth-community",
    title: "Organic growth, community & founder-led marketing",
    description: "Grow with content, community, and referrals.",
    domain: "growth",
    focus: "build in public with integrity",
    steps: [
      "Pick a content loop tied to your product learning",
      "Join or start a community where customers already gather",
      "Design a simple referral ask",
    ],
    pitfalls: ["spammy outreach", "inconsistent posting", "community without value"],
    artifact: "Organic growth plan (2 weeks)",
    glossary: [
      ["Organic growth", "Growth without paid media as primary engine"],
      ["Referral", "Customer-driven acquisition"],
      ["Build in public", "Sharing progress transparently"],
    ],
    refs: [
      ["Lenny's Newsletter archives", "https://www.lennysnewsletter.com/"],
      ["Reforge concepts overview", "https://www.reforge.com/"],
    ],
  },
  {
    slug: "startup-metrics-pmf",
    title: "Startup metrics & product-market fit signals",
    description: "Track activation, retention, and pivot signals.",
    domain: "metrics",
    focus: "retention is the truth serum",
    steps: [
      "Define activation event",
      "Sketch a simple cohort retention table",
      "List pivot vs persevere criteria",
    ],
    pitfalls: ["vanity downloads", "no retention tracking", "pivoting weekly"],
    artifact: "Metrics dashboard stub + PMF checklist",
    glossary: [
      ["Activation", "Moment a user first gets core value"],
      ["Retention", "Users returning over time"],
      ["PMF", "Product-market fit"],
    ],
    refs: [
      ["Sean Ellis PMF survey", "https://www.reforge.com/blog/product-market-fit"],
      ["Amplitude Playbooks", "https://amplitude.com/"],
    ],
  },
  {
    slug: "startup-finance-basics",
    title: "Startup finance for non-accountants",
    description: "Read burn, runway, and a basic P&L.",
    domain: "finance literacy",
    focus: "cash discipline keeps learning loops alive",
    steps: [
      "List monthly burn categories",
      "Estimate runway under two scenarios",
      "Draft a simple P&L for 3 months",
    ],
    pitfalls: ["ignoring taxes/fees", "optimism-only forecasts", "no cash buffer"],
    artifact: "Burn/runway sheet",
    glossary: [
      ["Burn rate", "Monthly net cash spent"],
      ["Runway", "Months until cash runs out"],
      ["P&L", "Profit and loss statement"],
    ],
    refs: [
      ["SBA Finance Guide", "https://www.sba.gov/business-guide/manage-your-business/manage-your-finances"],
      ["SCORE Templates", "https://www.score.org/"],
    ],
  },
  {
    slug: "pricing-unit-economics",
    title: "Pricing strategy & unit economics",
    description: "Test pricing and understand CAC/LTV at a beginner level.",
    domain: "pricing",
    focus: "experiments beat gut feelings",
    steps: [
      "Compare cost-plus vs value-based pricing for your offer",
      "Estimate rough CAC and LTV with explicit assumptions",
      "Design one pricing experiment",
    ],
    pitfalls: ["racing to the bottom", "hidden costs", "LTV fantasies"],
    artifact: "Pricing experiment brief",
    glossary: [
      ["CAC", "Customer acquisition cost"],
      ["LTV", "Lifetime value"],
      ["Unit economics", "Profitability per customer unit"],
    ],
    refs: [
      ["Pricing strategy overview", "https://hbr.org/topic/subject/pricing"],
      ["Stripe Atlas guides", "https://stripe.com/atlas/guides"],
    ],
  },
  {
    slug: "fundraising-landscape",
    title: "Funding landscape — bootstrapping to angels",
    description: "Know realistic student-founder funding paths.",
    domain: "fundraising",
    focus: "most early ventures should optimize learning over raising",
    steps: [
      "Compare bootstrap, grants, F&F, angels, pre-seed",
      "List what investors expect at each stage",
      "Decide a primary path for the next 6 months",
    ],
    pitfalls: ["raising before traction", "unclear use of funds", "ignoring dilution basics"],
    artifact: "Funding path decision memo",
    glossary: [
      ["Bootstrap", "Growing without outside equity"],
      ["Angel", "Individual early-stage investor"],
      ["Dilution", "Ownership reduction when issuing new shares"],
    ],
    refs: [
      ["Y Combinator Fundraising", "https://www.ycombinator.com/library"],
      ["NVCA resources", "https://nvca.org/"],
    ],
  },
  {
    slug: "pitch-deck-structure",
    title: "Pitch deck structure that wins attention",
    description: "Build a 10-slide narrative investors and judges can follow.",
    domain: "pitching",
    focus: "story + evidence beats slide candy",
    steps: [
      "Outline 10 slides: problem, solution, market, product, traction, model, GTM, team, ask, appendix",
      "Add one proof point per major claim",
      "Cut anything that does not advance the ask",
    ],
    pitfalls: ["too many slides", "no ask", "unlabeled charts"],
    artifact: "Deck outline + slide 1–3 drafts",
    glossary: [
      ["Traction", "Evidence of progress with users or revenue"],
      ["Ask", "What you want from the audience"],
      ["TAM/SAM/SOM", "Market sizing layers"],
    ],
    refs: [
      ["Sequoia Pitch Deck Template concepts", "https://www.sequoiacap.com/article/writing-a-business-plan/"],
      ["YCdeck examples discussion", "https://www.ycombinator.com/library"],
    ],
  },
  {
    slug: "storytelling-demo-day",
    title: "Storytelling & demo day performance",
    description: "Rehearse hooks, pacing, and calm delivery.",
    domain: "communication",
    focus: "rehearsal is the product",
    steps: [
      "Write a 60-second opening hook",
      "Time a 3-minute pitch and cut ruthlessly",
      "Record and review body language and clarity",
    ],
    pitfalls: ["reading slides", "no demo", "overtime"],
    artifact: "3-minute pitch script + recording notes",
    glossary: [
      ["Hook", "Opening that earns attention"],
      ["Demo", "Live or recorded product proof"],
      ["Pacing", "Rhythm of the talk"],
    ],
    refs: [
      ["Toastmasters resources", "https://www.toastmasters.org/"],
      ["TED speaker tips", "https://www.ted.com/participate/organize-a-local-tedx-event/tedx-organizer-guide/speakers-program"],
    ],
  },
  {
    slug: "investor-qa-due-diligence",
    title: "Investor Q&A & due diligence basics",
    description: "Answer hard questions with honesty and data.",
    domain: "fundraising readiness",
    focus: "a clean data room beats improvisation",
    steps: [
      "List top 10 tough questions and draft answers",
      "Prepare a simple data room index",
      "Practice saying “I don’t know yet — here’s how we’ll learn”",
    ],
    pitfalls: ["bluffing numbers", "hiding risks", "no follow-up ownership"],
    artifact: "Q&A cheat sheet + data room index",
    glossary: [
      ["Due diligence", "Verification process before investment"],
      ["Data room", "Shared folder of key company documents"],
      ["Risk disclosure", "Honest discussion of known risks"],
    ],
    refs: [
      ["NVCA model docs overview", "https://nvca.org/model-legal-documents/"],
      ["SEC investor resources", "https://www.investor.gov/"],
    ],
  },
];

// Read remaining startup slugs from course if any beyond the list
const startupExtra: TopicLesson[] = [
  {
    slug: "team-roles-operating-cadence",
    title: "Team roles and operating cadence",
    description: "Set roles, rituals, and decision logs for a small team.",
    domain: "team ops",
    focus: "cadence beats chaos",
    steps: [
      "Define RACI for core workstreams",
      "Set weekly ritual (standup, review, demo)",
      "Create a decision log template",
    ],
    pitfalls: ["unclear ownership", "meetings without decisions", "no written decisions"],
    artifact: "Team charter + decision log",
    glossary: [
      ["RACI", "Responsible, Accountable, Consulted, Informed"],
      ["Cadence", "Repeating operating rhythm"],
      ["Decision log", "Record of what was decided and why"],
    ],
    refs: [
      ["Atlassian Team Playbook", "https://www.atlassian.com/team-playbook"],
      ["Google re:Work", "https://rework.withgoogle.com/"],
    ],
  },
  {
    slug: "legal-basics-founders",
    title: "Legal basics for founders",
    description: "Know incorporation, IP, and contract basics at a beginner level.",
    domain: "legal literacy",
    focus: "this is awareness — not legal advice; consult professionals",
    steps: [
      "List entity options at a high level",
      "Note IP ownership for student projects",
      "Draft a simple contractor checklist",
    ],
    pitfalls: ["DIY complex contracts", "unclear IP ownership", "ignoring local rules"],
    artifact: "Legal questions checklist for a mentor/attorney",
    glossary: [
      ["IP", "Intellectual property"],
      ["Entity", "Legal structure of the business"],
      ["Contract", "Agreement defining obligations"],
    ],
    refs: [
      ["SBA Choose a business structure", "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure"],
      ["USPTO IP basics", "https://www.uspto.gov/ip-policy"],
    ],
  },
  {
    slug: "capstone-venture-charter",
    title: "Capstone venture charter",
    description: "Lock scope, milestones, and success criteria for the final build.",
    domain: "capstone",
    focus: "a charter prevents endless scope creep",
    steps: [
      "Write problem, customer, MVP scope, and non-goals",
      "Set milestones with dates and owners",
      "Define demo-day success criteria",
    ],
    pitfalls: ["infinite features", "no demo criteria", "solo heroics without docs"],
    artifact: "Venture charter (2 pages)",
    glossary: [
      ["Charter", "Agreement on goals, scope, and success"],
      ["Non-goals", "Explicitly out-of-scope items"],
      ["Milestone", "Checkpoint with a deliverable"],
    ],
    refs: [
      ["Y Combinator Library", "https://www.ycombinator.com/library"],
      ["Lean Startup", "http://theleanstartup.com/"],
    ],
  },
];

writeCollegeLessons(
  "src/data/nova-college/lessons/digital-marketing-business-lessons.ts",
  "DIGITAL_MARKETING_BUSINESS_LESSONS",
  dmk,
);

// Filter startup lessons to those that exist - read course file for slugs
const startupCourse = fs.readFileSync(
  path.join(root, "src/data/nova-college/startup-innovation-digital-launch.ts"),
  "utf8",
);
const startupSlugs = [...startupCourse.matchAll(/theoryLesson\(\s*"([^"]+)"/g)].map((m) => m[1]);
const startupAll = [...startup, ...startupExtra];
const startupFiltered = startupSlugs.map((slug) => {
  const found = startupAll.find((l) => l.slug === slug);
  if (found) return found;
  return {
    slug,
    title: slug.replace(/-/g, " "),
    description: `Core startup skill: ${slug.replace(/-/g, " ")}.`,
    domain: "startup innovation",
    focus: "turn theory into a testable next action",
    steps: [
      "Define the learning goal in one sentence",
      "Run a small experiment or draft",
      "Capture evidence and a next decision",
    ],
    pitfalls: ["skipping validation", "no written decision", "scope creep"],
    artifact: "One-page experiment or decision note",
    glossary: [
      ["Experiment", "Test designed to reduce uncertainty"],
      ["Evidence", "Artifacts that support a claim"],
      ["Decision", "Choice recorded with rationale"],
    ],
    refs: [
      ["Y Combinator Library", "https://www.ycombinator.com/library"],
      ["Startup School", "https://www.startupschool.org/"],
    ],
  } satisfies TopicLesson;
});

writeCollegeLessons(
  "src/data/nova-college/lessons/startup-innovation-digital-launch-lessons.ts",
  "STARTUP_INNOVATION_LESSONS",
  startupFiltered,
);

console.log("College lesson maps generated.");
