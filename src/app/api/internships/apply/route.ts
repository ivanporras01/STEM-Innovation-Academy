import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { enforceRateLimit } from "@/lib/api-rate-limit";
import { internshipApplySchema, internshipApplySchemaEs } from "@/lib/validations";

const DIR = path.join(process.cwd(), "data", "internship-applications");
const FILE = path.join(DIR, "applications.jsonl");

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "internships-apply", 8, 60_000);
  if (limited) return limited;

  try {
    const body = await request.json();
    const { locale, ...fields } = body;
    const schema = locale === "es" ? internshipApplySchemaEs : internshipApplySchema;
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
      id: `intern-${Date.now()}`,
    };
    try {
      await mkdir(DIR, { recursive: true });
      await appendFile(FILE, `${JSON.stringify(application)}\n`, "utf-8");
    } catch (fileError) {
      console.warn("[internship-application] file write skipped:", fileError);
    }
    return NextResponse.json({ success: true, id: application.id });
  } catch {
    return NextResponse.json({ error: "We couldn't process your application." }, { status: 500 });
  }
}
