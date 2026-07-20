import type { NovaCollegeCourse, NovaCollegeModule } from "./types";
import { attachContentToModules, theoryLesson } from "./utils";
import { IOT_SMART_SYSTEMS_LESSONS } from "./lessons/iot-smart-systems-technician-lessons";

const RAW_MODULES: NovaCollegeModule[] = [
  {
    order: 1,
    title: "Introducción al IoT y ecosistema",
    description:
      "Mercado IoT regional, arquitecturas edge-fog-cloud, protocolos de aplicación y estándares de conectividad LPWAN/mesh.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "mercado-iot-global",
        "Mercado IoT en: sectores, roles y demanda",
        "Agrotech, smart buildings, utilities, manufactura ligera — IoT technician, field engineer, NOC IoT y salarios entry-level.",
        2,
      ),
      theoryLesson(
        "arquitecturas-edge-fog-cloud",
        "Arquitecturas edge, fog y cloud en IoT",
        "Device → gateway → cloud; latencia, ancho de banda, resiliencia offline y cuándo procesar en el borde.",
        2,
      ),
      theoryLesson(
        "protocolos-mqtt-coap-modbus",
        "Protocolos de aplicación: MQTT, CoAP y Modbus",
        "Pub/sub vs request/response; MQTT para telemetría, CoAP para constrained devices, Modbus en planta.",
        2,
      ),
      theoryLesson(
        "estandares-lorawan-zigbee-ble",
        "Estándares LoRaWAN, Zigbee y BLE",
        "LPWAN vs mesh vs corto alcance; gateways, join procedures, casos de uso por vertical.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Mapa del ecosistema IoT y primer nodo simulado",
      description:
        "Investigar 5 despliegues IoT reales en tu región (agricultura, edificios, utilities). Diagramar arquitectura edge-fog-cloud. Opcional: primer publish MQTT desde Wokwi ESP32 o simulador.",
      hours: 4,
    },
  },
  {
    order: 2,
    title: "Firmware y hardware ESP32",
    description:
      "WiFi/BLE, FreeRTOS, gestión de energía deep sleep y buses I2C/SPI para arrays multi-sensor.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "esp32-wifi-bluetooth",
        "ESP32: WiFi, Bluetooth y arquitectura dual-core",
        "Modos STA/AP, provisioning, BLE GATT intro, pinout y consideraciones de alimentación.",
        2,
      ),
      theoryLesson(
        "freertos-multitasking",
        "FreeRTOS: tareas, colas y sincronización",
        "Tasks, delays, mutex/semaphore, prioridades — firmware responsive sin bloquear el loop principal.",
        2,
      ),
      theoryLesson(
        "power-management-deep-sleep",
        "Power management y deep sleep",
        "Modos light/deep sleep, wake sources, duty cycle, batería vs solar — diseño para años de autonomía.",
        2,
      ),
      theoryLesson(
        "multi-sensor-i2c-spi",
        "Multi-sensor con buses I2C y SPI",
        "Scanning I2C, direcciones, SPI full-duplex, multiplexado y calibración básica de sensores.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Nodo ESP32 multi-sensor con deep sleep",
      description:
        "Leer temp/humedad (I2C) + presión/luz (SPI o I2C), publicar por serial o MQTT local, entrar en deep sleep 60 s. Documentar consumo estimado vs medido.",
      hours: 6,
    },
  },
  {
    order: 3,
    title: "Mensajería MQTT y brokers",
    description:
      "Modelo pub/sub, diseño de topics, QoS y despliegue de brokers Mosquitto, HiveMQ y AWS IoT.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "pub-sub-mqtt",
        "Modelo publish/subscribe en MQTT",
        "Broker, client, retained messages, last will testament (LWT) y desacoplamiento productor-consumidor.",
        2,
      ),
      theoryLesson(
        "anatomia-mqtt-topics",
        "Anatomía de topics MQTT y naming conventions",
        "Jerarquía site/zone/device/metric, wildcards +/#, versionado y evitar topic explosion.",
        2,
      ),
      theoryLesson(
        "mqtt-qos-levels",
        "Niveles QoS 0, 1 y 2 en MQTT",
        "At-most-once vs at-least-once vs exactly-once; trade-offs latencia, storage y redes inestables.",
        2,
      ),
      theoryLesson(
        "brokers-mosquitto-hivemq-aws-iot",
        "Brokers: Mosquitto, HiveMQ y AWS IoT Core",
        "Self-hosted vs managed; ACLs, clustering intro, bridge entre brokers y límites de servicio cloud.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Broker Mosquitto local + pub/sub ESP32",
      description:
        "Levantar Mosquitto con ACL básica, suscribir con MQTT Explorer, publicar desde ESP32 o Python. Probar QoS 0 vs 1 con red degradada simulada.",
      hours: 6,
    },
  },
  {
    order: 4,
    title: "Edge computing y gateways",
    description:
      "Procesamiento en borde, umbrales y actuadores, buffer store-and-forward y gateways Node-RED.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "edge-computing-iot",
        "Edge computing en despliegues IoT",
        "Filtrado, agregación, ML ligero en gateway; reducir costo cloud y latencia crítica.",
        2,
      ),
      theoryLesson(
        "umbrales-actuadores",
        "Umbrales, reglas locales y actuadores",
        "Histeresis, debounce, control ON/OFF y PWM; cuándo actuar local vs escalar a cloud.",
        2,
      ),
      theoryLesson(
        "buffer-store-and-forward",
        "Buffer y store-and-forward offline",
        "Colas persistentes, backpressure, sync al reconectar — resiliencia en enlaces intermitentes.",
        2,
      ),
      theoryLesson(
        "node-red-gateway",
        "Gateway Node-RED para integración IoT",
        "Flows, nodos MQTT/HTTP/Modbus, debug y deploy en Raspberry Pi o contenedor edge.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Gateway Node-RED con store-and-forward",
      description:
        "Flow que ingesta MQTT, aplica umbral a sensor, acciona actuador simulado y bufferiza si broker cae. Demo de reconexión automática.",
      hours: 6,
    },
  },
  {
    order: 5,
    title: "Visualización, dashboards y alertas",
    description:
      "Visualización IoT en tiempo real con Grafana/InfluxDB, ThingSpeak y alertas por email/SMS.",
    contactHours: 14,
    lessons: [
      theoryLesson(
        "visualizacion-iot-tiempo-real",
        "Visualización IoT en tiempo real",
        "Streaming vs polling, refresh rates, UX para operadores y paneles de misión.",
        2,
      ),
      theoryLesson(
        "grafana-influxdb",
        "Grafana e InfluxDB para series temporales",
        "Buckets, measurements, tags, queries Flux/SQL, dashboards y variables de template.",
        2,
      ),
      theoryLesson(
        "thingspeak-cloud",
        "ThingSpeak y plataformas IoT rápidas",
        "Channels, fields, API keys, MATLAB analysis hooks — prototipado acelerado vs producción.",
        2,
      ),
      theoryLesson(
        "alertas-email-sms",
        "Alertas por email, SMS y webhooks",
        "Umbrales, escalamiento, fatiga de alertas, integración PagerDuty/Slack intro.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Dashboard Grafana + alerta configurada",
      description:
        "Ingestar telemetría (InfluxDB o ThingSpeak), panel con 3 métricas, alerta email/webhook al cruzar umbral. Capturas para portafolio.",
      hours: 6,
    },
  },
  {
    order: 6,
    title: "Seguridad IoT",
    description:
      "Superficie de ataque, TLS en MQTT, segmentación VLAN y OWASP IoT Top 10.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "superficie-ataque-iot",
        "Superficie de ataque en dispositivos IoT",
        "Firmware, interfaces de debug, credenciales por defecto, supply chain y physical access.",
        2,
      ),
      theoryLesson(
        "tls-mqtt-certificates",
        "TLS, certificados X.509 y MQTT seguro",
        "CA chains, client certs, mTLS, rotation y errores comunes de handshake.",
        2,
      ),
      theoryLesson(
        "segmentacion-vlan-iot",
        "Segmentación VLAN y zero-trust IoT",
        "IoT VLAN aislada, firewall rules, NAC intro y guest vs production networks.",
        2,
      ),
      theoryLesson(
        "owasp-iot-top-10",
        "OWASP IoT Top 10 y mitigaciones",
        "Weak passwords, insecure updates, lack of encryption — checklist operativo por dispositivo.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: MQTT over TLS + hardening checklist",
      description:
        "Configurar Mosquitto con TLS, client cert, y completar checklist OWASP IoT Top 10 para un nodo ESP32 documentado.",
      hours: 4,
    },
  },
  {
    order: 7,
    title: "Cloud AWS IoT Core",
    description:
      "Thing policies, Device Shadow, rules engine con Lambda y dashboards cloud.",
    contactHours: 12,
    lessons: [
      theoryLesson(
        "aws-iot-core-thing-policy",
        "AWS IoT Core: things, policies y conectividad",
        "Thing registry, policy JSON, connect/publish/subscribe permissions, JITP/JITR intro.",
        2,
      ),
      theoryLesson(
        "device-shadow-aws-iot",
        "Device Shadow: estado deseado vs reportado",
        "Classic vs named shadows, delta topics, sync offline y conflict resolution básico.",
        2,
      ),
      theoryLesson(
        "rules-engine-lambda",
        "Rules engine e integración Lambda",
        "SQL-like rules, republish, DynamoDB/S3 actions, Lambda para lógica serverless.",
        2,
      ),
      theoryLesson(
        "dashboards-cloud-iot",
        "Dashboards cloud y operaciones IoT",
        "AWS IoT SiteWise intro, CloudWatch metrics, cost monitoring y fleet indexing awareness.",
        2,
      ),
    ],
    labOrProject: {
      title: "LAB: Device → AWS IoT Core → Shadow → Lambda",
      description:
        "Registrar thing, policy mínima privilegio, publicar telemetría, actualizar shadow y rule que dispara Lambda (log o SNS). Cuenta sandbox institucional.",
      hours: 4,
    },
  },
  {
    order: 8,
    title: "Soft skills y empleabilidad IoT",
    description:
      "Comunicación en campo, documentación as-built, troubleshooting metódico y preparación para entrevistas IoT.",
    contactHours: 12,
    lessons: [
      {
        slug: "comunicacion-cliente-iot-field-service",
        title: "Comunicación con cliente en despliegues IoT",
        description:
          "Explicar downtime, ventanas de mantenimiento, expectativas SLA y escalamiento a NOC/cloud team.",
        type: "soft-skills",
        hours: 2,
      },
      {
        slug: "documentacion-as-built-iot",
        title: "Documentación as-built y runbooks IoT",
        description:
          "Diagramas de arquitectura, inventario de devices, credenciales en vault, SOPs de onboarding.",
        type: "soft-skills",
        hours: 2,
      },
      {
        slug: "troubleshooting-metodologia-iot",
        title: "Metodología de troubleshooting IoT end-to-end",
        description:
          "Capas device → radio → gateway → broker → cloud → dashboard; logs, packet capture intro.",
        type: "soft-skills",
        hours: 3,
      },
      {
        slug: "entrevistas-iot-technician-linkedin",
        title: "LinkedIn, portafolio y entrevistas IoT technician",
        description:
          "STAR method con labs reales, keywords MQTT/ESP32/AWS IoT, simulación de case study.",
        type: "soft-skills",
        hours: 3,
      },
    ],
    labOrProject: {
      title: "LAB: Role-play — visita de campo y close-out",
      description:
        "Simular instalación de sensor en cliente: briefing, instalación, demo dashboard, entrega de as-built y handoff a soporte.",
      hours: 2,
    },
  },
  {
    order: 9,
    title: "Integración industrial, certificación y cierre",
    description:
      "Modbus RTU/TCP, OPC-UA/SCADA, prep Cisco/AWS IoT y proyecto integrador final.",
    contactHours: 16,
    lessons: [
      theoryLesson(
        "modbus-rtu-tcp",
        "Modbus RTU y Modbus TCP",
        "Registers holding/input, coils, function codes, timing RTU, gateway serial-Ethernet.",
        2,
      ),
      theoryLesson(
        "opc-ua-scada-basics",
        "OPC-UA y fundamentos SCADA",
        "Cliente/servidor OPC-UA, namespaces, integración con PLCs y HMI — awareness entry-level.",
        2,
      ),
      {
        slug: "prep-cisco-aws-iot-certificacion",
        title: "Prep Cisco IoT y AWS IoT Core — simulacro integrado",
        description:
          "Mapa de dominios Cisco IoT / AWS IoT, preguntas tipo escenario, plan de estudio post-curso.",
        type: "exam-prep",
        hours: 8,
      },
      {
        slug: "proyecto-integrador-iot-planificacion",
        title: "Proyecto integrador: planificación y kickoff",
        description:
          "Definir alcance capstone, BOM, arquitectura, cronograma de sprints y criterios de aceptación.",
        type: "project",
        hours: 2,
      },
    ],
    labOrProject: {
      title: "LAB: Modbus RTU simulado + repaso integrador",
      description:
        "Leer holding registers desde simulador Modbus (Python/Node-RED), mapear a MQTT. Sesión de repaso transversal device-to-cloud.",
      hours: 2,
    },
  },
];

export const iotSmartSystemsTechnicianCourse: NovaCollegeCourse = {
  title: "Técnico en IoT y Sistemas Inteligentes",
  slug: "iot-smart-systems-technician",
  tagline:
    "Sensores, MQTT y edge — del prototipo ESP32 al despliegue industrial entry-level.",
  description:
    "Programa técnico de 120 horas que eleva las competencias del pathway NOVA IoT a nivel empleabilidad técnica: protocolos industriales, edge computing, dashboards profesionales, seguridad IoT y mantenimiento de sistemas conectados. Ideal para técnicos de facilities, agrotech, smart buildings y manufactura ligera.",
  targetAudience:
    "Graduados del pathway NOVA IoT o estudiantes técnicos 16–25+; electricistas, técnicos de mantenimiento y programadores junior que buscan roles IoT technician / field engineer.",
  durationHours: 120,
  prerequisites: [
    "Pathway NOVA IoT o experiencia básica con Arduino/ESP32 (GPIO, serial)",
    "Redes IP intro (IP, DNS, WiFi) — track IT Support o Network+ recomendado",
    "Álgebra básica y lectura de datasheets de sensores",
    "Cuenta email; acceso a AWS sandbox institucional para módulo 7 (opcional Wokwi-only track)",
  ],
  learningOutcomes: [
    "Describir el mercado IoT, arquitecturas edge-fog-cloud y seleccionar protocolos/conectividad según vertical y restricciones.",
    "Desarrollar firmware ESP32 con WiFi/BLE, FreeRTOS, deep sleep y buses I2C/SPI para nodos multi-sensor resilientes.",
    "Implementar mensajería MQTT con topics jerárquicos, QoS apropiado y brokers Mosquitto, HiveMQ o AWS IoT Core.",
    "Diseñar gateways edge con umbrales, actuadores, store-and-forward y flows Node-RED para integración heterogénea.",
    "Configurar visualización en tiempo real con Grafana/InfluxDB o ThingSpeak y alertas email/SMS/webhook.",
    "Aplicar controles de seguridad IoT: TLS/mTLS, segmentación VLAN, OWASP IoT Top 10 y least-privilege en AWS IoT policies.",
    "Operar Device Shadow, rules engine Lambda y dashboards cloud para flotas pequeñas en producción.",
    "Integrar dispositivos industriales vía Modbus RTU/TCP y OPC-UA con awareness SCADA entry-level.",
  ],
  certificationAlignment: {
    primary: [
      "Cisco Certified Support Technician (IoT) — alineación conceptual",
      "AWS IoT Core / AWS Certified Cloud Practitioner IoT domains",
    ],
    secondary: [
      "CompTIA Network+ (segmentación y troubleshooting de conectividad)",
      "LoRaWAN Academy / The Things Network (conceptual LPWAN)",
    ],
    examPrepHours: 12,
    notes:
      "Kit institucional NOVA Explorer (ESP32) + breadboard/sensores I2C. Broker Mosquitto en VM local o Raspberry Pi. AWS IoT via sandbox Academy. Alternativa 100% simulación: Wokwi + HiveMQ Cloud free tier.",
  },
  formatBreakdown: {
    theoryHours: 48,
    labsProjectsHours: 48,
    softSkillsHours: 12,
    examPrepHours: 12,
  },
  modules: attachContentToModules(RAW_MODULES, IOT_SMART_SYSTEMS_LESSONS),
  capstone: {
    title:
      "Proyecto integrador: Sistema IoT de punta a punta con seguridad y dashboard",
    description:
      "Diseñar e implementar despliegue IoT completo para caso real (ej. invernadero, sala de servidores, estacionamiento inteligente): ≥3 nodos ESP32 multi-sensor, gateway edge con Node-RED, broker MQTT (local o AWS IoT Core), almacenamiento time-series, dashboard Grafana o cloud, alertas configuradas, segmentación de red documentada y runbook de troubleshooting. Demo oral ante panel simulado de empleador/agrotech.",
    deliverables: [
      "Diagrama de arquitectura edge-fog-cloud con VLANs",
      "Firmware ESP32 versionado (Git) + BOM de hardware",
      "Flows Node-RED exportados y policy AWS IoT (IAM-safe redacted)",
      "Dashboard operativo con ≥3 métricas y 1 alerta funcional",
      "Runbook L1 con 10 escenarios de falla device-to-cloud",
      "Checklist OWASP IoT Top 10 completado por nodo",
      "Presentación oral 12 min + demo en vivo o video",
    ],
    hours: 8,
  },
  assessmentRubric: {
    components: [
      {
        name: "Labs modulares (MQTT, edge, Grafana, AWS IoT)",
        weight: 40,
        description:
          "Funcionalidad end-to-end, documentación, capturas y reproducibilidad por tercero.",
      },
      {
        name: "Capstone integrador",
        weight: 25,
        description:
          "Sistema desplegado, seguridad mínima viable, dashboard usable por operador no técnico.",
      },
      {
        name: "Simulacro Cisco/AWS IoT",
        weight: 15,
        description: "≥70% en simulacro integrado cronometrado (módulo 9).",
      },
      {
        name: "Soft skills y role-play de campo",
        weight: 10,
        description:
          "Close-out profesional, as-built legible, comunicación con stakeholder simulado.",
      },
      {
        name: "Quizzes teóricos modulares",
        weight: 10,
        description:
          "Promedio ≥75% en protocolos, seguridad IoT y arquitecturas edge-cloud.",
      },
    ],
    passingCriteria:
      "Calificación final ≥80/100, capstone aprobado, 100% labs entregados, cero credenciales hardcodeadas en repos públicos. Certificado NOVA-COL-IOT verificable al completar.",
  },
  facilitatorNotes: [
    "Reutilizar NOVA Explorer Kit ESP32 del pathway K-12 — mismos pinouts y Wokwi fallbacks.",
    "Mosquitto en Docker es suficiente; no requiere cluster HiveMQ para completar el track.",
    "Módulo 7 AWS: usar AWS Academy Learner Lab o cuenta sandbox con billing alarm — evitar costos de fleet provisioning masivo.",
    "Co-docencia con instructor de electronics para módulo 2 (I2C/SPI) o cybersecurity para módulo 6.",
    "Partnership con agrotech local o smart building vendor para visita de 2 h aumenta empleabilidad.",
    "Enfatizar topic design y least-privilege policies — errores comunes en producción IoT.",
  ],
  employabilitySkills: [
    "Diseño de arquitecturas edge-fog-cloud",
    "Firmware ESP32 y FreeRTOS",
    "MQTT pub/sub, QoS y broker administration",
    "Node-RED gateway integration",
    "Grafana/InfluxDB dashboards",
    "Seguridad IoT (TLS, VLAN, OWASP)",
    "AWS IoT Core operations",
    "Modbus/OPC-UA industrial awareness",
    "Documentación as-built y runbooks",
    "Troubleshooting capa device-to-cloud",
  ],
  pathwayBridge: {
    relatedPathwaySlug: "iot-smart-systems",
    notes:
      "Continúa directamente el pathway NOVA IoT (NOVA Explorer Kit ESP32). Graduados College pueden mentorizar Explorers en misiones LAB del pathway K-12.",
  },
  verifyCertificatePrefix: "NOVA-COL-IOT",
};
