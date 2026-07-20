import type { LessonContent } from "../types";
import { buildLesson } from "./content-builder";

/** QCW-style theory content — data-analytics (28 lessons). */
export const DATA_ANALYTICS_LESSONS: Record<string, LessonContent> = {
  "que-hace-data-analyst-ecosistema": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «El rol del analista de datos y el ecosistema analítico» es competencia clave en análisis de datos y business intelligence. Analyst vs scientist vs engineer, stack moderno (Excel, SQL, Python, BI) y ciclo de vida Ask → Prepare → Process → Analyze → Share → Act. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «El rol del analista de datos y el ecosistema analítico» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «El rol del analista de datos y el ecosistema analítico»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «El rol del analista de datos y el ecosistema analítico» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ],
    visual: { type: "data-pipeline", title: "Referencia: El rol del analista de datos y el ecosistema analítico", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "tipos-datos-estructurados": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «Tipos de datos: estructurados, semi-estructurados y no estructurados» es competencia clave en análisis de datos y business intelligence. Tablas, JSON, granularidad, formatos CSV/Parquet/Excel y cuándo normalizar antes de analizar. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Tipos de datos: estructurados, semi-estructurados y no estructurados» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Tipos de datos: estructurados, semi-estructurados y no estructurados»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Tipos de datos: estructurados, semi-estructurados y no estructurados» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "CTU", definition: "Contador incremental en ladder logic PLC." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "etica-privacidad-sesgo-datos": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «Ética, privacidad y sesgo en datos» es competencia clave en análisis de datos y business intelligence. PII, LFPDPPP/GDPR, minimización, anonimización, sesgos de muestreo y comunicación responsable de insights. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Ética, privacidad y sesgo en datos» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Ética, privacidad y sesgo en datos»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Ética, privacidad y sesgo en datos» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "formular-preguntas-smart": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Formular preguntas SMART y definiciones de negocio» es competencia clave en análisis de datos y business intelligence. De problema vago a pregunta analizable: métricas, dimensiones, hipótesis, priorización impacto/esfuerzo y data dictionary. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Formular preguntas SMART y definiciones de negocio» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Formular preguntas SMART y definiciones de negocio»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Formular preguntas SMART y definiciones de negocio» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "funciones-excel-vlookup-index-match": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «Funciones Excel: VLOOKUP, INDEX-MATCH e IF» es competencia clave en análisis de datos y business intelligence. Búsquedas entre tablas, lógica condicional, funciones de texto y buenas prácticas para evitar errores #N/A. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Funciones Excel: VLOOKUP, INDEX-MATCH e IF» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Funciones Excel: VLOOKUP, INDEX-MATCH e IF»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Funciones Excel: VLOOKUP, INDEX-MATCH e IF» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ],
    visual: { type: "data-pipeline", title: "Referencia: Funciones Excel: VLOOKUP, INDEX-MATCH e IF", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "tablas-dinamicas-segmentacion": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Tablas dinámicas, segmentación y slicers» es competencia clave en análisis de datos y business intelligence. Pivot tables, agregaciones, campos calculados, slicers/timelines, refresh y límites de Excel vs SQL/BI. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Tablas dinámicas, segmentación y slicers» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Tablas dinámicas, segmentación y slicers»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Tablas dinámicas, segmentación y slicers» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "power-query-apps-script": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Power Query y automatización con Apps Script» es competencia clave en análisis de datos y business intelligence. ETL en Excel, transformaciones reproducibles, combinar archivos de carpeta y automatización en Google Sheets. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Power Query y automatización con Apps Script» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Power Query y automatización con Apps Script»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Power Query y automatización con Apps Script» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "ETL", definition: "Extract, Transform, Load; pipeline de preparación de datos." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "graficos-efectivos-hoja-calculo": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Gráficos efectivos en hoja de cálculo» es competencia clave en análisis de datos y business intelligence. Elegir tipo de gráfico, evitar chart junk, accesibilidad de color, sparklines y narrativa orientada a insight. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Gráficos efectivos en hoja de cálculo» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Gráficos efectivos en hoja de cálculo»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Gráficos efectivos en hoja de cálculo» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "modelo-relacional-tablas-claves": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Modelo relacional, tablas y claves» es competencia clave en análisis de datos y business intelligence. Primary/foreign keys, cardinalidad 1:N y N:M, normalización introductoria y star schema para BI. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Modelo relacional, tablas y claves» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Modelo relacional, tablas y claves»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Modelo relacional, tablas y claves» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ],
    visual: { type: "data-pipeline", title: "Referencia: Modelo relacional, tablas y claves", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "select-where-order-by-limit": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «SQL: SELECT, WHERE, ORDER BY y LIMIT» es competencia clave en análisis de datos y business intelligence. Proyección de columnas, filtros, ordenamiento, alias, legibilidad y errores comunes del principiante. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «SQL: SELECT, WHERE, ORDER BY y LIMIT» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «SQL: SELECT, WHERE, ORDER BY y LIMIT»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «SQL: SELECT, WHERE, ORDER BY y LIMIT» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "joins-inner-left-right": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «JOINs: INNER, LEFT y FULL OUTER» es competencia clave en análisis de datos y business intelligence. Combinar tablas por claves, detectar fan-out, duplicados post-JOIN y reconciliación entre fuentes. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «JOINs: INNER, LEFT y FULL OUTER» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «JOINs: INNER, LEFT y FULL OUTER»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «JOINs: INNER, LEFT y FULL OUTER» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "JOIN", definition: "Operación SQL para combinar filas de dos o más tablas relacionadas." },
      { term: "POST", definition: "Power-On Self-Test; autoprueba de hardware al encender la PC." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "group-by-having-agregadas": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «GROUP BY, HAVING y funciones agregadas» es competencia clave en análisis de datos y business intelligence. COUNT, SUM, AVG, segmentación por categoría, filtrado de grupos y equivalencia con pivot/groupby. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «GROUP BY, HAVING y funciones agregadas» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «GROUP BY, HAVING y funciones agregadas»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «GROUP BY, HAVING y funciones agregadas» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "subconsultas-ctes-with": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Subconsultas y CTEs (WITH)» es competencia clave en análisis de datos y business intelligence. Queries anidadas vs CTEs encadenadas, legibilidad, refactorización y cuándo escalar a data engineer. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Subconsultas y CTEs (WITH)» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Subconsultas y CTEs (WITH)»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Subconsultas y CTEs (WITH)» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ],
    visual: { type: "data-pipeline", title: "Referencia: Subconsultas y CTEs (WITH)", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "window-functions-row-number": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Window functions: ROW_NUMBER, RANK y LAG/LEAD» es competencia clave en análisis de datos y business intelligence. Ranking por grupo, running totals, comparación MoM y diferencia vs GROUP BY. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Window functions: ROW_NUMBER, RANK y LAG/LEAD» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Window functions: ROW_NUMBER, RANK y LAG/LEAD»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Window functions: ROW_NUMBER, RANK y LAG/LEAD» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "data-profiling-nulos-duplicados": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Data profiling: nulos, duplicados y calidad» es competencia clave en análisis de datos y business intelligence. Auditoría sistemática, detección de missing/duplicados, outliers, rangos inválidos y perfil documentado. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Data profiling: nulos, duplicados y calidad» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Data profiling: nulos, duplicados y calidad»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Data profiling: nulos, duplicados y calidad» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "etl-concept-herramientas": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «ETL/ELT: conceptos y herramientas» es competencia clave en análisis de datos y business intelligence. Extract-Transform-Load, ELT en cloud, dbt/Airbyte (concepto), rol del analista y scheduling de refresh. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «ETL/ELT: conceptos y herramientas» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «ETL/ELT: conceptos y herramientas»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «ETL/ELT: conceptos y herramientas» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "ETL", definition: "Extract, Transform, Load; pipeline de preparación de datos." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "python-jupyter-pandas-dataframe": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «Python, Jupyter y pandas DataFrame» es competencia clave en análisis de datos y business intelligence. Entorno Colab/Notebook, read_csv, inspección (head, info, describe) y reproducibilidad con Git. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Python, Jupyter y pandas DataFrame» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Python, Jupyter y pandas DataFrame»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Python, Jupyter y pandas DataFrame» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "pandas", definition: "Biblioteca Python para manipulación y análisis de datos tabulares." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ],
    visual: { type: "data-pipeline", title: "Referencia: Python, Jupyter y pandas DataFrame", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "limpieza-pandas-dropna-fillna": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «Limpieza de datos con pandas» es competencia clave en análisis de datos y business intelligence. dropna/fillna, astype, merge/concat, estandarización de texto y pipeline de limpieza documentado. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Limpieza de datos con pandas» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Limpieza de datos con pandas»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Limpieza de datos con pandas» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "pandas", definition: "Biblioteca Python para manipulación y análisis de datos tabulares." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "agregaciones-groupby-pandas": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Agregaciones con groupby y pivot_table» es competencia clave en análisis de datos y business intelligence. split-apply-combine, agg, transform, filter y equivalencia con SQL GROUP BY. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Agregaciones con groupby y pivot_table» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Agregaciones con groupby y pivot_table»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Agregaciones con groupby y pivot_table» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "visualizacion-matplotlib-seaborn": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Visualización con matplotlib y seaborn» es competencia clave en análisis de datos y business intelligence. Histogramas, barplots, scatter, heatmaps, personalización profesional e interpretación en markdown. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Visualización con matplotlib y seaborn» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Visualización con matplotlib y seaborn»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Visualización con matplotlib y seaborn» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "medidas-tendencia-central-dispersion": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Estadística descriptiva: tendencia central y dispersión» es competencia clave en análisis de datos y business intelligence. Media vs mediana vs moda, desviación estándar, cuartiles, IQR e interpretación de boxplots. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Estadística descriptiva: tendencia central y dispersión» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Estadística descriptiva: tendencia central y dispersión»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Estadística descriptiva: tendencia central y dispersión» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ],
    visual: { type: "data-pipeline", title: "Referencia: Estadística descriptiva: tendencia central y dispersión", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "distribuciones-outliers": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Distribuciones y detección de outliers» es competencia clave en análisis de datos y business intelligence. Formas de distribución, regla IQR, excluir vs investigar vs transformar e impacto en reportes. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Distribuciones y detección de outliers» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Distribuciones y detección de outliers»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Distribuciones y detección de outliers» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "correlacion-vs-causalidad": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Correlación vs causalidad» es competencia clave en análisis de datos y business intelligence. Coeficiente de Pearson, scatter plots, confounders, Simpson's paradox y comunicación responsable. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Correlación vs causalidad» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Correlación vs causalidad»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Correlación vs causalidad» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "muestreo-intervalos-confianza": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Muestreo e intervalos de confianza» es competencia clave en análisis de datos y business intelligence. Población vs muestra, margen de error, IC 95 %, tamaño muestral y evitar falsa precisión. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Muestreo e intervalos de confianza» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Muestreo e intervalos de confianza»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Muestreo e intervalos de confianza» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "principios-diseno-dashboards": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «Principios de diseño de dashboards» es competencia clave en análisis de datos y business intelligence. Propósito por audiencia, jerarquía visual, minimalismo, accesibilidad WCAG y style guide consistente. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Principios de diseño de dashboards» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Principios de diseño de dashboards»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Principios de diseño de dashboards» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ],
    visual: { type: "data-pipeline", title: "Referencia: Principios de diseño de dashboards", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "power-bi-import-relaciones-dax": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «Power BI: importación, relaciones y DAX» es competencia clave en análisis de datos y business intelligence. Import vs DirectQuery, star schema, columnas calculadas vs medidas, SUM/CALCULATE/DIVIDE. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Power BI: importación, relaciones y DAX» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Power BI: importación, relaciones y DAX»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Power BI: importación, relaciones y DAX» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "DAX", definition: "Data Analysis Expressions; lenguaje de fórmulas en Power BI." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "filtros-drill-through-bookmarks": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «Filtros, drill-through y bookmarks en Power BI» es competencia clave en análisis de datos y business intelligence. Slicers sincronizados, drill-down vs drill-through, bookmarks para vistas ejecutiva/operativa y cross-filtering. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Filtros, drill-through y bookmarks en Power BI» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Filtros, drill-through y bookmarks en Power BI»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Filtros, drill-through y bookmarks en Power BI» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  }),

  "publicacion-refresh-programado": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Publicación, refresh programado y permisos» es competencia clave en análisis de datos y business intelligence. Power BI Service, gateway on-premises, refresh programado, RLS y alternativas Looker Studio. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Publicación, refresh programado y permisos» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Publicación, refresh programado y permisos»: marco operativo en análisis de datos y business intelligence, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Publicación, refresh programado y permisos» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "NAT", definition: "Network Address Translation; traducción de direcciones privadas a públicas." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "Google Data Analytics Certificate", url: "https://grow.google/certificates/data-analytics/", author: "Google" },
      { title: "Microsoft Power BI Documentation", url: "https://learn.microsoft.com/power-bi/", author: "Microsoft" },
      { title: "SQLBolt — Interactive SQL Tutorial", url: "https://sqlbolt.com/", author: "SQLBolt" }
    ]
  })
};
