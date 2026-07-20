## Summary

<!-- What changed and why? Keep PRs small and focused. -->

## Pre-merge checklist

Complete **before** requesting review. Full guidance: [`docs/deployment-workflow.md`](../docs/deployment-workflow.md#pre-merge-release-checklist).

- [ ] **`npm run verify:release`** passes locally (same as CI `npm run build`)
- [ ] **Navbar visual check** (desktop ≥1280px + mobile ~375px) — see [integridad visual UI](../.cursor/rules/integridad-visual-ui.mdc)
  - [ ] Tab order: **School → College → Language → AI Tutoring → NOVA Resources**
  - [ ] **Coming Soon** badge on AI Tutoring (below label), not full classroom unless intentionally enabled
  - [ ] No shop/cart in header until `NOVA_SHOP_HEADER_ENABLED` is deliberately turned on
  - [ ] No overflow, truncated labels, or broken mobile menu
- [ ] **Preview URL** from Vercel bot reviewed on this PR (locales `/es`, `/pt` if touched)
- [ ] **Small, focused diff** — no huge uncommitted file trees; all new files are committed
- [ ] **No `vercel --prod`** for this release — merge to `main` and let Git integration deploy

## Test plan

<!-- URLs, flows, or screenshots from the Vercel Preview deployment. -->
