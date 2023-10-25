import type { Config } from "drizzle-kit";
import { env } from "./src/config/env";

export default {
  out: "./migrations",
  schema: "./src/db/schema.ts",
  breakpoints: false,
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
    ssl: true,
  },
} satisfies Config;
