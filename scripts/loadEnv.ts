/**
 * Loads `.env.local` then `.env` for standalone scripts.
 *
 * Next.js does this automatically for the app, but `tsx scripts/*.ts` runs
 * outside the framework. Uses Node's built-in env-file loader, so no extra
 * dependency is needed. Import this first, before any module that reads
 * `process.env` at import time.
 */
import { existsSync } from "node:fs";

/** Files loaded in order; earlier files win because Node does not overwrite. */
const ENV_FILES = [".env.local", ".env"];

for (const file of ENV_FILES) {
  if (!existsSync(file)) continue;

  try {
    process.loadEnvFile(file);
  } catch (error) {
    console.warn(`[env] could not read ${file}:`, error);
  }
}
