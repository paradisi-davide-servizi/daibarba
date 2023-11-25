"use server"

import { z } from "zod";
import { action } from ".";

const getSignedUrlSchema = z.object({
    storageName: z.string(),
    storagePath: z.string()
})

export const getSignedUrlAction = action(getSignedUrlSchema, async (input, ctx) => {
    const { storageName, storagePath } = getSignedUrlSchema.parse(input);
    return new URL(storagePath, `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${storageName}`);
});