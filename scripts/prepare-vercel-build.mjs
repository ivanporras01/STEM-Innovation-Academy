/**
 * On Vercel, swap Prisma provider from SQLite to PostgreSQL.
 * Local development keeps using SQLite unchanged.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const schemaPath = join(process.cwd(), "prisma", "schema.prisma");

if (process.env.VERCEL) {
  if (!process.env.DATABASE_URL) {
    console.error(`
╔══════════════════════════════════════════════════════════════╗
║  BUILD ERROR: DATABASE_URL is missing in Vercel              ║
╠══════════════════════════════════════════════════════════════╣
║  1. Create a free database at https://neon.tech              ║
║  2. Copy the connection string (postgresql://...)            ║
║  3. In Vercel → Settings → Environment Variables add:        ║
║     DATABASE_URL = your Neon connection string               ║
║     AUTH_SECRET  = any random 32+ character string           ║
║     NEXTAUTH_URL = https://your-app.vercel.app               ║
║  4. Redeploy the project                                     ║
╚══════════════════════════════════════════════════════════════╝
`);
    process.exit(1);
  }

  if (!process.env.DATABASE_URL.startsWith("postgresql")) {
    console.error(
      "ERROR: DATABASE_URL must be a PostgreSQL connection string (postgresql://...) on Vercel."
    );
    process.exit(1);
  }

  let schema = readFileSync(schemaPath, "utf8");

  if (schema.includes('provider = "sqlite"')) {
    schema = schema.replace('provider = "sqlite"', 'provider = "postgresql"');
    writeFileSync(schemaPath, schema);
    console.log("✓ Prisma provider switched to postgresql for Vercel build");
  }
}
