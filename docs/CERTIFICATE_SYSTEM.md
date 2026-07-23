# NOVA STEM HUB Certificate System

This document describes the digital credential and certificate system integrated into the NOVA STEM HUB LMS.

## Overview

Learners earn verifiable, tamper-evident certificates when they complete a Mission Path, pass reviewed assignments, and pass the final assessment. The system supports:

- Configurable per-course eligibility rules.
- Unique certificate IDs and secure verification tokens.
- QR-coded public verification at `/verify/:certificateId`.
- High-quality PDF generation using `@react-pdf/renderer`.
- Certificate lifecycle states: `VALID`, `REVOKED`, `REPLACED`.
- Admin issuance, replacement, and revocation.
- Multi-lingual certificate copy (en, es, pt).

## Certificate lifecycle

```
Eligibility evaluation  →  Issuance  →  PDF / QR  →  Public verification
        ↑                                              ↓
   Replacement ←────── Revocation ──────────────────────
```

1. **Eligibility** — `evaluateCertificateEligibility(userId, courseId)` checks enrollment, lesson progress, assignments, final assessment, and any per-course configuration.
2. **Issuance** — `issueCertificate(...)` creates a `Certificate` record with a unique `code` and `verificationToken`. It is idempotent: a valid certificate for an enrollment is returned if one already exists.
3. **Rendering** — `generateCertificatePdfBuffer(...)` renders a `CertificatePdfDocument` with the NOVA visual identity and an embedded QR code.
4. **Verification** — `/verify/:certificateId` displays public credential details. `?token=...` enables optional secure token verification.
5. **Revocation / Replacement** — Admins can revoke a certificate or replace it. Replacement marks the old certificate `REPLACED` and links the new certificate via `replacesId`.

## Data model

Key fields on `Certificate`:

| Field | Purpose |
|-------|---------|
| `certificateId` | Human-readable unique certificate code, e.g. `NOVA-COL-IT-2026-A1B2C3` |
| `verificationToken` | Secure random token used for optional token-verification links |
| `code` | Canonical uppercase code (same value, indexed unique) |
| `holderName` | Display name of the learner |
| `programTitle` / `programSlug` | Program / course title and slug |
| `credentialTitle` / `category` / `credentialLevel` | v2.0 credential metadata |
| `completionDate` / `issueDate` | When the learner completed and when the credential was issued |
| `learningHours` | Estimated contact hours |
| `scorePercent` / `finalScore` / `passingScore` | Assessment score and passing threshold |
| `status` | `VALID`, `REVOKED`, or `REPLACED` |
| `replacesId` | Reference to the previous certificate when replaced |
| `revokedAt` / `revocationReason` | Audit fields for revocation / replacement |
| `metadata` | JSON audit object (admin IDs, reasons, etc.) |
| `templateVersion` | Allows template migrations (currently `2.0`) |

`Course.certificateConfig` is a JSON field that stores per-course overrides for eligibility rules.

## Eligibility rules

`src/lib/certificates/eligibility.ts` merges a default configuration with `Course.certificateConfig`:

- `passingScorePercent` — default `80` (`PASSING_SCORE_PERCENT`).
- `requireAllLessonsCompleted`
- `requireAssignmentsSubmitted`
- `requireAssignmentsReviewed`
- `requireFinalAssessmentPassed`
- `requireAdminApproval`
- `learningHours`, `credentialTitle`, `category`, `credentialLevel` for template copy.

The final score prefers a passed final-assessment score; otherwise it falls back to the assignment average.

## Unique codes and tokens

`src/lib/certificates/certificate-id.ts`:

- `generateUniqueCertificateCode(prefix)` creates codes like `NOVA-COL-IT-2026-A1B2C3`.
- It retries up to 8 times in case of collisions.
- `generateVerificationToken()` creates a 32-byte URL-safe base64 token.

## QR codes and verification URLs

`src/lib/certificates/qr-code.ts`:

- `buildVerificationUrl(code, token?)` uses `NEXT_PUBLIC_SITE_URL` or `VERCEL_URL`.
- `generateCertificateQrCode(...)` returns a PNG data URL.
- The QR on certificates links to `/verify/:certificateId`.

## PDF generation

`src/lib/certificates/pdf-generator.tsx` and `src/components/certificates/certificate-pdf-document.tsx`:

- Uses `@react-pdf/renderer` to render the certificate on the server.
- No headless browser is required, making it Vercel-compatible.
- Download endpoint: `GET /api/certificates/:code/pdf` (authenticated, owner or admin).

## Public pages

- `/verify` — search form (existing).
- `/verify/:certificateId` — public credential detail page showing status, holder, program, dates, scores, and verification URL.
- `/api/verify?code=...&token=...` — JSON verification API, with demo fallback in non-production.

## Admin interface

`/dashboard/admin/certificates` provides:

- Search and filter by status.
- Manual certificate issuance with `userId`, `courseId`, `locale`, and reason.
- Replace and revoke actions with audit reasons.
- Links to public verification pages.

## Student dashboard

`/dashboard/student/certificates` lists the learner's credentials with:

- View certificate (HTML template with QR).
- Download PDF.
- Copy/share verification link.

The dashboard shell navigation label is **Achievements & Certificates**.

## Security considerations

- Certificate codes and verification tokens are generated with `crypto.randomBytes`.
- PDF download requires authentication and ownership (or admin role).
- Public verification pages expose only non-sensitive data: holder name, program, dates, scores, and status. No internal IDs or private student info is shown.
- Replacement and revocation preserve the old certificate record and store audit context in `metadata`, `revokedAt`, and `revocationReason`.

## Environment variables

- `NEXT_PUBLIC_SITE_URL` — canonical public URL used for verification links and QR codes.
- `VERCEL_URL` — fallback on Vercel deployments (`https://<url>`).
- `AUTH_SECRET` and `DATABASE_URL` — standard auth / database configuration.

## Related files

- `prisma/schema.prisma` — `Certificate`, `Course`, `Enrollment` models.
- `src/lib/certificates/*` — domain services (eligibility, issuance, IDs, QR, PDF, verification).
- `src/components/certificates/*` — React PDF and HTML templates.
- `src/app/verify/[certificateId]/page.tsx` — public verification page.
- `src/app/api/certificates/[code]/pdf/route.ts` — PDF download endpoint.
- `src/app/api/verify/route.ts` — verification JSON API.
- `src/app/dashboard/admin/certificates/page.tsx` — admin interface.
- `src/app/dashboard/student/certificates/*` — student dashboard.
- `scripts/generate-certificate-sample-pdf.ts` — local sample PDF script using Puppeteer.

## Future improvements

- Add email notification on certificate issuance.
- Bulk CSV import / export for admin operations.
- Blockchain anchoring of certificate hashes.
- Separate `CourseCertificateConfig` table for richer UI-driven configuration.
