# NOVA STEM HUB — NOVA College + NOVA Academy

> **Learn • Build • Innovate • Inspire**

Platform under the **NOVA STEM HUB** umbrella. The entry product is **NOVA College** (technical employability 16–25+). **NOVA Academy** (K-12) is the youth line in the same app.

```
NOVA STEM HUB
├── /              → Hub landing (choose product)
├── NOVA Academy   → /academy · Mission Paths, LMS K-12
├── NOVA College   → /college · src/data/nova-college (entry)
│   └── QCW        → quantum-workforce-academy repo (Tier 2)
└── Utility        → /scholarships · /mission · /verify · /roadmap
```

See [docs/NOVA-STEM-HUB.md](docs/NOVA-STEM-HUB.md) for the full brand architecture.

**Status:** ✅ Live at [stem-innovation-academy.vercel.app](https://stem-innovation-academy.vercel.app)

## Live Demo

**Public URL:** https://stem-innovation-academy.vercel.app

Login with demo accounts (password: `nova2026`) — see [docs/COMO-PROBAR.md](docs/COMO-PROBAR.md) for a step-by-step testing guide in Spanish.

## Features

- **Authentication** — Secure login/register with role-based access
- **Roles** — Explorer (NOVA), Mentor, Parent, Admin, School Admin
- **Course Catalog** — Three STEM pathways with modules and lessons
- **Lesson Viewer** — Reading, video, lab, and project content with progress tracking
- **Explorer Dashboard** — Enrolled courses, progress stats, continue learning
- **Mentor Dashboard** — Review Explorer submissions with scores and feedback
- **Admin Dashboard** — User and course management overview
- **Assignments** — Submit work and receive mentor reviews
- **Marketing Site** — NOVA STEM HUB hub landing + Academy + College pages

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes + Server Components |
| Database | SQLite (dev) / PostgreSQL (production) via Prisma |
| Auth | Auth.js (NextAuth v5) with JWT sessions |

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Accounts

All accounts use password: **`nova2026`**

| Role | Email |
|------|-------|
| Admin | admin@steminnovationacademy.org |
| Mentor | mentor@steminnovationacademy.org |
| Explorer | student@steminnovationacademy.org |

## Project Structure

```
├── prisma/           # Database schema & seed
├── src/app/          # Next.js pages & API routes
├── src/components/   # React components
├── src/lib/          # Auth, database, utilities
└── website/          # Legacy static landing (archived)
```

## Route map (English)

| Route | Purpose |
|-------|---------|
| `/` | NOVA STEM HUB landing |
| `/academy` | NOVA Academy homepage |
| `/college` | NOVA College catalog |
| `/courses` | Mission Paths (Academy) |
| `/login` · `/register` · `/dashboard` | Academy portal |

Spanish edition mirrors under `/es`, `/es/academy`, `/es/college`.

## License

Proprietary — STEM Innovation Academy
