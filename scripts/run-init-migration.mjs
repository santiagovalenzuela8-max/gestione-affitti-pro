// Applica una migrazione Prisma via HTTPS (driver @neondatabase/serverless)
// invece che con `prisma migrate deploy`, utile quando l'ambiente da cui si
// lancia il comando non ha accesso alla porta Postgres diretta (5432) ma
// solo a HTTPS. Uso: node scripts/run-init-migration.mjs <path-sql> <nome>
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL);

const migrationPath = process.argv[2];
const migrationName = process.argv[3];
const migrationSql = readFileSync(migrationPath, "utf8");

const statements = migrationSql
  .split(/;\s*(?:\n|$)/)
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of statements) {
  console.log("Eseguo:", statement.slice(0, 60).replace(/\n/g, " ") + "...");
  await sql.query(statement);
}

const checksum = createHash("sha256").update(migrationSql).digest("hex");
const id = createHash("sha256")
  .update(migrationName + Date.now())
  .digest("hex")
  .slice(0, 25);

await sql`
  CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    checksum VARCHAR(64) NOT NULL,
    finished_at TIMESTAMPTZ,
    migration_name VARCHAR(255) NOT NULL,
    logs TEXT,
    rolled_back_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    applied_steps_count INTEGER NOT NULL DEFAULT 0
  )
`;

await sql`
  INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name, applied_steps_count)
  VALUES (${id}, ${checksum}, now(), ${migrationName}, ${statements.length})
`;

console.log("Migrazione registrata:", migrationName);
