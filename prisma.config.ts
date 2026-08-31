import { defineConfig } from "prisma/config";

/**
 * Prisma CLI configuration.
 *
 * Prisma 7 removed `url` from the schema's `datasource` block, so migration and
 * introspection commands read the connection string from here instead. The
 * runtime client gets the same URL through the driver adapter in
 * `src/lib/agent/db/client.ts`.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
