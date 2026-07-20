# NOVA College — Programas Técnicos

Currículo B2B de **NOVA College** bajo el paraguas NOVAHub: **8 tracks** (~120 h) — 7 técnicos entry-level + **1 advanced (Quantum Workforce / QCW)**.

## Formato estándar

| Componente | Horas | % |
|------------|------:|--:|
| Teoría | 48 | 40% |
| Labs / proyectos | 48 | 40% |
| Soft skills | 12 | 10% |
| Prep. certificación | 12 | 10% |
| **Total** | **120** | |

Certificados verificables en [verify.novahub.education](https://verify.novahub.education).

## Tracks disponibles

| # | Slug | Programa | Certificaciones alineadas |
|---|------|----------|---------------------------|
| 1 | `it-support-cloud-technician` | Técnico en Soporte IT y Cloud | CompTIA A+, Network+, AWS CLF |
| 2 | `cybersecurity-analyst` | Analista de Ciberseguridad | CompTIA Security+ |
| 3 | `data-analytics-technician` | Técnico en Análisis de Datos | Google Data Analytics, Power BI PL-300 |
| 4 | `iot-smart-systems-technician` | Técnico en IoT y Sistemas Inteligentes | Cisco IoT, AWS IoT Core |
| 5 | `robotics-automation-technician` | Técnico en Robótica y Automatización | Siemens PLC, ROS 2 |
| 6 | `intro-telecommunications` | Introducción a las Telecomunicaciones | CompTIA Network+, ETA FOT-NP |
| 7 | `electronics-technician` | Técnico en Electrónica | ETA DC/AC Associate, IPC-A-610 |
| 8 | `quantum-workforce` | **Quantum Workforce** (Tier 2) | IBM Quantum, NOVA-COL-QNT, QCW app |

### Tier 2 — Quantum Workforce (QCW)

El track **Quantum Workforce** usa el currículo ya desplegado en [Quantum Computing Workforce](https://quantum-workforce-academy.vercel.app) — simuladores Bloch, gate playground, banco óptico, `/concepts`. El LMS NOVA muestra catálogo + certificado `NOVA-COL-QNT`; las lecciones interactivas se sirven vía `contentDelivery.platform: "qwa"`.

```typescript
import { quantumWorkforceCourse, novaCollegeAdvancedTracks } from "@/data/nova-college";

quantumWorkforceCourse.contentDelivery?.appBaseUrl;
// → https://quantum-workforce-academy.vercel.app
```

## Ubicación en el repo

```
src/data/nova-college/
├── types.ts                  # Tipos TypeScript
├── index.ts                  # Catálogo e índice
├── it-support-cloud.ts
├── cybersecurity-analyst.ts
├── data-analytics.ts
├── iot-smart-systems-technician.ts
├── robotics-automation-technician.ts
├── intro-telecommunications.ts
├── electronics-technician.ts
├── quantum-workforce.ts
└── lessons/
    ├── index.ts                              # Re-export de todos los mapas
    ├── content-builder.ts                    # buildLesson / fourSectionLesson
    ├── lesson-factory.ts                     # Helpers theoryContent
    ├── it-support-cloud-technician-lessons.ts
    ├── cybersecurity-analyst-lessons.ts
    ├── data-analytics-technician-lessons.ts
    ├── iot-smart-systems-technician-lessons.ts
    ├── robotics-automation-technician-lessons.ts
    ├── intro-telecommunications-lessons.ts
    ├── electronics-technician-lessons.ts
    └── quantum-workforce-lessons.ts
```

## Contenido de lecciones (estilo QCW)

Cada track incluye `Record<string, LessonContent>` con secciones, `summary`, `careerInsight`, glosario y referencias (~149 lecciones teóricas en tracks 1–5 vía `attachContentToModules()`).

Regenerar contenido teórico auto-generado de **tracks 1–5** (tras editar `theoryLesson()` en el `.ts` del curso):

```bash
node scripts/generate-lesson-content-from-courses.mjs
```

Tracks 6–8 (Telecom, Electronics, Quantum) tienen mapas de lecciones curados — Telecom/Electronics manual; Quantum bridge a QCW app.

## Puentes con NOVA School (K-12)

- **NOVA School** (esta app) → pathways youth con buddies y Mission Paths
- **IoT College** → continúa `iot-smart-systems` (NOVA Explorer Kit ESP32)
- **Robotics College** → continúa `robotics-engineering` (+ PLC/HMI nuevo)
- **Electronics College** → base hardware para IoT, Robotics y Telecom
- **Telecom College** → complementa IT Support (Network+) y Electronics (señales)

## Uso programático

```typescript
import {
  novaCollegeCourses,
  novaCollegeTrackIndex,
  getNovaCollegeCourseBySlug,
} from "@/data/nova-college";

const course = getNovaCollegeCourseBySlug("cybersecurity-analyst");
```

## Modelo B2B

Instituciones licencian:

1. Currículo estructurado (módulos, labs, rúbricas)
2. Acceso plataforma NOVAHub / NOVA LMS
3. Guía del facilitador (notas incluidas en cada track)

Los facilitadores **no necesitan ser expertos** en cada dominio — las notas B2B indican equipamiento, alternativas open-source y scripts de lab.
