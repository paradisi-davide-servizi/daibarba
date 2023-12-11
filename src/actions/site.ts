"use server"

import { authAction } from "@/lib/actions"
import { siteSchema, updateSiteSchema } from "@/lib/db/schema/site"
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils"
import { revalidatePath } from "next/cache"

export const updateSiteAction = authAction(updateSiteSchema, async (site) => {
    const result = await safeUpsertKeyValueAction("site", siteSchema, site);
    if (result && site.revalidatePath) {
        revalidatePath(site.revalidatePath, site.revalidateType);
    }
})