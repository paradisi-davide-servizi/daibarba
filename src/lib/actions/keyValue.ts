"use server"

import { z } from "zod";
import { getCRUDActions } from "./crud";
import { keyValueSchema } from "../db/schema/keyValue";
import { keyValueTable } from "../db/table/keyValue";

const crudActions = getCRUDActions(keyValueTable, keyValueSchema, {
    keyName:"key",
    keySchema: { key: z.string() }
});
export const deleteKeyValueAction = crudActions.delete;
export const upsertKeyValueAction = crudActions.upsert;
export const findOneKeyValueAction = crudActions.findOne;