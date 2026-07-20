import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { enforceRateLimit } from "@/lib/api-rate-limit";
import { registerSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "auth-register", 5, 60_000);
  if (limited) return limited;

  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }

    const {
      email,
      password,
      firstName,
      lastName,
      role,
      confirmPassword: _confirmPassword,
      acceptTerms,
      ...profileFields
    } = parsed.data;
    void _confirmPassword;
    void acceptTerms;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        role,
        ...(role === "STUDENT" && profileFields.dateOfBirth
          ? {
              studentProfile: {
                create: {
                  middleName: profileFields.middleName?.trim() || null,
                  dateOfBirth: new Date(profileFields.dateOfBirth!),
                  phone: profileFields.phone!.trim(),
                  gender: profileFields.gender || null,
                  streetAddress: profileFields.streetAddress!.trim(),
                  city: profileFields.city!.trim(),
                  stateProvince: profileFields.stateProvince!.trim(),
                  country: profileFields.country!.trim(),
                  postalCode: profileFields.postalCode!.trim(),
                  emergencyContactName: profileFields.emergencyContactName!.trim(),
                  emergencyContactPhone: profileFields.emergencyContactPhone!.trim(),
                  emergencyContactRelation: profileFields.emergencyContactRelation!.trim(),
                  guardianName: profileFields.guardianName!.trim(),
                  guardianEmail: profileFields.guardianEmail!.trim(),
                  guardianPhone: profileFields.guardianPhone!.trim(),
                  currentSchoolName: profileFields.currentSchoolName!.trim(),
                  gradeLevel: profileFields.gradeLevel!,
                  graduationYear: profileFields.graduationYear!.trim(),
                  preferredLanguage: profileFields.preferredLanguage ?? "en",
                  howHeardAboutNova: profileFields.howHeardAboutNova || null,
                  termsAcceptedAt: new Date(),
                },
              },
            }
          : {}),
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
