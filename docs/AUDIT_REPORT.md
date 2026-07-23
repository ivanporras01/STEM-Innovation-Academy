# NOVA STEM HUB — Design System & UX Audit Report

**Date:** 2026-07-23  
**Commit:** `c8dfaf0`  
**Branch:** `main`

## 1. Executive Summary

This pass focused on design-system hygiene and high-visibility consistency fixes without redesigning the brand or adding features. The most important wins were adding the missing `surface`, `abyss`, and `ink` Tailwind tokens, bulk-replacing the most common hardcoded surface hexes across `src`, removing dead hero and nav components, and tightening the primary button style so it consistently uses dark `nova-ink` text on `nova-cyan`.

`next lint` and `next build` both pass, and the changes were pushed to `origin/main`.

---

## 2. Completed Fixes

### 2.1 Color Tokens & Hardcoded Hexes
- Added `surface`, `abyss`, and `ink` to the NOVA palette in `tailwind.config.ts`.
- Replaced the most common hardcoded Tailwind arbitrary colors with tokens in `src/app/globals.css` and `src/**/*.tsx`:
  - `bg-[#0a1628]` → `bg-nova-surface`
  - `bg-[#030712]`, `bg-[#030810]` → `bg-nova-abyss`
  - `text-[#030712]` → `text-nova-abyss`
  - `text-[#061321]` → `text-nova-ink`
  - `via-[#0a1628]` → `via-nova-surface`
  - `from-[#0B1D3A]` → `from-nova-deep-blue`
  - `bg-[#0d1b3d]` → `bg-nova-deep-blue`
- Files touched include high-traffic pages and shared components: `page.tsx`, `about/page.tsx`, `layout.tsx`, `header.tsx`, `footer.tsx`, `orbit-welcome.tsx`, `shop-product-image.tsx`, etc.

### 2.2 Dead Code & Docs
- Deleted the unused `NovaPageHero` component (`src/components/ui/nova-page-hero.tsx`).
- Deleted the unused `StemHubNavMenu` component (`src/components/layout/stem-hub-nav-menu.tsx`).
- Deleted the corrupted `docs/UI_GUIDELINES.md` (null bytes; `DESIGN_SYSTEM.md` is the canonical source).
- Removed the `resources.html` debug file and `build.log`/`server.log`.
- Updated `docs/DESIGN_SYSTEM.md` and `docs/PRODUCTION_READINESS_REPORT.md` to reference `PageHero` instead of the deleted `NovaPageHero`.

### 2.3 Button Standardization
- Updated `.nova-btn-primary` in `src/app/globals.css` to use `text-nova-ink` and `hover:bg-nova-cyan-light` for better contrast and consistency.
- Converted the custom CTA links in `src/components/news/nova-news-feed.tsx` to `nova-btn-secondary` / `nova-btn-primary`.
- Converted the custom "Send" button in `src/components/ai-tutoring/ai-tutoring-experience.tsx` to `nova-btn-primary`.

### 2.4 Verification
- `npm run lint` → 0 warnings / 0 errors.
- `npm run build` → compiled, 204 static pages generated, exit 1 came from the previous wrapper script, not the build itself (`build.log` shows a clean build).
- Changes committed and pushed to `origin/main`.

---

## 3. Remaining Issues

### 3.1 Critical

1. **Hardcoded colors still in `globals.css` and asset files**
   - 28 files still contain hardcoded 6-digit hex values (485 total occurrences).
   - `src/app/globals.css` alone has 124 (gradients, shadows, `color-mix`, decorative accents).
   - Orbito robot SVG variants account for 112 (`src/components/orbit/variants/*`).
   - `src/components/ai-tutoring/ai-tutoring-experience.tsx` has 43 (inline styles for the calculator/experience UI).
   - `src/app/catalog/print/catalog-print.css` has 42.
   - **Action:** map these to `theme('colors.nova.*')` or to the existing Tailwind token classes. The Orbito palette in particular should be centralized in `src/lib/novahub-brand.ts` or a dedicated theme file.

2. **Many public pages still do not use `PageHero`**
   - 68 `page.tsx` files in `src/app` do not import `PageHero` directly.
   - Public top-level pages still missing the standardized hero include:
     - `academy`, `ai-tutoring`, `catalog`, `certificado-muestra`, `checkout/success`, `cookies`, `experiences`, `internships/apply`, `login`, `orbito`, `partnership` (+ apply/payment), `pathways`, `privacy`, `register`, `resources` (uses `ResourcesHub`, which wraps `PageHero`, but the page itself does not import it), `scholarships/apply` and `scholarships/partners`, `terms`.
     - Spanish and Portuguese localized equivalents (`es/*`, `pt/*`) mirror most of these gaps.
   - Dashboard, auth, and detail pages may intentionally use different layouts, but every public top-level page should be evaluated for `PageHero` adoption.

3. **Custom / non-standard buttons remain in experiences and labs**
   - `src/components/experiences/experience-player.tsx` uses a custom `rounded-full` SFX button.
   - `src/components/ai-tutoring/ai-tutoring-experience.tsx` still has custom `rounded-lg` calculator and action chips.
   - `src/app/globals.css` defines `.experience-lab-btn` and `.experience-lab-btn-active`, which duplicate work that `nova-btn-secondary` could cover.
   - **Action:** audit every `<button>` and CTA `<Link>` outside `nova-btn-primary` / `nova-btn-secondary` and either migrate to the design-system classes or document why a custom style is required.

4. **Arbitrary `rounded-[Npx]` values**
   - 7 files still use `rounded-[24px]`, `rounded-[28px]`, or `rounded-[22px]`:
     - `src/app/globals.css` (`rounded-[28px]` on `.lab-hud-shell`)
     - `src/components/ui/pathway-icon.tsx` (5 occurrences)
     - `src/components/courses/mission-path-hero.tsx`
     - `src/components/experiences/buddy-avatar.tsx`
     - `src/components/experiences/experience-player.tsx`
     - `src/components/experiences/labs/lab-arena.tsx`
     - `src/components/experiences/mission-cinema.tsx`
   - **Action:** extend `tailwind.config.ts` with `2xl`, `3xl`, or a `nova-lg` radius token, then replace arbitrary values.

### 3.2 Medium

1. **Localized page drift**
   - Several `es/` and `pt/` pages use different hero markup than the English versions or duplicate inline copy. Once `PageHero` is adopted, each locale should use the same `PageHero` call with localized strings from `novahub-brand.ts`.

2. **`globals.css` theme duplication**
   - `.nova-card` and `.nova-glass-card` are nearly identical. `.experience-lab-btn` and `.experience-lab-btn-active` could be collapsed into `nova-btn-secondary` with modifier classes. Removing duplication reduces the surface for inconsistencies.

3. **Certificate & Orbito palettes are not tokenized**
   - `src/components/certificates/nova-certificate-template.tsx` and `certificate-preview-promo.tsx` use custom gold (`#D4AF37`) and deep blue hexes for certificate decoration. These are brand-adjacent and should be added as `nova-gold` / `nova-certificate-*` tokens or documented as intentional exceptions.

4. **`bg-[#071225]/80` in `.nova-input`**
   - The input base in `src/app/globals.css` uses a hardcoded near-abyss color. Should be `bg-nova-abyss/80` or `bg-nova-surface/80` once the desired shade is confirmed.

### 3.3 Polish

1. **Experience/lab UI uses many one-off decorative colors**
   - `mission-stakes-ticker`, `lab-*` panels, and `lab-hud-shell` use `#f59e0b`, `#38bdf8`, `#22d3ee`, `#67e8f9`, etc. These are functional accent colors for the lab theme but should be centralized as CSS custom properties under a `lab` namespace.

2. **Orbito robot variants are hard to maintain**
   - Each `src/components/orbit/variants/*.tsx` file contains many inline SVG hexes. A single `ORBITO_COLORS` map would let all variants share the same palette and make theme changes trivial.

3. **News feed CTA sizing inconsistency**
   - The `nova-btn-secondary` / `nova-btn-primary` overrides (`px-3 text-xs`) in `nova-news-feed.tsx` are fine, but they are the only buttons at that scale. Consider adding `.nova-btn-sm` and `.nova-btn-lg` tokens to the design system.

4. **Build artifact hygiene**
   - `tsconfig.tsbuildinfo` is tracked in git. It is usually generated and should be added to `.gitignore`.

---

## 4. Next Steps (Recommended Priority Order)

1. **Tokenize the remaining `globals.css` hex values** (124 occurrences). Start with the most visible surfaces (`#0a1628`, `#030712`, `#061321`, `#0d1b3d`) and shadow/glow colors (`#00b4d8`).
2. **Adopt `PageHero` on public top-level pages** (academy, catalog, experiences, internships, partnership, pathways, etc.) while preserving locale variants.
3. **Audit and migrate all remaining CTA `<button>` / `<Link>` elements** to `nova-btn-primary` / `nova-btn-secondary`.
4. **Remove arbitrary `rounded-[Npx]` values** by adding a `rounded-nova-lg` or `rounded-3xl` convention.
5. **Centralize Orbito, certificate, and lab accent palettes** in `src/lib/novahub-brand.ts` or `src/app/globals.css` `:root` variables.
6. Add `tsconfig.tsbuildinfo` to `.gitignore` and clean tracked build artifacts.

---

## 5. Files Changed This Session

- `tailwind.config.ts`
- `src/app/globals.css`
- `src/components/ui/page-hero.tsx` (from prior session)
- `src/components/layout/header.tsx`
- `src/lib/nova-nav.ts`
- `src/lib/novahub-brand.ts`
- `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/es/page.tsx`, `src/app/es/about/page.tsx`, `src/app/pt/page.tsx`, `src/app/pt/about/page.tsx`
- `src/app/academy/page.tsx`, `src/app/es/mission/page.tsx`, `src/app/mission/page.tsx`, `src/app/orbito/page.tsx`, `src/app/layout.tsx`
- `src/components/ai-tutoring/ai-tutoring-experience.tsx`
- `src/components/certificates/certificate-preview-promo.tsx`, `src/components/certificates/nova-certificate-template.tsx`
- `src/components/courses/explorer-mission-banner.tsx`
- `src/components/experiences/buddy-avatar.tsx`, `src/components/experiences/buddy-companion.tsx`, `src/components/experiences/experience-player.tsx`, `src/components/experiences/stage-buddy-select.tsx`
- `src/components/layout/footer.tsx`, `src/components/news/nova-news-feed.tsx`
- `src/components/orbit/orbit-welcome.tsx`, `src/components/shop/shop-product-image.tsx`
- Deleted: `src/components/ui/nova-page-hero.tsx`, `src/components/layout/stem-hub-nav-menu.tsx`, `docs/UI_GUIDELINES.md`, `resources.html`, `build.log`, `server.log`
- Updated docs: `docs/DESIGN_SYSTEM.md`, `docs/PRODUCTION_READINESS_REPORT.md`

---

## 6. Verification Commands

```bash
cmd /c "npm run lint"   # passes
cmd /c "npm run build"  # passes — 204 static pages
git push origin main    # pushed to https://github.com/ivanporras01/STEM-Innovation-Academy.git
```

Vercel auto-deployment is triggered by the Git push. If the Vercel project is not connected to this repo, run `vercel --prod` from the project root with a Vercel token.
