/**
 * High-quality LessonContent maps for Digital Marketing & Startup tracks.
 * Matches NOVA College ES lesson depth (unique sections per topic — not thin stubs).
 * Run: node scripts/generate-college-business-lessons.mjs
 */
import fs from "fs";
import path from "path";

const LESSONS_DIR = path.resolve("src/data/nova-college/lessons");

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function four(slug, headings, bodies, summary, career, glossary, refs, visual) {
  const g = glossary
    .map(([t, d]) => `      { term: "${esc(t)}", definition: "${esc(d)}" }`)
    .join(",\n");
  const r = refs
    .map(([title, url, author]) =>
      author
        ? `      { title: "${esc(title)}", url: "${url}", author: "${esc(author)}" }`
        : `      { title: "${esc(title)}", url: "${url}" }`,
    )
    .join(",\n");
  const h = headings.map((x) => `"${esc(x)}"`).join(", ");
  const b = bodies.map((x) => `"${esc(x)}"`).join(",\n      ");
  const vis = visual
    ? `,\n    {\n      type: "${visual.type}",\n      title: "${esc(visual.title)}",\n      afterSection: ${visual.afterSection},\n      caption: "${esc(visual.caption || "")}",\n    }`
    : "";
  return `  "${slug}": fourSectionLesson(
    [${h}],
    [
      ${b}
    ],
    "${esc(summary)}",
    "${esc(career)}",
    [
${g}
    ],
    [
${r}
    ]${vis}
  )`;
}

const MKT_REFS = [
  ["Meta Blueprint / Digital Marketing Associate", "https://www.facebook.com/business/learn", "Meta"],
  ["Google Digital Marketing & E-commerce Certificate", "https://grow.google/certificates/digital-marketing-ecommerce/", "Google"],
  ["HubSpot Academy — Inbound Marketing", "https://academy.hubspot.com/", "HubSpot"],
];

const START_REFS = [
  ["The Lean Startup — methodology overview", "https://leanstartup.co/principles/", "Lean Startup Co."],
  ["NSF I-Corps — Customer Discovery", "https://www.nsf.gov/innovation/i-corps", "NSF"],
  ["Y Combinator — Startup Library", "https://www.ycombinator.com/library", "Y Combinator"],
];

/** @type {Record<string, Function>} */
const marketing = {
  "digital-marketing-ecosystem-roles": () =>
    four(
      "digital-marketing-ecosystem-roles",
      [
        "Por qué el marketing digital es una carrera employable (no solo 'postear')",
        "Roles entry-level: social, content, growth, e-commerce coordination",
        "Skills que diferencian a un junior contratable",
        "Cómo armar evidencia de portfolio desde el día 1",
      ],
      [
        "El marketing digital conecta productos y causas con audiencias reales mediante contenido, canales pagos y orgánicos, email y analytics. En PYMEs y startups LATAM/USA, un generalista junior que planifica calendarios, mide resultados y documenta experimentos vale más que alguien que solo 'tiene buen ojo' sin métricas. NOVA College trata marketing como operación medible.",
        "Roles típicos: Social Media Coordinator, Content Creator/Associate, Growth Intern, E-commerce Ops Assistant, Community Manager junior. Cada rol exige escritura clara, criterio ético, nociones de embudo (awareness→conversion) y capacidad de reportar en Sheets/Notion.",
        "Empleadores buscan: brief interpretado sin drama, assets entregados a tiempo, UTM correctos, y post-mortems honestos. Un candidato con 2 case studies (problema→estrategia→resultado) supera a CV con buzzwords.",
        "Desde el módulo 1 guarda artefactos: persona, calendario, capturas de insights, reportes semanales. Tu certificado NOVA-COL-MKT se verifica; el portfolio demuestra que sabes operar.",
      ],
      "Marketing digital employable = roles claros + métricas + portfolio de experimentos documentados.",
      "En entrevista: 'Coordiné un mini-calendario de 2 semanas, etiqueté UTMs, reporté engagement y propuse un cambio basado en datos — evidencia en mi case study.'",
      [
        ["Embudo", "Etapas del viaje del cliente: awareness, consideración, conversión, retención."],
        ["Growth", "Disciplina de experimentos para adquirir y retener usuarios de forma eficiente."],
        ["UTM", "Parámetros en URLs para atribuir tráfico a campañas en analytics."],
        ["Community management", "Moderación, respuesta y cuidado de la comunidad en canales sociales."],
      ],
      MKT_REFS,
      { type: "data-pipeline", title: "Ecosistema de roles marketing digital", afterSection: 1, caption: "Content · Social · Ads · Email · Analytics → revenue/impact." },
    ),

  "customer-personas-journey": () =>
    four(
      "customer-personas-journey",
      [
        "Personas basadas en evidencia (no estereotipos)",
        "Journey map: awareness → consideración → conversión",
        "Mensajes inclusivos y segmentación ética",
        "Entregable: persona + journey para un brand scenario",
      ],
      [
        "Una persona resume un segmento: metas, fricciones, canales que usa, objeciones. Se construye con entrevistas, encuestas y datos — no con clichés. Incluye contexto cultural y accesibilidad.",
        "En cada etapa del journey el usuario necesita un mensaje distinto. Awareness educa; consideración compara; conversión reduce fricción (prueba social, FAQ, CTA claro).",
        "Inclusión: evita assumptions de género/ingreso; ofrece lenguaje claro; no weaponices inseguridades. La segmentación ética usa consentimiento y datos mínimos.",
        "Entrega un one-pager: persona (foto conceptual OK), 3 pains, 3 jobs-to-be-done, journey con 1 contenido por etapa.",
      ],
      "Personas + journey convierten intuición en plan de contenidos y ofertas por etapa.",
      "Pregunta de entrevista: '¿Cómo validaste la persona?' — cita entrevistas/quotes, no 'me pareció'.",
      [
        ["Persona", "Arquetipo de cliente basado en investigación."],
        ["JTBD", "Jobs To Be Done — el 'trabajo' que el cliente intenta completar."],
        ["CTA", "Call To Action — acción pedida al usuario."],
        ["Objeción", "Razón por la que el usuario duda antes de convertir."],
      ],
      MKT_REFS,
    ),

  "digital-marketing-career-paths": () =>
    four(
      "digital-marketing-career-paths",
      [
        "Rutas de carrera y certificaciones alineadas",
        "LinkedIn y presencia profesional para creativos",
        "Networking ético y mentores",
        "Plan de 90 días post-track",
      ],
      [
        "Rutas: Social → Content Lead; Coordinador → Specialist (SEO/Ads); Freelance generalista → retainer. Certificaciones Meta/Google/HubSpot validan vocabulario; el portfolio valida ejecución.",
        "LinkedIn: titular orientado a resultado ('Digital marketing junior | content + analytics'), featured case studies, banner limpio. Publica aprendizajes de labs NOVA sin inventar métricas.",
        "Networking: aporta valor (resúmenes de experimentos, intros útiles). Evita spam de '¿me contratas?' sin contexto.",
        "Plan 90 días: 2 case studies pulidos, 1 cert intro, 3 aplicaciones/semana, 1 proyecto pro-bono medido.",
      ],
      "Carrera = credencial + evidencia + red. Planifica 90 días con artefactos medibles.",
      "STAR de 90s: situación PYME, tarea (calendario), acción (UTM+reporte), resultado (insight + siguiente experimento).",
      [
        ["Retainer", "Contrato mensual recurrente de servicios."],
        ["Case study", "Historia problema→estrategia→resultado con evidencia."],
        ["Personal brand", "Promesa profesional consistente en canales públicos."],
      ],
      MKT_REFS,
    ),

  "brand-identity-tone-voice": () =>
    four(
      "brand-identity-tone-voice",
      [
        "Identidad: promesa, valores, personalidad",
        "Tone of voice y guía corta usable",
        "Value proposition que cabe en una frase",
        "Errores típicos de marcas jóvenes",
      ],
      [
        "Identidad no es solo logo: es promesa + prueba. Define qué nunca dirías (miedo, clickbait engañoso).",
        "Tone of voice: 3 adjetivos + ejemplos do/don't. Ejemplo: claro, cálido, preciso — don't: sarkasmo cruel.",
        "Value proposition: para [audiencia], [marca] ayuda a [resultado] porque [diferenciador].",
        "Errores: copiar voz de otra marca, inconsistencia entre posts, claims sin evidencia.",
      ],
      "Brand kit verbal primero; visual después. Consistencia genera confianza.",
      "En lab: entrega guía de voz de 1 página + 2 ejemplos de posts on-brand/off-brand.",
      [
        ["Tone of voice", "Personalidad lingüística de la marca."],
        ["Value proposition", "Promesa de valor diferenciada para un segmento."],
        ["Brand guidelines", "Reglas de uso verbal/visual."],
      ],
      MKT_REFS,
      { type: "data-pipeline", title: "Promesa → voz → prueba", afterSection: 0, caption: "Identidad operativa para equipos pequeños." },
    ),

  "visual-content-canva": () =>
    four(
      "visual-content-canva",
      [
        "Principios de diseño para no-diseñadores",
        "Canva: jerarquía, templates, brand kit",
        "Accesibilidad visual (contraste, texto)",
        "Sistema de 5 piezas reutilizables",
      ],
      [
        "Jerarquía, contraste, alineación, proximidad, espacio en blanco. Un focal point por pieza.",
        "Canva Brand Kit: colores, fuentes, logos. Templates reducen caos en equipos.",
        "Accesibilidad: contraste AA cuando sea posible; texto grande en stories; no información solo por color.",
        "Sistema: portada, tip educativo, testimonio, CTA, bastidores. Misma familia visual.",
      ],
      "Diseño junior employable = claridad + sistema + accesibilidad, no efectos aleatorios.",
      "Entrega 5 posts on-brand con alt-text sugerido y checklist de contraste.",
      [
        ["Jerarquía visual", "Orden en que el ojo lee elementos."],
        ["Brand kit", "Activos y reglas visuales centralizadas."],
        ["Alt text", "Descripción de imagen para accesibilidad y contexto."],
      ],
      MKT_REFS,
    ),

  "storytelling-copywriting-basics": () =>
    four(
      "storytelling-copywriting-basics",
      [
        "Frameworks: PAS, AIDA, story spine corto",
        "Hooks éticos y CTAs honestos",
        "Beneficio vs feature",
        "Edición: cortar el 30% sobrante",
      ],
      [
        "PAS (Problem-Agitate-Solve) y AIDA funcionan si no manipulan. Story spine: gancho→fricción→acción→resultado.",
        "Hooks de curiosidad/especificidad > miedo. CTA: una acción clara por pieza.",
        "Feature: 'tiene analytics'. Beneficio: 'sabes qué post enseñó de verdad esta semana'.",
        "Edita en voz alta. Elimina adverbios vacíos y claims sin prueba.",
      ],
      "Copy employable es claro, verificable y orientado a una acción.",
      "Ejercicio: reescribe un post feature-heavy a beneficio + CTA + prueba.",
      [
        ["PAS", "Problem, Agitate, Solve — estructura de copy."],
        ["AIDA", "Attention, Interest, Desire, Action."],
        ["Hook", "Primeras líneas que ganan atención."],
      ],
      MKT_REFS,
    ),

  "platform-strategy-instagram-tiktok-linkedin": () =>
    four(
      "platform-strategy-instagram-tiktok-linkedin",
      [
        "Encaje audiencia–plataforma",
        "Formatos nativos y reutilización inteligente",
        "Cadencia realista para equipos pequeños",
        "LinkedIn para empleabilidad creativa",
      ],
      [
        "Instagram/TikTok: discovery y educación corta. LinkedIn: credibilidad profesional y B2B ligero. No copies el mismo crop sin adaptar.",
        "Graba una vez, deriva: reel + carrusel + quote LinkedIn. Mantén caption nativa.",
        "Cadencia sostenible > virality burnout. 3–5 piezas/semana bien hechas superan 20 mediocres.",
        "LinkedIn: documenta labs y case studies; comenta con sustancia en posts del sector.",
      ],
      "Estrategia de plataformas = fit de audiencia + formatos nativos + cadencia sostenible.",
      "Planifica una matriz canal×formato×objetivo para 2 semanas.",
      [
        ["Formato nativo", "Pieza diseñada para el comportamiento del canal."],
        ["Cadencia", "Ritmo de publicación sostenible."],
        ["Repurposing", "Reutilizar un asset master en varios formatos."],
      ],
      MKT_REFS,
    ),

  "content-calendar-engagement": () =>
    four(
      "content-calendar-engagement",
      [
        "Calendario editorial que un equipo puede operar",
        "Engagement: respuesta, UGC, moderación",
        "Crisis basics para community",
        "Plantilla semanal de reporte",
      ],
      [
        "Columnas útiles: fecha, pilar, formato, owner, status, CTA, UTM. Colores por estado.",
        "Engagement es trabajo: SLA de respuesta, banco de respuestas, UGC con permiso.",
        "Crisis: pausa amplificación, verifica hechos, responde con empatía, escala a mentor/legal si aplica.",
        "Reporte semanal: 3 métricas, 1 aprendizaje, 1 experimento siguiente.",
      ],
      "Operar community es proceso + empatía + documentación — no solo creativo.",
      "Entrega calendario 14 días + reglas de moderación de 1 página.",
      [
        ["UGC", "User Generated Content — contenido creado por la comunidad."],
        ["Moderación", "Reglas y acciones para mantener conversaciones seguras."],
        ["SLA", "Tiempo de respuesta acordado."],
      ],
      MKT_REFS,
      { type: "data-pipeline", title: "Calendario → publicación → engagement → reporte", afterSection: 1, caption: "Loop operativo semanal." },
    ),

  "social-analytics-kpis": () =>
    four(
      "social-analytics-kpis",
      [
        "KPIs que importan según objetivo",
        "Engagement rate y trampas de vanidad",
        "Lectura de insights nativos",
        "Informe ejecutivo de 1 página",
      ],
      [
        "Objetivo awareness ≠ objetivo conversión. Elige 1 KPI primario + 2 secundarios.",
        "Vanity: likes sin relación a saves/clicks/signups. Engagement rate contextualiza.",
        "Lee retención de reels, fuentes de tráfico, CTR de link in bio / UTM.",
        "Informe: objetivo, resultado, insight, decisión. Sin novelas.",
      ],
      "Analytics junior = elegir KPI correcto y decidir el siguiente experimento.",
      "Construye un tablero Sheets con semáforo y notas de insight.",
      [
        ["KPI", "Indicador clave alineado a objetivo."],
        ["CTR", "Click-through rate."],
        ["Engagement rate", "Interacciones relativas al alcance o seguidores."],
      ],
      MKT_REFS,
    ),

  "content-marketing-funnel": () =>
    four(
      "content-marketing-funnel",
      [
        "Contenido por etapa del embudo",
        "Lead magnets éticos y captura",
        "Nurturing sin spam",
        "Medición de contenido → lead → acción",
      ],
      [
        "TOFU educa; MOFU compara; BOFU convierte. Cada pieza tiene un job.",
        "Lead magnet útil (checklist, plantilla) con consentimiento claro. No gates engañosos.",
        "Nurturing: secuencia corta con valor; frecuencia respetuosa; unsubscribe visible.",
        "Atribuye con UTM y define conversión (descarga, registro, booking).",
      ],
      "Content marketing conecta educación con pipeline — con ética de consentimiento.",
      "Diseña un lead magnet + 3 emails de nurturing con métricas.",
      [
        ["TOFU/MOFU/BOFU", "Top/Middle/Bottom of funnel."],
        ["Lead magnet", "Recurso a cambio de contacto consentido."],
        ["Nurturing", "Secuencia que educa hacia una decisión."],
      ],
      MKT_REFS,
    ),

  "seo-keyword-research": () =>
    four(
      "seo-keyword-research",
      [
        "Search intent y tipos de queries",
        "Keyword research práctico y ético",
        "On-page SEO esencial",
        "Brief de artículo optimizado",
      ],
      [
        "Intent: informacional, navegacional, transaccional. Alinea título y contenido al intent.",
        "Herramientas free + autocompletado + Search Console. Evita keyword stuffing y granjas de contenido.",
        "Title, H1, meta description, URLs claras, links internos, accesibilidad.",
        "Brief: keyword, intent, outline H2, FAQ, CTA, internal links.",
      ],
      "SEO junior = intent + on-page claro + utilidad real al lector.",
      "Entrega keyword sheet + outline 800 palabras + meta description.",
      [
        ["Search intent", "Objetivo del usuario al buscar."],
        ["On-page SEO", "Optimización dentro de la página."],
        ["Search Console", "Herramienta Google para rendimiento de búsqueda."],
      ],
      MKT_REFS,
    ),

  "video-short-form-basics": () =>
    four(
      "video-short-form-basics",
      [
        "Hooks visuales en 0–2 segundos",
        "Guion corto y subtítulos",
        "Batch filming workflow",
        "Accesibilidad y seguridad de marca",
      ],
      [
        "Primer frame debe prometer valor. Texto grande ayuda sin sonido.",
        "Guion: gancho → 3 beats → CTA. Subtítulos no opcionales.",
        "Batch: un setup, múltiples tomas, naming de archivos, shot list.",
        "Evita música con copyright; respeta rostros/permisos; no claims médicos falsos.",
      ],
      "Short-form profesional = hook + subtítulos + workflow reproducible.",
      "Produce 1 reel educativo con shot list y captions.",
      [
        ["Batch filming", "Grabar varias piezas en una sesión."],
        ["Safe zone", "Área visible en UI de apps verticales."],
        ["Captioning", "Subtítulos para accesibilidad."],
      ],
      MKT_REFS,
    ),

  "email-campaigns-segmentation": () =>
    four(
      "email-campaigns-segmentation",
      [
        "Anatomía de campañas que se abren",
        "Segmentación básica por comportamiento",
        "Deliverability awareness",
        "Welcome series de 3 emails",
      ],
      [
        "Subject claro, preview text útil, un CTA primario, diseño simple.",
        "Segmenta por interés/actividad — no bombardees a todos igual.",
        "List hygiene, consentimiento, evitar spam words engañosos, autenticación (SPF/DKIM conceptual).",
        "Welcome: expectativa → valor → siguiente paso. Mide open/click con cautela.",
      ],
      "Email sigue siendo ROI alto cuando hay consentimiento y relevancia.",
      "Diseña welcome series en Mailchimp sandbox con segmentos.",
      [
        ["Deliverability", "Probabilidad de llegar a inbox."],
        ["Segmentación", "Enviar mensajes distintos a grupos distintos."],
        ["Welcome series", "Secuencia automática post-signup."],
      ],
      MKT_REFS,
    ),

  "marketing-automation-crm": () =>
    four(
      "marketing-automation-crm",
      [
        "CRM como sistema de verdad de contactos",
        "Triggers y workflows simples",
        "Handoff marketing→ventas/ops",
        "Evitar over-automation",
      ],
      [
        "CRM registra origen, consentimiento, etapa. Sin higiene, automation amplifica basura.",
        "Triggers: signup, click, no-open. Acciones: tag, email, tarea humana.",
        "Handoff: definición de lead listo + notas contextuales.",
        "Automatiza lo repetible; personaliza lo sensible. Revisa workflows mensualmente.",
      ],
      "Automation junior responsable = triggers claros + datos limpios + supervisión humana.",
      "Mapa un workflow de 5 nodos y documenta excepciones humanas.",
      [
        ["CRM", "Customer Relationship Management."],
        ["Trigger", "Evento que inicia un workflow."],
        ["Lead scoring", "Puntaje de readiness (intro)."],
      ],
      MKT_REFS,
    ),

  "privacy-consent-gdpr-marketing": () =>
    four(
      "privacy-consent-gdpr-marketing",
      [
        "Consentimiento, opt-in y minimización",
        "CAN-SPAM / GDPR / LFPDPPP — lo que un marketer debe saber",
        "Datos que no debes pedir",
        "Checklist ético pre-campaña",
      ],
      [
        "Consentimiento informado, fácil de retirar. Minimiza campos del form.",
        "Conoce principios: identificación del remitente, unsubscribe, bases legales conceptuales. Consulta legal en casos reales.",
        "Evita datos sensibles innecesarios (salud, documentos). No compres listas dudosas.",
        "Checklist: base de consentimiento, finalidad clara, retención, acceso al equipo mínimo.",
      ],
      "Privacidad es parte del craft — no un obstáculo opcional.",
      "Audita un form de captura y reescríbelo con minimización.",
      [
        ["Opt-in", "Consentimiento activo para recibir comunicaciones."],
        ["Minimización", "Recolectar solo datos necesarios."],
        ["Unsubscribe", "Mecanismo de baja obligatorio en email marketing."],
      ],
      MKT_REFS,
      { type: "security-scenario", title: "Checklist de consentimiento", afterSection: 2, caption: "Pre-flight ético de campaña." },
    ),

  "meta-ads-fundamentals": () =>
    four(
      "meta-ads-fundamentals",
      [
        "Estructura Campaign→Ad set→Ad",
        "Objetivos y audiencias (sin gastar de más)",
        "Creatividades que se pueden medir",
        "Pixel/conversiones — conceptos",
      ],
      [
        "Jerarquía Meta Ads: objetivo de campaña, targeting/budget en ad set, creativos en ads.",
        "Empieza con audiencias definidas y presupuestos de práctica/mock. Documenta hipótesis.",
        "Testea 2–3 creativos con mismo mensaje nuclear. Una variable a la vez.",
        "Pixel/API de conversiones conectan eventos; en labs NOVA usamos planes mock sin gasto real obligatorio.",
      ],
      "Ads fundamentals = estructura + hipótesis + medición — no boost improvisado.",
      "Entrega brief de campaña mock: objetivo, audiencia, 3 ads, KPIs, presupuesto simulado.",
      [
        ["Ad set", "Nivel de audiencia, presupuesto y programación."],
        ["Pixel", "Código de tracking de eventos en sitio."],
        ["Creative", "Imagen/video/texto del anuncio."],
      ],
      MKT_REFS,
    ),

  "google-ads-search-display": () =>
    four(
      "google-ads-search-display",
      [
        "Search vs Display: cuándo usar cada uno",
        "Keywords, match types e intención",
        "Quality Score conceptual y landing alignment",
        "Copy de anuncios de búsqueda",
      ],
      [
        "Search captura demanda existente; Display genera demanda/retargeting. No mezcles objetivos.",
        "Keywords alineadas a intent. Negativas para evitar basura.",
        "Landing debe cumplir la promesa del anuncio. Velocidad y claridad importan.",
        "Headlines específicos + descripción con beneficio + CTA. Extensiones conceptuales.",
      ],
      "Google Ads junior entiende intent, relevancia y alineación anuncio–landing.",
      "Escribe 3 anuncios de search + lista de negativas para un escenario educativo.",
      [
        ["Quality Score", "Señal de relevancia de Google Ads."],
        ["Match type", "Control de amplitud de keywords."],
        ["Landing page", "Página de destino post-click."],
      ],
      MKT_REFS,
    ),

  "budget-roas-reporting": () =>
    four(
      "budget-roas-reporting",
      [
        "Presupuestos diarios y tradeoffs",
        "ROAS/CPA y límites de interpretación",
        "A/B de creativos con disciplina",
        "Slides client-ready",
      ],
      [
        "Caps diarios evitan sorpresas. Reserva learning budget. Documenta supuestos.",
        "ROAS alto con volumen bajo puede engañar. Reporta intervalo y tamaño muestral honestamente.",
        "A/B: una variable, tiempo mínimo, criterio de ganador predefinido.",
        "Slide: objetivo, spend, resultado, insight, decisión. Sin jerga innecesaria.",
      ],
      "Performance marketing es rigor experimental + comunicación clara a stakeholders.",
      "Arma un reporte mock de 2 semanas con decisión de pausar/escalar.",
      [
        ["ROAS", "Return on Ad Spend."],
        ["CPA", "Cost per Acquisition."],
        ["A/B test", "Comparación controlada de variantes."],
      ],
      MKT_REFS,
    ),

  "ecommerce-shopify-basics": () =>
    four(
      "ecommerce-shopify-basics",
      [
        "Anatomía de una tienda que convierte",
        "Fichas de producto y trust signals",
        "Checkout friction awareness",
        "Mensajería de envíos y políticas",
      ],
      [
        "Home clara, navegación simple, búsqueda, pruebas sociales. Mobile-first.",
        "Producto: fotos, beneficios, specs, FAQ, reviews. Evita stock photos engañosas.",
        "Cada campo extra en checkout mata conversión. Guest checkout cuando sea posible.",
        "Políticas visibles: envío, devoluciones, contacto real.",
      ],
      "E-commerce junior conecta merchandising con confianza y fricción mínima.",
      "Audita una tienda demo y lista 8 mejoras priorizadas.",
      [
        ["Trust signal", "Elemento que reduce riesgo percibido."],
        ["Checkout friction", "Fricción que abandona carritos."],
        ["Merchandising", "Presentación de productos para venta."],
      ],
      MKT_REFS,
    ),

  "google-analytics-4-reports": () =>
    four(
      "google-analytics-4-reports",
      [
        "GA4 mental model: events & parameters",
        "Informes que importan a marketing",
        "UTM discipline",
        "Diagnóstico de campañas con GA4",
      ],
      [
        "GA4 es event-based. Define eventos clave (signup, purchase, download) con naming consistente.",
        "Tráfico por fuente/medio, páginas top, embudos simples, retención intro.",
        "UTM: source/medium/campaign/content. Sin UTM, atribución es adivinanza.",
        "Compara landings de campaña vs orgánicas; valida que el CTA se cumple.",
      ],
      "GA4 para marketers = eventos + UTM + decisiones semanales.",
      "Configura demo property mentalmente y entrega un weekly dashboard template.",
      [
        ["GA4", "Google Analytics 4."],
        ["Event", "Interacción trackeada."],
        ["Attribution", "Asignación de crédito a canales."],
      ],
      MKT_REFS,
      { type: "data-pipeline", title: "UTM → evento → insight → decisión", afterSection: 1, caption: "Cadena de medición." },
    ),

  "excel-sheets-marketing-dashboards": () =>
    four(
      "excel-sheets-marketing-dashboards",
      [
        "Estructura de un campaign tracker",
        "Fórmulas útiles y data hygiene",
        "Cohortes y vistas ejecutivas",
        "One-pager para founders/directores",
      ],
      [
        "Hojas: raw, clean, dashboard. No calcules sobre raw sucio.",
        "SUMIFS, porcentaje de cambio, validación de datos. Fechas ISO.",
        "Cohorte simple: signup week → activación. Vista ejecutiva: 5 celdas + sparkline conceptual.",
        "One-pager: qué pasó, por qué, qué haremos. Máx 1 página.",
      ],
      "Sheets es el CRM visual del marketer junior — higiene > widgets.",
      "Construye tracker con semáforo y notas de insight obligatorias.",
      [
        ["Data hygiene", "Limpieza y consistencia de datos."],
        ["Cohorte", "Grupo de usuarios que comparten inicio en el tiempo."],
        ["Dashboard", "Vista resumida para decisiones."],
      ],
      MKT_REFS,
    ),

  "marketing-portfolio-case-study": () =>
    four(
      "marketing-portfolio-case-study",
      [
        "Estructura de case study contratante",
        "Visual storytelling de resultados",
        "Qué hacer si no hay métricas 'grandes'",
        "Publicación ética de trabajo",
      ],
      [
        "Problema → restricciones → estrategia → ejecución → resultados → aprendizaje.",
        "Antes/después, 1 gráfico simple, quotes de stakeholder si hay permiso.",
        "Métricas de proceso también cuentan: tiempo de ciclo, claridad, completion de checklist.",
        "Anonimiza clientes sensibles; no inventes ROAS.",
      ],
      "Portfolio = narrativa verificable. Honestidad > vanity screenshots.",
      "Escribe un case study de 1–2 páginas de tu lab capstone.",
      [
        ["Case study", "Narrativa profesional de un proyecto."],
        ["Stakeholder", "Persona interesada/afectada por el proyecto."],
        ["Before/after", "Evidencia comparativa."],
      ],
      MKT_REFS,
    ),

  "freelance-proposals-pricing": () =>
    four(
      "freelance-proposals-pricing",
      [
        "Scope que evita scope creep",
        "Pricing: fixed vs retainer intro",
        "Propuestas claras y límites",
        "Ética en plataformas freelance",
      ],
      [
        "Define entregables, rondas de revisión, qué está fuera. Todo por escrito.",
        "Fixed para paquetes claros; retainer para ongoing. Incluye depósitos.",
        "Propuesta: problema, enfoque, timeline, precio, next step. Sin novelas.",
        "No copies portfolios ajenos; no subastes calidad a $5 si no es sostenible.",
      ],
      "Freelance sostenible = scope escrito + precio honesto + comunicación.",
      "Redacta una propuesta de paquete social 2 semanas para PYME ficticia.",
      [
        ["Scope creep", "Expansión no controlada del trabajo acordado."],
        ["Retainer", "Pago mensual recurrente."],
        ["SOW", "Statement of Work."],
      ],
      MKT_REFS,
    ),

  "capstone-campaign-planning": () =>
    four(
      "capstone-campaign-planning",
      [
        "Elegir brand scenario con impacto",
        "SMART goals y channel mix",
        "Riesgos éticos y mitigaciones",
        "Kickoff del capstone full-funnel",
      ],
      [
        "Elige wellness, education o social-impact con restricciones realistas (presupuesto mock).",
        "SMART + canal primario + 2 secundarios. KPI primario único.",
        "Mitiga: consentimiento, claims, accesibilidad, crisis plan lite.",
        "Kickoff checklist: persona, journey, calendario, UTMs, dashboard, roles.",
      ],
      "Capstone se gana con plan operable, no con slides bonitos vacíos.",
      "Entrega strategy deck milestone 1 del capstone.",
      [
        ["SMART", "Specific, Measurable, Achievable, Relevant, Time-bound."],
        ["Channel mix", "Combinación de canales hacia un objetivo."],
        ["Full-funnel", "Estrategia que cubre varias etapas del embudo."],
      ],
      MKT_REFS,
      { type: "data-pipeline", title: "Capstone full-funnel kickoff", afterSection: 1, caption: "Persona → mix → calendario → medición." },
    ),
};

// Startup lessons — similarly rich
const startup = {
  "startup-ecosystem-roles": () =>
    four(
      "startup-ecosystem-roles",
      [
        "Mapa del ecosistema startup (founders, ops, growth, product)",
        "Roles entry-level reales para estudiantes",
        "Aceleradoras, hubs e intrapreneurship",
        "Cómo entrar sin 'tengo una app'",
      ],
      [
        "Startups son organizaciones de aprendizaje bajo incertidumbre. Roles tempranos mezclan ejecución y descubrimiento.",
        "Founder's associate, growth intern, community ops, product coordinator, research assistant de customer discovery.",
        "Aceleradoras enseñan ritmo y red; intrapreneurship aplica lo mismo dentro de empresas/escuelas.",
        "Entra con evidencia: entrevistas, canvas, MVP no-code, pitch honesto. Evita vaporware.",
      ],
      "Ecosistema startup se navega con evidencia de discovery y ejecución, no solo ideas.",
      "Prepara un pitch de 60s sobre un rol que quieres y la evidencia que ya tienes.",
      [
        ["Founder's associate", "Generalista temprano que apoya al founder en ops y proyectos."],
        ["Accelerator", "Programa intensivo de mentorship y red para startups."],
        ["Intrapreneurship", "Innovación emprendedora dentro de una organización."],
      ],
      START_REFS,
      { type: "troubleshooting-flowchart", title: "Rutas de entrada al ecosistema", afterSection: 1, caption: "Evidence → rol → red." },
    ),

  "problem-solution-fit": () =>
    four(
      "problem-solution-fit",
      [
        "Problemas dignos de resolverse",
        "Entrevistas de empatía y JTBD",
        "Señales de demanda vs cumplidos educados",
        "Problem statement sin producto adentro",
      ],
      [
        "Frecuencia × severidad × willingness to change. No todo pain merece startup.",
        "Pregunta por el pasado: última vez que ocurrió, workaround, costo. JTBD nombra el progreso deseado.",
        "Cumplidos ('qué cool') ≠ commitment (tiempo, dinero, cambio de hábito).",
        "Statement: quién + fricción + contexto + workaround actual — sin 'app' en la frase.",
      ],
      "Problem-solution fit empieza con evidencia de pain real y compromiso.",
      "Completa 5 entrevistas y reescribe el problem statement con quotes.",
      [
        ["JTBD", "Jobs To Be Done."],
        ["Workaround", "Cómo la gente resuelve hoy el problema."],
        ["Willingness to change", "Disposición a adoptar una nueva solución."],
      ],
      START_REFS,
    ),

  "ethical-entrepreneurship": () =>
    four(
      "ethical-entrepreneurship",
      [
        "Stakeholders y externalidades",
        "Inclusión en diseño de productos",
        "Sostenibilidad y claims honestos",
        "Código de conducta founder",
      ],
      [
        "Cada producto afecta usuarios, trabajadores, comunidad, ambiente. Mapea impactos.",
        "Diseña con accesibilidad y diversidad de contextos (idioma, conectividad, discapacidad).",
        "No greenwashing. Métricas honestas. Privacidad desde el diseño.",
        "Código: verdad en pitch, respeto en hiring, no growth hacking abusivo.",
      ],
      "Ética founder es ventaja competitiva de confianza a largo plazo.",
      "Escribe un código de 10 líneas y un mapa de stakeholders de tu idea.",
      [
        ["Externalidad", "Efecto no pagado/cobrado sobre terceros."],
        ["Greenwashing", "Claims ambientales engañosos."],
        ["Privacy by design", "Privacidad integrada desde el diseño."],
      ],
      START_REFS,
    ),

  "lean-canvas-business-model": () =>
    four(
      "lean-canvas-business-model",
      [
        "Lean Canvas como hipótesis visual",
        "Patrones: SaaS, marketplace, D2C, freemium",
        "Costes y revenue streams realistas",
        "Marcar supuestos riesgosos",
      ],
      [
        "Cada caja del canvas es una hipótesis. Actualízala con evidencia.",
        "Elige patrón solo si el job del cliente lo exige. Marketplace necesita liquidez bilateral.",
        "Revenue prematuro inventado rompe confianza. Empieza con caminos creíbles.",
        "Resalta supuestos con '?'. El más riesgoso se prueba primero.",
      ],
      "Canvas útil = hipótesis testables, no poster bonito estático.",
      "Completa Lean Canvas v1 con 3 supuestos marcados y el más riesgoso circulado.",
      [
        ["Lean Canvas", "One-page business model para startups."],
        ["SaaS", "Software as a Service — suscripción de software."],
        ["Unfair advantage", "Ventaja difícil de copiar."],
      ],
      START_REFS,
    ),

  "value-proposition-design": () =>
    four(
      "value-proposition-design",
      [
        "Value map vs customer profile",
        "Posicionamiento en una frase",
        "Mensajes de landing page",
        "Pruebas de claridad con usuarios",
      ],
      [
        "Encaja pains/gains con pain relievers/gain creators. Elimina features huérfanas.",
        "Posicionamiento: para X que sufren Y, nuestra solución Z a diferencia de W.",
        "Landing: promesa, prueba, CTA. Above the fold sin párrafos eternos.",
        "Test de 5 segundos: ¿entendieron para quién y qué hace?",
      ],
      "Value proposition clara reduce CAC creativo y acelera interviews.",
      "Escribe 3 variantes de positioning y testea con 5 personas.",
      [
        ["Positioning", "Lugar percibido vs alternativas."],
        ["Above the fold", "Contenido visible sin scroll."],
        ["Value map", "Mapa de valor del lado de la solución."],
      ],
      START_REFS,
    ),

  "competitive-landscape": () =>
    four(
      "competitive-landscape",
      [
        "Competidores directos, indirectos y workarounds",
        "SWOT honesto (sin fan fiction)",
        "Moats realistas para early stage",
        "Gap analysis accionable",
      ],
      [
        "El peor competidor suele ser el status quo / Excel / grupo de WhatsApp.",
        "SWOT con evidencia. Strengths falsas se descubren en demo day.",
        "Moats tempranos: velocidad de aprendizaje, comunidad, datos propios con consentimiento — no 'IA mágica'.",
        "Gap: qué job nadie sirve bien. Ahí experimentas.",
      ],
      "Competencia se analiza para aprender, no para odiar.",
      "Entrega matriz de 5 alternativas + gap + implicación para MVP.",
      [
        ["Status quo", "Solución actual (aunque imperfecta)."],
        ["Moat", "Barrera de defensa competitiva."],
        ["SWOT", "Strengths, Weaknesses, Opportunities, Threats."],
      ],
      START_REFS,
    ),

  "mvp-build-measure-learn": () =>
    four(
      "mvp-build-measure-learn",
      [
        "Filosofía MVP y anti-overengineering",
        "Tipos: concierge, wizard of oz, fake door",
        "Métricas de aprendizaje",
        "Kill/pivot/persevere rules",
      ],
      [
        "MVP maximiza aprendizaje por unidad de esfuerzo. Si no aprendes, no es viable.",
        "Concierge: lo haces manual. Fake door: mides interés. Wizard of Oz: UI real, backoffice humano.",
        "Define learning metric antes: % completan job, % reservan llamada, etc.",
        "Predefine umbrales para matar, pivotar o perseverar — evita sunk cost drama.",
      ],
      "Build-Measure-Learn es un loop de evidencia, no un slogan.",
      "Diseña experiment card completa para tu MVP.",
      [
        ["MVP", "Minimum Viable Product."],
        ["Fake door", "Test de demanda con oferta aún no construida."],
        ["Pivot", "Cambio estructural de hipótesis."],
      ],
      START_REFS,
      { type: "troubleshooting-flowchart", title: "Build → Measure → Learn", afterSection: 0, caption: "Loop con kill criteria." },
    ),

  "nocode-prototyping-tools": () =>
    four(
      "nocode-prototyping-tools",
      [
        "Cuándo no-code es la decisión correcta",
        "Landing + waitlist + forms",
        "Apps ligeras (Glide/Bubble/Webflow intro)",
        "Límites y deuda técnica consciente",
      ],
      [
        "Si el riesgo es de mercado, no de arquitectura, no-code acelera.",
        "Una landing clara + waitlist puede validar mensaje antes de app.",
        "Elige herramienta por velocidad y fit — documenta por qué.",
        "Conoce límites (escala, vendor lock-in). Plan B documentado.",
      ],
      "No-code es estrategia de aprendizaje, no atajo eterno sin criterio.",
      "Publica un prototipo clickable o waitlist y documenta stack.",
      [
        ["No-code", "Construcción sin programación tradicional."],
        ["Waitlist", "Lista de interesados pre-lanzamiento."],
        ["Vendor lock-in", "Dependencia difícil de migrar."],
      ],
      START_REFS,
    ),

  "user-testing-feedback": () =>
    four(
      "user-testing-feedback",
      [
        "Protocolo think-aloud",
        "Severidad de fricciones",
        "Priorización de backlog",
        "Cerrar el loop con usuarios",
      ],
      [
        "Observa en silencio. No vendas durante el test. Graba con permiso.",
        "Severidad: bloquea job / confunde / cosmética. Prioriza bloqueadores.",
        "Backlog: impacto × esfuerzo. Un cambio grande por iteración cuando sea posible.",
        "Avisa a testers qué cambió — construye relación de co-diseño.",
      ],
      "User testing profesional genera backlog priorizado, no opiniones de pasillo.",
      "Corre 3 tests y publica tabla de fricciones con severidad.",
      [
        ["Think-aloud", "Usuario narra su pensamiento al usar el producto."],
        ["Backlog", "Lista priorizada de cambios."],
        ["NPS intro", "Net Promoter Score — señal gruesa de lealtad."],
      ],
      START_REFS,
    ),

  "gtm-launch-checklist": () =>
    four(
      "gtm-launch-checklist",
      [
        "Pre-launch, launch day, post-launch",
        "Selección de canales con presupuesto cero/bajo",
        "Asset checklist",
        "War room lite: roles del día D",
      ],
      [
        "Pre: mensaje, landing, analytics, soporte. Day: publicación coordinada. Post: escucha y itera 72h.",
        "Canales: comunidad existente, partners, contenido founder-led, email de early adopters.",
        "Assets: demo, FAQ, one-pager, creativos, UTM list.",
        "Roles: poster, responder, logger de bugs/feedback, decision maker.",
      ],
      "GTM es operación con checklist — no un post único esperando milagro.",
      "Completa launch checklist de 30 días con owners.",
      [
        ["GTM", "Go-To-Market."],
        ["Early adopter", "Usuario temprano tolerante a imperfección."],
        ["War room", "Equipo corto coordinando el lanzamiento."],
      ],
      START_REFS,
    ),

  "organic-growth-community": () =>
    four(
      "organic-growth-community",
      [
        "Founder-led marketing",
        "Build in public con límites",
        "Loops de referido y comunidad",
        "Complemento con Digital Marketing track",
      ],
      [
        "La voz del founder genera confianza si es consistente y útil.",
        "Build in public: comparte aprendizajes, no secretos de usuarios ni métricas falsas.",
        "Comunidad > follower count. Diseña rituales (office hours, challenges).",
        "Usa skills del track de marketing: calendario, ética, UTMs.",
      ],
      "Crecimiento orgánico sostenible se apoya en comunidad y utilidad repetible.",
      "Diseña un loop de contenido+comunidad de 2 semanas.",
      [
        ["Build in public", "Compartir el proceso de construcción abiertamente."],
        ["Referral loop", "Usuarios traen usuarios."],
        ["Community ritual", "Práctica recurrente que mantiene engagement."],
      ],
      START_REFS,
    ),

  "startup-metrics-pmf": () =>
    four(
      "startup-metrics-pmf",
      [
        "Activation, retention, churn — definiciones operativas",
        "Señales de product-market fit (intro)",
        "Cohortes simples en Sheets",
        "Cuándo pivotar vs perseverar",
      ],
      [
        "Define eventos: signup, activation (aha), retention D7, churn. Sin definiciones, no hay debate útil.",
        "PMF signals: retención orgánica, demanda supera capacity, users se enojan si quitas el producto.",
        "Cohorte por semana de signup. Visual mínima basta en early stage.",
        "Reglas predeclaradas > ego. Pivotar es inteligencia, no fracaso.",
      ],
      "Métricas tempranas miden aprendizaje y retención — no vanity fundraising.",
      "Arma dashboard de 3 métricas core con definiciones escritas.",
      [
        ["Activation", "Momento en que el usuario vive el valor central."],
        ["Retention", "Usuarios que regresan en un período."],
        ["PMF", "Product-Market Fit."],
      ],
      START_REFS,
      { type: "data-pipeline", title: "Signup → activation → retention", afterSection: 0, caption: "Embudo de producto temprano." },
    ),

  "startup-finance-basics": () =>
    four(
      "startup-finance-basics",
      [
        "P&L para no contadores",
        "Burn rate y runway",
        "Cash flow awareness",
        "Errores financieros típicos de founders juniors",
      ],
      [
        "Revenue − COGS = gross profit; − opex = resultado. Conoce tus categorías.",
        "Burn: efectivo neto que quemas/mes. Runway: meses hasta $0 al burn actual.",
        "Ventas a crédito no son caja. Planifica pagos reales.",
        "Mezclar plata personal/empresa, no registrar gastos, inflar revenue en pitch.",
      ],
      "Finanzas founder = runway consciente + disciplina de registro.",
      "Construye P&L simple 12 meses con 3 escenarios.",
      [
        ["Burn rate", "Ritmo de consumo de efectivo."],
        ["Runway", "Meses de supervivencia al burn actual."],
        ["COGS", "Cost of Goods Sold."],
      ],
      START_REFS,
    ),

  "pricing-unit-economics": () =>
    four(
      "pricing-unit-economics",
      [
        "Cost-plus vs value-based pricing",
        "CAC/LTV intro (con humildad)",
        "Experimentos de precio",
        "Empaquetado para early customers",
      ],
      [
        "Value-based ancla en outcome del cliente; cost-plus evita vender a pérdida sin saberlo.",
        "CAC/LTV tempranos son estimaciones — declara supuestos. No finjas precisión de Series B.",
        "Prueba precios con ofertas acotadas. Escucha objeciones.",
        "Empaqueta: good/better/best o setup + mensual. Claridad > 12 SKUs.",
      ],
      "Pricing es hipótesis de valor — se experimenta y se documenta.",
      "Propón 2 precios y un experimento de 10 conversaciones de venta.",
      [
        ["CAC", "Customer Acquisition Cost."],
        ["LTV", "Lifetime Value."],
        ["Unit economics", "Economía por unidad de cliente/pedido."],
      ],
      START_REFS,
    ),

  "fundraising-landscape": () =>
    four(
      "fundraising-landscape",
      [
        "Bootstrapping, grants, F&F, angels — realismo",
        "Qué compran los investors (aprendizaje + mercado)",
        "Dilución intro sin miedo ni fantasía",
        "Cuándo NO fundraising",
      ],
      [
        "La mayoría de ventures estudiantiles deben bootstrap/grants primero. Fundraising no es rite of passage obligatorio.",
        "Invierten en equipo, problema, tracción, insight. Pitch sin evidencia no convierte.",
        "Dilución: % de ownership a cambio de capital. Entiende tradeoffs a alto nivel; busca consejo legal real cuando aplique.",
        "Si no necesitas capital para aprender el siguiente hito, no levantes por ego.",
      ],
      "Fundraising es herramienta opcional — no identidad.",
      "Escribe un memo: hito siguiente, si requiere capital, alternativas sin diluir.",
      [
        ["Bootstrap", "Crecer sin capital externo significativo."],
        ["Angel", "Inversor individual early-stage."],
        ["Dilución", "Reducción porcentual de ownership al emitir equity."],
      ],
      START_REFS,
    ),

  "pitch-deck-structure": () =>
    four(
      "pitch-deck-structure",
      [
        "Arco de 10 slides que funciona",
        "Narrativa vs data dump",
        "Diseño legible en proyector",
        "Anexo y data room lite",
      ],
      [
        "Problem, solution, market, product, traction, model, GTM, team, ask, appendix hook.",
        "Una idea por slide. Números con fuente/supuesto.",
        "Tipografía grande, poco texto, contraste. Ensaya zoom share.",
        "Anexo: interviews summary, metrics defs, roadmap. Data room cuando haya due diligence real.",
      ],
      "Deck ganador = narrativa clara + evidencia + ask específico.",
      "Entrega deck v1 de 10 slides + notas del presentador.",
      [
        ["Ask", "Lo que solicitas (capital, pilots, mentores)."],
        ["Traction", "Evidencia de progreso/demanda."],
        ["Data room", "Repositorio de documentos para due diligence."],
      ],
      START_REFS,
    ),

  "storytelling-demo-day": () =>
    four(
      "storytelling-demo-day",
      [
        "Performance: pacing y presencia",
        "Demo en vivo vs video backup",
        "Ensayo con timer y feedback",
        "Nervios: protocolo práctico",
      ],
      [
        "Hook en 15s. Pausas. No leas slides. Contacto visual (o cámara).",
        "Siempre ten backup video si falla el live demo.",
        "Ensayo con rúbrica peer. Cambia solo la sección más débil por ciclo.",
        "Respiración, agua, checklist pre-escena. Nervios ≠ falta de preparación.",
      ],
      "Demo day se gana en ensayos medidos.",
      "Graba un pitch de 3 minutos y revisa con rúbrica.",
      [
        ["Pacing", "Ritmo de la presentación."],
        ["Backup plan", "Plan B técnico/contenido."],
        ["Rúbrica", "Criterios explícitos de evaluación."],
      ],
      START_REFS,
    ),

  "investor-qa-due-diligence": () =>
    four(
      "investor-qa-due-diligence",
      [
        "Preguntas duras frecuentes",
        "Cómo decir 'no sé' con plan",
        "Red flags que debes evitar",
        "Due diligence basics",
      ],
      [
        "Market size, competencia, por qué ahora, unit economics, riesgos, team gaps.",
        "'No sé aún; mediremos X así en Y días' > inventar.",
        "Red flags: métricas inventadas, denigrar usuarios, ignorar compliance, founder drama no gestionado.",
        "Data room lite: canvas, interviews, metrics defs, legal entity notes, IP awareness.",
      ],
      "Q&A excelente demuestra pensamiento y honestidad.",
      "Prepara banco de 10 Q&A con respuestas de 30–45s.",
      [
        ["Due diligence", "Investigación previa a inversión/partnership."],
        ["Red flag", "Señal de riesgo serio."],
        ["TAM/SAM/SOM", "Marcos de tamaño de mercado (usar con humildad)."],
      ],
      START_REFS,
    ),

  "legal-entities-ip-basics": () =>
    four(
      "legal-entities-ip-basics",
      [
        "LLC vs corp — overview conceptual",
        "IP: trademarks, copyright, NDAs",
        "Cuándo hablar con abogado de verdad",
        "Compliance mínimo ético",
      ],
      [
        "Estructura legal depende de país y goals. NOVA da overview — no consejo legal personalizado.",
        "Registra nombres con cuidado; respeta copyright; NDA no reemplaza trust + scope claro.",
        "Equity, fundraising docs, employment: busca profesional. No copies templates a ciegas.",
        "Privacidad de usuarios, permisos de imagen, términos claros en early waitlists.",
      ],
      "Legal literacy evita errores caros; no sustituye abogado cuando el riesgo es real.",
      "Lista decisiones legales a consultar antes de cobrar o levantar capital.",
      [
        ["IP", "Intellectual Property."],
        ["NDA", "Non-Disclosure Agreement."],
        ["LLC", "Limited Liability Company (concepto)."],
      ],
      START_REFS,
    ),

  "cofounder-team-culture": () =>
    four(
      "cofounder-team-culture",
      [
        "Roles y expectativas explícitas",
        "Equity splits y vesting intro",
        "Conflicto: protocolos",
        "Hiring inclusivo early",
      ],
      [
        "Escribe RACI lite: quién decide producto, money, brand. Ambigüedad destruye equipos.",
        "Vesting alinea tiempo/compromiso. Overview conceptual; documenta acuerdos.",
        "Conflicto: agenda, hechos, opciones, decisión, follow-up. No silent treatment.",
        "Job posts claros, entrevistas estructuradas, cero nepotismo tóxico.",
      ],
      "Cultura early = acuerdos escritos + respeto operativo.",
      "Redacta one-pager de roles + ritual semanal del equipo capstone.",
      [
        ["Vesting", "Adquisición gradual de equity con el tiempo."],
        ["RACI", "Responsible, Accountable, Consulted, Informed."],
        ["Cofounder agreement", "Acuerdo de expectativas entre founders."],
      ],
      START_REFS,
    ),

  "operations-tools-startups": () =>
    four(
      "operations-tools-startups",
      [
        "Stack mínimo viable de ops",
        "Notion/Slack/boards con higiene",
        "Vendor selection en presupuesto bajo",
        "Decision log",
      ],
      [
        "Docs, chat, tasks, CRM lite, drive. Menos herramientas, más disciplina.",
        "Naming conventions, owners, fechas. Archiva, no dejes cementerios de páginas.",
        "Evalúa: costo, export, seguridad, curva de aprendizaje.",
        "Decision log: fecha, decisión, por qué, revisitar cuándo.",
      ],
      "Ops temprano es higiene de ejecución — ventaja silenciosa.",
      "Publica founder operating manual de 1 página para tu equipo.",
      [
        ["Decision log", "Registro de decisiones clave."],
        ["Stack", "Conjunto de herramientas."],
        ["Higiene operativa", "Prácticas que mantienen el sistema usable."],
      ],
      START_REFS,
    ),

  "capstone-venture-selection": () =>
    four(
      "capstone-venture-selection",
      [
        "Criterios para elegir venture de capstone",
        "Scope de MVP defendible en el tiempo del curso",
        "Métricas de éxito del dossier",
        "Riesgos y mitigaciones",
      ],
      [
        "Elige impacto o comercial con acceso a usuarios reales (campus/comunidad).",
        "MVP debe caber en semanas, no en fantasías de 12 features.",
        "Éxito: discovery evidence, canvas vivo, MVP testeado, GTM 30 días, pitch.",
        "Mitiga: acceso a entrevistados, permisos, dependencia técnica.",
      ],
      "Capstone se gana con scope realista y evidencia completa.",
      "Congela selección de venture + scope MVP por escrito.",
      [
        ["Dossier", "Paquete integrado de evidencia del venture."],
        ["Scope freeze", "Congelar alcance para ejecutar."],
        ["Mitigación", "Acción que reduce probabilidad/impacto de un riesgo."],
      ],
      START_REFS,
    ),

  "portfolio-founder-brand": () =>
    four(
      "portfolio-founder-brand",
      [
        "Presencia founder en LinkedIn/Wellfound",
        "Portfolio site mínimo",
        "Mentor outreach ético",
        "Narrativa de aprendizaje",
      ],
      [
        "Perfil orientado a evidencia: projects, interviews count, MVP link.",
        "Una página: problema, solución, demo, contacto. Rápida en móvil.",
        "Outreach: contexto específico + ask pequeño + gracia. No spam masivo idéntico.",
        "Cuenta qué aprendiste al fallar un supuesto — eso es señal de founder maduro.",
      ],
      "Marca founder = evidencia pública + respeto en outreach.",
      "Publica portfolio mínimo y 5 mensajes de outreach personalizados (borrador).",
      [
        ["Wellfound", "Plataforma de startups/talent (ex AngelList talent)."],
        ["Outreach", "Contacto proactivo a mentores/partners."],
        ["Founder brand", "Reputación profesional del emprendedor."],
      ],
      START_REFS,
    ),

  "demo-day-prep-rubric": () =>
    four(
      "demo-day-prep-rubric",
      [
        "Calendario de ensayos",
        "Alineación a rúbrica de jueces",
        "Backup plans técnicos",
        "Cierre del dossier capstone",
      ],
      [
        "T-7, T-3, T-1 ensayos con timer. Feedback escrito.",
        "Mapea cada sección del pitch a criterios: clarity, evidence, feasibility, ethics, delivery.",
        "Offline demo, hotspot, video mirror, PDF one-pager.",
        "Checklist final: canvas, MVP, finance snapshot, GTM, deck, video, reflection.",
      ],
      "Prep de demo day es project management con rúbrica explícita.",
      "Entrega dossier integrado + video 90s + checklist firmado.",
      [
        ["Rúbrica", "Criterios de evaluación explícitos."],
        ["T-minus", "Conteo regresivo de preparación."],
        ["Dossier", "Paquete completo capstone."],
      ],
      START_REFS,
      { type: "troubleshooting-flowchart", title: "Prep T-7 → Demo Day", afterSection: 0, caption: "Ensayo, backup, dossier." },
    ),
};

function writeMap(fileName, exportName, builders, label) {
  const entries = Object.keys(builders).map((slug) => builders[slug]());
  const src = `import type { LessonContent } from "../types";
import { fourSectionLesson } from "./content-builder";

/** High-quality QCW-style theory content — ${label} (${entries.length} lessons). */
export const ${exportName}: Record<string, LessonContent> = {
${entries.join(",\n\n")}
};
`;
  fs.writeFileSync(path.join(LESSONS_DIR, fileName), src);
  console.log("wrote", fileName, entries.length);
}

writeMap(
  "digital-marketing-business-lessons.ts",
  "DIGITAL_MARKETING_BUSINESS_LESSONS",
  marketing,
  "digital-marketing-business",
);
writeMap(
  "startup-innovation-digital-launch-lessons.ts",
  "STARTUP_INNOVATION_LESSONS",
  startup,
  "startup-innovation-digital-launch",
);
