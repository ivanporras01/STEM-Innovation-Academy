import type { LessonContent } from "../types";
import { buildLesson } from "./content-builder";

/** Minutes → contact hours (mín. 0.5 h). */
function minutesToHours(m: number): number {
  return Math.max(0.5, Math.round((m / 60) * 2) / 2);
}

type QcwLessonSeed = {
  slug: string;
  title: string;
  description: string;
  minutes: number;
};

/** Spanish bridge content — full interactive curriculum lives in QCW app. */
function qcwBridgeLesson(seed: QcwLessonSeed): LessonContent {
  const appUrl = "https://quantum-workforce-academy.vercel.app";
  return buildLesson({
    sections: [
      {
        heading: seed.title,
        body: `${seed.description} Este módulo forma parte del currículo **Quantum Computing Workforce (QCW)** — contenido completo en inglés técnico con simuladores interactivos (Bloch sphere, gate playground, circuitos, banco óptico Thorlabs-style) en la plataforma QCW.`,
      },
      {
        heading: "Experiencia interactiva NOVA College · Tier 2",
        body: "Las lecciones de este track no son solo lectura: incluyen visualizaciones gráficas, playgrounds de compuertas y laboratorios Qiskit. Accede desde el LMS institucional o directamente en la app QCW vinculada a tu matrícula NOVA STEM HUB.",
      },
      {
        heading: "Competencias que demostrarás",
        body: "Al completar esta lección en QCW: aplicar conceptos en simulador, responder checks de conocimiento y documentar resultados para tu portafolio verificable NOVA-COL-QNT.",
      },
      {
        heading: "Facilitador B2B",
        body: "El instructor no necesita ser experto en cuántica: guía el ritmo semanal, revisa entregables de lab y usa el dashboard de progreso. Soporte técnico Qiskit/IBM Cloud documentado en facilitator notes del track.",
      },
    ],
    summary: `${seed.title}: ${seed.description.split(".")[0]}.`,
    careerInsight:
      "En entrevistas quantum workforce, explica conceptos con precisión (superposición ≠ paralelismo clásico) y menciona proyectos Qiskit en tu portafolio — evita hype de 'computación infinita'.",
    glossary: [
      { term: "Qubit", definition: "Bit cuántico |ψ⟩ = α|0⟩ + β|1⟩ antes de medición." },
      { term: "NISQ", definition: "Noisy Intermediate-Scale Quantum — hardware actual con ruido." },
      { term: "Qiskit", definition: "SDK Python de IBM para circuitos cuánticos." },
    ],
    references: [
      {
        title: "Quantum Computing Workforce — Lección",
        url: `${appUrl}/course/quantum-computing-workforce-development`,
        author: "NOVA STEM HUB QCW",
      },
      {
        title: "IBM Quantum Learning",
        url: "https://learning.quantum.ibm.com/",
        author: "IBM Quantum",
      },
      {
        title: "Qiskit Textbook",
        url: "https://qiskit.org/learn/",
        author: "IBM",
      },
    ],
  });
}

/** All QCW lesson slugs — mirrors quantum-workforce-academy/src/lib/data/course.ts */
const QCW_LESSON_SEEDS: QcwLessonSeed[] = [
  // Module 1
  { slug: "what-is-quantum-computing", title: "¿Qué es la computación cuántica?", description: "Qubit, superposición, medición, regla de Born y programas cuánticos vs software clásico.", minutes: 45 },
  { slug: "classical-vs-quantum-information", title: "Información clásica vs cuántica", description: "Bits vs qubits, no-cloning, decoherencia, ventajas y límites honestos.", minutes: 45 },
  { slug: "the-quantum-computing-stack", title: "Stack de computación cuántica", description: "Hardware, SDKs, algoritmos y capas enterprise.", minutes: 28 },
  { slug: "quantum-technology-landscape", title: "Modalidades de hardware cuántico", description: "Superconducting, iones atrapados, fotónico, átomos neutros y tradeoffs.", minutes: 35 },
  { slug: "nisq-era-and-roadmap", title: "Era NISQ y roadmap industrial", description: "Ruido, mitigación vs corrección, tolerancia a fallos.", minutes: 22 },
  { slug: "workforce-demand-and-roles", title: "Demanda workforce y roles", description: "Empleadores, tipos de rol y estrategia de portafolio.", minutes: 20 },
  // Module 2
  { slug: "vectors-and-inner-products", title: "Vectores y productos internos", description: "Vectores complejos y ⟨ψ|φ⟩.", minutes: 30 },
  { slug: "matrices-and-operators", title: "Matrices y operadores", description: "Operadores lineales como compuertas cuánticas.", minutes: 35 },
  { slug: "eigenvalues-and-eigenvectors", title: "Eigenvalores y eigenvectores", description: "Resultados de medición como eigenvalores.", minutes: 40 },
  { slug: "tensor-products", title: "Productos tensoriales", description: "Espacios de estado multi-qubit.", minutes: 35 },
  { slug: "linear-algebra-lab-prep", title: "Prep lab álgebra lineal", description: "Patrones NumPy para estados cuánticos.", minutes: 25 },
  // Module 3
  { slug: "single-qubit-states", title: "Estados de un qubit", description: "Representación statevector.", minutes: 30 },
  { slug: "bloch-sphere-visualization", title: "Visualización esfera de Bloch", description: "Imagen geométrica del qubit.", minutes: 25 },
  { slug: "density-matrices", title: "Matrices de densidad", description: "Estados mixtos y decoherencia.", minutes: 35 },
  { slug: "partial-trace-and-purity", title: "Traza parcial y pureza", description: "Análisis de subsistemas.", minutes: 30 },
  { slug: "state-tomography-intro", title: "Introducción a tomografía de estados", description: "Reconstrucción de ρ desde mediciones.", minutes: 28 },
  // Module 4
  { slug: "pauli-and-hadamard-gates", title: "Compuertas Pauli y Hadamard", description: "X, Y, Z, H en la esfera de Bloch.", minutes: 30 },
  { slug: "phase-and-rotation-gates", title: "Compuertas de fase y rotación", description: "Rz, Rx, Ry y ángulos.", minutes: 32 },
  { slug: "two-qubit-gates", title: "Compuertas de dos qubits", description: "CNOT, CZ y entrelazamiento.", minutes: 35 },
  { slug: "circuit-diagrams-and-universality", title: "Diagramas de circuito y universalidad", description: "Conjuntos de compuertas y descomposición.", minutes: 28 },
  { slug: "transpilation-basics", title: "Transpilación básica", description: "Mapeo a compuertas nativas del hardware.", minutes: 30 },
  { slug: "circuit-design-workshop", title: "Taller diseño de circuitos", description: "Swap test y histogramas de shots.", minutes: 40 },
  // Module 5
  { slug: "product-vs-entangled-states", title: "Estados producto vs entrelazados", description: "Criterios de separabilidad.", minutes: 30 },
  { slug: "bell-states-and-measurements", title: "Estados de Bell y mediciones", description: "Bases maximally entangled.", minutes: 32 },
  { slug: "bell-inequality-overview", title: "Desigualdad de Bell", description: "Realismo local vs mecánica cuántica.", minutes: 35 },
  { slug: "quantum-teleportation", title: "Teletransportación cuántica", description: "Protocolo y bits clásicos.", minutes: 38 },
  { slug: "entanglement-in-workforce", title: "Entrelazamiento en proyectos workforce", description: "Redes, criptografía y simulación.", minutes: 22 },
  // Module 6
  { slug: "oracle-model", title: "Modelo de oráculo", description: "Funciones black-box en circuitos.", minutes: 28 },
  { slug: "deutsch-jozsa-algorithm", title: "Algoritmo Deutsch-Jozsa", description: "Detección constante vs balanceada.", minutes: 35 },
  { slug: "grover-search-intuition", title: "Intuición búsqueda Grover", description: "Amplificación de amplitud.", minutes: 40 },
  { slug: "grover-implementation", title: "Implementación Grover", description: "Grover en Qiskit.", minutes: 40 },
  { slug: "query-complexity-and-limits", title: "Complejidad de consultas y límites", description: "Ventaja cuántica honesta.", minutes: 30 },
  // Module 7
  { slug: "shors-algorithm-overview", title: "Overview algoritmo de Shor", description: "Factorización e impacto criptográfico.", minutes: 35 },
  { slug: "quantum-phase-estimation", title: "Estimación de fase cuántica", description: "Extracción de eigenfase.", minutes: 38 },
  { slug: "variational-principle", title: "Principio variacional", description: "Energía de estado base.", minutes: 30 },
  { slug: "vqe-workflow", title: "Flujo VQE", description: "Loops híbridos clásico-cuántico.", minutes: 40 },
  { slug: "qaoa-introduction", title: "Introducción QAOA", description: "Optimización en hardware NISQ.", minutes: 35 },
  // Module 8
  { slug: "noise-models", title: "Modelos de ruido", description: "Depolarizing, T1/T2, decoherencia.", minutes: 40 },
  { slug: "stabilizer-formalism", title: "Formalismo estabilizador", description: "Grupo de Pauli y síndromes.", minutes: 35 },
  { slug: "surface-code-overview", title: "Overview código de superficie", description: "Qubits lógicos y umbrales.", minutes: 32 },
  { slug: "error-mitigation-techniques", title: "Técnicas mitigación de error", description: "ZNE, M3, corrección readout.", minutes: 38 },
  { slug: "reliability-engineering", title: "Ingeniería de confiabilidad", description: "SLAs, shot budgets, QA.", minutes: 28 },
  // Module 9
  { slug: "device-topologies", title: "Topologías de dispositivos", description: "Coupling maps y routing.", minutes: 30 },
  { slug: "calibration-data", title: "Datos de calibración", description: "T1, T2, errores de compuerta.", minutes: 35 },
  { slug: "randomized-benchmarking", title: "Randomized benchmarking", description: "Métricas de fidelidad de compuertas.", minutes: 28 },
  { slug: "pulse-level-control", title: "Control a nivel de pulso", description: "OpenPulse intro.", minutes: 35 },
  { slug: "hardware-career-paths", title: "Carreras en hardware cuántico", description: "Cryo, FPGA, paths adyacentes.", minutes: 22 },
  // Module 10
  { slug: "qiskit-ecosystem", title: "Ecosistema Qiskit", description: "Terra, Aer, Runtime, Nature.", minutes: 28 },
  { slug: "simulators-vs-hardware", title: "Simuladores vs hardware", description: "Statevector, shots, ruido.", minutes: 30 },
  { slug: "qiskit-runtime", title: "Qiskit Runtime", description: "Sessions, primitivos, optimización.", minutes: 35 },
  { slug: "testing-quantum-code", title: "Testing código cuántico", description: "Unit tests y CI.", minutes: 32 },
  { slug: "packaging-and-deployment", title: "Empaquetado y despliegue", description: "Microservicios cuánticos.", minutes: 30 },
  { slug: "capstone-lab-prep", title: "Prep lab capstone", description: "Métricas y backend target.", minutes: 25 },
  // Module 11
  { slug: "quantum-chemistry", title: "Química cuántica", description: "Hamiltonianos moleculares y VQE.", minutes: 35 },
  { slug: "optimization-and-logistics", title: "Optimización y logística", description: "QUBO, QAOA, supply chain.", minutes: 32 },
  { slug: "quantum-machine-learning", title: "Quantum machine learning", description: "Feature maps y kernels.", minutes: 38 },
  { slug: "finance-and-risk", title: "Finanzas y riesgo", description: "Portafolios y estimación de amplitud.", minutes: 30 },
  { slug: "building-business-cases", title: "Business cases cuánticos", description: "ROI, pilotos, kill criteria.", minutes: 28 },
  // Module 12
  { slug: "capstone-project-design", title: "Diseño proyecto capstone", description: "Charter y métricas.", minutes: 35 },
  { slug: "portfolio-and-resume", title: "Portafolio y CV", description: "Showcase resultados cuánticos.", minutes: 30 },
  { slug: "interview-preparation", title: "Prep entrevistas", description: "Técnico y behavioral.", minutes: 32 },
  { slug: "certification-and-next-steps", title: "Certificación y siguientes pasos", description: "IBM, Microsoft, comunidades.", minutes: 25 },
];

export const QUANTUM_WORKFORCE_LESSONS: Record<string, LessonContent> =
  Object.fromEntries(
    QCW_LESSON_SEEDS.map((seed) => [seed.slug, qcwBridgeLesson(seed)]),
  );

export { minutesToHours, QCW_LESSON_SEEDS };
