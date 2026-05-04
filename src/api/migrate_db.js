import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const { Client } = pg;

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Connected to DB.");

    await client.query(`
      ALTER TABLE case_studies
      ADD COLUMN IF NOT EXISTS the_context TEXT,
      ADD COLUMN IF NOT EXISTS the_challenge TEXT,
      ADD COLUMN IF NOT EXISTS the_approach TEXT,
      ADD COLUMN IF NOT EXISTS the_impact TEXT,
      ADD COLUMN IF NOT EXISTS impact_metric_1 TEXT,
      ADD COLUMN IF NOT EXISTS impact_label_1 TEXT,
      ADD COLUMN IF NOT EXISTS impact_metric_2 TEXT,
      ADD COLUMN IF NOT EXISTS impact_label_2 TEXT,
      ADD COLUMN IF NOT EXISTS live_site_link TEXT;
    `);

    console.log("Successfully altered case_studies table.");

  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await client.end();
  }
}

migrate();
