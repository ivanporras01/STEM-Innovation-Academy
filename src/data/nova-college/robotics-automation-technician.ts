import type { NovaCollegeCourse, NovaCollegeModule } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { ROBOTICS_AUTOMATION_LESSONS } from "./lessons/robotics-automation-technician-lessons";

const RAW_MODULES: NovaCollegeModule[] = [
  {
    order: 1,
    title: "Industria 4.0 y fundamentos de automatización",
    description:
      "Panorama de la manufactura moderna, componentes de automatización, seguridad LOTO/E-stop y lectura de diagramas eléctricos y neumáticos.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "industria-40-roles",
        "Industria 4.0 y roles de automatización",
        "Automation technician, PLC programmer junior, maintenance tech, robot operator — demand in global manufacturing.",
        2,
      ),
      theoryLesson(
        "automation-system-components",
        "Componentes de sistemas de automatización",
        "Sensores, actuadores, controladores, HMI, variadores, redes de campo — flujo señal → lógica → potencia.",
        2,
      ),
      theoryLesson(
        "safety-loto-e-stop",
        "Seguridad industrial: LOTO y paro de emergencia (E-stop)",
        "Lockout/Tagout, categorías de paro, relés de seguridad, EN ISO 13849 awareness — personas antes que producción.",
        3,
      ),
      theoryLesson(
        "electrical-pneumatic-schematics",
        "Diagramas eléctricos y neumáticos",
        "Símbolos IEC/NFPA, ladder vs esquema unifilar, P&ID intro, numeración de hilos y revisión de planos as-built.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Recorrido de planta virtual y checklist LOTO",
      description:
        "Identificar 8 componentes en diagrama de célula, marcar puntos de LOTO, simular E-stop y completar permiso de trabajo seguro firmado.",
      hours: 5,
    },
  },
  {
    order: 2,
    title: "Electromecánica, 24V DC y sensores",
    description:
      "Circuitos de control industrial, sensores de proximidad, fotoeléctricos, encoders e instrumentación con multímetro y osciloscopio.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "dc-24v-control-circuits",
        "Circuitos de control 24V DC",
        "Fuente conmutada, common, sinking/sourcing, fusibles, borneras DIN rail — cableado seguro en panel de control.",
        3,
      ),
      theoryLesson(
        "proximity-sensors",
        "Sensores de proximidad",
        "Inductivos, capacitivos, PNP vs NPN, distancia de detección, blindaje y montaje en fixtures.",
        2,
      ),
      theoryLesson(
        "photoelectric-encoders",
        "Fotoeléctricos y encoders",
        "Modos barrera/reflex/difuso, encoders incrementales vs absolutos, resolución PPR y cableado diferencial intro.",
        3,
      ),
      theoryLesson(
        "multimeter-oscilloscope-industrial",
        "Multímetro y osciloscopio en entorno industrial",
        "Medición 24V, pulsos de encoder, duty cycle, trigger en señales ruidosas — diagnóstico sin adivinar.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Caracterización de sensores y señales 24V",
      description:
        "Cablear proximidad PNP/NPN y fotoeléctrico, medir con DMM, capturar pulso de encoder en scope, tabla de especificaciones vs medido.",
      hours: 4,
    },
  },
  {
    order: 3,
    title: "Arquitectura PLC y ladder logic",
    description:
      "Hardware PLC, ciclo de scan, contactos NO/NC y primera programación en TIA Portal con S7-1200 simulado.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "plc-architecture",
        "Arquitectura de PLC",
        "CPU, módulos I/O, backplane, memoria, watchdog, redundancia awareness — Siemens S7-1200/1500 y alternativas.",
        3,
      ),
      theoryLesson(
        "plc-scan-cycle",
        "Ciclo de scan del PLC",
        "Input scan → program → output update; latencia, jitter, tareas cíclicas vs eventos — por qué importa en secuencias.",
        2,
      ),
      theoryLesson(
        "ladder-logic-no-nc",
        "Ladder logic: contactos NO/NC",
        "Relés virtuales, bobinas, rungs, energía de bobina, convenciones de nomenclatura y comentarios en ladder.",
        3,
      ),
      theoryLesson(
        "tia-portal-intro",
        "Introducción a TIA Portal",
        "Proyecto, hardware config, PLCSIM, descarga, online monitoring, force prohibido en producción.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Primer programa ladder — marcha/paro con E-stop",
      description:
        "Programar start/stop con contacto NC de E-stop en TIA Portal + PLCSIM, documentar rung por rung y probar escenarios de falla.",
      hours: 4,
    },
  },
  {
    order: 4,
    title: "Programación PLC avanzada",
    description:
      "Temporizadores, contadores, secuencias con interlocks y function blocks — lógica de proceso real.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "timers-ton-tof-tp",
        "Temporizadores: TON, TOF y TP",
        "On-delay, off-delay, pulso, presets en ms, cascada de timers para secuencias temporizadas.",
        3,
      ),
      theoryLesson(
        "counters-ctu",
        "Contadores CTU",
        "Count up, reset, preset, overflow, aplicaciones de conteo de piezas y lotes.",
        2,
      ),
      theoryLesson(
        "sequences-interlocks",
        "Secuencias e interlocks",
        "Grafcet intro, pasos, condiciones de avance, interlocks mutuos, anti-colisión en actuadores.",
        3,
      ),
      theoryLesson(
        "function-blocks-scl",
        "Function blocks y SCL intro",
        "FB vs FC, instancias, encapsular lógica reutilizable, cuándo escalar de ladder a SCL estructurado.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Secuencia automatizada con timers, contador e interlocks",
      description:
        "Implementar secuencia de 4 pasos (ej. llenado/dosificado) con CTU y TON, interlock entre cilindros simulados, HMI tags básicos.",
      hours: 4,
    },
  },
  {
    order: 5,
    title: "Neumática e hidráulica industrial",
    description:
      "Unidades FRL, cilindros, válvulas 5/2, diagramas ISO y fundamentos hidráulicos para mantenimiento entry-level.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "pneumatics-frl",
        "Neumática: unidad FRL",
        "Filtro, regulador, lubricador, presión de trabajo, caudal y mantenimiento preventivo de aire comprimido.",
        3,
      ),
      theoryLesson(
        "cylinders-valves-5-2",
        "Cilindros y válvulas 5/2",
        "Simple/doble efecto, solenoide mono/bi-estable, tiempo de ciclo, amortiguación y sensores de fin de carrera.",
        3,
      ),
      theoryLesson(
        "iso-pneumatic-diagrams",
        "Diagramas neumáticos ISO",
        "Símbolos ISO 1219, lectura de esquema, numeración de válvulas, lista de materiales neumática.",
        2,
      ),
      theoryLesson(
        "hydraulics-intro",
        "Hidráulica industrial (intro)",
        "Presión vs caudal, bombas, cilindros hidráulicos, diferencias vs neumática, seguridad de alta presión awareness.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Montaje neumático en banco didáctico",
      description:
        "Armar circuito 5/2 con doble cilindro, ajustar FRL, medir tiempos de extensión/retracción, documentar diagrama ISO as-built.",
      hours: 4,
    },
  },
  {
    order: 6,
    title: "HMI, SCADA y redes industriales",
    description:
      "Diseño de pantallas operador, SCADA, Modbus/Profinet e integración PLC-HMI para supervisión de planta.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "hmi-design-principles",
        "Diseño de HMI",
        "Jerarquía de alarmas, colores ISA-101, navegación, faceplates, UX en piso de planta con guantes y presión.",
        3,
      ),
      theoryLesson(
        "scada-overview",
        "SCADA: panorama general",
        "Historian, tags, tendencias, roles operador/supervisor, diferencia HMI local vs SCADA corporativo.",
        2,
      ),
      theoryLesson(
        "modbus-profinet",
        "Modbus y Profinet",
        "Modbus RTU/TCP registros, Profinet IO, GSD, diagnóstico de red industrial, switches managed intro.",
        3,
      ),
      theoryLesson(
        "plc-hmi-integration",
        "Integración PLC-HMI",
        "Tags, animaciones, alarmas, recetas, sincronización de hora, backup de proyecto coordinado.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Pantalla HMI con alarmas y trending",
      description:
        "Conectar HMI (WinCC Unified / FactoryTalk View SE demo) a PLC simulado, 3 alarmas prioritizadas, trend de contador CTU, export de backup.",
      hours: 4,
    },
  },
  {
    order: 7,
    title: "Robótica industrial, cobots, ESP32 y ROS 2",
    description:
      "Manipuladores vs cobots colaborativos, AMR de servicio logístico, gateway ESP32 (Wokwi) en célula y fundamentos ROS 2.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "industrial-robotics-cobots",
        "Robótica industrial y cobots colaborativos",
        "Articulados, SCARA, delta vs cobots UR/Fanuc; ISO 10218, zonas de seguridad, teach pendant y programación sin jaula fija.",
        2,
      ),
      theoryLesson(
        "service-robotics-amr",
        "Robótica de servicio y AMR logísticos",
        "AMR en almacén, hospital y retail; navegación SLAM intro, flotas, integración con WMS/MES y mantenimiento de campo.",
        2,
      ),
      theoryLesson(
        "esp32-robotics-gateway",
        "ESP32 como gateway en célula robótica",
        "NOVA Explorer Kit ESP32: sensores I2C, MQTT/Modbus bridge, telemetría OEE, Wokwi fallback sin hardware en planta.",
        2,
      ),
      theoryLesson(
        "ros2-ecosystem",
        "Ecosistema ROS 2",
        "Distribuciones Humble, colcon, paquetes, launch files, simulación vs hardware real — cuándo ROS complementa PLC y cobots.",
        2,
      ),
      theoryLesson(
        "ros2-nodes-topics-pubsub",
        "ROS 2: nodes, topics y pub/sub",
        "rclcpp/rclpy, publishers/subscribers, QoS básico, ros2 topic echo/list — arquitectura distribuida para AMR y brazos simulados.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Gateway ESP32 + primer topic ROS 2 simulado",
      description:
        "Publicar telemetría de sensor desde Wokwi ESP32 vía serial/MQTT; en Ubuntu, crear workspace ROS 2, pub/sub topic custom y visualizar en RViz2 demo (TurtleBot3 sim opcional).",
      hours: 2,
    },
  },
  {
    order: 8,
    title: "Soft skills y operaciones en planta",
    description:
      "Comunicación en turno, trabajo con operadores, documentación técnica y empleabilidad para técnicos de automatización.",
    contactHours: 12,
    lessons: [
      {
        slug: "shift-handover-plant-communication",
        title: "Relevos de turno y comunicación en planta",
        description:
          "Pass-down estructurado, bitácora de producción, reporte de anomalías, coordinación con mantenimiento y producción.",
        type: "soft-skills",
        hours: 3,
      },
      {
        slug: "troubleshooting-with-operators",
        title: "Troubleshooting junto a operadores",
        description:
          "Escuchar síntomas sin jerga, observar HMI con operador, validar antes de reset, evitar culpar al turno anterior.",
        type: "soft-skills",
        hours: 3,
      },
      {
        slug: "plc-documentation-as-built",
        title: "Documentación técnica PLC y as-built",
        description:
          "Comentarios en ladder, lista de I/O, change log, versionado de proyecto, export seguro sin credenciales.",
        type: "soft-skills",
        hours: 3,
      },
      {
        slug: "automation-career-interviews",
        title: "Entrevistas y carrera en automatización",
        description:
          "CV técnico, keywords Siemens/Allen-Bradley/ROS/cobots, STAR sobre downtime resuelto, portafolio de labs Factory I/O.",
        type: "soft-skills",
        hours: 3,
      },
    ],
    labOrProject: {
      title: "PROJECT: Role-play — incidente de línea en turno",
      description:
        "Equipo recibe alarma simulada, ejecuta pass-down, documenta acciones en bitácora, comunica a producción tiempo estimado de reparación.",
      hours: 0,
    },
  },
  {
    order: 9,
    title: "Integración, certificación y proyecto Factory I/O",
    description:
      "Repaso transversal, simulacros de certificación Siemens/PLC y cierre con célula automatizada en Factory I/O.",
    contactHours: 12,
    lessons: [
      {
        slug: "siemens-plc-cert-prep",
        title: "Prep certificación Siemens PLC (S7 TIA Portal awareness)",
        description:
          "Mapa de competencias Siemens, simulacro de preguntas ladder/HMI, recursos de estudio post-curso.",
        type: "exam-prep",
        hours: 3,
      },
      {
        slug: "robotics-automation-cert-simulation",
        title: "Simulacro integrado automatización",
        description:
          "Escenarios cronometrados: diagrama → ladder → HMI tag → diagnóstico Modbus — evaluación tipo certificación.",
        type: "exam-prep",
        hours: 3,
      },
      {
        slug: "factory-io-automation-cell",
        title: "Proyecto Factory I/O — célula de automatización",
        description:
          "Diseñar y programar célula completa en Factory I/O con PLC simulado: sensores, actuadores, secuencia, alarmas y OEE básico.",
        type: "project",
        hours: 4,
      },
    ],
    labOrProject: {
      title: "Simulacro final y plan de certificación personal",
      description:
        "Completar simulacro cronometrado, analizar brechas por dominio (PLC, neumática, HMI, cobots/ESP32 intro), calendario de estudio post-curso.",
      hours: 2,
    },
  },
];

export const roboticsAutomationTechnicianCourse: NovaCollegeCourse = {
  title: "Técnico en Robótica y Automatización",
  slug: "robotics-automation-technician",
  tagline:
    "Industria 4.0 en planta — PLC, cobots, ESP32, neumática y robótica de servicio para el técnico entry-level.",
  description:
    "Programa técnico de 120 horas que forma técnicos capaces de operar en manufactura y servicios automatizados: leer diagramas eléctricos y neumáticos, programar PLCs en TIA Portal (intro ladder), integrar HMI/SCADA, diagnosticar sensores 24V, configurar cobots colaborativos y AMR logísticos, desplegar gateway ESP32 con Wokwi fallback, y dar primeros pasos en ROS 2. Combina seguridad industrial (LOTO/E-stop), neumática ISO, redes Modbus/Profinet y simulación Factory I/O — empleabilidad entry-level en manufactura global.",
  targetAudience:
    "Estudiantes 16–25+ en programas técnicos de mecatrónica, electromecánica o electricidad industrial; graduados del pathway NOVA Robotics; técnicos de mantenimiento que buscan upskill en PLC y robótica industrial. Complementa idealmente Electronics College o IoT College.",
  durationHours: 120,
  prerequisites: [
    "Álgebra básica y lectura de diagramas",
    "Fundamentos de electricidad DC (recomendado: NOVA Electronics College o equivalente)",
    "Manejo de PC y Linux/Ubuntu básico (para módulo ROS 2)",
    "Inglés técnico en manuales Siemens/ROS (se enseña vocabulario clave)",
  ],
  learningOutcomes: [
    "Describir Industria 4.0, roles de automatización y aplicar LOTO/E-stop antes de intervenir en células robotizadas o neumáticas.",
    "Leer diagramas eléctricos y neumáticos ISO; cablear circuitos 24V DC con sensores PNP/NPN y gateway ESP32 para telemetría.",
    "Programar ladder logic intro en TIA Portal: marcha/paro, TON/TOF/TP, CTU y secuencias con interlocks.",
    "Diferenciar robots industriales, cobots colaborativos y AMR de servicio; aplicar awareness ISO 10218 en piso de planta.",
    "Configurar neumática FRL, válvulas 5/2 y cilindros; documentar circuito ISO as-built.",
    "Diseñar HMI usable en planta; integrar PLC con Modbus/Profinet y telemetría ESP32/MQTT opcional.",
    "Crear nodes/topics ROS 2 básicos y simular integración con AMR o brazo en entorno educativo.",
    "Diagnosticar fallas con multímetro, osciloscopio y monitoreo online PLC; documentar cambios y comunicar en turno.",
  ],
  certificationAlignment: {
    primary: [
      "Siemens SITRAIN — TIA Portal programming (S7-1200 awareness)",
      "Siemens Industrial Networks / Profinet fundamentals",
      "ROS 2 Humble — official tutorials completion (certificate of completion)",
    ],
    secondary: [
      "Universal Robots Academy — cobot awareness (online)",
      "ISA Certified Automation Professional (CAP) — domain awareness",
      "Factory I/O Certified User (partner program)",
    ],
    examPrepHours: 12,
    notes:
      "Kit institucional recomendado: banco neumático didáctico, PLC S7-1200 o PLCSIM, NOVA Explorer Kit ESP32, licencia Factory I/O, PC Ubuntu para ROS 2. Cobots físicos opcionales — simulación UR/Fanuc demo y Wokwi cubren brecha. Costo estimado $2,500–5,500 USD por estación de 2 estudiantes.",
  },
  formatBreakdown: {
    theoryHours: 48,
    labsProjectsHours: 48,
    softSkillsHours: 12,
    examPrepHours: 12,
  },
  modules: attachContentToModules(RAW_MODULES, ROBOTICS_AUTOMATION_LESSONS),
  capstone: {
    title: "Capstone: Célula de automatización integrada",
    description:
      "Diseñar, simular y documentar una célula de manufactura ligera — ej. estación pick-and-place con cobot simulado, llenado/dosificado o conveyor sorting — con PLC (TIA Portal o Factory I/O), HMI con alarmas, gateway ESP32 opcional para OEE, neumática o actuadores simulados, tags Modbus y backup completo. Incluye FMEA lite de 3 modos de falla, LOTO específico y demo oral ante plant manager simulado.",
    deliverables: [
      "Diagrama eléctrico/neumático as-built (IEC/ISO)",
      "Proyecto PLC exportado con comentarios en ladder",
      "Pantallas HMI con mínimo 5 alarmas priorizadas",
      "Procedimiento LOTO y checklist de puesta en marcha",
      "Informe OEE/downtime simulado (3 escenarios)",
      "Demo oral 12 minutos + Q&A",
    ],
    hours: 8,
  },
  assessmentRubric: {
    components: [
      {
        name: "Labs modulares (PLC, neumática, sensores, ESP32/ROS)",
        weight: 40,
        description:
          "Programas funcionales, mediciones verificadas, documentación de I/O y capturas HMI/RViz/Wokwi.",
      },
      {
        name: "Capstone célula de automatización",
        weight: 25,
        description:
          "Secuencia completa en Factory I/O o hardware, LOTO documentado, demo estable.",
      },
      {
        name: "Proyecto Factory I/O (módulo 9)",
        weight: 10,
        description:
          "Célula con sensores, actuadores, alarmas y OEE básico — entrega según rúbrica.",
      },
      {
        name: "Simulacros de certificación PLC",
        weight: 15,
        description: "≥70% en simulacro integrado ladder/HMI/redes cronometrado.",
      },
      {
        name: "Soft skills y documentación",
        weight: 10,
        description:
          "Role-play de turno, change log de PLC, comunicación con operadores.",
      },
    ],
    passingCriteria:
      "Calificación final ≥80/100, capstone aprobado, 100% labs entregados, cero violaciones de seguridad (LOTO). Certificado NOVA-COL-ROBOT verificable en verify.novahub.education.",
  },
  facilitatorNotes: [
    "Priorizar seguridad: LOTO en banco neumático real, E-stop cableado NC, nunca force outputs en PLC con actuadores conectados.",
    "TIA Portal puede ser PLCSIM-only si no hay hardware S7-1200 — Factory I/O cubre la brecha de integración visual.",
    "Licencia educativa Factory I/O es altamente recomendada; alternativa open-source: OpenPLC + simuladores 3D limitados.",
    "Módulo 7: cobots físicos opcionales; UR/Fanuc sim + Wokwi ESP32 + TurtleBot3 sim cubren labs sin hardware costoso.",
    "ESP32 labs usan Arduino IDE o PlatformIO — alinear con NOVA Explorer Kit; Wokwi obligatorio como fallback.",
    "Co-docencia con instructor de Electronics para módulo 2 (24V/sensores) acelera diagnóstico.",
    "Partnership con planta local para visita de 2 horas (control room + maintenance shop) aumenta retención y empleabilidad.",
    "Backup de proyectos PLC en repositorio institucional git — enseñar versionado desde día 1.",
  ],
  employabilitySkills: [
    "Lectura de diagramas eléctricos y neumáticos",
    "Programación ladder en TIA Portal",
    "LOTO y seguridad de maquinaria",
    "Diagnóstico con multímetro y osciloscopio",
    "Integración HMI, Modbus/Profinet y gateway ESP32",
    "Operación de cobots y AMR de servicio (awareness)",
    "Documentación as-built y change control",
    "Comunicación con operadores de producción",
    "Troubleshooting sistemático bajo presión de línea",
  ],
  pathwayBridge: {
    relatedPathwaySlug: "robotics-engineering",
    notes:
      "Continúa el pathway NOVA Robotics K-12 hacia empleabilidad industrial. Combina con Electronics College (24V/sensores) e IoT College (edge/MQTT en planta). Graduados pueden escalar a Robotics Engineering pathway avanzado o certificaciones Siemens/UR formales.",
  },
  verifyCertificatePrefix: "NOVA-COL-ROBOT",
};
