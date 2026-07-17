# NOVA LMS — Setup & Architecture

## Getting Started

```bash
npm install
npm run db:setup
npm run dev
```

## Architecture

```
Browser → Next.js App Router
              ├── Server Components (pages, data fetching)
              ├── Client Components (forms, interactivity)
              ├── API Routes (/api/*)
              └── Middleware (auth guards)
                        ↓
                   Prisma ORM → SQLite/PostgreSQL
```

## User Roles

| Role | Dashboard | Capabilities |
|------|-----------|-------------|
| STUDENT | `/dashboard/student` | Enroll, view lessons, submit assignments |
| MENTOR | `/dashboard/mentor` | Review submissions, manage courses |
| PARENT | `/dashboard/student` | View child progress (future) |
| ADMIN | `/dashboard/admin` | Manage users, courses, platform |
| SCHOOL_ADMIN | `/dashboard/admin` | School-scoped admin (future) |

## Database

Schema defined in `prisma/schema.prisma`. Run migrations with:

```bash
npm run db:push    # Apply schema changes
npm run db:seed    # Load demo data
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `DATABASE_URL` — SQLite file or PostgreSQL connection string
- `AUTH_SECRET` — Random 32+ character secret for JWT signing
- `NEXTAUTH_URL` — App URL (http://localhost:3000 for dev)
