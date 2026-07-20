/**
 * Spanish catalog copy for NOVA School — /es/school/* routes.
 */

export const NOVA_SCHOOL_PAGE_ES = {
  heroDescription:
    "Nueve electivas para Exploradores de secundaria — STEM basado en proyectos, Mentores de Innovación y Mission Paths que convierten la curiosidad en construcciones reales.",
  electivesSectionTitle: "Electivas escolares",
  electivesSectionSubtitle:
    "9 programas juveniles · 8–16 años · misiones estructuradas, buddies y sesiones mensuales con mentores",
  missionPathsTitle: "Mission Paths",
  missionPathsBody:
    "Tres aventuras STEM inmersivas — Coding & AI, Robotics e IoT — con misiones interactivas Explore Now y builds guiados por mentores.",
  missionPathsCta: "Explorar Mission Paths",
  portalTitle: "Portal NOVA School",
  portalBody:
    "Para Exploradores, Mentores de Innovación y administradores — seguimiento de misiones, quests y progreso.",
  b2bTitle: "Licencia NOVA School para tu institución",
  b2bBody:
    "Catálogo de electivas + plataforma + guía del facilitador. Sin expertos STEM internos requeridos.",
  b2bCta: "Contactar NOVA STEM HUB",
} as const;

export const NOVA_SCHOOL_ELECTIVES_ES: Record<
  string,
  Pick<{ title: string; tagline: string; description: string }, "title" | "tagline" | "description">
> = {
  "gaming-game-design": {
    title: "Gaming y Diseño de Juegos",
    tagline: "De jugador a creador — diseña niveles, personajes y mundos jugables.",
    description:
      "Los Exploradores aprenden game loops, diseño de niveles y código básico con proyectos tipo Scratch y Unity — juegos listos para portafolio.",
  },
  "digital-marketing": {
    title: "Marketing Digital y Redes Sociales",
    tagline: "Cuenta historias que se comparten — marca, contenido y analítica para jóvenes creadores.",
    description:
      "Electiva práctica: marca personal, campañas sociales, contenido visual y ciudadanía digital ética.",
  },
  "startup-business": {
    title: "Startup e Innovación Empresarial",
    tagline: "De la idea al pitch — emprendimiento, prototipos y resolución de problemas.",
    description:
      "Los Exploradores desarrollan una mini-startup real: identifican un problema, construyen un prototipo y presentan a mentores.",
  },
  "coding-ai": {
    title: "Coding & AI",
    tagline: "Python, algoritmos y conceptos de IA — del primer script a proyectos inteligentes.",
    description:
      "Alineado al Mission Path Coding & AI. Fundamentos de programación, pensamiento computacional y descubrimiento de IA.",
  },
  "robotics-engineering": {
    title: "Introducción a la Robótica",
    tagline: "Diseña, conecta y programa robots — del boceto al bot autónomo.",
    description:
      "Alineado al Mission Path Robotics. Electrónica, microcontroladores, builds ESP32 y retos de diseño con simulación Wokwi.",
  },
  "iot-smart-systems": {
    title: "IoT y Sistemas Inteligentes",
    tagline: "Sensores, conectividad y dispositivos inteligentes — construye el mundo conectado.",
    description:
      "Alineado al Mission Path IoT. Sensores, sistemas inalámbricos, dashboards en la nube y proyectos de automatización.",
  },
  "digital-content-creation": {
    title: "Creación de Contenido Digital",
    tagline: "Video, diseño y medios — crea historias que inspiran e informan.",
    description:
      "Los Exploradores producen videos, gráficos y portafolios multimedia con herramientas inspiradas en la industria.",
  },
  "cybersecurity-basics": {
    title: "Fundamentos de Ciberseguridad para Adolescentes",
    tagline: "Defiende tu vida digital — contraseñas, privacidad, phishing e intro al hacking ético.",
    description:
      "Electiva de seguridad apropiada para la edad: hábitos seguros en línea, conciencia de amenazas y responsabilidad ética digital.",
  },
  "creative-tech-social-impact-teens": {
    title: "Tech Creativa e Impacto Social para Adolescentes",
    tagline:
      "Diseño, creatividad y propósito — un camino STEAM acogedor para adolescentes que exploran STEM más allá de cables y código.",
    description:
      "Electiva creativa para adolescentes: design thinking, coding creativo con Scratch, narrativa digital, modelos STEM diversos y proyectos de equipo que resuelven problemas comunitarios reales.",
  },
};

export function getSchoolElectiveEs(slug: string) {
  return NOVA_SCHOOL_ELECTIVES_ES[slug];
}
