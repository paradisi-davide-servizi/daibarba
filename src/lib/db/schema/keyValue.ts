import { createInsertSchema } from "drizzle-zod";
import { keyValueTable } from "../table/keyValue";

export const keyValueSchema = createInsertSchema(keyValueTable);
export type KeyValue = typeof keyValueTable.$inferSelect;