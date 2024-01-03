"use server"

import { fileMetadataSchema } from "../db/schema/fileMetadata";
import { fileMetadataTable } from "../db/table/fileMetadata";
import { getCRUDActions } from "./crud";
import { z } from "zod";

const crudActions = getCRUDActions(fileMetadataTable, fileMetadataSchema, {
    keyName: "id",
    keySchema: { id: z.string() }
});
export const upsertFileMetadataAction = crudActions.upsert;
export const deleteFileMetadataAction = crudActions.delete;
export const findOneFileMetadataAction = crudActions.findOne;