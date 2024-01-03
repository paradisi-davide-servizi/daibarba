import { json, pgTable, varchar } from "drizzle-orm/pg-core";
import { StorageFileMetadataPayload } from "../schema/fileMetadata";

export const fileMetadataTable = pgTable("file", {
    id: varchar("id").primaryKey(),
    payload: json("metadata").$type<StorageFileMetadataPayload>(),
});

