/**
 * English catalog copy for NOVA College (default product).
 * Spanish curriculum lives in course data files — served only under /es/* routes.
 * Portuguese UI falls back to this English marketing copy for track titles.
 */

export type NovaCollegeTrackEn = {
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  prerequisites: string[];
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
    "Full interactive lessons are available in the English curriculum overview. The Spanish edition with complete module titles is published separately at /es/college.",
  b2bTitle: "License NOVA College for your school",
  b2bBody:
    "Curriculum + platform + facilitator guide. No in-house experts required.",
  b2bCta: "Contact NOVA STEM HUB",
  learningOutcomesTitle: "Learning outcomes",
  prerequisitesTitle: "Prerequisites",
  certificationsTitle: "Certifications",
} as const;

export const NOVA_COLLEGE_TRACKS_EN: Record<string, NovaCollegeTrackEn> = {
  "it-support-cloud-technician": {
    title: "IT Support & Cloud Technician",
    tagline: "From help desk to the cloud — hardware, networking, and AWS for your first tech job.",
    description:
      "120-hour employability program for help desk, IT support, and entry-level cloud operations. Covers CompTIA A+, Network+, and AWS Cloud Practitioner alignment with hands-on labs and troubleshooting methodology.",
    highlights: [
      "Diagnose hardware, software, and connectivity issues with structured troubleshooting.",
      "Install and maintain Windows and Linux desktop environments.",
      "Configure basic TCP/IP, DNS, DHCP, and local networks.",
      "Apply Level-1 security: authentication, permissions, backups, and incident response.",
      "Explain AWS shared responsibility and core services (EC2, S3, IAM, VPC).",
      "Deploy a static web app on AWS and document a simple architecture diagram.",
    ],
    prerequisites: [
      "Basic technical reading in English or Spanish",
      "Computer literacy (browser, files, email)",
      "Basic algebra recommended (not required)",
    ],
  },
  "cybersecurity-analyst": {
    title: "Cybersecurity Analyst",
    tagline: "Defend networks and data — SOC fundamentals, threat detection, and Security+.",
    description:
      "120-hour program preparing entry-level security analysts with hands-on labs, SIEM-style log analysis, incident playbooks, and industry-aligned Security+ preparation.",
    highlights: [
      "Explain CIA triad and introductory threat-modeling concepts (STRIDE).",
      "Implement identity controls: MFA, RBAC, least privilege, and credential hygiene.",
      "Analyze network traffic and system logs for anomalous activity.",
      "Execute incident-response playbooks: identify, contain, eradicate, recover, document.",
      "Apply basic CIS-style hardening on Windows and Linux servers.",
      "Describe common attack vectors: phishing, malware, SQLi, and XSS (conceptual + demos).",
    ],
    prerequisites: [
      "Networking fundamentals (TCP/IP, DNS, firewalls)",
      "Comfort with Windows/Linux command line",
      "NOVA IT Support & Cloud or CompTIA A+/Network+ equivalent recommended",
    ],
  },
  "data-analytics-technician": {
    title: "Data Analytics Technician",
    tagline: "From Excel to SQL, Python, and Power BI — the full stack for your first analyst role.",
    description:
      "120-hour data analytics track aligned to Google Data Analytics and Microsoft Power BI Data Analyst (PL-300). Build portfolio-ready dashboards and reproducible analyses.",
    highlights: [
      "Describe analyst roles and the end-to-end data project lifecycle.",
      "Define SMART questions, KPIs, and business rules in a data dictionary.",
      "Automate Excel reports with Power Query, pivots, and accessible charts.",
      "Write intermediate SQL: JOINs, GROUP BY, CTEs, and window functions.",
      "Profile data quality and explain the analyst role in ETL/ELT pipelines.",
      "Run reproducible Python/pandas analyses with clear visualizations.",
    ],
    prerequisites: [
      "Computer literacy, spreadsheets, and web browser basics",
      "Basic math (percentages, averages)",
      "Basic English technical reading recommended for SQL/BI docs",
    ],
  },
  "iot-smart-systems-technician": {
    title: "IoT & Smart Systems Technician",
    tagline: "Sensors, MQTT, and edge — from ESP32 prototypes to entry-level industrial deployment.",
    description:
      "120-hour IoT technician program with Cisco IoT and AWS IoT conceptual alignment. Build resilient sensor nodes, MQTT messaging, and edge-to-cloud dashboards.",
    highlights: [
      "Select IoT architectures and connectivity for real vertical constraints.",
      "Develop ESP32 firmware with Wi-Fi/BLE, sensors, and power-aware design.",
      "Implement MQTT topics, QoS, and brokers (Mosquitto / AWS IoT Core intro).",
      "Design edge gateways with thresholds, actuators, and Node-RED flows.",
      "Configure real-time dashboards and alerts (Grafana/Influx or ThingSpeak).",
      "Apply IoT security basics: TLS, segmentation, and least-privilege policies.",
    ],
    prerequisites: [
      "Basic Arduino/ESP32 experience (GPIO, serial) or NOVA IoT pathway",
      "Intro IP networking — IT Support or Network+ recommended",
      "Basic algebra and ability to read sensor datasheets",
    ],
  },
  "robotics-automation-technician": {
    title: "Robotics & Automation Technician",
    tagline: "Industry 4.0 on the plant floor — PLC, cobots, pneumatics, and service robotics.",
    description:
      "120-hour automation technician program with Siemens TIA Portal intro, industrial networks, safety awareness, and plant-floor documentation practices.",
    highlights: [
      "Apply LOTO/E-stop awareness before intervening on robotic or pneumatic cells.",
      "Read electrical/pneumatic diagrams and wire basic 24V DC sensor circuits.",
      "Program introductory ladder logic (start/stop, timers, counters, interlocks).",
      "Differentiate industrial robots, cobots, and service/AMR platforms.",
      "Configure FRL units, valves, and cylinders with as-built documentation.",
      "Design usable HMIs and integrate PLC telemetry (Modbus/Profinet intro).",
    ],
    prerequisites: [
      "Basic algebra and diagram reading",
      "DC electricity fundamentals recommended (NOVA Electronics or equivalent)",
      "Basic PC skills; Linux intro helpful for ROS 2 module",
    ],
  },
  "intro-telecommunications": {
    title: "Introduction to Telecommunications",
    tagline: "From copper to fiber and 5G — cabling, wireless, VoIP, and field operations.",
    description:
      "120-hour technical program covering modern telecommunications: signals, structured cabling, fiber optics, wireless/cellular, VoIP, WAN, and field operations. Aligned to CompTIA Network+ domains, ETA Fiber Optics Technician (FOT-NP) concepts, and BICSI Installer 1 awareness. NOVA College differentiator: fiber + cellular + VoIP integrated in one entry-level track.",
    highlights: [
      "Describe the telecom industry, entry-level roles, and spectrum regulation basics.",
      "Explain signals, modulation, multiplexing, and frequency/bandwidth relationships.",
      "Terminate, test, and certify copper cabling to TIA-568 with TIA-606 documentation.",
      "Perform basic fiber splices, measure loss with a power meter, and read intro OTDR traces.",
      "Plan Wi-Fi coverage with a site survey and explain LTE/5G architecture conceptually.",
      "Configure a SIP softphone and diagnose voice quality issues (jitter, latency).",
      "Design multi-site WAN topologies with SLAs (MPLS, DIA, Metro-E, SD-WAN intro).",
      "Execute field dispatch/close-out workflows with as-built documentation.",
    ],
    prerequisites: [
      "Computer and internet literacy",
      "Basic math (percentages, metric notation)",
      "Ability to participate in field-work awareness modules",
      "NOVA IT Support & Cloud or CompTIA A+ recommended (not required)",
    ],
  },
  "electronics-technician": {
    title: "Electronics Technician",
    tagline: "From Ohm's law to microcontrollers — DC/AC, soldering, instruments, and troubleshooting.",
    description:
      "120-hour electronics program aligned to ETA Associate Certified Electronics Technician and IPC-A-610 awareness. Lab-heavy path from circuit fundamentals to microcontroller GPIO.",
    highlights: [
      "Apply Ohm’s and Kirchhoff’s laws to predict and verify DC measurements.",
      "Explain capacitors, inductors, and transformers in AC and passive filters.",
      "Bias diodes/LEDs/transistors and design basic DC switching drivers.",
      "Interpret logic gates and program basic GPIO/ADC on Arduino or ESP32.",
      "Operate DMM, oscilloscope, and function generator to validate designs.",
      "Solder through-hole and basic SMD to IPC-A-610 Class 2 visual criteria.",
    ],
    prerequisites: [
      "Basic algebra (solving linear equations)",
      "High-school math fundamentals",
      "Willingness to learn English technical vocabulary in datasheets",
    ],
  },
  "digital-marketing-business": {
    title: "Digital Marketing & Business Growth",
    tagline:
      "Brand, content, social, and ads — build real campaigns and launch a creative business career.",
    description:
      "120-hour employability track for digital marketing and e-commerce growth — creative and business-focused, with no heavy coding required. Meta & Google certificate alignment.",
    highlights: [
      "Develop brand strategy, personas, and multi-channel content calendars.",
      "Create visual and video content with industry-standard tools.",
      "Plan and report on social, email, and paid campaigns with ethical data use.",
      "Apply SEO and content marketing to drive organic growth.",
      "Use GA4 and spreadsheet dashboards to connect marketing to outcomes.",
      "Build a portfolio case study for entry-level digital marketing roles.",
    ],
    prerequisites: [
      "Computer literacy and internet access",
      "Interest in communication, design, and business",
      "English technical reading (portfolio artifacts may be bilingual)",
    ],
  },
  "startup-innovation-digital-launch": {
    title: "Startup Innovation & Digital Launch",
    tagline:
      "From idea to launch — lean startup, MVP, pitch, and digital go-to-market for the next generation of founders.",
    description:
      "120-hour entrepreneurship track — customer discovery, Lean Canvas, no-code MVP, GTM, and demo-day pitch. Pairs with Digital Marketing for full founder skills.",
    highlights: [
      "Validate problems through structured customer discovery and JTBD framing.",
      "Design business models with Lean Canvas and clear value propositions.",
      "Build and test no-code MVPs with user feedback loops.",
      "Create go-to-market plans and track early-stage startup metrics.",
      "Model basic finances, pricing, and runway for pre-revenue ventures.",
      "Deliver investor-ready pitch decks and demo-day presentations.",
    ],
    prerequisites: [
      "Computer literacy and internet access",
      "Interest in business, innovation, or social impact",
      "No prior coding required (no-code MVP labs included)",
    ],
  },
  "quantum-workforce": {
    title: "Quantum Computing Workforce (QCW)",
    tagline: "From qubit to job-ready — Qiskit, NISQ algorithms, and an industry portfolio (Tier 2 Advanced).",
    description:
      "NOVA College Tier 2 program with interactive lessons delivered via the QCW app. Certificate NOVA-COL-QNT. Build Qiskit circuits, intro algorithms, and a workforce-ready portfolio.",
    highlights: [
      "Explain qubits, superposition, measurement, and entanglement without hype.",
      "Apply linear algebra and tensor products to multi-qubit circuits.",
      "Build and run circuits in Qiskit (simulator + cloud hardware intro).",
      "Implement intro Deutsch-Jozsa, Grover, and VQE/QAOA workflows.",
      "Interpret noise models, mitigation basics, and backend calibration metrics.",
      "Develop testable quantum software with Qiskit Runtime intro practices.",
    ],
    prerequisites: [
      "Introductory Python (variables, functions, pip)",
      "Basic linear algebra or complete Module 2 of this track",
      "Basic probability helpful (reviewed in course)",
      "Recommended: NOVA Data Analytics, Electronics, or IT Support & Cloud",
    ],
  },
};

export function getCollegeTrackEn(slug: string) {
  return NOVA_COLLEGE_TRACKS_EN[slug];
}
