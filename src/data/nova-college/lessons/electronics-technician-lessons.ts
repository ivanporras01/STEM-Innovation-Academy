import type { LessonContent } from "../types";
import { fourSectionLesson, buildLesson } from "./content-builder";

const baseElectronicsLessons: Record<string, LessonContent> = {
  "electronics-industry-roles": fourSectionLesson(
    [
      "La electrónica como base de la economía moderna",
      "Roles entry-level en manufactura, campo y aviónica",
      "Lo que buscan empleadores en técnicos junior",
      "Rutas de crecimiento y certificaciones",
    ],
    [
      "Todo dispositivo conectado — teléfono, auto, medical device, industrial robot — contiene placas electrónicas ensambladas, probadas y reparadas por técnicos. USA manufactura reshore y nearshore en mantiene demanda de assemblers, test technicians y field electronics techs. No es solo 'ingeniero de diseño': la mayoría de empleos son hands-on en banco o línea.",
      "Electronics Assembler (SMT/through-hole), Test Technician (ICT, functional test), Field Service Tech (repara equipos médicos/industriales), Quality Inspector (IPC-A-610), Cable/Wire Harness Assembler, y Avionics Helper en MRO shops. Salarios entry USA: $17–24/hr; con ETA cert y experiencia soldadura SMD: $25–35/hr.",
      "Empleadores valoran: soldadura limpia IPC clase 2, lectura de esquemático, uso de DMM/scope sin quemar componentes, ESD discipline, y documentación. Un técnico que entrega placa funcional + mediciones + fotos de joints supera a candidato solo teórico.",
      "Crecimiento: assembler → senior test → repair tech → team lead → quality/engineering technician (2-year degree opcional). Certificaciones ETA DC/AC, IPC-A-610, y J-STD-001 abren puertas en aerospace y medical donde quality es crítico.",
    ],
    "Electrónica emplea técnicos hands-on en ensamble, prueba y reparación — certificaciones ETA/IPC diferencian candidatos entry-level.",
    "En entrevista manufacturing: 'Leo esquemáticos, soldo IPC clase 2, mido con scope y sigo ESD — mi certificado NOVA-COL-ELE está en verify.novahub.education.'",
    [
      { term: "SMT", definition: "Surface Mount Technology — componentes montados sobre la placa." },
      { term: "ICT", definition: "In-Circuit Test — prueba eléctrica automatizada de PCB." },
      { term: "MRO", definition: "Maintenance, Repair, Overhaul — talleres de mantenimiento aeronáutico/industrial." },
      { term: "ESD", definition: "Electrostatic Discharge — descarga que destruye semiconductores." },
    ],
    [
      { title: "ETA — Certified Electronics Technician", url: "https://etai.org/electronics.html", author: "ETA International" },
      { title: "IPC — Electronics Assembly", url: "https://www.ipc.org/", author: "IPC" },
    ],
    {
      type: "circuit-schematic",
      title: "Flujo ensamble → test → repair",
      afterSection: 1,
    },
  ),

  "si-units-schematic-basics": fourSectionLesson(
    [
      "Unidades fundamentales del SI en electrónica",
      "Prefijos métricos y conversión",
      "Símbolos en esquemáticos IEEE/ANSI",
      "Cómo leer un diagrama de principio a fin",
    ],
    [
      "Voltaje (V) en voltios, corriente (I) en amperios, resistencia (R) en ohmios (Ω), potencia (P) en vatios (W). Capacitancia en faradios (F), inductancia en henrios (H). Estas unidades aparecen en toda datasheet y en reportes de falla — confundir mA con A quema componentes.",
      "Prefijos: kilo (k) 10³, mega (M) 10⁶, milli (m) 10⁻³, micro (µ) 10⁻⁶, nano (n) 10⁻⁹. 4.7kΩ = 4700 Ω. 100nF = 0.1µF. Conversión rápida es skill diario en banco.",
      "Esquemáticos usan símbolos normalizados: resistencia zigzag o rectángulo, capacitor paralelo, tierra, VCC, flechas de señal. Referencia de diseño (ref des) como R1, C3, U2 identifica componente en placa. Net labels conectan sin dibujar cada cable.",
      "Leer esquemático: power rails arriba/abajo, flujo señal izquierda→derecha, separar bloques (power, MCU, sensor, output). Antes de medir en placa real, localizar ref des en silkscreen — evita cortocircuitos por tocar nodo equivocado.",
    ],
    "Dominar V, I, R, W y prefijos m/k/µ es obligatorio. Esquemáticos usan ref des y net labels — leer antes de soldar o medir.",
    "Datasheet dice 'max 20mA' — convierte y respeta. Nunca asumas unidad — confirma columna en tabla.",
    [
      { term: "Ref des", definition: "Designator de referencia — R1, C2, U3 en esquemático y BOM." },
      { term: "Net", definition: "Conexión eléctrica común entre componentes." },
      { term: "VCC", definition: "Rail de alimentación positiva en esquemático." },
      { term: "Ground", definition: "Referencia 0V común del circuito." },
    ],
    [
      { title: "IEEE Standard Symbols", url: "https://standards.ieee.org/", author: "IEEE" },
    ],
    {
      type: "circuit-schematic",
      title: "Símbolos básicos R, C, LED, GND",
      afterSection: 2,
    },
  ),

  "lab-safety-esd": fourSectionLesson(
    [
      "Riesgos en laboratorio de electrónica",
      "ESD: daño invisible a semiconductores",
      "Protección personal y del banco",
      "LOTO y energía peligrosa — awareness",
    ],
    [
      "Soldadura genera humo de flux — ventilación o extractor. Hierro caliente (>300°C) quema; pinzas y restos de cable corto. Fuente de lab mal configurada puede entregar 30V/5A — suficiente para daño y calor en cortocircuito. Reglas: nunca energizar sin revisar polaridad y cortos.",
      "ESD de 100V invisible al tacto destruye gate de MOSFET. Componentes en foam conductivo o bolsas antiestáticas. Wrist strap conectado a ground del mat antes de tocar ICs. No trabajar sobre alfombra sintética sin protección.",
      "Mat conductivo, pulsera, ionizador en SMT lines. Herramientas ESD-safe. Retirar baterías/poder antes de desoldar. Gafas para clip de cables y splash flux.",
      "Lockout/Tagout aplica cuando técnico de campo abre panel industrial con 480V — NOVA da awareness; solo trabajo <30V en lab salvo supervisión. Reportar equipos dañados, cables pelados, humo inmediatamente.",
    ],
    "Ventilación soldadura, ESD mat+strap, verificar polaridad antes de energizar. ESD mata chips sin síntoma inmediato.",
    "Placa 'muerta' sin causa obvia: pregunta '¿Se manejó sin ESD?' — estadísticamente común en labs novatos.",
    [
      { term: "ESD mat", definition: "Superficie conductiva conectada a tierra para disipar estática." },
      { term: "Wrist strap", definition: "Pulsera conductiva que iguala potencial del operador a tierra." },
      { term: "LOTO", definition: "Lockout/Tagout — bloqueo de energía en mantenimiento industrial." },
    ],
    [
      { title: "ANSI/ESD S20.20", url: "https://www.esda.org/", author: "ESDA" },
    ],
  ),

  "tools-bench-setup": fourSectionLesson(
    [
      "Kit mínimo de banco NOVA College",
      "Multímetro digital (DMM)",
      "Osciloscopio y fuente variable",
      "Organización y mantenimiento de herramientas",
    ],
    [
      "Por estudiante/pareja: breadboard, kit resistores/capacitores, LEDs, BJT/MOSFET sample, DMM, fuente 0–30V, soldador 60W con punta fina, flux, estaño lead-free, desoldador, pinzas, wire strippers.",
      "DMM: auto-range vs manual; fusible de corriente separado mA/A — nunca medir corriente en paralelo con carga. Verificar batería DMM — lecturas erráticas causan horas perdidas.",
      "Osciloscopio 2 canales mínimo; sonda x10 para señales >20V. Fuente triple output ideal (±15V + 5V). Calibrar zero en scope antes de medidas precisas.",
      "Tool crib con checkout log. Puntas de soldador limpias (esponja/brass). Repor stock bajo de 0805 resistors antes de lab masivo.",
    ],
    "DMM + scope + fuente variable + soldador = core del banco. Mantenimiento de puntas y fusibles DMM evita errores.",
    "Primer día lab: practica medir resistencia de 1kΩ en DMM antes de energizar cualquier circuito.",
    [
      { term: "DMM", definition: "Digital Multimeter — multímetro digital." },
      { term: "Probe x10", definition: "Sonda osciloscopio atenuación 10:1 para voltajes mayores." },
    ],
    [
      { title: "Fluke — Digital Multimeters", url: "https://www.fluke.com/", author: "Fluke" },
    ],
    {
      type: "terminal-lab",
      title: "Checklist banco mínimo NOVA Electronics",
      afterSection: 0,
    },
  ),

  "ohm-law-power": fourSectionLesson(
    [
      "Ley de Ohm: la ecuación central",
      "Potencia eléctrica y disipación",
      "Límites de componentes y derating",
      "Aplicación en selección de resistores",
    ],
    [
      "V = I × R. Conocidos dos valores, calcula el tercero. Resistencia constante en línea; I aumenta linealmente con V. Gráfica I-V es línea recta por origen en resistor ideal.",
      "P = V × I = I²R = V²/R. Resistor disipa potencia como calor — 1/4W resistor no soporta 1W continuo. LED 20mA @ 2V = 40mW en LED + resto en R limitadora.",
      "Derating: usar resistor 1/2W donde cálculo da 0.3W. Ambiente caliente reduce capacidad. Smell hot resistor = undersized o corto.",
      "Ejemplo: 5V rail, LED Vf=2V, If=15mA → R = (5-2)/0.015 = 200Ω. Potencia R = I²R = 0.045W → 1/4W OK.",
    ],
    "V=IR y P=VI gobiernan diseño entry-level. Siempre verificar potencia disipada vs rating del componente.",
    "Interview: '5V, LED 2V 20mA — ¿qué resistor?' — 150Ω, 1/4W mínimo. Muestra cálculo en papel.",
    [
      { term: "Ohm's Law", definition: "V = I × R — relación fundamental DC." },
      { term: "Derating", definition: "Usar componente bajo su máximo nominal por seguridad." },
      { term: "Vf", definition: "Forward voltage — caída en diodo/LED polarizado directo." },
    ],
    [
      { title: "All About Circuits — Ohm's Law", url: "https://www.allaboutcircuits.com/textbook/direct-current/chpt-2/voltage-current-resistance-relate/", author: "AAC" },
    ],
    {
      type: "circuit-schematic",
      title: "Circuito LED + resistor limitadora",
      afterSection: 3,
    },
  ),

  "series-parallel-circuits": fourSectionLesson(
    [
      "Circuitos en serie",
      "Circuitos en paralelo",
      "Combinaciones mixtas",
      "Medición vs cálculo — validación en lab",
    ],
    [
      "Serie: misma corriente I en todos elementos; voltajes suman. Req = R1+R2+… . Una lámpara quemada en serie apaga cadena — Christmas lights legacy.",
      "Paralelo: mismo voltaje V en ramas; corrientes suman. 1/Req = 1/R1+1/R2+… . Fail-open en una rama no apaga otras — diseño doméstico 120V.",
      "Reducir mixtos: identificar bloques serie/paralelo; simplificar paso a paso. Puente de Wheatstone es caso clásico — awareness.",
      "Lab protocol: calcular primero, medir después, explicar discrepancia <5% (tolerancia resistor 5%, contacto breadboard).",
    ],
    "Serie suma R y comparte I; paralelo comparte V y suma I. Simplificar redes mixtas antes de medir.",
    "Troubleshooting: bombillas en serie — si una falla, medir V abierto en cada socket para localizar.",
    [
      { term: "Req", definition: "Resistencia equivalente total del circuito." },
      { term: "Tolerancia", definition: "Desviación ±% del valor nominal del resistor." },
    ],
    [
      { title: "Series and Parallel Circuits", url: "https://www.allaboutcircuits.com/textbook/direct-current/chpt-7/", author: "AAC" },
    ],
  ),

  "kirchhoff-laws": fourSectionLesson(
    [
      "Ley de corrientes de Kirchhoff (KCL)",
      "Ley de voltajes de Kirchhoff (KVL)",
      "Análisis de nodos intro",
      "Cuándo usar simulador vs cálculo manual",
    ],
    [
      "KCL: suma de corrientes entrando a nodo = suma saliendo. Conservación de carga — nada se acumula en nodo ideal.",
      "KVL: suma de caídas de voltaje alrededor de malla cerrada = 0. Energía conservada en recorrido loop.",
      "Nodo con 3 ramas: escribir ecuaciones I unknown. Para NOVA entry-level, mallas de 2-3 elementos — no requiere álgebra matricial avanzada.",
      "Simuladores LTspice/Falstad validan cálculos — usar después de intento manual. En campo, DMM verifica KVL midiendo drops.",
    ],
    "KCL en nodos, KVL en mallas — base de análisis sistemático antes de reemplazar componentes al azar.",
    "Field tip: suma de voltajes alrededor de loop debe cerrar a ~0 — si no, hay medición errónea o fault intermitente.",
    [
      { term: "KCL", definition: "Kirchhoff's Current Law — balance de corrientes en nodo." },
      { term: "KVL", definition: "Kirchhoff's Voltage Law — balance de voltajes en malla." },
      { term: "Nodo", definition: "Punto de conexión entre dos o más componentes." },
    ],
    [
      { title: "Kirchhoff's Laws", url: "https://www.allaboutcircuits.com/textbook/direct-current/chpt-6/kirchhoffs-laws/", author: "AAC" },
    ],
  ),

  "voltage-current-dividers": fourSectionLesson(
    [
      "Divisor de voltaje",
      "Divisor de corriente",
      "Efecto de carga conectada",
      "Aplicaciones: sensado y referencias",
    ],
    [
      "Vout = Vin × R2/(R1+R2) para dos resistores serie. Sensor output, referencia ADC, bias networks usan divisores.",
      "Divisor corriente: corriente total se reparte inversamente proporcional a conductancia. Menos común en diseño pero aparece en análisis paralelo.",
      "Carga conectada a Vout actúa en paralelo con R2 — altera ratio. Regla: impedancia carga >> R2 (10× mínimo) para error <10%.",
      "Potenciómetro es divisor ajustable — ruido mecánico en sensores; debounce en ADC si aplica.",
    ],
    "Divisor de voltaje es herramienta diaria; considerar impedancia de carga al calcular.",
    "ADC read errático: ¿impedancia fuente alta sin buffer? — solución: op-amp buffer (awareness módulo avanzado).",
    [
      { term: "Voltage divider", definition: "Red resistiva que produce fracción de Vin." },
      { term: "ADC", definition: "Analog-to-Digital Converter — convierte voltaje a digital." },
    ],
    [
      { title: "Voltage Divider", url: "https://learn.sparkfun.com/tutorials/voltage-dividers", author: "SparkFun" },
    ],
  ),

  "ac-sine-wave-basics": fourSectionLesson(
    [
      "Forma de onda sinusoidal",
      "RMS vs valor pico",
      "Frecuencia y periodo",
      "Por qué AC en distribución eléctrica",
    ],
    [
      "v(t) = Vp sin(2πft). Alterna positivo/negativo — promedio en un ciclo es cero; medimos RMS (root mean square) para potencia equivalente DC.",
      "Vrms = Vp/√2 para seno perfecto. USA wall outlet 120Vrms → ~170V pico. Confundir pico con RMS destruye equipos.",
      "f en Hz, T = 1/f. 60 Hz USA / 50 Hz/Europa — afecta transformers y motores síncronos.",
      "AC permite transformar voltajes eficientemente — transmisión alta tensión reduce pérdidas I²R. Técnico debe reconocer AC vs DC en mediciones scope/DMM.",
    ],
    "AC sinusoidal: Vrms = Vp/√2. 120Vrms wall ≠ 120V pico. Scope mide Vpp = 2×Vp.",
    "Scope muestra 340Vpp en outlet — ¿normal? Sí, ~120Vrms × √2 × 2 ≈ 340Vpp.",
    [
      { term: "RMS", definition: "Root Mean Square — valor efectivo de AC." },
      { term: "Vpp", definition: "Peak-to-peak voltage — pico a pico en scope." },
      { term: "Periodo", definition: "Tiempo de un ciclo completo T = 1/f." },
    ],
    [
      { title: "AC Waveforms", url: "https://www.allaboutcircuits.com/textbook/alternating-current/", author: "AAC" },
    ],
  ),

  "capacitors-rc-behavior": fourSectionLesson(
    [
      "Comportamiento del capacitor",
      "Carga y descarga RC",
      "Constante de tiempo τ = RC",
      "Filtros paso bajo intro",
    ],
    [
      "Capacitor almacena carga Q = CV; open circuit DC steady state, short AC alta frecuencia ideal. Unidades µF, nF, pF — polarizado vs cerámico.",
      "Carga: voltaje sube exponencialmente hacia Vin. τ = R×C — en t=τ, 63% de Vin. 5τ ≈ steady state.",
      "Descarga: voltaje decae exponencialmente. Scope muestra curva característica — lab módulo 3.",
      "Filtro RC paso bajo: atenúa frecuencias > fc ≈ 1/(2πRC). Desacoplamiento VCC en ICs — cap 100nF cerca de cada chip.",
    ],
    "τ = RC gobierna transitorios. Capacitor bloquea DC y pasa AC — base de filtros y desacoplamiento.",
    "Reset MCU errático: revisar cap desacoplamiento en VCC pin — missing cap causa brownout.",
    [
      { term: "Tau (τ)", definition: "Constante de tiempo RC en segundos." },
      { term: "Polarized cap", definition: "Electrolítico/tantalio — polaridad obligatoria." },
      { term: "Decoupling", definition: "Cap cerca de IC para filtrar ruido en VCC." },
    ],
    [
      { title: "RC Charging Circuit", url: "https://www.allaboutcircuits.com/textbook/direct-current/chpt-13/capacitor-transient-response/", author: "AAC" },
    ],
    {
      type: "circuit-schematic",
      title: "Curva carga RC exponencial",
      afterSection: 2,
    },
  ),

  "inductors-transformers": fourSectionLesson(
    [
      "Inductores: oposición al cambio de corriente",
      "Back-EMF en motores y relés",
      "Transformadores: relación de espiras",
      "Aislamiento galvánico y seguridad",
    ],
    [
      "V = L di/dt — inductor resiste cambio instantáneo de I. En DC steady state, corto ideal (solo resistencia wire). Henrio (H), mH común en power.",
      "Desenergizar bobina relé/motor genera pico back-EMF — destruye transistor si no hay diodo flyback.",
      "Transformer: V2/V1 = N2/N1, ideal power in = power out. Step-up/down AC. No funciona DC steady en primario ideal.",
      "Transformador aislamiento separa circuitos — seguridad en medical/adapters. Never assume secondary is isolated without test.",
    ],
    "Inductores y transformadores son core de power AC. Back-EMF mata drivers sin protección.",
    "Relay click pero MCU reset: flyback diode missing o insuficiente — añadir 1N4007 across coil.",
    [
      { term: "Back-EMF", definition: "Pico de voltaje al colapsar campo magnético en inductor." },
      { term: "Flyback diode", definition: "Diodo paralelo bobina para disipar back-EMF." },
      { term: "Turns ratio", definition: "Relación N2/N1 en transformador." },
    ],
    [
      { title: "Inductors", url: "https://www.allaboutcircuits.com/textbook/alternating-current/chpt-3/", author: "AAC" },
    ],
  ),

  "reactance-impedance-intro": fourSectionLesson(
    [
      "Reactancia capacitiva Xc",
      "Reactancia inductiva Xl",
      "Impedancia Z en serie RC/RL",
      "Interpretación en osciloscopio",
    ],
    [
      "Xc = 1/(2πfC) — cap bloquea baja f, pasa alta f. Xc baja cuando f o C aumentan.",
      "Xl = 2πfL — inductor pasa baja f, bloquea alta f (ideal).",
      "Z = R + j(Xl - Xc) en AC — magnitud |Z| y ángulo de fase. Corriente puede adelantar/atrasar voltaje.",
      "Scope muestra fase shift en RC — awareness suficiente entry-level; cálculo complejo es módulo avanzado opcional.",
    ],
    "Xc y Xl dependen de frecuencia. Impedancia combina R y reactancia — explica comportamiento AC.",
    "Hum 60Hz en audio line: cap coupling insuficiente o ground loop — scope identifica frecuencia hum.",
    [
      { term: "Xc", definition: "Reactancia capacitiva — ohms a frecuencia f." },
      { term: "Xl", definition: "Reactancia inductiva — ohms a frecuencia f." },
      { term: "Impedance (Z)", definition: "Oposición total AC combinando R y reactancia." },
    ],
    [
      { title: "Reactance", url: "https://www.allaboutcircuits.com/textbook/alternating-current/chpt-5/", author: "AAC" },
    ],
  ),
};

const additionalElectronicsLessons: Record<string, LessonContent> = {
  "diodes-rectification": buildLesson({
    sections: [
      { heading: "Diodo ideal vs real", body: "Conduce un sentido (ánodo→cátodo), bloquea reverso hasta breakdown. Vf ~0.7V silicio, ~0.3V Schottky. Corriente máxima If y Vr reverse en datasheet." },
      { heading: "Rectificación", body: "Half-wave y full-wave bridge convierten AC→DC pulsante. Cap filtro suaviza ripple. Calcule Vdc aprox ≈ Vrms×√2 - 2Vf en puente." },
      { heading: "Protección", body: "Diodos flyback, TVS, reverse polarity protection en automotive USB adapters." },
      { heading: "Test con DMM", body: "Modo diodo: 0.6V forward, OL reverse en silicio bueno." },
    ],
    summary: "Diodo unidireccional; puente rectifica AC; flyback protege bobinas.",
    careerInsight: "Bridge rectifier caliente: check output short o cap ESR alto.",
    glossary: [{ term: "Vf", definition: "Forward voltage drop del diodo." }],
    references: [{ title: "Diodes", url: "https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/", author: "AAC" }],
  }),

  "leds-biasing": buildLesson({
    sections: [
      { heading: "LED como diodo", body: "Vf color-dependent: red ~1.8V, green ~2.2V, white/blue ~3V+. Exceed If max destruye en ms." },
      { heading: "Resistor limitador", body: "R = (Vsupply - Vf) / If. Siempre calcular potencia en R." },
      { heading: "PWM dimming", body: "Duty cycle controla brillo percibido; frecuencia PWM >100Hz evita flicker visible." },
      { heading: "ESD en LEDs", body: "LEDs SMD sensibles — handle con ESD." },
    ],
    summary: "Calcular R para If deseado; PWM para dimming; respetar Vf por color.",
    careerInsight: "Panel LED parcial oscuro: open string o current limiter fault — mide cada segmento.",
    glossary: [{ term: "If", definition: "Forward current nominal del LED." }],
    references: [{ title: "LEDs", url: "https://learn.sparkfun.com/tutorials/light-emitting-diodes-leds", author: "SparkFun" }],
    visual: { type: "circuit-schematic", title: "LED + resistor", afterSection: 1 },
  }),

  "bjt-transistor-basics": buildLesson({
    sections: [
      { heading: "BJT NPN/PNP", body: "Base controla corriente colector-emisor. Modos: corte, activo, saturación." },
      { heading: "Como switch", body: "Ib suficiente para saturación — Vce(sat) ~0.2V. Ib ≈ Ic/β conservador." },
      { heading: "Como amplificador", body: "Punto Q en región activa — awareness; NOVA foco en switching." },
      { heading: "Aplicación relay", body: "MCU GPIO → base resistor → transistor → relay coil + flyback diode." },
    ],
    summary: "BJT switch: saturación para ON; flyback en relay; calcular Ib con β.",
    careerInsight: "Relay no activa: mide Vbe ~0.7V? Vce sat? — si Vce alto, no saturado.",
    glossary: [{ term: "Beta (β)", definition: "Ganancia corriente DC Ic/Ib." }],
    references: [{ title: "BJT as Switch", url: "https://www.allaboutcircuits.com/textbook/semiconductors/chpt-4/", author: "AAC" }],
  }),

  "mosfet-basics": buildLesson({
    sections: [
      { heading: "MOSFET N-channel", body: "Vgs > threshold conduce. Rds(on) bajo en logic-level MOSFETs 3.3V/5V." },
      { heading: "Low-side switch", body: "Load entre V+ y drain; source a GND. Común en motores y LEDs high power." },
      { heading: "Gate capacitance", body: "Carga gate rápida — resistencia serie limita pico; heat en switching." },
      { heading: "vs BJT", body: "MOSFET: control por voltaje, alta eficiencia switching; BJT: más simple algunos casos." },
    ],
    summary: "Logic-level N-MOSFET para conmutar cargas DC; Vgs threshold crítico.",
    careerInsight: "MOSFET caliente: Rds(on) alto por Vgs insuficiente o Id > rating.",
    glossary: [{ term: "Rds(on)", definition: "Resistencia canal ON del MOSFET." }],
    references: [{ title: "MOSFET", url: "https://learn.sparkfun.com/tutorials/transistors", author: "SparkFun" }],
  }),

  "binary-hex-logic-levels": buildLesson({
    sections: [
      { heading: "Binario y hex", body: "Bit 0/1; nibble 4 bits; byte 8 bits. Hex agrupa 4 bits — 0xFF = 11111111." },
      { heading: "Logic levels", body: "TTL 5V (legacy); CMOS 3.3V moderno. Vih/Vil thresholds en datasheet." },
      { heading: "5V vs 3.3V", body: "Never drive 5V into 3.3V input — use level shifter." },
      { heading: "Pull-up/down", body: "Resistor define default HIGH/LOW en botones open-drain buses I2C." },
    ],
    summary: "Hex para bytes; respetar logic levels; level shifters entre familias.",
    careerInsight: "I2C no responde: pull-ups missing o wrong voltage — scope SDA/SCL idle high.",
    glossary: [{ term: "Vih", definition: "Minimum input voltage read as HIGH." }],
    references: [{ title: "Logic Levels", url: "https://learn.sparkfun.com/tutorials/logic-levels", author: "SparkFun" }],
  }),

  "logic-gates-truth-tables": buildLesson({
    sections: [
      { heading: "Compuertas básicas", body: "AND, OR, NOT, NAND, NOR, XOR — tablas de verdad completas." },
      { heading: "74HC series", body: "CMOS 3.3–5V tolerant; 74HC08 AND, 74HC32 OR en breadboard lab." },
      { heading: "Boolean algebra", body: "De Morgan: NOT(A AND B) = NOT A OR NOT B — simplifica diseño." },
      { heading: "Fan-out", body: "Cuántas entradas puede drive una salida — datasheet IoH/Iol." },
    ],
    summary: "Compuertas + tablas verdad; 74HC en lab; De Morgan para simplificar.",
    careerInsight: "Logic probe barato acelera debug en boards desconocidas.",
    glossary: [{ term: "Truth table", definition: "Tabla de salidas para todas combinaciones entrada." }],
    references: [{ title: "Logic Gates", url: "https://www.allaboutcircuits.com/textbook/digital/chpt-3/", author: "AAC" }],
    visual: { type: "circuit-schematic", title: "AND gate symbol + truth table", afterSection: 0 },
  }),

  "flip-flops-counters-intro": buildLesson({
    sections: [
      { heading: "Flip-flop", body: "1 bit memoria — D, JK awareness. Clock edge captura dato." },
      { heading: "Contadores", body: "Divide frecuencia clock; LEDs parpadeo = counter MSB." },
      { heading: "Registros", body: "Shift register serial-in parallel-out — LEDs, displays." },
      { heading: "Troubleshooting", body: "Clock missing = frozen state; scope en CLK pin." },
    ],
    summary: "Flip-flops almacenan bits; contadores dividen clock — debug con scope en CLK.",
    careerInsight: "Display congelado: clock crystal o oscillator fault común.",
    glossary: [{ term: "Flip-flop", definition: "Elemento secuencial 1-bit con clock." }],
    references: [{ title: "Digital Sequential", url: "https://www.allaboutcircuits.com/textbook/digital/", author: "AAC" }],
  }),

  "microcontroller-intro": buildLesson({
    sections: [
      { heading: "MCU vs CPU", body: "MCU integra CPU + RAM + flash + GPIO + peripherals en un chip — Arduino/ESP32." },
      { heading: "GPIO ADC PWM", body: "Digital in/out, analog read 0–3.3V, PWM para dimming/motor speed." },
      { heading: "Datasheet pinout", body: "Absolute max 3.6V on ESP32 — violar = muerte instantánea." },
      { heading: "Firmware role", body: "Técnico electronics lee esquemático hardware; awareness de upload code." },
    ],
    summary: "MCU = hardware + firmware; GPIO/ADC/PWM core; never exceed abs max voltage.",
    careerInsight: "Bridge to NOVA IoT College — ESP32 module after this track is natural progression.",
    glossary: [{ term: "GPIO", definition: "General Purpose Input/Output pins." }],
    references: [{ title: "Arduino Getting Started", url: "https://docs.arduino.cc/", author: "Arduino" }],
  }),

  "dmm-advanced-measurements": buildLesson({
    sections: [
      { heading: "Modos DMM", body: "V DC/AC, I series only, R, continuity beep, diode, cap, hFE." },
      { heading: "Errores comunes", body: "Medir I en paralelo quema fusible; scope ground clip en wall outlet prohibido sin aislamiento." },
      { heading: "Min/max hold", body: "Captura picos intermitentes — useful intermittent faults." },
      { heading: "True RMS", body: "AC no-sinusoidal requiere true RMS DMM para lectura correcta." },
    ],
    summary: "DMM correct mode always; current in series; true RMS for distorted AC.",
    careerInsight: "Continuity beep antes de energizar — detect shorts en breadboard saves chips.",
    glossary: [{ term: "True RMS", definition: "Medición AC efectiva para formas no sinusoidales." }],
    references: [{ title: "How to Use a Multimeter", url: "https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter", author: "SparkFun" }],
  }),

  "oscilloscope-fundamentals": buildLesson({
    sections: [
      { heading: "Controles básicos", body: "V/div, s/div, trigger level, edge, auto vs normal trigger." },
      { heading: "Mediciones", body: "Vpp, frequency, duty cycle con cursors o measure menu." },
      { heading: "Ground clip", body: "Conectar ground scope a ground circuit bajo test — common ground reference." },
      { heading: "Two channels", body: "CH1 vs CH2 phase — debug clock vs data." },
    ],
    summary: "Scope shows shape not just number; trigger stabilizes waveform; Vpp and f from screen.",
    careerInsight: "Noisy trace: short ground lead spring clip reduces loop antenna pickup.",
    glossary: [{ term: "Trigger", definition: "Condición que estabiliza display en waveform repetitiva." }],
    references: [{ title: "How to Use an Oscilloscope", url: "https://learn.sparkfun.com/tutorials/how-to-use-an-oscilloscope", author: "SparkFun" }],
    visual: { type: "circuit-schematic", title: "Scope probe connection", afterSection: 2 },
  }),

  "function-generator-probes": buildLesson({
    sections: [
      { heading: "Outputs", body: "Sine, square, triangle; frequency/amplitude/offset control." },
      { heading: "Impedance", body: "50Ω output vs high-Z — mismatch affects amplitude." },
      { heading: "Probe x10", body: "Attenuates 10× — read scope scale ×10. Compensate probe with square cal output." },
      { heading: "Injection testing", body: "Inject signal at node to trace path — advanced awareness." },
    ],
    summary: "Function gen stimulates circuit; compensate x10 probe; match impedance awareness.",
    careerInsight: "Probe compensation skewed square wave = measure errors on fast edges.",
    glossary: [{ term: "Probe compensation", definition: "Ajuste RC en sonda x10 para respuesta plana." }],
    references: [{ title: "Oscilloscope Probes", url: "https://www.tek.com/en/documents/primer/oscilloscope-probes", author: "Tektronix" }],
  }),

  "reading-datasheets": buildLesson({
    sections: [
      { heading: "Absolute maximum ratings", body: "NEVER exceed — instant damage. Vcc max, Io max, Tj max." },
      { heading: "Recommended operating", body: "Safe continuous operation region — design here not at abs max." },
      { heading: "Typical vs min/max", body: "Design worst-case con max/min columns." },
      { heading: "Application notes", body: "Vendor app notes show reference circuits — copy with attribution in lab." },
    ],
    summary: "Abs max = do not exceed; design in recommended; worst-case from min/max columns.",
    careerInsight: "Interview skill: open random datasheet and find Vih in 30 seconds.",
    glossary: [{ term: "Absolute max", definition: "Límites que no deben excederse nunca." }],
    references: [{ title: "How to Read a Datasheet", url: "https://www.sparkfun.com/datasheets/Beginning-embedded-electronics%20-%20How%20to%20read%20a%20datasheet.pdf", author: "SparkFun" }],
  }),

  "soldering-through-hole": buildLesson({
    sections: [
      { heading: "Técnica", body: "Heat pad+lead 2-3s, feed solder, shiny concave fillet. Lead-free ~350°C tip." },
      { heading: "Defectos", body: "Cold joint dull/grainy; bridge between pins; insufficient wetting." },
      { heading: "Flux", body: "Cleans oxidation; no-clean vs wash required flux types." },
      { heading: "Inspection", body: "Visual IPC class 2: fillet wets pad and hole, no excess solder balls." },
    ],
    summary: "Shiny concave fillet = good; cold joint = rework immediately.",
    careerInsight: "Manufacturing rejects dull joints — practice until consistent in 2 weeks.",
    glossary: [{ term: "Cold joint", definition: "Soldadura granulosa por insufficient heat." }],
    references: [{ title: "IPC J-STD-001", url: "https://www.ipc.org/", author: "IPC" }],
  }),

  "smd-soldering-basics": buildLesson({
    sections: [
      { heading: "0805 passives", body: "Tack one side, solder other; tweezers under microscope." },
      { heading: "SOIC ICs", body: "Drag solder with flux across pins; inspect bridges with loupe." },
      { heading: "Hot air", body: "Reflow small SMD; avoid overheating adjacent parts." },
      { heading: "When to escalate", body: "QFN, BGA — reflow oven only, not entry hand solder." },
    ],
    summary: "0805 and SOIC hand-solderable entry-level; QFN/BGA need reflow process.",
    careerInsight: "SMD job interview: bring photo of your best 0805 joints.",
    glossary: [{ term: "SOIC", definition: "Small Outline IC — package con pins en dos lados." }],
    references: [{ title: "SMD Soldering", url: "https://learn.sparkfun.com/tutorials/integrated-circuits", author: "SparkFun" }],
  }),

  "ipc-610-quality-standards": buildLesson({
    sections: [
      { heading: "IPC-A-610", body: "Acceptability of electronic assemblies — bible de QA visual." },
      { heading: "Class 1/2/3", body: "Class 1 consumer; Class 2 industrial/medical general; Class 3 aerospace/life critical." },
      { heading: "Defectos", body: "Insufficient solder, lifted lead, tombstoning, billboarding — reject criteria." },
      { heading: "Rework", body: "Document rework with traceability in class 3 — awareness entry class 2." },
    ],
    summary: "IPC-A-610 defines accept/reject visually; NOVA targets class 2 workmanship.",
    careerInsight: "IPC cert on resume opens aerospace/medical assembly doors.",
    glossary: [{ term: "Tombstoning", definition: "Component vertical on one pad — defect SMT." }],
    references: [{ title: "IPC-A-610", url: "https://www.ipc.org/standards", author: "IPC" }],
  }),

  "pcb-layout-awareness": buildLesson({
    sections: [
      { heading: "Layers", body: "Single/double/multi-layer; inner planes power/ground." },
      { heading: "Traces", body: "Width vs current; clearance voltage; high-speed needs impedance control awareness." },
      { heading: "Silkscreen", body: "Ref des legible aids debug — match schematic." },
      { heading: "Fab files", body: "Gerber + drill — designer sends to PCBWay/JLCPCB; tech reads not creates entry-level." },
    ],
    summary: "Read PCB not design complex; ref des on silk match schematic for debug.",
    careerInsight: "Trace cut jumper on PCB: confirm net with continuity before mod.",
    glossary: [{ term: "Gerber", definition: "Format estándar archivos fabricación PCB." }],
    references: [{ title: "PCB Basics", url: "https://www.sparkfun.com/sparkfun-pcb-basics", author: "SparkFun" }],
  }),

  "power-supplies-linear-switching": buildLesson({
    sections: [
      { heading: "Linear regulators", body: "7805 fixed 5V; LM317 adjustable; simple, inefficient (heat = drop×I)." },
      { heading: "SMPS", body: "Buck step-down, boost step-up; alta eficiencia, ripple switching noise." },
      { heading: "Ripple", body: "Measure AC coupled on scope output — excessive ripple causes MCU brownout." },
      { heading: "Heat sinking", body: "Linear reg dissipation — heatsink if >1W." },
    ],
    summary: "Linear simple hot; SMPS efficient noisy; measure ripple on scope.",
    careerInsight: "Random reboot: scope 3.3V rail for ripple spikes during motor switch.",
    glossary: [{ term: "SMPS", definition: "Switch Mode Power Supply." }],
    references: [{ title: "Voltage Regulators", url: "https://www.allaboutcircuits.com/textbook/semiconductors/chpt-9/", author: "AAC" }],
  }),

  "relays-contactors-protection": buildLesson({
    sections: [
      { heading: "Relay", body: "Coil + contacts NO/NC; isolation control vs load circuit." },
      { heading: "Contactor", body: "Heavy duty relay for motors AC — awareness industrial." },
      { heading: "Flyback diode", body: "Mandatory across DC coil — polarity critical." },
      { heading: "Fusing", body: "Protect wiring; fuse rating vs load inrush." },
    ],
    summary: "Relay isolates control; flyback on DC coil; fuse protection mandatory.",
    careerInsight: "Contacts welded shut: overcurrent or inductive load without protection.",
    glossary: [{ term: "NO/NC", definition: "Normally Open / Normally Closed contacts." }],
    references: [{ title: "Relays", url: "https://learn.sparkfun.com/tutorials/relay-tutorial", author: "SparkFun" }],
  }),

  "dc-motors-drivers": buildLesson({
    sections: [
      { heading: "DC motor", body: "Back-EMF proportional speed; stall current high." },
      { heading: "PWM speed", body: "Duty cycle controls average voltage/speed." },
      { heading: "H-bridge", body: "Reverse direction; L298N common driver module in labs." },
      { heading: "Link robotics", body: "Bridge to NOVA Robotics College PLC/motor control." },
    ],
    summary: "PWM + H-bridge for DC motor direction and speed; stall current kills drivers.",
    careerInsight: "Driver thermal shutdown: reduce PWM or gear load; add heatsink.",
    glossary: [{ term: "H-bridge", definition: "4-switch topology reversing motor polarity." }],
    references: [{ title: "Motor Control", url: "https://learn.adafruit.com/adafruit-motor-shield-v2-for-arduino", author: "Adafruit" }],
  }),

  "industrial-panels-awareness": buildLesson({
    sections: [
      { heading: "Panel layout", body: "DIN rail, terminal blocks, wire numbering, ferrules." },
      { heading: "Control vs power", body: "Separate 24VDC control from 480VAC power — wire colors NEC." },
      { heading: "Documentation", body: "Wire list, panel schedule, as-built updates after field changes." },
      { heading: "Safety", body: "Only qualified for live industrial panels — NOVA awareness sub-30V lab." },
    ],
    summary: "Industrial panels organized DIN rail + docs; high voltage requires licensed electrician.",
    careerInsight: "Panel wire labels save hours — adopt habit day one.",
    glossary: [{ term: "DIN rail", definition: "Rail estándar montaje componentes panel." }],
    references: [{ title: "NFPA 79", url: "https://www.nfpa.org/", author: "NFPA" }],
  }),

  "electronics-troubleshooting-method": buildLesson({
    sections: [
      { heading: "Divide and conquer", body: "Split power vs signal vs load. Verify input before output." },
      { heading: "Smell, touch, look", body: "Hot component, burnt smell, cracked package, leaked cap." },
      { heading: "Signal tracing", body: "Scope/DMM node by node vs expected from schematic." },
      { heading: "Document", body: "Symptom → measurement → hypothesis → fix — ticket format employers want." },
    ],
    summary: "Systematic divide; schematic-first; document every measurement.",
    careerInsight: "Replace random parts = expensive; one hour schematic saves $200 in ICs.",
    glossary: [{ term: "Divide and conquer", definition: "Aislar bloque funcional con falla." }],
    references: [{ title: "Troubleshooting", url: "https://www.allaboutcircuits.com/textbook/test-equipment/", author: "AAC" }],
    visual: { type: "troubleshooting-flowchart", title: "Power → signal → output", afterSection: 0 },
  }),

  "eta-associate-prep": buildLesson({
    sections: [
      { heading: "ETA DC exam", body: "Ohm law, series/parallel, schematic reading, safety — maps modules 1-3." },
      { heading: "ETA AC exam", body: "AC theory, reactance, transformers — maps module 3." },
      { heading: "Study plan", body: "90-day post-grad voucher; ExamCompass practice tests." },
      { heading: "NOVA coverage", body: "Curriculum covers ~80% associate — review weak domains from simulacro." },
    ],
    summary: "ETA Associate DC/AC aligns modules 1-3; simulacro identifies gaps before voucher.",
    careerInsight: "ETA + NOVA-COL-ELE verifiable cert = strong combo for manufacturing hire.",
    glossary: [{ term: "ETA", definition: "Electronics Technicians Association International." }],
    references: [{ title: "ETA Certification", url: "https://etai.org/electronics.html", author: "ETA" }],
  }),
};

/** Unified lesson map for attachContentToModules. */
export const ELECTRONICS_LESSONS: Record<string, LessonContent> = {
  ...baseElectronicsLessons,
  ...additionalElectronicsLessons,
};
