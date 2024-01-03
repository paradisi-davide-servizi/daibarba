import { json, pgTable, varchar } from "drizzle-orm/pg-core";

export const keyValueTable = pgTable("keyValues", {
    key: varchar("key").primaryKey(),
    value: json("value")
});
