import type { NovaCollegeCourse } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { INTRO_TELECOM_LESSONS } from "./lessons/intro-telecommunications-lessons";

const RAW_MODULES = [
  {
    order: 1,
    title: "Introducción a las telecomunicaciones",
    description:
      "Industria telecom, evolución PSTN→IP, regulación de espectro y modelos de negocio de carriers e ISPs.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "telecom-industry-landscape",
        "Panorama de la industria telecom y roles profesionales",
        "Field technician, central office tech, NOC, fiber splicer, RF tech — rutas de carrera y demanda global.",
        2,
      ),
      theoryLesson(
        "pstn-to-ip-evolution",
        "Evolución: PSTN, circuit switching e IP",
        "De la red telefónica analógica al mundo all-IP; conceptos de conmutación y convergencia.",
        2,
      ),
      theoryLesson(
        "regulation-spectrum-basics",
        "Regulación, espectro radioeléctrico y compliance",
        "FCC, IFT/Superintendencias, licencias de espectro, right-of-way y permisos de obra.",
        2,
      ),
      theoryLesson(
        "carrier-isp-mvno-models",
        "Carriers, ISPs, MVNO y modelo de negocio",
        "Tier-1/2/3 carriers, wholesale, last mile, ARPU y SLAs comerciales.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Mapa del ecosistema telecom local",
      description:
        "Investigar operadores activos en tu región (móvil, fijo, ISP, tower companies). Crear diagrama de ecosistema, identificar 5 roles entry-level con requisitos y salarios orientativos. Presentar en 5 minutos.",
      hours: 3,
    },
  },
  {
    order: 2,
    title: "Fundamentos de señales y transmisión",
    description:
      "Señales analógicas y digitales, espectro, modulación y multiplexación — base física de toda telecom.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "analog-vs-digital-signals",
        "Señales analógicas vs digitales en telecom",
        "Amplitud, frecuencia, fase; muestreo, cuantización y ventajas del digital en redes modernas.",
        3,
      ),
      theoryLesson(
        "frequency-bandwidth-spectrum",
        "Frecuencia, ancho de banda y espectro",
        "Hz, kHz, MHz, GHz; relación ancho de banda/capacidad; asignación de bandas celulares y Wi-Fi.",
        3,
      ),
      theoryLesson(
        "modulation-fundamentals",
        "Modulación: AM, FM, PSK y QAM (intro)",
        "Por qué modulamos; constelaciones QAM en DOCSIS y Wi-Fi; BER intro.",
        3,
      ),
      theoryLesson(
        "multiplexing-tdm-fdm-ofdm",
        "Multiplexación: TDM, FDM y OFDM",
        "Compartir medio; OFDM en LTE/5G y Wi-Fi 6; trade-offs latencia vs throughput.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Análisis de señal con osciloscopio virtual",
      description:
        "Usar simulador o osciloscopio de banco: identificar frecuencia, amplitud y forma de onda en 3 señales. Documentar lecturas y relacionar con tipo de servicio (voz, datos, RF).",
      hours: 3,
    },
  },
  {
    order: 3,
    title: "Cableado estructurado de cobre",
    description:
      "Par trenzado UTP, estándares TIA-568, terminación, certificación y Power over Ethernet.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "twisted-pair-categories",
        "Par trenzado UTP: categorías Cat5e, Cat6, Cat6A",
        "Skew, crosstalk, NEXT/PSNEXT; distancias máximas; cable plenum vs riser.",
        3,
      ),
      theoryLesson(
        "tia-568-standards",
        "Estándares TIA/EIA-568 y documentación",
        "568A vs 568B, patch panels, IDF/MDF, etiquetado y as-built drawings.",
        3,
      ),
      theoryLesson(
        "termination-testing-copper",
        "Terminación RJ-45 y pruebas de cobre",
        "Crimpeo, punch-down, tone & probe, certifier (TDR), interpretación de resultados PASS/FAIL.",
        3,
      ),
      theoryLesson(
        "poe-standards-budgeting",
        "Power over Ethernet (PoE): estándares y budgeting",
        "802.3af/at/bt, PSE vs PD, cálculo de budget para APs, cámaras y teléfonos IP.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Crimpar, terminar y certificar 4 links de cobre",
      description:
        "Construir 2 patch cords y 2 runs a punch-down; probar con certifier o tester básico. Entregar hoja de resultados y fotos de etiquetado según TIA-606.",
      hours: 3,
    },
  },
  {
    order: 4,
    title: "Fibra óptica",
    description:
      "Monomodo/multimodo, conectores, empalmes, OTDR y aplicaciones FTTH y backbone.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "fiber-optics-principles",
        "Principios de fibra óptica y tipos de fibra",
        "Reflexión total, ventanas 850/1310/1550 nm, monomodo vs multimodo, latencia vs cobre.",
        3,
      ),
      theoryLesson(
        "connectors-splicing-loss",
        "Conectores, empalmes y pérdida de inserión",
        "LC, SC, APC vs UPC; empalme por fusión vs mecánico; budget de enlace.",
        3,
      ),
      theoryLesson(
        "otdr-power-meter",
        "OTDR y power meter — lectura e interpretación",
        "Trazas OTDR: eventos, reflectance, dead zones; medición con fuente/detector.",
        3,
      ),
      theoryLesson(
        "ftth-backbone-applications",
        "FTTH, backbone y fibra en data center",
        "PON (GPON/XGS-PON), drop cables, MPO/MTP trunks, rutas aéreas vs subterráneas.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Empalme mecánico y medición con power meter",
      description:
        "Realizar empalme mecánico en fibra de práctica, medir pérdida de inserción con power meter/light source. Documentar resultados vs budget de enlace típico.",
      hours: 3,
    },
  },
  {
    order: 5,
    title: "Wireless y redes celulares",
    description:
      "Wi-Fi, arquitectura celular LTE/5G, antenas, site survey y fixed wireless.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "wifi-standards-survey",
        "Wi-Fi: estándares 802.11 y site survey",
        "2.4 vs 5 vs 6 GHz, canales, co-channel/adjacent interference, heatmaps y AP placement.",
        3,
      ),
      theoryLesson(
        "cellular-lte-5g-architecture",
        "Arquitectura celular LTE y 5G (intro)",
        "eNodeB/gNodeB, core network, NSA vs SA, bandas n77/n78; mmWave vs sub-6.",
        3,
      ),
      theoryLesson(
        "antennas-cells-das",
        "Antenas, sectores, DAS y small cells",
        "Patrones de radiación, tilt, azimuth, in-building DAS, C-RAN concept.",
        3,
      ),
      theoryLesson(
        "fixed-wireless-cbrs",
        "Fixed wireless, CBRS y offload",
        "FWA 5G, banda CBRS 3.5 GHz, Wi-Fi offload en venues; casos de uso rural/urbano.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Site survey Wi-Fi y mapa de cobertura",
      description:
        "Recorrer edificio de lab con herramienta de survey (Ekahau demo, NetSpot o Android WiFi Analyzer). Generar heatmap, proponer ubicación de 3 APs y justificar canales.",
      hours: 3,
    },
  },
  {
    order: 6,
    title: "VoIP y comunicaciones unificadas",
    description:
      "Telefonía IP, SIP, QoS de voz, PBX cloud y troubleshooting de calidad de llamada.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "pstn-vs-voip-codecs",
        "PSTN vs VoIP: codecs y calidad de voz",
        "G.711, G.729, MOS score, packetization; cuándo migrar a IP telephony.",
        2,
      ),
      theoryLesson(
        "sip-rtp-trunks",
        "SIP, RTP y trunks — fundamentos",
        "Registrars, proxies, SBC, DIDs, E911 en VoIP; flujo de llamada SIP básico.",
        3,
      ),
      theoryLesson(
        "cloud-pbx-uc",
        "PBX cloud y UC (Teams Phone, Zoom Phone intro)",
        "Direct Routing, SBC cloud, integración con Microsoft 365; licenciamiento UC.",
        3,
      ),
      theoryLesson(
        "voip-qos-troubleshooting",
        "QoS y troubleshooting de voz sobre IP",
        "Jitter, latency, packet loss; DSCP/QoS en switches; herramientas de prueba de voz.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Configurar softphone SIP en entorno de lab",
      description:
        "Registrar softphone contra PBX de lab (Asterisk/FreePBX o cloud demo), realizar llamada interna, capturar SIP ladder con Wireshark, documentar codecs negociados.",
      hours: 3,
    },
  },
  {
    order: 7,
    title: "WAN y servicios de carrier",
    description:
      "Circuitos dedicados, MPLS, Metro Ethernet, SD-WAN intro y handoff al cliente.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "wan-circuits-dedicated",
        "Circuitos WAN: T1/E1, DIA y broadband",
        "Simetría upload/download, SLA uptime, MTTR; diferencia DIA vs cable/DSL business.",
        2,
      ),
      theoryLesson(
        "mpls-metro-ethernet",
        "MPLS y Metro Ethernet",
        "L2 vs L3 VPN, VPLS concept, handoff Ethernet en demarc; casos multi-sitio.",
        3,
      ),
      theoryLesson(
        "sd-wan-intro",
        "SD-WAN: conceptos y casos de uso",
        "Overlay, path selection, zero-touch provisioning; cuándo reemplaza MPLS parcialmente.",
        3,
      ),
      theoryLesson(
        "peering-cpe-demarc",
        "Peering, CPE y punto de demarcación",
        "IXPs, submarine cables overview; router CPE, demarc extension, smart jack.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Diseño WAN multi-sitio con matriz SLA",
      description:
        "Para empresa ficticia de 3 sucursales, proponer topología (DIA + SD-WAN o MPLS), tabla SLA por sitio, diagrama de demarc y lista de equipos CPE.",
      hours: 3,
    },
  },
  {
    order: 8,
    title: "Infraestructura de campo y operaciones",
    description:
      "Central office, POP, seguridad en torres, dispatch y documentación as-built.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "central-office-pop-edge",
        "Central office, POP y edge data centers",
        "CO tradicional vs CORD; POP de ISP; meet-me rooms; redundancia power/HVAC.",
        2,
      ),
      theoryLesson(
        "tower-climbing-safety",
        "Seguridad en torres y trabajo en altura (awareness)",
        "OSHA basics, 100% tie-off, RF exposure limits, bucket truck awareness; certificaciones tower.",
        3,
      ),
      theoryLesson(
        "field-dispatch-closeout",
        "Dispatch, tickets y close-out de campo",
        "Work orders, as-built updates, fotos de evidencia, tiempo en sitio, first-call resolution.",
        3,
      ),
      theoryLesson(
        "customer-site-soft-skills",
        "Soft skills: cliente en sitio y cumplimiento SLA",
        "Comunicación con cliente no técnico, ventanas de mantenimiento, escalamiento a NOC.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Simulación dispatch → install → close-out",
      description:
        "Role-play: recibir ticket, planificar visita, ejecutar checklist de instalación CPE simulada, completar close-out con fotos y actualización de documentación.",
      hours: 3,
    },
  },
  {
    order: 9,
    title: "Integración, certificación y proyecto final",
    description:
      "Troubleshooting telecom capa 1–3, prep Network+/fiber y simulacros de evaluación.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "telecom-troubleshooting-methodology",
        "Metodología de troubleshooting telecom (L1–L3)",
        "Layer 1 físico → Layer 3 IP; árbol de decisión; herramientas por capa.",
        3,
      ),
      theoryLesson(
        "network-plus-telecom-domains",
        "Repaso CompTIA Network+ — dominios telecom",
        "Mapa de objetivos Network+ aplicables a cableado, wireless y WAN.",
        2,
      ),
      {
        slug: "fiber-cert-prep-fot",
        title: "Prep certificación fibra (ETA FOT-NP concepts)",
        description:
          "Temario FOT: seguridad, identificación de fibra, mediciones, estándares.",
        type: "exam-prep" as const,
        hours: 3,
      },
      {
        slug: "telecom-cert-simulation",
        title: "Simulacro integrado cronometrado",
        description:
          "Escenarios mixtos cobre/fiber/wireless + preguntas tipo certificación.",
        type: "exam-prep" as const,
        hours: 2,
      },
    ],
    labOrProject: {
      title: "LAB: Escenario multi-falla — diagnóstico en 90 minutos",
      description:
        "Instructor inyecta 3 fallas (link cobre degradado, AP mal configurado, VLAN incorrecta). Equipo debe aislar, reparar y documentar timeline de resolución.",
      hours: 2,
    },
  },
];

export const introTelecommunicationsCourse: NovaCollegeCourse = {
  title: "Introducción a las Telecomunicaciones",
  slug: "intro-telecommunications",
  tagline:
    "De cobre a fibra y 5G — cableado, wireless, VoIP y field ops para el primer empleo telecom.",
  description:
    "Programa técnico de 120 horas que introduce las telecomunicaciones modernas: señales, cableado estructurado, fibra óptica, wireless/celular, VoIP, WAN y operaciones de campo. Alineado a dominios CompTIA Network+, conceptos ETA Fiber Optics Technician (FOT-NP) y BICSI Installer 1. Diferenciador NOVA College: pocos community colleges ofrecen fibra + celular + VoIP integrados en un solo track entry-level.",
  targetAudience:
    "Estudiantes 16–25+ en programas técnicos de telecom, electricidad o IT; graduados de secundaria vocacional; adultos que buscan empleo como field technician, cable installer, NOC junior o tower crew helper. Complementa idealmente el track IT Support & Cloud.",
  durationHours: 120,
  prerequisites: [
    "Manejo de computadora e internet",
    "Matemáticas básicas (porcentajes, notación métrica)",
    "Capacidad física para trabajo de campo (awareness module 8)",
    "Track NOVA IT Support & Cloud o CompTIA A+ (recomendado, no obligatorio)",
  ],
  learningOutcomes: [
    "Describir la industria telecom, roles entry-level y marco regulatorio de espectro en USA y.",
    "Explicar fundamentos de señales, modulación, multiplexación y relación frecuencia/ancho de banda.",
    "Terminar, probar y certificar cableado de cobre según TIA-568 con documentación TIA-606.",
    "Realizar empalmes básicos de fibra, medir pérdida con power meter e interpretar trazas OTDR intro.",
    "Planificar cobertura Wi-Fi con site survey y explicar arquitectura LTE/5G a nivel conceptual.",
    "Configurar softphone SIP, identificar codecs y diagnosticar problemas de calidad de voz (jitter, latency).",
    "Diseñar topología WAN multi-sitio con SLAs y distinguir MPLS, DIA, Metro-E y SD-WAN.",
    "Ejecutar workflow de dispatch/close-out de campo con documentación as-built y comunicación al cliente.",
  ],
  certificationAlignment: {
    primary: [
      "CompTIA Network+ (dominios cableado, wireless, WAN)",
      "ETA Fiber Optics Technician (FOT-NP) — alineación conceptual",
    ],
    secondary: [
      "BICSI Installer 1 (conceptual)",
      "Cisco Certified Support Technician (CCST) Networking",
      "ETA Certified Wireless Network Technician (CWNT) — módulo 5",
    ],
    examPrepHours: 12,
    notes:
      "Instituciones pueden bundlear vouchers ETA FOT o CompTIA Network+. Labs de fibra requieren kit de empalme institucional (~$800–1500 USD). Alternativa: simuladores + fibra de práctica sin fusion splicer.",
  },
  formatBreakdown: {
    theoryHours: 48,
    labsProjectsHours: 48,
    softSkillsHours: 12,
    examPrepHours: 12,
  },
  modules: attachContentToModules(RAW_MODULES, INTRO_TELECOM_LESSONS),
  capstone: {
    title:
      "Proyecto integrador: Diseño e instalación telecom para PYME multi-sitio",
    description:
      "Diseñar solución completa para clínica o retail ficticio con 2 sedes: cableado Cat6 certificado, enlace de fibra entre IDF/MDF, Wi-Fi con site survey, 8 extensiones VoIP cloud, CPE WAN con SLA, y paquete de close-out (as-builts, fotos, runbook de troubleshooting). Presentar ante panel simulado de carrier/ISP.",
    deliverables: [
      "Diagramas: cableado, fibra, Wi-Fi heatmap, WAN topology",
      "Bill of materials (BOM) con costos orientativos",
      "As-built drawings etiquetados TIA-606",
      "Runbook L1 con 10 escenarios de falla",
      "Presentación oral 12 min + demo de documentación",
    ],
    hours: 8,
  },
  assessmentRubric: {
    components: [
      {
        name: "Labs modulares (cobre, fibra, Wi-Fi, VoIP)",
        weight: 40,
        description:
          "PASS/FAIL en certificación de links, mediciones dentro de budget, documentación completa.",
      },
      {
        name: "Capstone integrador",
        weight: 25,
        description:
          "Diseño coherente, BOM realista, as-builts usables por tercero.",
      },
      {
        name: "Simulacro Network+/telecom",
        weight: 15,
        description: "≥70% en simulacro cronometrado integrado.",
      },
      {
        name: "Soft skills y role-play de campo",
        weight: 10,
        description:
          "Dispatch/close-out, comunicación con cliente, cumplimiento checklist.",
      },
      {
        name: "Quizzes teóricos modulares",
        weight: 10,
        description: "Promedio ≥75% en evaluaciones de señales, fibra y celular.",
      },
    ],
    passingCriteria:
      "Calificación final ≥80/100, 100% labs entregados, capstone aprobado, asistencia ≥85%. Certificado verificable NOVA-COL-TEL emitido al completar (independiente de exámenes CompTIA/ETA externos).",
  },
  facilitatorNotes: [
    "Equipamiento mínimo: kit crimpeo/certifier cobre, kit empalme mecánico fibra, power meter, tone & probe, 2 APs para survey, PBX lab (FreePBX en VM).",
    "No se requiere fusion splicer para completar el track — empalme mecánico es suficiente entry-level.",
    "Módulo 8 tower safety es awareness only; no sustituye certificación OSHA/tower climbing oficial.",
    "Partnership con ISP local o tower company para visita de campo de 2 horas aumenta empleabilidad.",
    "Co-docencia: instructor de electricidad puede facilitar módulos 2–4; especialista VoIP módulo 6.",
    "Enfatizar documentación fotográfica — carriers e ISPs evalúan close-out packages en entrevistas.",
  ],
  employabilitySkills: [
    "Lectura de diagramas y as-built drawings",
    "Uso de herramientas de medición (certifier, OTDR, power meter)",
    "Troubleshooting sistemático capa 1–3",
    "Trabajo en campo con cliente presente",
    "Seguridad en obra y RF awareness",
    "Documentación TIA-606 y close-out profesional",
    "Comunicación técnica con dispatch/NOC",
    "Cumplimiento de SLA y ventanas de mantenimiento",
  ],
  pathwayBridge: {
    relatedPathwaySlug: "iot-smart-systems",
    notes:
      "Continúa naturalmente hacia IoT College (sensores + conectividad) o IT Support & Cloud (Network+ completo).",
  },
  verifyCertificatePrefix: "NOVA-COL-TEL",
};
