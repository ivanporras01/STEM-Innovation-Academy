import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { enforceRateLimit } from "@/lib/api-rate-limit";
import { scholarshipApplySchema, scholarshipApplySchemaEs } from "@/lib/validations";

const APPLICATIONS_DIR = path.join(process.cwd(), "data", "scholarship-applications");
const APPLICATIONS_FILE = path.join(APPLICATIONS_DIR, "applications.jsonl");

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "scholarships-apply", 8, 60_000);
  if (limited) return limited;

  try {
    const body = await request.json();
    const { locale, ...fields } = body;
    const schema = locale === "es" ? scholarshipApplySchemaEs : scholarshipApplySchema;
    const parsed = schema.safeParse(fields);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid data" },
        { status: 400 },
      );
    }

    const application = {
      ...parsed.data,
      locale: locale === "es" ? "es" : "en",
      submittedAt: new Date().toISOString(),
      id: `beca-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };

    console.log("[scholarship-application]", JSON.stringify(application));

    try {
      await mkdir(APPLICATIONS_DIR, { recursive: true });
      await appendFile(APPLICATIONS_FILE, `${JSON.stringify(application)}\n`, "utf-8");
    } catch (fileError) {
      console.warn("[scholarship-application] file write skipped:", fileError);
    }

    return NextResponse.json({ success: true, id: application.id });
  } catch {
    return NextResponse.json(
      { error: "We couldn't process your application. Please try again." },
      { status: 500 },
    );
  }
}
