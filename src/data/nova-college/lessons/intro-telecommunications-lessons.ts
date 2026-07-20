import { fourSectionLesson, buildLesson } from "./content-builder";

import type { LessonContent } from "../types";

/** Rich QCW-style lesson bodies for Intro to Telecommunications track. */
const baseTelecomLessons: Record<string, LessonContent> = {
  "telecom-industry-landscape": fourSectionLesson(
    [
      "Por qué las telecomunicaciones siguen siendo un sector de empleo masivo",
      "Roles entry-level que contratan carriers, ISPs y contractors",
      "Competencias que diferencian a un técnico employable",
      "Panorama salarial y rutas de crecimiento vs USA",
    ],
    [
      "Las telecomunicaciones mueven cada llamada, cada video, cada transacción bancaria y cada sensor IoT. En USA, el sector emplea cientos de miles de técnicos de campo, instaladores de fibra, operadores NOC y especialistas RF. En, el despliegue de 4G/5G, fibra FTTH y expansión de data centers mantiene demanda constante de mano de obra técnica — no solo ingenieros, sino técnicos certificables que instalan, prueban y documentan.",
      "Roles entry-level incluyen: Field Service Technician (instala CPE, repara líneas), Structured Cabling Installer (Cat6/fibra en edificios), Fiber Splicer Assistant, Tower Crew Helper, NOC Technician L1 (monitorea alarmas), Central Office Technician helper, y Broadband Installer (cable/FTTH). En contractors como Dycom, MasTec o ISPs regionales, el primer empleo suele ser instalador con vehículo de empresa y herramientas provistas.",
      "Empleadores buscan tres cosas: certificación o training verificable, documentación impecable (as-builts, fotos), y actitud de campo (puntualidad, cliente, seguridad). Un técnico que certifica links de cobre correctamente, etiqueta según TIA-606 y completa tickets sin retrabajo vale más que uno con teoría pero sin evidencia de lab.",
      "En USA, field tech entry-level reporta $18–28 USD/hora según región y contractor; con Network+ y experiencia fibra, $30–45/hora. En varía por país: técnicos FTTH certificados en México, Colombia o Chile superan salarios promedio de administración. Crecimiento típico: installer → senior field → team lead → NOC/supervisor → project coordinator.",
    ],
    "Las telecom modernas combinan cableado, fibra, wireless y VoIP. El empleo entry-level es tangible: instalar, probar, documentar. NOVA College prepara evidencia verificable de esas competencias.",
    "En entrevista con ISP regional, practica: 'Instalo y certifico cobre Cat6, hago empalmes mecánicos de fibra con power meter, realizo site survey Wi-Fi y cierro tickets con as-built completo. Mi certificado NOVA-COL-TEL está en verify.novahub.education.'",
    [
      { term: "CPE", definition: "Customer Premises Equipment — router, ONT, modem en sitio del cliente." },
      { term: "NOC", definition: "Network Operations Center — centro que monitorea red 24/7." },
      { term: "ISP", definition: "Internet Service Provider — proveedor de acceso a internet." },
      { term: "Carrier", definition: "Operador de telecomunicaciones que posee o arrienda infraestructura de red." },
      { term: "Contractor", definition: "Empresa subcontratada por carrier/ISP para obra de campo." },
      { term: "As-built", definition: "Documentación final de lo realmente instalado en sitio." },
    ],
    [
      { title: "CompTIA Network+ Exam Objectives", url: "https://www.comptia.org/certifications/network", author: "CompTIA" },
      { title: "BICSI Career Paths", url: "https://www.bicsi.org/education", author: "BICSI" },
      { title: "ETA International — Fiber Optics", url: "https://etai.org/fiberoptics.html", author: "ETA" },
    ],
    {
      type: "network-topology",
      title: "Ecosistema telecom — carrier a cliente",
      afterSection: 1,
      caption: "CO/POP → last mile → demarc → CPE → LAN del cliente.",
    },
  ),

  "pstn-to-ip-evolution": fourSectionLesson(
    [
      "La red telefónica pública conmutada (PSTN)",
      "De circuit switching a packet switching",
      "Convergencia: voz, video y datos en IP",
      "Implicaciones para el técnico de hoy",
    ],
    [
      "PSTN (Public Switched Telephone Network) fue la red analógica/digital TDM que conectó el mundo durante un siglo. Central offices conmutaban circuitos dedicados de 64 kbps (DS0) para cada llamada. La numeración E.164 (+52, +1…) y la señalización SS7 controlaban routing entre carriers. Aunque PSTN declina, millones de líneas aún existen — especialmente en rural y alarmas/POS.",
      "Circuit switching reserva ancho de banda end-to-end por toda la llamada — eficiente para voz constante pero desperdicia capacidad en datos bursty. Packet switching (IP) divide información en paquetes con routing dinámico — base de internet y VoIP. Ethernet, MPLS y ahora SD-WAN reemplazan T1/E1 en empresas; FTTH y DOCSIS en residencial.",
      "Convergencia significa una sola infraestructura IP transporta voz (SIP/RTP), video (Zoom, streaming) y datos. PBX cloud (Teams Phone, Zoom Phone) reemplaza centralitas TDM. Para el técnico: ya no solo 'tendido de par telefónico' — instala ONT de fibra, configura router con QoS para voz, certifica Cat6 y verifica Wi-Fi para softphones.",
      "Entender PSTN→IP ayuda en troubleshooting: una falla de fax legacy, una alarma que requiere línea analógica, o un cliente con MPLS + SIP trunk necesita diagnóstico en capa física Y capa aplicación. El técnico moderno habla ambos idiomas.",
    ],
    "PSTN usaba circuitos dedicados; las redes modernas son IP packet-switched y convergentes. El técnico entry-level instala last mile (fibra/cobre/wireless) y CPE que entregan voz+datas unificados.",
    "Pregunta común en entrevista: '¿Cuál es la diferencia entre TDM y VoIP?' Respuesta: 'TDM reserva canal fijo 64k por llamada; VoIP empaqueta voz en RTP sobre IP — necesita QoS y suficiente ancho de banda; troubleshooting incluye jitter y packet loss, no solo tono de marcado.'",
    [
      { term: "PSTN", definition: "Red telefónica pública conmutada — infraestructura telefónica tradicional." },
      { term: "TDM", definition: "Time Division Multiplexing — multiplexación por slots temporales (T1/E1)." },
      { term: "VoIP", definition: "Voice over IP — telefonía transportada en paquetes IP." },
      { term: "SS7", definition: "Signaling System 7 — señalización entre centrales telefónicas." },
      { term: "ONT", definition: "Optical Network Terminal — CPE de fibra que termina señal óptica del ISP." },
    ],
    [
      { title: "FCC — Voice Over Internet Protocol (VoIP)", url: "https://www.fcc.gov/consumers/guides/voice-over-internet-protocol-voip", author: "FCC" },
      { title: "ITU-T Recommendations", url: "https://www.itu.int/en/ITU-T/publications/Pages/default.aspx", author: "ITU" },
    ],
  ),

  "regulation-spectrum-basics": fourSectionLesson(
    [
      "Por qué el espectro radioeléctrico es un recurso regulado",
      "FCC en USA y reguladores",
      "Licencias, bandas y uso libre (ISM)",
      "Permisos de obra y right-of-way",
    ],
    [
      "El espectro es finito: solo ciertas frecuencias propagan bien para móvil, satélite o Wi-Fi. Gobiernos asignan bandas mediante licencias (subastas de espectro 5G) o uso libre (2.4 GHz ISM para Wi-Fi). Interferencia entre servicios puede tumbar redes enteras — por eso transmitir en bandas licenciadas sin permiso es ilegal y peligroso.",
      "En USA, la FCC regula espectro, E911, accesibilidad y competencia. En México, IFT; Colombia, CRC; Chile, SUBTEL. Técnicos de campo no diseñan licencias pero deben respetar límites ERP en radios, usar equipos certificados (FCC ID) y reportar interferencia a NOC.",
      "Bandas ISM (Industrial, Scientific, Medical) como 2.4 y 5 GHz no requieren licencia del usuario final pero tienen reglas de potencia. Bandas celulares (n77, n78, AWS, 700 MHz) son propiedad de carriers — instalar repeater ilegal causa multas. CBRS 3.5 GHz en USA usa SAS para coordinación.",
      "Obra de telecom requiere permisos: abrir calle (right-of-way), pole attachment agreements, permisos ambientales en torres. Documentación incompleta detiene proyectos. El técnico documenta fotos GPS, permisos en sitio y actualiza GIS — compliance es employability.",
    ],
    "Espectro es recurso regulado; ISM es uso libre con límites; celular requiere licencia de carrier. Técnicos cumplen normativa de equipos certificados, E911 y permisos de obra.",
    "Si un cliente instala booster celular casero ilegal, explica: 'Amplifica señal licenciada del carrier sin autorización — causa interferencia y multa FCC/IFT. Solución legal: DAS certificado o Wi-Fi calling del carrier.'",
    [
      { term: "FCC", definition: "Federal Communications Commission — regulador telecom USA." },
      { term: "ISM band", definition: "Bandas de uso industrial/científico/médico sin licencia individual." },
      { term: "ERP", definition: "Effective Radiated Power — potencia efectiva radiada de antena." },
      { term: "Right-of-way", definition: "Permiso para instalar infraestructura en vía pública." },
      { term: "E911", definition: "Enhanced 911 — ubicación de emergencia en llamadas VoIP/móvil." },
    ],
    [
      { title: "FCC Spectrum Dashboard", url: "https://www.fcc.gov/technology/spectrum-dashboard", author: "FCC" },
      { title: "IFT — Espectro Radioeléctrico", url: "https://www.ift.org.mx/espectro-radioelectrico", author: "IFT" },
    ],
  ),

  "carrier-isp-mvno-models": fourSectionLesson(
    [
      "Jerarquía de carriers: Tier 1, 2 y 3",
      "ISPs y el last mile",
      "MVNO: operador virtual sin red propia",
      "SLAs, ARPU y qué significa para el técnico",
    ],
    [
      "Tier-1 carriers (AT&T, Lumen, Telmex backbone) poseen fibra troncal internacional y hacen peering. Tier-2/3 y ISPs regionales compran wholesale y venden retail al cliente final. El técnico de contractor usualmente trabaja para ISP o subcontratista del carrier — entiende quién es dueño del cable en poste vs en ducto.",
      "ISP (Internet Service Provider) entrega conectividad IP al cliente — fibra FTTH, DOCSIS cable, fixed wireless. Last mile es el tramo más caro y donde más técnicos se emplean: drop fiber, NID, demarc, CPE install. First-call resolution y tiempo en sitio son KPIs directos.",
      "MVNO (Mobile Virtual Network Operator) como Mint Mobile o regional opera sobre red de carrier host — sin torres propias. El técnico MVNO rara vez toca RAN; escala tickets al carrier host. Entender el modelo evita prometer reparaciones fuera de alcance.",
      "SLA define uptime garantizado (99.9%) y MTTR. ARPU es ingreso promedio por usuario — presiona a carriers a automatizar pero mantiene demanda de instaladores. El técnico que cierra ticket bien documentado protege SLA del ISP.",
    ],
    "Carriers proveen infraestructura; ISPs venden last mile; MVNOs revenden móvil. El técnico de campo ejecuta install/repair y documenta para cumplir SLA.",
    "En ticket escalado: identifica si el problema es planta interna del ISP (last mile) o LAN del cliente (post-demarc). Pregunta clave: '¿La ONT tiene luz LOS/PON verde?' — separa responsabilidad carrier vs CPE/cliente.",
    [
      { term: "Tier-1 carrier", definition: "Operador con red troncal global y acuerdos de peering extensos." },
      { term: "Last mile", definition: "Tramo final de red desde POP/central hasta premisa del cliente." },
      { term: "MVNO", definition: "Operador móvil virtual sin infraestructura RAN propia." },
      { term: "SLA", definition: "Service Level Agreement — compromiso contractual de calidad de servicio." },
      { term: "ARPU", definition: "Average Revenue Per User — ingreso medio por suscriptor." },
    ],
    [
      { title: "PeeringDB", url: "https://www.peeringdb.com/", author: "PeeringDB" },
    ],
    {
      type: "cloud-architecture",
      title: "Modelo carrier → ISP → cliente",
      afterSection: 2,
    },
  ),

  "analog-vs-digital-signals": fourSectionLesson(
    [
      "Propiedades de señales analógicas",
      "Digitalización: muestreo y cuantización",
      "Ventajas del digital en redes telecom",
      "Ejemplos en voz, video y datos",
    ],
    [
      "Señal analógica varía continuamente en amplitud y tiempo — voz en micrófono, FM radio. Sensible a ruido: cada amplificador añade distorsión. En cobre, atenuación aumenta con distancia y frecuencia — por eso DSL y analógico tienen límites de alcance.",
      "Digital convierte señal en bits mediante muestreo (Nyquist: fs ≥ 2× fmax) y cuantización. PCM telefonía: 8 kHz × 8 bits = 64 kbps por canal DS0. Una vez digital, regeneración es perfecta — ruido no acumula si BER se mantiene bajo umbral.",
      "Digital habilita compresión (G.729), multiplexación TDM/IP, cifrado y detección/corrección de errores. Ethernet, GPON, LTE — todo es bits. El técnico mide señal analógica en RF/cobre (dBm, dBμV) y digital en BER, SNR, optical power (dBm).",
      "VoIP usa codecs; video usa H.264/H.265; datos usan TCP/UDP. Entender analógico vs digital explica por qué un enlace de fibra con -18 dBm optical power funciona mientras un par telefónico oxidado falla.",
    ],
    "Analógico es continuo y ruidoso; digital es bits regenerables. Telecom moderna es digital end-to-end con mediciones en dB, dBm y BER.",
    "Explica a cliente: 'Su línea antigua analógica acumula ruido cada metro; fibra digital entrega bits sin degradación hasta el límite de potencia óptica — por eso FTTH es superior en distancia y calidad.'",
    [
      { term: "PCM", definition: "Pulse Code Modulation — codificación digital estándar de voz." },
      { term: "DS0", definition: "Canal digital de 64 kbps — unidad básica TDM." },
      { term: "BER", definition: "Bit Error Rate — tasa de bits erróneos." },
      { term: "SNR", definition: "Signal-to-Noise Ratio — relación señal/ruido." },
      { term: "dBm", definition: "Potencia referida a 1 mW — unidad común en RF y fibra." },
    ],
    [
      { title: "Nyquist–Shannon Sampling Theorem", url: "https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem", author: "Wikipedia" },
    ],
  ),

  "frequency-bandwidth-spectrum": fourSectionLesson(
    [
      "Unidades de frecuencia y escala del espectro",
      "Ancho de banda y capacidad (Shannon)",
      "Asignación de bandas: Wi-Fi vs celular",
      "Implicaciones prácticas en campo",
    ],
    [
      "Frecuencia mide ciclos por segundo: Hz, kHz (AM radio), MHz (FM/TV), GHz (Wi-Fi, 5G). Longitud de onda λ = c/f relaciona frecuencia con tamaño de antena. A mayor frecuencia, mayor atenuación en sólidos pero más ancho de banda disponible — trade-off 5G mmWave vs sub-6.",
      "Ancho de banda (BW) es rango de frecuencias ocupado. Shannon: capacidad máxima C ≈ BW × log2(1+SNR). Más BW = más Mbps potenciales. LTE carrier aggregation combina bandas; Wi-Fi 320 MHz en 6 GHz entrega multi-gigabit en corto alcance.",
      "Wi-Fi usa ISM 2.4 GHz (canales 1–11) y 5 GHz (DFS radar); 6 GHz (Wi-Fi 6E) añade espectro limpio. Celular usa bandas licenciadas — en USA band n41 (2.5 GHz), n77 (3.7 GHz C-band). Coordinación evita interferencia entre servicios colindantes.",
      "En campo: seleccionar canal Wi-Fi libre de interferencia; entender que 2.4 GHz atraviesa paredes mejor que 5 GHz; reportar interferencia RF en ticket con frecuencia y potencia medida.",
    ],
    "Frecuencia y ancho de banda determinan capacidad y propagación. Técnicos eligen bandas/canales apropiados y documentan mediciones en MHz/GHz y dBm.",
    "Site survey tip: '2.4 GHz para alcance en almacén; 5/6 GHz para throughput en oficina abierta — documenta RSSI objetivo ≥ -65 dBm para voz Wi-Fi.'",
    [
      { term: "Bandwidth", definition: "Rango de frecuencias que ocupa una señal." },
      { term: "RSSI", definition: "Received Signal Strength Indicator — potencia recibida." },
      { term: "DFS", definition: "Dynamic Frequency Selection — evita radar en bandas 5 GHz." },
      { term: "Carrier aggregation", definition: "Combinar múltiples bandas LTE/5G para mayor throughput." },
    ],
    [
      { title: "Wi-Fi Alliance — Spectrum", url: "https://www.wi-fi.org/", author: "Wi-Fi Alliance" },
    ],
    {
      type: "troubleshooting-flowchart",
      title: "Selección de banda Wi-Fi vs requisito",
      afterSection: 2,
    },
  ),

  "modulation-fundamentals": fourSectionLesson(
    [
      "¿Por qué modulamos señales?",
      "Modulación analógica: AM y FM",
      "Modulación digital: PSK y QAM",
      "Constelaciones y BER en sistemas modernos",
    ],
    [
      "Modulación varía una portadora (alta frecuencia) según información. Permite multiplexar, adaptar medio y transmitir eficientemente. AM modula amplitud; FM modula frecuencia — radio broadcast clásico.",
      "Digital usa fases/discretos: BPSK, QPSK, 16-QAM, 256-QAM. Más puntos en constelación = más bits/s/Hz pero requiere mejor SNR. DOCSIS 3.1 y LTE usan QAM adaptativo — baja modulación lejos de celda, alta cerca.",
      "BER sube si ruido empuja símbolos a decisión incorrecta. FEC (Forward Error Correction) recupera bits. Técnico no calcula constelaciones pero interpreta: 'SNR bajo en CPE → modulación baja → throughput reducido' en ticket a NOC.",
      "Wi-Fi muestra MCS y QAM en analizadores; DOCSIS modems reportan downstream/upstream modulation. Documentar estos valores acelera escalamiento.",
    ],
    "Modulación codifica bits en portadora. QAM alto requiere buen SNR. Troubleshooting throughput incluye revisar modulación negociada.",
    "NOC pregunta: '¿Qué modulación reporta el modem?' — aprende leer status page: 256-QAM good; QPSK only indica planta degradada.",
    [
      { term: "QAM", definition: "Quadrature Amplitude Modulation — amplitud y fase combinadas." },
      { term: "PSK", definition: "Phase Shift Keying — modulación por fase." },
      { term: "FEC", definition: "Forward Error Correction — redundancia para corregir errores." },
      { term: "MCS", definition: "Modulation and Coding Scheme — índice Wi-Fi/LTE de modulación." },
    ],
    [
      { title: "LTE QAM Explained", url: "https://www.sharetechnote.com/html/Handbook_LTE_ModulationScheme.html", author: "ShareTechnote" },
    ],
  ),

  "multiplexing-tdm-fdm-ofdm": fourSectionLesson(
    [
      "Compartir medios: concepto de multiplexación",
      "TDM y FDM clásicos",
      "OFDM en Wi-Fi, LTE y 5G",
      "Trade-offs para el técnico",
    ],
    [
      "Multiplexación combina múltiples señales en un medio. TDM (Time Division) asigna slots temporales — T1 = 24 DS0. FDM (Frequency Division) separa bandas — radio AM/FM en kHz distintos.",
      "OFDM divide canal en subportadoras ortogonales — robusto contra multipath (reflexiones en edificios). Wi-Fi 802.11ax, LTE, 5G NR usan OFDM/OFDMA. OFDMA en Wi-Fi 6 asigna subportadoras por cliente — mejor en entornos densos.",
      "Latencia vs throughput: canales anchos OFDM entregan gigabit pero sensible a interferencia y distancia. En campo, interferencia en 2.4 GHz afecta subportadoras — se ve como throughput errático en iperf.",
      "Entender multiplexación explica por qué LTE 'caído' en un sector puede ser scheduler vs RF — técnico documenta espectro limpio vs congestión.",
    ],
    "TDM/FDM son clásicos; OFDM domina wireless moderno. Interferencia y multipath afectan subportadoras OFDM.",
    "Wi-Fi lento en piso 3: verifica co-channel APs en mismo canal OFDM — recomienda channel plan 1/6/11 en 2.4 GHz.",
    [
      { term: "OFDM", definition: "Orthogonal Frequency Division Multiplexing." },
      { term: "OFDMA", definition: "OFDM con asignación multi-usuario por subportadora." },
      { term: "Multipath", definition: "Señales reflejadas que llegan con retardo — desafío en indoor." },
    ],
    [
      { title: "802.11ax OFDMA", url: "https://www.wi-fi.org/discover-wi-fi/wi-fi-certified-6", author: "Wi-Fi Alliance" },
    ],
  ),

  "twisted-pair-categories": fourSectionLesson(
    [
      "Anatomía del par trenzado UTP",
      "Categorías Cat5e, Cat6, Cat6A, Cat8",
      "Crosstalk y límites de distancia",
      "Cable plenum vs riser — fire code",
    ],
    [
      "UTP (Unshielded Twisted Pair) usa pares trenzados para cancelar interferencia electromagnética. 4 pares = 8 conductores en RJ-45. T568A/B define orden de pares — consistencia evita split pairs.",
      "Cat5e: 1 Gbps hasta 100m. Cat6: 1 Gbps con mejor NEXT; 10G en distancias cortas. Cat6A: 10G full 100m, shielded opcional. Cat8: data center 40G, 30m max. Elegir categoría según spec del proyecto — over-engineering cuesta material.",
      "Crosstalk (NEXT/FEXT) degrada señal — empeora si cable amarrado demasiado apretado o doblado >4× diámetro. Certifier mide margen dB — PASS con headroom indica instalación profesional.",
      "Plenum (CMP) para ductos HVAC; riser (CMR) vertical entre pisos; LSZH en entornos sensibles. Violación de fire code invalida seguro del edificio — técnico verifica spec antes de instalar.",
    ],
    "Cat6A es estándar moderno para 10G; respetar bend radius y fire rating. Certifier valida headroom.",
    "Cliente pide Cat5e para ahorrar: explica 'Cat6A añama ~15% costo pero soporta 10G futuro — TIA recomienda no downgrade en obra nueva.'",
    [
      { term: "UTP", definition: "Unshielded Twisted Pair — cable de par trenzado sin blindaje." },
      { term: "NEXT", definition: "Near-End Crosstalk — interferencia medida en extremo transmisor." },
      { term: "Plenum", definition: "Espacio de aire HVAC — requiere cable CMP retardante de flama." },
    ],
    [
      { title: "TIA-568 Standards", url: "https://www.tiaonline.org/", author: "TIA" },
    ],
  ),

  "tia-568-standards": fourSectionLesson(
    [
      "TIA-568 y el estándar de cableado estructurado",
      "568A vs 568B — cuándo usar cada uno",
      "MDF, IDF y jerarquía de armarios",
      "TIA-606 administración y etiquetado",
    ],
    [
      "TIA-568 define cableado comercial: topología estrella, distancias máximas (90m horizontal + 10m patch), categorías de cable. ISO/IEC 11801 es equivalente internacional. Proyectos sin adherencia fallan certificación y auditorías.",
      "568A y 568B son pinouts de par — solo difieren orden verde/naranja. 568B es default USA; 568A legacy/gobierno. Consistencia en sitio importa más que cuál elegir — nunca mezclar en mismo canal.",
      "MDF (Main Distribution Frame) entrada del edificio; IDF (Intermediate) por piso. Backbone conecta MDF-IDF — fibra típicamente. Horizontal Cat6A de IDF a outlet. Técnico instala en IDF patch panels numerados.",
      "TIA-606 exige etiquetas en ambos extremos de cada cable — outlet 3-142 ↔ patch panel 3-142. As-built actualizado en software (Excel, netTerrain, o GIS ISP). Sin etiquetas, troubleshooting toma horas.",
    ],
    "TIA-568 define cómo cablear; TIA-606 define cómo etiquetar. Consistencia 568A/B y etiquetado bidireccional son employability skills.",
    "Primer día en obra: pregunta '¿MDF en sótano, IDF por piso? ¿Estándar de etiqueta del cliente?' — demuestra profesionalismo.",
    [
      { term: "MDF", definition: "Main Distribution Frame — punto principal de entrada telecom." },
      { term: "IDF", definition: "Intermediate Distribution Frame — armario de piso." },
      { term: "TIA-606", definition: "Estándar de administración y etiquetado de cableado." },
    ],
    [
      { title: "ANSI/TIA-568", url: "https://www.tiaonline.org/", author: "TIA" },
    ],
  ),

  "termination-testing-copper": fourSectionLesson(
    [
      "Terminación: crimpeo RJ-45 y punch-down 110",
      "Herramientas: crimper, punch-down, certifier",
      "Tone & probe para localizar pares",
      "Interpretar resultados PASS/FAIL del certifier",
    ],
    [
      "Crimpeo RJ-45: pelar 13mm, ordenar pares, insertar completamente, crimpar con strain relief. Punch-down en jack/panel: mantener par trenzado hasta punto de terminación — desparejar >13mm degrada NEXT.",
      "Certifier (Fluke DSX, Ideal LanTEK) mide wire map, length, NEXT, PSNEXT, ACR, return loss — compara vs límites Cat6A. PASS con asterisco indica marginal — documentar y re-terminar si margen <3 dB.",
      "Tone generator inyecta tono en par; probe localiza en bundle — esencial sin as-built. TDR integrado en certifier localiza falla a metros — 'open at 47m' acelera reparación.",
      "Fotos de terminación limpia en close-out. Retrabajo por mala terminación cuesta contractor dinero — primera vez correcta es KPI.",
    ],
    "Terminación limpia + certifier PASS = evidencia profesional. Tone/TDR aceleran localización de fallas.",
    "En lab NOVA, si certifier FAIL en par 3-6: revisa split pair antes de re-crimp completo — ahorra 20 minutos.",
    [
      { term: "Punch-down", definition: "Terminación en bloque 110/66 con herramienta impact." },
      { term: "Wire map", definition: "Verificación de continuidad par-a-par correcta." },
      { term: "TDR", definition: "Time Domain Reflectometer — localiza discontinuidades." },
    ],
    [
      { title: "Fluke Networks — Copper Testing", url: "https://www.flukenetworks.com/", author: "Fluke Networks" },
    ],
    {
      type: "terminal-lab",
      title: "Checklist terminación RJ-45",
      afterSection: 1,
    },
  ),

  "poe-standards-budgeting": fourSectionLesson(
    [
      "Power over Ethernet — concepto y estándares",
      "802.3af/at/bt: potencias y clases",
      "Budgeting en switch PoE",
      "Aplicaciones: AP, cámara, teléfono, IoT",
    ],
    [
      "PoE entrega DC sobre par de cobre activo — evita cableado eléctrico separado para APs y cámaras. PSE (switch/injector) alimenta PD (dispositivo). Negociación por clasificación detecta potencia requerida.",
      "802.3af (PoE): 15.4W max. 802.3at (PoE+): 30W. 802.3bt (PoE++): hasta 90W en 4 pares — PTZ cameras, displays. Type 3 vs Type 4 según pares activos.",
      "Switch 48-port PoE+ 740W budget: si cada AP usa 25W, máximo ~29 APs simultáneos — diseño debe calcular budget total vs demanda pico. Sobrecarga apaga puertos aleatoriamente — ticket intermitente difícil.",
      "Cable Cat5e mínimo para PoE+; Cat6A recomendado para PoE++ y distancias largas (calentamiento en bundle). Técnico verifica class negotiation en switch UI.",
    ],
    "PoE simplifica install de AP/cámara/phone. Calcular budget switch y usar cable adecuado para clase PoE.",
    "AP no enciende: verifica PoE budget switch antes de escalar a RMA — 'Puerto 24 disabled por power deny.'",
    [
      { term: "PSE", definition: "Power Sourcing Equipment — switch o injector PoE." },
      { term: "PD", definition: "Powered Device — equipo alimentado por PoE." },
      { term: "PoE budget", definition: "Watts totales disponibles en switch para alimentar PDs." },
    ],
    [
      { title: "IEEE 802.3bt PoE", url: "https://standards.ieee.org/", author: "IEEE" },
    ],
  ),
};

// Modules 4-9 — buildLesson with focused content
const additionalLessons = {
  "fiber-optics-principles": buildLesson({
    sections: [
      { heading: "Luz en fibra: reflexión total interna", body: "Fibra óptica guía luz por núcleo (core) rodeado de cladding con índice de refracción menor. Reflexión total interna confina photons — atenuación baja en ventanas 850/1310/1550 nm. Single-mode (9µm core) para larga distancia y DWDM; multimode (50/62.5µm) para corta distancia en campus/DC." },
      { heading: "Ventanas de transmisión y atenuación", body: "850 nm en MM para corto alcance; 1310 nm zero-dispersion en SM; 1550 nm mínima atenuación (~0.2 dB/km) — backbone y DWDM. Potencia medida en dBm (negativos típicos: -10 a -25 dBm en receptor)." },
      { heading: "Ventajas vs cobre", body: "Fibra: inmune EMI, mayor distancia, más bandwidth, sin chispa (intrínsecamente seguro en explosive environments). Desventaja: terminación más especializada, curvatura mínima (bend radius)." },
      { heading: "Aplicaciones entry-level", body: "FTTH drop, backbone edificio, cross-connect data center. Técnico instala, mide power, documenta pérdida de enlace vs budget." },
    ],
    summary: "Fibra guía luz por reflexión total; SM vs MM según distancia; medir dBm y respetar bend radius.",
    careerInsight: "Certificación ETA FOT-NP diferencia CV en contractors de fibra — NOVA College alinea módulo 4 a ese temario.",
    glossary: [
      { term: "Single-mode", definition: "Fibra de un modo — core ~9µm, larga distancia." },
      { term: "Multimode", definition: "Fibra multimodo — core 50/62.5µm, distancias cortas." },
      { term: "dBm", definition: "Potencia óptica logarítmica referida a 1 mW." },
    ],
    references: [{ title: "Corning — Fiber 101", url: "https://www.corning.com/optical-communications/worldwide/en/home/the-fiber/fiber-101.html", author: "Corning" }],
    visual: { type: "iot-schematic", title: "Cross-section fibra SM vs MM", afterSection: 0 },
  }),

  "connectors-splicing-loss": buildLesson({
    sections: [
      { heading: "Conectores LC, SC, APC vs UPC", body: "LC es estándar moderno data center; SC común en FTTH. APC (Angled Physical Contact) 8° reduce back-reflection — requerido en PON/GPON. UPC plano en patch cords genéricos. No mezclar APC/UPC en mismo enlace." },
      { heading: "Empalme por fusión vs mecánico", body: "Fusion splice funde fibras — pérdida <0.1 dB, requiere fusion splicer ($$$). Mechanical splice alinea fibras — 0.2–0.5 dB, kit portátil entry-level. NOVA lab usa mecánico; contractors usan fusión en producción." },
      { heading: "Pérdida de inserción y budget", body: "Cada conector ~0.3 dB, empalme ~0.1–0.5 dB. Enlace GPON budget ~28 dB total — calcular antes de instalar. Dirty connector es causa #1 de falla — limpiar con sticks IPA antes de medir." },
      { heading: "Buenas prácticas en campo", body: "Proteger fibras expuestas, caps en conectores, no mirar puertos activos (laser invisible 1310/1550). Documentar pérdida medida en close-out." },
    ],
    summary: "LC/SC, APC para PON, fusión vs mecánico, budget de pérdida y limpieza de conectores crítica.",
    careerInsight: "En entrevista fibra: 'Siempre limpio antes de medir — 80% de FAIL es conector sucio, no fibra mala.'",
    glossary: [
      { term: "APC", definition: "Conector con pulido angular 8° — baja reflectancia." },
      { term: "Insertion loss", definition: "Pérdida de potencia al unir dos fibras o conectar." },
      { term: "Fusion splice", definition: "Empalme por fusión con arco eléctrico." },
    ],
    references: [{ title: "ETA FOT-NP Outline", url: "https://etai.org/fiberoptics.html", author: "ETA" }],
  }),

  "otdr-power-meter": buildLesson({
    sections: [
      { heading: "Power meter y light source", body: "Método insertion loss: transmitir luz conocida, medir en extremo remoto con power meter — compara vs budget. Método A/B según TIA/IEC. Resultado en dB loss total." },
      { heading: "OTDR — qué muestra", body: "OTDR envía pulso y mide backscatter — grafica pérdida vs distancia. Eventos: conectores (spikes), empalmes (pérdida), curvas (macro-bend). Dead zone limita detectar eventos cercanos." },
      { heading: "Interpretar trazas", body: "Slope indica atenuación dB/km; eventos grandes = conector sucio o bad splice. Comparar traza bidireccional para confirmar. Técnico entry-level no opera OTDR avanzado pero lee reporte del senior." },
      { heading: "Cuándo escalar", body: "Pérdida > budget, evento desconocido a mitad de span, fibra rota — escalar con traza OTDR y GPS de poste/manhole." },
    ],
    summary: "Power meter para loss end-to-end; OTDR localiza eventos por distancia. Leer reportes OTDR es skill entry-level+.",
    careerInsight: "Adjunta screenshot OTDR limpio en ticket escalado — NOC resuelve 2x más rápido.",
    glossary: [
      { term: "OTDR", definition: "Optical Time Domain Reflectometer." },
      { term: "Backscatter", definition: "Luz reflejada por imperfecciones — señal del OTDR." },
      { term: "Dead zone", definition: "Distancia mínima tras pulso donde OTDR no resuelve eventos." },
    ],
    references: [{ title: "Fluke — OTDR Basics", url: "https://www.flukenetworks.com/", author: "Fluke" }],
    visual: { type: "troubleshooting-flowchart", title: "¿Power meter o OTDR?", afterSection: 1 },
  }),

  "ftth-backbone-applications": buildLesson({
    sections: [
      { heading: "FTTH y PON", body: "GPON/XGS-PON comparte fibra desde OLT en central hasta múltiples ONT con splitter 1:32. Downstream 2.5G/10G, upstream compartido. ONT en casa convierte a Ethernet/Wi-Fi/POTS." },
      { heading: "Drop cable y NID", body: "Drop desde tap/splitter en poste o pedestal hasta NID en fachada. Interior patch a router. Técnico instala, mide power en ONT, registra serial MAC." },
      { heading: "Backbone y data center", body: "MPO/MTP trunks 12/24 fibras entre racks. Color code TIA-598. Documentar cada strand en matrix." },
      { heading: "Aéreo vs subterráneo", body: "Aéreo en postes (latitudes rurales); subterráneo en urbano. Permisos, slack loops, handholes — coordinación obra civil." },
    ],
    summary: "FTTH usa PON con splitter; backbone DC usa MPO trunks. Drop install es trabajo entry-level masivo.",
    careerInsight: "FTTH installers en USA facturan por install — velocidad con calidad (power reading correcto) = más installs/día.",
    glossary: [
      { term: "OLT", definition: "Optical Line Terminal — terminal central PON." },
      { term: "GPON", definition: "Gigabit Passive Optical Network." },
      { term: "Splitter", definition: "Divisor óptico pasivo 1:N." },
    ],
    references: [{ title: "ITU-T G.984 GPON", url: "https://www.itu.int/", author: "ITU" }],
  }),

  "wifi-standards-survey": buildLesson({
    sections: [
      { heading: "Estándares 802.11", body: "Wi-Fi 5 (ac), Wi-Fi 6 (ax), Wi-Fi 6E (6 GHz), Wi-Fi 7 (be). MU-MIMO, OFDMA, 160 MHz channels. Backward compatible pero requiere AP y clientes compatibles para features nuevas." },
      { heading: "Site survey", body: "Predictivo (software) vs activo (walk-test con laptop). Medir RSSI, SNR, interferencia. Objetivo: -65 dBm voz, -67 dBm data; SNR >25 dB." },
      { heading: "Channel planning", body: "2.4 GHz: solo 1, 6, 11 no overlapping. 5 GHz: más canales; evitar DFS radar si no necesario. 6 GHz: espectro limpio Wi-Fi 6E." },
      { heading: "Documentación", body: "Heatmap PDF, AP locations en floor plan, channel/power settings — entregable estándar post-install." },
    ],
    summary: "802.11ax/6E, site survey activo, channel plan 1/6/11, heatmaps documentados.",
    careerInsight: "Ekahau o NetSpot en portafolio — muestra heatmap de lab NOVA en LinkedIn.",
    glossary: [
      { term: "MU-MIMO", definition: "Multi-User MIMO — AP sirve múltiples clientes simultáneos." },
      { term: "Site survey", definition: "Evaluación RF de cobertura Wi-Fi en sitio." },
    ],
    references: [{ title: "Ekahau Wi-Fi Design", url: "https://www.ekahau.com/", author: "Ekahau" }],
    visual: { type: "network-topology", title: "AP placement en piso", afterSection: 2 },
  }),

  "cellular-lte-5g-architecture": buildLesson({
    sections: [
      { heading: "RAN y Core", body: "eNodeB (LTE) / gNodeB (5G) en sitio — antenas en torre/rooftop. Core (EPC/5GC) autentica, rutea, factura. Técnico campo toca RAN side: coax, fiber to tower, RRH." },
      { heading: "LTE vs 5G NSA/SA", body: "NSA usa LTE anchor + 5G data; SA standalone 5G core. Bandas sub-6 vs mmWave — coverage vs capacity." },
      { heading: "Componentes en torre", body: "Antenna, RRH/RRU, baseband en ground shelter. Fiber fronthaul o coax legacy. TWR light — awareness only." },
      { heading: "Fixed Wireless Access", body: "5G CPE en ventana reemplaza DSL — install similar a satellite dish alignment." },
    ],
    summary: "RAN en torre, core en central; NSA vs SA; FWA 5G es install entry-level en algunos mercados.",
    careerInsight: "Tower work requiere certificación climbing — NOVA module 8 prepara awareness, no certifica climbing.",
    glossary: [
      { term: "gNodeB", definition: "Estación base 5G NR." },
      { term: "FWA", definition: "Fixed Wireless Access — internet inalámbrico fijo." },
      { term: "RRH", definition: "Remote Radio Head — radio en torre." },
    ],
    references: [{ title: "3GPP Specifications", url: "https://www.3gpp.org/", author: "3GPP" }],
  }),

  "antennas-cells-das": buildLesson({
    sections: [
      { heading: "Patrones de antena", body: "Omnidirectional vs sector (120°). Tilt mecánico/eléctrico controla cobertura. Azimuth apunta dirección sector." },
      { heading: "Small cells y DAS", body: "Small cell outdoor/indoor densifica red. DAS distribuye señal en estadio/hospital — feeder, antennas, remotes." },
      { heading: "Co-channel interference", body: "Sectores mal configurados se interfieren — tuning es ingeniería RF, técnico reporta síntomas (slow data en zona)." },
      { heading: "Safety RF", body: "Límites FCC/OSHA exposición RF cerca de antenas activas — señalización y exclusion zones." },
    ],
    summary: "Sectores, tilt, DAS indoor, RF safety awareness en sitios con antenas.",
    careerInsight: "Nunca trabajes frente a antena activa sin confirmar lock-out — pregunta al RF engineer.",
    glossary: [
      { term: "DAS", definition: "Distributed Antenna System — red indoor de antenas." },
      { term: "Tilt", definition: "Inclinación de antena para ajustar cobertura vertical." },
    ],
    references: [{ title: "FCC RF Safety", url: "https://www.fcc.gov/general/radio-frequency-safety-0", author: "FCC" }],
  }),

  "fixed-wireless-cbrs": buildLesson({
    sections: [
      { heading: "CBRS 3.5 GHz USA", body: "Banda compartida con SAS coordinando PAL/GAA access. Private LTE para campus, ports." },
      { heading: "Wi-Fi offload", body: "Carriers offload data a Wi-Fi en venues — integración con hotspot 2.0." },
      { heading: "Casos rural/urbano", body: "FWA 5G cierra digital divide rural; urbano compite con fiber donde disponible." },
      { heading: "Install implications", body: "CPE outdoor con línea de vista a torre — survey de señal RSRP antes de montar." },
    ],
    summary: "CBRS private LTE, FWA 5G, Wi-Fi offload — installs requieren survey RF previo.",
    careerInsight: "RSRP > -100 dBm típico mínimo LTE usable — documenta reading en install sheet.",
    glossary: [{ term: "RSRP", definition: "Reference Signal Received Power — potencia LTE medida." }],
    references: [{ title: "OnGo Alliance CBRS", url: "https://www.cbrsalliance.org/", author: "OnGo" }],
  }),

  "pstn-vs-voip-codecs": buildLesson({
    sections: [
      { heading: "Codecs de voz", body: "G.711 PCM 64 kbps sin compresión — calidad toll. G.729 8 kbps comprimido. MOS 1–5 score calidad percibida." },
      { heading: "Packetization", body: "Voz en frames 20ms típico — cada frame en RTP packet. Más frames = menos overhead pero más latency." },
      { heading: "Migración PSTN→SIP", body: "Retaining analog lines para fax/alarms mientras voz migra a SIP trunk." },
      { heading: "Troubleshooting audio", body: "Choppy audio → jitter buffer; one-way audio → NAT/firewall RTP." },
    ],
    summary: "G.711 vs G.729, MOS, packetization 20ms, one-way audio suele ser firewall/NAT.",
    careerInsight: "One-way audio: verifica pinholes RTP 10000-20000 UDP en firewall cliente.",
    glossary: [
      { term: "MOS", definition: "Mean Opinion Score — calidad de voz 1-5." },
      { term: "Codec", definition: "Codificador/decodificador de audio." },
    ],
    references: [{ title: "RFC 3551 — RTP Profile for Audio", url: "https://www.rfc-editor.org/rfc/rfc3551", author: "IETF" }],
  }),

  "sip-rtp-trunks": buildLesson({
    sections: [
      { heading: "SIP signaling", body: "INVITE, ACK, BYE establecen llamada. Registrar en proxy/registrar. URI sip:user@domain." },
      { heading: "RTP media", body: "Audio en UDP separado de SIP — ports negociados en SDP." },
      { heading: "SBC y trunks", body: "Session Border Controller normaliza SIP entre carrier y PBX — NAT traversal, security." },
      { heading: "E911 VoIP", body: "Dirección registrada para emergencias — obligatorio FCC en USA multi-line." },
    ],
    summary: "SIP señaliza, RTP transporta audio, SBC en border, E911 requerido en VoIP comercial.",
    careerInsight: "Wireshark filter 'sip || rtp' — skill diferenciador para NOC L1 promoción.",
    glossary: [
      { term: "SIP", definition: "Session Initiation Protocol." },
      { term: "SBC", definition: "Session Border Controller." },
      { term: "SDP", definition: "Session Description Protocol — negocia codecs/ports." },
    ],
    references: [{ title: "SIP RFC 3261", url: "https://www.rfc-editor.org/rfc/rfc3261", author: "IETF" }],
    visual: { type: "security-scenario", title: "Flujo SIP INVITE simplificado", afterSection: 0 },
  }),

  "cloud-pbx-uc": buildLesson({
    sections: [
      { heading: "PBX cloud", body: "Microsoft Teams Phone, Zoom Phone, RingCentral — sin hardware PBX onsite. Direct Routing conecta Teams a SIP trunk carrier." },
      { heading: "Licenciamiento", body: "Phone System license + Calling Plan o Direct Routing. Cost model per user/month." },
      { heading: "Integración UC", body: "Voz + video + chat + presence en una app — softphone en laptop/mobile." },
      { heading: "Install role", body: "Técnico configura phones IP, VLAN voz, QoS switch — cloud admin hace tenant config." },
    ],
    summary: "UC cloud elimina PBX físico; técnico entrega LAN/QoS/phones; admin cloud hace tenant.",
    careerInsight: "Teams Phone projects buscan técnicos que entiendan QoS + PowerShell básico para validación.",
    glossary: [{ term: "Direct Routing", definition: "Conectar Teams Phone a SIP trunk vía SBC." }],
    references: [{ title: "Microsoft Teams Phone", url: "https://learn.microsoft.com/microsoftteams/cloud-voice-landing-page", author: "Microsoft" }],
  }),

  "voip-qos-troubleshooting": buildLesson({
    sections: [
      { heading: "Métricas de calidad", body: "Latency <150ms one-way ideal; jitter <30ms; packet loss <1%. MOS cae rápido con loss." },
      { heading: "QoS en LAN", body: "DSCP EF (46) para voz en switches/APs. Trust boundary en phone ou switch port." },
      { heading: "Herramientas", body: "PingPlotter, iperf, phone built-in stats, Wireshark RTP analysis." },
      { heading: "Escalamiento WAN", body: "Si LAN limpia pero MOS bajo — problema en ISP uplink congestion — escalar con graphs." },
    ],
    summary: "Latency/jitter/loss definen MOS; QoS DSCP EF en LAN; separar LAN vs WAN issues.",
    careerInsight: "Antes de escalar carrier: iperf LAN + ping gateway — descarta Wi-Fi congestion local.",
    glossary: [
      { term: "Jitter", definition: "Variación de delay entre paquetes." },
      { term: "DSCP", definition: "Differentiated Services Code Point — marca QoS en IP header." },
    ],
    references: [{ title: "Cisco QoS for VoIP", url: "https://www.cisco.com/", author: "Cisco" }],
  }),

  "wan-circuits-dedicated": buildLesson({
    sections: [
      { heading: "Tipos de acceso", body: "DIA (Dedicated Internet Access) simétrico con SLA. Best-effort business broadband asimétrico. T1/E1 legacy 1.5/2 Mbps — aún en algunos sitios." },
      { heading: "SLA metrics", body: "Uptime 99.9% = ~8.7h downtime/año permitido. MTTR 4h típico. Credits si incumplen." },
      { heading: "Handoff", body: "Ethernet handoff en demarc RJ-45 o fiber. Router CPE del cliente termina WAN." },
      { heading: "Documentación", body: "Circuit ID, VLAN, IP block, gateway — sin esto NOC no puede escalar outage." },
    ],
    summary: "DIA vs broadband, SLA uptime/MTTR, circuit ID crítico para soporte.",
    careerInsight: "Foto de demarc con circuit ID visible — estándar en close-out WAN install.",
    glossary: [{ term: "DIA", definition: "Dedicated Internet Access — enlace dedicado simétrico." }],
    references: [{ title: "CompTIA Network+ WAN Objectives", url: "https://www.comptia.org/", author: "CompTIA" }],
  }),

  "mpls-metro-ethernet": buildLesson({
    sections: [
      { heading: "MPLS VPN", body: "L3 MPLS VPN — carrier enruta entre sitios con labels. Cliente ve routing simple; carrier maneja core." },
      { heading: "Metro Ethernet", body: "L2 service entre sitios — E-Line point-to-point, E-LAN multipoint. Handoff Ethernet estándar." },
      { heading: "Cuándo elegir", body: "MPLS premium latency garantizada multi-site; Metro-E más simple L2; SD-WAN compite en precio." },
      { heading: "Técnico role", body: "Instalar CPE router, verificar BGP/OSPF según diseño — config avanzada es ingeniero." },
    ],
    summary: "MPLS L3 VPN vs Metro-E L2; CPE install y verificación básica es rol técnico.",
    careerInsight: "Verifica link light y ping gateway CPE — 80% WAN tickets son físico/cable.",
    glossary: [{ term: "MPLS", definition: "Multiprotocol Label Switching." }],
    references: [{ title: "Metro Ethernet Forum", url: "https://www.mef.net/", author: "MEF" }],
  }),

  "sd-wan-intro": buildLesson({
    sections: [
      { heading: "Concepto SD-WAN", body: "Overlay sobre múltiples links (DIA + LTE backup). Controller central define policies. Zero-touch provisioning envía config a CPE." },
      { heading: "Path selection", body: "Aplicaciones críticas por link primario; bulk por secundario. Failover automático." },
      { heading: "vs MPLS", body: "SD-WAN reduce costo combinando broadband; MPLS aún preferido ultra-low latency en algunos sectores." },
      { heading: "Install", body: "CPE SD-WAN appliance en demarc — técnico cablea WAN1/WAN2/LAN, verifica en portal orchestrator." },
    ],
    summary: "SD-WAN overlay multi-link, ZTP, path selection por app — install CPE + cableado.",
    careerInsight: "VeloCloud/Versa/Fortinet SD-WAN certs valoradas — NOVA prepara base Network+.",
    glossary: [{ term: "ZTP", definition: "Zero-Touch Provisioning — config automática de CPE." }],
    references: [{ title: "MEF SD-WAN", url: "https://www.mef.net/", author: "MEF" }],
    visual: { type: "cloud-architecture", title: "SD-WAN multi-link overlay", afterSection: 0 },
  }),

  "peering-cpe-demarc": buildLesson({
    sections: [
      { heading: "Peering e IXPs", body: "Carriers intercambian tráfico en Internet Exchange Points — reduce latency vs transit." },
      { heading: "Submarine cables", body: "Backbone internacional — awareness para entender outages regionales." },
      { heading: "Demarc point", body: "Límite responsabilidad carrier vs cliente — smart jack, NID, MPO panel." },
      { heading: "Extension demarc", body: "Cliente puede extender con fiber/copper dentro de premisa — más allá demarc es planta cliente." },
    ],
    summary: "Demarc define responsabilidad; peering/IXP awareness para contexto outages.",
    careerInsight: "Pregunta en site: '¿Dónde termina planta del carrier?' — evita trabajar fuera de scope gratis.",
    glossary: [{ term: "IXP", definition: "Internet Exchange Point — intercambio de tráfico entre redes." }],
    references: [{ title: "TeleGeography Submarine Cable Map", url: "https://www.submarinecablemap.com/", author: "TeleGeography" }],
  }),

  "central-office-pop-edge": buildLesson({
    sections: [
      { heading: "Central Office", body: "Edificio carrier con switches, OLTs, DMS legacy. Acceso restringido — técnicos contractor con escolta." },
      { heading: "POP y meet-me room", body: "Point of Presence — intercambio carrier-carrier. Cross-connect entre racks en MMR." },
      { heading: "Edge data centers", body: "CDN caches, MEC 5G edge compute — más POPs cerca de usuarios." },
      { heading: "Power y redundancia", body: "-48V DC plant, battery + generator — awareness para field safety near CO." },
    ],
    summary: "CO/POP/MMR son nodos carrier; acceso controlado; edge DC crece con 5G/CDN.",
    careerInsight: "Badge CO access limpio — contractors pierden contratos por background check fail.",
    glossary: [{ term: "MMR", definition: "Meet-Me Room — sala de interconexión en data center." }],
    references: [{ title: "Data Center Knowledge", url: "https://www.datacenterknowledge.com/", author: "DCK" }],
  }),

  "tower-climbing-safety": buildLesson({
    sections: [
      { heading: "OSHA y 100% tie-off", body: "Trabajo >6 ft requiere protección caídas. Arnés, línea vida, anchor points certificados. 100% tie-off = siempre conectado al moverse en torre." },
      { heading: "RF exposure", body: "No permanecer frente a antena activa. Signage RF danger. FCC/OSHA limits." },
      { heading: "Certificaciones tower", body: "Competent Climber/Rescue, ANSI A10.48 — NOVA da awareness, no sustituye certificación." },
      { heading: "Bucket truck awareness", body: "Operación solo con certificación; técnico helper en suelo maneja herramientas/conos." },
    ],
    summary: "Tower work requiere tie-off, RF awareness, certs formales climbing — module es intro solamente.",
    careerInsight: "Tower crew helper sin climbing cert aún gana $18-22/hr aprendiendo — pathway a climber cert.",
    glossary: [{ term: "100% tie-off", definition: "Conectado a anchor en todo momento en altura." }],
    references: [{ title: "OSHA Fall Protection", url: "https://www.osha.gov/fall-protection", author: "OSHA" }],
  }),

  "field-dispatch-closeout": buildLesson({
    sections: [
      { heading: "Work order workflow", body: "Dispatch asigna ticket con SLA window. Técnico confirma ETA, parte con parts kit, llega onsite." },
      { heading: "Close-out package", body: "Fotos antes/después, serial numbers, test results, customer signature, time on site." },
      { heading: "GIS/as-built update", body: "ISPs grandes requieren update mapa en app móvil — drop location GPS exacto." },
      { heading: "First-call resolution", body: "Traer parts comunes (connectors, patch cords, ONT spare) evita segunda visita." },
    ],
    summary: "Dispatch→install→test→document→close-out. FCR y GIS update son KPIs directos.",
    careerInsight: "Incomplete close-out = no payment al contractor — revisa checklist antes de salir sitio.",
    glossary: [{ term: "FCR", definition: "First Call Resolution — resuelto en primera visita." }],
    references: [{ title: "Field Service Management Best Practices", url: "https://www.servicemax.com/", author: "ServiceMax" }],
  }),

  "customer-site-soft-skills": buildLesson({
    sections: [
      { heading: "Comunicación con cliente", body: "Explicar trabajo en lenguaje simple. Confirmar acceso, mascotas, áreas de trabajo. Respetar propiedad." },
      { heading: "Ventanas de mantenimiento", body: "Enterprise exige change windows — llegar tarde cancela acceso." },
      { heading: "Escalamiento a NOC", body: "Cuándo escalar vs resolver onsite — reglas claras evitan horas extra no pagadas." },
      { heading: "Professional appearance", body: "Uniforme, badge, vehículo identificado — representas carrier/contractor brand." },
    ],
    summary: "Soft skills en campo impactan CSAT y re-contratación del contractor.",
    careerInsight: "Cliente firma digital satisfecha = bonus en muchos contractors — trata cada site como auditoría.",
    glossary: [{ term: "CSAT", definition: "Customer Satisfaction Score." }],
    references: [],
  }),

  "telecom-troubleshooting-methodology": buildLesson({
    sections: [
      { heading: "Layer 1 físico", body: "¿Link light? ¿Cable dañado? ¿Power? Certifier/fiber meter primero." },
      { heading: "Layer 2 enlace", body: "VLAN, speed/duplex mismatch, STP blocking." },
      { heading: "Layer 3 IP", body: "Ping gateway, DNS, routing. Traceroute hacia destino." },
      { heading: "Layer 7 aplicación", body: "VoIP: SIP register OK? MOS? Separar capas evita rabbit holes." },
    ],
    summary: "Troubleshooting bottom-up L1→L7. Documentar cada capa verificada en ticket.",
    careerInsight: "Template ticket: 'L1 PASS certifier / L2 VLAN 100 correct / L3 ping fail → escalated WAN.'",
    glossary: [{ term: "OSI model", definition: "Modelo de 7 capas para troubleshooting sistemático." }],
    references: [{ title: "CompTIA Network+ Troubleshooting", url: "https://www.comptia.org/", author: "CompTIA" }],
    visual: { type: "troubleshooting-flowchart", title: "L1 → L7 decision tree", afterSection: 0 },
  }),

  "network-plus-telecom-domains": buildLesson({
    sections: [
      { heading: "Dominios Network+ relevantes", body: "1.0 Networking Concepts — OSI, topologies. 2.0 Network Implementation — cabling, Wi-Fi. 4.0 Network Security basics. 5.0 Troubleshooting." },
      { heading: "Mapa NOVA → Network+", body: "Módulos 3-5 cubren 2.0 implementation; módulo 7 cubre WAN; módulo 9 prep exam." },
      { heading: "PBQ tips", body: "Performance-based: subnetting, drag-drop topology, CLI show commands simulados." },
      { heading: "Post-curso path", body: "Voucher Network+ recomendado dentro 90 días post-graduación NOVA College." },
    ],
    summary: "NOVA Telecom cubre ~60% Network+ implementation/troubleshooting — complementar con subnetting extra.",
    careerInsight: "Network+ + NOVA-COL-TEL cert verificable = combo fuerte para ISP entry applications.",
    glossary: [{ term: "PBQ", definition: "Performance-Based Questions en examen CompTIA." }],
    references: [{ title: "CompTIA Network+ N10-008", url: "https://www.comptia.org/certifications/network", author: "CompTIA" }],
  }),
};

/** Unified lesson content map for attachContentToModules. */
export const INTRO_TELECOM_LESSONS = {
  ...baseTelecomLessons,
  ...additionalLessons,
};
