import { SafeAction } from "next-safe-action";
import { z } from "zod";
import { findOneKeyValueAction, upsertKeyValueAction } from "../actions/keyValue";

export async function callServerAction<Schema extends z.ZodTypeAny, Data>(serverAction: SafeAction<Schema, Data>, input: z.input<Schema>) {
    const result = await serverAction(input);
    if (!!result?.serverError) {
        throw result.serverError;
    }
    if (!!result?.validationError) {
        throw result.validationError;
    }
    return result?.data;
}

export async function getKeyValueAction<Schema extends z.ZodTypeAny>(key: string, schema: Schema) {
    const kvp = await callServerAction(findOneKeyValueAction, { key });
    const value = schema.safeParse(kvp?.value);
    return value.success ? value.data as z.infer<Schema> : undefined;
}

export async function setKeyValueAction<Schema extends z.ZodTypeAny>(key: string, schema: Schema, value: z.input<Schema>) {
    const result = await callServerAction(upsertKeyValueAction, { key, value });
    return result?.key ? true : false;
}