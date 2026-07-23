# NOVA STEM HUB Design System

Single source of truth for the visual language of **NOVA STEM HUB**. Every page, component, and interaction should inherit from these standards.

---

## 1. Official Brand

- **Brand name:** `NOVA STEM HUB`
- **Rules:**
  - Always all caps: `NOVA STEM HUB`
  - Never: `NOVA STEM Hub`, `Nova STEM Hub`, `NOVA Stem Hub`, or mixed capitalization
  - The brand name is one continuous wordmark; do not split it visually
- **Files:** `src/lib/novahub-brand.ts`, `src/components/ui/nova-logo-mark.tsx`

---

## 2. Logo

### Components
- `NovaLogo` — full lockup (icon + wordmark)
- `NovaLogoIcon` — icon only
- `NovaHeroLogoMark` — large centered mark for hero accents
- `NovaCertificateLogoMark` — certificate header mark

### Rules
- Use `NovaLogo` as the single reusable logo everywhere.
- Do not recreate the logo markup in other components.
- `showText={true}` by default.
- Font: same gradient, same `font-bold`, same `tracking-tight`, same text sizes across all contexts.

### Sizes
| Size | Icon | Text |
|------|------|------|
| `sm` | `h-9 w-9` | `text-[1.075rem]` |
| `md` | `h-12 w-12` | `text-[1.3rem]` |
| `lg` | `h-16 w-16` | `text-[1.6rem]` |

### Gradient
- `bg-gradient-to-r from-nova-cyan-light to-nova-cyan bg-clip-text text-transparent`
- The gradient is continuous across the entire brand name, as if typed with one brush stroke.

---

## 3. Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `nova-deep-blue` | `#0d1b3d` | Backgrounds, cards |
| `nova-blue` | `#1e3a8a` | Primary hover states |
| `nova-cyan` | `#00b4d8` | Primary accent, buttons, links |
| `nova-cyan-light` | `#6ee7f9` | Text highlights, gradients |
| `nova-orange` | `#ff7a00` | College / shop accent |
| `nova-green` | `#12965d` | Language / success accent |
| `nova-off-white` | `#f7f9fc` | Light backgrounds |
| `nova-light-gray` | `#e8edf5` | Secondary light |
| `nova-gray` | `#667085` | Muted text |
| `nova-dark-gray` | `#344054` | Body text on light |
| `nova-black` | `#101828` | Dark text |

### Usage Rules
- Primary accent: `nova-cyan`
- Product accents: School uses cyan, College uses orange, Languages uses green, Shop uses orange.
- Gradients: use the official cyan gradient; do not invent new gradients.
- Backgrounds: `bg-[#030712]` for page, `bg-[#0a1628]/55` for glass nav, `bg-[#0d1b3d]/70` for cards.

---

## 4. Typography

### Font
- Sans: `Inter`, system sans stack
- Weights: `font-medium` (nav), `font-semibold` (buttons, labels), `font-bold` (headings), `font-black` (H1)

### Scale
| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| H1 | `text-3xl sm:text-4xl lg:text-5xl` | `font-black` | Page titles only |
| H2 | `text-2xl sm:text-3xl` | `font-bold` | Section titles |
| H3 | `text-xl` | `font-bold` | Card titles |
| Body | `text-sm` / `text-base` | `font-normal` | `text-nova-cyan-light/85` on dark |
| Eyebrow | `text-sm font-bold uppercase tracking-[0.2em]` | `font-bold` | Brand label above H1 |
| Buttons | `text-sm` | `font-semibold` | `nova-btn-primary` / `nova-btn-secondary` |
| Nav | `text-xs 2xl:text-sm` | `font-medium` | Upper tabs |
| Footer | `text-sm` / `text-xs` | `font-medium` / `font-semibold` | `text-nova-cyan-light/70` |

---

## 5. Spacing Scale

### Section Spacing
- Hero: `py-16` or `py-20 sm:py-28`
- Content sections: `py-12` / `py-20` via `nova-space-section`
- Card gaps: `gap-6` / `gap-8`
- Internal page content: `space-y-14` within `nova-container`

### Component Spacing
- Button padding: `px-5 py-2.5`
- Card padding: `p-6` / `p-8`
- Input padding: `px-4 py-2.5`
- Badge padding: `px-2.5 py-0.5`

---

## 6. Container System

### `.nova-container`
```css
@apply mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8;
```

### `.nova-header-container`
- Now shares `.nova-container` for perfect alignment between header, hero, and page sections.

### Rule
- Header, hero, sections, cards, and footer should all align to the same horizontal bounds.
- Do not introduce one-off max-widths on public pages.

---

## 7. Header

### Layout
- Sticky glass nav: `nova-glass-nav`
- Height: `h-[88px]`
- Grid: `grid-cols-[auto_minmax(0,1fr)_auto]`
- Brand zone has `pl-1 md:pl-2` for optical balance

### Logo
- Use `NovaLogo size="sm"` with `showText={true}`.
- Link wraps the logo; logo and text move together.
- `aria-label="{brand.name} — {brand.homeLabel}"`

### Navigation
- Desktop: horizontal tabs centered in the middle column
- Mobile: hamburger opens full drawer below header
- Active state: `bg-nova-cyan/15 text-nova-cyan-light` with inset shadow
- Hover state: `hover:bg-white/10 hover:text-nova-cyan-light`

---

## 8. Hero System

### Standard Component
- `PageHero` in `src/components/ui/page-hero.tsx`

### Hierarchy
1. Small Brand Label: `✦ NOVA STEM HUB`
2. Page Title (H1)
3. Subtitle (optional)
4. Description (optional)
5. CTA (optional)

### Rules
- Every public page should use `PageHero` or follow this exact hierarchy.
- Never combine brand and title in the eyebrow (e.g., `NOVA STEM HUB · School` is incorrect).
- Never reverse the order (e.g., `About NOVA STEM HUB` is incorrect).

---

## 9. Buttons

### Primary
```css
.nova-btn-primary
```
- `rounded-xl bg-nova-cyan px-5 py-2.5 text-sm font-semibold text-white`
- Hover: `hover:bg-nova-blue`
- Glow variant: `nova-btn-glow`

### Secondary
```css
.nova-btn-secondary
```
- `rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white`
- Hover: `hover:border-nova-cyan hover:bg-white/15 hover:text-nova-cyan-light`

### Rules
- Use `Link` with `className="nova-btn-primary"` or `className="nova-btn-secondary"`.
- Always use `inline-flex` for Next.js `Link` buttons.
- Do not recreate button styles inline.

---

## 10. Cards

### Glass Card
```css
.nova-card
```
- `rounded-nova border border-white/15 bg-[#0d1b3d]/70 p-6`
- Shadow: `shadow-[0_0_30px_rgba(0,180,216,0.08)]`
- Backdrop blur: `backdrop-blur-md`

### Glass Island
```css
.nova-glass-island
```
- `rounded-[24px] border border-white/10 bg-[#0a1628]/55 p-6`
- Use for hero mission statements and feature callouts.

### Rules
- Consistent border radius (`rounded-nova` = `18px` or `rounded-[24px]` for islands).
- Consistent padding (`p-6` or `p-8`).
- Consistent hover transitions on interactive cards.

---

## 11. Footer

### Layout
- Background: `bg-[#030712]/50` with `backdrop-blur-md`
- Border top: `border-t border-white/10`
- Container: `nova-container` with `py-12` and `grid gap-8`

### Logo
- `NovaLogo size="sm"` with `showText={true}`
- Tagline: "Part of NOVA STEM HUB"
- Copyright: `© 2026 NOVA STEM HUB. All Rights Reserved.`

### Rules
- Footer links use `text-nova-cyan-light/85` with `hover:text-white`.
- Legal links in bottom bar: Privacy, Terms, Cookies.

---

## 12. Orbita

### Design Language
- Orbita must inherit the same colors, typography, and spacing as the rest of the site.
- Menu labels should match the website navigation exactly.
- Buttons use `nova-btn-primary` / `nova-btn-secondary` equivalents.

### Consistency
- `orbit-welcome.tsx` and `orbito-real-guide.tsx` pull labels from `getNovaHeaderNav()` so they stay in sync.

---

## 13. Accessibility

- All interactive elements must have visible focus states.
- Buttons and links need adequate touch targets (min 44px).
- Images need `alt` text; icons use `aria-hidden`.
- Navigation has `aria-label`, `aria-current="page"`, and mobile `aria-expanded`.
- Color contrast must meet WCAG AA for text.

---

## 14. Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Rules
- Header switches to hamburger below `lg`.
- Hero title scales from `text-3xl` to `lg:text-5xl`.
- Card grids use `md:grid-cols-2` and `lg:grid-cols-3`.

---

## 15. Component Adoption Rules

1. **Always use `NovaLogo`** for the brand lockup. Never inline the SVG + text.
2. **Always use `PageHero`** for public page heroes.
3. **Always use `.nova-container`** or `.nova-header-container` for content bounds.
4. **Always use `nova-btn-primary` / `nova-btn-secondary`** for buttons.
5. **Always use `nova-card` / `nova-glass-island`** for card surfaces.
6. **Always use brand constants** from `novahub-brand.ts` for names and metadata.

---

## 16. Future Pages Checklist

Before adding a new page, verify:
- [ ] Uses `PageHero` with correct hierarchy
- [ ] Uses `.nova-container` for content
- [ ] Uses `NovaLogo` in any header/footer
- [ ] Uses `nova-btn-*` classes for CTAs
- [ ] Brand name is `NOVA STEM HUB` everywhere
- [ ] No product name is prefixed with the brand in the H1

---

*Last updated: July 22, 2026*
