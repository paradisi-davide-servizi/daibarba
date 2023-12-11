"use server"

import { authAction } from "@/lib/actions"
import { siteSchema } from "@/lib/db/schema/site"
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils"
import { revalidatePath } from "next/cache"

export const updateSiteAction = authAction(siteSchema, async (site) => {
    const result = await safeUpsertKeyValueAction("site", siteSchema, site);
    if (result) {
        revalidatePath(`/admin/settings/site`, "page");
        revalidatePath("/(admin)", "layout");
        revalidatePath("/(main)", "layout");
    }
})