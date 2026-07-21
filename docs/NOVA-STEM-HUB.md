# NOVA STEM HUB — Brand architecture & products

Master reference for the **NOVA STEM HUB** umbrella. Updated July 2026.

## Hub landing + two products

Users start at the **NOVA STEM HUB** landing and choose one of two products:

| Layer | Route (EN) | Route (ES) | Audience |
|-------|------------|------------|----------|
| **NOVA STEM HUB** (umbrella) | `/` | `/es` | Hub landing — choose Academy or College |
| **NOVA Academy** | `/academy` | `/es/academy` | K-12 / youth · Mission Paths · STEM exploration |
| **NOVA College** | `/college` | `/es/college` | 16–25+ · technical employability · B2B entry |

Scholarships, Mission, Verify, Roadmap, etc. are **utility pages** — not third products.

```
NOVA STEM HUB (umbrella)
├── /  (EN hub) · /es (ES hub)
├── NOVA Academy     → /academy · /es/academy
├── NOVA College     → /college · /es/college
│   ├── Tier 1       → 7 entry tracks (~120h each)
│   └── Tier 2       → Quantum Computing Workforce (QCW) program
├── Mission Paths    → /courses (Academy LMS)
├── Login / Portal   → /login · /register · /dashboard (Academy)
└── Utility pages    → /scholarships · /mission · /verify · /roadmap
```

## QCW is NOT a third product

**Quantum Computing Workforce (QCW)** keeps its name but lives **inside NOVA College** as the Tier 2 advanced program:

- **Catalog & enrollment:** `/college/quantum-workforce` (EN) · `/es/college/quantum-workforce` (ES)
- **Interactive delivery:** separate QCW app repo (`quantum-workforce-academy`) — delivery layer only
- **No standalone `/qwa` page** — redirects to `/college/quantum-workforce`

College is the primary entry product (`entryPath: "/college"`).

## Repositories

| Layer | Repo | URL |
|-------|------|-----|
| NOVA College + Academy LMS | `STEM-Innovation-Academy` | https://stem-innovation-academy.vercel.app |
| QCW interactive delivery app | `quantum-workforce-academy` | https://quantum-workforce-academy.vercel.app |

## NOVA College — 10 tracks

| # | Slug | Cert prefix |
|---|------|-------------|
| 1 | `it-support-cloud-technician` | NOVA-COL-IT |
| 2 | `cybersecurity-analyst` | NOVA-COL-SEC |
| 3 | `data-analytics-technician` | NOVA-COL-DA |
| 4 | `iot-smart-systems-technician` | NOVA-COL-IOT |
| 5 | `robotics-automation-technician` | NOVA-COL-ROBOT |
| 6 | `intro-telecommunications` | NOVA-COL-TEL |
| 7 | `electronics-technician` | NOVA-COL-ELE |
| 8 | `digital-marketing-business` | NOVA-COL-DMK |
| 9 | `startup-innovation-digital-launch` | NOVA-COL-STU |
| 10 | `quantum-workforce` | NOVA-COL-QNT *(QCW program)* |

Data: `src/data/nova-college/`  
Format: 40% theory · 40% labs · 10% soft skills · 10% exam prep (~120h)

## Locale policy

- **English (default):** all routes except `/es/*`
- **Spanish (LATAM):** separate edition under `/es`, `/es/academy`, `/es/college` — do not mix languages on the same route

## Code entry points

```typescript
import {
  NOVA_STEM_HUB,        // path: "/" · entryPath → "/college"
  NOVA_ACADEMY,         // path: "/academy" · coursesPath: "/courses"
  NOVA_COLLEGE,
  QUANTUM_WORKFORCE,    // College Tier 2 program — trackPath: "/college/quantum-workforce"
  NOVA_STEM_HUB_PRODUCTS, // [College, Academy] — two products only
  NOVA_COLLEGE_TIERS,   // Tier 1 + QCW Tier 2 within College
  novaCollegeCourses,
} from "@/lib/novahub";
```

Brand constants: `src/lib/novahub-brand.ts`  
Navigation: `src/lib/nova-nav.ts`  
Impact + scholarships: `src/lib/novahub-impact.ts`, `src/data/novahub/scholarships.ts`

## Scholarships & impact

- **Mission:** `/mission`
- **Scholarships:** `/scholarships` · apply at `/scholarships/apply`
- **Verify:** `/verify` (MVP for verify.novastemhub.education)
- See [IMPACT.md](./IMPACT.md) for eligibility philosophy

## Planned domains

| Subdomain | Use |
|-----------|-----|
| `novastemhub.education` | Hub / marketing |
| `academy.novastemhub.education` | **NOVA Academy (youth)** |
| `college.novastemhub.education` | **NOVA College (entry)** |
| `qwa.novastemhub.education` | QCW delivery app (College program layer) |
| `verify.novastemhub.education` | Certificate verification |

## Related docs

- [IMPACT.md](./IMPACT.md) — Mission, access tiers, scholarships
- [SETUP.md](./SETUP.md) — Installation & technical architecture
- [nova-college/README.md](./nova-college/README.md) — College curriculum
- [COMO-PROBAR.md](./COMO-PROBAR.md) — Demo accounts
