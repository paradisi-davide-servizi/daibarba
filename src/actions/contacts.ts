"use server"

import { authAction } from "@/lib/actions"
import { contactsSchema } from "@/lib/db/schema/contacts"
import { homeSchema } from "@/lib/db/schema/home"
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils"
import { revalidatePath } from "next/cache"

export const updateHomeAction = authAction(contactsSchema, async contacts => {
    const result = await safeUpsertKeyValueAction("contacts", contactsSchema, contacts);
    if (result) {
        revalidatePath("/admin/settings/contacts", "page");
        revalidatePath("/(main)", "layout");
    }
})