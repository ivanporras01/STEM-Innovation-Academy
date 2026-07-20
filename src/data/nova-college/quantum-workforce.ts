import type { NovaCollegeCourse, NovaCollegeModule } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { QUANTUM_WORKFORCE_LESSONS, minutesToHours } from "./lessons/quantum-workforce-lessons";

const QCW_APP = "https://quantum-workforce-academy.vercel.app";
const QCW_COURSE_SLUG = "quantum-computing-workforce-development";

const RAW_MODULES: NovaCollegeModule[] = [
  {
    order: 1,
    title: "Fundamentos de computación cuántica",
    description:
      "Qubits, superposición, stack cuántico, modalidades hardware, NISQ y orientación workforce — currículo QCW Módulo 1.",
    contactHours: 12,
    lessons: [
      theoryLesson("what-is-quantum-computing", "¿Qué es la computación cuántica?", "Qubit, superposición, Born rule, casos de uso realistas.", minutesToHours(45)),
      theoryLesson("classical-vs-quantum-information", "Información clásica vs cuántica", "Bits vs qubits, no-cloning, ventajas y límites.", minutesToHours(45)),
      theoryLesson("the-quantum-computing-stack", "Stack de computación cuántica", "Hardware, SDKs, algoritmos, capas enterprise.", minutesToHours(28)),
      theoryLesson("quantum-technology-landscape", "Modalidades de hardware cuántico", "Superconducting, trapped-ion, photonic — comparativa interactiva.", minutesToHours(35)),
      theoryLesson("nisq-era-and-roadmap", "Era NISQ y roadmap", "Ruido, mitigación, tolerancia a fallos.", minutesToHours(22)),
      theoryLesson("workforce-demand-and-roles", "Demanda workforce y roles", "Empleadores, entrevistas, portafolio.", minutesToHours(20)),
      { slug: "module-1-knowledge-check", title: "Knowledge Check Módulo 1", description: "Repaso conceptual y prep Módulo 2.", type: "exam-prep", hours: 0.5 },
    ],
    labOrProject: {
      title: "LAB QCW: Explorador de modalidades + Bloch sphere",
      description: "Completar lecciones interactivas en QCW app; capturar screenshot Bloch sphere post-H|0⟩.",
      hours: 2,
    },
  },
  {
    order: 2,
    title: "Álgebra lineal para cuántica",
    description: "Vectores, matrices, eigenvalores, productos tensoriales — base matemática para Qiskit.",
    contactHours: 10,
    lessons: [
      theoryLesson("vectors-and-inner-products", "Vectores y productos internos", "Vectores complejos y ⟨ψ|φ⟩.", minutesToHours(30)),
      theoryLesson("matrices-and-operators", "Matrices y operadores", "Operadores unitarios como compuertas.", minutesToHours(35)),
      theoryLesson("eigenvalues-and-eigenvectors", "Eigenvalores y eigenvectores", "Observables y medición.", minutesToHours(40)),
      theoryLesson("tensor-products", "Productos tensoriales", "Estados multi-qubit.", minutesToHours(35)),
      { slug: "linear-algebra-lab-prep", title: "Prep Lab Álgebra Lineal", description: "NumPy para statevectors.", type: "lab", hours: minutesToHours(25) },
    ],
    labOrProject: {
      title: "LAB: NumPy statevectors y normalización",
      description: "Notebook Python: crear |ψ⟩, verificar normalización, producto interno.",
      hours: 2,
    },
  },
  {
    order: 3,
    title: "Qubits y estados cuánticos",
    description: "Statevectors, esfera de Bloch, matrices de densidad, tomografía intro.",
    contactHours: 10,
    lessons: [
      theoryLesson("single-qubit-states", "Estados de un qubit", "Base computacional y probabilidades.", minutesToHours(30)),
      theoryLesson("bloch-sphere-visualization", "Esfera de Bloch", "Simulación interactiva QCW.", minutesToHours(25)),
      theoryLesson("density-matrices", "Matrices de densidad", "Estados mixtos.", minutesToHours(35)),
      theoryLesson("partial-trace-and-purity", "Traza parcial y pureza", "Subsistemas y entrelazamiento.", minutesToHours(30)),
      theoryLesson("state-tomography-intro", "Tomografía de estados", "Reconstrucción de ρ.", minutesToHours(28)),
    ],
    labOrProject: {
      title: "LAB QCW: Gate playground + Bloch",
      description: "Secuencias H, X, Z, Rz; documentar coordenadas Bloch y histograma de medición.",
      hours: 2,
    },
  },
  {
    order: 4,
    title: "Compuertas y circuitos cuánticos",
    description: "Pauli, Hadamard, CNOT, transpilación — diseño en Qiskit.",
    contactHours: 12,
    lessons: [
      theoryLesson("pauli-and-hadamard-gates", "Compuertas Pauli y H", "X, Y, Z, H en Bloch.", minutesToHours(30)),
      theoryLesson("phase-and-rotation-gates", "Rotaciones Rz, Rx, Ry", "Parametrización de compuertas.", minutesToHours(32)),
      theoryLesson("two-qubit-gates", "Compuertas two-qubit", "CNOT, Bell states.", minutesToHours(35)),
      theoryLesson("circuit-diagrams-and-universality", "Universalidad", "Conjuntos de compuertas.", minutesToHours(28)),
      theoryLesson("transpilation-basics", "Transpilación", "Hardware nativo IBM.", minutesToHours(30)),
      { slug: "circuit-design-workshop", title: "Taller: Swap test", description: "Implementar swap test en Qiskit.", type: "lab", hours: minutesToHours(40) },
    ],
    labOrProject: {
      title: "LAB: Bell state + verificación estadística",
      description: "Circuito |Φ+⟩; 1024 shots; comparar teoría Born vs histograma.",
      hours: 2,
    },
  },
  {
    order: 5,
    title: "Entrelazamiento y estados de Bell",
    description: "EPR, desigualdad de Bell, teletransportación, aplicaciones workforce.",
    contactHours: 10,
    lessons: [
      theoryLesson("product-vs-entangled-states", "Producto vs entrelazado", "Separabilidad.", minutesToHours(30)),
      theoryLesson("bell-states-and-measurements", "Estados de Bell", "Correlaciones de medición.", minutesToHours(32)),
      theoryLesson("bell-inequality-overview", "Desigualdad de Bell", "CHSH y significado.", minutesToHours(35)),
      theoryLesson("quantum-teleportation", "Teletransportación cuántica", "Protocolo completo.", minutesToHours(38)),
      theoryLesson("entanglement-in-workforce", "Entrelazamiento en industria", "Casos reales sin sci-fi.", minutesToHours(22)),
    ],
    labOrProject: {
      title: "LAB QCW: Visual entanglement + circuito teleportación",
      description: "Simulador QCW; diagrama circuito teleportación documentado.",
      hours: 2,
    },
  },
  {
    order: 6,
    title: "Algoritmos I — Deutsch-Jozsa y Grover",
    description: "Oráculos, interferencia, búsqueda cuántica en Qiskit.",
    contactHours: 10,
    lessons: [
      theoryLesson("oracle-model", "Modelo de oráculo", "Black-box unitaries.", minutesToHours(28)),
      theoryLesson("deutsch-jozsa-algorithm", "Deutsch-Jozsa", "Constante vs balanceada.", minutesToHours(35)),
      theoryLesson("grover-search-intuition", "Intuición Grover", "Amplificación de amplitud.", minutesToHours(40)),
      { slug: "grover-implementation", title: "Implementación Grover", description: "2-qubit Grover en Qiskit.", type: "lab", hours: minutesToHours(40) },
      theoryLesson("query-complexity-and-limits", "Límites de ventaja cuántica", "Comunicación honesta a stakeholders.", minutesToHours(30)),
    ],
    labOrProject: {
      title: "LAB: Grover 2-qubit — shots vs teoría",
      description: "Implementar, ejecutar Aer simulator, reporte PDF con iteraciones óptimas.",
      hours: 2,
    },
  },
  {
    order: 7,
    title: "Algoritmos II — Shor, QPE, VQE, QAOA",
    description: "Factorización, química, optimización híbrida NISQ.",
    contactHours: 12,
    lessons: [
      theoryLesson("shors-algorithm-overview", "Algoritmo de Shor", "PQC migration awareness.", minutesToHours(35)),
      theoryLesson("quantum-phase-estimation", "Estimación de fase", "QPE sketch.", minutesToHours(38)),
      theoryLesson("variational-principle", "Principio variacional", "Ansätze y energía.", minutesToHours(30)),
      theoryLesson("vqe-workflow", "Flujo VQE", "Loop clásico-cuántico.", minutesToHours(40)),
      theoryLesson("qaoa-introduction", "Introducción QAOA", "Optimización combinatoria.", minutesToHours(35)),
    ],
    labOrProject: {
      title: "LAB: VQE H₂ mínimo (Qiskit Nature demo)",
      description: "Ejecutar tutorial VQE molécula H₂; gráfica convergencia energía.",
      hours: 3,
    },
  },
  {
    order: 8,
    title: "Corrección y mitigación de errores",
    description: "Ruido, estabilizadores, surface code, ZNE/M3 — confiabilidad en NISQ.",
    contactHours: 10,
    lessons: [
      theoryLesson("noise-models", "Modelos de ruido", "T1/T2, depolarizing.", minutesToHours(40)),
      theoryLesson("stabilizer-formalism", "Formalismo estabilizador", "Síndromes.", minutesToHours(35)),
      theoryLesson("surface-code-overview", "Código de superficie", "Qubits lógicos.", minutesToHours(32)),
      { slug: "error-mitigation-techniques", title: "Mitigación de error", description: "ZNE, readout correction en Qiskit.", type: "lab", hours: minutesToHours(38) },
      theoryLesson("reliability-engineering", "Confiabilidad en jobs cuánticos", "Shot budgets, QA.", minutesToHours(28)),
    ],
    labOrProject: {
      title: "LAB: Mitigación en backend simulado con ruido",
      description: "Comparar expectation value con/sin mitigation; documentar mejora.",
      hours: 2,
    },
  },
  {
    order: 9,
    title: "Hardware NISQ, calibración y modalidades",
    description: "Topologías IBM, calibración, RB, OpenPulse — literacy multi-plataforma.",
    contactHours: 10,
    lessons: [
      theoryLesson("device-topologies", "Topologías", "Coupling maps, SWAP.", minutesToHours(30)),
      theoryLesson("calibration-data", "Calibración", "Elegir mejores qubits.", minutesToHours(35)),
      theoryLesson("randomized-benchmarking", "Randomized benchmarking", "Fidelidad de compuertas.", minutesToHours(28)),
      theoryLesson("pulse-level-control", "Control por pulsos", "OpenPulse intro.", minutesToHours(35)),
      theoryLesson("hardware-career-paths", "Carreras hardware", "Cryo, FPGA, lab roles.", minutesToHours(22)),
    ],
    labOrProject: {
      title: "LAB QCW: Simulador óptico / bench Thorlabs-style",
      description: "Experiencia banco óptico QCW; informe polarización y detectores.",
      hours: 2,
    },
  },
  {
    order: 10,
    title: "Stack software — Qiskit",
    description: "Ecosistema Qiskit, Runtime, testing, empaquetado — ingeniería de software cuántico.",
    contactHours: 12,
    lessons: [
      theoryLesson("qiskit-ecosystem", "Ecosistema Qiskit", "Terra, Aer, Runtime.", minutesToHours(28)),
      theoryLesson("simulators-vs-hardware", "Simuladores vs hardware", "Costos y colas.", minutesToHours(30)),
      theoryLesson("qiskit-runtime", "Qiskit Runtime", "Primitivos Estimator/Sampler.", minutesToHours(35)),
      theoryLesson("testing-quantum-code", "Testing", "CI para circuitos.", minutesToHours(32)),
      theoryLesson("packaging-and-deployment", "Despliegue", "API keys seguras.", minutesToHours(30)),
      { slug: "capstone-lab-prep", title: "Prep capstone Qiskit", description: "Charter y backend.", type: "project", hours: minutesToHours(25) },
    ],
    labOrProject: {
      title: "LAB: GitHub repo quantum con tests Aer",
      description: "Repo público con circuito + pytest; Actions green.",
      hours: 3,
    },
  },
  {
    order: 11,
    title: "Aplicaciones industriales",
    description: "Química, optimización, QML, finanzas — business cases realistas.",
    contactHours: 10,
    lessons: [
      theoryLesson("quantum-chemistry", "Química cuántica", "VQE molecular.", minutesToHours(35)),
      theoryLesson("optimization-and-logistics", "Optimización", "QUBO y QAOA.", minutesToHours(32)),
      theoryLesson("quantum-machine-learning", "QML", "Feature maps.", minutesToHours(38)),
      theoryLesson("finance-and-risk", "Finanzas", "Portfolio y AE.", minutesToHours(30)),
      theoryLesson("building-business-cases", "Business cases", "ROI y pilotos.", minutesToHours(28)),
    ],
    labOrProject: {
      title: "PROYECTO: One-pager executive quantum pilot",
      description: "Caso industria elegido; KPIs, baseline clásico, kill criteria.",
      hours: 2,
    },
  },
  {
    order: 12,
    title: "Capstone de carrera",
    description: "Portafolio, entrevistas, certificaciones IBM/Microsoft — cierre workforce.",
    contactHours: 10,
    lessons: [
      { slug: "capstone-project-design", title: "Diseño capstone", description: "Charter alineado a empleador target.", type: "project", hours: minutesToHours(35) },
      theoryLesson("portfolio-and-resume", "Portafolio y CV", "Showcase Qiskit en GitHub.", minutesToHours(30)),
      theoryLesson("interview-preparation", "Prep entrevistas", "Bell state whiteboard.", minutesToHours(32)),
      theoryLesson("certification-and-next-steps", "Certificación", "IBM Quantum, QCW concepts hub.", minutesToHours(25)),
    ],
    labOrProject: {
      title: "CAPSTONE: Proyecto quantum workforce integrador",
      description: "Circuito/aplicación Qiskit completa; README; demo 15 min; verify NOVA-COL-QNT.",
      hours: 4,
    },
  },
];

export const quantumWorkforceCourse: NovaCollegeCourse = {
  title: "Quantum Workforce — Computación Cuántica",
  slug: "quantum-workforce",
  tagline:
    "Del qubit al empleo — Qiskit, algoritmos NISQ y portafolio industry-ready (Tier 2 Advanced).",
  description:
    "Track avanzado NOVA College powered by **Quantum Computing Workforce (QCW)** — currículo college/university ya desplegado con simuladores interactivos (Bloch sphere, gate playground, banco óptico, /concepts). 12 módulos desde fundamentos hasta capstone de carrera. Ideal para instituciones que licencian NOVA College y quieren diferenciador cuántico sin montar departamento propio.",
  targetAudience:
    "Estudiantes 18–25+ con Python introductorio y álgebra; graduados de tracks NOVA Data Analytics, Electronics o IT Cloud; profesionales STEM en reconversión. Tier 2 — no es primer track empleabilidad.",
  durationHours: 120,
  tier: "advanced",
  contentDelivery: {
    platform: "qcw",
    appBaseUrl: QCW_APP,
    courseSlug: QCW_COURSE_SLUG,
    notes:
      "Lecciones interactivas y labs Qiskit se ejecutan en QCW app. Catálogo y certificado NOVA-COL-QNT vía NOVA STEM HUB verify. Contenido teórico principal en inglés técnico en QCW; puentes en español en LMS institucional.",
  },
  prerequisites: [
    "Python introductorio (variables, funciones, pip)",
    "Álgebra lineal básica o completar Módulo 2 del track",
    "Probabilidad básica (opcional — se repasa en curso)",
    "Recomendado: NOVA Data Analytics, Electronics o IT Support & Cloud",
  ],
  learningOutcomes: [
    "Explicar qubits, superposición, medición y entrelazamiento sin mitos de paralelismo infinito.",
    "Aplicar álgebra lineal y productos tensoriales a circuitos multi-qubit.",
    "Construir y ejecutar circuitos en Qiskit (simulator y hardware cloud intro).",
    "Implementar Deutsch-Jozsa, Grover y workflows VQE/QAOA introductorios.",
    "Interpretar modelos de ruido, mitigación y métricas de calibración backend.",
    "Desarrollar software cuántico testeable con Qiskit Runtime y CI básico.",
    "Evaluar casos de uso industriales con business case honesto (química, optimización, finanzas).",
    "Entregar capstone documentado y portafolio listo para entrevistas quantum workforce.",
  ],
  certificationAlignment: {
    primary: [
      "IBM Quantum Developer Certification (pathway)",
      "Qiskit Advocate / IBM Quantum Learning badges",
    ],
    secondary: [
      "Microsoft Azure Quantum Fundamentals (conceptual)",
      "NOVA STEM HUB NOVA-COL-QNT verificable",
    ],
    examPrepHours: 12,
    notes:
      "No existe cert CompTIA-style único en quantum; valor = portafolio Qiskit + NOVA-COL-QNT + IBM badges. Instituciones pueden bundlear créditos IBM Quantum Platform.",
  },
  formatBreakdown: {
    theoryHours: 48,
    labsProjectsHours: 48,
    softSkillsHours: 12,
    examPrepHours: 12,
  },
  modules: attachContentToModules(RAW_MODULES, QUANTUM_WORKFORCE_LESSONS),
  capstone: {
    title: "Capstone Quantum Workforce — proyecto + portafolio + demo",
    description:
      "Proyecto integrador alineado a rol target (software, applications, cloud ops): circuito/aplicación Qiskit original, README con resultados reproducibles, comparación baseline clásico, demo 15 minutos. Publicar en GitHub y vincular a verify.novahub.education/NOVA-COL-QNT-…",
    deliverables: [
      "Repositorio GitHub con tests Aer",
      "Notebook o informe con histogramas/expectation values",
      "One-pager executive para stakeholder no técnico",
      "Demo en vivo o video 15 min",
      "CV/LinkedIn actualizado con enlace verify",
    ],
    hours: 8,
  },
  assessmentRubric: {
    components: [
      {
        name: "Labs Qiskit y simuladores QCW",
        weight: 35,
        description: "Circuitos funcionales, capturas, reproducibilidad.",
      },
      {
        name: "Capstone integrador",
        weight: 30,
        description: "Proyecto original, README, demo, baseline clásico.",
      },
      {
        name: "Knowledge checks modulares",
        weight: 15,
        description: "Quizzes QCW; promedio ≥75%.",
      },
      {
        name: "Business case / comunicación",
        weight: 10,
        description: "One-pager Módulo 11; sin hype.",
      },
      {
        name: "Participación y peer review",
        weight: 10,
        description: "Code review entre pares; ética quantum.",
      },
    ],
    passingCriteria:
      "Calificación ≥80/100, capstone aprobado, ≥90% lecciones QCW completadas, portafolio publicado. Certificado NOVA-COL-QNT verificable.",
  },
  facilitatorNotes: [
    "Tier 2 — no facilitar sin que cohorte tenga Python funcional; pre-test recomendado.",
    "QCW app handles simulators — institución solo necesita browsers modernos + Python 3.10+ en labs Qiskit.",
    "IBM Quantum free tier suficiente para labs; documentar API token handling (nunca commit keys).",
    "Facilitador NO necesita PhD — guía ritmo, revisa entregables, escala dudas técnicas a foro QCW/IBM.",
    "Sesiones síncronas: 1×semana demo Bloch/gates en vivo usando QCW projected.",
    "Pricing B2B premium: 2–3× track entry-level IT; bundle con 7 tracks entry como 'NOVA STEM HUB Complete'.",
    "Hub /concepts en QCW usable como prereading en español neutro (roadmap i18n).",
  ],
  employabilitySkills: [
    "Comunicación técnica quantum sin hype",
    "Qiskit/Python software engineering",
    "Lectura de papers y docs IBM Quantum",
    "Business case para pilotos cuánticos",
    "Portafolio GitHub reproducible",
    "Entrevista whiteboard (Bell, Grover sketch)",
    "Colaboración con equipos clásicos/ML",
    "Ética y expectativas realistas NISQ",
  ],
  pathwayBridge: {
    relatedPathwaySlug: "coding-ai",
    notes:
      "Entrada natural desde NOVA Data Analytics (Python), Electronics (señales) o IT Cloud. Salida hacia roles quantum software en enterprise o grad school.",
  },
  verifyCertificatePrefix: "NOVA-COL-QNT",
};

export const QUANTUM_WORKFORCE_APP_URL = QCW_APP;
export const QUANTUM_WORKFORCE_COURSE_SLUG = QCW_COURSE_SLUG;
