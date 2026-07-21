import type { LessonContent } from "../types";
import { fourSectionLesson } from "./content-builder";

/** High-quality QCW-style theory content — digital-marketing-business (24 lessons). */
export const DIGITAL_MARKETING_BUSINESS_LESSONS: Record<string, LessonContent> = {
  "digital-marketing-ecosystem-roles": fourSectionLesson(
    ["Por qué el marketing digital es una carrera employable (no solo 'postear')", "Roles entry-level: social, content, growth, e-commerce coordination", "Skills que diferencian a un junior contratable", "Cómo armar evidencia de portfolio desde el día 1"],
    [
      "El marketing digital conecta productos y causas con audiencias reales mediante contenido, canales pagos y orgánicos, email y analytics. En PYMEs y startups LATAM/USA, un generalista junior que planifica calendarios, mide resultados y documenta experimentos vale más que alguien que solo 'tiene buen ojo' sin métricas. NOVA College trata marketing como operación medible.",
      "Roles típicos: Social Media Coordinator, Content Creator/Associate, Growth Intern, E-commerce Ops Assistant, Community Manager junior. Cada rol exige escritura clara, criterio ético, nociones de embudo (awareness→conversion) y capacidad de reportar en Sheets/Notion.",
      "Empleadores buscan: brief interpretado sin drama, assets entregados a tiempo, UTM correctos, y post-mortems honestos. Un candidato con 2 case studies (problema→estrategia→resultado) supera a CV con buzzwords.",
      "Desde el módulo 1 guarda artefactos: persona, calendario, capturas de insights, reportes semanales. Tu certificado NOVA-COL-MKT se verifica; el portfolio demuestra que sabes operar."
    ],
    "Marketing digital employable = roles claros + métricas + portfolio de experimentos documentados.",
    "En entrevista: 'Coordiné un mini-calendario de 2 semanas, etiqueté UTMs, reporté engagement y propuse un cambio basado en datos — evidencia en mi case study.'",
    [
      { term: "Embudo", definition: "Etapas del viaje del cliente: awareness, consideración, conversión, retención." },
      { term: "Growth", definition: "Disciplina de experimentos para adquirir y retener usuarios de forma eficiente." },
      { term: "UTM", definition: "Parámetros en URLs para atribuir tráfico a campañas en analytics." },
      { term: "Community management", definition: "Moderación, respuesta y cuidado de la comunidad en canales sociales." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ],
    {
      type: "data-pipeline",
      title: "Ecosistema de roles marketing digital",
      afterSection: 1,
      caption: "Content · Social · Ads · Email · Analytics → revenue/impact.",
    }
  ),

  "customer-personas-journey": fourSectionLesson(
    ["Personas basadas en evidencia (no estereotipos)", "Journey map: awareness → consideración → conversión", "Mensajes inclusivos y segmentación ética", "Entregable: persona + journey para un brand scenario"],
    [
      "Una persona resume un segmento: metas, fricciones, canales que usa, objeciones. Se construye con entrevistas, encuestas y datos — no con clichés. Incluye contexto cultural y accesibilidad.",
      "En cada etapa del journey el usuario necesita un mensaje distinto. Awareness educa; consideración compara; conversión reduce fricción (prueba social, FAQ, CTA claro).",
      "Inclusión: evita assumptions de género/ingreso; ofrece lenguaje claro; no weaponices inseguridades. La segmentación ética usa consentimiento y datos mínimos.",
      "Entrega un one-pager: persona (foto conceptual OK), 3 pains, 3 jobs-to-be-done, journey con 1 contenido por etapa."
    ],
    "Personas + journey convierten intuición en plan de contenidos y ofertas por etapa.",
    "Pregunta de entrevista: '¿Cómo validaste la persona?' — cita entrevistas/quotes, no 'me pareció'.",
    [
      { term: "Persona", definition: "Arquetipo de cliente basado en investigación." },
      { term: "JTBD", definition: "Jobs To Be Done — el 'trabajo' que el cliente intenta completar." },
      { term: "CTA", definition: "Call To Action — acción pedida al usuario." },
      { term: "Objeción", definition: "Razón por la que el usuario duda antes de convertir." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "digital-marketing-career-paths": fourSectionLesson(
    ["Rutas de carrera y certificaciones alineadas", "LinkedIn y presencia profesional para creativos", "Networking ético y mentores", "Plan de 90 días post-track"],
    [
      "Rutas: Social → Content Lead; Coordinador → Specialist (SEO/Ads); Freelance generalista → retainer. Certificaciones Meta/Google/HubSpot validan vocabulario; el portfolio valida ejecución.",
      "LinkedIn: titular orientado a resultado ('Digital marketing junior | content + analytics'), featured case studies, banner limpio. Publica aprendizajes de labs NOVA sin inventar métricas.",
      "Networking: aporta valor (resúmenes de experimentos, intros útiles). Evita spam de '¿me contratas?' sin contexto.",
      "Plan 90 días: 2 case studies pulidos, 1 cert intro, 3 aplicaciones/semana, 1 proyecto pro-bono medido."
    ],
    "Carrera = credencial + evidencia + red. Planifica 90 días con artefactos medibles.",
    "STAR de 90s: situación PYME, tarea (calendario), acción (UTM+reporte), resultado (insight + siguiente experimento).",
    [
      { term: "Retainer", definition: "Contrato mensual recurrente de servicios." },
      { term: "Case study", definition: "Historia problema→estrategia→resultado con evidencia." },
      { term: "Personal brand", definition: "Promesa profesional consistente en canales públicos." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "brand-identity-tone-voice": fourSectionLesson(
    ["Identidad: promesa, valores, personalidad", "Tone of voice y guía corta usable", "Value proposition que cabe en una frase", "Errores típicos de marcas jóvenes"],
    [
      "Identidad no es solo logo: es promesa + prueba. Define qué nunca dirías (miedo, clickbait engañoso).",
      "Tone of voice: 3 adjetivos + ejemplos do/don't. Ejemplo: claro, cálido, preciso — don't: sarkasmo cruel.",
      "Value proposition: para [audiencia], [marca] ayuda a [resultado] porque [diferenciador].",
      "Errores: copiar voz de otra marca, inconsistencia entre posts, claims sin evidencia."
    ],
    "Brand kit verbal primero; visual después. Consistencia genera confianza.",
    "En lab: entrega guía de voz de 1 página + 2 ejemplos de posts on-brand/off-brand.",
    [
      { term: "Tone of voice", definition: "Personalidad lingüística de la marca." },
      { term: "Value proposition", definition: "Promesa de valor diferenciada para un segmento." },
      { term: "Brand guidelines", definition: "Reglas de uso verbal/visual." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ],
    {
      type: "data-pipeline",
      title: "Promesa → voz → prueba",
      afterSection: 0,
      caption: "Identidad operativa para equipos pequeños.",
    }
  ),

  "visual-content-canva": fourSectionLesson(
    ["Principios de diseño para no-diseñadores", "Canva: jerarquía, templates, brand kit", "Accesibilidad visual (contraste, texto)", "Sistema de 5 piezas reutilizables"],
    [
      "Jerarquía, contraste, alineación, proximidad, espacio en blanco. Un focal point por pieza.",
      "Canva Brand Kit: colores, fuentes, logos. Templates reducen caos en equipos.",
      "Accesibilidad: contraste AA cuando sea posible; texto grande en stories; no información solo por color.",
      "Sistema: portada, tip educativo, testimonio, CTA, bastidores. Misma familia visual."
    ],
    "Diseño junior employable = claridad + sistema + accesibilidad, no efectos aleatorios.",
    "Entrega 5 posts on-brand con alt-text sugerido y checklist de contraste.",
    [
      { term: "Jerarquía visual", definition: "Orden en que el ojo lee elementos." },
      { term: "Brand kit", definition: "Activos y reglas visuales centralizadas." },
      { term: "Alt text", definition: "Descripción de imagen para accesibilidad y contexto." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "storytelling-copywriting-basics": fourSectionLesson(
    ["Frameworks: PAS, AIDA, story spine corto", "Hooks éticos y CTAs honestos", "Beneficio vs feature", "Edición: cortar el 30% sobrante"],
    [
      "PAS (Problem-Agitate-Solve) y AIDA funcionan si no manipulan. Story spine: gancho→fricción→acción→resultado.",
      "Hooks de curiosidad/especificidad > miedo. CTA: una acción clara por pieza.",
      "Feature: 'tiene analytics'. Beneficio: 'sabes qué post enseñó de verdad esta semana'.",
      "Edita en voz alta. Elimina adverbios vacíos y claims sin prueba."
    ],
    "Copy employable es claro, verificable y orientado a una acción.",
    "Ejercicio: reescribe un post feature-heavy a beneficio + CTA + prueba.",
    [
      { term: "PAS", definition: "Problem, Agitate, Solve — estructura de copy." },
      { term: "AIDA", definition: "Attention, Interest, Desire, Action." },
      { term: "Hook", definition: "Primeras líneas que ganan atención." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "platform-strategy-instagram-tiktok-linkedin": fourSectionLesson(
    ["Encaje audiencia–plataforma", "Formatos nativos y reutilización inteligente", "Cadencia realista para equipos pequeños", "LinkedIn para empleabilidad creativa"],
    [
      "Instagram/TikTok: discovery y educación corta. LinkedIn: credibilidad profesional y B2B ligero. No copies el mismo crop sin adaptar.",
      "Graba una vez, deriva: reel + carrusel + quote LinkedIn. Mantén caption nativa.",
      "Cadencia sostenible > virality burnout. 3–5 piezas/semana bien hechas superan 20 mediocres.",
      "LinkedIn: documenta labs y case studies; comenta con sustancia en posts del sector."
    ],
    "Estrategia de plataformas = fit de audiencia + formatos nativos + cadencia sostenible.",
    "Planifica una matriz canal×formato×objetivo para 2 semanas.",
    [
      { term: "Formato nativo", definition: "Pieza diseñada para el comportamiento del canal." },
      { term: "Cadencia", definition: "Ritmo de publicación sostenible." },
      { term: "Repurposing", definition: "Reutilizar un asset master en varios formatos." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "content-calendar-engagement": fourSectionLesson(
    ["Calendario editorial que un equipo puede operar", "Engagement: respuesta, UGC, moderación", "Crisis basics para community", "Plantilla semanal de reporte"],
    [
      "Columnas útiles: fecha, pilar, formato, owner, status, CTA, UTM. Colores por estado.",
      "Engagement es trabajo: SLA de respuesta, banco de respuestas, UGC con permiso.",
      "Crisis: pausa amplificación, verifica hechos, responde con empatía, escala a mentor/legal si aplica.",
      "Reporte semanal: 3 métricas, 1 aprendizaje, 1 experimento siguiente."
    ],
    "Operar community es proceso + empatía + documentación — no solo creativo.",
    "Entrega calendario 14 días + reglas de moderación de 1 página.",
    [
      { term: "UGC", definition: "User Generated Content — contenido creado por la comunidad." },
      { term: "Moderación", definition: "Reglas y acciones para mantener conversaciones seguras." },
      { term: "SLA", definition: "Tiempo de respuesta acordado." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ],
    {
      type: "data-pipeline",
      title: "Calendario → publicación → engagement → reporte",
      afterSection: 1,
      caption: "Loop operativo semanal.",
    }
  ),

  "social-analytics-kpis": fourSectionLesson(
    ["KPIs que importan según objetivo", "Engagement rate y trampas de vanidad", "Lectura de insights nativos", "Informe ejecutivo de 1 página"],
    [
      "Objetivo awareness ≠ objetivo conversión. Elige 1 KPI primario + 2 secundarios.",
      "Vanity: likes sin relación a saves/clicks/signups. Engagement rate contextualiza.",
      "Lee retención de reels, fuentes de tráfico, CTR de link in bio / UTM.",
      "Informe: objetivo, resultado, insight, decisión. Sin novelas."
    ],
    "Analytics junior = elegir KPI correcto y decidir el siguiente experimento.",
    "Construye un tablero Sheets con semáforo y notas de insight.",
    [
      { term: "KPI", definition: "Indicador clave alineado a objetivo." },
      { term: "CTR", definition: "Click-through rate." },
      { term: "Engagement rate", definition: "Interacciones relativas al alcance o seguidores." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "content-marketing-funnel": fourSectionLesson(
    ["Contenido por etapa del embudo", "Lead magnets éticos y captura", "Nurturing sin spam", "Medición de contenido → lead → acción"],
    [
      "TOFU educa; MOFU compara; BOFU convierte. Cada pieza tiene un job.",
      "Lead magnet útil (checklist, plantilla) con consentimiento claro. No gates engañosos.",
      "Nurturing: secuencia corta con valor; frecuencia respetuosa; unsubscribe visible.",
      "Atribuye con UTM y define conversión (descarga, registro, booking)."
    ],
    "Content marketing conecta educación con pipeline — con ética de consentimiento.",
    "Diseña un lead magnet + 3 emails de nurturing con métricas.",
    [
      { term: "TOFU/MOFU/BOFU", definition: "Top/Middle/Bottom of funnel." },
      { term: "Lead magnet", definition: "Recurso a cambio de contacto consentido." },
      { term: "Nurturing", definition: "Secuencia que educa hacia una decisión." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "seo-keyword-research": fourSectionLesson(
    ["Search intent y tipos de queries", "Keyword research práctico y ético", "On-page SEO esencial", "Brief de artículo optimizado"],
    [
      "Intent: informacional, navegacional, transaccional. Alinea título y contenido al intent.",
      "Herramientas free + autocompletado + Search Console. Evita keyword stuffing y granjas de contenido.",
      "Title, H1, meta description, URLs claras, links internos, accesibilidad.",
      "Brief: keyword, intent, outline H2, FAQ, CTA, internal links."
    ],
    "SEO junior = intent + on-page claro + utilidad real al lector.",
    "Entrega keyword sheet + outline 800 palabras + meta description.",
    [
      { term: "Search intent", definition: "Objetivo del usuario al buscar." },
      { term: "On-page SEO", definition: "Optimización dentro de la página." },
      { term: "Search Console", definition: "Herramienta Google para rendimiento de búsqueda." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "video-short-form-basics": fourSectionLesson(
    ["Hooks visuales en 0–2 segundos", "Guion corto y subtítulos", "Batch filming workflow", "Accesibilidad y seguridad de marca"],
    [
      "Primer frame debe prometer valor. Texto grande ayuda sin sonido.",
      "Guion: gancho → 3 beats → CTA. Subtítulos no opcionales.",
      "Batch: un setup, múltiples tomas, naming de archivos, shot list.",
      "Evita música con copyright; respeta rostros/permisos; no claims médicos falsos."
    ],
    "Short-form profesional = hook + subtítulos + workflow reproducible.",
    "Produce 1 reel educativo con shot list y captions.",
    [
      { term: "Batch filming", definition: "Grabar varias piezas en una sesión." },
      { term: "Safe zone", definition: "Área visible en UI de apps verticales." },
      { term: "Captioning", definition: "Subtítulos para accesibilidad." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "email-campaigns-segmentation": fourSectionLesson(
    ["Anatomía de campañas que se abren", "Segmentación básica por comportamiento", "Deliverability awareness", "Welcome series de 3 emails"],
    [
      "Subject claro, preview text útil, un CTA primario, diseño simple.",
      "Segmenta por interés/actividad — no bombardees a todos igual.",
      "List hygiene, consentimiento, evitar spam words engañosos, autenticación (SPF/DKIM conceptual).",
      "Welcome: expectativa → valor → siguiente paso. Mide open/click con cautela."
    ],
    "Email sigue siendo ROI alto cuando hay consentimiento y relevancia.",
    "Diseña welcome series en Mailchimp sandbox con segmentos.",
    [
      { term: "Deliverability", definition: "Probabilidad de llegar a inbox." },
      { term: "Segmentación", definition: "Enviar mensajes distintos a grupos distintos." },
      { term: "Welcome series", definition: "Secuencia automática post-signup." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "marketing-automation-crm": fourSectionLesson(
    ["CRM como sistema de verdad de contactos", "Triggers y workflows simples", "Handoff marketing→ventas/ops", "Evitar over-automation"],
    [
      "CRM registra origen, consentimiento, etapa. Sin higiene, automation amplifica basura.",
      "Triggers: signup, click, no-open. Acciones: tag, email, tarea humana.",
      "Handoff: definición de lead listo + notas contextuales.",
      "Automatiza lo repetible; personaliza lo sensible. Revisa workflows mensualmente."
    ],
    "Automation junior responsable = triggers claros + datos limpios + supervisión humana.",
    "Mapa un workflow de 5 nodos y documenta excepciones humanas.",
    [
      { term: "CRM", definition: "Customer Relationship Management." },
      { term: "Trigger", definition: "Evento que inicia un workflow." },
      { term: "Lead scoring", definition: "Puntaje de readiness (intro)." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "privacy-consent-gdpr-marketing": fourSectionLesson(
    ["Consentimiento, opt-in y minimización", "CAN-SPAM / GDPR / LFPDPPP — lo que un marketer debe saber", "Datos que no debes pedir", "Checklist ético pre-campaña"],
    [
      "Consentimiento informado, fácil de retirar. Minimiza campos del form.",
      "Conoce principios: identificación del remitente, unsubscribe, bases legales conceptuales. Consulta legal en casos reales.",
      "Evita datos sensibles innecesarios (salud, documentos). No compres listas dudosas.",
      "Checklist: base de consentimiento, finalidad clara, retención, acceso al equipo mínimo."
    ],
    "Privacidad es parte del craft — no un obstáculo opcional.",
    "Audita un form de captura y reescríbelo con minimización.",
    [
      { term: "Opt-in", definition: "Consentimiento activo para recibir comunicaciones." },
      { term: "Minimización", definition: "Recolectar solo datos necesarios." },
      { term: "Unsubscribe", definition: "Mecanismo de baja obligatorio en email marketing." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ],
    {
      type: "security-scenario",
      title: "Checklist de consentimiento",
      afterSection: 2,
      caption: "Pre-flight ético de campaña.",
    }
  ),

  "meta-ads-fundamentals": fourSectionLesson(
    ["Estructura Campaign→Ad set→Ad", "Objetivos y audiencias (sin gastar de más)", "Creatividades que se pueden medir", "Pixel/conversiones — conceptos"],
    [
      "Jerarquía Meta Ads: objetivo de campaña, targeting/budget en ad set, creativos en ads.",
      "Empieza con audiencias definidas y presupuestos de práctica/mock. Documenta hipótesis.",
      "Testea 2–3 creativos con mismo mensaje nuclear. Una variable a la vez.",
      "Pixel/API de conversiones conectan eventos; en labs NOVA usamos planes mock sin gasto real obligatorio."
    ],
    "Ads fundamentals = estructura + hipótesis + medición — no boost improvisado.",
    "Entrega brief de campaña mock: objetivo, audiencia, 3 ads, KPIs, presupuesto simulado.",
    [
      { term: "Ad set", definition: "Nivel de audiencia, presupuesto y programación." },
      { term: "Pixel", definition: "Código de tracking de eventos en sitio." },
      { term: "Creative", definition: "Imagen/video/texto del anuncio." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "google-ads-search-display": fourSectionLesson(
    ["Search vs Display: cuándo usar cada uno", "Keywords, match types e intención", "Quality Score conceptual y landing alignment", "Copy de anuncios de búsqueda"],
    [
      "Search captura demanda existente; Display genera demanda/retargeting. No mezcles objetivos.",
      "Keywords alineadas a intent. Negativas para evitar basura.",
      "Landing debe cumplir la promesa del anuncio. Velocidad y claridad importan.",
      "Headlines específicos + descripción con beneficio + CTA. Extensiones conceptuales."
    ],
    "Google Ads junior entiende intent, relevancia y alineación anuncio–landing.",
    "Escribe 3 anuncios de search + lista de negativas para un escenario educativo.",
    [
      { term: "Quality Score", definition: "Señal de relevancia de Google Ads." },
      { term: "Match type", definition: "Control de amplitud de keywords." },
      { term: "Landing page", definition: "Página de destino post-click." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "budget-roas-reporting": fourSectionLesson(
    ["Presupuestos diarios y tradeoffs", "ROAS/CPA y límites de interpretación", "A/B de creativos con disciplina", "Slides client-ready"],
    [
      "Caps diarios evitan sorpresas. Reserva learning budget. Documenta supuestos.",
      "ROAS alto con volumen bajo puede engañar. Reporta intervalo y tamaño muestral honestamente.",
      "A/B: una variable, tiempo mínimo, criterio de ganador predefinido.",
      "Slide: objetivo, spend, resultado, insight, decisión. Sin jerga innecesaria."
    ],
    "Performance marketing es rigor experimental + comunicación clara a stakeholders.",
    "Arma un reporte mock de 2 semanas con decisión de pausar/escalar.",
    [
      { term: "ROAS", definition: "Return on Ad Spend." },
      { term: "CPA", definition: "Cost per Acquisition." },
      { term: "A/B test", definition: "Comparación controlada de variantes." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "ecommerce-shopify-basics": fourSectionLesson(
    ["Anatomía de una tienda que convierte", "Fichas de producto y trust signals", "Checkout friction awareness", "Mensajería de envíos y políticas"],
    [
      "Home clara, navegación simple, búsqueda, pruebas sociales. Mobile-first.",
      "Producto: fotos, beneficios, specs, FAQ, reviews. Evita stock photos engañosas.",
      "Cada campo extra en checkout mata conversión. Guest checkout cuando sea posible.",
      "Políticas visibles: envío, devoluciones, contacto real."
    ],
    "E-commerce junior conecta merchandising con confianza y fricción mínima.",
    "Audita una tienda demo y lista 8 mejoras priorizadas.",
    [
      { term: "Trust signal", definition: "Elemento que reduce riesgo percibido." },
      { term: "Checkout friction", definition: "Fricción que abandona carritos." },
      { term: "Merchandising", definition: "Presentación de productos para venta." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "google-analytics-4-reports": fourSectionLesson(
    ["GA4 mental model: events & parameters", "Informes que importan a marketing", "UTM discipline", "Diagnóstico de campañas con GA4"],
    [
      "GA4 es event-based. Define eventos clave (signup, purchase, download) con naming consistente.",
      "Tráfico por fuente/medio, páginas top, embudos simples, retención intro.",
      "UTM: source/medium/campaign/content. Sin UTM, atribución es adivinanza.",
      "Compara landings de campaña vs orgánicas; valida que el CTA se cumple."
    ],
    "GA4 para marketers = eventos + UTM + decisiones semanales.",
    "Configura demo property mentalmente y entrega un weekly dashboard template.",
    [
      { term: "GA4", definition: "Google Analytics 4." },
      { term: "Event", definition: "Interacción trackeada." },
      { term: "Attribution", definition: "Asignación de crédito a canales." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ],
    {
      type: "data-pipeline",
      title: "UTM → evento → insight → decisión",
      afterSection: 1,
      caption: "Cadena de medición.",
    }
  ),

  "excel-sheets-marketing-dashboards": fourSectionLesson(
    ["Estructura de un campaign tracker", "Fórmulas útiles y data hygiene", "Cohortes y vistas ejecutivas", "One-pager para founders/directores"],
    [
      "Hojas: raw, clean, dashboard. No calcules sobre raw sucio.",
      "SUMIFS, porcentaje de cambio, validación de datos. Fechas ISO.",
      "Cohorte simple: signup week → activación. Vista ejecutiva: 5 celdas + sparkline conceptual.",
      "One-pager: qué pasó, por qué, qué haremos. Máx 1 página."
    ],
    "Sheets es el CRM visual del marketer junior — higiene > widgets.",
    "Construye tracker con semáforo y notas de insight obligatorias.",
    [
      { term: "Data hygiene", definition: "Limpieza y consistencia de datos." },
      { term: "Cohorte", definition: "Grupo de usuarios que comparten inicio en el tiempo." },
      { term: "Dashboard", definition: "Vista resumida para decisiones." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "marketing-portfolio-case-study": fourSectionLesson(
    ["Estructura de case study contratante", "Visual storytelling de resultados", "Qué hacer si no hay métricas 'grandes'", "Publicación ética de trabajo"],
    [
      "Problema → restricciones → estrategia → ejecución → resultados → aprendizaje.",
      "Antes/después, 1 gráfico simple, quotes de stakeholder si hay permiso.",
      "Métricas de proceso también cuentan: tiempo de ciclo, claridad, completion de checklist.",
      "Anonimiza clientes sensibles; no inventes ROAS."
    ],
    "Portfolio = narrativa verificable. Honestidad > vanity screenshots.",
    "Escribe un case study de 1–2 páginas de tu lab capstone.",
    [
      { term: "Case study", definition: "Narrativa profesional de un proyecto." },
      { term: "Stakeholder", definition: "Persona interesada/afectada por el proyecto." },
      { term: "Before/after", definition: "Evidencia comparativa." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "freelance-proposals-pricing": fourSectionLesson(
    ["Scope que evita scope creep", "Pricing: fixed vs retainer intro", "Propuestas claras y límites", "Ética en plataformas freelance"],
    [
      "Define entregables, rondas de revisión, qué está fuera. Todo por escrito.",
      "Fixed para paquetes claros; retainer para ongoing. Incluye depósitos.",
      "Propuesta: problema, enfoque, timeline, precio, next step. Sin novelas.",
      "No copies portfolios ajenos; no subastes calidad a $5 si no es sostenible."
    ],
    "Freelance sostenible = scope escrito + precio honesto + comunicación.",
    "Redacta una propuesta de paquete social 2 semanas para PYME ficticia.",
    [
      { term: "Scope creep", definition: "Expansión no controlada del trabajo acordado." },
      { term: "Retainer", definition: "Pago mensual recurrente." },
      { term: "SOW", definition: "Statement of Work." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ]
  ),

  "capstone-campaign-planning": fourSectionLesson(
    ["Elegir brand scenario con impacto", "SMART goals y channel mix", "Riesgos éticos y mitigaciones", "Kickoff del capstone full-funnel"],
    [
      "Elige wellness, education o social-impact con restricciones realistas (presupuesto mock).",
      "SMART + canal primario + 2 secundarios. KPI primario único.",
      "Mitiga: consentimiento, claims, accesibilidad, crisis plan lite.",
      "Kickoff checklist: persona, journey, calendario, UTMs, dashboard, roles."
    ],
    "Capstone se gana con plan operable, no con slides bonitos vacíos.",
    "Entrega strategy deck milestone 1 del capstone.",
    [
      { term: "SMART", definition: "Specific, Measurable, Achievable, Relevant, Time-bound." },
      { term: "Channel mix", definition: "Combinación de canales hacia un objetivo." },
      { term: "Full-funnel", definition: "Estrategia que cubre varias etapas del embudo." }
    ],
    [
      { title: "Meta Blueprint / Digital Marketing Associate", url: "https://www.facebook.com/business/learn", author: "Meta" },
      { title: "Google Digital Marketing & E-commerce Certificate", url: "https://grow.google/certificates/digital-marketing-ecommerce/", author: "Google" },
      { title: "HubSpot Academy — Inbound Marketing", url: "https://academy.hubspot.com/", author: "HubSpot" }
    ],
    {
      type: "data-pipeline",
      title: "Capstone full-funnel kickoff",
      afterSection: 1,
      caption: "Persona → mix → calendario → medición.",
    }
  )
};
