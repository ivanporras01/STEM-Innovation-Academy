import type { NovaCollegeCourse, NovaCollegeModule } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { IT_SUPPORT_CLOUD_LESSONS } from "./lessons/it-support-cloud-technician-lessons";

const RAW_MODULES: NovaCollegeModule[] = [
  {
    order: 1,
    title: "Fundamentos de IT y arquitectura de PC",
    description:
      "Introducción al ecosistema IT, componentes de hardware, ensamblaje seguro y herramientas de diagnóstico — alineado a CompTIA A+ Core 1.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "panorama-sector-it-roles-entry-level",
        "Panorama del sector IT y roles entry-level",
        "Service desk, field technician, NOC junior, cloud support — rutas de carrera y expectativas del mercado laboral global.",
        2,
      ),
      theoryLesson(
        "componentes-internos-pc",
        "Componentes internos: CPU, RAM, almacenamiento, motherboard",
        "Arquitectura von Neumann, tipos de RAM/SSD/HDD, slots, compatibilidad y especificaciones técnicas.",
        3,
      ),
      theoryLesson(
        "perifericos-puertos-conectores",
        "Periféricos, puertos y conectores",
        "USB-C, HDMI, DisplayPort, Thunderbolt; impresoras, escáneres y dispositivos de entrada/salida.",
        2,
      ),
      theoryLesson(
        "electricidad-basica-esd",
        "Electricidad básica y ESD (Electrostatic Discharge)",
        "Voltaje, amperaje, fuentes de poder, protección antiestática y seguridad en banco de trabajo.",
        2,
      ),
      theoryLesson(
        "metodologia-troubleshooting",
        "Metodología de troubleshooting",
        "Identificar → probar → documentar → escalar; uso de logs, Event Viewer y checklists.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Desmontaje, identificación e inventario de PC",
      description:
        "En banco de laboratorio, identificar cada componente de una PC de referencia, crear hoja de inventario con specs, reensamblar y verificar POST. Entregar fotos etiquetadas y reporte de una falla simulada resuelta.",
      hours: 3,
    },
  },
  {
    order: 2,
    title: "Sistemas operativos y administración de escritorio",
    description:
      "Instalación, configuración y mantenimiento de Windows y Linux; gestión de usuarios, permisos y actualizaciones.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "windows-instalacion-particionado",
        "Windows 10/11: instalación y particionado",
        "UEFI vs Legacy, GPT, imágenes de instalación, drivers y activación en entorno educativo.",
        3,
      ),
      theoryLesson(
        "administracion-local-usuarios",
        "Administración local: usuarios, grupos, políticas",
        "Local Users and Groups, UAC, Windows Update, Task Manager y herramientas de mantenimiento.",
        3,
      ),
      theoryLesson(
        "intro-linux-soporte",
        "Introducción a Linux para soporte",
        "Distribuciones comunes (Ubuntu), terminal, permisos chmod/chown, paquetes apt y systemd básico.",
        3,
      ),
      theoryLesson(
        "virtualizacion-virtualbox-hyperv",
        "Virtualización con VirtualBox / Hyper-V",
        "Snapshots, redes virtuales, clonación de VMs para entornos de práctica seguros.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Dual-boot simulado con VMs Windows + Linux",
      description:
        "Crear dos VMs, configurar usuario estándar y admin, aplicar hardening básico (firewall, updates), documentar procedimiento de backup de perfil de usuario.",
      hours: 3,
    },
  },
  {
    order: 3,
    title: "Redes locales y conectividad",
    description:
      "Modelo OSI/TCP-IP, cableado, WiFi, troubleshooting de red — puente hacia CompTIA Network+.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "modelos-osi-tcpip",
        "Modelos OSI y TCP/IP en la práctica",
        "Encapsulación, capas, protocolos comunes (HTTP, HTTPS, FTP, SSH) y flujo de datos.",
        3,
      ),
      theoryLesson(
        "direccionamiento-ip-subnetting",
        "Direccionamiento IP, subnetting básico y DHCP",
        "IPv4, máscaras /24 /25, gateway, reservas DHCP y conflictos de IP.",
        3,
      ),
      theoryLesson(
        "dns-nat-conectividad",
        "DNS, NAT y conectividad a Internet",
        "Resolución de nombres, registros A/AAAA, NAT en router doméstico/empresarial.",
        2,
      ),
      theoryLesson(
        "wifi-switches-topologias",
        "WiFi, switches y topologías LAN",
        "Estándares 802.11, SSID, WPA2/WPA3, VLAN concept intro, cableado Cat6.",
        3,
      ),
    ],
    labOrProject: {
      title: "LAB: Diagnóstico de red con ping, tracert, ipconfig y Wireshark",
      description:
        "Configurar LAN de laboratorio, simular fallas (cable desconectado, DNS incorrecto, IP duplicada), capturar tráfico HTTP y documentar resolución paso a paso.",
      hours: 3,
    },
  },
  {
    order: 4,
    title: "Seguridad IT básica y continuidad",
    description:
      "Controles de acceso, malware, backups, políticas — fundamentos alineados a A+ y Security+ lite.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "triada-cia-controles-acceso",
        "Triada CIA y controles de acceso",
        "Confidencialidad, integridad, disponibilidad; MFA, contraseñas robustas y gestores de credenciales.",
        2,
      ),
      theoryLesson(
        "malware-phishing-hardening",
        "Malware, phishing y hardening de endpoints",
        "Tipos de malware, señales de phishing, antivirus, firewall de host y parches.",
        3,
      ),
      theoryLesson(
        "backups-recuperacion-documentacion",
        "Backups, recuperación y documentación",
        "Regla 3-2-1, imágenes de sistema, RTO/RPO intro, bitácoras de cambios.",
        2,
      ),
      theoryLesson(
        "respuesta-incidentes-nivel-1",
        "Respuesta a incidentes nivel 1",
        "Contener, reportar, escalar; plantillas de ticket de seguridad y comunicación a usuarios.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Simulación de incidente de phishing y respuesta",
      description:
        "Analizar email de phishing de muestra, aislar endpoint en VM, ejecutar checklist de respuesta, redactar reporte para equipo SOC simulado.",
      hours: 3,
    },
  },
  {
    order: 5,
    title: "Introducción al cloud computing",
    description:
      "Conceptos cloud, modelos IaaS/PaaS/SaaS, responsabilidad compartida — AWS Cloud Practitioner.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "que-es-cloud-onprem-hibrido",
        "¿Qué es el cloud? On-prem vs cloud vs híbrido",
        "Elasticidad, pay-as-you-go, regiones y zonas de disponibilidad; casos de uso en PYMEs y enterprise.",
        3,
      ),
      theoryLesson(
        "modelos-servicio-iaas-paas-saas",
        "Modelos de servicio: IaaS, PaaS, SaaS",
        "Comparar EC2 vs Elastic Beanstalk vs SaaS (Google Workspace); cuándo elegir cada uno.",
        2,
      ),
      theoryLesson(
        "responsabilidad-compartida-aws",
        "Responsabilidad compartida en AWS",
        "Qué protege AWS vs el cliente; cumplimiento, Well-Architected Framework overview.",
        2,
      ),
      theoryLesson(
        "precios-billing-free-tier",
        "Precios, billing y AWS Free Tier",
        "Consolas de costos, budgets, tags, alertas de facturación en entorno educativo.",
        2,
      ),
      theoryLesson(
        "intro-consola-aws-cli",
        "Introducción a la consola AWS y CLI",
        "Navegación IAM-first, regiones, AWS CLI básico para automatización.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Primer despliegue en AWS — cuenta sandbox institucional",
      description:
        "Crear usuario IAM con MFA, lanzar instancia EC2 t2.micro, conectar por SSH/RDP, detener y documentar costos estimados.",
      hours: 3,
    },
  },
  {
    order: 6,
    title: "Servicios AWS core: compute, storage e identidad",
    description:
      "EC2, S3, IAM, EBS — labs prácticos para soporte cloud junior.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "ec2-instancias-amis-security-groups",
        "Amazon EC2: instancias, AMIs y security groups",
        "Tipos de instancia, key pairs, reglas inbound/outbound, Elastic IP intro.",
        3,
      ),
      theoryLesson(
        "s3-buckets-objetos-politicas",
        "Amazon S3: buckets, objetos y políticas",
        "Storage classes, versioning, lifecycle, bloqueo de acceso público.",
        3,
      ),
      theoryLesson(
        "iam-usuarios-roles-politicas",
        "IAM: usuarios, roles, políticas y least privilege",
        "JSON policies, roles para servicios, cross-account intro.",
        3,
      ),
      theoryLesson(
        "ebs-snapshots-amis",
        "EBS, snapshots y AMIs personalizadas",
        "Volúmenes persistentes, backup con snapshots, golden images.",
        2,
      ),
    ],
    labOrProject: {
      title: "PROJECT: Sitio estático en S3 + CloudFront (opcional)",
      description:
        "Subir sitio HTML a bucket S3, configurar hosting estático, política de bucket segura, probar acceso HTTPS. Documentar arquitectura con diagrama.",
      hours: 3,
    },
  },
  {
    order: 7,
    title: "Redes en la nube y monitoreo",
    description:
      "VPC, subnets, load balancers intro; CloudWatch y alertas operativas.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "vpc-subnets-publicas-privadas",
        "Amazon VPC: subnets públicas y privadas",
        "CIDR, Internet Gateway, route tables, NAT Gateway concept.",
        3,
      ),
      theoryLesson(
        "security-groups-vs-nacls",
        "Security groups vs NACLs",
        "Stateful vs stateless, reglas comunes para web tier y database tier.",
        2,
      ),
      theoryLesson(
        "cloudwatch-metricas-logs-alarmas",
        "CloudWatch: métricas, logs y alarmas",
        "Dashboards operativos, SNS para alertas, interpretación de CPU/memoria.",
        3,
      ),
      theoryLesson(
        "alta-disponibilidad-escalabilidad",
        "Alta disponibilidad y escalabilidad intro",
        "Multi-AZ, Auto Scaling groups concept, ELB overview.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: VPC de dos subnets con instancia web",
      description:
        "Crear VPC, subnet pública, lanzar EC2 con security group HTTP/SSH, verificar conectividad y registrar configuración en runbook.",
      hours: 2,
    },
  },
  {
    order: 8,
    title: "Service desk, soft skills y empleabilidad IT",
    description:
      "Comunicación con usuarios, ticketing, SLA, entrevistas y portafolio técnico.",
    contactHours: 12,
    lessons: [
      {
        slug: "cultura-service-desk-itil-lite",
        title: "Cultura de service desk y ITIL lite",
        description:
          "Incident vs request, prioridades P1–P4, knowledge base, escalamiento.",
        type: "soft-skills",
        hours: 2,
      },
      {
        slug: "comunicacion-usuarios-no-tecnicos",
        title: "Comunicación con usuarios no técnicos",
        description:
          "Active listening, traducir jerga, manejo de frustración, email profesional.",
        type: "soft-skills",
        hours: 2,
      },
      {
        slug: "documentacion-tecnica-runbooks",
        title: "Documentación técnica y runbooks",
        description:
          "Plantillas de ticket, SOPs, diagramas de red con draw.io/Lucidchart.",
        type: "soft-skills",
        hours: 2,
      },
      {
        slug: "linkedin-cv-tecnico-entrevistas-help-desk",
        title: "LinkedIn, CV técnico y entrevistas help desk",
        description:
          "Keywords A+/Network+/AWS, STAR method, simulación de entrevista.",
        type: "soft-skills",
        hours: 3,
      },
      {
        slug: "etica-privacidad-cumplimiento",
        title: "Ética, privacidad y cumplimiento (GDPR/LFPDPPP intro)",
        description:
          "Manejo de datos personales, políticas BYOD, confidencialidad laboral.",
        type: "soft-skills",
        hours: 2,
      },
    ],
    labOrProject: {
      title: "PROJECT: Turno simulado en service desk (role-play)",
      description:
        "Resolver 5 tickets ficticios en herramienta de ticketing (Freshdesk/Jira Service Management demo), incluyendo uno de escalamiento a cloud y uno de seguridad.",
      hours: 1,
    },
  },
  {
    order: 9,
    title: "Integración, simulacros de certificación y cierre",
    description:
      "Repaso transversal, simulacros A+/Network+/CLF y preparación del capstone.",
    contactHours: 14,
    lessons: [
      {
        slug: "repaso-aplus-core-dominios-criticos",
        title: "Repaso A+ Core 1 & 2 — dominios críticos",
        description:
          "Mapa de dominios CompTIA, preguntas tipo PBQ, estrategias de examen.",
        type: "exam-prep",
        hours: 3,
      },
      {
        slug: "repaso-network-plus-subnetting-troubleshooting",
        title: "Repaso Network+ — subnetting y troubleshooting",
        description:
          "Ejercicios de subnetting cronometrados, escenarios de conectividad.",
        type: "exam-prep",
        hours: 3,
      },
      {
        slug: "repaso-aws-clf-servicios-billing",
        title: "Repaso AWS Cloud Practitioner — servicios y billing",
        description:
          "Flashcards de servicios, preguntas de responsabilidad compartida y pricing.",
        type: "exam-prep",
        hours: 3,
      },
      {
        slug: "simulacro-integrado-mini-lab-final",
        title: "Simulacro integrado (mini lab final)",
        description:
          "Escenario: usuario no puede acceder a app en cloud — diagnosticar red local, VM, y security group AWS.",
        type: "project",
        hours: 3,
      },
    ],
    labOrProject: {
      title: "Simulacro de examen y plan de certificación personal",
      description:
        "Completar simulacro cronometrado (Proveedor: MeasureUp/ExamCompass o AWS Skill Builder), analizar brechas, crear calendario de estudio post-curso.",
      hours: 2,
    },
  },
];

export const itSupportCloudCourse: NovaCollegeCourse = {
  title: "Técnico en Soporte IT y Cloud",
  slug: "it-support-cloud-technician",
  tagline:
    "De la banca de servicio al cloud — hardware, redes y AWS para el primer empleo tech.",
  description:
    "Programa técnico de 120 horas orientado a empleabilidad que prepara a estudiantes para roles de help desk, soporte de TI y operaciones cloud entry-level. Combina fundamentos de hardware y sistemas operativos (CompTIA A+), conectividad de red (Network+), y servicios cloud con enfoque AWS Cloud Practitioner. Diseñado para colegios técnicos y community colleges que licencian currículo NOVA + plataforma NOVA STEM HUB.",
  targetAudience:
    "Estudiantes de 16–25+ en programas técnicos o de transición laboral; graduados de secundaria técnica; adultos en reconversión hacia IT. No se requiere experiencia previa en programación.",
  durationHours: 120,
  prerequisites: [
    "Lectura comprensiva en español o inglés técnico básico",
    "Manejo de computadora (navegador, archivos, correo)",
    "Álgebra básica recomendada (no obligatoria)",
  ],
  learningOutcomes: [
    "Diagnosticar y resolver fallas comunes de hardware, software y conectividad siguiendo metodología estructurada de troubleshooting.",
    "Instalar, configurar y mantener sistemas operativos Windows y Linux en entornos de escritorio.",
    "Explicar modelos TCP/IP, direccionamiento IP, DNS, DHCP y configurar redes locales básicas.",
    "Aplicar principios de ciberseguridad básica: autenticación, permisos, backups y respuesta a incidentes de nivel 1.",
    "Describir el modelo de responsabilidad compartida y los servicios core de AWS (EC2, S3, IAM, VPC).",
    "Desplegar una aplicación web estática en AWS y documentar arquitectura con diagramas simples.",
    "Atender tickets de service desk con comunicación profesional, registro en ticketing system y escalamiento apropiado.",
    "Prepararse para exámenes CompTIA A+, Network+ y AWS Certified Cloud Practitioner con simulacros y labs guiados.",
  ],
  certificationAlignment: {
    primary: [
      "CompTIA A+ (Core 1 & Core 2)",
      "CompTIA Network+",
      "AWS Certified Cloud Practitioner (CLF-C02)",
    ],
    secondary: ["ITIL Foundation (conceptos introductorios)"],
    examPrepHours: 12,
    notes:
      "El currículo mapea objetivos oficiales de A+ y Network+ por módulo. AWS CLF se cubre en módulos 5–7 con labs en AWS Academy o cuenta sandbox institucional.",
  },
  formatBreakdown: {
    theoryHours: 48,
    labsProjectsHours: 48,
    softSkillsHours: 12,
    examPrepHours: 12,
  },
  modules: attachContentToModules(RAW_MODULES, IT_SUPPORT_CLOUD_LESSONS),
  capstone: {
    title: "Proyecto integrador: Infraestructura híbrida para PYME",
    description:
      "Diseñar e implementar solución IT completa para una PYME ficticia (ej. clínica dental o tienda retail): inventario de hardware, 2 VMs locales (Windows + Linux), LAN documentada, backup plan, y componente cloud AWS (EC2 + S3 para backups offsite). Presentar runbook operativo y demo de 10 minutos ante panel simulado de empleadores.",
    deliverables: [
      "Diagrama de arquitectura (on-prem + cloud)",
      "Runbook de troubleshooting (mín. 8 escenarios)",
      "Evidencia de labs AWS (capturas IAM-safe)",
      "Presentación oral + Q&A",
      "Portafolio PDF para verify.novahub.education",
    ],
    hours: 8,
  },
  assessmentRubric: {
    components: [
      {
        name: "Labs y proyectos modulares",
        weight: 40,
        description:
          "Rúbrica por lab: completitud, documentación, resolución de problemas, seguridad.",
      },
      {
        name: "Capstone integrador",
        weight: 25,
        description:
          "Arquitectura coherente, demo funcional, runbook usable por tercero.",
      },
      {
        name: "Simulacros de certificación",
        weight: 15,
        description:
          "Puntaje ≥70% en al menos dos simulacros (A+ o Network+ o CLF).",
      },
      {
        name: "Participación y soft skills",
        weight: 10,
        description:
          "Role-play service desk, comunicación escrita, trabajo en equipo.",
      },
      {
        name: "Evaluaciones teóricas modulares",
        weight: 10,
        description: "Quizzes por módulo; promedio mínimo 75%.",
      },
    ],
    passingCriteria:
      "Calificación final ≥80/100, 100% de labs entregados, capstone aprobado, asistencia ≥85%. Certificado verificable emitido al completar (independiente de aprobar exámenes CompTIA/AWS externos).",
  },
  facilitatorNotes: [
    "No se requiere ser experto AWS: la guía del facilitador incluye scripts paso a paso con capturas; usar AWS Academy Learner Lab o sandbox con presupuesto cap.",
    "Provisionar banco de PCs desmontables + kit de red (switch, cables, router) + acceso a VMs.",
    "Separar módulos 1–4 (A+/red) de 5–7 (cloud) permite co-docencia con instructor de redes local si es necesario.",
    "Simulacros CompTIA: licencias institucionales recomendadas; alternativa gratuita ExamCompass para práctica.",
    "Enfatizar documentación fotográfica en labs — es lo que evalúan empleadores entry-level.",
    "Sesión mensual opcional con mentor de industria para revisión de capstone (modelo NOVA Innovation Mentor).",
  ],
  employabilitySkills: [
    "Troubleshooting estructurado",
    "Comunicación técnica con usuarios finales",
    "Documentación y runbooks",
    "Gestión de tickets y SLA",
    "Trabajo bajo presión (simulación P1)",
    "Pensamiento de seguridad by-default",
    "Aprendizaje autónomo (certificaciones)",
    "Presentación oral de soluciones técnicas",
  ],
  verifyCertificatePrefix: "NOVA-COL-IT",
};
