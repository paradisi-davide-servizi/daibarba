import { SafeAction } from "next-safe-action";
import { z } from "zod";
import { findOneKeyValueAction, upsertKeyValueAction } from "../actions/keyValue";

export async function callServerAction<Schema extends z.ZodTypeAny, Data>(serverAction: SafeAction<Schema, Data>, input: z.input<Schema>) {
    const result = await serverAction(input);
    if (result.serverError) {
        return {
            data: undefined,
            error: result.serverError
        }
    }
    if (result.validationError) {
        return {
            data: undefined,
            error: result.validationError
        }
    }
    return { data: result.data, error: undefined }
}

export async function getKeyValueAction<Schema extends z.ZodTypeAny>(key: string, schema: Schema) {
    const kvp = await callServerAction(findOneKeyValueAction, { key });
    if (kvp.error) {
        return {
            data: undefined,
            error: kvp.error
        }
    }
    const value = schema.safeParse(kvp.data?.value);
    if (!value.success) {
        return {
            data: undefined,
            error: value.error
        }
    }
    return {
        data: value.data as z.infer<Schema>,
        error: undefined,
    }
}

export async function setKeyValueAction<Schema extends z.ZodTypeAny>(key: string, schema: Schema, value: z.input<Schema>) {
    const result = await callServerAction(upsertKeyValueAction, { key, value });
    if (result.error) {
        return {
            set: false,
            error: result.error,
        }
    }
    return {
        set:true,
        error:undefined,
    }
}