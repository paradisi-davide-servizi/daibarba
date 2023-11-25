"use server"

import { z } from "zod";
import { action } from ".";

const getSignedUrlSchema = z.object({
    storageName: z.string(),
    storagePath: z.string()
})

export const getSignedUrlAction = action(getSignedUrlSchema, async (input, ctx) => {
    const { storageName, storagePath } = getSignedUrlSchema.parse(input);
    const storage = ctx.supabase.storage.from(storageName);
    const { data: { publicUrl } } = storage.getPublicUrl(storagePath);
    return publicUrl;
});