# Deploy NOVA LMS — Final Steps

## Option A: Vercel Dashboard (recommended, ~3 minutes)

### 1. Create free PostgreSQL database

1. Go to **[neon.tech](https://neon.tech)** → Sign up with GitHub
2. **New Project** → name it `nova-lms`
3. Copy the **connection string** (starts with `postgresql://`)

### 2. Deploy on Vercel

1. Open **[vercel.com/new/clone?repository-url=https://github.com/ivanporras01/STEM-Innovation-Academy](https://vercel.com/new/clone?repository-url=https://github.com/ivanporras01/STEM-Innovation-Academy)**
2. Sign in with GitHub
3. Before clicking Deploy, add **Environment Variables**:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `AUTH_SECRET` | Any random 32+ character string |
| `NEXTAUTH_URL` | `https://stem-innovation-academy.vercel.app` |

4. Click **Deploy**

The build automatically:
- Switches Prisma to PostgreSQL
- Creates database tables
- Seeds demo users and courses

### 3. Demo login (production)

Password for all: **`nova2026`**

- Explorer: `student@steminnovationacademy.org`
- Mentor: `mentor@steminnovationacademy.org`
- Admin: `admin@steminnovationacademy.org`

---

## Option B: Vercel CLI

```bash
npx vercel login
npx vercel --prod
```

Set environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **P1012: Environment variable not found: DATABASE_URL** | Add `DATABASE_URL` in Vercel → Settings → Environment Variables (Production + Preview + Development), then **Redeploy** |
| Build fails on `db push` | Ensure `DATABASE_URL` is a valid `postgresql://...` string from Neon |
| Login redirects fail | Set `NEXTAUTH_URL` to your exact Vercel URL |
| Empty courses | Re-run deploy or run `npm run db:seed` with production DATABASE_URL |

---

## Local development (unchanged)

```bash
npm install
npm run db:setup
npm run dev
```

Local uses SQLite (`file:./dev.db`) — no Neon needed for development.
