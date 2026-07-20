import type { NovaCollegeCourse, NovaCollegeModule } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { DATA_ANALYTICS_LESSONS } from "./lessons/data-analytics-technician-lessons";

const RAW_MODULES: NovaCollegeModule[] = [
  {
    order: 1,
    title: "Fundamentos del analista de datos",
    description:
      "Ecosistema analítico, tipos de datos, ética y privacidad, formulación de preguntas SMART — alineado a Google Data Analytics (Ask & Prepare).",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "que-hace-data-analyst-ecosistema",
        "El rol del analista de datos y el ecosistema analítico",
        "Analyst vs scientist vs engineer, stack moderno (Excel, SQL, Python, BI) y ciclo de vida Ask → Prepare → Process → Analyze → Share → Act.",
        3,
      ),
      theoryLesson(
        "tipos-datos-estructurados",
        "Tipos de datos: estructurados, semi-estructurados y no estructurados",
        "Tablas, JSON, granularidad, formatos CSV/Parquet/Excel y cuándo normalizar antes de analizar.",
        3,
      ),
      theoryLesson(
        "etica-privacidad-sesgo-datos",
        "Ética, privacidad y sesgo en datos",
        "PII, LFPDPPP/GDPR, minimización, anonimización, sesgos de muestreo y comunicación responsable de insights.",
        3,
      ),
      theoryLesson(
        "formular-preguntas-smart",
        "Formular preguntas SMART y definiciones de negocio",
        "De problema vago a pregunta analizable: métricas, dimensiones, hipótesis, priorización impacto/esfuerzo y data dictionary.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Brief analítico y data dictionary para caso retail",
      description:
        "Recibir escenario de negocio vago ('caen las ventas'). Redactar 3 preguntas SMART, definir KPIs y dimensiones, crear mini data dictionary y validar con compañero. Entregar documento de 1 página.",
      hours: 3,
    },
  },
  {
    order: 2,
    title: "Excel y hojas de cálculo para análisis",
    description:
      "Funciones avanzadas, tablas dinámicas, Power Query y visualización efectiva — base diaria del analista entry-level.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "funciones-excel-vlookup-index-match",
        "Funciones Excel: VLOOKUP, INDEX-MATCH e IF",
        "Búsquedas entre tablas, lógica condicional, funciones de texto y buenas prácticas para evitar errores #N/A.",
        3,
      ),
      theoryLesson(
        "tablas-dinamicas-segmentacion",
        "Tablas dinámicas, segmentación y slicers",
        "Pivot tables, agregaciones, campos calculados, slicers/timelines, refresh y límites de Excel vs SQL/BI.",
        3,
      ),
      theoryLesson(
        "power-query-apps-script",
        "Power Query y automatización con Apps Script",
        "ETL en Excel, transformaciones reproducibles, combinar archivos de carpeta y automatización en Google Sheets.",
        3,
      ),
      theoryLesson(
        "graficos-efectivos-hoja-calculo",
        "Gráficos efectivos en hoja de cálculo",
        "Elegir tipo de gráfico, evitar chart junk, accesibilidad de color, sparklines y narrativa orientada a insight.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Reporte mensual automatizado en Excel",
      description:
        "Importar CSV de ventas con Power Query, limpiar y transformar, construir pivot + slicers por región/categoría, gráficos accesibles y refresh de un clic. Documentar Applied Steps.",
      hours: 3,
    },
  },
  {
    order: 3,
    title: "SQL fundamental y modelo relacional",
    description:
      "Lectura de esquemas, extracción con SELECT/WHERE, JOINs y agregaciones — competencia central del analista técnico.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "modelo-relacional-tablas-claves",
        "Modelo relacional, tablas y claves",
        "Primary/foreign keys, cardinalidad 1:N y N:M, normalización introductoria y star schema para BI.",
        3,
      ),
      theoryLesson(
        "select-where-order-by-limit",
        "SQL: SELECT, WHERE, ORDER BY y LIMIT",
        "Proyección de columnas, filtros, ordenamiento, alias, legibilidad y errores comunes del principiante.",
        3,
      ),
      theoryLesson(
        "joins-inner-left-right",
        "JOINs: INNER, LEFT y FULL OUTER",
        "Combinar tablas por claves, detectar fan-out, duplicados post-JOIN y reconciliación entre fuentes.",
        3,
      ),
      theoryLesson(
        "group-by-having-agregadas",
        "GROUP BY, HAVING y funciones agregadas",
        "COUNT, SUM, AVG, segmentación por categoría, filtrado de grupos y equivalencia con pivot/groupby.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Extracción SQL sobre base e-commerce (Northwind)",
      description:
        "Escribir 5 consultas: top productos por ingreso, clientes sin pedidos (LEFT JOIN), revenue por región-mes (GROUP BY), filtro HAVING y top-10 con ORDER BY + LIMIT. Exportar resultados a CSV.",
      hours: 3,
    },
  },
  {
    order: 4,
    title: "SQL avanzado, calidad de datos y ETL",
    description:
      "Subconsultas, CTEs, window functions, data profiling y pipelines ETL/ELT — puente hacia analítica reproducible.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "subconsultas-ctes-with",
        "Subconsultas y CTEs (WITH)",
        "Queries anidadas vs CTEs encadenadas, legibilidad, refactorización y cuándo escalar a data engineer.",
        3,
      ),
      theoryLesson(
        "window-functions-row-number",
        "Window functions: ROW_NUMBER, RANK y LAG/LEAD",
        "Ranking por grupo, running totals, comparación MoM y diferencia vs GROUP BY.",
        3,
      ),
      theoryLesson(
        "data-profiling-nulos-duplicados",
        "Data profiling: nulos, duplicados y calidad",
        "Auditoría sistemática, detección de missing/duplicados, outliers, rangos inválidos y perfil documentado.",
        3,
      ),
      theoryLesson(
        "etl-concept-herramientas",
        "ETL/ELT: conceptos y herramientas",
        "Extract-Transform-Load, ELT en cloud, dbt/Airbyte (concepto), rol del analista y scheduling de refresh.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Pipeline SQL con CTEs y window functions",
      description:
        "Dataset de ventas mensuales: profiling inicial, limpieza con CTEs, top-3 productos por región con ROW_NUMBER, crecimiento MoM con LAG. Entregar .sql versionado con comentarios.",
      hours: 3,
    },
  },
  {
    order: 5,
    title: "Python, pandas y visualización",
    description:
      "Análisis reproducible con Jupyter, limpieza, agregaciones y gráficos estadísticos — Google Data Analytics Process & Analyze.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "python-jupyter-pandas-dataframe",
        "Python, Jupyter y pandas DataFrame",
        "Entorno Colab/Notebook, read_csv, inspección (head, info, describe) y reproducibilidad con Git.",
        3,
      ),
      theoryLesson(
        "limpieza-pandas-dropna-fillna",
        "Limpieza de datos con pandas",
        "dropna/fillna, astype, merge/concat, estandarización de texto y pipeline de limpieza documentado.",
        3,
      ),
      theoryLesson(
        "agregaciones-groupby-pandas",
        "Agregaciones con groupby y pivot_table",
        "split-apply-combine, agg, transform, filter y equivalencia con SQL GROUP BY.",
        3,
      ),
      theoryLesson(
        "visualizacion-matplotlib-seaborn",
        "Visualización con matplotlib y seaborn",
        "Histogramas, barplots, scatter, heatmaps, personalización profesional e interpretación en markdown.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Notebook EDA con dataset público (Kaggle)",
      description:
        "Importar dataset retail o finanzas, profiling, limpieza completa, 3 agregaciones groupby, 4 visualizaciones seaborn con interpretación y conclusiones de negocio. Exportar HTML.",
      hours: 3,
    },
  },
  {
    order: 6,
    title: "Estadística aplicada para analistas",
    description:
      "Estadística descriptiva, outliers, correlación y muestreo — fundamentos para insights honestos y comunicables.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "medidas-tendencia-central-dispersion",
        "Estadística descriptiva: tendencia central y dispersión",
        "Media vs mediana vs moda, desviación estándar, cuartiles, IQR e interpretación de boxplots.",
        3,
      ),
      theoryLesson(
        "distribuciones-outliers",
        "Distribuciones y detección de outliers",
        "Formas de distribución, regla IQR, excluir vs investigar vs transformar e impacto en reportes.",
        3,
      ),
      theoryLesson(
        "correlacion-vs-causalidad",
        "Correlación vs causalidad",
        "Coeficiente de Pearson, scatter plots, confounders, Simpson's paradox y comunicación responsable.",
        3,
      ),
      theoryLesson(
        "muestreo-intervalos-confianza",
        "Muestreo e intervalos de confianza",
        "Población vs muestra, margen de error, IC 95 %, tamaño muestral y evitar falsa precisión.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Análisis estadístico de encuesta de satisfacción",
      description:
        "Dataset de encuesta (n≈300): calcular mediana/IQR vs media, detectar outliers, correlación entre NPS y tiempo de respuesta, reportar IC 95 % con interpretación para gerencia.",
      hours: 1,
    },
  },
  {
    order: 7,
    title: "Business Intelligence con Power BI",
    description:
      "Diseño de dashboards, modelado star schema, DAX, interactividad y publicación — alineado a Microsoft PL-300.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "principios-diseno-dashboards",
        "Principios de diseño de dashboards",
        "Propósito por audiencia, jerarquía visual, minimalismo, accesibilidad WCAG y style guide consistente.",
        3,
      ),
      theoryLesson(
        "power-bi-import-relaciones-dax",
        "Power BI: importación, relaciones y DAX",
        "Import vs DirectQuery, star schema, columnas calculadas vs medidas, SUM/CALCULATE/DIVIDE.",
        3,
      ),
      theoryLesson(
        "filtros-drill-through-bookmarks",
        "Filtros, drill-through y bookmarks en Power BI",
        "Slicers sincronizados, drill-down vs drill-through, bookmarks para vistas ejecutiva/operativa y cross-filtering.",
        3,
      ),
      theoryLesson(
        "publicacion-refresh-programado",
        "Publicación, refresh programado y permisos",
        "Power BI Service, gateway on-premises, refresh programado, RLS y alternativas Looker Studio.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Dashboard Power BI con modelo star schema",
      description:
        "Importar ventas + dimensiones, modelar relaciones 1:N, crear 4 medidas DAX, dashboard con KPI cards + tendencia + slicers + drill-through a detalle. Publicar en workspace institucional.",
      hours: 3,
    },
  },
  {
    order: 8,
    title: "Comunicación, soft skills y empleabilidad analítica",
    description:
      "Data storytelling, comunicación con no técnicos, portafolio y trabajo en equipo — competencias que aceleran el primer empleo.",
    contactHours: 12,
    lessons: [
      {
        slug: "data-storytelling-stakeholders",
        title: "Data storytelling para stakeholders",
        description:
          "Narrativa con contexto-acción-resultado, slides vs dashboards, frameworks McKinsey/SCR y presentaciones de 10 minutos.",
        type: "soft-skills",
        hours: 3,
      },
      {
        slug: "comunicacion-insights-no-tecnicos",
        title: "Comunicar insights a audiencias no técnicas",
        description:
          "Traducir jerga analítica, manejar sesgos de confirmación, email ejecutivo y reuniones de seguimiento post-entrega.",
        type: "soft-skills",
        hours: 3,
      },
      {
        slug: "portafolio-linkedin-analista-junior",
        title: "Portafolio, LinkedIn y entrevistas para analista junior",
        description:
          "GitHub + Power BI publicado, README en español, keywords SQL/Excel/BI, case studies STAR y pruebas técnicas take-home.",
        type: "soft-skills",
        hours: 3,
      },
      {
        slug: "etica-datos-trabajo-equipo-analitico",
        title: "Ética profesional y trabajo en equipo analítico",
        description:
          "Confidencialidad, límites de acceso a datos, colaboración con engineers/marketing, code review de SQL y feedback constructivo.",
        type: "soft-skills",
        hours: 2,
      },
    ],
    labOrProject: {
      title: "PROJECT: Presentación de insights con role-play ejecutivo",
      description:
        "Presentar análisis del módulo 7 en 8 minutos ante panel simulado (CEO + operaciones). Recibir feedback sobre claridad, visualización y recomendaciones accionables. Re-entregar slide deck refinado.",
      hours: 1,
    },
  },
  {
    order: 9,
    title: "Integración, certificación y proyecto final",
    description:
      "Repaso Google Data Analytics y Power BI PL-300, simulacros cronometrados y case study integrador de cierre.",
    contactHours: 12,
    lessons: [
      {
        slug: "repaso-google-data-analytics-certificate",
        title: "Repaso Google Data Analytics Certificate",
        description:
          "Mapa de 8 cursos Coursera/Google, dominios Ask-Prepare-Process-Analyze-Share-Act, preguntas tipo certificación y recursos de práctica.",
        type: "exam-prep",
        hours: 3,
      },
      {
        slug: "repaso-power-bi-pl300-modelado-dax",
        title: "Repaso Power BI PL-300 — modelado y DAX",
        description:
          "Objetivos PL-300: preparar datos, modelar, visualizar, analizar (DAX), desplegar. Flashcards de funciones y escenarios PBQ.",
        type: "exam-prep",
        hours: 3,
      },
      {
        slug: "simulacro-sql-excel-cronometrado",
        title: "Simulacro integrado SQL + Excel cronometrado",
        description:
          "90 minutos: 10 preguntas SQL (JOINs, GROUP BY, CTEs) + 5 ejercicios Excel (INDEX-MATCH, pivot). Puntaje objetivo ≥70 %.",
        type: "exam-prep",
        hours: 3,
      },
      {
        slug: "case-study-analisis-estrategico-retail",
        title: "Case study: análisis estratégico retail end-to-end",
        description:
          "Escenario integrador: cadena retail con caída de margen. Profiling → SQL → Python → dashboard Power BI → recomendaciones estratégicas documentadas.",
        type: "project",
        hours: 3,
      },
    ],
    labOrProject: {
      title: "Simulacro de certificación y plan de estudio post-curso",
      description:
        "Completar simulacro PL-300 o Google DA (MeasureUp, ExamTopics o Microsoft Learn), analizar brechas por dominio y crear calendario de certificación personal a 90 días.",
      hours: 0,
    },
  },
];

export const dataAnalyticsCourse: NovaCollegeCourse = {
  title: "Técnico en Análisis de Datos",
  slug: "data-analytics-technician",
  tagline:
    "De Excel a SQL, Python y Power BI — el stack completo para tu primer empleo como analista de datos.",
  description:
    "Programa técnico de 120 horas orientado a empleabilidad que prepara analistas de datos entry-level con el stack moderno: Excel avanzado y Power Query, SQL intermedio (JOINs, CTEs, window functions), Python/pandas para análisis reproducible, estadística descriptiva aplicada y dashboards Power BI. Alineado a Google Data Analytics Certificate y Microsoft Power BI Data Analyst (PL-300). Diseñado para colegios técnicos, bootcamps y community colleges que licencian currículo NOVA + plataforma NOVA STEM HUB.",
  targetAudience:
    "Estudiantes de 16–25+ en programas técnicos o de transición laboral; graduados de secundaria con interés en negocios o STEM; adultos en reconversión hacia roles analíticos. No se requiere programación previa; álgebra básica y manejo de Excel introductorio recomendados.",
  durationHours: 120,
  prerequisites: [
    "Manejo de computadora, hojas de cálculo básicas y navegador web",
    "Álgebra básica (porcentajes, promedios)",
    "Lectura comprensiva en español; inglés técnico básico recomendado para documentación SQL/BI",
  ],
  learningOutcomes: [
    "Describir el ecosistema analítico, roles (analyst/scientist/engineer) y ciclo de vida de un proyecto de datos.",
    "Formular preguntas SMART, definir KPIs y documentar reglas de negocio en un data dictionary.",
    "Automatizar reportes con Excel (Power Query, pivot tables, INDEX-MATCH) y visualizaciones accesibles.",
    "Escribir consultas SQL intermedias: JOINs, GROUP BY, subconsultas, CTEs y window functions sobre bases relacionales.",
    "Realizar data profiling, detectar problemas de calidad y explicar el rol del analista en pipelines ETL/ELT.",
    "Ejecutar análisis reproducible con Python/pandas: limpieza, agregaciones y visualización con matplotlib/seaborn.",
    "Aplicar estadística descriptiva, interpretar correlaciones con rigor (sin confundir causalidad) y reportar intervalos de confianza.",
    "Diseñar, modelar y publicar dashboards Power BI con DAX, interactividad y refresh programado.",
    "Comunicar insights a stakeholders no técnicos y construir portafolio verificable para empleo entry-level.",
    "Prepararse para certificaciones Google Data Analytics y Microsoft PL-300 con simulacros y case study integrador.",
  ],
  certificationAlignment: {
    primary: [
      "Google Data Analytics Professional Certificate",
      "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
    ],
    secondary: [
      "Microsoft Excel (MO-210) — competencias cubiertas en módulo 2",
      "Tableau Desktop Specialist (conceptual — principios de visualización transferibles)",
    ],
    examPrepHours: 12,
    notes:
      "El currículo mapea las 8 unidades del certificado Google DA y los dominios PL-300 (Prepare, Model, Visualize, Analyze, Deploy). Instituciones pueden bundlear vouchers Microsoft o acceso Coursera/Google Career Certificates. Labs usan PostgreSQL/SQLite, Google Colab y Power BI Desktop (gratuito).",
  },
  formatBreakdown: {
    theoryHours: 48,
    labsProjectsHours: 48,
    softSkillsHours: 12,
    examPrepHours: 12,
  },
  modules: attachContentToModules(RAW_MODULES, DATA_ANALYTICS_LESSONS),
  capstone: {
    title: "Capstone: Análisis estratégico para retail multicanal",
    description:
      "Proyecto integrador de 8 horas: una cadena retail ficticia con operaciones en México/Colombia reporta caída de margen en e-commerce pese a crecimiento de tráfico. El estudiante debe (1) formular preguntas SMART con stakeholders simulados, (2) auditar calidad de datos de ventas, inventario y marketing, (3) extraer y transformar con SQL + Python, (4) calcular KPIs de conversión, ticket promedio, stock-out y CAC por canal, (5) publicar dashboard Power BI con drill-through por región/categoría, y (6) entregar memo estratégico con 3 recomendaciones priorizadas, limitaciones del análisis y plan de seguimiento. Presentación oral de 12 minutos ante panel simulado de empleadores.",
    deliverables: [
      "Brief analítico + data dictionary acordado con stakeholder simulado",
      "Scripts SQL (.sql) y notebook Python (HTML export) con profiling documentado",
      "Dashboard Power BI publicado con refresh funcional y al menos 4 medidas DAX",
      "Memo estratégico (2–3 páginas): insights, recomendaciones, limitaciones y próximos pasos",
      "Presentación oral + Q&A (12 min) y portafolio PDF para verify.novahub.education",
    ],
    hours: 8,
  },
  assessmentRubric: {
    components: [
      {
        name: "Labs modulares (Excel, SQL, Python, Power BI)",
        weight: 40,
        description:
          "Rúbrica por lab: completitud, calidad de datos, documentación, reproducibilidad y visualización clara.",
      },
      {
        name: "Capstone — análisis estratégico retail",
        weight: 25,
        description:
          "Coherencia analítica de pregunta a recomendación, dashboard funcional, memo accionable y demo oral.",
      },
      {
        name: "Simulacros de certificación (Google DA / PL-300 / SQL)",
        weight: 15,
        description:
          "Puntaje ≥70 % en al menos dos simulacros cronometrados (SQL+Excel integrado y PL-300 o Google DA).",
      },
      {
        name: "Comunicación y soft skills",
        weight: 10,
        description:
          "Presentación de insights, data storytelling, role-play ejecutivo y feedback entre pares.",
      },
      {
        name: "Evaluaciones teóricas modulares",
        weight: 10,
        description:
          "Quizzes por módulo sobre ética, SQL, estadística y diseño de dashboards; promedio mínimo 75 %.",
      },
    ],
    passingCriteria:
      "Calificación final ≥80/100, 100 % de labs entregados, capstone aprobado, asistencia ≥85 %. Certificado verificable NOVA-COL-DA emitido al completar (independiente de aprobar exámenes Google/Microsoft externos).",
  },
  facilitatorNotes: [
    "Stack mínimo: Excel 365 o Google Sheets, PostgreSQL o SQLite (DB Browser), Google Colab, Power BI Desktop. No se requiere licencia Premium de Power BI — workspace institucional o cuenta Pro demo suficiente para publicación.",
    "Datasets recomendados: Northwind/Sakila (SQL), Kaggle Retail Sales o Superstore (Python), datos sintéticos retail incluidos en guía del facilitador.",
    "Módulos 1–4 pueden co-docenciarse con instructor de bases de datos; módulos 5–7 con perfil más orientado a BI/Python.",
    "Enfatizar ética y privacidad desde módulo 1 — muchos estudiantes comparten datasets en GitHub sin anonimizar.",
    "Para instituciones sin Power BI: módulo 7 tiene fallback Looker Studio documentado; capstone acepta entrega equivalente.",
    "Sesión mensual opcional con mentor de industria (analista senior retail/fintech) para revisión de capstone — modelo NOVA Innovation Mentor.",
    "Simulacros: Microsoft Learn para PL-300 (gratuito), Coursera practice quizzes para Google DA, SQLBolt/Mode para SQL.",
  ],
  employabilitySkills: [
    "Formulación de preguntas de negocio (SMART)",
    "Excel avanzado y automatización (Power Query)",
    "SQL intermedio para extracción y agregación",
    "Python/pandas para análisis reproducible",
    "Estadística descriptiva y comunicación de incertidumbre",
    "Diseño y publicación de dashboards Power BI",
    "Data storytelling y presentación a ejecutivos",
    "Data profiling y pensamiento crítico sobre calidad de datos",
    "Ética, privacidad y cumplimiento (LFPDPPP/GDPR intro)",
    "Construcción de portafolio analítico verificable",
  ],
  pathwayBridge: {
    relatedPathwaySlug: "cybersecurity-analyst",
    notes:
      "Analistas que profundizan en logs y SIEM pueden continuar hacia Cybersecurity Analyst. Complementa tracks IT Support (SQL/reporting) e IoT (series temporales de sensores).",
  },
  verifyCertificatePrefix: "NOVA-COL-DA",
};
