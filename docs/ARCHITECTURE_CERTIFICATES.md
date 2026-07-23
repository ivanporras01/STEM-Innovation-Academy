# Certificate System Architecture

This document maps the NOVA STEM HUB certificate system onto the platform architecture.

## Context within NOVA LMS

The certificate system is a first-class domain within the existing Next.js 15 App Router, Prisma, PostgreSQL, and Auth.js stack. It reuses the same patterns as enrollments, assessments, and payments.

## High-level flow

```text
Course + Modules + Lessons
          │
          ▼
   Enrollment (user + course)
          │
   LessonProgress / Submissions / AssessmentAttempts
          │
          ▼
   evaluateCertificateEligibility()
          │
          ▼
   issueCertificate()  ──►  Certificate (db)
          │
          ├── generateCertificatePdfBuffer() ──► /api/certificates/:code/pdf
          ├── generateCertificateQrCode() ──► verify URL
          └── public verify page /verify/:certificateId
```

## Layer map

| Layer | Files | Responsibility |
|-------|-------|----------------|
| Data / Schema | `prisma/schema.prisma` | `Certificate`, `Course.certificateConfig`, `Enrollment.certificates` |
| Domain services | `src/lib/certificates/*.ts(x)` | Eligibility, IDs, QR, PDF, issuance, verification, admin actions |
| UI components | `src/components/certificates/*` | HTML template (`nova-certificate-template.tsx`) and PDF document (`certificate-pdf-document.tsx`) |
| Public routes | `src/app/verify/[certificateId]/page.tsx`, `src/app/api/verify/route.ts` | Public verification |
| Student routes | `src/app/dashboard/student/certificates/*` | Student achievement dashboard |
| Admin routes | `src/app/dashboard/admin/certificates/page.tsx`, `src/lib/certificates/admin-actions.ts` | Certificate management |
| Assets / copy | `src/lib/certificates/copy.ts`, `src/lib/certificates/constants.ts` | Multi-lingual v2.0 copy and constants |

## Security boundaries

- **Public verification**: read-only, no PII beyond holder name and credential metadata.
- **PDF download**: authenticated owner or admin.
- **Admin actions**: server actions guarded by `requireRole(["ADMIN", "SCHOOL_ADMIN"])`.
- **Token verification**: optional `?token=` parameter verifies `Certificate.verificationToken` before returning public view.

## Deployment notes

- `@react-pdf/renderer` is used in production so no headless browser is required on Vercel.
- `prisma/schema.prisma` switches provider from SQLite (local) to PostgreSQL (Vercel) via `scripts/prepare-vercel-build.mjs`.
- `NEXT_PUBLIC_SITE_URL` or `VERCEL_URL` must be set for correct verification URLs and QR codes.

## See also

- `docs/CERTIFICATE_SYSTEM.md` — full user-facing and operational documentation.
- `docs/CERTIFICATE_SYSTEM_AUDIT.md` — original audit report.
