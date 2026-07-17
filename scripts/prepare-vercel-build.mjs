/**
 * On Vercel, swap Prisma provider from SQLite to PostgreSQL.
 * Local development keeps using SQLite unchanged.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const schemaPath = join(process.cwd(), "prisma", "schema.prisma");

if (process.env.VERCEL) {
  let schema = readFileSync(schemaPath, "utf8");

  if (schema.includes('provider = "sqlite"')) {
    schema = schema.replace('provider = "sqlite"', 'provider = "postgresql"');
    writeFileSync(schemaPath, schema);
    console.log("✓ Prisma provider switched to postgresql for Vercel build");
  }
}
