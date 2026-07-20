# STEM Innovation Academy — Deployment Workflow (GitHub → Vercel)

This is the **supported** release path. Avoid `npx vercel --prod` for routine production updates—it can sit on **Initializing / Building** with **0ms** build output while the dashboard catches up. Git-triggered builds are reliable (~1–2 minutes).

## Current linkage (verified)

| Item | Value |
|------|--------|
| GitHub repo | `https://github.com/ivanporras01/STEM-Innovation-Academy` |
| Vercel project | `hector-porras/stem-innovation-academy` |
| Production URL | `https://stem-innovation-academy.vercel.app` |
| Git integration | **Connected** (`vercel git connect` reports repo already linked) |
| Local link | `.vercel/project.json` → `prj_nwl50AAakNPr2y341XD5Sa9n8D4G` |
| Build config | Root `vercel.json` (Prisma + seed + `next build`) |

## Environments

| Environment | Trigger | URL pattern |
|-------------|---------|-------------|
| **Preview** | Push to any branch **except** `main`, or open/update a **Pull Request** | `https://stem-innovation-academy-<hash>-hector-porras.vercel.app` |
| **Production** | Push or merge to **`main`** | `https://stem-innovation-academy.vercel.app` |

CI on GitHub (`.github/workflows/ci.yml`) runs `npm ci` + `npm run verify:release` (alias of `npm run build`) on PRs and `main` pushes—it does **not** deploy. **Merge only when CI is green**; Vercel deploys when Git events hit the linked project.

## Pre-merge release checklist

Use this before opening or merging any PR. The same items appear in [`.github/PULL_REQUEST_TEMPLATE.md`](../.github/PULL_REQUEST_TEMPLATE.md).

### Build verification (prevents Vercel "Module not found" / broken deploys)

- [ ] All intended files are **committed** — never push huge uncommitted trees or half-finished imports
- [ ] **`npm run verify:release`** passes locally (runs `next build`; same gate as CI)
- [ ] GitHub Actions **CI** is green on the PR before merge
- [ ] Review the **Vercel Preview URL** on the PR (not production) before merging

### Navbar & layout (prevents broken UI without visual check)

Follow [`.cursor/rules/integridad-visual-ui.mdc`](../.cursor/rules/integridad-visual-ui.mdc): structure, symmetry, and professionalism at **desktop (≥1280px)** and **mobile (~375px)**.

- [ ] Primary tab order: **School → College → Language → AI Tutoring → NOVA Resources**
- [ ] **Coming Soon** badge on AI Tutoring (below the label), unless `NEXT_PUBLIC_NOVA_AI_TUTORING_ENABLED` is intentionally enabled
- [ ] **No shop/cart** in the header until `NOVA_SHOP_HEADER_ENABLED` is deliberately turned on
- [ ] No horizontal overflow, truncated nav labels, or collapsed mobile menu
- [ ] Locale switcher and CTAs still readable on `/`, `/es`, `/pt`

### Release discipline

- [ ] **Small, focused PRs** — one concern per branch (e.g. `fix/nav-overflow`, not "everything at once")
- [ ] **Never `npx vercel --prod`** for normal releases — push/merge via GitHub; Vercel builds from Git
- [ ] After merge to `main`, run the [production smoke checklist](#production-smoke-checklist) below

## Standard release process

### 1. Branch from `main`

Use descriptive branch names:

- `fix/…` — bug fixes
- `feat/…` — new capability (keep unfinished features behind flags)
- `chore/…` — docs, tooling, deps
- `release/navbar-branding` — scoped UI/branding only (example)

```powershell
git checkout main
git pull origin main
git checkout -b feat/your-change
```

### 2. Develop and verify locally

```powershell
npm install
npm run db:setup   # local SQLite
npm run dev
```

Run production-like build when touching build/Prisma (same command CI uses):

```powershell
npm run verify:release
```

### 3. Open a Pull Request → **Preview**

1. Push the branch: `git push -u origin feat/your-change`
2. Open a PR to `main` on GitHub.
3. Vercel bot comments with a **Preview** URL (or find it under Vercel → **Deployments** → Environment **Preview**).
4. QA the preview: auth, locales (`/es`, `/pt`), critical paths.

### 4. Merge to `main` → **Production**

1. Merge the PR (squash or merge commit—team preference).
2. Vercel automatically starts a **Production** deployment.
3. Confirm **Ready** in [Vercel Deployments](https://vercel.com/hector-porras/stem-innovation-academy/deployments).
4. Smoke-test production URLs (see checklist below).

**Do not** run `npx vercel --prod` for normal releases once Git integration is working.

## Secret and environment variable handling

Configure in **Vercel → Project → Settings → Environment Variables**. Apply to **Production**, **Preview**, and **Development** unless noted.

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string (`?sslmode=require`) |
| `AUTH_SECRET` | Yes | 32+ random characters |
| `NEXTAUTH_URL` | Yes (Production) | Must match production URL exactly, e.g. `https://stem-innovation-academy.vercel.app` |
| `NEXT_PUBLIC_NOVA_AI_TUTORING_ENABLED` | **No** | Leave **unset** in Production/Preview until classroom launch. Only `true` enables the live tutoring UI. |

Never commit `.env`, `.env.local`, or secrets. Rotate `AUTH_SECRET` if exposed.

Preview deployments use the same variable **scopes** you set in the dashboard; use separate Neon branches/databases for preview if you need isolation (optional).

## Production smoke checklist

After each production deploy:

- [ ] `https://stem-innovation-academy.vercel.app/` — 200, NOVA STEM HUB content
- [ ] `/ai-tutoring` — **Coming Soon** (not full classroom) unless flag intentionally enabled
- [ ] `/es` and `/pt` — load without errors
- [ ] Demo login still works (`student@steminnovationacademy.org` / `nova2026`) if auth touched

## Rollback

1. Vercel → **Deployments**.
2. Find the last known-good **Production** deployment (● Ready).
3. **⋯** menu → **Promote to Production** (or **Instant Rollback** if offered).

Production alias moves immediately; no Git revert required for emergency rollback (still revert Git after if needed).

## When CLI deploys misbehave

**Symptoms:** Deployment stuck **Queued / Building**, build line shows **0ms**, empty output in `vercel inspect`.

**Cause:** Common with **`npx vercel` / `npx vercel --prod`** uploads (`@vercel/vc-build`, region `sfo1`) while the deployment record updates slowly. Git-based builds usually show full Next.js output and finish in ~1–2 minutes.

**What to do:**

1. Prefer **Git push** / PR merge instead of CLI for releases.
2. Check `npx.cmd vercel ls`—if status becomes **Ready**, production alias may already point to the new deploy.
3. To cancel a bad in-flight CLI deploy: `npx.cmd vercel rm <deployment-url-or-id> --yes` (only if you intend to discard it).
4. For emergencies, **Promote** a previous Ready deployment (rollback section).

## Connecting or re-linking Git (dashboard)

If integration breaks:

1. [Vercel Dashboard](https://vercel.com/hector-porras/stem-innovation-academy/settings/git) → **Git**.
2. Connect **GitHub** → `ivanporras01/STEM-Innovation-Academy`.
3. Production branch: **`main`**.

CLI alternative (non-interactive):

```powershell
npx.cmd vercel git connect https://github.com/ivanporras01/STEM-Innovation-Academy.git
```

## Safe branding-only release (example)

To ship navbar/branding without enabling AI tutoring:

1. Branch: `release/navbar-branding-2026-07`
2. Ensure **`NEXT_PUBLIC_NOVA_AI_TUTORING_ENABLED` is not set** on Vercel.
3. PR → verify Preview → merge `main`.
4. Do **not** push branches that only exist to test `vercel --prod`.

## Related docs

- `docs/DEPLOY.md` — first-time Neon + Vercel setup (ongoing releases: use **this** doc)
- `docs/ARREGLAR-VERCEL.md` — fixing missing `DATABASE_URL` (P1012)
- `.cursor/rules/integridad-visual-ui.mdc` — navbar/layout verification rules
- `.github/PULL_REQUEST_TEMPLATE.md` — PR checklist (links back here)

---

**Summary:** Push to GitHub; let Vercel build. Preview on PRs, Production on `main`. Keep tutoring behind `NEXT_PUBLIC_NOVA_AI_TUTORING_ENABLED`. Roll back from the Vercel Deployments UI.
