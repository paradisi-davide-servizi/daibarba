"use server"

import { authAction } from "@/lib/actions"
import { siteSchema } from "@/lib/db/schema/site"
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const updateSiteSchema = siteSchema.extend({
    revalidatePath: z.string(),
}) 

export const updateSiteAction = authAction(updateSiteSchema, async (site) => {
    const result = await safeUpsertKeyValueAction("site", siteSchema, site);
    if (result) {
        revalidatePath(site.revalidatePath);
    }
})