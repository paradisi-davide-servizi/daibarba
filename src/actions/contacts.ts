"use server"

import { authAction } from "@/lib/actions"
import { homeSchema } from "@/lib/db/schema/home"
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils"
import { revalidatePath } from "next/cache"

export const updateHomeAction = authAction(homeSchema, async home => {
    const result = await safeUpsertKeyValueAction("home", homeSchema, home);
    // if (result) {
    //     revalidatePath("/(admin)/admin/settings/contacts", "page");
    //     revalidatePath("/(main)", "layout");
    //     revalidatePath("/(main)/", "page");
    //     revalidatePath("/(main)/contacts", "page");
    // }
})