import type { LessonContent } from "../types";
import { buildLesson } from "./content-builder";

/** QCW-style theory content — cybersecurity-analyst (32 lessons). */
export const CYBERSECURITY_ANALYST_LESSONS: Record<string, LessonContent> = {
  "estado-threat-landscape": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Estado del threat landscape 2025–2026» es competencia clave en operaciones SOC y ciberseguridad defensiva. Ransomware, supply chain, insider threats; costos para PYMEs y sector público. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Estado del threat landscape 2025–2026» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Estado del threat landscape 2025–2026»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Estado del threat landscape 2025–2026» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ],
    visual: { type: "security-scenario", title: "Referencia: Estado del threat landscape 2025–2026", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "roles-soc-analyst-ir-grc": buildLesson({
    sections: [
      { heading: "Pregunta de negocio y datos", body: "Pregunta de negocio y datos: «Roles: SOC analyst L1/L2, IR, GRC, pentester» es competencia clave en operaciones SOC y ciberseguridad defensiva. Rutas de carrera, certificaciones y expectativas salariales entry-level. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Técnicas y herramientas", body: "Técnicas y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Calidad y gobernanza", body: "Calidad y gobernanza: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Comunicación de insights", body: "Comunicación de insights: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Roles: SOC analyst L1/L2, IR, GRC, pentester» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Roles: SOC analyst L1/L2, IR, GRC, pentester»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Roles: SOC analyst L1/L2, IR, GRC, pentester» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "marco-legal-etica-ciberseguridad": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Marco legal y ética (LFPDPPP, GDPR, leyes locales)» es competencia clave en operaciones SOC y ciberseguridad defensiva. Notificación de brechas, evidencia digital intro, código de conducta. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Marco legal y ética (LFPDPPP, GDPR, leyes locales)» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Marco legal y ética (LFPDPPP, GDPR, leyes locales)»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Marco legal y ética (LFPDPPP, GDPR, leyes locales)» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "modelos-amenazas-superficie-ataque": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Modelos de amenazas y superficie de ataque» es competencia clave en operaciones SOC y ciberseguridad defensiva. Asset inventory, threat modeling básico, MITRE ATT&CK overview. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Modelos de amenazas y superficie de ataque» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Modelos de amenazas y superficie de ataque»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Modelos de amenazas y superficie de ataque» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "hashing-md5-sha256-integridad": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Hashing: MD5 vs SHA-256, integridad de archivos» es competencia clave en operaciones SOC y ciberseguridad defensiva. Uso forense de hashes, VirusTotal, verificación de downloads. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Hashing: MD5 vs SHA-256, integridad de archivos» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Hashing: MD5 vs SHA-256, integridad de archivos»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Hashing: MD5 vs SHA-256, integridad de archivos» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ],
    visual: { type: "security-scenario", title: "Referencia: Hashing: MD5 vs SHA-256, integridad de archivos", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "cifrado-simetrico-asimetrico": buildLesson({
    sections: [
      { heading: "Panorama de amenazas y controles", body: "Panorama de amenazas y controles: «Cifrado simétrico y asimétrico (AES, RSA intro)» es competencia clave en operaciones SOC y ciberseguridad defensiva. Cuándo se usa cada uno; limitaciones y key management básico. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Implementación práctica", body: "Implementación práctica: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Detección y respuesta", body: "Detección y respuesta: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Preparación profesional SOC", body: "Preparación profesional SOC: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Cifrado simétrico y asimétrico (AES, RSA intro)» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Cifrado simétrico y asimétrico (AES, RSA intro)»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Cifrado simétrico y asimétrico (AES, RSA intro)» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "pki-certificados-tls": buildLesson({
    sections: [
      { heading: "Panorama de amenazas y controles", body: "Panorama de amenazas y controles: «PKI, certificados X.509 y TLS handshake» es competencia clave en operaciones SOC y ciberseguridad defensiva. CA, certificados autofirmados vs confiables, errores comunes de certificado. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Implementación práctica", body: "Implementación práctica: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Detección y respuesta", body: "Detección y respuesta: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Preparación profesional SOC", body: "Preparación profesional SOC: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «PKI, certificados X.509 y TLS handshake» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «PKI, certificados X.509 y TLS handshake»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «PKI, certificados X.509 y TLS handshake» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "TLS", definition: "Transport Layer Security; cifrado de tráfico en tránsito." },
      { term: "PKI", definition: "Public Key Infrastructure; marco de certificados digitales." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "vpn-tuneles-seguros": buildLesson({
    sections: [
      { heading: "Panorama de amenazas y controles", body: "Panorama de amenazas y controles: «VPN y túneles seguros» es competencia clave en operaciones SOC y ciberseguridad defensiva. IPsec vs SSL VPN concept; split tunneling y riesgos. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Implementación práctica", body: "Implementación práctica: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Detección y respuesta", body: "Detección y respuesta: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Preparación profesional SOC", body: "Preparación profesional SOC: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «VPN y túneles seguros» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «VPN y túneles seguros»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «VPN y túneles seguros» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "autenticacion-vs-autorizacion": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Autenticación vs autorización» es competencia clave en operaciones SOC y ciberseguridad defensiva. Factores de autenticación, passwords vs passkeys, políticas de complejidad. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Autenticación vs autorización» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Autenticación vs autorización»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Autenticación vs autorización» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ],
    visual: { type: "security-scenario", title: "Referencia: Autenticación vs autorización", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "active-directory-ldap-basics": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Active Directory y LDAP basics» es competencia clave en operaciones SOC y ciberseguridad defensiva. OU, grupos, GPO intro, Kerberos concept para analistas. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Active Directory y LDAP basics» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Active Directory y LDAP basics»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Active Directory y LDAP basics» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "mfa-sso-federacion": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «MFA, SSO y federación» es competencia clave en operaciones SOC y ciberseguridad defensiva. TOTP, FIDO2, SAML/OAuth2 concept; ataques a MFA (fatigue, SIM swap). Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «MFA, SSO y federación» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «MFA, SSO y federación»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «MFA, SSO y federación» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "privilegios-acceso-minimo": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Privilegios y acceso mínimo» es competencia clave en operaciones SOC y ciberseguridad defensiva. PAM intro, cuentas admin separadas, auditoría de permisos. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Privilegios y acceso mínimo» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Privilegios y acceso mínimo»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Privilegios y acceso mínimo» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "arquitecturas-red-seguras": buildLesson({
    sections: [
      { heading: "Panorama de amenazas y controles", body: "Panorama de amenazas y controles: «Arquitecturas de red seguras» es competencia clave en operaciones SOC y ciberseguridad defensiva. DMZ, VLANs de seguridad, microsegmentación concept. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Implementación práctica", body: "Implementación práctica: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Detección y respuesta", body: "Detección y respuesta: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Preparación profesional SOC", body: "Preparación profesional SOC: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Arquitecturas de red seguras» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Arquitecturas de red seguras»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Arquitecturas de red seguras» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "CTU", definition: "Contador incremental en ladder logic PLC." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ],
    visual: { type: "security-scenario", title: "Referencia: Arquitecturas de red seguras", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "firewalls-stateful-reglas": buildLesson({
    sections: [
      { heading: "Panorama de amenazas y controles", body: "Panorama de amenazas y controles: «Firewalls stateful y reglas» es competencia clave en operaciones SOC y ciberseguridad defensiva. Allow/deny, NAT, reglas mal configuradas comunes. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Implementación práctica", body: "Implementación práctica: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Detección y respuesta", body: "Detección y respuesta: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Preparación profesional SOC", body: "Preparación profesional SOC: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Firewalls stateful y reglas» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Firewalls stateful y reglas»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Firewalls stateful y reglas» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "NAT", definition: "Network Address Translation; traducción de direcciones privadas a públicas." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "ids-ips-waf": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «IDS vs IPS vs WAF» es competencia clave en operaciones SOC y ciberseguridad defensiva. Detección basada en firmas vs anomalías; cuándo alertar vs bloquear. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «IDS vs IPS vs WAF» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «IDS vs IPS vs WAF»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «IDS vs IPS vs WAF» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "zero-trust-sase-conceptual": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Zero Trust y SASE (conceptual)» es competencia clave en operaciones SOC y ciberseguridad defensiva. Never trust, always verify; implicaciones para SOC remoto. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Zero Trust y SASE (conceptual)» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Zero Trust y SASE (conceptual)»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Zero Trust y SASE (conceptual)» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "analisis-paquetes-fundamentos": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Fundamentos de análisis de paquetes» es competencia clave en operaciones SOC y ciberseguridad defensiva. Captura, filtros BPF, protocolos HTTP/DNS/SSH en Wireshark. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Fundamentos de análisis de paquetes» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Fundamentos de análisis de paquetes»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Fundamentos de análisis de paquetes» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "DNS", definition: "Domain Name System; resolución de nombres a direcciones IP." },
      { term: "Wireshark", definition: "Analizador de tráfico de red por captura de paquetes." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ],
    visual: { type: "security-scenario", title: "Referencia: Fundamentos de análisis de paquetes", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "windows-event-logs-security": buildLesson({
    sections: [
      { heading: "Contexto en soporte técnico", body: "Contexto en soporte técnico: «Windows Event Logs para security» es competencia clave en operaciones SOC y ciberseguridad defensiva. Event IDs críticos (4624, 4625, 4672), PowerShell logging intro. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos y herramientas", body: "Conceptos y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Diagnóstico y documentación", body: "Diagnóstico y documentación: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Empleabilidad entry-level", body: "Empleabilidad entry-level: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Windows Event Logs para security» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Windows Event Logs para security»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Windows Event Logs para security» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "syslog-logs-linux": buildLesson({
    sections: [
      { heading: "Contexto en soporte técnico", body: "Contexto en soporte técnico: «Syslog y logs Linux (auth.log, journalctl)» es competencia clave en operaciones SOC y ciberseguridad defensiva. Centralización, timestamps, correlación básica. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos y herramientas", body: "Conceptos y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Diagnóstico y documentación", body: "Diagnóstico y documentación: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Empleabilidad entry-level", body: "Empleabilidad entry-level: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Syslog y logs Linux (auth.log, journalctl)» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Syslog y logs Linux (auth.log, journalctl)»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Syslog y logs Linux (auth.log, journalctl)» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "indicadores-compromiso-iocs": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Indicadores de compromiso (IOCs)» es competencia clave en operaciones SOC y ciberseguridad defensiva. IPs maliciosas, hashes, dominios C2; feeds de threat intel intro. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Indicadores de compromiso (IOCs)» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Indicadores de compromiso (IOCs)»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Indicadores de compromiso (IOCs)» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "IOC", definition: "Indicator of Compromise; artefacto que sugiere intrusión (IP, hash, dominio)." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "que-es-siem-pipeline": buildLesson({
    sections: [
      { heading: "Panorama de amenazas y controles", body: "Panorama de amenazas y controles: «¿Qué es un SIEM? Pipeline de datos de seguridad» es competencia clave en operaciones SOC y ciberseguridad defensiva. Collect → normalize → correlate → alert; arquitectura típica. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Implementación práctica", body: "Implementación práctica: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Detección y respuesta", body: "Detección y respuesta: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Preparación profesional SOC", body: "Preparación profesional SOC: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «¿Qué es un SIEM? Pipeline de datos de seguridad» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «¿Qué es un SIEM? Pipeline de datos de seguridad»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «¿Qué es un SIEM? Pipeline de datos de seguridad» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SIEM", definition: "Security Information and Event Management; correlación de logs de seguridad." },
      { term: "CTU", definition: "Contador incremental en ladder logic PLC." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ],
    visual: { type: "security-scenario", title: "Referencia: ¿Qué es un SIEM? Pipeline de datos de seguridad", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "reglas-deteccion-falsos-positivos": buildLesson({
    sections: [
      { heading: "Fundamentos de conectividad", body: "Fundamentos de conectividad: «Reglas de detección y falsos positivos» es competencia clave en operaciones SOC y ciberseguridad defensiva. Tuning, thresholds, MITRE mapping en alertas. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Configuración y diagnóstico", body: "Configuración y diagnóstico: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Fallos frecuentes en campo", body: "Fallos frecuentes en campo: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Documentación de red", body: "Documentación de red: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Reglas de detección y falsos positivos» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Reglas de detección y falsos positivos»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Reglas de detección y falsos positivos» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "workflow-soc-triage": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Workflow SOC: triage, enriquecimiento, escalamiento» es competencia clave en operaciones SOC y ciberseguridad defensiva. Severidad P1–P4, SLAs, handoff a IR tier 2. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Workflow SOC: triage, enriquecimiento, escalamiento» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Workflow SOC: triage, enriquecimiento, escalamiento»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Workflow SOC: triage, enriquecimiento, escalamiento» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "threat-intelligence-feeds": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Threat intelligence feeds y enriquecimiento» es competencia clave en operaciones SOC y ciberseguridad defensiva. VirusTotal, AbuseIPDB, MISP concept; contextualizar alertas. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Threat intelligence feeds y enriquecimiento» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Threat intelligence feeds y enriquecimiento»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Threat intelligence feeds y enriquecimiento» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "vulnerability-management-lifecycle": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Vulnerability management lifecycle» es competencia clave en operaciones SOC y ciberseguridad defensiva. Scan → prioritize → patch → verify; CVSS scoring intro. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Vulnerability management lifecycle» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Vulnerability management lifecycle»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Vulnerability management lifecycle» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "CVSS", definition: "Common Vulnerability Scoring System; severidad de vulnerabilidades." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ],
    visual: { type: "security-scenario", title: "Referencia: Vulnerability management lifecycle", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "hardening-windows-linux-cis": buildLesson({
    sections: [
      { heading: "Contexto en soporte técnico", body: "Contexto en soporte técnico: «Hardening Windows y Linux (CIS Level 1)» es competencia clave en operaciones SOC y ciberseguridad defensiva. Checklists aplicables: servicios, puertos, auditoría. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos y herramientas", body: "Conceptos y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Diagnóstico y documentación", body: "Diagnóstico y documentación: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Empleabilidad entry-level", body: "Empleabilidad entry-level: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Hardening Windows y Linux (CIS Level 1)» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Hardening Windows y Linux (CIS Level 1)»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Hardening Windows y Linux (CIS Level 1)» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "RTO", definition: "Recovery Time Objective; tiempo máximo tolerable de recuperación." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "patch-management-ventanas": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Patch management y ventanas de mantenimiento» es competencia clave en operaciones SOC y ciberseguridad defensiva. WSUS, apt upgrade, rollback plans, comunicación a usuarios. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Patch management y ventanas de mantenimiento» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Patch management y ventanas de mantenimiento»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Patch management y ventanas de mantenimiento» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "nist-sp80061-respuesta-incidentes": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «NIST SP 800-61: fases de respuesta a incidentes» es competencia clave en operaciones SOC y ciberseguridad defensiva. Preparation, detection, containment, eradication, recovery, lessons learned. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «NIST SP 800-61: fases de respuesta a incidentes» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «NIST SP 800-61: fases de respuesta a incidentes»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «NIST SP 800-61: fases de respuesta a incidentes» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "playbooks-ransomware-phishing": buildLesson({
    sections: [
      { heading: "Panorama de amenazas y controles", body: "Panorama de amenazas y controles: «Playbooks: ransomware, phishing, cuenta comprometida» es competencia clave en operaciones SOC y ciberseguridad defensiva. Pasos concretos, quién hace qué, plantillas de comunicación. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Implementación práctica", body: "Implementación práctica: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Detección y respuesta", body: "Detección y respuesta: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Preparación profesional SOC", body: "Preparación profesional SOC: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Playbooks: ransomware, phishing, cuenta comprometida» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Playbooks: ransomware, phishing, cuenta comprometida»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Playbooks: ransomware, phishing, cuenta comprometida» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ],
    visual: { type: "security-scenario", title: "Referencia: Playbooks: ransomware, phishing, cuenta comprometida", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "forensics-intro-imagen-disco": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Forensics intro: imagen de disco y memoria» es competencia clave en operaciones SOC y ciberseguridad defensiva. Orden de volatilidad, FTK Imager/Autopsy demo, cadena de custodia. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Forensics intro: imagen de disco y memoria» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Forensics intro: imagen de disco y memoria»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Forensics intro: imagen de disco y memoria» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "owasp-top10-analistas": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «OWASP Top 10 para analistas (no developers)» es competencia clave en operaciones SOC y ciberseguridad defensiva. SQLi, XSS, CSRF — reconocer en logs y reportar a dev team. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «OWASP Top 10 para analistas (no developers)» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «OWASP Top 10 para analistas (no developers)»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «OWASP Top 10 para analistas (no developers)» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  }),

  "secure-coding-devsecops-intro": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Secure coding awareness y DevSecOps intro» es competencia clave en operaciones SOC y ciberseguridad defensiva. SAST/DAST concept, shift-left, pipeline security gates. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Secure coding awareness y DevSecOps intro» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Secure coding awareness y DevSecOps intro»: marco operativo en operaciones SOC y ciberseguridad defensiva, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Secure coding awareness y DevSecOps intro» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA Security+ SY0-701", url: "https://www.comptia.org/certifications/security", author: "CompTIA" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", author: "MITRE" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", author: "NIST" }
    ]
  })
};
