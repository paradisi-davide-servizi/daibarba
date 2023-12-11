"use server"

import { files } from "../db/schema/file";
import { getCRUDActions } from "./crud";
import { z } from "zod";

const crudActions = getCRUDActions(files, "file", "storagePath", { storagePath: z.string() });
export const insertFileAction = crudActions.insert;
export const upsertFileAction = crudActions.upsert;
export const updateFileAction = crudActions.update;
export const deleteFileAction = crudActions.delete;
export const findOneFileAction = crudActions.findOne;
export const findManyFilesAction = crudActions.findMany;

// const insertFileActionSchema = fileSchema;
// export const insertFileAction = authAction(insertFileActionSchema, async (input, ctx) => {
//     const data = insertFileActionSchema.parse(input);
//     const rows = await ctx.db
//         .insert(files)
//         .values(data)
//         .returning({ storagePath: files.storagePath });
//     return rows[0];
// });

// const updateFileActionSchema = fileSchema;
// export const updateFileAction = authAction(updateFileActionSchema, async (input, ctx) => {
//     const { storagePath, ...data } = updateFileActionSchema.parse(input);
//     const rows = await ctx.db
//         .update(files)
//         .set(data)
//         .where(eq(files.storagePath, storagePath))
//         .returning();
//     return rows[0];
// });

// const deleteFileActionSchema = fileSchema.pick({ storagePath: true });
// export const deleteFileAction = authAction(deleteFileActionSchema, (input, ctx) => {
//     const { storagePath } = deleteFileActionSchema.parse(input);
//     return ctx.db
//         .delete(files)
//         .where(eq(files.storagePath, storagePath))
//         .returning({ fileId: files.storagePath });
// });

// const findOneFileActionSchema = fileSchema.pick({ storagePath: true });
// export const findOneFileAction = action(findOneFileActionSchema, async (input, ctx) => {
//     const { storagePath } = findOneFileActionSchema.parse(input);
//     const rows = await ctx.db
//         .select()
//         .from(files)
//         .where(eq(files.storagePath, storagePath));
//     return rows[0];
// });

// const findManyFilesActionSchema = z.object({});
// export const findManyFilesAction = action(findManyFilesActionSchema, (_input, ctx) => {
//     return ctx.db
//         .select()
//         .from(files);
// });
