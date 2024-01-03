import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { fileMetadataTable } from "../table/fileMetadata";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

const storagBaseFileMetadataPayloadSchema = z.object({
    size: z.number(),
    mimeType: z.string(),
})

const storageUnknownFileMetadataPayloadSchema = storagBaseFileMetadataPayloadSchema.extend({
    fileType: z.literal("unknown"),
});

const storageImageFileMetadataPayloadSchema = storagBaseFileMetadataPayloadSchema.extend({
    fileType: z.literal("image"),
    alt: z.string(),
    width: z.number().min(1),
    height: z.number().min(1),
    blurData: z.string().optional(),
})

const storageIconFileMetadataPayloadSchema = storagBaseFileMetadataPayloadSchema.extend({
    fileType: z.literal("icon"),
})

const storageJsonFileMetadataPayloadSchema = storagBaseFileMetadataPayloadSchema.extend({
    fileType: z.literal("json"),
    json: z.string()
})

export const storageFileMetadataPayloadSchema = z.discriminatedUnion("fileType", [
    storageUnknownFileMetadataPayloadSchema,
    storageImageFileMetadataPayloadSchema,
    storageIconFileMetadataPayloadSchema,
    storageJsonFileMetadataPayloadSchema,
])

export type StorageUnknownFileMetadataPayload = z.infer<typeof storageUnknownFileMetadataPayloadSchema>;
export type StorageImageFileMetadataPayload = z.infer<typeof storageImageFileMetadataPayloadSchema>;
export type StorageIconFileMetadataPayload = z.infer<typeof storageIconFileMetadataPayloadSchema>;
export type StorageFileMetadataPayload = z.infer<typeof storageFileMetadataPayloadSchema>;

export const fileMetadataSchema = createInsertSchema(fileMetadataTable, {
    payload: storageFileMetadataPayloadSchema
});

export type StorageFileMetadata = typeof fileMetadataTable.$inferSelect
