import { SafeAction } from "next-safe-action";
import { z } from "zod";
import { findOneFileAction } from "../actions/file";
import { findOneKeyValueAction, upsertKeyValueAction } from "../actions/keyValue";

export async function callServerAction<Schema extends z.ZodTypeAny, Data>(serverAction: SafeAction<Schema, Data>, input: z.input<Schema>) {
    const { data, serverError, validationError } = await serverAction(input);
    if (serverError)
        throw serverError;
    if (validationError)
        throw validationError;
    return data;
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