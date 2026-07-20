import type { LessonContent } from "../types";
import { buildLesson } from "./content-builder";

/** QCW-style theory content — iot-smart-systems-technician (30 lessons). */
export const IOT_SMART_SYSTEMS_LESSONS: Record<string, LessonContent> = {
  "mercado-iot-global": buildLesson({
    sections: [
      { heading: "Panorama del mercado IoT en", body: "El IoT en crece en agrotech (riego inteligente, monitoreo de suelo), smart buildings (HVAC, acceso), utilities (medición remota) y manufactura ligera (OEE, mantenimiento predictivo). Empresas nearshore buscan técnicos que instalen sensores, configuren gateways y mantengan dashboards — no solo programadores senior." },
      { heading: "Roles entry-level y rutas de carrera", body: "Roles típicos entry-level: IoT technician (instalación y primer soporte), field engineer (visitas a sitio), NOC IoT junior (monitoreo de alertas) e integrador MQTT/Modbus. Salarios varían por país; certificaciones AWS IoT, Cisco IoT y portafolio con labs reales aceleran contratación." },
      { heading: "Verticales con mayor demanda regional", body: "Agrotech prioriza LPWAN y batería de larga duración; edificios usan WiFi/BLE y BACnet/Modbus; utilities exigen seguridad y cumplimiento. Un técnico debe mapear requisito de negocio → protocolo → hardware antes de comprar sensores." },
      { heading: "Empleabilidad y portafolio técnico", body: "Documenta 3 casos reales de tu región (noticias, LinkedIn, ferias agrotech). Prepara elevator pitch de 60 s: qué vertical te interesa, qué stack dominas (ESP32, MQTT, Grafana) y un lab demostrable en Wokwi o video." },
      { heading: "Checklist de dominio", body: "Explica por qué IoT technician ≠ desarrollador full-stack; nombra dos verticales en crecimiento y un KPI que medirías en un despliegue piloto (uptime de telemetría, % alertas falsas)." }
    ],
    summary: "Comprendiste «Mercado IoT en: sectores, roles y demanda»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Mercado IoT en: sectores, roles y demanda» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "IoT", definition: "Internet of Things; red de dispositivos con sensores, conectividad y software." },
      { term: "Field engineer", definition: "Técnico que instala y da soporte en sitio del cliente." },
      { term: "Nearshoring", definition: "Contratación de talento regional para clientes en USA/Europa." },
      { term: "Telemetría", definition: "Transmisión automática de mediciones desde dispositivos remotos." },
      { term: "Agrotech", definition: "Tecnología aplicada a agricultura de precisión y monitoreo rural." },
      { term: "SLA", definition: "Service Level Agreement; tiempos de respuesta acordados con el cliente." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "iot-schematic", title: "Referencia: Mercado IoT en: sectores, roles y demanda", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "arquitecturas-edge-fog-cloud": buildLesson({
    sections: [
      { heading: "Capas device, edge, fog y cloud", body: "Device: sensores y actuadores con MCU (ESP32). Edge: gateway local que filtra, agrega o actúa (Raspberry Pi + Node-RED). Fog: procesamiento regional intermedio. Cloud: almacenamiento, ML pesado, dashboards globales y administración de flota." },
      { heading: "Latencia y ancho de banda", body: "Telemetría cada 5 s desde 500 nodos satura enlaces 4G costosos. Procesar umbrales en edge reduce mensajes MQTT un 80–90%. Latencia crítica (paro de bomba, alarma de incendio) exige acción local en milisegundos, no round-trip a AWS." },
      { heading: "Resiliencia offline y store-and-forward", body: "Enlaces rurales o industriales fallan intermitentemente. Gateways deben bufferizar en disco/Flash y sincronizar al reconectar. Cloud asume eventual consistency; diseña idempotencia en ingest para evitar duplicados." },
      { heading: "Criterios de diseño por vertical", body: "Agrotech: edge + LPWAN + cloud batch. Smart building: fog en BACnet gateway + cloud analytics. Elige dónde corre cada regla antes de codificar — cambiar después es costoso en campo." },
      { heading: "Checklist de dominio", body: "Dibuja device→gateway→broker→cloud para un invernadero; indica qué procesamiento ocurre en cada capa y qué pasa si cae Internet 4 horas." }
    ],
    summary: "Comprendiste «Arquitecturas edge, fog y cloud en IoT»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Arquitecturas edge, fog y cloud en IoT» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Edge computing", definition: "Procesamiento local cercano al sensor para reducir latencia." },
      { term: "Fog computing", definition: "Capa intermedia entre edge y cloud en red regional." },
      { term: "Gateway", definition: "Dispositivo que conecta sensores locales con red IP o cloud." },
      { term: "Store-and-forward", definition: "Almacenar datos offline y reenviar al reconectar." },
      { term: "Latencia", definition: "Tiempo entre evento físico y acción/software remoto." },
      { term: "Backpressure", definition: "Mecanismo para frenar productores cuando el consumidor está saturado." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "cloud-architecture", title: "Referencia: Arquitecturas edge, fog y cloud en IoT", afterSection: 0, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "protocolos-mqtt-coap-modbus": buildLesson({
    sections: [
      { heading: "Pub/sub vs request/response", body: "Request/response (HTTP, Modbus poll): cliente pregunta, servidor responde — simple pero no escala con miles de sensores. Pub/sub (MQTT): productores publican, consumidores suscriben vía broker — desacoplamiento y fan-out natural para telemetría." },
      { heading: "MQTT para telemetría", body: "MQTT usa TCP, topics jerárquicos y QoS 0/1/2. Ideal para ESP32→broker→Grafana. Payload típico JSON o CBOR. Retained messages útiles para último valor conocido al suscribir dashboard nuevo." },
      { heading: "CoAP en dispositivos constrained", body: "CoAP sobre UDP, REST-like, diseñado para MCUs con poca RAM. Observables permiten suscripción ligera. Menos común en labs NOVA pero aparece en sensores ultra-bajo consumo y redes 6LoWPAN." },
      { heading: "Modbus en entorno industrial", body: "Modbus RTU/TCP es master/slave de registros — estándar de facto en PLCs. Gateways traducen Modbus→MQTT para unificar planta legacy con cloud. No mezcles Modbus timing con WiFi inestable sin buffer." },
      { heading: "Checklist de dominio", body: "Para monitoreo de 20 sensores de temperatura en bodega: ¿MQTT o Modbus? Justifica protocolo, broker y quién es master." }
    ],
    summary: "Comprendiste «Protocolos de aplicación: MQTT, CoAP y Modbus»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Protocolos de aplicación: MQTT, CoAP y Modbus» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "MQTT", definition: "Protocolo publish/subscribe ligero para telemetría IoT." },
      { term: "CoAP", definition: "Constrained Application Protocol; HTTP-like para dispositivos limitados." },
      { term: "Modbus", definition: "Protocolo industrial master/slave para lectura de registros." },
      { term: "Pub/sub", definition: "Modelo donde emisores y receptores se desacoplan vía broker." },
      { term: "Payload", definition: "Cuerpo del mensaje con datos de telemetría o comando." },
      { term: "Broker", definition: "Intermediario MQTT que enruta mensajes por topic." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "network-topology", title: "Referencia: Protocolos de aplicación: MQTT, CoAP y Modbus", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "estandares-lorawan-zigbee-ble": buildLesson({
    sections: [
      { heading: "LPWAN vs mesh vs corto alcance", body: "LPWAN (LoRaWAN): kilómetros, batería años, baja tasa de datos — sensores agrícolas remotos. Mesh (Zigbee): saltos entre nodos, ideal interiores sin cobertura celular. BLE: metros, bajo consumo, pairing directo con smartphone para configuración." },
      { heading: "LoRaWAN: alcance y batería", body: "LoRaWAN requiere gateway y join server (OTAA/ABP). Payload limitado (~50 bytes). Planifica duty cycle regulado por país. The Things Network ofrece sandbox gratuito para pruebas académicas." },
      { heading: "Zigbee mesh en edificios", body: "Zigbee forma redes auto-reparables; coordinador único. Domótica y medidores inteligentes. Interoperabilidad Zigbee 3.0 reduce incompatibilidad de fabricantes." },
      { heading: "BLE para provisioning y wearables", body: "BLE GATT en ESP32 permite provisioning WiFi desde app móvil sin UART. Beacons para indoor positioning entry-level. No uses BLE para telemetría continua de planta — usa WiFi o cableado." },
      { heading: "Checklist de dominio", body: "Cliente necesita monitoreo de tanque de agua a 2 km sin electricidad: ¿LoRaWAN, Zigbee o WiFi? Detalla gateway, energía y costo operativo mensual estimado." }
    ],
    summary: "Comprendiste «Estándares LoRaWAN, Zigbee y BLE»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Estándares LoRaWAN, Zigbee y BLE» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "LoRaWAN", definition: "LPWAN de largo alcance y bajo consumo para sensores remotos." },
      { term: "Zigbee", definition: "Protocolo mesh de corto alcance para domótica e industrial ligera." },
      { term: "BLE", definition: "Bluetooth Low Energy; conectividad de corto alcance y bajo consumo." },
      { term: "LPWAN", definition: "Low Power Wide Area Network; redes de largo alcance y baja potencia." },
      { term: "OTAA", definition: "Over-The-Air Activation; join seguro en LoRaWAN." },
      { term: "Gateway LoRa", definition: "Puente radio LoRa ↔ IP hacia servidor de aplicación." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "esp32-wifi-bluetooth": buildLesson({
    sections: [
      { heading: "Arquitectura dual-core ESP32", body: "ESP32 integra dos cores Xtensa, WiFi 802.11 b/g/n y BLE. Core 0 suele manejar stack WiFi; Core 1 lógica de aplicación — o usa FreeRTOS para repartir tareas explícitamente." },
      { heading: "Modos WiFi STA y AP", body: "STA conecta a router existente; AP crea red propia para configuración inicial. SmartConfig o BLE provisioning evitan hardcodear SSID/password en firmware de producción." },
      { heading: "Provisioning y credenciales", body: "Nunca subas credenciales WiFi a GitHub. Usa NVS (Non-Volatile Storage) o portal cautivo para captura en campo. Rota password si técnico deja la empresa." },
      { heading: "BLE GATT intro", body: "BLE GATT expone servicios/características para lectura de sensor o escritura de config desde app móvil. Útil en instalaciones donde no hay teclado en el nodo." },
      { heading: "Alimentación y pinout NOVA Kit", body: "NOVA Explorer Kit: verifica 3.3 V en sensores I2C, consumo pico WiFi (~240 mA) y capacidad de fuente USB. Breadboard loose connections causan el 40% de fallas en labs." },
      { heading: "Checklist de dominio", body: "Configura ESP32 en STA, imprime IP por serial, documenta pinout usado y consumo medido con multímetro en modo activo vs deep sleep." }
    ],
    summary: "Comprendiste «ESP32: WiFi, Bluetooth y arquitectura dual-core»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «ESP32: WiFi, Bluetooth y arquitectura dual-core» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "ESP32", definition: "SoC Espressif con WiFi, BLE y dual-core para IoT." },
      { term: "STA", definition: "Station mode; cliente WiFi conectado a access point." },
      { term: "NVS", definition: "Non-Volatile Storage; memoria flash para config persistente." },
      { term: "GATT", definition: "Generic Attribute Profile; estructura de servicios BLE." },
      { term: "Provisioning", definition: "Proceso de entregar credenciales de red al dispositivo." },
      { term: "SmartConfig", definition: "Método Espressif para enviar credenciales WiFi desde smartphone." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "iot-schematic", title: "Referencia: ESP32: WiFi, Bluetooth y arquitectura dual-core", afterSection: 4, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "freertos-multitasking": buildLesson({
    sections: [
      { heading: "Por qué FreeRTOS en IoT", body: "Loop único bloqueante falla cuando WiFi reconnect tarda 5 s mientras debes muestrear sensor cada 100 ms. FreeRTOS permite tareas concurrentes con scheduling preemptivo en ESP32." },
      { heading: "Tasks y prioridades", body: "xTaskCreate define stack size, prioridad y función. Prioridad alta: lectura sensor crítico. Prioridad baja: publicación MQTT batch. Evita busy-wait; usa vTaskDelay." },
      { heading: "Colas y comunicación inter-task", body: "xQueueSend/xQueueReceive desacoplan productor (ADC) de consumidor (MQTT publish). Buffer acotado evita overflow si broker cae — define política drop vs block." },
      { heading: "Mutex y semáforos", body: "Mutex protege bus I2C compartido entre tareas. Semáforo limita acceso a recurso contable (1 conexión TLS). Deadlock ocurre si dos mutex en orden invertido — documenta orden de lock." },
      { heading: "Checklist de dominio", body: "Diseña 3 tareas: sample (100 ms), publish (1 s), watchdog WiFi. Indica prioridades y qué pasa si publish bloquea 10 s." }
    ],
    summary: "Comprendiste «FreeRTOS: tareas, colas y sincronización»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «FreeRTOS: tareas, colas y sincronización» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "FreeRTOS", definition: "RTOS open source para microcontroladores." },
      { term: "Task", definition: "Hilo de ejecución con stack y prioridad propios." },
      { term: "Mutex", definition: "Primitiva de exclusión mutua para recursos compartidos." },
      { term: "Semaphore", definition: "Contador para limitar acceso concurrente a recurso." },
      { term: "Preemptive scheduling", definition: "Scheduler que interrumpe tarea de baja prioridad." },
      { term: "Watchdog", definition: "Timer que reinicia sistema si tarea crítica deja de reportar." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "power-management-deep-sleep": buildLesson({
    sections: [
      { heading: "Modos de energía ESP32", body: "Active: WiFi TX pico ~240 mA. Modem sleep: WiFi off, CPU on. Light sleep: CPU pausado, RAM retained. Deep sleep: casi todo off, consumo µA — ideal telemetría cada 15 min." },
      { heading: "Wake sources", body: "Wake por timer, GPIO (botón, sensor PIR) o touch pad. Configura ext0/ext1 wake antes de esp_deep_sleep_start(). Documenta qué pin despierta y pull-up/down requerido." },
      { heading: "Duty cycle y estimación de batería", body: "Duty cycle = tiempo activo / periodo total. 5 s activo cada 300 s con 120 mA promedio activo ≈ calculable para AA vs LiPo 18650. Usa datasheet y multímetro, no suposiciones." },
      { heading: "Solar y harvest energy intro", body: "Panel solar 6 V + TP4056 + LiPo extiende autonomía en agrotech. Dimensiona panel para peor día nublado + margen 30%. Supercap para picos TX opcional en diseños avanzados." },
      { heading: "Checklist de dominio", body: "Calcula autonomía de 2×AA (2500 mAh) con lectura+I2C+MQTT 3 s cada 5 min. Compara con medición real en lab." }
    ],
    summary: "Comprendiste «Power management y deep sleep»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Power management y deep sleep» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Deep sleep", definition: "Modo ultra-bajo consumo con RAM mínima retenida." },
      { term: "Duty cycle", definition: "Fracción de tiempo que el dispositivo está activo." },
      { term: "Wake source", definition: "Evento hardware que sale de sleep mode." },
      { term: "LiPo", definition: "Batería litio-polímero recargable común en IoT portátil." },
      { term: "TP4056", definition: "Circuito cargador estándar para celdas LiPo con USB." },
      { term: "Harvesting", definition: "Captura de energía ambiental (solar, vibración) para alimentar nodo." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "multi-sensor-i2c-spi": buildLesson({
    sections: [
      { heading: "Bus I2C: direcciones y scanning", body: "I2C: 2 cables (SDA/SCL), direcciones 7-bit únicas por slave. Wire.scan() detecta dispositivos. Conflicto si dos sensores comparten dirección — usa mux TCA9548A o cambia jumper ADDR." },
      { heading: "Bus SPI: velocidad y CS", body: "SPI: MOSI/MISO/SCK + CS por dispositivo. Más rápido que I2C; ideal SD card y displays. Solo un CS activo bajo a la vez. Longitud de cable corta para integridad de señal." },
      { heading: "Multiplexado y conflictos", body: "Compartir bus entre tareas FreeRTOS requiere mutex I2C. Interrupt pin de sensor acelera respuesta vs polling. Level shifter si mezclas 5 V legacy con 3.3 V ESP32." },
      { heading: "Calibración y validación", body: "Offset y scale: lee valor a temperatura conocida (hielo/agua), guarda calibración en NVS. Documenta unidad (°C, %RH, hPa) en payload MQTT — evita confusiones en dashboard." },
      { heading: "Checklist de dominio", body: "Conecta BME280 (I2C 0x76) + MAX31855 (SPI); entrega tabla pinout, dirección I2C y frecuencia SPI elegida con justificación." }
    ],
    summary: "Comprendiste «Multi-sensor con buses I2C y SPI»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Multi-sensor con buses I2C y SPI» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "I2C", definition: "Bus serial sincrónico de 2 hilos para sensores periféricos." },
      { term: "SPI", definition: "Bus serial rápido full-duplex con chip select por dispositivo." },
      { term: "SDA/SCL", definition: "Data y clock lines del bus I2C." },
      { term: "Chip Select", definition: "Pin GPIO que habilita un slave SPI específico." },
      { term: "TCA9548A", definition: "Multiplexor I2C de 8 canales para sensores con misma dirección." },
      { term: "Calibración", definition: "Ajuste offset/gain para alinear lectura con referencia conocida." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "iot-schematic", title: "Referencia: Multi-sensor con buses I2C y SPI", afterSection: 0, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "pub-sub-mqtt": buildLesson({
    sections: [
      { heading: "Anatomía del modelo pub/sub", body: "Publisher envía a topic; broker entrega a todos los subscribers — sin conocerse mutuamente. Escala a N consumidores (dashboard, alerta, warehouse) sin cambiar firmware del sensor." },
      { heading: "Broker como hub central", body: "Mosquitto, HiveMQ y AWS IoT Core son brokers. Client ID único por conexión. Clean session vs persistent session afecta QoS 1/2 offline." },
      { heading: "Retained messages y LWT", body: "Retained: último mensaje persiste en broker para nuevos subscribers (estado ON/OFF). LWT publica mensaje si cliente desconecta inesperadamente — crítico para detectar nodo caído." },
      { heading: "Desacoplamiento en producción", body: "Productor solo conoce topic; consumidor solo suscripción. Equipos paralelos desarrollan edge y cloud sin acoplar repos. Versiona schema JSON en topic o payload field." },
      { heading: "Checklist de dominio", body: "Configura LWT 'status/offline' en ESP32 y retained 'status/online' al conectar. Demuestra detección de desconexión en MQTT Explorer." }
    ],
    summary: "Comprendiste «Modelo publish/subscribe en MQTT»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Modelo publish/subscribe en MQTT» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Publish", definition: "Enviar mensaje MQTT a un topic específico." },
      { term: "Subscribe", definition: "Registrar interés en topic para recibir mensajes." },
      { term: "LWT", definition: "Last Will Testament; mensaje automático si cliente cae." },
      { term: "Retained message", definition: "Mensaje guardado en broker para nuevos subscribers." },
      { term: "Client ID", definition: "Identificador único de conexión MQTT." },
      { term: "Clean session", definition: "Flag que indica si broker guarda suscripciones offline." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "network-topology", title: "Referencia: Modelo publish/subscribe en MQTT", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "anatomia-mqtt-topics": buildLesson({
    sections: [
      { heading: "Jerarquía recomendada", body: "Patrón: {company}/{site}/{zone}/{device}/{metric} — ej. acme/planta1/invernadero/nodo01/temperature. Facilita ACL por site y dashboards con wildcard acme/planta1/#." },
      { heading: "Wildcards + y #", body: "+ matchea un nivel; # matchea múltiples niveles finales. Suscripción acme/+/+/+/temperature agrega todas las temperaturas. No publiques a topics con # — solo subscribe." },
      { heading: "Topic explosion y ACLs", body: "Un topic por lectura por segundo × 1000 devices = millones msgs/día. Agrega en edge antes de publicar. Limita profundidad jerárquica a 5–6 niveles legibles." },
      { heading: "Versionado de schema", body: "Campo schema_version en JSON o topic v2/ — permite migración sin romper consumidores legacy. Documenta breaking changes en runbook." },
      { heading: "Checklist de dominio", body: "Diseña árbol de topics para 3 nodos en 2 zonas; escribe ACL Mosquitto que permita a nodo01 solo publish a su rama." }
    ],
    summary: "Comprendiste «Anatomía de topics MQTT y naming conventions»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Anatomía de topics MQTT y naming conventions» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Topic", definition: "Canal jerárquico string donde se publica mensaje MQTT." },
      { term: "Wildcard +", definition: "Comodín de un nivel en suscripción MQTT." },
      { term: "Wildcard #", definition: "Comodín multi-nivel al final de suscripción." },
      { term: "ACL", definition: "Access Control List; permisos publish/subscribe por usuario." },
      { term: "Topic explosion", definition: "Proliferación descontrolada de topics y mensajes." },
      { term: "Schema version", definition: "Campo que indica versión del formato payload JSON." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "network-topology", title: "Referencia: Anatomía de topics MQTT y naming conventions", afterSection: 0, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "mqtt-qos-levels": buildLesson({
    sections: [
      { heading: "QoS 0: at most once", body: "QoS 0: fire-and-forget, sin ACK — menor latencia, posible pérdida en red mala. OK para telemetría ambiental cada minuto donde gap es aceptable." },
      { heading: "QoS 1: at least once", body: "QoS 1: PUBACK confirma recepción; puede duplicar si reconnect. Broker y cliente persisten inflight. Estándar para alertas y comandos críticos." },
      { heading: "QoS 2: exactly once", body: "QoS 2: handshake de 4 pasos — sin duplicados, más lento y pesado. Raro en IoT excepto billing o actuadores donde duplicado causa daño." },
      { heading: "Elegir QoS en producción", body: "Telemetría bulk QoS 0; comandos actuador QoS 1; combina con idempotent handler en edge. AWS IoT cobra por mensaje — QoS alto incrementa storage." },
      { heading: "Checklist de dominio", body: "Simula red flaky (desconecta WiFi 3 s durante publish QoS 0 vs 1) y documenta diferencia en conteo de mensajes recibidos." }
    ],
    summary: "Comprendiste «Niveles QoS 0, 1 y 2 en MQTT»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Niveles QoS 0, 1 y 2 en MQTT» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "QoS", definition: "Quality of Service MQTT niveles 0, 1 o 2." },
      { term: "PUBACK", definition: "Paquete ACK de confirmación en QoS 1." },
      { term: "Inflight", definition: "Mensajes enviados pero no confirmados aún." },
      { term: "Duplicado", definition: "Mensaje recibido más de una vez en QoS 1." },
      { term: "Idempotencia", definition: "Procesar mismo mensaje dos veces sin efecto adverso." },
      { term: "At-least-once", definition: "Garantía de entrega con posible duplicación." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "brokers-mosquitto-hivemq-aws-iot": buildLesson({
    sections: [
      { heading: "Mosquitto self-hosted", body: "Mosquitto en Docker/VM: gratis, ACL por password file, TLS manual. Ideal labs y edge local. Monitorea logs y rota certs anualmente." },
      { heading: "HiveMQ y brokers enterprise", body: "HiveMQ Cloud/Enterprise: clustering, métricas, SLA comercial. Clientes industriales con miles de conexiones concurrentes." },
      { heading: "AWS IoT Core managed", body: "AWS IoT Core: integración IAM policies, Device Shadow, Rules Engine. Límites por cuenta (connections/sec, rules). Pay per message — activa billing alarm." },
      { heading: "Bridges y federación", body: "Bridge Mosquitto→AWS replica topics selectivos planta→cloud. Cuidado loops infinitos con bidirectional bridge sin reglas." },
      { heading: "Checklist de dominio", body: "Compara costo mensual estimado: Mosquitto VM $20 vs AWS IoT 1M msgs para flota de 50 nodos cada 30 s." }
    ],
    summary: "Comprendiste «Brokers: Mosquitto, HiveMQ y AWS IoT Core»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Brokers: Mosquitto, HiveMQ y AWS IoT Core» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Mosquitto", definition: "Broker MQTT open source de Eclipse." },
      { term: "HiveMQ", definition: "Broker MQTT comercial con clustering y SLA." },
      { term: "AWS IoT Core", definition: "Servicio managed MQTT de Amazon Web Services." },
      { term: "Bridge", definition: "Replicación de topics entre dos brokers MQTT." },
      { term: "Rules Engine", definition: "Motor AWS IoT que enruta mensajes a servicios AWS." },
      { term: "Billing alarm", definition: "Alerta CloudWatch cuando costo supera umbral." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "cloud-architecture", title: "Referencia: Brokers: Mosquitto, HiveMQ y AWS IoT Core", afterSection: 2, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "edge-computing-iot": buildLesson({
    sections: [
      { heading: "Qué procesar en el edge", body: "Reglas de umbral, debounce, compresión y anonimización local. Solo eventos o promedios suben a cloud — no raw 10 Hz infinito." },
      { heading: "Filtrado y agregación", body: "Ventana de 60 s: publica min/max/avg temp en lugar de 60 lecturas. Reduce costo AWS y ruido en dashboard." },
      { heading: "ML ligero en gateway", body: "TensorFlow Lite Micro en ESP32-CAM para clasificación simple; Raspberry Pi para visión básica. No reemplaza cloud ML entrenamiento — solo inferencia." },
      { heading: "Costo cloud vs edge", body: "TCO: gateway $150 + mantenimiento vs $500/mes ingest cloud sin edge. Calcula break-even para tu flota." },
      { heading: "Checklist de dominio", body: "Implementa filtro: publicar solo si delta > 0.5 °C o cada 5 min heartbeat. Mide reducción de mensajes." }
    ],
    summary: "Comprendiste «Edge computing en despliegues IoT»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Edge computing en despliegues IoT» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Edge computing", definition: "Procesamiento local en gateway o dispositivo." },
      { term: "Agregación", definition: "Combinar múltiples lecturas en estadístico resumido." },
      { term: "TFLite Micro", definition: "Runtime ML optimizado para microcontroladores." },
      { term: "Inferencia", definition: "Ejecutar modelo entrenado sobre datos nuevos." },
      { term: "TCO", definition: "Total Cost of Ownership; costo completo del ciclo de vida." },
      { term: "Heartbeat", definition: "Mensaje periódico que confirma nodo vivo sin telemetría nueva." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "cloud-architecture", title: "Referencia: Edge computing en despliegues IoT", afterSection: 0, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "umbrales-actuadores": buildLesson({
    sections: [
      { heading: "Umbrales simples vs histeresis", body: "Umbral único causa chattering: ventilador ON a 28 °C, OFF a 27.5 °C (histeresis). Evita ciclos rápidos que desgastan actuador." },
      { heading: "Debounce en sensores ruidosos", body: "Debounce software: requiere N lecturas consecutivas sobre umbral antes de actuar. Crítico en sensores vibración o flujo turbulento." },
      { heading: "Control ON/OFF y PWM", body: "Relay para ON/OFF; MOSFET o driver PWM para velocidad ventilador/dimmer LED. Verifica corriente máxima vs rating — flyback diode en inductive loads." },
      { heading: "Local vs cloud decision", body: "Parar bomba por inundación: actúa local en ms; cloud solo registra evento. Cloud decide horarios riego programado donde latencia 1 s es OK." },
      { heading: "Checklist de dominio", body: "Programa histeresis riego: ON humedad <30%, OFF >45%. Documenta tiempos de respuesta medidos." }
    ],
    summary: "Comprendiste «Umbrales, reglas locales y actuadores»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Umbrales, reglas locales y actuadores» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Histeresis", definition: "Banda muerta entre umbrales ON y OFF." },
      { term: "Debounce", definition: "Filtrado de fluctuaciones rápidas en señal sensor." },
      { term: "PWM", definition: "Modulación ancho pulso para control proporcional." },
      { term: "Actuador", definition: "Dispositivo que ejecuta acción física (relay, válvula)." },
      { term: "Chattering", definition: "Conmutación rápida ON/OFF en límite de umbral." },
      { term: "Flyback diode", definition: "Diodo protección en cargas inductivas con relay." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "buffer-store-and-forward": buildLesson({
    sections: [
      { heading: "Por qué bufferizar", body: "Rural 4G o WiFi industrial cae varias veces al día. Perder telemetría viola SLA y corrompe analytics. Gateway debe encolar localmente." },
      { heading: "Colas persistentes", body: "SQLite, archivos rotativos o SPIFFS en ESP32 para cola circular. Timestamp cada muestra para replay ordenado. Capacidad finita — política FIFO drop oldest vs priority alerts." },
      { heading: "Sync al reconectar", body: "Al reconectar MQTT, drenar cola con rate limit para no saturar broker. Marca synced flag; idempotency key evita duplicados en DB cloud." },
      { heading: "Backpressure y límites", body: "Si cola >80% capacidad, reduce sample rate en origen (backpressure). Alerta operador antes de overflow total." },
      { heading: "Checklist de dominio", body: "Simula broker down 10 min con 1 msg/10 s; demuestra catch-up sin pérdida y grafica lag de ingest." }
    ],
    summary: "Comprendiste «Buffer y store-and-forward offline»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Buffer y store-and-forward offline» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Store-and-forward", definition: "Almacenar offline y transmitir al reconectar." },
      { term: "Cola circular", definition: "Buffer tamaño fijo que sobrescribe entradas antiguas." },
      { term: "Rate limit", definition: "Limitar velocidad de publicación al drenar cola." },
      { term: "Idempotency key", definition: "Identificador único para ignorar duplicados en ingest." },
      { term: "SPIFFS", definition: "Sistema archivos flash en ESP32 para persistencia." },
      { term: "Overflow", definition: "Pérdida de datos cuando buffer excede capacidad." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "node-red-gateway": buildLesson({
    sections: [
      { heading: "Node-RED como integrador visual", body: "Node-RED: flows drag-and-drop en Node.js. Ideal gateway entre MQTT, REST APIs, Modbus serial y email alert. Facilita prototipo rápido sin redeploy firmware." },
      { heading: "Nodos MQTT in/out", body: "mqtt in suscribe; mqtt out publica. JSON.parse en function node. Usa context global para estado entre mensajes." },
      { heading: "HTTP, Modbus y function nodes", body: "modbus-read para PLC; http request a API clima; switch node enruta por payload.temperature. Debug sidebar valida antes de producción." },
      { heading: "Deploy en edge", body: "systemd en Raspberry Pi o Docker con volúmenes para flows.json versionado en Git. Backup antes de edit en producción." },
      { heading: "Checklist de dominio", body: "Construye flow: MQTT in → threshold → actuador simulado + HTTP POST alerta. Exporta flows.json para entrega." }
    ],
    summary: "Comprendiste «Gateway Node-RED para integración IoT»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Gateway Node-RED para integración IoT» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Node-RED", definition: "Herramienta flow-based programming para integración IoT." },
      { term: "Flow", definition: "Grafo visual de nodos conectados por wires." },
      { term: "Function node", definition: "Bloque JavaScript custom en Node-RED." },
      { term: "Context", definition: "Almacenamiento de estado entre ejecuciones de nodos." },
      { term: "Deploy", definition: "Aplicar cambios de flow al runtime Node-RED." },
      { term: "modbus-read", definition: "Nodo Node-RED para consultar registros Modbus." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "terminal-lab", title: "Referencia: Gateway Node-RED para integración IoT", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "visualizacion-iot-tiempo-real": buildLesson({
    sections: [
      { heading: "Streaming vs polling", body: "Polling HTTP cada 5 s simple pero ineficiente. MQTT→WebSocket→dashboard es push real-time. Grafana Live y dashboards custom usan suscripción." },
      { heading: "Refresh rates y percepción", body: "Refresh >1 s OK para temperatura ambiente; <100 ms para línea producción crítica. Match refresh a valor de negocio — no animación gratuita." },
      { heading: "UX para operadores", body: "Operador no técnico necesita semáforo verde/amarillo/rojo, unidades claras, timestamp última lectura. Evita 50 gauges en una pantalla." },
      { heading: "Paneles de misión", body: "Panel de misión: KPI principal centrado, drill-down secundario, estado conexión visible. Mobile-friendly para field manager." },
      { heading: "Checklist de dominio", body: "Rediseña dashboard confuso de 12 gráficos en uno con 3 KPIs y alert banner; justifica elecciones UX." }
    ],
    summary: "Comprendiste «Visualización IoT en tiempo real»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Visualización IoT en tiempo real» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "WebSocket", definition: "Conexión bidireccional persistente para push en tiempo real." },
      { term: "Polling", definition: "Consulta periódica al servidor por datos nuevos." },
      { term: "Refresh rate", definition: "Intervalo de actualización visual del dashboard." },
      { term: "KPI", definition: "Key Performance Indicator visible para operador." },
      { term: "Drill-down", definition: "Navegación de resumen a detalle en dashboard." },
      { term: "Stale data", definition: "Lectura obsoleta sin indicador de frescura." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "grafana-influxdb": buildLesson({
    sections: [
      { heading: "InfluxDB y modelo time-series", body: "InfluxDB 2.x organiza buckets por retención. Measurement = metric family; tags indexan (device_id, site); fields son valores float/int." },
      { heading: "Tags vs fields", body: "Tags: device=nodo01, zone=invernadero — filtra rápido. Fields: temperature=24.5 — no indexar high-cardinality en tags." },
      { heading: "Queries Flux y SQL", body: "Flux: from(bucket) |> range |> filter |> aggregateWindow. Grafana variables $device popula dropdown desde query tag values." },
      { heading: "Dashboards Grafana", body: "Paneles: time series, stat, gauge, alert rules nativas. Annotations marcan deploys. Export JSON dashboard a Git." },
      { heading: "Checklist de dominio", body: "Crea dashboard 3 paneles temp/humedad/batería con variable site; configura alert temp >35 °C." }
    ],
    summary: "Comprendiste «Grafana e InfluxDB para series temporales»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Grafana e InfluxDB para series temporales» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "InfluxDB", definition: "Base de datos optimizada para series temporales." },
      { term: "Bucket", definition: "Contenedor de datos con política retención en InfluxDB." },
      { term: "Flux", definition: "Lenguaje query nativo de InfluxDB 2.x." },
      { term: "Grafana", definition: "Plataforma open source de visualización y alertas." },
      { term: "Cardinality", definition: "Cantidad valores únicos tag — alto cardinality cuesta performance." },
      { term: "Retention policy", definition: "Tiempo que datos persisten antes de purge automático." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "terminal-lab", title: "Referencia: Grafana e InfluxDB para series temporales", afterSection: 3, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "thingspeak-cloud": buildLesson({
    sections: [
      { heading: "Prototipado rápido ThingSpeak", body: "ThingSpeak (MathWorks): channel con 8 fields, gráficos instantáneos, React apps. ESP32 publica HTTP GET en 5 minutos — ideal demo y clase." },
      { heading: "Channels y fields", body: "Field1=temperature, field2=humidity. Timestamp automático. MATLAB Analysis para tendencias sin servidor propio." },
      { heading: "API keys y seguridad", body: "Write API key en header; read key separada para dashboard público. Rota keys si filtradas; rate limit 1 msg/15 s free tier." },
      { heading: "Límites vs producción", body: "Producción industrial necesita SLA, VPC, retención larga — migra a Influx+Grafana o AWS. ThingSpeak perfecto capstone fase 1." },
      { heading: "Checklist de dominio", body: "Publica desde ESP32 o Python; comparte dashboard URL en portafolio sin exponer write key." }
    ],
    summary: "Comprendiste «ThingSpeak y plataformas IoT rápidas»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «ThingSpeak y plataformas IoT rápidas» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "ThingSpeak", definition: "Plataforma IoT cloud de MathWorks para prototipos." },
      { term: "Channel", definition: "Contenedor de fields en ThingSpeak." },
      { term: "Write API Key", definition: "Credencial para publicar datos al channel." },
      { term: "Rate limit", definition: "Límite frecuencia mensajes en tier gratuito." },
      { term: "React app", definition: "Visualización custom embebida en ThingSpeak." },
      { term: "Free tier", definition: "Plan gratuito con límites de mensajes y retención." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "alertas-email-sms": buildLesson({
    sections: [
      { heading: "Diseño de alertas accionables", body: "Alerta debe decir qué, dónde, severidad, enlace dashboard y acción sugerida. 'High temp' sin device_id es inútil a las 3 AM." },
      { heading: "Canales email SMS webhook", body: "Email: Grafana/SNS. SMS: Twilio (costo por msg). Webhook: Slack/PagerDuty para equipo NOC. Confirma deliverability en prueba mensual." },
      { heading: "Escalamiento y on-call", body: "P1 inmediato SMS; P2 email 15 min; P3 ticket only. Escalar si no ACK en 30 min. Documenta árbol en runbook." },
      { heading: "Fatiga de alertas", body: "Alert flapping por umbral mal calibrado entrena ignorar alertas. Usa for: 5m en Grafana y histeresis en origen." },
      { heading: "Checklist de dominio", body: "Configura alerta con runbook link; simula ACK y escalamiento en role-play módulo 8." }
    ],
    summary: "Comprendiste «Alertas por email, SMS y webhooks»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Alertas por email, SMS y webhooks» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Webhook", definition: "HTTP POST automático a URL externa ante evento." },
      { term: "PagerDuty", definition: "Plataforma gestión incidentes y on-call." },
      { term: "Alert fatigue", definition: "Desensibilización por exceso alertas de baja calidad." },
      { term: "Flapping", definition: "Alerta ON/OFF repetitivo en umbral límite." },
      { term: "On-call", definition: "Técnico de turno responsable responder incidentes." },
      { term: "SNS", definition: "Simple Notification Service AWS para email/SMS." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "superficie-ataque-iot": buildLesson({
    sections: [
      { heading: "Superficie de ataque IoT", body: "IoT expande perímetro: cada sensor es entry point. Firmware sin firmar, telnet abierto, web admin default admin/admin — botnets Mirai históricas." },
      { heading: "Interfaces debug y UART", body: "UART serial en producción debe deshabilitarse o require auth. JTAG locked. Secure boot en ESP32 v3+ impide flash malicioso." },
      { heading: "Credenciales por defecto", body: "Cambiar password MQTT, WiFi y web UI antes de instalar. Inventario de defaults por fabricante en checklist OWASP." },
      { heading: "Supply chain y physical access", body: "Firmware de AliExpress sin SBOM; verifica hash release oficial. Physical access: enclosure tamper switch, log removal event." },
      { heading: "Checklist de dominio", body: "Completa checklist OWASP IoT Top 10 para nodo ESP32 lab: marca 3 riesgos críticos y mitigación." }
    ],
    summary: "Comprendiste «Superficie de ataque en dispositivos IoT»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Superficie de ataque en dispositivos IoT» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Superficie de ataque", definition: "Conjunto vectores por donde un atacante puede entrar." },
      { term: "UART", definition: "Interfaz serial debug común en MCUs." },
      { term: "Secure boot", definition: "Verificación firma firmware antes de ejecutar." },
      { term: "SBOM", definition: "Software Bill of Materials; lista componentes firmware." },
      { term: "Mirai", definition: "Botnet histórica que explotó credenciales IoT default." },
      { term: "Tamper switch", definition: "Sensor apertura física de enclosure dispositivo." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "troubleshooting-flowchart", title: "Referencia: Superficie de ataque en dispositivos IoT", afterSection: 0, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "tls-mqtt-certificates": buildLesson({
    sections: [
      { heading: "TLS en MQTT", body: "mqtts:// puerto 8883 cifra tráfico en tránsito. Sin TLS, credenciales y telemetría visibles en WiFi público o LAN comprometida." },
      { heading: "Cadena X.509 y CA", body: "Server cert firmado por CA; cliente valida chain hasta root trusted. Let's Encrypt para Mosquitto público; AWS IoT usa Amazon Root CA 1." },
      { heading: "mTLS client certificates", body: "mTLS: broker exige client cert — identidad mutua. AWS IoT attach policy a cert ARN. Revoca cert comprometido sin cambiar todos los passwords." },
      { heading: "Rotación y errores comunes", body: "Errores: hostname mismatch, cert expirado, clock skew en ESP32 sin NTP. Rota certs 30 días antes expiry; automatiza con ACME o AWS." },
      { heading: "Checklist de dominio", body: "Configura Mosquitto TLS + client cert; captura error intencional hostname wrong y documenta fix." }
    ],
    summary: "Comprendiste «TLS, certificados X.509 y MQTT seguro»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «TLS, certificados X.509 y MQTT seguro» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "TLS", definition: "Transport Layer Security; cifrado tráfico en tránsito." },
      { term: "X.509", definition: "Estándar certificados digitales PKI." },
      { term: "mTLS", definition: "Mutual TLS; cliente y servidor presentan certificado." },
      { term: "CA", definition: "Certificate Authority que firma certificados." },
      { term: "NTP", definition: "Network Time Protocol; sincronización hora para validar cert." },
      { term: "ACME", definition: "Protocolo automatización emisión certs (Let's Encrypt)." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "troubleshooting-flowchart", title: "Referencia: TLS, certificados X.509 y MQTT seguro", afterSection: 2, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "segmentacion-vlan-iot": buildLesson({
    sections: [
      { heading: "IoT VLAN aislada", body: "VLAN 30 IoT sin routing directo a VLAN 10 corporate. Solo gateway IoT y bastion acceden ambas. Contiene lateral movement si cámara IP comprometida." },
      { heading: "Firewall rules mínimas", body: "Allow IoT→MQTT broker 8883; deny IoT→Internet general; deny IoT→AD. Log denied flows para detección." },
      { heading: "Zero-trust intro", body: "Zero-trust: verificar identidad cada conexión (cert), least privilege, assume breach. No confiar por estar en LAN." },
      { heading: "Guest vs production", body: "Guest WiFi nunca comparte segmento con sensores producción. MDM en laptops admin accediendo dashboard." },
      { heading: "Checklist de dominio", body: "Diseña diagrama VLAN para smart building: IoT, corporate, guest; lista 5 reglas firewall." }
    ],
    summary: "Comprendiste «Segmentación VLAN y zero-trust IoT»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Segmentación VLAN y zero-trust IoT» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "VLAN", definition: "Virtual LAN; segmentación lógica de red." },
      { term: "Firewall", definition: "Control tráfico permitido entre segmentos." },
      { term: "Lateral movement", definition: "Expansión atacante dentro red tras compromiso inicial." },
      { term: "Zero-trust", definition: "Modelo sin confianza implícita por ubicación red." },
      { term: "Bastion host", definition: "Salto seguro administrado para acceso cruzado VLAN." },
      { term: "NAC", definition: "Network Access Control; autenticación dispositivo al conectar." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "network-topology", title: "Referencia: Segmentación VLAN y zero-trust IoT", afterSection: 0, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "owasp-iot-top-10": buildLesson({
    sections: [
      { heading: "OWASP IoT Top 10 overview", body: "Insecure web interface, insufficient auth, insecure network services, lack encryption, privacy concerns, insecure cloud, insecure mobile, insufficient security config, insecure firmware, lack physical hardening." },
      { heading: "Controles técnicos", body: "Mitiga: TLS everywhere, unique credentials, signed OTA, disable unused services, privacy by design, SBOM tracking." },
      { heading: "Checklist operativo", body: "Checklist imprimible por nodo: password changed Y/N, TLS Y/N, debug disabled Y/N, firmware version, last scan date." },
      { heading: "Auditoría en campo", body: "Field audit 10% sample trimestral. Foto evidencia config screen. Non-compliance ticket con SLA remediate." },
      { heading: "Checklist de dominio", body: "Completa checklist 10 ítems para 1 ESP32; prioriza top 3 riesgos residuales post-mitigación." }
    ],
    summary: "Comprendiste «OWASP IoT Top 10 y mitigaciones»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «OWASP IoT Top 10 y mitigaciones» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "OWASP IoT Top 10", definition: "Lista riesgos críticos en dispositivos IoT." },
      { term: "OTA", definition: "Over-The-Air update de firmware remoto." },
      { term: "Signed firmware", definition: "Imagen firmware con firma criptográfica verificable." },
      { term: "Privacy by design", definition: "Minimizar datos personales desde arquitectura." },
      { term: "Non-compliance", definition: "Desviación de política seguridad documentada." },
      { term: "Remediate", definition: "Corregir hallazgo auditoría dentro SLA." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "aws-iot-core-thing-policy": buildLesson({
    sections: [
      { heading: "Thing registry", body: "Thing = representación lógica dispositivo en AWS. Certificado X.509 asociado. Thing group agrupa flota para jobs OTA." },
      { heading: "Policies JSON IoT", body: "Policy JSON: iot:Connect, iot:Publish, iot:Subscribe en ARN topic específico. Least privilege: solo topics propios thing name." },
      { heading: "Connect publish subscribe", body: "Endpoint regional xxx.iot.region.amazonaws.com. SDK ESP32 AWS IoT usa mbedTLS. Verifica thing name match cert CN." },
      { heading: "JITP y JITR intro", body: "JITP/JITR registra thing automáticamente al primer connect con CA registrada — escala onboarding sin manual console." },
      { heading: "Checklist de dominio", body: "Crea thing + policy mínima + cert; publica test topic desde MQTT test client y desde ESP32." }
    ],
    summary: "Comprendiste «AWS IoT Core: things, policies y conectividad»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «AWS IoT Core: things, policies y conectividad» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Thing", definition: "Entidad lógica dispositivo en AWS IoT registry." },
      { term: "IoT Policy", definition: "Documento JSON permisos MQTT en AWS IoT Core." },
      { term: "Thing group", definition: "Colección things para operaciones batch." },
      { term: "JITP", definition: "Just-In-Time Provisioning registro automático dispositivo." },
      { term: "JITR", definition: "Just-In-Time Registration con CA custom." },
      { term: "ARN", definition: "Amazon Resource Name identificador único recurso AWS." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "cloud-architecture", title: "Referencia: AWS IoT Core: things, policies y conectividad", afterSection: 1, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "device-shadow-aws-iot": buildLesson({
    sections: [
      { heading: "Estado desired vs reported", body: "Shadow JSON almacena desired (app cloud) y reported (device). Delta = diff cuando difieren — device ejecuta desired y reporta nuevo estado." },
      { heading: "Classic y named shadows", body: "Classic shadow mismo nombre thing. Named shadows para subsystems (motor, sensor). Útil cuando un hardware tiene múltiples estados independientes." },
      { heading: "Delta topics", body: "Suscripción $aws/things/thing/shadow/update/delta en device. App móvil solo actualiza desired — no publica directo a actuador." },
      { heading: "Sync offline", body: "Device offline: desired acumula en shadow; al reconnect procesa delta pendiente. Conflict si device y app editan simultáneo — last writer o version field." },
      { heading: "Checklist de dominio", body: "Actualiza desired target temp; demuestra device recibe delta y reporta reported match." }
    ],
    summary: "Comprendiste «Device Shadow: estado deseado vs reportado»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Device Shadow: estado deseado vs reportado» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Device Shadow", definition: "Documento JSON estado deseado/reportado en AWS IoT." },
      { term: "Desired state", definition: "Configuración que cloud quiere en dispositivo." },
      { term: "Reported state", definition: "Estado actual que device comunica." },
      { term: "Delta", definition: "Diferencia entre desired y reported." },
      { term: "Named shadow", definition: "Shadow adicional con nombre distinto al thing." },
      { term: "Conflict resolution", definition: "Estrategia cuando desired y reported divergen." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "rules-engine-lambda": buildLesson({
    sections: [
      { heading: "SQL-like rules IoT", body: "SELECT * FROM 'topic/#' WHERE temperature > 35. Rule dispara acción sin servidor always-on. Filtra en cloud lo no filtrado en edge." },
      { heading: "Acciones republish DynamoDB S3", body: "Acciones nativas: republish alert topic, INSERT DynamoDB, PUT S3 archive, SNS notify. Combina pipeline serverless." },
      { heading: "Lambda serverless", body: "Lambda para lógica compleja: enriquecer con API clima, ML inference, formatear ticket ServiceNow. Timeout 15 min max; cold start latencia." },
      { heading: "Costo y límites", body: "Rules evaluadas por mensaje — costo crece con volumen. Pre-filter en topic hierarchy. Error action dead letter S3." },
      { heading: "Checklist de dominio", body: "Crea rule temp>30 → Lambda log + SNS; prueba con mensaje synthetic MQTT test client." }
    ],
    summary: "Comprendiste «Rules engine e integración Lambda»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Rules engine e integración Lambda» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Rules Engine", definition: "Motor evaluación SQL sobre mensajes MQTT AWS IoT." },
      { term: "Lambda", definition: "Compute serverless AWS por invocación." },
      { term: "DynamoDB", definition: "Base NoSQL managed AWS para ingest IoT." },
      { term: "Republish", definition: "Acción rule que publica a otro topic MQTT." },
      { term: "Cold start", definition: "Latencia inicial invocación Lambda tras idle." },
      { term: "Dead letter", definition: "Destino mensajes rule que fallaron procesamiento." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  }),

  "dashboards-cloud-iot": buildLesson({
    sections: [
      { heading: "CloudWatch metrics IoT", body: "CloudWatch métricas Connect.Success, Publish.Inbound por thing. Alarmas billing y connection failures. Dashboard operativo NOC." },
      { heading: "SiteWise intro", body: "IoT SiteWise para planta industrial modelada assets/hierarchies — awareness entry; overlap con Grafana on-prem." },
      { heading: "Cost monitoring", body: "Cost explorer tags project=iot-capstone. Alert $10 threshold sandbox Academy. Mensajes, rules, logs cobran separado." },
      { heading: "Fleet indexing", body: "Fleet indexing busca things por attribute shadow.reported.firmware_version=1.2 — patch management flota." },
      { heading: "Checklist de dominio", body: "Dashboard CloudWatch 4 métricas; documenta qué acción tomar si Connect.Success cae 50%." }
    ],
    summary: "Comprendiste «Dashboards cloud y operaciones IoT»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Dashboards cloud y operaciones IoT» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "CloudWatch", definition: "Servicio monitoring y métricas AWS." },
      { term: "SiteWise", definition: "Servicio AWS modelado activos industriales." },
      { term: "Fleet indexing", definition: "Búsqueda indexada atributos flota IoT." },
      { term: "Cost Explorer", definition: "Herramienta análisis costos AWS." },
      { term: "Connect.Success", definition: "Métrica conexiones MQTT exitosas AWS IoT." },
      { term: "Patch management", definition: "Proceso actualizar firmware flota coordinado." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "cloud-architecture", title: "Referencia: Dashboards cloud y operaciones IoT", afterSection: 0, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "modbus-rtu-tcp": buildLesson({
    sections: [
      { heading: "Modbus RTU serial", body: "RTU sobre RS485: binary compacto, timing estricto 3.5 char silence entre frames. Master poll slaves por address 1–247." },
      { heading: "Modbus TCP Ethernet", body: "TCP puerto 502: MBAP header reemplaza CRC RTU. Misma mapa registros. Más fácil debug con Wireshark que osciloscopio RS485." },
      { heading: "Function codes esenciales", body: "FC3 read holding registers (40001+), FC4 input registers (30001+), FC1 coils, FC5 write single coil. Mapa documento del vendor PLC." },
      { heading: "Gateway serial-Ethernet", body: "Gateway MOXA/Node-RED convierte RTU↔TCP↔MQTT. Latency adicional; buffer si serial lento vs MQTT burst." },
      { heading: "Checklist de dominio", body: "Lee 10 holding registers simulador Modbus; mapea a MQTT JSON fields; documenta byte order (endianness)." }
    ],
    summary: "Comprendiste «Modbus RTU y Modbus TCP»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «Modbus RTU y Modbus TCP» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "Modbus RTU", definition: "Variante serial binary Modbus sobre RS485." },
      { term: "Modbus TCP", definition: "Variante Modbus sobre Ethernet puerto 502." },
      { term: "Holding register", definition: "Registro lectura/escritura Modbus 4xxxx." },
      { term: "Function code", definition: "Código operación Modbus (read/write)." },
      { term: "RS485", definition: "Bus serial differential industrial multi-drop." },
      { term: "Endianness", definition: "Orden bytes multi-byte en registros 32-bit." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ],
    visual: { type: "iot-schematic", title: "Referencia: Modbus RTU y Modbus TCP", afterSection: 2, caption: "Diagrama de apoyo para documentación y repaso previo al lab." }
  }),

  "opc-ua-scada-basics": buildLesson({
    sections: [
      { heading: "OPC-UA cliente servidor", body: "OPC-UA reemplaza OPC classic DCOM. Cliente (SCADA) subscribe nodes servidor (PLC). Seguridad integrada certs." },
      { heading: "Namespaces y address space", body: "Namespace organiza nodes: Objects, Variables, Methods. NodeId único. Browse address space desde UA Expert tool." },
      { heading: "Integración PLC HMI", body: "Siemens S7 expone OPC-UA server en firmware reciente. HMI lee same nodes — single source of truth planta." },
      { heading: "SCADA awareness", body: "SCADA supervisa setpoints, alarms, trends históricos. IoT technician awareness: no programar SCADA día 1 pero leer tags y escalar." },
      { heading: "Checklist de dominio", body: "Browse simulador OPC-UA; identifica 3 variables temperatura; explica cómo mapearías a MQTT topic." }
    ],
    summary: "Comprendiste «OPC-UA y fundamentos SCADA»: marco operativo en despliegue y mantenimiento de sistemas IoT, pasos verificables, controles de calidad y cómo demostrarlo en labs, certificaciones y entrevistas técnicas.",
    careerInsight: "En entrevistas, usa STAR sobre «OPC-UA y fundamentos SCADA» (60–90 s). Menciona herramienta concreta (ESP32, Mosquitto, Grafana o AWS IoT), evidencia que recolectaste y resultado medible; evita definiciones de glosario sin contexto de ticket real.",
    glossary: [
      { term: "OPC-UA", definition: "Protocolo interoperabilidad industrial unified architecture." },
      { term: "SCADA", definition: "Supervisory Control And Data Acquisition." },
      { term: "Namespace", definition: "Contenedor lógico nodes en address space OPC-UA." },
      { term: "NodeId", definition: "Identificador único variable OPC-UA." },
      { term: "UA Expert", definition: "Cliente OPC-UA gratuito para browse/debug." },
      { term: "HMI", definition: "Human-Machine Interface operador planta." }
    ],
    references: [
      { title: "MQTT Specification", url: "https://mqtt.org/mqtt-specification/", author: "OASIS" },
      { title: "AWS IoT Core Developer Guide", url: "https://docs.aws.amazon.com/iot/latest/developerguide/", author: "AWS" },
      { title: "ESP-IDF Programming Guide", url: "https://docs.espressif.com/projects/esp-idf/en/latest/", author: "Espressif" }
    ]
  })
};
