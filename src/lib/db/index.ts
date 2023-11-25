import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { registerService } from '../utils/serviceUtils';

export const db = registerService("db", () => {
    const connectionString = process.env.DATABASE_URL!
    const client = postgres(connectionString)
    return drizzle(client);
})