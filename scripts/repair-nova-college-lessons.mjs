/**
 * Repair and finalize NOVA College course + lesson integration.
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("src/data/nova-college");
const LESSONS_DIR = path.join(ROOT, "lessons");

function toSlug(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

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

function parseLessonsFromModules(modulesText) {
  const lessons = [];
  const theoryRe = /theoryLesson\("([^"]+)", "((?:\\.|[^"\\])*)", "((?:\\.|[^"\\])*)", (\d+)\)/g;
  let m;
  while ((m = theoryRe.exec(modulesText)) !== null) {
    lessons.push({
      slug: m[1],
      title: m[2].replace(/\\"/g, '"'),
      description: m[3].replace(/\\"/g, '"'),
      type: "theory",
      hours: Number(m[4]),
    });
  }
  const slugRe =
    /\{\s*slug:\s*"([^"]+)",\s*title:\s*"((?:\\.|[^"\\])*)",\s*description:\s*"((?:\\.|[^"\\])*)",\s*type:\s*"([^"]+)",\s*hours:\s*(\d+)\s*\}/g;
  while ((m = slugRe.exec(modulesText)) !== null) {
    lessons.push({
      slug: m[1],
      title: m[2].replace(/\\"/g, '"'),
      description: m[3].replace(/\\"/g, '"'),
      type: m[4],
      hours: Number(m[5]),
    });
  }
  const legacyRe =
    /\{\s*\n\s*title:\s*"([^"]+)",\s*\n\s*description:\s*\n\s*"([^"]+)",\s*\n\s*type:\s*"(theory|soft-skills|exam-prep|project|lab)",\s*\n\s*hours:\s*(\d+),?\s*\n\s*\}/g;
  while ((m = legacyRe.exec(modulesText)) !== null) {
    const title = m[1];
    if (lessons.some((l) => l.title === title)) continue;
    const slug = toSlug(title);
    lessons.push({
      slug,
      title,
      description: m[2],
      type: m[3],
      hours: Number(m[4]),
    });
  }
  return lessons;
}

function getModulesInner(text) {
  const start = text.indexOf("const RAW_MODULES:");
  if (start === -1) throw new Error("RAW_MODULES not found");
  const arrOpen = text.indexOf("[", start);
  let depth = 0;
  let arrClose = -1;
  for (let i = arrOpen; i < text.length; i++) {
    if (text[i] === "[") depth++;
    if (text[i] === "]") {
      depth--;
      if (depth === 0) {
        arrClose = i;
        break;
      }
    }
  }
  return text.slice(arrOpen + 1, arrClose);
}

function topicHeadings(title) {
  const t = title.toLowerCase();
  if (t.includes("aws") || t.includes("cloud") || t.includes("ec2") || t.includes("s3") || t.includes("vpc"))
    return ["Contexto cloud y responsabilidad compartida", "Servicios y componentes clave", "Operación segura y costos", "Aplicación en soporte y labs"];
  if (t.includes("segur") || t.includes("malware") || t.includes("phish") || t.includes("siem") || t.includes("firewall"))
    return ["Panorama de amenazas y controles", "Implementación práctica", "Detección y respuesta", "Preparación profesional SOC"];
  if (t.includes("sql") || t.includes("datos") || t.includes("pandas") || t.includes("power bi") || t.includes("excel"))
    return ["Pregunta de negocio y datos", "Técnicas y herramientas", "Calidad y gobernanza", "Comunicación de insights"];
  if (t.includes("mqtt") || t.includes("esp32") || t.includes("iot") || t.includes("sensor"))
    return ["Arquitectura IoT y requisitos", "Implementación firmware/conectividad", "Operación y mantenimiento", "Seguridad y despliegue en campo"];
  if (t.includes("plc") || t.includes("ladder") || t.includes("robot") || t.includes("neum") || t.includes("ros"))
    return ["Fundamentos industriales", "Programación y cableado", "Seguridad y interlocks", "Integración en planta simulada"];
  if (t.includes("red") || t.includes("tcp") || t.includes("dns") || t.includes("wifi") || t.includes("ip "))
    return ["Fundamentos de conectividad", "Configuración y diagnóstico", "Fallos frecuentes en campo", "Documentación de red"];
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
    `${headings[0]}: «${title}» ubica al técnico en escenarios reales de ${domain}. ${d}. En LATAM muchas operaciones combinan soporte remoto hacia USA con planta o sucursal local; se valora quien documenta en español claro y usa terminología técnica en inglés cuando el stack lo exige.`,
    `${headings[1]}: Descompón el problema en entradas, procesos y salidas observables. Identifica herramientas del stack y qué evidencia exportar: capturas, logs, CSV, ladder printout o diagrama as-built. Un entregable verificable pesa más que una explicación verbal en auditoría o entrevista.`,
    `${headings[2]}: Evita suposiciones sin prueba, cambios sin backup y cierres prematuros. Orden recomendado: seguridad de personas y datos → contención → diagnóstico → remediación → validación con usuario → registro en knowledge base.`,
    `${headings[3]}: Conecta la teoría con el lab del módulo y prepara un relato STAR de 90 segundos. En certificaciones y evaluaciones NOVA College se evalúa aplicación bajo presión moderada, no definiciones aisladas.`,
    `Checklist: explica «${title}» sin slides, cita dos riesgos operativos si se configura mal y propone una métrica (MTTR, first-call resolution, uptime, precisión de sensor) para demostrar valor.`,
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

function lessonLine(l) {
  const title = l.title.replace(/"/g, '\\"');
  const desc = l.description.replace(/"/g, '\\"');
  if (l.type === "theory") {
    return `        theoryLesson("${l.slug}", "${title}", "${desc}", ${l.hours})`;
  }
  return `        { slug: "${l.slug}", title: "${title}", description: "${desc}", type: "${l.type}", hours: ${l.hours} }`;
}

function replaceLessonsInModules(modulesInner, allLessons) {
  let out = modulesInner;
  // Fix corruption
  out = out.replace(/^\s*\]\s*=\s*\[/, "");
  for (const l of allLessons) {
    const titleQ = l.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const descQ = l.description.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const patterns = [
      new RegExp(
        `theoryLesson\\("[^"]*", "${titleQ.replace(/"/g, '\\"')}", "[^"]*", \\d+\\)`,
        "g",
      ),
      new RegExp(
        `\\{\\s*slug:\\s*"[^"]*",\\s*title:\\s*"${titleQ.replace(/"/g, '\\"')}"[\\s\\S]*?hours:\\s*\\d+\\s*\\}`,
        "g",
      ),
      new RegExp(
        `\\{\\s*\\n\\s*title:\\s*"${titleQ}",\\s*\\n\\s*description:\\s*\\n\\s*"${descQ}",\\s*\\n\\s*type:\\s*"${l.type}",\\s*\\n\\s*hours:\\s*${l.hours},\\s*\\n\\s*\\}`,
        "g",
      ),
    ];
    let replaced = false;
    for (const p of patterns) {
      if (p.test(out)) {
        out = out.replace(p, lessonLine(l).trim());
        replaced = true;
        break;
      }
    }
    if (!replaced) {
      console.warn(`Could not replace lesson: ${l.title}`);
    }
  }
  return out;
}

const courses = [
  {
    file: "it-support-cloud.ts",
    exportName: "IT_SUPPORT_CLOUD_LESSONS",
    mapFile: "it-support-cloud-technician-lessons.ts",
    exportConst: "itSupportCloudCourse",
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
    exportConst: "cybersecurityAnalystCourse",
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
    exportConst: "dataAnalyticsCourse",
    domain: "análisis de datos y business intelligence",
    visual: "data-pipeline",
    refs: [
      ["Google Data Analytics Certificate", "https://grow.google/certificates/data-analytics/", "Google"],
      ["Microsoft Power BI Documentation", "https://learn.microsoft.com/power-bi/", "Microsoft"],
      ["SQLBolt — Interactive SQL Tutorial", "https://sqlbolt.com/", "SQLBolt"],
    ],
  },
  {
    file: "iot-smart-systems.ts",
    exportName: "IOT_SMART_SYSTEMS_LESSONS",
    mapFile: "iot-smart-systems-technician-lessons.ts",
    exportConst: "iotSmartSystemsCourse",
    domain: "despliegue y mantenimiento de sistemas IoT",
    visual: "iot-schematic",
    refs: [
      ["MQTT Specification", "https://mqtt.org/mqtt-specification/", "OASIS"],
      ["AWS IoT Core Developer Guide", "https://docs.aws.amazon.com/iot/latest/developerguide/", "AWS"],
      ["ESP-IDF Programming Guide", "https://docs.espressif.com/projects/esp-idf/en/latest/", "Espressif"],
    ],
  },
  {
    file: "robotics-automation.ts",
    exportName: "ROBOTICS_AUTOMATION_LESSONS",
    mapFile: "robotics-automation-technician-lessons.ts",
    exportConst: "roboticsAutomationCourse",
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
  const filePath = path.join(ROOT, cfg.file);
  let text = fs.readFileSync(filePath, "utf8");
  // Remove duplicate export blocks if present
  const exportName = cfg.exportConst;
  const secondExport = text.indexOf(`export const ${exportName}`, 10);
  if (secondExport !== -1) {
    text = text.slice(0, secondExport);
  }
  const modulesInner = getModulesInner(text);
  let lessons = parseLessonsFromModules(modulesInner);
  // Assign slugs to any missing
  const used = new Set(lessons.map((l) => l.slug));
  lessons = lessons.map((l) => {
    if (l.slug) return l;
    let slug = toSlug(l.title);
    let n = 2;
    while (used.has(slug)) slug = `${toSlug(l.title)}-${n++}`;
    used.add(slug);
    return { ...l, slug };
  });

  const theory = lessons.filter((l) => l.type === "theory");
  const fixedModules = replaceLessonsInModules(modulesInner, lessons);

  const entries = theory.map((l, idx) => {
    const headings = topicHeadings(l.title);
    const bodies = richBodies(l.title, l.description, cfg.domain, headings);
    const summary = `Dominaste «${l.title}»: contexto en ${cfg.domain}, aplicación con herramientas estándar, controles operativos y cómo evidenciarlo en labs y entrevistas técnicas.`;
    const career = `Prepara un ejemplo STAR de 60–90 s sobre «${l.title}». En entrevistas entry-level, explica qué harías con información incompleta y qué datos pedirías antes de escalar.`;
    const glossary = topicGlossary(l.title, l.description);
    const visual =
      idx % 4 === 0
        ? {
            type: cfg.visual,
            title: `Diagrama de apoyo: ${l.title}`,
            afterSection: 1,
            caption: "Referencia visual para documentación y repaso previo a lab.",
          }
        : undefined;
    return buildLessonTs(l.slug, headings, bodies, summary, career, glossary, cfg.refs, visual);
  });

  fs.writeFileSync(
    path.join(LESSONS_DIR, cfg.mapFile),
    `import type { LessonContent } from "../types";
import { buildLesson } from "./content-builder";

/** QWA-style theory content — ${cfg.exportConst} (${theory.length} lessons). */
export const ${cfg.exportName}: Record<string, LessonContent> = {
${entries.join(",\n\n")}
};
`,
  );

  const capIdx = text.indexOf("  capstone:");
  const tail = text.slice(capIdx);
  const courseBodyStart = text.indexOf(`export const ${exportName}: NovaCollegeCourse = {`);
  const courseBody = text
    .slice(courseBodyStart + `export const ${exportName}: NovaCollegeCourse = {`.length, text.indexOf("const RAW_MODULES:"))
    .trim();

  const imports = `import type { NovaCollegeCourse, NovaCollegeModule } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { ${cfg.exportName} } from "./lessons/${cfg.mapFile.replace(".ts", "")}";

`;

  const out = `${imports}const RAW_MODULES: NovaCollegeModule[] = [
${fixedModules.trim()}
];

export const ${exportName}: NovaCollegeCourse = {
${courseBody}
  modules: attachContentToModules(RAW_MODULES, ${cfg.exportName}),
${tail}`;
  fs.writeFileSync(filePath, out);
  counts[cfg.file] = { theory: theory.length, total: lessons.length };
  console.log(JSON.stringify({ file: cfg.file, ...counts[cfg.file] }));
}

fs.writeFileSync(
  path.join(LESSONS_DIR, "index.ts"),
  courses.map((c) => `export { ${c.exportName} } from "./${c.mapFile.replace(".ts", "")}";`).join("\n") + "\n",
);

let idx = fs.readFileSync(path.join(ROOT, "index.ts"), "utf8");
if (!idx.includes("LessonContent")) {
  idx = idx.replace("export type {", "export type {\n  LessonContent,\n  GlossaryTerm,\n  Reference,");
  fs.writeFileSync(path.join(ROOT, "index.ts"), idx);
}

console.log("REPAIR COMPLETE", counts);
