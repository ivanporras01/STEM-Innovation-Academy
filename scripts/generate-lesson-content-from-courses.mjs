/**
 * Generate lesson content maps from rebuilt course files (multi-line theoryLesson).
 * Run: node scripts/generate-lesson-content-from-courses.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("src/data/nova-college");
const LESSONS_DIR = path.join(ROOT, "lessons");

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function gloss(entries) {
  return entries.map(([t, d]) => `      { term: "${esc(t)}", definition: "${esc(d)}" }`).join(",\n");
}

function refs(entries) {
  return entries
    .map(([title, url, author]) =>
      author
        ? `      { title: "${esc(title)}", url: "${url}", author: "${esc(author)}" }`
        : `      { title: "${esc(title)}", url: "${url}" }`,
    )
    .join(",\n");
}

function parseTheoryLessons(text) {
  const lessons = [];
  const re =
    /theoryLesson\(\s*"([^"]+)",\s*"((?:\\.|[^"\\])*)",\s*"((?:\\.|[^"\\])*)",\s*(\d+),?\s*\)/gs;
  let m;
  while ((m = re.exec(text)) !== null) {
    lessons.push({
      slug: m[1],
      title: m[2].replace(/\\"/g, '"'),
      description: m[3].replace(/\\"/g, '"'),
      hours: Number(m[4]),
    });
  }
  return lessons;
}

function topicHeadings(title) {
  const t = title.toLowerCase();
  if (t.includes("aws") || t.includes("cloud") || t.includes("ec2") || t.includes("s3") || t.includes("vpc"))
    return ["Contexto cloud y responsabilidad compartida", "Servicios y componentes clave", "Operación segura y costos", "Aplicación en soporte y labs"];
  if (t.includes("segur") || t.includes("malware") || t.includes("phish") || t.includes("siem") || t.includes("firewall") || t.includes("cifr") || t.includes("pki"))
    return ["Panorama de amenazas y controles", "Implementación práctica", "Detección y respuesta", "Preparación profesional SOC"];
  if (t.includes("sql") || t.includes("datos") || t.includes("pandas") || t.includes("power bi") || t.includes("excel") || t.includes("analyst") || t.includes("dashboard"))
    return ["Pregunta de negocio y datos", "Técnicas y herramientas", "Calidad y gobernanza", "Comunicación de insights"];
  if (t.includes("mqtt") || t.includes("esp32") || t.includes("iot") || t.includes("sensor") || t.includes("grafana") || t.includes("modbus"))
    return ["Arquitectura IoT y requisitos", "Implementación firmware/conectividad", "Operación y mantenimiento", "Seguridad y despliegue en campo"];
  if (t.includes("plc") || t.includes("ladder") || t.includes("robot") || t.includes("neum") || t.includes("ros") || t.includes("hmi") || t.includes("scada"))
    return ["Fundamentos industriales", "Programación y cableado", "Seguridad y interlocks", "Integración en planta simulada"];
  if (t.includes("red") || t.includes("tcp") || t.includes("dns") || t.includes("wifi") || t.includes("ip ") || t.includes("osi") || t.includes("subnet"))
    return ["Fundamentos de conectividad", "Configuración y diagnóstico", "Fallos frecuentes en campo", "Documentación de red"];
  if (t.includes("windows") || t.includes("linux") || t.includes("hardware") || t.includes("cpu") || t.includes("troubleshoot"))
    return ["Contexto en soporte técnico", "Conceptos y herramientas", "Diagnóstico y documentación", "Empleabilidad entry-level"];
  return ["Contexto profesional", "Conceptos técnicos esenciales", "Buenas prácticas operativas", "Evaluación y empleabilidad"];
}

function topicGlossary(title, desc) {
  const text = `${title} ${desc}`.toLowerCase();
  const terms = [];
  const add = (term, def) => {
    if (terms.length < 8 && !terms.find(([t]) => t === term)) terms.push([term, def]);
  };
  const dict = [
    ["SLA", "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo."],
    ["Runbook", "Procedimiento operativo estandarizado para resolver incidentes recurrentes."],
    ["Triage", "Clasificación inicial de tickets o alertas por impacto y urgencia."],
    ["Escalamiento", "Transferencia a nivel superior con contexto, evidencia y acciones intentadas."],
    ["MFA", "Multi-Factor Authentication; segundo factor además de contraseña."],
    ["IAM", "Identity and Access Management; gestión de identidades y permisos."],
    ["VPC", "Virtual Private Cloud; red lógica aislada en proveedor cloud."],
    ["MQTT", "Protocolo publish/subscribe ligero para telemetría IoT."],
    ["QoS", "Quality of Service; nivel de garantía de entrega en MQTT (0, 1 o 2)."],
    ["PLC", "Programmable Logic Controller; computadora industrial para control de procesos."],
    ["Ladder logic", "Lenguaje gráfico de programación PLC basado en relés."],
    ["LOTO", "Lockout/Tagout; procedimiento de bloqueo de energía antes de mantenimiento."],
    ["SIEM", "Security Information and Event Management; correlación de logs de seguridad."],
    ["IOC", "Indicator of Compromise; artefacto que sugiere intrusión (IP, hash, dominio)."],
    ["ETL", "Extract, Transform, Load; pipeline de preparación de datos."],
    ["KPI", "Key Performance Indicator; métrica alineada a objetivo de negocio."],
    ["DAX", "Data Analysis Expressions; lenguaje de fórmulas en Power BI."],
    ["JOIN", "Operación SQL para combinar filas de dos o más tablas relacionadas."],
    ["Subnetting", "División de red IP en subredes más pequeñas."],
    ["ESD", "Electrostatic Discharge; descarga estática que daña componentes electrónicos."],
    ["TCP/IP", "Suite de protocolos de red; base de Internet y LAN corporativas."],
    ["DHCP", "Dynamic Host Configuration Protocol; asignación automática de IP."],
    ["DNS", "Domain Name System; resolución de nombres a direcciones IP."],
    ["EC2", "Elastic Compute Cloud; servicio de servidores virtuales en AWS."],
    ["S3", "Simple Storage Service; almacenamiento de objetos en AWS."],
    ["Wireshark", "Analizador de tráfico de red por captura de paquetes."],
    ["STRIDE", "Modelo de amenazas: Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation."],
    ["CVSS", "Common Vulnerability Scoring System; severidad de vulnerabilidades."],
    ["pandas", "Biblioteca Python para manipulación y análisis de datos tabulares."],
    ["FreeRTOS", "Sistema operativo en tiempo real para microcontroladores."],
    ["ROS 2", "Robot Operating System 2; middleware para robots programables."],
    ["OEE", "Overall Equipment Effectiveness; métrica de eficiencia de línea."],
    ["HMI", "Human-Machine Interface; pantalla operador en planta."],
    ["Modbus", "Protocolo industrial master/slave para lectura de registros."],
    ["TLS", "Transport Layer Security; cifrado de tráfico en tránsito."],
    ["PKI", "Public Key Infrastructure; marco de certificados digitales."],
    ["Edge computing", "Procesamiento local cercano al sensor para reducir latencia."],
    ["POST", "Power-On Self-Test; autoprueba de hardware al encender la PC."],
    ["UEFI", "Interfaz firmware moderna que reemplaza BIOS en equipos actuales."],
    ["Hypervisor", "Software que permite ejecutar máquinas virtuales sobre hardware físico."],
    ["NAT", "Network Address Translation; traducción de direcciones privadas a públicas."],
    ["RTO", "Recovery Time Objective; tiempo máximo tolerable de recuperación."],
    ["RPO", "Recovery Point Objective; pérdida máxima de datos tolerable."],
    ["CTU", "Contador incremental en ladder logic PLC."],
    ["TON", "Timer On-Delay; retardo a la activación en ladder logic."],
  ];
  for (const [term, def] of dict) {
    if (text.includes(term.toLowerCase())) add(term, def);
  }
  for (const [term, def] of dict) {
    if (terms.length >= 6) break;
    add(term, def);
  }
  return terms.slice(0, 7);
}

function richBodies(title, desc, domain, headings) {
  const d = desc.replace(/\.$/, "");
  return [
    `${headings[0]}: «${title}» es competencia clave en ${domain}. ${d}. En operaciones LATAM con clientes en USA, documenta en español neutro y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales.`,
    `${headings[1]}: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR.`,
    `${headings[2]}: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base.`,
    `${headings[3]}: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte).`,
    `Checklist: explica «${title}» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario.`,
  ];
}

function buildLessonTs(slug, headings, bodies, summary, career, glossary, references, visual) {
  const sections = headings
    .concat(["Checklist de dominio"])
    .map((h, i) => `      { heading: "${esc(h)}", body: "${esc(bodies[i])}" }`)
    .join(",\n");
  const visualTs = visual
    ? `,\n    visual: { type: "${visual.type}", title: "${esc(visual.title)}", afterSection: ${visual.afterSection}, caption: "${esc(visual.caption)}" }`
    : "";
  return `  "${slug}": buildLesson({
    sections: [
${sections}
    ],
    summary: "${esc(summary)}",
    careerInsight: "${esc(career)}",
    glossary: [
${gloss(glossary)}
    ],
    references: [
${refs(references)}
    ]${visualTs}
  })`;
}

const courses = [
  {
    file: "it-support-cloud.ts",
    exportName: "IT_SUPPORT_CLOUD_LESSONS",
    mapFile: "it-support-cloud-technician-lessons.ts",
    domain: "soporte IT, redes y operaciones cloud entry-level",
    visual: "troubleshooting-flowchart",
    refs: [
      ["CompTIA A+ Exam Objectives", "https://www.comptia.org/certifications/a", "CompTIA"],
      ["AWS Cloud Practitioner", "https://aws.amazon.com/certification/certified-cloud-practitioner/", "AWS"],
      ["Microsoft Learn — Windows client", "https://learn.microsoft.com/windows/", "Microsoft"],
    ],
  },
  {
    file: "cybersecurity-analyst.ts",
    exportName: "CYBERSECURITY_ANALYST_LESSONS",
    mapFile: "cybersecurity-analyst-lessons.ts",
    domain: "operaciones SOC y ciberseguridad defensiva",
    visual: "security-scenario",
    refs: [
      ["CompTIA Security+ SY0-701", "https://www.comptia.org/certifications/security", "CompTIA"],
      ["MITRE ATT&CK", "https://attack.mitre.org/", "MITRE"],
      ["NIST Cybersecurity Framework", "https://www.nist.gov/cyberframework", "NIST"],
    ],
  },
  {
    file: "data-analytics.ts",
    exportName: "DATA_ANALYTICS_LESSONS",
    mapFile: "data-analytics-technician-lessons.ts",
    domain: "análisis de datos y business intelligence",
    visual: "data-pipeline",
    refs: [
      ["Google Data Analytics Certificate", "https://grow.google/certificates/data-analytics/", "Google"],
      ["Microsoft Power BI Documentation", "https://learn.microsoft.com/power-bi/", "Microsoft"],
      ["SQLBolt — Interactive SQL Tutorial", "https://sqlbolt.com/", "SQLBolt"],
    ],
  },
  {
    file: "iot-smart-systems-technician.ts",
    exportName: "IOT_SMART_SYSTEMS_LESSONS",
    mapFile: "iot-smart-systems-technician-lessons.ts",
    domain: "despliegue y mantenimiento de sistemas IoT",
    visual: "iot-schematic",
    refs: [
      ["MQTT Specification", "https://mqtt.org/mqtt-specification/", "OASIS"],
      ["AWS IoT Core Developer Guide", "https://docs.aws.amazon.com/iot/latest/developerguide/", "AWS"],
      ["ESP-IDF Programming Guide", "https://docs.espressif.com/projects/esp-idf/en/latest/", "Espressif"],
    ],
  },
  {
    file: "robotics-automation-technician.ts",
    exportName: "ROBOTICS_AUTOMATION_LESSONS",
    mapFile: "robotics-automation-technician-lessons.ts",
    domain: "automatización industrial y robótica programable",
    visual: "troubleshooting-flowchart",
    refs: [
      ["Siemens S7-1200 System Manual", "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", "Siemens"],
      ["ROS 2 Humble Documentation", "https://docs.ros.org/en/humble/", "Open Robotics"],
      ["Factory I/O — Documentation", "https://factoryio.com/docs", "Factory I/O"],
    ],
  },
];

const counts = {};

for (const cfg of courses) {
  const text = fs.readFileSync(path.join(ROOT, cfg.file), "utf8");
  const theory = parseTheoryLessons(text);

  const entries = theory.map((l, idx) => {
    const headings = topicHeadings(l.title);
    const bodies = richBodies(l.title, l.description, cfg.domain, headings);
    const summary = `Comprendiste «${l.title}»: marco operativo en ${cfg.domain}, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.`;
    const career = `En entrevistas, usa STAR sobre «${l.title}» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.`;
    const glossary = topicGlossary(l.title, l.description);
    const visual =
      idx % 4 === 0
        ? {
            type: cfg.visual,
            title: `Referencia: ${l.title}`,
            afterSection: 1,
            caption: "Diagrama de apoyo para documentación y repaso previo al lab.",
          }
        : undefined;
    return buildLessonTs(l.slug, headings, bodies, summary, career, glossary, cfg.refs, visual);
  });

  fs.writeFileSync(
    path.join(LESSONS_DIR, cfg.mapFile),
    `import type { LessonContent } from "../types";
import { buildLesson } from "./content-builder";

/** QWA-style theory content — ${cfg.file.replace(".ts", "")} (${theory.length} lessons). */
export const ${cfg.exportName}: Record<string, LessonContent> = {
${entries.join(",\n\n")}
};
`,
  );
  counts[cfg.file] = theory.length;
  console.log(`${cfg.file}: ${theory.length} theory lessons`);
}

console.log("TOTAL", Object.values(counts).reduce((a, b) => a + b, 0));
