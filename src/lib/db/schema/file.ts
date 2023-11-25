import { json, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const fileType = pgEnum("fileType", ["image"]);

const baseMetadata = z.object({
    size: z.number(),
    mimeType: z.string(),
})

const unknownMetadataSchema = baseMetadata.extend({
    fileType: z.literal("unknown"),
});

const imageFileMetadataSchema = baseMetadata.extend({
    fileType: z.literal("image"),
    alt: z.string(),
    width: z.number().min(1),
    height: z.number().min(1),
    blurData: z.string().optional(),
})

const jsonFileMetadataSchema = baseMetadata.extend({
    fileType: z.literal("json"),
    json: z.string()
})

export const fileMetadataSchema = z.discriminatedUnion("fileType", [
    unknownMetadataSchema,
    jsonFileMetadataSchema,
    imageFileMetadataSchema,
])

export type UnknownFileMetadata = z.infer<typeof unknownMetadataSchema>;
export type ImageFileMetadata = z.infer<typeof imageFileMetadataSchema>;
export type FileMetadata = z.infer<typeof fileMetadataSchema>;

export const files = pgTable("file", {
    storagePath: varchar("storagePath").primaryKey(),
    metadata: json("metadata").$type<FileMetadata>(),
});

const fileSchema = createSelectSchema(files, {
    metadata: fileMetadataSchema
});

export type StorageFile = z.infer<typeof fileSchema>;
