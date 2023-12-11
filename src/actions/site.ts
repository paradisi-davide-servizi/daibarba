"use server"

import { authAction } from "@/lib/actions"
import { siteSchema } from "@/lib/db/schema/site"
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils"
import { revalidatePath, revalidateTag } from "next/cache"

export const updateSiteAction = authAction(siteSchema, async (site) => {
    const result = await safeUpsertKeyValueAction("site", siteSchema, site);
    if (result) {
        revalidateTag("site")
    }
})