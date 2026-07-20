import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { enforceRateLimit } from "@/lib/api-rate-limit";
import { isInstitutionPaymentMethod } from "@/lib/payments/payment-methods";
import { partnershipApplySchema, partnershipApplySchemaEs } from "@/lib/validations";

const APPLICATIONS_DIR = path.join(process.cwd(), "data", "partnership-applications");
const APPLICATIONS_FILE = path.join(APPLICATIONS_DIR, "applications.jsonl");

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "partnerships-apply", 8, 60_000);
  if (limited) return limited;

  try {
    const body = await request.json();
    const { locale, ...fields } = body;
    const schema = locale === "es" ? partnershipApplySchemaEs : partnershipApplySchema;
    const parsed = schema.safeParse(fields);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid data" },
        { status: 400 },
      );
    }

    const paymentMethod =
      parsed.data.paymentMethod && isInstitutionPaymentMethod(parsed.data.paymentMethod)
        ? parsed.data.paymentMethod
        : undefined;

    const record = await db.partnershipApplication.create({
      data: {
        institutionName: parsed.data.institutionName,
        legalName: parsed.data.legalName || null,
        institutionType: parsed.data.institutionType,
        website: parsed.data.website || null,
        taxId: parsed.data.taxId || null,
        yearEstablished: parsed.data.yearEstablished || null,
        streetAddress: parsed.data.streetAddress,
        stateProvince: parsed.data.stateProvince,
        postalCode: parsed.data.postalCode,
        contactName: parsed.data.contactName,
        contactRole: parsed.data.contactRole,
        email: parsed.data.email,
        phone: parsed.data.phone,
        billingContactName: parsed.data.billingContactName,
        billingEmail: parsed.data.billingEmail,
        billingPhone: parsed.data.billingPhone,
        decisionMakerName: parsed.data.decisionMakerName,
        decisionMakerTitle: parsed.data.decisionMakerTitle,
        decisionMakerEmail: parsed.data.decisionMakerEmail,
        country: parsed.data.country,
        city: parsed.data.city,
        productInterest: parsed.data.productInterest,
        estimatedStudents: parsed.data.estimatedStudents,
        studentAgeRange: parsed.data.studentAgeRange,
        targetLaunchDate: parsed.data.targetLaunchDate,
        contractTerm: parsed.data.contractTerm,
        budgetRange: parsed.data.budgetRange,
        currentStemOfferings: parsed.data.currentStemOfferings,
        hardwareInfrastructure: parsed.data.hardwareInfrastructure,
        message: parsed.data.message,
        locale: locale === "es" ? "es" : "en",
        paymentMethod,
        termsAcceptedAt: parsed.data.acceptTerms ? new Date() : null,
      },
    });

    console.log("[partnership-application]", JSON.stringify(record));

    try {
      await mkdir(APPLICATIONS_DIR, { recursive: true });
      await appendFile(
        APPLICATIONS_FILE,
        `${JSON.stringify({ ...record, submittedAt: record.submittedAt.toISOString() })}\n`,
        "utf-8",
      );
    } catch (fileError) {
      console.warn("[partnership-application] file write skipped:", fileError);
    }

    return NextResponse.json({ success: true, id: record.id });
  } catch {
    return NextResponse.json(
      { error: "We couldn't process your registration. Please try again." },
      { status: 500 },
    );
  }
}
