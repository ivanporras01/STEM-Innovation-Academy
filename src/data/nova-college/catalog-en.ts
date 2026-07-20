/**
 * English catalog copy for NOVA College (default product).
 * Spanish curriculum lives in course data files — served only under /es/* routes.
 */

export type NovaCollegeCatalogEn = {
  title: string;
  tagline: string;
  description: string;
  tier1SectionTitle: string;
  tier1SectionSubtitle: string;
  tier2SectionTitle: string;
  tier2SectionSubtitle: string;
};

export const NOVA_COLLEGE_PAGE_EN = {
  heroSubtitle: "From classroom to first tech job",
  heroDescription:
    "~120-hour technical programs, verifiable certificates, aligned to CompTIA, ETA, IBM Quantum, and more. B2B model for technical schools and community colleges.",
  scholarshipBannerTitle: "Need financial support to study?",
  scholarshipBannerBody:
    "We offer full and partial scholarships for underserved students who have no other path to quality tech training. Human review — approval is not automatic.",
  scholarshipBannerCta: "Apply for a scholarship",
  syllabusNote:
    "Full interactive lessons are available in the English curriculum. The Spanish edition is published separately at /es/college.",
  b2bTitle: "License NOVA College for your school",
  b2bBody:
    "Curriculum + platform + facilitator guide. No in-house experts required.",
  b2bCta: "Contact NOVA STEM HUB",
} as const;

export const NOVA_COLLEGE_TRACKS_EN: Record<
  string,
  Pick<NovaCollegeCatalogEn, "title" | "tagline" | "description">
> = {
  "it-support-cloud-technician": {
    title: "IT Support & Cloud Technician",
    tagline: "From help desk to the cloud — hardware, networking, and AWS for your first tech job.",
    description:
      "120-hour employability program for help desk, IT support, and entry-level cloud operations. Covers CompTIA A+, Network+, and AWS Cloud Practitioner alignment.",
  },
  "cybersecurity-analyst": {
    title: "Cybersecurity Analyst",
    tagline: "Defend networks and data — SOC fundamentals, threat detection, and Security+.",
    description:
      "120-hour program preparing entry-level security analysts with hands-on labs and industry-aligned certification prep.",
  },
  "data-analytics-technician": {
    title: "Data Analytics Technician",
    tagline: "From Excel to SQL, Python, and Power BI — the full stack for your first analyst role.",
    description:
      "120-hour data analytics track aligned to Google Data Analytics and Microsoft Power BI Data Analyst (PL-300).",
  },
  "iot-smart-systems-technician": {
    title: "IoT & Smart Systems Technician",
    tagline: "Sensors, MQTT, and edge — from ESP32 prototypes to entry-level industrial deployment.",
    description:
      "120-hour IoT technician program with Cisco IoT and AWS IoT conceptual alignment.",
  },
  "robotics-automation-technician": {
    title: "Robotics & Automation Technician",
    tagline: "Industry 4.0 on the plant floor — PLC, cobots, pneumatics, and service robotics.",
    description:
      "120-hour automation technician program with Siemens TIA Portal intro and industrial networks.",
  },
  "intro-telecommunications": {
    title: "Introduction to Telecommunications",
    tagline: "From copper to fiber and 5G — cabling, wireless, VoIP, and field operations.",
    description:
      "120-hour telecom fundamentals for entry-level field and NOC-adjacent roles.",
  },
  "electronics-technician": {
    title: "Electronics Technician",
    tagline: "From Ohm's law to microcontrollers — DC/AC, soldering, instruments, and troubleshooting.",
    description:
      "120-hour electronics program aligned to ETA Associate Certified Electronics Technician and IPC-A-610 awareness.",
  },
  "digital-marketing-business": {
    title: "Digital Marketing & Business Growth",
    tagline:
      "Brand, content, social, and ads — build real campaigns and launch a creative business career.",
    description:
      "120-hour employability track for digital marketing and e-commerce growth — creative and business-focused, with no heavy coding required. Meta & Google certificate alignment.",
  },
  "startup-innovation-digital-launch": {
    title: "Startup Innovation & Digital Launch",
    tagline:
      "From idea to launch — lean startup, MVP, pitch, and digital go-to-market for the next generation of founders.",
    description:
      "120-hour entrepreneurship track — customer discovery, Lean Canvas, no-code MVP, GTM, and demo-day pitch. Pairs with Digital Marketing for full founder skills.",
  },
  "quantum-workforce": {
    title: "Quantum Computing Workforce (QCW)",
    tagline: "From qubit to job-ready — Qiskit, NISQ algorithms, and an industry portfolio (Tier 2 Advanced).",
    description:
      "NOVA College Tier 2 program with interactive lessons delivered via the QCW app. Certificate NOVA-COL-QNT.",
  },
};

export function getCollegeTrackEn(slug: string) {
  return NOVA_COLLEGE_TRACKS_EN[slug];
}
