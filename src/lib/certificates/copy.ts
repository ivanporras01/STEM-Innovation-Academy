import {
  MAX_ASSESSMENT_ATTEMPTS,
  PASSING_SCORE_PERCENT,
} from "@/lib/certificates/constants";
import type { AppLocale } from "@/lib/locale";

export type CertificateTemplateCopy = {
  hub: string;
  onlineCourse: string;
  location: string;
  org: string;
  subtitle: string;
  title: string;
  certifies: string;
  completed: string;
  achievement: string;
  institutional: string;
  excellence: string;
  assessment: string;
  minimum: string;
  date: string;
  issued: string;
  verifyCode: string;
  verifyCertificate: string;
  scanToVerify: string;
  academicDirector: string;
  programDirector: string;
  verified: string;
  novaCertified: string;
  sampleBanner: string;
  categoryLabel: string;
  levelLabel: string;
  hoursLabel: string;
};

export const CERTIFICATE_TEMPLATE_COPY: Record<AppLocale, CertificateTemplateCopy> = {
  en: {
    hub: "NOVA STEM HUB",
    onlineCourse: "Online Course",
    location: "Miami, FL, USA",
    org: "STEM Innovation Academy",
    subtitle: "NOVA STEM HUB",
    title: "Certificate of Achievement",
    certifies: "This certifies that",
    completed: "Has successfully completed all academic and practical requirements established by NOVA STEM HUB and demonstrated competency in the knowledge and skills required for this program.",
    achievement: "Has successfully completed all academic and practical requirements established by NOVA STEM HUB and demonstrated competency in the knowledge and skills required for this program.",
    institutional: "Designed with advanced AI, aligned with industry standards, and developed in collaboration with leading subject matter experts.",
    excellence: "Demonstrating dedication, knowledge, and skills in Science, Technology, Engineering, and Mathematics through innovation and excellence.",
    assessment: "Final Exam Score",
    minimum: `Minimum Passing: ${PASSING_SCORE_PERCENT}%`,
    date: "Date of Issuance",
    issued: "Official certificate",
    verifyCode: "Verification code",
    verifyCertificate: "Verify certificate",
    scanToVerify: "Scan QR code or visit:",
    academicDirector: "Academic Director",
    programDirector: "Program Director",
    verified: "Verified",
    novaCertified: "NOVA Certified",
    sampleBanner: "SAMPLE",
    categoryLabel: "Category",
    levelLabel: "Level",
    hoursLabel: "Learning Hours",
  },
  es: {
    hub: "NOVA STEM HUB",
    onlineCourse: "Online Course",
    location: "Miami, FL, USA",
    org: "STEM Innovation Academy",
    subtitle: "NOVA STEM HUB",
    title: "Certificado de Logro",
    certifies: "Esto certifica que",
    completed: "Ha completado satisfactoriamente todos los requisitos académicos y prácticos establecidos por NOVA STEM HUB y ha demostrado competencia en los conocimientos y habilidades requeridos para este programa.",
    achievement: "Ha completado satisfactoriamente todos los requisitos académicos y prácticos establecidos por NOVA STEM HUB y ha demostrado competencia en los conocimientos y habilidades requeridos para este programa.",
    institutional: "Diseñado con inteligencia artificial avanzada, alineado con estándares de la industria y desarrollado en colaboración con expertos en la materia líderes.",
    excellence: "Demostrando dedicación, conocimiento y habilidades en Ciencia, Tecnología, Ingeniería y Matemáticas mediante innovación y excelencia.",
    assessment: "Calificación final",
    minimum: `Mínimo para aprobar: ${PASSING_SCORE_PERCENT}%`,
    date: "Fecha de emisión",
    issued: "Certificado oficial",
    verifyCode: "Código de verificación",
    verifyCertificate: "Verificar certificado",
    scanToVerify: "Escanea el código QR o visita:",
    academicDirector: "Director Académico",
    programDirector: "Director del Programa",
    verified: "Verificado",
    novaCertified: "NOVA Certificado",
    sampleBanner: "MUESTRA",
    categoryLabel: "Categoría",
    levelLabel: "Nivel",
    hoursLabel: "Horas de aprendizaje",
  },
  pt: {
    hub: "NOVA STEM HUB",
    onlineCourse: "Online Course",
    location: "Miami, FL, USA",
    org: "STEM Innovation Academy",
    subtitle: "NOVA STEM HUB",
    title: "Certificado de Conquista",
    certifies: "Isto certifica que",
    completed: "Concluiu com êxito todos os requisitos acadêmicos e práticos estabelecidos pela NOVA STEM HUB e demonstrou competência nos conhecimentos e habilidades exigidos para este programa.",
    achievement: "Concluiu com êxito todos os requisitos acadêmicos e práticos estabelecidos pela NOVA STEM HUB e demonstrou competência nos conhecimentos e habilidades exigidos para este programa.",
    institutional: "Projetado com IA avançada, alinhado aos padrões do setor e desenvolvido em colaboração com especialistas líderes.",
    excellence: "Demonstrando dedicação, conhecimento e habilidades em Ciência, Tecnologia, Engenharia e Matemática por meio da inovação e excelência.",
    assessment: "Nota do exame final",
    minimum: `Mínimo para aprovação: ${PASSING_SCORE_PERCENT}%`,
    date: "Data de emissão",
    issued: "Certificado oficial",
    verifyCode: "Código de verificação",
    verifyCertificate: "Verificar certificado",
    scanToVerify: "Escaneie o código QR ou visite:",
    academicDirector: "Diretor Acadêmico",
    programDirector: "Diretor do Programa",
    verified: "Verificado",
    novaCertified: "NOVA Certificado",
    sampleBanner: "AMOSTRA",
    categoryLabel: "Categoria",
    levelLabel: "Nível",
    hoursLabel: "Horas de aprendizagem",
  },
};

export type CertificatePromoCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  placeholderName: string;
  sampleProgram: string;
  requirements: Array<{ label: string; detail: string }>;
  verifyCta: string;
  sampleNote: string;
  downloadSample: string;
  viewSample: string;
};

export const CERTIFICATE_PROMO_COPY: Record<AppLocale, CertificatePromoCopy> = {
  en: {
    eyebrow: "Official, verifiable certificate",
    title: "Earn your NOVA STEM HUB Certificate of Achievement",
    subtitle:
      "Complete your program and pass the final assessment to receive an official, verifiable certificate you can share with schools, colleges, and employers.",
    placeholderName: "Your Name",
    sampleProgram: "NOVA STEM Program",
    requirements: [
      {
        label: `${PASSING_SCORE_PERCENT}% minimum score`,
        detail: "Pass the final innovation check",
      },
      {
        label: `${MAX_ASSESSMENT_ATTEMPTS} attempts included`,
        detail: "Three chances to demonstrate mastery",
      },
      {
        label: "Unique verification code",
        detail: "Anyone can confirm authenticity at /verify",
      },
    ],
    verifyCta: "Verify a certificate",
    sampleNote: "Preview only — not valid for verification",
    downloadSample: "Download sample PDF",
    viewSample: "View full sample",
  },
  es: {
    eyebrow: "Tu logro te espera",
    title: "Obtén tu Certificado de Logro NOVA",
    subtitle:
      "Al completar tu programa y aprobar el examen final recibirás un certificado oficial y verificable que puedes compartir con escuelas, universidades y empleadores.",
    placeholderName: "Tu Nombre",
    sampleProgram: "Programa NOVA STEM",
    requirements: [
      {
        label: `${PASSING_SCORE_PERCENT}% mínimo`,
        detail: "Aprueba la evaluación final de innovación",
      },
      {
        label: `${MAX_ASSESSMENT_ATTEMPTS} intentos incluidos`,
        detail: "Tres oportunidades para demostrar dominio",
      },
      {
        label: "Código único de verificación",
        detail: "Cualquiera puede confirmar en /verify",
      },
    ],
    verifyCta: "Verificar un certificado",
    sampleNote: "Vista previa — no válido para verificación",
    downloadSample: "Descargar PDF de muestra",
    viewSample: "Ver muestra completa",
  },
  pt: {
    eyebrow: "Sua conquista espera por você",
    title: "Obtenha seu Certificado de Conquista NOVA",
    subtitle:
      "Ao concluir seu programa e passar na avaliação final, você receberá um certificado oficial e verificável para compartilhar com escolas, universidades e empregadores.",
    placeholderName: "Seu Nome",
    sampleProgram: "Programa NOVA STEM",
    requirements: [
      {
        label: `${PASSING_SCORE_PERCENT}% mínimo`,
        detail: "Aprove a avaliação final de inovação",
      },
      {
        label: `${MAX_ASSESSMENT_ATTEMPTS} tentativas incluídas`,
        detail: "Três chances para demonstrar domínio",
      },
      {
        label: "Código único de verificação",
        detail: "Qualquer pessoa pode confirmar em /verify",
      },
    ],
    verifyCta: "Verificar certificado",
    sampleNote: "Pré-visualização — não válido para verificação",
    downloadSample: "Baixar PDF de amostra",
    viewSample: "Ver amostra completa",
  },
};

export type CertificateSampleToolbarCopy = {
  title: string;
  print: string;
  download: string;
  hint: string;
  verify: string;
  languageLabel: string;
};

export const CERTIFICATE_SAMPLE_TOOLBAR_COPY: Record<
  AppLocale,
  CertificateSampleToolbarCopy
> = {
  en: {
    title: "Sample certificate — not valid for verification",
    print: "Save as PDF (print dialog)",
    download: "Download sample PDF",
    hint: "In the print dialog, choose Save as PDF. Landscape orientation recommended.",
    verify: "Verify certificate",
    languageLabel: "Language",
  },
  es: {
    title: "Certificado de muestra — no válido para verificación",
    print: "Guardar como PDF (diálogo de impresión)",
    download: "Descargar PDF de muestra",
    hint: 'En el diálogo de impresión, elige "Guardar como PDF". Orientación horizontal recomendada.',
    verify: "Verificar certificado",
    languageLabel: "Idioma",
  },
  pt: {
    title: "Certificado de amostra — não válido para verificação",
    print: "Salvar como PDF (diálogo de impressão)",
    download: "Baixar PDF de amostra",
    hint: 'No diálogo de impressão, escolha "Salvar como PDF". Orientação horizontal recomendada.',
    verify: "Verificar certificado",
    languageLabel: "Idioma",
  },
};

export const CERTIFICATE_SAMPLE_PLACEHOLDER: Record<
  AppLocale,
  { name: string; program: string }
> = {
  en: { name: "Your Name", program: "NOVA STEM Program" },
  es: { name: "Your Name", program: "NOVA STEM Program" },
  pt: { name: "Your Name", program: "NOVA STEM Program" },
};

/** Certificate template labels are always English (USA-based NOVA STEM HUB). */
export function getCertificateTemplateCopy(): CertificateTemplateCopy {
  return CERTIFICATE_TEMPLATE_COPY.en;
}

export function getCertificatePromoCopy(locale: AppLocale): CertificatePromoCopy {
  return CERTIFICATE_PROMO_COPY[locale] ?? CERTIFICATE_PROMO_COPY.en;
}

export function getCertificateSampleToolbarCopy(
  locale: AppLocale,
): CertificateSampleToolbarCopy {
  return CERTIFICATE_SAMPLE_TOOLBAR_COPY[locale] ?? CERTIFICATE_SAMPLE_TOOLBAR_COPY.en;
}
