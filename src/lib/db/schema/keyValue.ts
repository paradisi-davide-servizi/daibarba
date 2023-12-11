import { json, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const keyValues = pgTable("keyValues", {
    key: varchar("key").primaryKey(),
    value: json("value")
});

