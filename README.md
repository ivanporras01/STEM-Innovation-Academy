# 🚀 Project NOVA — STEM Innovation Academy LMS

> **Learn • Build • Innovate**

A full-stack Learning Management System built for STEM Innovation Academy's NOVA learning platform.

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
- **Marketing Site** — Beautiful NOVA-branded landing pages

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

## Production Deployment

1. Set environment variables (see `.env.example`)
2. Change `DATABASE_URL` to PostgreSQL
3. Generate a secure `AUTH_SECRET`
4. Deploy to Vercel or similar — see **[docs/DEPLOY.md](docs/DEPLOY.md)** for step-by-step instructions

### One-click Vercel import

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ivanporras01/STEM-Innovation-Academy&env=DATABASE_URL,AUTH_SECRET,NEXTAUTH_URL&project-name=nova-lms)

---

© STEM Innovation Academy — Project NOVA
