import type { NovaCollegeCourse, NovaCollegeModule } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { CYBERSECURITY_ANALYST_LESSONS } from "./lessons/cybersecurity-analyst-lessons";

const RAW_MODULES: NovaCollegeModule[] = [
  {
    order: 1,
    title: "Panorama de ciberseguridad y marco legal",
    description:
      "Amenazas actuales, actores, marco regulatorio y roles en SOC.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "estado-threat-landscape",
        "Estado del threat landscape 2025–2026",
        "Ransomware, supply chain, insider threats; costos para PYMEs y sector público.",
        2,
      ),
      theoryLesson(
        "roles-soc-analyst-ir-grc",
        "Roles: SOC analyst L1/L2, IR, GRC, pentester",
        "Rutas de carrera, certificaciones y expectativas salariales entry-level.",
        2,
      ),
      theoryLesson(
        "marco-legal-etica-ciberseguridad",
        "Marco legal y ética (LFPDPPP, GDPR, leyes locales)",
        "Notificación de brechas, evidencia digital intro, código de conducta.",
        2,
      ),
      theoryLesson(
        "modelos-amenazas-superficie-ataque",
        "Modelos de amenazas y superficie de ataque",
        "Asset inventory, threat modeling básico, MITRE ATT&CK overview.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Inventario de activos y mapa de superficie de ataque",
      description:
        "Para organización ficticia, listar activos (servidores, endpoints, SaaS), identificar 10 vectores de entrada y priorizar con matriz riesgo/impacto.",
      hours: 3,
    },
  },
  {
    order: 2,
    title: "Criptografía y PKI para analistas",
    description:
      "Hashing, cifrado simétrico/asimétrico, certificados TLS — lo que un SOC L1 debe entender.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "hashing-md5-sha256-integridad",
        "Hashing: MD5 vs SHA-256, integridad de archivos",
        "Uso forense de hashes, VirusTotal, verificación de downloads.",
        2,
      ),
      theoryLesson(
        "cifrado-simetrico-asimetrico",
        "Cifrado simétrico y asimétrico (AES, RSA intro)",
        "Cuándo se usa cada uno; limitaciones y key management básico.",
        3,
      ),
      theoryLesson(
        "pki-certificados-tls",
        "PKI, certificados X.509 y TLS handshake",
        "CA, certificados autofirmados vs confiables, errores comunes de certificado.",
        3,
      ),
      theoryLesson(
        "vpn-tuneles-seguros",
        "VPN y túneles seguros",
        "IPsec vs SSL VPN concept; split tunneling y riesgos.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Verificar certificados TLS y analizar handshake",
      description:
        "Usar openssl/browser devtools para inspeccionar cert de sitio web, identificar CA, fecha de expiración y cipher suite; documentar hallazgos.",
      hours: 2,
    },
  },
  {
    order: 3,
    title: "Identidad, acceso y autenticación",
    description:
      "IAM, Active Directory intro, MFA, SSO — alineado Security+ dominio de identidad.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "autenticacion-vs-autorizacion",
        "Autenticación vs autorización",
        "Factores de autenticación, passwords vs passkeys, políticas de complejidad.",
        2,
      ),
      theoryLesson(
        "active-directory-ldap-basics",
        "Active Directory y LDAP basics",
        "OU, grupos, GPO intro, Kerberos concept para analistas.",
        3,
      ),
      theoryLesson(
        "mfa-sso-federacion",
        "MFA, SSO y federación",
        "TOTP, FIDO2, SAML/OAuth2 concept; ataques a MFA (fatigue, SIM swap).",
        3,
      ),
      theoryLesson(
        "privilegios-acceso-minimo",
        "Privilegios y acceso mínimo",
        "PAM intro, cuentas admin separadas, auditoría de permisos.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Configurar MFA y auditar cuentas en entorno AD lab",
      description:
        "En AD de laboratorio, habilitar MFA simulado, identificar cuentas con privilegios excesivos, proponer remediación documentada.",
      hours: 4,
    },
  },
  {
    order: 4,
    title: "Seguridad de red y firewalls",
    description:
      "Segmentación, IDS/IPS, proxies, reglas de firewall — defensa perimetral y zero trust intro.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "arquitecturas-red-seguras",
        "Arquitecturas de red seguras",
        "DMZ, VLANs de seguridad, microsegmentación concept.",
        3,
      ),
      theoryLesson(
        "firewalls-stateful-reglas",
        "Firewalls stateful y reglas",
        "Allow/deny, NAT, reglas mal configuradas comunes.",
        3,
      ),
      theoryLesson(
        "ids-ips-waf",
        "IDS vs IPS vs WAF",
        "Detección basada en firmas vs anomalías; cuándo alertar vs bloquear.",
        2,
      ),
      theoryLesson(
        "zero-trust-sase-conceptual",
        "Zero Trust y SASE (conceptual)",
        "Never trust, always verify; implicaciones para SOC remoto.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Configurar reglas en pfSense/OPNsense y probar bloqueo",
      description:
        "Crear reglas para permitir HTTP/HTTPS, bloquear telnet, registrar intentos; simular escaneo con nmap y verificar alertas.",
      hours: 4,
    },
  },
  {
    order: 5,
    title: "Análisis de tráfico y logs",
    description:
      "Wireshark, syslog, Windows Event Log — habilidades core del analista SOC.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "analisis-paquetes-fundamentos",
        "Fundamentos de análisis de paquetes",
        "Captura, filtros BPF, protocolos HTTP/DNS/SSH en Wireshark.",
        3,
      ),
      theoryLesson(
        "windows-event-logs-security",
        "Windows Event Logs para security",
        "Event IDs críticos (4624, 4625, 4672), PowerShell logging intro.",
        3,
      ),
      theoryLesson(
        "syslog-logs-linux",
        "Syslog y logs Linux (auth.log, journalctl)",
        "Centralización, timestamps, correlación básica.",
        2,
      ),
      theoryLesson(
        "indicadores-compromiso-iocs",
        "Indicadores de compromiso (IOCs)",
        "IPs maliciosas, hashes, dominios C2; feeds de threat intel intro.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Cazar IOCs en captura PCAP de incidente simulado",
      description:
        "Analizar PCAP provisto, identificar beaconing, exfiltración DNS tunneling (simplificado), redactar timeline de eventos.",
      hours: 4,
    },
  },
  {
    order: 6,
    title: "SIEM y operaciones SOC",
    description:
      "Splunk/Wazuh/Elastic SIEM intro, reglas de correlación, turnos y playbooks.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "que-es-siem-pipeline",
        "¿Qué es un SIEM? Pipeline de datos de seguridad",
        "Collect → normalize → correlate → alert; arquitectura típica.",
        3,
      ),
      theoryLesson(
        "reglas-deteccion-falsos-positivos",
        "Reglas de detección y falsos positivos",
        "Tuning, thresholds, MITRE mapping en alertas.",
        3,
      ),
      theoryLesson(
        "workflow-soc-triage",
        "Workflow SOC: triage, enriquecimiento, escalamiento",
        "Severidad P1–P4, SLAs, handoff a IR tier 2.",
        2,
      ),
      theoryLesson(
        "threat-intelligence-feeds",
        "Threat intelligence feeds y enriquecimiento",
        "VirusTotal, AbuseIPDB, MISP concept; contextualizar alertas.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Turno SOC simulado con Wazuh/Elastic demo",
      description:
        "Procesar 10 alertas pre-cargadas: clasificar, investigar, cerrar o escalar; documentar cada decisión en ticket.",
      hours: 4,
    },
  },
  {
    order: 7,
    title: "Hardening, vulnerabilidades y parches",
    description:
      "CIS benchmarks, scanning con Nessus/OpenVAS, gestión de parches.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "vulnerability-management-lifecycle",
        "Vulnerability management lifecycle",
        "Scan → prioritize → patch → verify; CVSS scoring intro.",
        3,
      ),
      theoryLesson(
        "hardening-windows-linux-cis",
        "Hardening Windows y Linux (CIS Level 1)",
        "Checklists aplicables: servicios, puertos, auditoría.",
        3,
      ),
      theoryLesson(
        "patch-management-ventanas",
        "Patch management y ventanas de mantenimiento",
        "WSUS, apt upgrade, rollback plans, comunicación a usuarios.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Escaneo de vulnerabilidades y plan de remediación",
      description:
        "Escanear VM vulnerable (Metasploitable o similar aislada), priorizar 5 CVEs, redactar plan de parcheo con timeline.",
      hours: 4,
    },
  },
  {
    order: 8,
    title: "Respuesta a incidentes y forensics intro",
    description:
      "NIST IR framework, cadena de custodia, comunicación de crisis.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "nist-sp80061-respuesta-incidentes",
        "NIST SP 800-61: fases de respuesta a incidentes",
        "Preparation, detection, containment, eradication, recovery, lessons learned.",
        3,
      ),
      theoryLesson(
        "playbooks-ransomware-phishing",
        "Playbooks: ransomware, phishing, cuenta comprometida",
        "Pasos concretos, quién hace qué, plantillas de comunicación.",
        3,
      ),
      theoryLesson(
        "forensics-intro-imagen-disco",
        "Forensics intro: imagen de disco y memoria",
        "Orden de volatilidad, FTK Imager/Autopsy demo, cadena de custodia.",
        2,
      ),
      {
        slug: "comunicacion-crisis-reporte-ejecutivo",
        title: "Comunicación de crisis y reporte ejecutivo",
        description:
          "Traducir incidente técnico para gerencia; post-mortem blameless.",
        type: "soft-skills" as const,
        hours: 2,
      },
    ],
    labOrProject: {
      title: "PROJECT: Simulacro de respuesta a ransomware",
      description:
        "Equipo de 3–4 estudiantes ejecuta playbook completo en escenario tabletop + lab: aislar segmento, preservar evidencia, restaurar desde backup, redactar reporte ejecutivo.",
      hours: 4,
    },
  },
  {
    order: 9,
    title: "AppSec basics, exam prep Security+ y cierre",
    description:
      "OWASP Top 10 intro, simulacros SY0-701, preparación capstone.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "owasp-top10-analistas",
        "OWASP Top 10 para analistas (no developers)",
        "SQLi, XSS, CSRF — reconocer en logs y reportar a dev team.",
        3,
      ),
      theoryLesson(
        "secure-coding-devsecops-intro",
        "Secure coding awareness y DevSecOps intro",
        "SAST/DAST concept, shift-left, pipeline security gates.",
        2,
      ),
      {
        slug: "repaso-security-sy0-701-dominios",
        title: "Repaso Security+ por dominios SY0-701",
        description:
          "Mapa de dominios, PBQs comunes, gestión del tiempo en examen.",
        type: "exam-prep" as const,
        hours: 4,
      },
      {
        slug: "simulacro-security-cronometrado",
        title: "Simulacro Security+ cronometrado",
        description:
          "90 preguntas simuladas; revisión de respuestas incorrectas en clase.",
        type: "exam-prep" as const,
        hours: 3,
      },
    ],
    labOrProject: {
      title: "LAB: Detectar SQL injection en app vulnerable (DVWA)",
      description:
        "En DVWA aislada, reproducir SQLi básico, capturar evidencia en logs, redactar ticket para equipo de desarrollo con remediación sugerida.",
      hours: 2,
    },
  },
];

export const cybersecurityAnalystCourse: NovaCollegeCourse = {
  title: "Analista de Ciberseguridad",
  slug: "cybersecurity-analyst",
  tagline:
    "Defiende redes y datos — SOC fundamentals, threat detection y Security+.",
  description:
    "Programa técnico de 120 horas que forma analistas de ciberseguridad entry-level capaces de operar en un Security Operations Center (SOC), responder incidentes y aplicar controles alineados a CompTIA Security+. Incluye labs de SIEM, análisis de logs, hardening y simulaciones de ataque/defensa en entorno controlado.",
  targetAudience:
    "Graduados del track IT Support o equivalente; estudiantes técnicos 18–25+; profesionales IT que buscan especialización en security. Conocimientos básicos de redes y Linux recomendados.",
  durationHours: 120,
  prerequisites: [
    "Fundamentos de redes (TCP/IP, DNS, firewalls)",
    "Uso de línea de comandos Windows/Linux",
    "Track NOVA IT Support & Cloud o CompTIA A+/Network+ equivalente (recomendado)",
  ],
  learningOutcomes: [
    "Explicar principios de confidencialidad, integridad, disponibilidad y modelos de amenazas (STRIDE intro).",
    "Implementar controles de identidad: MFA, RBAC, principio de least privilege y gestión de credenciales.",
    "Analizar tráfico de red y logs de sistema para detectar actividad anómala con Wireshark y SIEM simulado.",
    "Ejecutar playbooks de respuesta a incidentes: identificar, contener, erradicar, recuperar y documentar.",
    "Aplicar hardening en servidores Windows/Linux según benchmarks CIS (nivel básico).",
    "Describir vectores de ataque comunes: phishing, malware, SQL injection, XSS (conceptual + demo).",
    "Operar en turno SOC simulado: triage de alertas, clasificación de severidad y escalamiento.",
    "Prepararse para CompTIA Security+ (SY0-701) con simulacros y labs alineados a dominios oficiales.",
  ],
  certificationAlignment: {
    primary: ["CompTIA Security+ (SY0-701)"],
    secondary: [
      "CompTIA CySA+ (conceptos introductorios en módulo 8)",
      "Microsoft SC-900 (fundamentos, opcional)",
    ],
    examPrepHours: 12,
    notes:
      "Labs usan entornos aislados (VirtualBox, TryHackMe EDU, o range institucional). No se requiere explotación avanzada — foco en defensa y operaciones.",
  },
  formatBreakdown: {
    theoryHours: 48,
    labsProjectsHours: 48,
    softSkillsHours: 12,
    examPrepHours: 12,
  },
  modules: attachContentToModules(RAW_MODULES, CYBERSECURITY_ANALYST_LESSONS),
  capstone: {
    title: "Proyecto integrador: SOC mini-operación para organización ficticia",
    description:
      "Montar operación SOC de 48 horas simuladas para empresa ficticia 'NovaLogistics': desplegar SIEM demo, ingestar logs de 5 fuentes, crear 3 reglas de detección, procesar incidente inject (phishing → lateral movement simulado), entregar post-mortem y recomendaciones de hardening.",
    deliverables: [
      "Diagrama de arquitectura SOC",
      "3 reglas de detección documentadas (con MITRE mapping)",
      "Timeline de incidente con evidencia",
      "Post-mortem ejecutivo (2 páginas)",
      "Presentación de 12 minutos + demo SIEM",
    ],
    hours: 8,
  },
  assessmentRubric: {
    components: [
      {
        name: "Labs de análisis y SIEM",
        weight: 35,
        description:
          "Calidad de investigación, documentación de timeline, decisiones de triage.",
      },
      {
        name: "Simulacro de respuesta a incidentes (módulo 8)",
        weight: 20,
        description:
          "Cumplimiento de playbook, comunicación, preservación de evidencia.",
      },
      {
        name: "Capstone SOC",
        weight: 25,
        description:
          "Reglas funcionales, post-mortem coherente, demo en vivo.",
      },
      {
        name: "Simulacro Security+",
        weight: 10,
        description: "≥75% en simulacro cronometrado.",
      },
      {
        name: "Quizzes y participación",
        weight: 10,
        description: "Evaluaciones modulares y role-play SOC.",
      },
    ],
    passingCriteria:
      "Calificación final ≥80/100, capstone aprobado, participación en simulacro IR, asistencia ≥85%. Certificado NOVA College verificable en verify.novahub.education.",
  },
  facilitatorNotes: [
    "Requisito crítico: red de lab aislada (sin acceso a producción). Usar VLAN dedicada o máquinas air-gapped.",
    "TryHackMe EDU o HackTheBox Academy ofrecen paths SOC; la guía mapea labs específicos por módulo.",
    "No es necesario ser pentester: el facilitador sigue scripts de lab con respuestas esperadas.",
    "Enfatizar ética: firmar código de conducta antes del módulo 7 (scanning).",
    "Turnos SOC simulados funcionan bien en grupos de 4 con roles rotativos: triage, investigador, documentador, lead.",
    "Alternativa open-source: Wazuh + Elastic Stack en Docker para instituciones con presupuesto limitado.",
  ],
  employabilitySkills: [
    "Análisis de logs y pensamiento investigativo",
    "Trabajo en turnos y bajo presión controlada",
    "Comunicación de incidentes a audiencias mixtas",
    "Documentación forense y post-mortems",
    "Colaboración SOC/Dev/IT",
    "Ética profesional y manejo de evidencia",
    "Aprendizaje continuo (threat landscape)",
    "Atención al detalle en triage de alertas",
  ],
  verifyCertificatePrefix: "NOVA-COL-SEC",
};
