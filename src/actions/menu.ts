"use server"

import { authAction } from "@/lib/actions"
import { menuSchema, menuTypeArray, updateMenuSchema } from "@/lib/db/schema/menu"
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateMenuAction = authAction(updateMenuSchema, async ({ menu, menuType }) => {
    const result = await safeUpsertKeyValueAction(menuType, menuSchema, menu);
    if(result) {    
        revalidatePath(`/(admin)/admin/settings/menu/${menuType}`, "page");
        revalidatePath(`/(main)/menu/${menuType}`, "page");
        revalidatePath("/(main)", "page");
    }
});