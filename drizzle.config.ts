import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgresql://postgres:iBwgwMmVcmqqnE17@db.uwsgvqbciuqqzknchcbe.supabase.co:5432/postgres",
  }
} satisfies Config;