import type { LessonContent } from "../types";
import { mapFromSeeds, type TheorySeed } from "./lesson-factory";

const VIS = [
  "iot-schematic",
  "troubleshooting-flowchart",
  "network-topology",
  "terminal-lab",
] as const;

function v(i: number) {
  return VIS[i % 4];
}

const SEEDS: TheorySeed[] = [
  {
    slug: "industria-40-roles",
    headings: [
      "Manufactura conectada y manufactura global conectada",
      "Roles en piso de planta",
      "Robótica industrial vs servicios automatizados",
      "KPIs que el supervisor exige",
    ],
    bodies: [
      "Industria 4.0 integra sensores, PLCs, robots, MES y nube para trazabilidad en tiempo real. Plantas globales adoptan automatización para competir internacionalmente: plantas buscan automation technician, robot operator y maintenance tech con PLC intro. El técnico entry-level opera células existentes — no diseña la fábrica entera.",
      "Automation technician cablea sensores 24V y verifica I/O. PLC programmer junior modifica ladder bajo supervisión. Robot operator carga programas en cobot y reporta fault codes. Maintenance tech ejecuta LOTO, cambia neumática y escala a ingeniería si el PLC requiere cambio estructural.",
      "En manufactura predominan brazos articulados y SCARA. En logística y salud crecen AMR y cobots en estaciones compactas. El mismo técnico lee diagrama eléctrico, entiende HMI y sabe cuándo llamar al integrador de robots.",
      "OEE, MTTR, scrap rate y cumplimiento LOTO en auditorías. Documenta intervenciones con hora, síntoma, causa raíz y pieza reemplazada — eso diferencia un técnico confiable de uno que solo reinicia.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Nombra tres roles entry-level, explica manufactura global en una frase y propone un KPI para una línea con robot pick-and-place.",
      },
    ],
    summary:
      "Industria 4.0 conecta OT e IT: el técnico entry-level opera células robotizadas, aplica LOTO y reporta con KPIs que producción entiende.",
    careerInsight:
      "En entrevista: 'Apoyé automation technician en planta de manufactura global — LOTO, sensores 24V, HMI y coordinación con robot operator; reduje MTTR documentando fault codes.' Certificado NOVA-COL-ROBOT en verify.novahub.education.",
    glossary: [
      { term: "Industria 4.0", definition: "Integración cyber-física, datos y automatización en manufactura." },
      { term: "OEE", definition: "Overall Equipment Effectiveness; eficiencia global del equipo." },
      { term: "Nearshoring", definition: "Relocalización de producción cerca del mercado consumidor." },
      { term: "OT", definition: "Operational Technology; sistemas de planta (PLC, HMI, robots)." },
      { term: "MTTR", definition: "Mean Time To Repair; tiempo promedio de reparación." },
      { term: "MES", definition: "Manufacturing Execution System; gestión de órdenes en piso." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(0), title: "Industria 4.0 y roles — referencia", afterSection: 1 },
  },
  {
    slug: "automation-system-components",
    headings: [
      "Flujo señal → lógica → potencia",
      "Sensores, actuadores y controladores",
      "HMI, variadores y redes de campo",
      "Integración con robótica",
    ],
    bodies: [
      "Sensor detecta pieza → PLC procesa ladder → salida activa válvula o variador → actuador mueve. HMI muestra estado; SCADA registra tendencias. Diagnosticar solo 'el robot' sin revisar proximidad desalineada es error típico de junior.",
      "Proximidad, fotoeléctricos, encoders, presostatos. Cilindros, motores, grippers. PLC para lógica determinista; VFD para velocidad; ESP32 para telemetría edge. Cada componente tiene datasheet con rango, cableado y tiempo de respuesta.",
      "HMI local para operador; SCADA corporativo para historian. Modbus RTU en serial, Profinet en Ethernet, MQTT desde ESP32. Identifica en diagrama qué bus usa cada dispositivo antes de cruzar cables.",
      "Interlocks PLC–robot: el PLC confirma zona libre antes de que el cobot entre. Señales hardwired 24V siguen siendo backup cuando falla Ethernet.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Traza el flujo sensor → PLC → válvula → HMI en una estación de llenado e indica dónde encaja un ESP32 para conteo de ciclos.",
      },
    ],
    summary:
      "Todo sistema automatizado combina sensores, lógica, actuadores y supervisión — diagnosticar requiere seguir el flujo de señal completo.",
    careerInsight:
      "STAR: 'Sensor PNP desalineado detenía línea — realineé fixture, verifiqué LED en I/O del PLC y confirmé conteo en HMI; OEE recuperó 8% ese turno.'",
    glossary: [
      { term: "VFD", definition: "Variable Frequency Drive; variador de frecuencia." },
      { term: "Interlock", definition: "Condición de bloqueo mutuo entre dispositivos." },
      { term: "Gateway", definition: "Dispositivo que traduce protocolos entre bus de planta e IP." },
      { term: "Fieldbus", definition: "Red industrial de campo (Modbus, Profinet)." },
      { term: "Historian", definition: "Almacén de series temporales de variables de proceso." },
      { term: "Gripper", definition: "Pinza o efector final del robot." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(1), title: "Componentes de automatización", afterSection: 1 },
  },
  {
    slug: "safety-loto-e-stop",
    headings: [
      "Personas antes que producción",
      "Lockout/Tagout paso a paso",
      "E-stop y categorías de paro",
      "Robots, cobots y zonas de seguridad",
    ],
    bodies: [
      "Ningún ahorro de tiempo justifica bypass de E-stop o LOTO. EN ISO 13849 y referencias OSHA aplican en plantas exportadoras. En muchas plantas internacionales adoptan estándares del cliente USA — cumple aunque la norma local sea menos estricta.",
      "Notificar → apagar con procedimiento → aislar energías → bloquear con candado personal → verificar cero energía (medir, purgar aire) → trabajar → retirar LOTO en orden inverso solo quien lo colocó.",
      "E-stop cableado NC en serie corta enable de contactores y robot. Categoría 0: paro inmediato. Categoría 1: paro controlado luego corte. No puentees relés de seguridad con jumper.",
      "Robot industrial: jaula + barrera de luz. Cobot: velocidad/forza limitada + sensores humano. En teach mode: manual, velocidad reducida, volumen libre de operadores.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Redacta permiso de trabajo para cambiar sensor en cilindro: puntos LOTO, verificación cero energía y responsable.",
      },
    ],
    summary:
      "LOTO y E-stop NC son no negociables. Verifica cero energía antes de intervenir en célula robotizada o neumática.",
    careerInsight:
      "Auditorías preguntan LOTO — responde: 'Candado personal en breaker M-12, purga FRL, medí 0V en borne antes de desmontar sensor.'",
    glossary: [
      { term: "LOTO", definition: "Lockout/Tagout; bloqueo de energía peligrosa." },
      { term: "E-stop", definition: "Paro de emergencia; botón rojo NC." },
      { term: "ISO 13849", definition: "Norma de sistemas de control relacionados con seguridad." },
      { term: "NC", definition: "Normalmente cerrado; conduce en reposo." },
      { term: "Enable", definition: "Señal que autoriza movimiento del robot o contactor." },
      { term: "Teach mode", definition: "Modo manual de programación del robot a velocidad reducida." },
    ],
    references: [
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
      { title: "OSHA LOTO Overview", url: "https://www.osha.gov/control-hazardous-energy", author: "OSHA" },
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
    ],
    visual: { type: v(2), title: "LOTO y E-stop en célula", afterSection: 1 },
  },
  {
    slug: "electrical-pneumatic-schematics",
    headings: [
      "Tipos de diagrama en planta",
      "Símbolos IEC/NFPA y numeración",
      "Lectura para troubleshooting",
      "Robótica en el paquete de planos",
    ],
    bodies: [
      "Esquema unifilar para potencia; diagrama de control para 24V y PLC I/O. Neumático ISO 1219 para válvulas y cilindros. P&ID para instrumentación de proceso. Ladder en software no siempre refleja topología física.",
      "Contactos NO/NC, bobinas, motores, fusibles. Numeración de hilos (-X1, -X2) y referencias cruzadas. En neumática: 5/2, actuador doble efecto. BOM debe coincidir con as-built.",
      "Sigue señal desde sensor en página 3 hasta I0.4 en página 7. Si plano está desactualizado, traza cable real y actualiza as-built — cambio sin documentar es deuda técnica.",
      "Controlador de robot comparte I/O con PLC: permitir entrada, pieza presente, fault activo. Diagrama integrado evita asumir robot como isla.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Desde diagrama 5/2 explica extensión/retracción de cilindro doble efecto y solenoide activo en cada movimiento.",
      },
    ],
    summary:
      "Leer planos IEC/ISO es habilidad #1 — numeración de hilos y BOM as-built evitan horas de diagnóstico erróneo.",
    careerInsight:
      "Muestra que actualizaste as-built tras mover sensor — madurez profesional que pocos juniors demuestran.",
    glossary: [
      { term: "P&ID", definition: "Diagrama de tuberías e instrumentación." },
      { term: "BOM", definition: "Bill of Materials; lista de componentes." },
      { term: "As-built", definition: "Documentación del estado real instalado." },
      { term: "5/2", definition: "Válvula neumática de cinco vías, dos posiciones." },
      { term: "Unifilar", definition: "Diagrama simplificado de conductores." },
      { term: "IEC", definition: "Comisión Electrotécnica Internacional." },
    ],
    references: [
      { title: "ISO 1219 — Fluid power symbols", url: "https://www.iso.org/standard/58176.html", author: "ISO" },
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(3), title: "Diagramas eléctricos y neumáticos", afterSection: 2 },
  },
  {
    slug: "dc-24v-control-circuits",
    headings: [
      "Fuente y common en panel",
      "Sinking vs sourcing",
      "Cableado seguro en rail DIN",
      "ESP32 como complemento edge",
    ],
    bodies: [
      "Fuente 24V en rail DIN alimenta PLC, sensores y relés. Common 0V compartido; caída de voltaje en bornes flojos causa fallas intermitentes en interlock con robot.",
      "PNP sourcing común con Siemens; NPN sinking con algunos PLCs USA. Cableado incorrecto = sensor OK en banco, muerto en máquina.",
      "Ferrules, torque en borneras, separar potencia de control. Fusibles por rama. Nunca energizar sin revisar cortos.",
      "Gateway ESP32 lee I2C y publica MQTT — complementa, no reemplaza, seguridad hardwired 24V del PLC.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Explica sinking vs sourcing con sensor PNP y entrada Siemens. Mide 24V bajo carga en borne de sensor.",
      },
    ],
    summary:
      "Circuitos 24V DC son la sangre del control industrial — PNP/NPN y common mal entendidos generan el 30% de tickets de I/O.",
    careerInsight:
      "Ticket típico: 'Entrada siempre OFF' — invertí NPN por PNP según manual del módulo; línea arrancó en 12 minutos.",
    glossary: [
      { term: "Sinking", definition: "Entrada que requiere corriente entrante." },
      { term: "Sourcing", definition: "Salida que entrega corriente hacia carga." },
      { term: "DIN rail", definition: "Riel estándar de montaje en panel." },
      { term: "Ferrule", definition: "Terminal de cable para bornera." },
      { term: "Common", definition: "Referencia 0V del circuito de control." },
      { term: "I2C", definition: "Bus serial para sensores en ESP32." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" },
      { title: "Wokwi ESP32 Docs", url: "https://docs.wokwi.com/", author: "Wokwi" },
    ],
    visual: { type: v(0), title: "Circuito 24V y ESP32 edge", afterSection: 1 },
  },
  {
    slug: "proximity-sensors",
    headings: [
      "Tipos y selección",
      "PNP vs NPN en planta",
      "Montaje en fixtures robot",
      "Mantenimiento preventivo",
    ],
    bodies: [
      "Inductivos para metal; capacitivos también no metálicos. Sn depende del material. Blindado vs no blindado afecta montaje en herramental.",
      "Verifica LED de oscilación antes de cambiar sensor. Multímetro en modo DC confirma 24V en cableado.",
      "Alineación crítica en pick-and-place: 1 mm de desviación causa miss pick. Revisa tuerca contra vibración del cobot.",
      "Limpia face del sensor; revisa cable flex en eje móvil. Registra distancia Sn medida vs datasheet en bitácora.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Diferencia inductivo vs capacitivo y cuándo usar cada uno en línea de envases plásticos.",
      },
    ],
    summary:
      "Sensores de proximidad alimentan lógica PLC y permisos robot — montaje y tipo PNP/NPN determinan confiabilidad.",
    careerInsight:
      "STAR: 'Miss pick por sensor desplazado 2 mm — realineé bracket, verifiqué conteo CTU y OEE subió 5%.'",
    glossary: [
      { term: "Sn", definition: "Distancia nominal de detección." },
      { term: "PNP", definition: "Salida sourcing; entrega +24V activa." },
      { term: "NPN", definition: "Salida sinking; conecta a 0V activa." },
      { term: "Inductivo", definition: "Detecta metal por campo magnético." },
      { term: "Miss pick", definition: "Fallo del robot al no agarrar pieza." },
      { term: "Fixture", definition: "Utillaje de posicionamiento." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(1), title: "Sensores de proximidad", afterSection: 1 },
  },
  {
    slug: "photoelectric-encoders",
    headings: [
      "Modos fotoeléctricos",
      "Encoders incrementales y absolutos",
      "Cableado diferencial",
      "Sincronización con robot",
    ],
    bodies: [
      "Barrera, reflex con retroreflector, difuso. Polvo en planta alimenticia requiere hysteresis y filtro temporal en PLC.",
      "Incremental: pulsos A/B + Z; requiere homing. Absoluto: posición al encender. PPR define resolución en tracking de conveyor.",
      "Line driver RS422 reduce ruido en cables largos hacia PLC high-speed counter o drive de servo.",
      "Fotoeléctrico confirma pieza en nest antes de señal PERMIT al cobot.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Calcula pulsos por mm con encoder 1024 PPR en rodillo de 50 mm de diámetro.",
      },
    ],
    summary:
      "Fotoeléctricos detectan presencia; encoders miden movimiento — ambos críticos en líneas sincronizadas con robot.",
    careerInsight:
      "Fault de servo por encoder suelto — scope confirmó pulsos intermitentes; apretaste acople y documentaste torque.",
    glossary: [
      { term: "PPR", definition: "Pulses Per Revolution." },
      { term: "Homing", definition: "Secuencia de referencia de posición cero." },
      { term: "Hysteresis", definition: "Banda muerta anti-oscilación." },
      { term: "RS422", definition: "Señal diferencial anti-ruido." },
      { term: "Tracking", definition: "Seguimiento de pieza en movimiento." },
      { term: "Nest", definition: "Posición fija donde reposa la pieza." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "ROS 2 Humble Documentation", url: "https://docs.ros.org/en/humble/", author: "Open Robotics" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(2), title: "Fotoeléctricos y encoders", afterSection: 2 },
  },
  {
    slug: "multimeter-oscilloscope-industrial",
    headings: [
      "Multímetro en panel 24V",
      "Osciloscopio para pulsos",
      "Señales ruidosas y EMI",
      "Evidencia para tickets",
    ],
    bodies: [
      "DC volts en bornes PLC; continuidad en E-stop NC; nunca ohm en circuito energizado. Pinza amperimétrica rated para corriente de solenoide.",
      "Trigger en flanco de encoder; mide duty cycle y jitter. Sonda 10:1; ground corto reduce EMI de VFD cercano.",
      "Forma de onda sucia → revisa tierra y routing de cable antes de culpar sensor.",
      "Adjunta captura de scope al ticket — acelera escalamiento a ingeniería.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Lista tres mediciones seguras con DMM energizado vs tres que requieren LOTO.",
      },
    ],
    summary:
      "DMM confirma presencia de 24V; scope confirma calidad de pulsos — diagnóstico profesional usa ambos.",
    careerInsight:
      "Sin captura de scope el supervisor rechaza el cierre — 'encoder OK' con evidencia gráfica cierra en un turno.",
    glossary: [
      { term: "DMM", definition: "Multímetro digital." },
      { term: "Duty cycle", definition: "Porcentaje de tiempo en alto por periodo." },
      { term: "Jitter", definition: "Variación temporal en pulsos." },
      { term: "EMI", definition: "Interferencia electromagnética." },
      { term: "VFD", definition: "Variador de frecuencia." },
      { term: "Trigger", definition: "Condición de estabilización del scope." },
    ],
    references: [
      { title: "Fluke Industrial Troubleshooting", url: "https://www.fluke.com/en-us/learn", author: "Fluke" },
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(3), title: "Medición industrial", afterSection: 1 },
  },
  {
    slug: "plc-architecture",
    headings: [
      "Hardware CPU e I/O",
      "Memoria y watchdog",
      "Redundancia awareness",
      "PLC y controlador de robot",
    ],
    bodies: [
      "CPU ejecuta ladder; módulos I/O locales o Profinet remotos; fuente 24V externa. S7-1200 para células; S7-1500 para performance.",
      "Memoria retentive para contadores críticos. Watchdog reinicia CPU si scan excede tiempo — investiga loop infinito o comms bloqueadas.",
      "Pares CPU hot-standby en plantas críticas — reconoce LED sync; configuración es rol de ingeniero senior.",
      "PLC orquesta permisos; controlador de robot ejecuta trayectoria. Seguridad crítica en hardware interlock, no solo software.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Identifica en diagrama CPU, módulo DI, DO y conexión Profinet a remote I/O.",
      },
    ],
    summary:
      "Arquitectura PLC: CPU, I/O, memoria y watchdog — base para entender cualquier célula automatizada.",
    careerInsight:
      "Online en TIA Portal viste scan time subir tras cambio — revertiste y evitaste paro en arranque de turno.",
    glossary: [
      { term: "CPU", definition: "Procesador del PLC." },
      { term: "Watchdog", definition: "Supervisor de tiempo de scan." },
      { term: "Retentive", definition: "Memoria que conserva valor tras corte." },
      { term: "Hot-standby", definition: "CPU de respaldo sincronizada." },
      { term: "DI/DO", definition: "Entradas/salidas digitales." },
      { term: "Backplane", definition: "Bus interno entre módulos." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
      { title: "ROS 2 Humble Documentation", url: "https://docs.ros.org/en/humble/", author: "Open Robotics" },
    ],
    visual: { type: v(0), title: "Arquitectura PLC", afterSection: 1 },
  },
  {
    slug: "plc-scan-cycle",
    headings: [
      "Secuencia del scan",
      "Latencia y jitter",
      "Eventos vs cíclico",
      "Monitoreo online",
    ],
    bodies: [
      "Input scan → programa ladder → output update → housekeeping. Tiempo típico 1–50 ms según CPU y tamaño de programa.",
      "Secuencia neumática rápida falla si scan es lento y timer mal configurado. High-speed counter en módulo dedicado para encoder.",
      "OB cíclico para lógica normal; OB de alarma para eventos Profinet. Handshake robot requiere latencia predecible.",
      "TIA Portal muestra cycle time; si crece tras cambio, no liberes a producción sin investigar.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Explica por qué una salida puede cambiar hasta un scan después de la entrada.",
      },
    ],
    summary:
      "El scan cycle explica retardos entre sensor y actuador — esencial para secuencias y handshake con robot.",
    careerInsight:
      "Operador reportaba 'cilindro lento' — scan había subido a 40 ms por comms Modbus mal tuneadas; ajustaste timeout.",
    glossary: [
      { term: "Scan cycle", definition: "Ciclo lectura-ejecución-escritura del PLC." },
      { term: "OB", definition: "Organization Block en Siemens." },
      { term: "Latency", definition: "Retardo entrada-salida." },
      { term: "High-speed counter", definition: "Contador rápido en hardware." },
      { term: "Handshake", definition: "Intercambio de señales de confirmación." },
      { term: "Housekeeping", definition: "Tareas internas del PLC." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" },
    ],
    visual: { type: v(1), title: "Ciclo de scan", afterSection: 1 },
  },
  {
    slug: "ladder-logic-no-nc",
    headings: [
      "Contactos y bobinas",
      "Rungs y flujo de energía",
      "Nomenclatura en planta",
      "Señales al robot",
    ],
    bodies: [
      "NO conduce si bit TRUE; NC si FALSE — ideal para E-stop en serie. Bobina energiza salida o memoria interna.",
      "Flujo izquierda (L+) a derecha (L-). Comentarios obligatorios en cada rung crítico.",
      "I0.0 SENSOR_PIEZA, Q0.3 VALVE_EXT, M10.0 STEP_2 — consistencia ayuda al turno noche.",
      "PERMIT_ROBOT es bobina del PLC tras verificar sensores de zona — nunca directo desde HMI sin interlock.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Dibuja rung marcha/paro con E-stop NC y sello de contactor.",
      },
    ],
    summary:
      "Ladder con NO/NC es el lenguaje del técnico de planta — comentarios y nomenclatura salvan turnos.",
    careerInsight:
      "Encontraste rung sin comentario que causaba reset aleatorio — documentaste y subiste a git institucional.",
    glossary: [
      { term: "Rung", definition: "Línea de ladder con lógica." },
      { term: "NO/NC", definition: "Normalmente abierto / cerrado." },
      { term: "Sello", definition: "Contacto auxiliar del contactor." },
      { term: "Marcha/paro", definition: "Circuito start/stop clásico." },
      { term: "Bit", definition: "Variable booleana en memoria." },
      { term: "PERMIT", definition: "Señal de autorización al robot." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(2), title: "Ladder logic NO/NC", afterSection: 2 },
  },
  {
    slug: "tia-portal-intro",
    headings: [
      "Proyecto y hardware config",
      "PLCSIM y descarga",
      "Online monitoring seguro",
      "Versionado de proyecto",
    ],
    bodies: [
      "Crear proyecto, CPU 1214C, módulos I/O, direcciones automáticas. Factory I/O se conecta vía adaptador a PLCSIM.",
      "Compilar → Download → Go online. Monitor variables; tabla de force solo en lab.",
      "Force en producción con actuadores conectados está prohibido — causa accidentes y viola procedimiento.",
      "Export PDF ladder; versionar .ap15 en git; change log con autor y fecha.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Lista pasos para agregar I0.5, compilar y probar en PLCSIM sin hardware.",
      },
    ],
    summary:
      "TIA Portal es el entorno estándar Siemens — PLCSIM permite practicar ladder sin riesgo en planta.",
    careerInsight:
      "Menciona PLCSIM + Factory I/O en CV — demuestra experiencia simulada equivalente a banco físico.",
    glossary: [
      { term: "TIA Portal", definition: "Entorno integrado Siemens PLC/HMI." },
      { term: "PLCSIM", definition: "Simulador de CPU en PC." },
      { term: "Download", definition: "Transferir programa al PLC." },
      { term: "Force", definition: "Sobrescribir I/O en online." },
      { term: "Tag table", definition: "Variables simbólicas del proyecto." },
      { term: "Compile", definition: "Verificar y generar código máquina." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
      { title: "ROS 2 Humble Documentation", url: "https://docs.ros.org/en/humble/", author: "Open Robotics" },
    ],
    visual: { type: v(3), title: "TIA Portal intro", afterSection: 1 },
  },
  {
    slug: "timers-ton-tof-tp",
    headings: ["TON on-delay", "TOF off-delay", "TP pulse", "Cascada en secuencias"],
    bodies: [
      "IN TRUE → espera PT → Q TRUE. Retardo antes de cerrar gripper para estabilizar pieza.",
      "IN FALSE → espera PT → Q FALSE. Ventilador post-ciclo o purga neumática.",
      "Pulso fijo al flanco de IN — index o pulso a contador.",
      "Varios timers en serie — cuidado con reset simultáneo que deja salidas colgadas.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Temporiza 3 s entre extensión y retracción de cilindro con TON en ladder.",
      },
    ],
    summary: "TON, TOF y TP estructuran tiempos en secuencias — más legibles que delays ad-hoc en rungs.",
    careerInsight: "Secuencia de dosificación fallaba — TOF mal preset retenía válvula abierta; corregiste PT y documentaste.",
    glossary: [
      { term: "TON", definition: "Timer on-delay." },
      { term: "TOF", definition: "Timer off-delay." },
      { term: "TP", definition: "Timer pulse." },
      { term: "PT", definition: "Preset time del timer." },
      { term: "Grafcet", definition: "Modelo gráfico de secuencia." },
      { term: "Preset", definition: "Valor de tiempo configurado." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" },
    ],
    visual: { type: v(0), title: "Temporizadores PLC", afterSection: 1 },
  },
  {
    slug: "counters-ctu",
    headings: ["Funcionamiento CTU", "Aplicaciones en planta", "Encoder vs CTU", "OEE y conteo"],
    bodies: [
      "CU cuenta flancos; R resetea; Q al alcanzar PV. Planifica overflow en lotes largos.",
      "Piezas por turno, ciclos de PM, consumo de material. HMI muestra CV vs PV.",
      "Encoder va en high-speed hardware; CTU para sensores discretos pieza a pieza.",
      "Conteo real vs teórico alimenta rendimiento en OEE.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Programa CTU PV=100 y alarma HMI al 90% para cambio de tool en cobot.",
      },
    ],
    summary: "CTU convierte eventos discretos en métricas de producción — base de conteo en línea.",
    careerInsight: "Contador desincronizado con robot — flanco doble por vibración; agregaste filtro 50 ms en entrada.",
    glossary: [
      { term: "CTU", definition: "Count Up en ladder." },
      { term: "PV", definition: "Preset value del contador." },
      { term: "CV", definition: "Current value del contador." },
      { term: "Batch", definition: "Lote de producción." },
      { term: "Flanco", definition: "Transición FALSE→TRUE." },
      { term: "PM", definition: "Preventive Maintenance." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(1), title: "Contadores CTU", afterSection: 1 },
  },
  {
    slug: "sequences-interlocks",
    headings: ["Grafcet intro", "Interlocks mutuos", "Anti-colisión robot", "Documentación"],
    bodies: [
      "Pasos y transiciones: Step 10 llenado → sensor nivel → Step 20 dosificado.",
      "Cilindro A extendido bloquea B — evita colisión mecánica.",
      "Cobot: software limit + interlock PLC hardwired. Reset solo con condiciones seguras.",
      "Grafcet en PDF junto al ladder facilita auditoría y relevo de turno.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Diseña 3 pasos Grafcet con interlock neumático entre dos cilindros.",
      },
    ],
    summary: "Secuencias con interlocks previenen colisiones — Grafcet comunica lógica mejor que ladder enredado.",
    careerInsight: "Colisión de cilindros por interlock omitido en cambio de turno — restauraste lógica y capacitaste operador.",
    glossary: [
      { term: "Grafcet", definition: "Grafo funcional secuencial." },
      { term: "Step", definition: "Estado estable en secuencia." },
      { term: "Transition", definition: "Condición de avance de paso." },
      { term: "Anti-colisión", definition: "Lógica que previene choque." },
      { term: "Reset secuencia", definition: "Retorno controlado al inicio." },
      { term: "Interlock", definition: "Bloqueo mutuo entre actuadores." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(2), title: "Secuencias e interlocks", afterSection: 1 },
  },
  {
    slug: "function-blocks-scl",
    headings: ["FB vs FC", "Encapsulación reutilizable", "Cuándo escalar a SCL", "Handshake robot en FB"],
    bodies: [
      "FB tiene memoria de instancia; FC es stateless. Reutiliza FB_MotorStart en varias bandas.",
      "20 rungs duplicados → FB reduce errores y facilita prueba unitaria en simulador.",
      "Entry-level mantiene ladder; propone FB cuando supervisor ve duplicación.",
      "FB empaqueta PERMIT/BUSY/DONE con timeouts hacia robot.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Nombra ventaja de FB sobre FC para control de motor con estado retenido.",
      },
    ],
    summary: "Function blocks encapsulan lógica repetida — puente hacia SCL cuando ladder crece sin control.",
    careerInsight: "Creaste FB_EstopChain reutilizado en 3 células — lead time de cambios bajó 40%.",
    glossary: [
      { term: "FB", definition: "Function Block con instancia." },
      { term: "FC", definition: "Function sin memoria." },
      { term: "SCL", definition: "Structured Text IEC 61131-3." },
      { term: "IEC 61131-3", definition: "Estándar de lenguajes PLC." },
      { term: "Instance", definition: "DB asociado a un FB." },
      { term: "BUSY/DONE", definition: "Handshaking estándar de comando." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
      { title: "ROS 2 Humble Documentation", url: "https://docs.ros.org/en/humble/", author: "Open Robotics" },
    ],
    visual: { type: v(3), title: "Function blocks", afterSection: 1 },
  },
  {
    slug: "pneumatics-frl",
    headings: ["Componentes FRL", "Presión y caudal", "Mantenimiento", "Seguridad neumática"],
    bodies: [
      "Filtro, regulador, lubricador. Presión típica 6 bar; caudal limita velocidad de cilindro.",
      "Presión baja = gripper neumático sin fuerza. Manómetro visible en auditoría.",
      "Drenar copa filtro diario en ambientes húmedos industriales.",
      "Purga aire antes de desmontar — LOTO neumático con válvula bloqueo.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Ajusta regulador a 5 bar y documenta en checklist de puesta en marcha.",
      },
    ],
    summary: "FRL prepara aire limpio y a presión correcta — base de neumática confiable en células robot.",
    careerInsight: "Filtro saturado bajó presión efectiva — reemplazo programado en PM evitó paro de pick neumático.",
    glossary: [
      { term: "FRL", definition: "Filter-Regulator-Lubricator." },
      { term: "Bar", definition: "Unidad de presión (~14.5 psi)." },
      { term: "Caudal", definition: "Volumen de aire por tiempo." },
      { term: "Purga", definition: "Liberar presión residual." },
      { term: "LOTO neumático", definition: "Bloqueo de suministro de aire." },
      { term: "PM", definition: "Mantenimiento preventivo." },
    ],
    references: [
      { title: "Festo Pneumatic Basics", url: "https://www.festo.com/", author: "Festo" },
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(0), title: "Unidad FRL", afterSection: 1 },
  },
  {
    slug: "cylinders-valves-5-2",
    headings: ["Cilindros simple/doble efecto", "Válvulas 5/2", "Fin de carrera", "Integración robot"],
    bodies: [
      "Simple efecto: resorte retorna. Doble: dos solenoides. Tiempo de ciclo afecta OEE.",
      "Monoestable con spring return vs biestable. Diagnóstico de solenoide quemado por LED OFF en válvula.",
      "Reed o proximidad en extremos confirman posición al PLC antes de PERMIT robot.",
      "Amortiguación en tapas reduce impacto y ruido.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Indica solenoide activo para retracción en cilindro doble efecto con válvula 5/2 monoestable.",
      },
    ],
    summary: "Cilindros y 5/2 convierten lógica PLC en movimiento — fin de carrera cierra loop con robot.",
    careerInsight: "Solenoide válvula 5/2 fallaba intermitente — mediste 24V en bobina y reemplazaste con mismo modelo ISO.",
    glossary: [
      { term: "5/2", definition: "Válvula cinco vías, dos posiciones." },
      { term: "Monoestable", definition: "Retorno por resorte." },
      { term: "Biestable", definition: "Mantiene posición hasta pulso opuesto." },
      { term: "Reed switch", definition: "Sensor magnético en cilindro." },
      { term: "Amortiguación", definition: "Deceleración al final de carrera." },
      { term: "Ciclos/min", definition: "Frecuencia de operación." },
    ],
    references: [
      { title: "Festo Didactic", url: "https://www.festo.com/", author: "Festo" },
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(1), title: "Cilindros y válvulas", afterSection: 1 },
  },
  {
    slug: "iso-pneumatic-diagrams",
    headings: ["Símbolos ISO 1219", "Lectura de esquema", "BOM neumática", "As-built cobot gripper"],
    bodies: [
      "Cuadrados válvulas, actuadores direccionales, diamantes lógicos opcionales.",
      "Presión FRL → válvula → cilindro → escape silenciado. Numeración V1, C1 coherente con eléctrico.",
      "Racores, manguera, longitudes para compras de mantenimiento.",
      "Tras modificar gripper neumático de cobot, actualiza diagrama ISO.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Identifica puertos P, A, B, R, S en esquema 5/2.",
      },
    ],
    summary: "Diagramas ISO neumáticos son lenguaje común entre mantenimiento, producción e integradores.",
    careerInsight: "Diagrama desactualizado retrasó reparación 2 h — ahora actualizas ISO as-built en cada intervención.",
    glossary: [
      { term: "ISO 1219", definition: "Símbolos neumáticos/hidráulicos." },
      { term: "Puerto P", definition: "Presión de alimentación." },
      { term: "Escape", definition: "Exhaust de aire usado." },
      { term: "Racor", definition: "Conector de manguera." },
      { term: "Silenciador", definition: "Reduce ruido de escape." },
      { term: "As-built", definition: "Estado real documentado." },
    ],
    references: [
      { title: "ISO 1219 — Fluid power symbols", url: "https://www.iso.org/standard/58176.html", author: "ISO" },
      { title: "Festo Pneumatic Basics", url: "https://www.festo.com/", author: "Festo" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(2), title: "Diagramas neumáticos ISO", afterSection: 2 },
  },
  {
    slug: "hydraulics-intro",
    headings: ["Presión vs caudal", "Componentes", "vs Neumática", "Seguridad alta presión"],
    bodies: [
      "Presión genera fuerza; caudal determina velocidad. Bombas fijas vs variables — awareness entry-level.",
      "Cilindros y motores hidráulicos en prensas. Acumuladores — LOTO especializado.",
      "Hidráulica: alta fuerza, riesgo de fuga. Neumática: limpia, rápida en pickers ligeros.",
      "Fuga a alta presión puede penetrar piel — solo personal certificado abre circuito primario.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Nombra cuándo hidráulica supera neumática en prensa vs pick-and-place.",
      },
    ],
    summary: "Hidráulica intro: reconocer componentes y riesgos — escalar a especialista en intervención primaria.",
    careerInsight: "Reportaste fuga en manguera hidráulica sin tocar — LOTO y escala a hidráulico certificado en 15 min.",
    glossary: [
      { term: "Acumulador", definition: "Almacén de energía hidráulica." },
      { term: "Lpm", definition: "Litros por minuto de caudal." },
      { term: "Prensa", definition: "Equipo de alta fuerza hidráulica." },
      { term: "Fuga", definition: "Escape de fluido a presión." },
      { term: "Bomba", definition: "Genera flujo en circuito hidráulico." },
      { term: "Incompressible", definition: "Propiedad del fluido hidráulico." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(3), title: "Hidráulica intro", afterSection: 1 },
  },
  {
    slug: "hmi-design-principles",
    headings: ["ISA-101 y colores", "UX en piso de planta", "Alarmas priorizadas", "Pantallas cobot/robot"],
    bodies: [
      "Rojo alarma activa, amarillo advertencia, verde OK. Máximo 3 taps a pantalla de fault.",
      "Botones grandes, contraste alto, legible con guantes.",
      "P1 paro vs P3 informativo — alarm flood hace que operador ignore todo.",
      "Pantalla robot: estado, programa activo, contador, reset solo supervisor.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Boceta pantalla principal con OEE, estado cobot y 3 alarmas activas.",
      },
    ],
    summary: "HMI bien diseñado reduce errores de operador — ISA-101 y prioridad de alarmas son estándar exportador.",
    careerInsight: "Rediseñaste faceplate de válvula con colores ISA — operador dejó de resetear válvula equivocada.",
    glossary: [
      { term: "ISA-101", definition: "Estándar de diseño HMI en procesos." },
      { term: "Faceplate", definition: "Plantilla gráfica de objeto." },
      { term: "Alarm flood", definition: "Exceso de alarmas simultáneas." },
      { term: "P1", definition: "Prioridad crítica de alarma." },
      { term: "OEE", definition: "Eficiencia en pantalla operador." },
      { term: "UX", definition: "Experiencia de usuario en HMI." },
    ],
    references: [
      { title: "Siemens WinCC Documentation", url: "https://support.industry.siemens.com/", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
    ],
    visual: { type: v(0), title: "Diseño HMI", afterSection: 1 },
  },
  {
    slug: "scada-overview",
    headings: ["Arquitectura SCADA", "Historian y tags", "Roles operador/supervisor", "Puente IoT/ESP32"],
    bodies: [
      "PLC → servidor SCADA → historian SQL → dashboards gerencia.",
      "Tags con timestamp para auditorías pharma y alimentos.",
      "Técnico no hace force en SCADA — va al PLC con procedimiento.",
      "ESP32 MQTT → broker → gateway SCADA — no expongas PLC directo a internet.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Diferencia HMI local vs SCADA en planta con 4 líneas robotizadas.",
      },
    ],
    summary: "SCADA supervisa líneas completas; HMI opera una máquina — el técnico sabe dónde mirar cada dato.",
    careerInsight: "Correlacionaste trend SCADA con fault robot — identificaste patrón de temperatura motor antes de falla.",
    glossary: [
      { term: "SCADA", definition: "Supervisory Control and Data Acquisition." },
      { term: "Historian", definition: "Base de series temporales." },
      { term: "Tag", definition: "Variable en SCADA." },
      { term: "Acknowledge", definition: "Confirmación de alarma vista." },
      { term: "Setpoint", definition: "Valor objetivo de control." },
      { term: "RTU", definition: "Remote Terminal Unit." },
    ],
    references: [
      { title: "Siemens WinCC Documentation", url: "https://support.industry.siemens.com/", author: "Siemens" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" },
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
    ],
    visual: { type: v(1), title: "Arquitectura SCADA", afterSection: 1 },
  },
  {
    slug: "modbus-profinet",
    headings: ["Modbus RTU/TCP", "Profinet IO", "Diagnóstico de red", "Mapa cobot/ESP32"],
    bodies: [
      "Registros holding; endianness y timeout causan valores erróneos — verifica mapa del manual.",
      "Ciclo determinista ms; GSD para remote I/O; LED en switch industrial.",
      "Diagnóstico Profinet en TIA Portal; cable Ethernet industrial rated.",
      "Cobots y ESP32 exponen Modbus TCP — documenta register map en as-built.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Explica cuándo elegir Modbus vs Profinet en célula nueva con robot y energy meter.",
      },
    ],
    summary: "Modbus y Profinet conectan PLC con periféricos, cobots y gateways ESP32 — mapa de registros es ley.",
    careerInsight: "Valores Modbus erróneos por endianness — corregiste swap en PLC y documentaste en wiki de planta.",
    glossary: [
      { term: "Modbus", definition: "Protocolo master/slave de registros." },
      { term: "Profinet", definition: "Ethernet industrial determinista." },
      { term: "GSD", definition: "Archivo de dispositivo Profinet." },
      { term: "Endianness", definition: "Orden de bytes en registros." },
      { term: "Register map", definition: "Tabla de direcciones del dispositivo." },
      { term: "Determinista", definition: "Tiempo de respuesta acotado." },
    ],
    references: [
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" },
      { title: "Modbus Organization", url: "https://modbus.org/specs.php", author: "Modbus" },
    ],
    visual: { type: v(2), title: "Modbus y Profinet", afterSection: 1 },
  },
  {
    slug: "plc-hmi-integration",
    headings: ["Tags y animaciones", "Alarmas y recetas", "Sincronización hora", "Backup coordinado"],
    bodies: [
      "Tag DB enlazado HMI↔PLC; una fuente de verdad en PLC.",
      "Alarm blocks disparan HMI; recetas por SKU en línea robot.",
      "NTP o PLC master — logs alineados entre fault robot y evento PLC.",
      "Export HMI + PLC mismo version ID en change log.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Lista 5 tags mínimos para pantalla de célula robotizada con cobot.",
      },
    ],
    summary: "Integración PLC-HMI: tags, alarmas y backups versionados — coherencia evita pantallas mentirosas.",
    careerInsight: "HMI mostraba OK con PLC en fault — tag mal enlazado; corregiste y agregaste test de animación al PM.",
    glossary: [
      { term: "Tag", definition: "Variable simbólica compartida." },
      { term: "DB", definition: "Data Block Siemens." },
      { term: "Receta", definition: "Parámetros por producto/SKU." },
      { term: "NTP", definition: "Network Time Protocol." },
      { term: "Change log", definition: "Registro de versiones." },
      { term: "SKU", definition: "Variante de producto." },
    ],
    references: [
      { title: "Siemens WinCC Documentation", url: "https://support.industry.siemens.com/", author: "Siemens" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
      { title: "ROS 2 Humble Documentation", url: "https://docs.ros.org/en/humble/", author: "Open Robotics" },
    ],
    visual: { type: v(3), title: "Integración PLC-HMI", afterSection: 1 },
  },
  {
    slug: "industrial-robotics-cobots",
    headings: [
      "Tipos de robots industriales",
      "Cobots colaborativos",
      "Seguridad ISO 10218",
      "Rol del técnico entry-level",
    ],
    bodies: [
      "Articulado 6 ejes: soldadura, palletizing. SCARA: pick-place plano. Delta: packaging rápido. Portal: grandes volúmenes.",
      "UR, Fanuc CRX, KUKA iiwa — operación cerca de humanos con sensores de fuerza. Teach pendant o lead-through. Sin jaula fija si evaluación de riesgo documentada bajo ISO/TS 15066.",
      "Velocidad reducida en manual. Parada categoría 0/1 según integración. E-stop accesible.",
      "Operar programas validados, cambiar grippers con procedimiento, registrar fault codes — reprogramar trayectorias requiere certificación.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Compara robot en jaula vs cobot en estación compartida con operador.",
      },
    ],
    summary:
      "Robots industriales maximizan ciclo; cobots flexibilizan estaciones compactas — ISO 10218 define límites de seguridad.",
    careerInsight:
      "Operaste cobot UR en demo Universal Robots Academy — documentaste fault y reset según runbook sin entrar a zona de riesgo.",
    glossary: [
      { term: "Cobot", definition: "Robot colaborativo para trabajo con operadores." },
      { term: "SCARA", definition: "Brazo selectivo de alta velocidad en plano." },
      { term: "Teach pendant", definition: "Consola portátil de programación." },
      { term: "ISO/TS 15066", definition: "Guía de colaboración humano-robot." },
      { term: "Palletizing", definition: "Apilado automatizado de cajas." },
      { term: "Fault code", definition: "Código de error del controlador." },
    ],
    references: [
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
      { title: "Universal Robots Academy", url: "https://www.universal-robots.com/academy/", author: "Universal Robots" },
      { title: "Siemens S7-1200 System Manual", url: "https://support.industry.siemens.com/cs/document/109766884/simatic-s7-1200-system-manual", author: "Siemens" },
    ],
    visual: { type: v(0), title: "Robótica industrial y cobots", afterSection: 1 },
  },
  {
    slug: "service-robotics-amr",
    headings: [
      "AMR en logística",
      "Sectores de servicio",
      "Mantenimiento de campo",
      "Integración WMS/MES",
    ],
    bodies: [
      "AMR transportan pallets con SLAM lidar/cámara. Flotas coordinadas por software en almacenes manufactura global.",
      "Hospitales: delivery insumos. Retail: inventario. Manufactura: kitting a línea — complementa brazos fijos.",
      "Limpiar sensores lidar, calibrar ruedas, batería, escalar a vendor si error de mapping.",
      "API REST/MQTT — técnico entiende handshakes dock/undock sin programar WMS.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Describe flujo AMR desde orden WMS hasta entrega en estación de línea.",
      },
    ],
    summary:
      "Robótica de servicio y AMR expanden automatización fuera de células fijas — mantenimiento de sensores es skill clave.",
    careerInsight:
      "AMR detenido por lidar sucio — limpieza con procedimiento del vendor y regreso a flota en 20 min sin escalar.",
    glossary: [
      { term: "AMR", definition: "Autonomous Mobile Robot." },
      { term: "SLAM", definition: "Localización y mapeo simultáneo." },
      { term: "WMS", definition: "Warehouse Management System." },
      { term: "Kitting", definition: "Preparación de materiales para línea." },
      { term: "Dock", definition: "Estación de carga/descarga AMR." },
      { term: "Lidar", definition: "Sensor láser para obstáculos y mapa." },
    ],
    references: [
      { title: "ROS 2 Humble Documentation", url: "https://docs.ros.org/en/humble/", author: "Open Robotics" },
      { title: "MiR Robot Documentation", url: "https://www.mobile-industrial-robots.com/", author: "MiR" },
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
    ],
    visual: { type: v(1), title: "AMR y robótica de servicio", afterSection: 1 },
  },
  {
    slug: "esp32-robotics-gateway",
    headings: [
      "NOVA Explorer Kit ESP32",
      "MQTT y Modbus bridge",
      "Telemetría OEE en edge",
      "Wokwi fallback",
    ],
    bodies: [
      "ESP32-WROOM: WiFi, GPIO, I2C para temp/vibración. Arduino IDE o ESP-IDF. 5V USB en lab; 24V→5V en panel.",
      "Publica cycle_count, motor_temp a Mosquitto. Lee holding registers de energy meter vía Modbus TCP.",
      "Edge calcula downtime entre pulsos — JSON a SCADA sin cargar scan PLC.",
      "Wokwi simula ESP32 + sensor + MQTT — mismo sketch, serial print. Explorers sin kit completan lab.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Diseña topic MQTT plant/line1/cell3/cycle_count con QoS 1 y payload JSON mínimo.",
      },
    ],
    summary:
      "ESP32 como gateway une sensores edge con MQTT/Modbus — Wokwi garantiza acceso sin hardware en planta.",
    careerInsight:
      "Desplegaste gateway ESP32 contando ciclos de conveyor — supervisor vio OEE en dashboard sin modificar ladder.",
    glossary: [
      { term: "ESP32", definition: "Microcontrolador WiFi/BLE Espressif." },
      { term: "MQTT", definition: "Protocolo pub/sub para telemetría." },
      { term: "Wokwi", definition: "Simulador online ESP32/Arduino." },
      { term: "QoS 1", definition: "Entrega MQTT al menos una vez." },
      { term: "Edge", definition: "Procesamiento local antes de nube." },
      { term: "Modbus TCP", definition: "Modbus sobre Ethernet." },
    ],
    references: [
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" },
      { title: "Wokwi ESP32 Docs", url: "https://docs.wokwi.com/", author: "Wokwi" },
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
    ],
    visual: { type: v(2), title: "Gateway ESP32 en célula", afterSection: 1 },
  },
  {
    slug: "ros2-ecosystem",
    headings: [
      "Cuándo ROS 2 vs PLC",
      "Workspace colcon",
      "Simulación vs real",
      "Complemento a cobots",
    ],
    bodies: [
      "AMR, simulación multi-robot, investigación — ROS 2 Humble LTS en Ubuntu 22.04. PLC mantiene interlocks deterministas.",
      "Paquetes ament, build, source install/setup.bash. Launch files orquestan nodes.",
      "Gazebo simula AMR; mismo pub/sub migra a hardware con cambio de driver.",
      "Integradores avanzados exponen ROS 2 driver — awareness para escalar a robotics engineer.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Explica qué problema resuelve ROS 2 que un PLC no debería asumir.",
      },
    ],
    summary:
      "ROS 2 complementa PLC en movilidad y simulación — no reemplaza seguridad hardwired de planta.",
    careerInsight:
      "Completaste tutoriales Humble oficiales — certificado de completion en portafolio junto a NOVA-COL-ROBOT.",
    glossary: [
      { term: "ROS 2", definition: "Robot Operating System 2." },
      { term: "Colcon", definition: "Build tool de workspaces ROS 2." },
      { term: "Launch file", definition: "Script que arranca múltiples nodes." },
      { term: "Humble", definition: "Distribución LTS ROS 2." },
      { term: "Ament", definition: "Sistema de build meta ROS 2." },
      { term: "Gazebo", definition: "Simulador 3D para robots." },
    ],
    references: [
      { title: "ROS 2 Humble Documentation", url: "https://docs.ros.org/en/humble/", author: "Open Robotics" },
      { title: "ISO 10218 — Robots and robotic devices", url: "https://www.iso.org/standard/51330.html", author: "ISO" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" },
    ],
    visual: { type: v(3), title: "Ecosistema ROS 2", afterSection: 1 },
  },
  {
    slug: "ros2-nodes-topics-pubsub",
    headings: [
      "Nodes y procesos",
      "Topics pub/sub",
      "QoS en AMR",
      "Puente con telemetría ESP32",
    ],
    bodies: [
      "/camera_driver, /nav_controller — rclpy o rclcpp. ros2 node list/info para debug.",
      "Publisher en /cmd_vel; subscriber en driver. ros2 topic echo/hz.",
      "Best effort vs reliable — crítico en WiFi AMR vs cableado industrial.",
      "Node sim publica cycle_count; conceptualmente paralelo a MQTT del ESP32 en lab integrado.",
    ],
    extraSections: [
      {
        heading: "Checklist de dominio",
        body: "Escribe ros2 topic echo /odom y explica qué información esperarías de un AMR simulado.",
      },
    ],
    summary:
      "Nodes y topics son el bus de mensajes ROS 2 — pub/sub conecta sensores, planificadores y actuadores simulados.",
    careerInsight:
      "Creaste node Python que publica entero — captura de ros2 topic list en entrega de lab impresiona en entrevista junior robotics.",
    glossary: [
      { term: "Node", definition: "Proceso ejecutable en grafo ROS 2." },
      { term: "Topic", definition: "Canal de mensajes tipados." },
      { term: "/cmd_vel", definition: "Topic estándar de velocidad móvil." },
      { term: "rclpy", definition: "Cliente ROS 2 para Python." },
      { term: "QoS", definition: "Política de entrega de mensajes." },
      { term: "Subscriber", definition: "Node que recibe de un topic." },
    ],
    references: [
      { title: "ROS 2 Humble Documentation", url: "https://docs.ros.org/en/humble/", author: "Open Robotics" },
      { title: "Wokwi ESP32 Docs", url: "https://docs.wokwi.com/", author: "Wokwi" },
      { title: "Factory I/O — Documentation", url: "https://factoryio.com/docs", author: "Factory I/O" },
    ],
    visual: { type: v(0), title: "ROS 2 pub/sub", afterSection: 2 },
  },
];

/** QCW-style theory content — robotics-automation-technician (29 lessons). */
export const ROBOTICS_AUTOMATION_LESSONS: Record<string, LessonContent> =
  mapFromSeeds(SEEDS);
