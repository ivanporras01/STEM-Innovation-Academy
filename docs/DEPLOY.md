# Deploy NOVA LMS to Vercel

## Step 1 — GitHub (done after push)

Repository: https://github.com/ivanporras01/STEM-Innovation-Academy

## Step 2 — PostgreSQL for production

Vercel requires a hosted database. Create a free database at [Neon](https://neon.tech):

1. Sign up → New Project → copy the **connection string**
2. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`
3. Set `DATABASE_URL` to your Neon connection string

## Step 3 — Deploy on Vercel

1. Open [vercel.com/new](https://vercel.com/new)
2. Import **ivanporras01/STEM-Innovation-Academy**
3. Add environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://...` (Neon connection string) |
| `AUTH_SECRET` | Random secret (32+ characters) |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` |

4. Click **Deploy**

## Step 4 — Seed production database

After deploy, run locally against production DB:

```bash
DATABASE_URL="postgresql://..." npm run db:push
DATABASE_URL="postgresql://..." npm run db:seed
```

## CLI deploy (optional)

```bash
npx vercel login
npx vercel --prod
```
