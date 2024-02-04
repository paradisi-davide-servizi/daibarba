import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


const runMigrate = async () => {

    const connection = postgres("postgres://postgres.uwsgvqbciuqqzknchcbe:iBwgwMmVcmqqnE17@aws-0-eu-central-1.pooler.supabase.com:5432/postgres", { max: 1 });
    const db = drizzle(connection);

    console.log("⏳ Running migrations...");

    const start = Date.now();
    await migrate(db, { migrationsFolder: 'src/lib/db/migrations' });
    const end = Date.now();

    console.log("✅ Migrations completed in", end - start, "ms");

    process.exit(0);
};

runMigrate().catch((err) => {
    console.error("❌ Migration failed");
    console.error(err);
    process.exit(1);
});