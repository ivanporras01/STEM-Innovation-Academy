import type { LessonContent } from "../types";
import { fourSectionLesson } from "./content-builder";

/** High-quality QCW-style theory content — startup-innovation-digital-launch (24 lessons). */
export const STARTUP_INNOVATION_LESSONS: Record<string, LessonContent> = {
  "startup-ecosystem-roles": fourSectionLesson(
    ["Mapa del ecosistema startup (founders, ops, growth, product)", "Roles entry-level reales para estudiantes", "Aceleradoras, hubs e intrapreneurship", "Cómo entrar sin 'tengo una app'"],
    [
      "Startups son organizaciones de aprendizaje bajo incertidumbre. Roles tempranos mezclan ejecución y descubrimiento.",
      "Founder's associate, growth intern, community ops, product coordinator, research assistant de customer discovery.",
      "Aceleradoras enseñan ritmo y red; intrapreneurship aplica lo mismo dentro de empresas/escuelas.",
      "Entra con evidencia: entrevistas, canvas, MVP no-code, pitch honesto. Evita vaporware."
    ],
    "Ecosistema startup se navega con evidencia de discovery y ejecución, no solo ideas.",
    "Prepara un pitch de 60s sobre un rol que quieres y la evidencia que ya tienes.",
    [
      { term: "Founder's associate", definition: "Generalista temprano que apoya al founder en ops y proyectos." },
      { term: "Accelerator", definition: "Programa intensivo de mentorship y red para startups." },
      { term: "Intrapreneurship", definition: "Innovación emprendedora dentro de una organización." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ],
    {
      type: "troubleshooting-flowchart",
      title: "Rutas de entrada al ecosistema",
      afterSection: 1,
      caption: "Evidence → rol → red.",
    }
  ),

  "problem-solution-fit": fourSectionLesson(
    ["Problemas dignos de resolverse", "Entrevistas de empatía y JTBD", "Señales de demanda vs cumplidos educados", "Problem statement sin producto adentro"],
    [
      "Frecuencia × severidad × willingness to change. No todo pain merece startup.",
      "Pregunta por el pasado: última vez que ocurrió, workaround, costo. JTBD nombra el progreso deseado.",
      "Cumplidos ('qué cool') ≠ commitment (tiempo, dinero, cambio de hábito).",
      "Statement: quién + fricción + contexto + workaround actual — sin 'app' en la frase."
    ],
    "Problem-solution fit empieza con evidencia de pain real y compromiso.",
    "Completa 5 entrevistas y reescribe el problem statement con quotes.",
    [
      { term: "JTBD", definition: "Jobs To Be Done." },
      { term: "Workaround", definition: "Cómo la gente resuelve hoy el problema." },
      { term: "Willingness to change", definition: "Disposición a adoptar una nueva solución." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "ethical-entrepreneurship": fourSectionLesson(
    ["Stakeholders y externalidades", "Inclusión en diseño de productos", "Sostenibilidad y claims honestos", "Código de conducta founder"],
    [
      "Cada producto afecta usuarios, trabajadores, comunidad, ambiente. Mapea impactos.",
      "Diseña con accesibilidad y diversidad de contextos (idioma, conectividad, discapacidad).",
      "No greenwashing. Métricas honestas. Privacidad desde el diseño.",
      "Código: verdad en pitch, respeto en hiring, no growth hacking abusivo."
    ],
    "Ética founder es ventaja competitiva de confianza a largo plazo.",
    "Escribe un código de 10 líneas y un mapa de stakeholders de tu idea.",
    [
      { term: "Externalidad", definition: "Efecto no pagado/cobrado sobre terceros." },
      { term: "Greenwashing", definition: "Claims ambientales engañosos." },
      { term: "Privacy by design", definition: "Privacidad integrada desde el diseño." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "lean-canvas-business-model": fourSectionLesson(
    ["Lean Canvas como hipótesis visual", "Patrones: SaaS, marketplace, D2C, freemium", "Costes y revenue streams realistas", "Marcar supuestos riesgosos"],
    [
      "Cada caja del canvas es una hipótesis. Actualízala con evidencia.",
      "Elige patrón solo si el job del cliente lo exige. Marketplace necesita liquidez bilateral.",
      "Revenue prematuro inventado rompe confianza. Empieza con caminos creíbles.",
      "Resalta supuestos con '?'. El más riesgoso se prueba primero."
    ],
    "Canvas útil = hipótesis testables, no poster bonito estático.",
    "Completa Lean Canvas v1 con 3 supuestos marcados y el más riesgoso circulado.",
    [
      { term: "Lean Canvas", definition: "One-page business model para startups." },
      { term: "SaaS", definition: "Software as a Service — suscripción de software." },
      { term: "Unfair advantage", definition: "Ventaja difícil de copiar." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "value-proposition-design": fourSectionLesson(
    ["Value map vs customer profile", "Posicionamiento en una frase", "Mensajes de landing page", "Pruebas de claridad con usuarios"],
    [
      "Encaja pains/gains con pain relievers/gain creators. Elimina features huérfanas.",
      "Posicionamiento: para X que sufren Y, nuestra solución Z a diferencia de W.",
      "Landing: promesa, prueba, CTA. Above the fold sin párrafos eternos.",
      "Test de 5 segundos: ¿entendieron para quién y qué hace?"
    ],
    "Value proposition clara reduce CAC creativo y acelera interviews.",
    "Escribe 3 variantes de positioning y testea con 5 personas.",
    [
      { term: "Positioning", definition: "Lugar percibido vs alternativas." },
      { term: "Above the fold", definition: "Contenido visible sin scroll." },
      { term: "Value map", definition: "Mapa de valor del lado de la solución." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "competitive-landscape": fourSectionLesson(
    ["Competidores directos, indirectos y workarounds", "SWOT honesto (sin fan fiction)", "Moats realistas para early stage", "Gap analysis accionable"],
    [
      "El peor competidor suele ser el status quo / Excel / grupo de WhatsApp.",
      "SWOT con evidencia. Strengths falsas se descubren en demo day.",
      "Moats tempranos: velocidad de aprendizaje, comunidad, datos propios con consentimiento — no 'IA mágica'.",
      "Gap: qué job nadie sirve bien. Ahí experimentas."
    ],
    "Competencia se analiza para aprender, no para odiar.",
    "Entrega matriz de 5 alternativas + gap + implicación para MVP.",
    [
      { term: "Status quo", definition: "Solución actual (aunque imperfecta)." },
      { term: "Moat", definition: "Barrera de defensa competitiva." },
      { term: "SWOT", definition: "Strengths, Weaknesses, Opportunities, Threats." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "mvp-build-measure-learn": fourSectionLesson(
    ["Filosofía MVP y anti-overengineering", "Tipos: concierge, wizard of oz, fake door", "Métricas de aprendizaje", "Kill/pivot/persevere rules"],
    [
      "MVP maximiza aprendizaje por unidad de esfuerzo. Si no aprendes, no es viable.",
      "Concierge: lo haces manual. Fake door: mides interés. Wizard of Oz: UI real, backoffice humano.",
      "Define learning metric antes: % completan job, % reservan llamada, etc.",
      "Predefine umbrales para matar, pivotar o perseverar — evita sunk cost drama."
    ],
    "Build-Measure-Learn es un loop de evidencia, no un slogan.",
    "Diseña experiment card completa para tu MVP.",
    [
      { term: "MVP", definition: "Minimum Viable Product." },
      { term: "Fake door", definition: "Test de demanda con oferta aún no construida." },
      { term: "Pivot", definition: "Cambio estructural de hipótesis." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ],
    {
      type: "troubleshooting-flowchart",
      title: "Build → Measure → Learn",
      afterSection: 0,
      caption: "Loop con kill criteria.",
    }
  ),

  "nocode-prototyping-tools": fourSectionLesson(
    ["Cuándo no-code es la decisión correcta", "Landing + waitlist + forms", "Apps ligeras (Glide/Bubble/Webflow intro)", "Límites y deuda técnica consciente"],
    [
      "Si el riesgo es de mercado, no de arquitectura, no-code acelera.",
      "Una landing clara + waitlist puede validar mensaje antes de app.",
      "Elige herramienta por velocidad y fit — documenta por qué.",
      "Conoce límites (escala, vendor lock-in). Plan B documentado."
    ],
    "No-code es estrategia de aprendizaje, no atajo eterno sin criterio.",
    "Publica un prototipo clickable o waitlist y documenta stack.",
    [
      { term: "No-code", definition: "Construcción sin programación tradicional." },
      { term: "Waitlist", definition: "Lista de interesados pre-lanzamiento." },
      { term: "Vendor lock-in", definition: "Dependencia difícil de migrar." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "user-testing-feedback": fourSectionLesson(
    ["Protocolo think-aloud", "Severidad de fricciones", "Priorización de backlog", "Cerrar el loop con usuarios"],
    [
      "Observa en silencio. No vendas durante el test. Graba con permiso.",
      "Severidad: bloquea job / confunde / cosmética. Prioriza bloqueadores.",
      "Backlog: impacto × esfuerzo. Un cambio grande por iteración cuando sea posible.",
      "Avisa a testers qué cambió — construye relación de co-diseño."
    ],
    "User testing profesional genera backlog priorizado, no opiniones de pasillo.",
    "Corre 3 tests y publica tabla de fricciones con severidad.",
    [
      { term: "Think-aloud", definition: "Usuario narra su pensamiento al usar el producto." },
      { term: "Backlog", definition: "Lista priorizada de cambios." },
      { term: "NPS intro", definition: "Net Promoter Score — señal gruesa de lealtad." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "gtm-launch-checklist": fourSectionLesson(
    ["Pre-launch, launch day, post-launch", "Selección de canales con presupuesto cero/bajo", "Asset checklist", "War room lite: roles del día D"],
    [
      "Pre: mensaje, landing, analytics, soporte. Day: publicación coordinada. Post: escucha y itera 72h.",
      "Canales: comunidad existente, partners, contenido founder-led, email de early adopters.",
      "Assets: demo, FAQ, one-pager, creativos, UTM list.",
      "Roles: poster, responder, logger de bugs/feedback, decision maker."
    ],
    "GTM es operación con checklist — no un post único esperando milagro.",
    "Completa launch checklist de 30 días con owners.",
    [
      { term: "GTM", definition: "Go-To-Market." },
      { term: "Early adopter", definition: "Usuario temprano tolerante a imperfección." },
      { term: "War room", definition: "Equipo corto coordinando el lanzamiento." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "organic-growth-community": fourSectionLesson(
    ["Founder-led marketing", "Build in public con límites", "Loops de referido y comunidad", "Complemento con Digital Marketing track"],
    [
      "La voz del founder genera confianza si es consistente y útil.",
      "Build in public: comparte aprendizajes, no secretos de usuarios ni métricas falsas.",
      "Comunidad > follower count. Diseña rituales (office hours, challenges).",
      "Usa skills del track de marketing: calendario, ética, UTMs."
    ],
    "Crecimiento orgánico sostenible se apoya en comunidad y utilidad repetible.",
    "Diseña un loop de contenido+comunidad de 2 semanas.",
    [
      { term: "Build in public", definition: "Compartir el proceso de construcción abiertamente." },
      { term: "Referral loop", definition: "Usuarios traen usuarios." },
      { term: "Community ritual", definition: "Práctica recurrente que mantiene engagement." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "startup-metrics-pmf": fourSectionLesson(
    ["Activation, retention, churn — definiciones operativas", "Señales de product-market fit (intro)", "Cohortes simples en Sheets", "Cuándo pivotar vs perseverar"],
    [
      "Define eventos: signup, activation (aha), retention D7, churn. Sin definiciones, no hay debate útil.",
      "PMF signals: retención orgánica, demanda supera capacity, users se enojan si quitas el producto.",
      "Cohorte por semana de signup. Visual mínima basta en early stage.",
      "Reglas predeclaradas > ego. Pivotar es inteligencia, no fracaso."
    ],
    "Métricas tempranas miden aprendizaje y retención — no vanity fundraising.",
    "Arma dashboard de 3 métricas core con definiciones escritas.",
    [
      { term: "Activation", definition: "Momento en que el usuario vive el valor central." },
      { term: "Retention", definition: "Usuarios que regresan en un período." },
      { term: "PMF", definition: "Product-Market Fit." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ],
    {
      type: "data-pipeline",
      title: "Signup → activation → retention",
      afterSection: 0,
      caption: "Embudo de producto temprano.",
    }
  ),

  "startup-finance-basics": fourSectionLesson(
    ["P&L para no contadores", "Burn rate y runway", "Cash flow awareness", "Errores financieros típicos de founders juniors"],
    [
      "Revenue − COGS = gross profit; − opex = resultado. Conoce tus categorías.",
      "Burn: efectivo neto que quemas/mes. Runway: meses hasta $0 al burn actual.",
      "Ventas a crédito no son caja. Planifica pagos reales.",
      "Mezclar plata personal/empresa, no registrar gastos, inflar revenue en pitch."
    ],
    "Finanzas founder = runway consciente + disciplina de registro.",
    "Construye P&L simple 12 meses con 3 escenarios.",
    [
      { term: "Burn rate", definition: "Ritmo de consumo de efectivo." },
      { term: "Runway", definition: "Meses de supervivencia al burn actual." },
      { term: "COGS", definition: "Cost of Goods Sold." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "pricing-unit-economics": fourSectionLesson(
    ["Cost-plus vs value-based pricing", "CAC/LTV intro (con humildad)", "Experimentos de precio", "Empaquetado para early customers"],
    [
      "Value-based ancla en outcome del cliente; cost-plus evita vender a pérdida sin saberlo.",
      "CAC/LTV tempranos son estimaciones — declara supuestos. No finjas precisión de Series B.",
      "Prueba precios con ofertas acotadas. Escucha objeciones.",
      "Empaqueta: good/better/best o setup + mensual. Claridad > 12 SKUs."
    ],
    "Pricing es hipótesis de valor — se experimenta y se documenta.",
    "Propón 2 precios y un experimento de 10 conversaciones de venta.",
    [
      { term: "CAC", definition: "Customer Acquisition Cost." },
      { term: "LTV", definition: "Lifetime Value." },
      { term: "Unit economics", definition: "Economía por unidad de cliente/pedido." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "fundraising-landscape": fourSectionLesson(
    ["Bootstrapping, grants, F&F, angels — realismo", "Qué compran los investors (aprendizaje + mercado)", "Dilución intro sin miedo ni fantasía", "Cuándo NO fundraising"],
    [
      "La mayoría de ventures estudiantiles deben bootstrap/grants primero. Fundraising no es rite of passage obligatorio.",
      "Invierten en equipo, problema, tracción, insight. Pitch sin evidencia no convierte.",
      "Dilución: % de ownership a cambio de capital. Entiende tradeoffs a alto nivel; busca consejo legal real cuando aplique.",
      "Si no necesitas capital para aprender el siguiente hito, no levantes por ego."
    ],
    "Fundraising es herramienta opcional — no identidad.",
    "Escribe un memo: hito siguiente, si requiere capital, alternativas sin diluir.",
    [
      { term: "Bootstrap", definition: "Crecer sin capital externo significativo." },
      { term: "Angel", definition: "Inversor individual early-stage." },
      { term: "Dilución", definition: "Reducción porcentual de ownership al emitir equity." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "pitch-deck-structure": fourSectionLesson(
    ["Arco de 10 slides que funciona", "Narrativa vs data dump", "Diseño legible en proyector", "Anexo y data room lite"],
    [
      "Problem, solution, market, product, traction, model, GTM, team, ask, appendix hook.",
      "Una idea por slide. Números con fuente/supuesto.",
      "Tipografía grande, poco texto, contraste. Ensaya zoom share.",
      "Anexo: interviews summary, metrics defs, roadmap. Data room cuando haya due diligence real."
    ],
    "Deck ganador = narrativa clara + evidencia + ask específico.",
    "Entrega deck v1 de 10 slides + notas del presentador.",
    [
      { term: "Ask", definition: "Lo que solicitas (capital, pilots, mentores)." },
      { term: "Traction", definition: "Evidencia de progreso/demanda." },
      { term: "Data room", definition: "Repositorio de documentos para due diligence." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "storytelling-demo-day": fourSectionLesson(
    ["Performance: pacing y presencia", "Demo en vivo vs video backup", "Ensayo con timer y feedback", "Nervios: protocolo práctico"],
    [
      "Hook en 15s. Pausas. No leas slides. Contacto visual (o cámara).",
      "Siempre ten backup video si falla el live demo.",
      "Ensayo con rúbrica peer. Cambia solo la sección más débil por ciclo.",
      "Respiración, agua, checklist pre-escena. Nervios ≠ falta de preparación."
    ],
    "Demo day se gana en ensayos medidos.",
    "Graba un pitch de 3 minutos y revisa con rúbrica.",
    [
      { term: "Pacing", definition: "Ritmo de la presentación." },
      { term: "Backup plan", definition: "Plan B técnico/contenido." },
      { term: "Rúbrica", definition: "Criterios explícitos de evaluación." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "investor-qa-due-diligence": fourSectionLesson(
    ["Preguntas duras frecuentes", "Cómo decir 'no sé' con plan", "Red flags que debes evitar", "Due diligence basics"],
    [
      "Market size, competencia, por qué ahora, unit economics, riesgos, team gaps.",
      "'No sé aún; mediremos X así en Y días' > inventar.",
      "Red flags: métricas inventadas, denigrar usuarios, ignorar compliance, founder drama no gestionado.",
      "Data room lite: canvas, interviews, metrics defs, legal entity notes, IP awareness."
    ],
    "Q&A excelente demuestra pensamiento y honestidad.",
    "Prepara banco de 10 Q&A con respuestas de 30–45s.",
    [
      { term: "Due diligence", definition: "Investigación previa a inversión/partnership." },
      { term: "Red flag", definition: "Señal de riesgo serio." },
      { term: "TAM/SAM/SOM", definition: "Marcos de tamaño de mercado (usar con humildad)." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "legal-entities-ip-basics": fourSectionLesson(
    ["LLC vs corp — overview conceptual", "IP: trademarks, copyright, NDAs", "Cuándo hablar con abogado de verdad", "Compliance mínimo ético"],
    [
      "Estructura legal depende de país y goals. NOVA da overview — no consejo legal personalizado.",
      "Registra nombres con cuidado; respeta copyright; NDA no reemplaza trust + scope claro.",
      "Equity, fundraising docs, employment: busca profesional. No copies templates a ciegas.",
      "Privacidad de usuarios, permisos de imagen, términos claros en early waitlists."
    ],
    "Legal literacy evita errores caros; no sustituye abogado cuando el riesgo es real.",
    "Lista decisiones legales a consultar antes de cobrar o levantar capital.",
    [
      { term: "IP", definition: "Intellectual Property." },
      { term: "NDA", definition: "Non-Disclosure Agreement." },
      { term: "LLC", definition: "Limited Liability Company (concepto)." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "cofounder-team-culture": fourSectionLesson(
    ["Roles y expectativas explícitas", "Equity splits y vesting intro", "Conflicto: protocolos", "Hiring inclusivo early"],
    [
      "Escribe RACI lite: quién decide producto, money, brand. Ambigüedad destruye equipos.",
      "Vesting alinea tiempo/compromiso. Overview conceptual; documenta acuerdos.",
      "Conflicto: agenda, hechos, opciones, decisión, follow-up. No silent treatment.",
      "Job posts claros, entrevistas estructuradas, cero nepotismo tóxico."
    ],
    "Cultura early = acuerdos escritos + respeto operativo.",
    "Redacta one-pager de roles + ritual semanal del equipo capstone.",
    [
      { term: "Vesting", definition: "Adquisición gradual de equity con el tiempo." },
      { term: "RACI", definition: "Responsible, Accountable, Consulted, Informed." },
      { term: "Cofounder agreement", definition: "Acuerdo de expectativas entre founders." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "operations-tools-startups": fourSectionLesson(
    ["Stack mínimo viable de ops", "Notion/Slack/boards con higiene", "Vendor selection en presupuesto bajo", "Decision log"],
    [
      "Docs, chat, tasks, CRM lite, drive. Menos herramientas, más disciplina.",
      "Naming conventions, owners, fechas. Archiva, no dejes cementerios de páginas.",
      "Evalúa: costo, export, seguridad, curva de aprendizaje.",
      "Decision log: fecha, decisión, por qué, revisitar cuándo."
    ],
    "Ops temprano es higiene de ejecución — ventaja silenciosa.",
    "Publica founder operating manual de 1 página para tu equipo.",
    [
      { term: "Decision log", definition: "Registro de decisiones clave." },
      { term: "Stack", definition: "Conjunto de herramientas." },
      { term: "Higiene operativa", definition: "Prácticas que mantienen el sistema usable." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "capstone-venture-selection": fourSectionLesson(
    ["Criterios para elegir venture de capstone", "Scope de MVP defendible en el tiempo del curso", "Métricas de éxito del dossier", "Riesgos y mitigaciones"],
    [
      "Elige impacto o comercial con acceso a usuarios reales (campus/comunidad).",
      "MVP debe caber en semanas, no en fantasías de 12 features.",
      "Éxito: discovery evidence, canvas vivo, MVP testeado, GTM 30 días, pitch.",
      "Mitiga: acceso a entrevistados, permisos, dependencia técnica."
    ],
    "Capstone se gana con scope realista y evidencia completa.",
    "Congela selección de venture + scope MVP por escrito.",
    [
      { term: "Dossier", definition: "Paquete integrado de evidencia del venture." },
      { term: "Scope freeze", definition: "Congelar alcance para ejecutar." },
      { term: "Mitigación", definition: "Acción que reduce probabilidad/impacto de un riesgo." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "portfolio-founder-brand": fourSectionLesson(
    ["Presencia founder en LinkedIn/Wellfound", "Portfolio site mínimo", "Mentor outreach ético", "Narrativa de aprendizaje"],
    [
      "Perfil orientado a evidencia: projects, interviews count, MVP link.",
      "Una página: problema, solución, demo, contacto. Rápida en móvil.",
      "Outreach: contexto específico + ask pequeño + gracia. No spam masivo idéntico.",
      "Cuenta qué aprendiste al fallar un supuesto — eso es señal de founder maduro."
    ],
    "Marca founder = evidencia pública + respeto en outreach.",
    "Publica portfolio mínimo y 5 mensajes de outreach personalizados (borrador).",
    [
      { term: "Wellfound", definition: "Plataforma de startups/talent (ex AngelList talent)." },
      { term: "Outreach", definition: "Contacto proactivo a mentores/partners." },
      { term: "Founder brand", definition: "Reputación profesional del emprendedor." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ]
  ),

  "demo-day-prep-rubric": fourSectionLesson(
    ["Calendario de ensayos", "Alineación a rúbrica de jueces", "Backup plans técnicos", "Cierre del dossier capstone"],
    [
      "T-7, T-3, T-1 ensayos con timer. Feedback escrito.",
      "Mapea cada sección del pitch a criterios: clarity, evidence, feasibility, ethics, delivery.",
      "Offline demo, hotspot, video mirror, PDF one-pager.",
      "Checklist final: canvas, MVP, finance snapshot, GTM, deck, video, reflection."
    ],
    "Prep de demo day es project management con rúbrica explícita.",
    "Entrega dossier integrado + video 90s + checklist firmado.",
    [
      { term: "Rúbrica", definition: "Criterios de evaluación explícitos." },
      { term: "T-minus", definition: "Conteo regresivo de preparación." },
      { term: "Dossier", definition: "Paquete completo capstone." }
    ],
    [
      { title: "The Lean Startup — methodology overview", url: "https://leanstartup.co/principles/", author: "Lean Startup Co." },
      { title: "NSF I-Corps — Customer Discovery", url: "https://www.nsf.gov/innovation/i-corps", author: "NSF" },
      { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library", author: "Y Combinator" }
    ],
    {
      type: "troubleshooting-flowchart",
      title: "Prep T-7 → Demo Day",
      afterSection: 0,
      caption: "Ensayo, backup, dossier.",
    }
  )
};
