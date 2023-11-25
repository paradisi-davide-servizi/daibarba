"use server"

import { z } from "zod";
import { getCRUDActions } from "./crud";
import { keyValues } from "../db/schema/keyValue";

const crudActions = getCRUDActions(keyValues, "key", { key: z.string() });
export const upsertKeyValueAction = crudActions.upsert;
export const findOneKeyValueAction = crudActions.findOne;