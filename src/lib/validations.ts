import { z } from "zod";
import { GENDER_VALUES } from "@/lib/student-registration";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
    role: z.enum(["STUDENT", "MENTOR", "PARENT"]).default("STUDENT"),
    middleName: z.string().optional(),
    dateOfBirth: z.string().optional(),
    phone: z.string().optional(),
    gender: z.union([z.enum(GENDER_VALUES), z.literal("")]).optional(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    stateProvince: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    emergencyContactName: z.string().optional(),
    emergencyContactPhone: z.string().optional(),
    emergencyContactRelation: z.string().optional(),
    guardianName: z.string().optional(),
    guardianEmail: z.string().optional(),
    guardianPhone: z.string().optional(),
    currentSchoolName: z.string().optional(),
    gradeLevel: z.string().optional(),
    graduationYear: z.string().optional(),
    preferredLanguage: z.enum(["en", "es", "pt"]).default("en"),
    howHeardAboutNova: z.string().optional(),
    acceptTerms: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }

    if (data.role !== "STUDENT") return;

    const required: { key: keyof typeof data; label: string }[] = [
      { key: "dateOfBirth", label: "Date of birth" },
      { key: "phone", label: "Phone number" },
      { key: "streetAddress", label: "Street address" },
      { key: "city", label: "City" },
      { key: "stateProvince", label: "State / province" },
      { key: "country", label: "Country" },
      { key: "postalCode", label: "Postal / ZIP code" },
      { key: "emergencyContactName", label: "Emergency contact name" },
      { key: "emergencyContactPhone", label: "Emergency contact phone" },
      { key: "emergencyContactRelation", label: "Emergency contact relationship" },
      { key: "guardianName", label: "Parent / guardian name" },
      { key: "guardianEmail", label: "Parent / guardian email" },
      { key: "guardianPhone", label: "Parent / guardian phone" },
      { key: "currentSchoolName", label: "Current school or institution" },
      { key: "gradeLevel", label: "Grade level" },
      { key: "graduationYear", label: "Expected graduation year" },
    ];

    for (const field of required) {
      const val = data[field.key];
      if (!val || (typeof val === "string" && val.trim().length === 0)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${field.label} is required for student registration`,
          path: [field.key],
        });
      }
    }

    if (data.guardianEmail && !z.string().email().safeParse(data.guardianEmail).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid guardian email",
        path: ["guardianEmail"],
      });
    }

    if (!data.acceptTerms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must accept the terms to register",
        path: ["acceptTerms"],
      });
    }
  });

export const submissionSchema = z.object({
  content: z.string().min(10, "Submission must be at least 10 characters"),
  assignmentId: z.string().min(1),
});

export const scholarshipApplySchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  age: z.number().int().min(16, "You must be at least 16 years old").max(99),
  country: z.string().min(2, "Country is required"),
  trackInterest: z.string().min(1, "Select a track"),
  whyNeedScholarship: z
    .string()
    .min(20, "Tell us more about your situation (minimum 20 characters)"),
  institution: z.string().optional(),
  programId: z.string().min(1, "Select a scholarship program"),
});

export const scholarshipApplySchemaEs = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Ingresa un correo válido"),
  age: z.number().int().min(16, "Debes tener al menos 16 años").max(99),
  country: z.string().min(2, "El país es requerido"),
  trackInterest: z.string().min(1, "Selecciona un track"),
  whyNeedScholarship: z
    .string()
    .min(20, "Cuéntanos más sobre tu situación (mínimo 20 caracteres)"),
  institution: z.string().optional(),
  programId: z.string().min(1, "Selecciona un programa de beca"),
});

const partnershipApplyFieldsEn = {
  institutionName: z.string().min(2, "Institution name is required"),
  legalName: z.string().optional(),
  institutionType: z.string().min(1, "Select institution type"),
  website: z.string().url("Enter a valid website URL").optional().or(z.literal("")),
  taxId: z.string().optional(),
  yearEstablished: z.string().optional(),
  streetAddress: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  stateProvince: z.string().min(2, "State / province is required"),
  postalCode: z.string().min(2, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  contactName: z.string().min(2, "Primary contact name is required"),
  contactRole: z.string().min(2, "Role / title is required"),
  email: z.string().email("Enter a valid work email address"),
  phone: z.string().min(7, "Phone number is required"),
  billingContactName: z.string().min(2, "Billing contact name is required"),
  billingEmail: z.string().email("Enter a valid billing email"),
  billingPhone: z.string().min(7, "Billing phone is required"),
  decisionMakerName: z.string().min(2, "Decision maker name is required"),
  decisionMakerTitle: z.string().min(2, "Decision maker title is required"),
  decisionMakerEmail: z.string().email("Enter a valid decision maker email"),
  productInterest: z.enum(["school", "college", "both"]),
  estimatedStudents: z
    .number()
    .int()
    .min(1, "Enter estimated students")
    .max(100000),
  studentAgeRange: z.string().min(1, "Select student age range"),
  targetLaunchDate: z.string().min(4, "Target launch date is required"),
  contractTerm: z.string().min(1, "Select preferred contract term"),
  budgetRange: z.string().min(1, "Select budget range"),
  currentStemOfferings: z
    .string()
    .min(10, "Describe current STEM offerings (minimum 10 characters)"),
  hardwareInfrastructure: z.string().min(1, "Select hardware / infrastructure status"),
  message: z
    .string()
    .min(30, "Tell us about your goals and timeline (minimum 30 characters)"),
  paymentMethod: z
    .enum(["STRIPE", "WIRE_TRANSFER", "ZELLE", "VENMO", "PAYPAL", "OTHER"])
    .optional(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the partnership terms" }),
  }),
};

const partnershipApplyFieldsEs = {
  institutionName: z.string().min(2, "El nombre de la institución es requerido"),
  legalName: z.string().optional(),
  institutionType: z.string().min(1, "Selecciona el tipo de institución"),
  website: z.string().url("Ingresa una URL válida").optional().or(z.literal("")),
  taxId: z.string().optional(),
  yearEstablished: z.string().optional(),
  streetAddress: z.string().min(3, "La dirección es requerida"),
  city: z.string().min(2, "La ciudad es requerida"),
  stateProvince: z.string().min(2, "Estado / provincia es requerido"),
  postalCode: z.string().min(2, "Código postal es requerido"),
  country: z.string().min(2, "El país es requerido"),
  contactName: z.string().min(2, "Nombre del contacto principal es requerido"),
  contactRole: z.string().min(2, "El cargo es requerido"),
  email: z.string().email("Ingresa un correo institucional válido"),
  phone: z.string().min(7, "El teléfono es requerido"),
  billingContactName: z.string().min(2, "Nombre del contacto de facturación es requerido"),
  billingEmail: z.string().email("Ingresa un correo de facturación válido"),
  billingPhone: z.string().min(7, "Teléfono de facturación es requerido"),
  decisionMakerName: z.string().min(2, "Nombre del responsable de decisión es requerido"),
  decisionMakerTitle: z.string().min(2, "Cargo del responsable es requerido"),
  decisionMakerEmail: z.string().email("Ingresa un correo válido del responsable"),
  productInterest: z.enum(["school", "college", "both"]),
  estimatedStudents: z
    .number()
    .int()
    .min(1, "Ingresa estudiantes estimados")
    .max(100000),
  studentAgeRange: z.string().min(1, "Selecciona rango de edades"),
  targetLaunchDate: z.string().min(4, "Fecha objetivo de lanzamiento es requerida"),
  contractTerm: z.string().min(1, "Selecciona término de contrato"),
  budgetRange: z.string().min(1, "Selecciona rango de presupuesto"),
  currentStemOfferings: z
    .string()
    .min(10, "Describe la oferta STEM actual (mínimo 10 caracteres)"),
  hardwareInfrastructure: z.string().min(1, "Selecciona estado de infraestructura"),
  message: z
    .string()
    .min(30, "Cuéntanos tus objetivos y cronograma (mínimo 30 caracteres)"),
  paymentMethod: z
    .enum(["STRIPE", "WIRE_TRANSFER", "ZELLE", "VENMO", "PAYPAL", "OTHER"])
    .optional(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos del partnership" }),
  }),
};

export const partnershipApplySchema = z.object(partnershipApplyFieldsEn);
export const partnershipApplySchemaEs = z.object(partnershipApplyFieldsEs);

export const partnerScholarshipApplySchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  age: z.number().int().min(16, "You must be at least 16 years old").max(99),
  country: z.string().min(2, "Country is required"),
  trackInterest: z.string().min(1, "Select a track or program area"),
  partnerCategory: z.enum(["tech-company", "community-college", "university", "ngo", "other"]),
  whyNeedScholarship: z.string().min(20, "Tell us more (minimum 20 characters)"),
  referrerOrg: z.string().optional(),
});

export const partnerScholarshipApplySchemaEs = partnerScholarshipApplySchema;

export const internshipApplySchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  age: z.number().int().min(16, "You must be at least 16 years old").max(99),
  country: z.string().min(2, "Country is required"),
  trackInterest: z.string().min(1, "Select an area of interest"),
  availability: z.enum(["summer-full", "part-time", "remote", "flexible"]),
  portfolioUrl: z.string().optional(),
  whyInterested: z.string().min(20, "Tell us more (minimum 20 characters)"),
});

export const internshipApplySchemaEs = internshipApplySchema;

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type SubmissionInput = z.infer<typeof submissionSchema>;
export type ScholarshipApplyInput = z.infer<typeof scholarshipApplySchema>;
