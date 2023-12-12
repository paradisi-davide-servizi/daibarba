import { SafeAction } from "next-safe-action";
import { z } from "zod";
import { findOneFileAction } from "../actions/file";
import { findOneKeyValueAction, upsertKeyValueAction } from "../actions/keyValue";
import { unstable_cache } from "next/cache";
import { keyValues } from "../db/schema/keyValue";

export async function callServerAction<Schema extends z.ZodTypeAny, Data>(serverAction: SafeAction<Schema, Data>, input: z.input<Schema>) {
    const result = await serverAction(input);
    if (!!result?.serverError)
        throw result.serverError;
    if (!!result?.validationError)
        throw result.validationError;
    return result?.data;
}

export async function safeFindOneKeyValueAction<Schema extends z.ZodTypeAny>(key: string, schema: Schema) {
    const kvp = await callServerAction(findOneKeyValueAction, { key });
    const value = schema.safeParse(kvp?.value);
    return value.success ? value.data as z.infer<Schema> : undefined;
}

export async function safeUpsertKeyValueAction<Schema extends z.ZodTypeAny>(key: string, schema: Schema, value: z.infer<Schema>) {
    const parsedValue = schema.safeParse(value);
    if (parsedValue.success) {
        const kvp = await callServerAction(upsertKeyValueAction, { key, value: parsedValue.data });
        return kvp?.key ? true : false;
    }
    return false;
}