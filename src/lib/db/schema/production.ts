import { relations } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from 'drizzle-zod';
import { z } from "zod";
import { MAX_FILE_SIZE, files } from "./file";

export const productions = pgTable("productions", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull().default(""),
    synopsis: text("synopsis").notNull().default(""),
    imagePath: varchar("imagePath").references(() => files.storagePath),
});

export const productionSchema = createSelectSchema(productions, {
    title: (schema) => schema.title.min(1, "min 1 chars"),
    synopsis: (schema) => schema.title.min(1, "min 1 chars"),
});

export const productionFormSchema = productionSchema
    .omit({ id: true, imagePath: true })
    .extend({
        image: z.instanceof(File)
            .refine(file => file.size <= MAX_FILE_SIZE, "Max size is 50mb")
    });

export type Production = z.infer<typeof productionSchema>;