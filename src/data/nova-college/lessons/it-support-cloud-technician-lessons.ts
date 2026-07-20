import type { LessonContent } from "../types";
import { buildLesson } from "./content-builder";

/** QCW-style theory content — it-support-cloud (30 lessons). */
export const IT_SUPPORT_CLOUD_LESSONS: Record<string, LessonContent> = {
  "panorama-sector-it-roles-entry-level": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Panorama del sector IT y roles entry-level» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Service desk, field technician, NOC junior, cloud support — rutas de carrera y expectativas del mercado laboral global. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Panorama del sector IT y roles entry-level» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Panorama del sector IT y roles entry-level»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Panorama del sector IT y roles entry-level» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ],
    visual: { type: "troubleshooting-flowchart", title: "Referencia: Panorama del sector IT y roles entry-level", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "componentes-internos-pc": buildLesson({
    sections: [
      { heading: "Contexto en soporte técnico", body: "Contexto en soporte técnico: «Componentes internos: CPU, RAM, almacenamiento, motherboard» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Arquitectura von Neumann, tipos de RAM/SSD/HDD, slots, compatibilidad y especificaciones técnicas. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos y herramientas", body: "Conceptos y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Diagnóstico y documentación", body: "Diagnóstico y documentación: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Empleabilidad entry-level", body: "Empleabilidad entry-level: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Componentes internos: CPU, RAM, almacenamiento, motherboard» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Componentes internos: CPU, RAM, almacenamiento, motherboard»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Componentes internos: CPU, RAM, almacenamiento, motherboard» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "CTU", definition: "Contador incremental en ladder logic PLC." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "perifericos-puertos-conectores": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Periféricos, puertos y conectores» es competencia clave en soporte IT, redes y operaciones cloud entry-level. USB-C, HDMI, DisplayPort, Thunderbolt; impresoras, escáneres y dispositivos de entrada/salida. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Periféricos, puertos y conectores» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Periféricos, puertos y conectores»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Periféricos, puertos y conectores» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "RTO", definition: "Recovery Time Objective; tiempo máximo tolerable de recuperación." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "electricidad-basica-esd": buildLesson({
    sections: [
      { heading: "Fundamentos industriales", body: "Fundamentos industriales: «Electricidad básica y ESD (Electrostatic Discharge)» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Voltaje, amperaje, fuentes de poder, protección antiestática y seguridad en banco de trabajo. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Programación y cableado", body: "Programación y cableado: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Seguridad y interlocks", body: "Seguridad y interlocks: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Integración en planta simulada", body: "Integración en planta simulada: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Electricidad básica y ESD (Electrostatic Discharge)» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Electricidad básica y ESD (Electrostatic Discharge)»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Electricidad básica y ESD (Electrostatic Discharge)» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "ESD", definition: "Electrostatic Discharge; descarga estática que daña componentes electrónicos." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "metodologia-troubleshooting": buildLesson({
    sections: [
      { heading: "Contexto en soporte técnico", body: "Contexto en soporte técnico: «Metodología de troubleshooting» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Identificar → probar → documentar → escalar; uso de logs, Event Viewer y checklists. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos y herramientas", body: "Conceptos y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Diagnóstico y documentación", body: "Diagnóstico y documentación: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Empleabilidad entry-level", body: "Empleabilidad entry-level: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Metodología de troubleshooting» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Metodología de troubleshooting»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Metodología de troubleshooting» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ],
    visual: { type: "troubleshooting-flowchart", title: "Referencia: Metodología de troubleshooting", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "windows-instalacion-particionado": buildLesson({
    sections: [
      { heading: "Contexto en soporte técnico", body: "Contexto en soporte técnico: «Windows 10/11: instalación y particionado» es competencia clave en soporte IT, redes y operaciones cloud entry-level. UEFI vs Legacy, GPT, imágenes de instalación, drivers y activación en entorno educativo. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos y herramientas", body: "Conceptos y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Diagnóstico y documentación", body: "Diagnóstico y documentación: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Empleabilidad entry-level", body: "Empleabilidad entry-level: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Windows 10/11: instalación y particionado» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Windows 10/11: instalación y particionado»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Windows 10/11: instalación y particionado» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "UEFI", definition: "Interfaz firmware moderna que reemplaza BIOS en equipos actuales." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "administracion-local-usuarios": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Administración local: usuarios, grupos, políticas» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Local Users and Groups, UAC, Windows Update, Task Manager y herramientas de mantenimiento. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Administración local: usuarios, grupos, políticas» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Administración local: usuarios, grupos, políticas»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Administración local: usuarios, grupos, políticas» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "intro-linux-soporte": buildLesson({
    sections: [
      { heading: "Contexto en soporte técnico", body: "Contexto en soporte técnico: «Introducción a Linux para soporte» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Distribuciones comunes (Ubuntu), terminal, permisos chmod/chown, paquetes apt y systemd básico. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos y herramientas", body: "Conceptos y herramientas: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Diagnóstico y documentación", body: "Diagnóstico y documentación: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Empleabilidad entry-level", body: "Empleabilidad entry-level: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Introducción a Linux para soporte» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Introducción a Linux para soporte»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Introducción a Linux para soporte» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "virtualizacion-virtualbox-hyperv": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Virtualización con VirtualBox / Hyper-V» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Snapshots, redes virtuales, clonación de VMs para entornos de práctica seguros. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Virtualización con VirtualBox / Hyper-V» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Virtualización con VirtualBox / Hyper-V»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Virtualización con VirtualBox / Hyper-V» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ],
    visual: { type: "troubleshooting-flowchart", title: "Referencia: Virtualización con VirtualBox / Hyper-V", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "modelos-osi-tcpip": buildLesson({
    sections: [
      { heading: "Fundamentos de conectividad", body: "Fundamentos de conectividad: «Modelos OSI y TCP/IP en la práctica» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Encapsulación, capas, protocolos comunes (HTTP, HTTPS, FTP, SSH) y flujo de datos. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Configuración y diagnóstico", body: "Configuración y diagnóstico: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Fallos frecuentes en campo", body: "Fallos frecuentes en campo: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Documentación de red", body: "Documentación de red: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Modelos OSI y TCP/IP en la práctica» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Modelos OSI y TCP/IP en la práctica»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Modelos OSI y TCP/IP en la práctica» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "TCP/IP", definition: "Suite de protocolos de red; base de Internet y LAN corporativas." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "direccionamiento-ip-subnetting": buildLesson({
    sections: [
      { heading: "Fundamentos de conectividad", body: "Fundamentos de conectividad: «Direccionamiento IP, subnetting básico y DHCP» es competencia clave en soporte IT, redes y operaciones cloud entry-level. IPv4, máscaras /24 /25, gateway, reservas DHCP y conflictos de IP. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Configuración y diagnóstico", body: "Configuración y diagnóstico: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Fallos frecuentes en campo", body: "Fallos frecuentes en campo: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Documentación de red", body: "Documentación de red: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Direccionamiento IP, subnetting básico y DHCP» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Direccionamiento IP, subnetting básico y DHCP»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Direccionamiento IP, subnetting básico y DHCP» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Subnetting", definition: "División de red IP en subredes más pequeñas." },
      { term: "DHCP", definition: "Dynamic Host Configuration Protocol; asignación automática de IP." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "dns-nat-conectividad": buildLesson({
    sections: [
      { heading: "Fundamentos de conectividad", body: "Fundamentos de conectividad: «DNS, NAT y conectividad a Internet» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Resolución de nombres, registros A/AAAA, NAT en router doméstico/empresarial. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Configuración y diagnóstico", body: "Configuración y diagnóstico: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Fallos frecuentes en campo", body: "Fallos frecuentes en campo: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Documentación de red", body: "Documentación de red: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «DNS, NAT y conectividad a Internet» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «DNS, NAT y conectividad a Internet»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «DNS, NAT y conectividad a Internet» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "DNS", definition: "Domain Name System; resolución de nombres a direcciones IP." },
      { term: "NAT", definition: "Network Address Translation; traducción de direcciones privadas a públicas." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "wifi-switches-topologias": buildLesson({
    sections: [
      { heading: "Fundamentos de conectividad", body: "Fundamentos de conectividad: «WiFi, switches y topologías LAN» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Estándares 802.11, SSID, WPA2/WPA3, VLAN concept intro, cableado Cat6. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Configuración y diagnóstico", body: "Configuración y diagnóstico: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Fallos frecuentes en campo", body: "Fallos frecuentes en campo: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Documentación de red", body: "Documentación de red: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «WiFi, switches y topologías LAN» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «WiFi, switches y topologías LAN»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «WiFi, switches y topologías LAN» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ],
    visual: { type: "troubleshooting-flowchart", title: "Referencia: WiFi, switches y topologías LAN", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "triada-cia-controles-acceso": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Triada CIA y controles de acceso» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Confidencialidad, integridad, disponibilidad; MFA, contraseñas robustas y gestores de credenciales. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Triada CIA y controles de acceso» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Triada CIA y controles de acceso»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Triada CIA y controles de acceso» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "malware-phishing-hardening": buildLesson({
    sections: [
      { heading: "Panorama de amenazas y controles", body: "Panorama de amenazas y controles: «Malware, phishing y hardening de endpoints» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Tipos de malware, señales de phishing, antivirus, firewall de host y parches. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Implementación práctica", body: "Implementación práctica: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Detección y respuesta", body: "Detección y respuesta: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Preparación profesional SOC", body: "Preparación profesional SOC: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Malware, phishing y hardening de endpoints» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Malware, phishing y hardening de endpoints»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Malware, phishing y hardening de endpoints» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "backups-recuperacion-documentacion": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Backups, recuperación y documentación» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Regla 3-2-1, imágenes de sistema, RTO/RPO intro, bitácoras de cambios. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Backups, recuperación y documentación» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Backups, recuperación y documentación»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Backups, recuperación y documentación» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "RTO", definition: "Recovery Time Objective; tiempo máximo tolerable de recuperación." },
      { term: "RPO", definition: "Recovery Point Objective; pérdida máxima de datos tolerable." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "respuesta-incidentes-nivel-1": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Respuesta a incidentes nivel 1» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Contener, reportar, escalar; plantillas de ticket de seguridad y comunicación a usuarios. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Respuesta a incidentes nivel 1» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Respuesta a incidentes nivel 1»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Respuesta a incidentes nivel 1» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ],
    visual: { type: "troubleshooting-flowchart", title: "Referencia: Respuesta a incidentes nivel 1", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "que-es-cloud-onprem-hibrido": buildLesson({
    sections: [
      { heading: "Contexto cloud y responsabilidad compartida", body: "Contexto cloud y responsabilidad compartida: «¿Qué es el cloud? On-prem vs cloud vs híbrido» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Elasticidad, pay-as-you-go, regiones y zonas de disponibilidad; casos de uso en PYMEs y enterprise. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Servicios y componentes clave", body: "Servicios y componentes clave: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Operación segura y costos", body: "Operación segura y costos: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Aplicación en soporte y labs", body: "Aplicación en soporte y labs: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «¿Qué es el cloud? On-prem vs cloud vs híbrido» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «¿Qué es el cloud? On-prem vs cloud vs híbrido»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «¿Qué es el cloud? On-prem vs cloud vs híbrido» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "modelos-servicio-iaas-paas-saas": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Modelos de servicio: IaaS, PaaS, SaaS» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Comparar EC2 vs Elastic Beanstalk vs SaaS (Google Workspace); cuándo elegir cada uno. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Modelos de servicio: IaaS, PaaS, SaaS» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Modelos de servicio: IaaS, PaaS, SaaS»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Modelos de servicio: IaaS, PaaS, SaaS» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "EC2", definition: "Elastic Compute Cloud; servicio de servidores virtuales en AWS." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "responsabilidad-compartida-aws": buildLesson({
    sections: [
      { heading: "Contexto cloud y responsabilidad compartida", body: "Contexto cloud y responsabilidad compartida: «Responsabilidad compartida en AWS» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Qué protege AWS vs el cliente; cumplimiento, Well-Architected Framework overview. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Servicios y componentes clave", body: "Servicios y componentes clave: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Operación segura y costos", body: "Operación segura y costos: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Aplicación en soporte y labs", body: "Aplicación en soporte y labs: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Responsabilidad compartida en AWS» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Responsabilidad compartida en AWS»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Responsabilidad compartida en AWS» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "precios-billing-free-tier": buildLesson({
    sections: [
      { heading: "Contexto cloud y responsabilidad compartida", body: "Contexto cloud y responsabilidad compartida: «Precios, billing y AWS Free Tier» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Consolas de costos, budgets, tags, alertas de facturación en entorno educativo. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Servicios y componentes clave", body: "Servicios y componentes clave: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Operación segura y costos", body: "Operación segura y costos: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Aplicación en soporte y labs", body: "Aplicación en soporte y labs: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Precios, billing y AWS Free Tier» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Precios, billing y AWS Free Tier»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Precios, billing y AWS Free Tier» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "CTU", definition: "Contador incremental en ladder logic PLC." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ],
    visual: { type: "troubleshooting-flowchart", title: "Referencia: Precios, billing y AWS Free Tier", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "intro-consola-aws-cli": buildLesson({
    sections: [
      { heading: "Contexto cloud y responsabilidad compartida", body: "Contexto cloud y responsabilidad compartida: «Introducción a la consola AWS y CLI» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Navegación IAM-first, regiones, AWS CLI básico para automatización. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Servicios y componentes clave", body: "Servicios y componentes clave: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Operación segura y costos", body: "Operación segura y costos: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Aplicación en soporte y labs", body: "Aplicación en soporte y labs: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Introducción a la consola AWS y CLI» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Introducción a la consola AWS y CLI»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Introducción a la consola AWS y CLI» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "ec2-instancias-amis-security-groups": buildLesson({
    sections: [
      { heading: "Contexto cloud y responsabilidad compartida", body: "Contexto cloud y responsabilidad compartida: «Amazon EC2: instancias, AMIs y security groups» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Tipos de instancia, key pairs, reglas inbound/outbound, Elastic IP intro. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Servicios y componentes clave", body: "Servicios y componentes clave: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Operación segura y costos", body: "Operación segura y costos: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Aplicación en soporte y labs", body: "Aplicación en soporte y labs: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Amazon EC2: instancias, AMIs y security groups» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Amazon EC2: instancias, AMIs y security groups»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Amazon EC2: instancias, AMIs y security groups» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "EC2", definition: "Elastic Compute Cloud; servicio de servidores virtuales en AWS." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "s3-buckets-objetos-politicas": buildLesson({
    sections: [
      { heading: "Contexto cloud y responsabilidad compartida", body: "Contexto cloud y responsabilidad compartida: «Amazon S3: buckets, objetos y políticas» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Storage classes, versioning, lifecycle, bloqueo de acceso público. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Servicios y componentes clave", body: "Servicios y componentes clave: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Operación segura y costos", body: "Operación segura y costos: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Aplicación en soporte y labs", body: "Aplicación en soporte y labs: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Amazon S3: buckets, objetos y políticas» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Amazon S3: buckets, objetos y políticas»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Amazon S3: buckets, objetos y políticas» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "S3", definition: "Simple Storage Service; almacenamiento de objetos en AWS." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "iam-usuarios-roles-politicas": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «IAM: usuarios, roles, políticas y least privilege» es competencia clave en soporte IT, redes y operaciones cloud entry-level. JSON policies, roles para servicios, cross-account intro. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «IAM: usuarios, roles, políticas y least privilege» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «IAM: usuarios, roles, políticas y least privilege»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «IAM: usuarios, roles, políticas y least privilege» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ],
    visual: { type: "troubleshooting-flowchart", title: "Referencia: IAM: usuarios, roles, políticas y least privilege", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "ebs-snapshots-amis": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «EBS, snapshots y AMIs personalizadas» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Volúmenes persistentes, backup con snapshots, golden images. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «EBS, snapshots y AMIs personalizadas» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «EBS, snapshots y AMIs personalizadas»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «EBS, snapshots y AMIs personalizadas» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "vpc-subnets-publicas-privadas": buildLesson({
    sections: [
      { heading: "Contexto cloud y responsabilidad compartida", body: "Contexto cloud y responsabilidad compartida: «Amazon VPC: subnets públicas y privadas» es competencia clave en soporte IT, redes y operaciones cloud entry-level. CIDR, Internet Gateway, route tables, NAT Gateway concept. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Servicios y componentes clave", body: "Servicios y componentes clave: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Operación segura y costos", body: "Operación segura y costos: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Aplicación en soporte y labs", body: "Aplicación en soporte y labs: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Amazon VPC: subnets públicas y privadas» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Amazon VPC: subnets públicas y privadas»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Amazon VPC: subnets públicas y privadas» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "VPC", definition: "Virtual Private Cloud; red lógica aislada en proveedor cloud." },
      { term: "NAT", definition: "Network Address Translation; traducción de direcciones privadas a públicas." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "security-groups-vs-nacls": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Security groups vs NACLs» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Stateful vs stateless, reglas comunes para web tier y database tier. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Security groups vs NACLs» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Security groups vs NACLs»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Security groups vs NACLs» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  }),

  "cloudwatch-metricas-logs-alarmas": buildLesson({
    sections: [
      { heading: "Contexto cloud y responsabilidad compartida", body: "Contexto cloud y responsabilidad compartida: «CloudWatch: métricas, logs y alarmas» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Dashboards operativos, SNS para alertas, interpretación de CPU/memoria. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Servicios y componentes clave", body: "Servicios y componentes clave: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Operación segura y costos", body: "Operación segura y costos: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Aplicación en soporte y labs", body: "Aplicación en soporte y labs: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «CloudWatch: métricas, logs y alarmas» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «CloudWatch: métricas, logs y alarmas»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «CloudWatch: métricas, logs y alarmas» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ],
    visual: { type: "troubleshooting-flowchart", title: "Referencia: CloudWatch: métricas, logs y alarmas", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "alta-disponibilidad-escalabilidad": buildLesson({
    sections: [
      { heading: "Contexto profesional", body: "Contexto profesional: «Alta disponibilidad y escalabilidad intro» es competencia clave en soporte IT, redes y operaciones cloud entry-level. Multi-AZ, Auto Scaling groups concept, ELB overview. Documenta con claridad para equipos internacionales y conserva términos técnicos en inglés (logs, dashboards, policies) tal como aparecen en herramientas reales." },
      { heading: "Conceptos técnicos esenciales", body: "Conceptos técnicos esenciales: Traduce la teoría en pasos verificables. Define qué inspeccionar, qué comando o pantalla usar, y qué evidencia adjuntar al ticket. Un técnico que entrega capturas, CSV o diagramas simples reduce escalamientos innecesarios y acelera MTTR." },
      { heading: "Buenas prácticas operativas", body: "Buenas prácticas operativas: Los fallos típicos son actuar sin backup, mezclar entornos prod/lab y cerrar casos sin validación del usuario. Sigue la secuencia: seguridad → contención → diagnóstico → cambio controlado → verificación → documentación en knowledge base." },
      { heading: "Evaluación y empleabilidad", body: "Evaluación y empleabilidad: En el lab del módulo, repite el flujo completo al menos una vez sin guía. Para entrevistas, prepara un relato STAR de 90 segundos con métrica de impacto (tiempo ahorrado, incidentes evitados, precisión de reporte)." },
      { heading: "Checklist de dominio", body: "Checklist: explica «Alta disponibilidad y escalabilidad intro» sin apoyo visual, nombra dos riesgos si se omite un control, y propone un KPI operativo (first-call resolution, uptime, alert noise ratio, scrap rate) relevante para el escenario." }
    ],
    summary: "Comprendiste «Alta disponibilidad y escalabilidad intro»: marco operativo en soporte IT, redes y operaciones cloud entry-level, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Alta disponibilidad y escalabilidad intro» (60–90 s). Menciona herramienta concreta, evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente interno o externo." },
      { term: "Runbook", definition: "Procedimiento operativo estandarizado para resolver incidentes recurrentes." },
      { term: "Triage", definition: "Clasificación inicial de tickets o alertas por impacto y urgencia." },
      { term: "Escalamiento", definition: "Transferencia a nivel superior con contexto, evidencia y acciones intentadas." },
      { term: "MFA", definition: "Multi-Factor Authentication; segundo factor además de contraseña." },
      { term: "IAM", definition: "Identity and Access Management; gestión de identidades y permisos." }
    ],
    references: [
      { title: "CompTIA A+ Exam Objectives", url: "https://www.comptia.org/certifications/a", author: "CompTIA" },
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", author: "AWS" },
      { title: "Microsoft Learn — Windows client", url: "https://learn.microsoft.com/windows/", author: "Microsoft" }
    ]
  })
};
