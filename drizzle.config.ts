import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/table",
  out: "./src/lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgres://postgres.uwsgvqbciuqqzknchcbe:ZeivZLDFTgrT@aws-0-eu-central-1.pooler.supabase.com:5432/postgres",
  }
} satisfies Config;