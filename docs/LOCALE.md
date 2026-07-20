# Locale Policy — NOVA STEM HUB / NOVA

## Rule

**Do not mix languages on the same route.**

| Edition | Base path | Language | Products |
|---------|-----------|----------|----------|
| **Default (English)** | `/`, `/academy`, `/college`, `/scholarships`, `/mission`, `/verify`, `/roadmap`, `/courses` | English UI + copy | NOVA Academy, NOVA College, QCW references |
| **Spanish (LATAM)** | `/es`, `/es/academy`, `/es/college`, `/es/scholarships`, … | Español neutro | NOVA College curriculum, becas, misión |

Constants live in `src/lib/locale.ts`:

- `DEFAULT_LOCALE = "en"`
- `SPANISH_LOCALE = "es"`
- `isSpanishPath(pathname)` — true for `/es` and `/es/*`

## Content split

| Content | English routes | Spanish routes |
|---------|----------------|----------------|
| NOVA College track titles/taglines | `src/data/nova-college/catalog-en.ts` | Original course data in `src/data/nova-college/*.ts` |
| Interactive lesson body (Spanish curriculum) | **Not served** — gateway page links to `/es/college/.../lessons/...` | `/es/college/[slug]/lessons/[lessonSlug]` |
| Scholarships UI | `/scholarships`, `/scholarships/apply` | `/es/scholarships`, `/es/scholarships/apply` |
| Validation messages | `scholarshipApplySchema` (English) | `scholarshipApplySchemaEs` — selected via `locale` in POST body |
| Navigation | `NOVA_PUBLIC_NAV` in `src/lib/nova-nav.ts` | `NOVA_PUBLIC_NAV_ES` |
| Footer ecosystem links | `NOVA_STEM_HUB_FOOTER_ECOSYSTEM` | `NOVA_STEM_HUB_FOOTER_ECOSYSTEM_ES` |

## Cross-edition links

- English pages link to `/es/...` for Spanish syllabus and edition switcher ("Edición en Español").
- Spanish pages link to `/...` for English edition overview ("English edition").
- NOVA Academy (`/courses`) and QCW app remain English-first; Spanish hub links to them where appropriate.

## Adding a new public page

1. Implement English version on default path.
2. If Spanish copy is needed, add `/es/...` route — do not add Spanish strings to the English page.
3. Reuse shared components with a `locale?: AppLocale` prop when practical.
4. Update this doc and `LOCALE_PATHS` in `locale.ts` if adding a major section.

## Build / static generation

- Lesson static params are generated only for `/es/college/[slug]/lessons/[lessonSlug]`.
- English lesson URLs exist but render an English gateway (no Spanish curriculum body).
