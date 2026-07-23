# NOVA STEM HUB — Certificate System Initial Audit

**Date:** 2026-07-23  
**Status:** Existing foundation found; no architectural conflicts blocking extension.

## 1. What already exists

### Database (Prisma)
- `Certificate` model with:
  - `id`, `code` (unique public ID), `userId`, `courseId`, `enrollmentId` (unique)
  - `holderName`, `programTitle`, `programSlug`, `scorePercent`, `prefix`, `locale`
  - `status` enum (`VALID` | `REVOKED`), `issuedAt`
  - Relations: `User.certificates`, `Course.certificates`, `Enrollment.certificate` (1:1)
- `CourseAssessmentAttempt` model records final exam attempts.
- `LessonProgress`, `Enrollment`, `Assignment`, `Submission` used for progress and evidence.
- `Role` enum includes `ADMIN` and `SCHOOL_ADMIN` for authorization.

### Domain services (`src/lib/certificates/`)
- `service.ts`: eligibility, final assessment submission, unique code generation, lookup, user certificates.
- `final-exam.ts`: shared 10-question final assessment, grading, public question set.
- `prefix.ts`: prefix resolution from catalog (e.g., `NOVA-COL-IT`).
- `locale.ts`: locale detection/normalization for certificates.
- `constants.ts`: passing score, max attempts, verify base path, sample PDF paths.
- `copy.ts`: all certificate template copy in EN/ES/PT.

### UI / pages
- `src/components/certificates/nova-certificate-template.tsx` — main visual certificate (HTML/React), with `sampleMode` watermark.
- `src/app/dashboard/student/certificates/page.tsx` — list of user certificates.
- `src/app/dashboard/student/certificates/[code]/page.tsx` — authenticated certificate detail with print/share actions.
- `src/app/verify/page.tsx` — public verification search page (uses `PageHero`).
- `src/app/api/verify/route.ts` — GET `/api/verify?code=...` returns real DB certificate or demo certificate.
- `src/app/certificado-muestra/page.tsx` — public sample certificate preview (always watermarked).
- `src/components/verify/verify-certificate-search.tsx` — verification UI with demo codes.
- `src/components/certificates/certificate-preview-promo.tsx` — marketing promo block.
- `src/components/certificates/certificate-print-actions.tsx` — browser print + share.
- `src/components/certificates/certificate-sample-toolbar.tsx` — sample page toolbar.

### API
- `src/app/api/certificates/attempt/route.ts` — GET status and POST submission of final assessment.

### Assets / PDFs
- `public/downloads/certificate-of-achievement-nova-sample-{en,es,pt}.pdf` — pre-generated sample PDFs.
- `scripts/generate-certificate-sample-pdf.ts` — local puppeteer script to regenerate samples.
- `puppeteer` is in `devDependencies`.

## 2. What is incomplete

- **Certificate data model is too thin** for production requirements:
  - No separate `verificationToken`.
  - No `certificateId` distinct from `code`.
  - No `category`, `credentialLevel`, `credentialTitle`, `learningHours`.
  - No `completionDate` or `issueDate` distinction (`issuedAt` exists).
  - No `pdfUrl`, `pdfStorageKey`, `templateVersion`, `metadata`.
  - No `revokedAt`, `revocationReason`.
- **No production PDF generation** for real certificates; current download relies on the browser print dialog. Sample PDFs are pre-generated locally with puppeteer.
- **No QR code generation** embedded in the certificate yet (QR placeholder exists in CSS/visual layout but is not rendered).
- **No `/verify/[certificateId]` route** — only `/verify` with query string and `/api/verify`.
- **No certificate replacement flow** (`REPLACED` status, previous/next record links).
- **No admin certificate management UI** (issue, reissue, revoke, search, audit).
- **Eligibility rules are hardcoded** around final exam + assignment review; not configurable per course.
- **Template copy still says "This certificate is presented to"**; needs update to "This certifies that" plus new achievement/institutional statements.
- **No `learningHours` pulled from program metadata** into the certificate.
- **Verify page exposes only limited fields**; missing category, credential level, learning hours, status label for revoked.
- **Certificate verification does not check a separate secure token**; it relies on `code` only.
- **No automated issuance hook** after lesson/module completion outside final assessment path.

## 3. What is reusable

- `Certificate` Prisma model and existing relations (extend, do not replace).
- `NovaCertificateTemplate` visual component — update copy/props, keep layout.
- `src/lib/certificates/service.ts` issuance logic — extract and extend.
- `src/lib/certificates/prefix.ts` and `locale.ts`.
- `src/lib/certificates/copy.ts` i18n copy — update strings.
- `src/app/verify/page.tsx` and `src/app/api/verify/route.ts` — extend with `/verify/[id]` and richer response.
- Auth/role infrastructure (`requireRole`, `ADMIN`/`SCHOOL_ADMIN` roles).
- Program catalog metadata (`contactHours`, `certCode`, `vertical`) for category/hours/prefix.

## 4. What must be created

1. **Extended Prisma schema** (migration-safe additions to `Certificate`):
   - `verificationToken String @unique`
   - `certificateId String @unique` (or reuse `code` as the human-readable public ID)
   - `credentialTitle`, `category`, `credentialLevel`
   - `completionDate DateTime`, `issueDate DateTime @default(now())`
   - `learningHours Int?`, `finalScore Float?`, `passingScore Float?`
   - `pdfUrl String?`, `pdfStorageKey String?`, `templateVersion String @default("2.0")`
   - `metadata Json?`
   - `revokedAt DateTime?`, `revocationReason String?`
   - `replacesId String?` / `replacedById String?` for replacement chain
   - Add `REPLACED` to `CertificateStatus` enum.
2. **New domain service modules**:
   - `src/lib/certificates/eligibility.ts` — configurable per-course eligibility.
   - `src/lib/certificates/certificate-id.ts` — public ID + secure token generation.
   - `src/lib/certificates/issue-certificate.ts` — idempotent issuance service.
   - `src/lib/certificates/verification.ts` — verify by public ID and/or token.
   - `src/lib/certificates/pdf-generator.ts` — production PDF generation.
3. **QR code generation** (`qrcode` package or `qr-image` alternative) with `NEXT_PUBLIC_APP_URL`.
4. **Public `/verify/[certificateId]` page** and update `/api/verify`.
5. **Student Achievements dashboard enhancements**:
   - Download PDF button (real generated PDF).
   - Copy verification link.
   - Status badges.
6. **Admin certificate management page** under `/dashboard/admin/certificates`.
7. **Updated `NovaCertificateTemplate` (v2.0)** with new copy, dynamic fields, and QR code display.
8. **`docs/CERTIFICATE_SYSTEM.md`** architecture and runbook.
9. **Tests** for eligibility, ID generation, duplicate prevention, verification, PDF generation.

## 5. Risks / data-model conflicts

- **Enum value change risk:** The current `CertificateStatus` uses `VALID`. Adding `REPLACED` is safe; renaming `VALID` to `ACTIVE` would require data migration and is risky with `vercel-build` using `prisma db push --accept-data-loss`. **Decision:** keep `VALID` and add `REPLACED`; the application treats `VALID` as the active state. Update UI labels to say "Active" where appropriate.
- **One-to-one `Enrollment.certificate`:** Replacement requires a new certificate record for the same enrollment. SQLite/Prisma one-to-one relation with `enrollmentId @unique` blocks multiple certificates per enrollment. **Decision:** remove `@@unique` / `enrollmentId @unique` or add a `replacesId` chain; allow multiple certificates per enrollment (one active, others revoked/replaced).
- **PDF strategy on Vercel:** Full `puppeteer` is in `devDependencies` and likely will not run in Vercel serverless functions (chromium binary size / environment). **Decision:** use `@react-pdf/renderer` for server-side PDF generation. It is Vercel-compatible and avoids headless Chrome. A PDF-specific document component will mirror the existing visual template.
- **Certificate issuance currently tied to a single generic final exam:** `submitFinalAssessment` uses `FINAL_EXAM_QUESTIONS` for every course. **Decision:** keep generic final exam as default but make eligibility/assessment configurable per course or program via the catalog/metadata.
- **Build script uses `prisma db push --accept-data-loss`:** This is safe only for additive, default-backed schema changes. Avoid renames or non-nullable additions without defaults. Migrations are not currently configured.

## 6. Recommended implementation order

1. Schema + migration-safe additions.
2. Refactor domain services (`issue-certificate.ts`, `eligibility.ts`, `certificate-id.ts`, `verification.ts`).
3. `/verify/[certificateId]` public route and API.
4. QR generation and `NEXT_PUBLIC_APP_URL` environment handling.
5. PDF generation with `@react-pdf/renderer`.
6. Student dashboard enhancements (download PDF, copy link, status).
7. Admin certificate management UI.
8. `docs/CERTIFICATE_SYSTEM.md` and tests.
