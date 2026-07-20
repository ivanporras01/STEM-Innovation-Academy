import type { NovaCollegeCourse } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { ELECTRONICS_LESSONS } from "./lessons/electronics-technician-lessons";

const RAW_MODULES = [
  {
    order: 1,
    title: "Introducción a la electrónica y seguridad",
    description:
      "Industria electrónica, unidades SI, seguridad en banco y ESD — fundamento de todo trabajo técnico.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "electronics-industry-roles",
        "Industria electrónica y roles entry-level",
        "Electronics technician, assembler, test tech, field service, avionics helper — global demand.",
        2,
      ),
      theoryLesson(
        "si-units-schematic-basics",
        "Unidades SI, notación y lectura de esquemáticos",
        "Volt, amp, ohm, watt; prefijos m/k/mµ; símbolos IEEE y flujo de lectura de diagramas.",
        2,
      ),
      theoryLesson(
        "lab-safety-esd",
        "Seguridad en laboratorio y ESD",
        "EPI, ventilación soldadura, descarga electrostática, mats/wrist straps, LOTO awareness.",
        2,
      ),
      theoryLesson(
        "tools-bench-setup",
        "Herramientas de banco y organización",
        "DMM, soldador, breadboard, osciloscopio, fuente variable — kit mínimo institucional.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Setup de banco ESD-safe y primer inventario",
      description:
        "Configurar estación ESD (mat + pulsera), identificar herramientas, completar checklist de seguridad firmado, localizar 10 componentes en kit por código de color/valor.",
      hours: 3,
    },
  },
  {
    order: 2,
    title: "Circuitos de corriente continua (DC)",
    description:
      "Ley de Ohm, series/paralelo, Leyes de Kirchhoff y divisores — análisis y breadboard.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "ohm-law-power",
        "Ley de Ohm y potencia eléctrica",
        "V=IR, P=VI=I²R; relación lineal; límites de disipación en resistores.",
        3,
      ),
      theoryLesson(
        "series-parallel-circuits",
        "Circuitos en serie y paralelo",
        "Req serie/paralelo, corriente vs voltaje en cada topología, reglas de combinación.",
        3,
      ),
      theoryLesson(
        "kirchhoff-laws",
        "Leyes de Kirchhoff: KCL y KVL",
        "Nodos y mallas; conservación de carga y energía; resolución de circuitos simples.",
        3,
      ),
      theoryLesson(
        "voltage-current-dividers",
        "Divisores de voltaje y corriente",
        "Fórmulas, cargas conectadas, sensado y referencias en sistemas reales.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Breadboard — divisores y verificación con DMM",
      description:
        "Armar 3 circuitos (serie, paralelo, divisor de voltaje), calcular teórico, medir con DMM, error <5%. Entregar tabla teórico vs medido.",
      hours: 3,
    },
  },
  {
    order: 3,
    title: "Corriente alterna (AC) y componentes reactivos",
    description:
      "AC sinusoidal, capacitores, inductores, transformadores y filtros pasivos intro.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "ac-sine-wave-basics",
        "AC sinusoidal: amplitud, frecuencia y fase",
        "RMS vs pico, periodo, Hz; por qué AC domina distribución eléctrica.",
        3,
      ),
      theoryLesson(
        "capacitors-rc-behavior",
        "Capacitores: carga, descarga y constante RC",
        "Farad, código de colores no aplica — lectura de marcado; filtros paso bajo/alto intro.",
        3,
      ),
      theoryLesson(
        "inductors-transformers",
        "Inductores y transformadores",
        "Henrio, back-EMF, relación de espiras, aislamiento galvánico, fuentes AC.",
        3,
      ),
      theoryLesson(
        "reactance-impedance-intro",
        "Reactancia e impedancia (intro)",
        "Xc, Xl, impedancia en serie RC/RL — concepto para lectura de osciloscopio.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Curva de carga RC y medición con osciloscopio",
      description:
        "Armar circuito RC, observar constante de tiempo en scope, comparar τ teórico vs medido. Capturar screenshot de forma de onda.",
      hours: 3,
    },
  },
  {
    order: 4,
    title: "Semiconductores y dispositivos discretos",
    description:
      "Diodos, LEDs, reguladores, transistores BJT/MOSFET — polarización y aplicaciones básicas.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "diodes-rectification",
        "Diodos: rectificación y protección",
        "Polarización directa/inversa, puente rectificador, diodo flyback en relés.",
        3,
      ),
      theoryLesson(
        "leds-biasing",
        "LEDs: polarización y cálculo de resistencia",
        "Vf, If, eficiencia; calcular R limitadora; PWM dimming intro.",
        2,
      ),
      theoryLesson(
        "bjt-transistor-basics",
        "Transistores BJT: conmutación y amplificación",
        "NPN/PNP, saturación/corte, ganancia β, uso como switch para relés.",
        3,
      ),
      theoryLesson(
        "mosfet-basics",
        "MOSFET: conmutación de potencia",
        "N-channel low-side switch, Vgs, Rds(on), vs BJT en cargas mayores.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Driver LED + transistor switch para carga",
      description:
        "Diseñar driver LED con resistencia calculada; agregar BJT/MOSFET conmutando motor pequeño o relé — verificar con DMM y documentar esquemático.",
      hours: 3,
    },
  },
  {
    order: 5,
    title: "Electrónica digital y microcontroladores",
    description:
      "Binario, compuertas lógicas, familias TTL/CMOS, intro Arduino/ESP32 para lectura de sensores.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "binary-hex-logic-levels",
        "Binario, hexadecimal y niveles lógicos",
        "0/1, HIGH/LOW, 3.3V vs 5V, tolerancia de entrada, no conectar 5V a 3.3V.",
        2,
      ),
      theoryLesson(
        "logic-gates-truth-tables",
        "Compuertas lógicas y tablas de verdad",
        "AND, OR, NOT, NAND, XOR; álgebra booleana básica; chips 74HC series.",
        3,
      ),
      theoryLesson(
        "flip-flops-counters-intro",
        "Flip-flops y contadores (intro)",
        "Memoria básica, registros, división de frecuencia — awareness para troubleshooting.",
        3,
      ),
      theoryLesson(
        "microcontroller-intro",
        "Microcontroladores: Arduino/ESP32 intro",
        "GPIO, ADC, PWM, lectura de datasheet pinout; rol del firmware en sistemas.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Compuertas en breadboard + LED logic probe",
      description:
        "Implementar AND/OR con 74HC08/32, verificar tabla de verdad. Opcional: blink con Arduino/ESP32 y lectura ADC de potenciómetro.",
      hours: 3,
    },
  },
  {
    order: 6,
    title: "Instrumentos de medición y datasheets",
    description:
      "DMM avanzado, osciloscopio, generador de funciones, lectura de hojas de datos.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "dmm-advanced-measurements",
        "Multímetro digital: mediciones avanzadas",
        "V, I, R, continuidad, diodo test, hFE, capacitancia — evitar errores comunes.",
        3,
      ),
      theoryLesson(
        "oscilloscope-fundamentals",
        "Osciloscopio: timebase, trigger y canales",
        "V/div, s/div, edge trigger, medición Vpp, frecuencia, duty cycle.",
        3,
      ),
      theoryLesson(
        "function-generator-probes",
        "Generador de funciones y sondas",
        "Señales sinus/cuadrada, amplitud offset, impedancia 50Ω vs 1MΩ, sonda x10.",
        2,
      ),
      theoryLesson(
        "reading-datasheets",
        "Lectura de datasheets",
        "Absolute max ratings, typical vs max, pinout, application notes — skill employability.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Characterization de señal desconocida",
      description:
        "Instructor provee caja negra con salida; medir Vpp, frecuencia, forma de onda, inferir circuito (RC, square wave, etc.). Informe de 1 página.",
      hours: 2,
    },
  },
  {
    order: 7,
    title: "Soldadura, PCB y ensamble",
    description:
      "Through-hole y SMD básico, IPC-A-610 awareness, rework y control de calidad.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "soldering-through-hole",
        "Soldadura through-hole: técnicas y defectos",
        "Temperatura, flux, fillet correcto, frío/cold joint, bridges — criterios visuales.",
        3,
      ),
      theoryLesson(
        "smd-soldering-basics",
        "SMD básico: 0805, SOIC, drag solder intro",
        "Estación de aire, pasta, microscopio; cuándo escalar a rework station.",
        2,
      ),
      theoryLesson(
        "ipc-610-quality-standards",
        "IPC-A-610: estándares de aceptación visual",
        "Clase 1/2/3, defectos aceptables/rechazables — lenguaje de manufacturing.",
        3,
      ),
      theoryLesson(
        "pcb-layout-awareness",
        "PCB: capas, trazas y awareness de diseño",
        "Top/bottom, ground plane, clearance, silkscreen — lectura de board fab files intro.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Ensamble kit PCB institucional (sirena, sensor o blinky)",
      description:
        "Soldar kit completo, inspección IPC clase 2, prueba funcional, fotos top/bottom. Rework de un joint frío intencional del instructor.",
      hours: 2,
    },
  },
  {
    order: 8,
    title: "Sistemas aplicados: potencia, motores y control",
    description:
      "Fuentes de alimentación, relés, motores DC, protecciones y paneles industriales intro.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "power-supplies-linear-switching",
        "Fuentes lineales vs conmutadas (SMPS)",
        "Reguladores 7805/LM317, buck/boost concept, ripple, eficiencia, ripple troubleshooting.",
        3,
      ),
      theoryLesson(
        "relays-contactors-protection",
        "Relés, contactores y protección",
        "Bobina, contactos NO/NC, diodo flyback, fusibles, breakers — seguridad.",
        2,
      ),
      theoryLesson(
        "dc-motors-drivers",
        "Motores DC y drivers H-bridge intro",
        "Back-EMF, PWM speed control, driver IC — enlace a robótica/industrial.",
        3,
      ),
      theoryLesson(
        "industrial-panels-awareness",
        "Paneles industriales y cableado de control",
        "DIN rail, terminal blocks, numeración de hilos, NEC/NOM awareness en control circuits.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Fuente regulada + relay switch con protección",
      description:
        "Armar fuente 5V/12V regulada, conmutar carga con relay + transistor/MOSFET, fusible y diodo flyback. Medir ripple con scope.",
      hours: 2,
    },
  },
  {
    order: 9,
    title: "Troubleshooting, certificación y proyecto final",
    description:
      "Metodología de diagnóstico, prep ETA DC/AC, simulacro y cierre del capstone.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "electronics-troubleshooting-method",
        "Metodología de troubleshooting electrónico",
        "Divide and conquer, señal vs potencia, smell/hot components, schematic-first.",
        3,
      ),
      theoryLesson(
        "eta-associate-prep",
        "Prep ETA Associate Certified Electronics Technician (DC/AC)",
        "Mapa de dominios ETA, simulacro de preguntas, recursos de estudio post-curso.",
        2,
      ),
      {
        slug: "ipc-workmanship-review",
        title: "Repaso IPC workmanship y checklist de calidad",
        description: "Inspección final tipo línea de producción — criterios clase 2.",
        type: "exam-prep" as const,
        hours: 3,
      },
      {
        slug: "electronics-cert-simulation",
        title: "Simulacro integrado DC/AC/digital",
        description: "Problemas mixtos cronometrados — cálculo + interpretación de mediciones.",
        type: "exam-prep" as const,
        hours: 2,
      },
    ],
    labOrProject: {
      title: "LAB: Diagnóstico de 3 placas con falla inyectada",
      description:
        "Placas con falla conocida (cold joint, componente abierto, polaridad invertida). Documentar síntoma → medición → causa → reparación por cada una.",
      hours: 2,
    },
  },
];

export const electronicsTechnicianCourse: NovaCollegeCourse = {
  title: "Técnico en Electrónica",
  slug: "electronics-technician",
  tagline:
    "De Ohm a microcontroladores — DC/AC, soldadura, instrumentos y troubleshooting para manufactura y campo.",
  description:
    "Programa técnico de 120 horas que forma técnicos en electrónica capaces de analizar circuitos DC/AC, ensamblar y soldar PCBs, usar instrumentación de banco, leer datasheets y diagnosticar fallas en equipos. Alineado a ETA Associate Certified Electronics Technician (DC/AC) e IPC-A-610 workmanship awareness. Complementa tracks de IoT, Robotics, Telecom e IT — la base hardware que muchos programas software-only omiten.",
  targetAudience:
    "Estudiantes 16–25+ en programas técnicos de electricidad, electromecánica o mecatrónica; aspirantes a assembler/test technician en manufactura; hobbyists que buscan empleabilidad formal. No requiere cálculo avanzado — álgebra básica suficiente.",
  durationHours: 120,
  prerequisites: [
    "Álgebra básica (despeje de ecuaciones lineales)",
    "Matemáticas de secundaria",
    "Lectura comprensiva en español; inglés técnico en datasheets (se enseña)",
  ],
  learningOutcomes: [
    "Aplicar Ley de Ohm, Kirchhoff y análisis serie/paralelo para predecir y verificar mediciones DC.",
    "Explicar comportamiento de capacitores, inductores y transformadores en circuitos AC y filtros pasivos.",
    "Polarizar diodos, LEDs y transistores; diseñar drivers de conmutación para cargas DC.",
    "Interpretar tablas de verdad, compuertas lógicas y programar GPIO/ADC básico en Arduino o ESP32.",
    "Operar DMM, osciloscopio y generador de funciones para caracterizar señales y validar diseños.",
    "Soldar through-hole y SMD básico cumpliendo criterios visuales IPC-A-610 clase 2.",
    "Leer datasheets para absolute max ratings, pinout y application notes sin errores de destrucción.",
    "Diagnosticar fallas sistemáticamente en placas y sistemas de potencia/control entry-level.",
  ],
  certificationAlignment: {
    primary: [
      "ETA Associate Certified Electronics Technician (DC/AC)",
      "IPC-A-610 Acceptability of Electronic Assemblies (awareness / clase 2)",
    ],
    secondary: [
      "IPC J-STD-001 (intro soldadura)",
      "CompTIA ITF+ (conceptos hardware complementarios)",
    ],
    examPrepHours: 12,
    notes:
      "Kit de lab institucional: breadboards, componentes assort, DMM, scope 2ch, estaciones soldadura, kits PCB. Costo estimado $1,200–2,500 USD por banco de 4 estudiantes.",
  },
  formatBreakdown: {
    theoryHours: 48,
    labsProjectsHours: 48,
    softSkillsHours: 12,
    examPrepHours: 12,
  },
  modules: attachContentToModules(RAW_MODULES, ELECTRONICS_LESSONS),
  capstone: {
    title: "Proyecto integrador: Sistema electrónico documentado de punta a punta",
    description:
      "Diseñar, simular (opcional), ensamblar y probar un sistema funcional — ej. estación de monitoreo ambiental (sensor temp/humedad + display + alarma), fuente de potencia con indicadores, o panel de control con relay y sensores. Incluye esquemático, BOM, fotos de ensamble IPC, mediciones de validación y manual de troubleshooting de 5 fallas comunes.",
    deliverables: [
      "Esquemático (KiCad/EasyEDA/Fritzing)",
      "BOM con valores y footprints",
      "Placa soldada con inspección IPC documentada",
      "Hoja de mediciones DMM/scope de puntos clave",
      "Manual de troubleshooting (5 escenarios)",
      "Demo oral 10 minutos + Q&A",
    ],
    hours: 8,
  },
  assessmentRubric: {
    components: [
      {
        name: "Labs modulares (breadboard, scope, soldadura)",
        weight: 40,
        description:
          "Precisión teórico vs medido, técnicas de soldadura, capturas de scope.",
      },
      {
        name: "Capstone integrador",
        weight: 25,
        description:
          "Sistema funcional, documentación completa, inspección IPC clase 2.",
      },
      {
        name: "Simulacro ETA / evaluación integrada",
        weight: 15,
        description: "≥70% en simulacro DC/AC/digital cronometrado.",
      },
      {
        name: "Troubleshooting boards (módulo 9)",
        weight: 10,
        description: "3/3 fallas diagnosticadas y reparadas con documentación.",
      },
      {
        name: "Quizzes y seguridad ESD",
        weight: 10,
        description: "Promedio ≥75%; checklist ESD firmado sin violaciones.",
      },
    ],
    passingCriteria:
      "Calificación final ≥80/100, capstone aprobado, labs 100% entregados, cero incidentes de seguridad. Certificado NOVA-COL-ELE verificable al completar.",
  },
  facilitatorNotes: [
    "Priorizar seguridad: ESD mats, extractores de humo soldadura, fusibles en fuentes de lab.",
    "No se requiere ser ingeniero eléctrico — guía paso a paso con valores calculados pre-check.",
    "Osciloscopios USB (Picoscope, Rigol) son suficientes entry-level; compartir 2ch por pareja.",
    "Kits PCB bulk (PCBWay/JLCPCB student boards) reducen costo vs kits retail.",
    "Co-docencia con instructor de robotics para módulo 8 motores/H-bridge.",
    "ETA exam voucher opcional como upsell institucional — currículo cubre ~80% DC/AC associate.",
  ],
  employabilitySkills: [
    "Lectura de esquemáticos y datasheets",
    "Soldadura y control de calidad visual",
    "Uso de DMM y osciloscopio",
    "Troubleshooting sistemático",
    "Documentación BOM y as-built",
    "ESD y seguridad en banco",
    "Pensamiento analítico cuantitativo",
    "Trabajo en línea de ensamble simulada",
  ],
  pathwayBridge: {
    relatedPathwaySlug: "robotics-engineering",
    notes:
      "Base hardware ideal antes de Robotics College (PLC, motores) o IoT College (ESP32, sensores). También complementa Telecom (señales) e IT Support (hardware).",
  },
  verifyCertificatePrefix: "NOVA-COL-ELE",
};
