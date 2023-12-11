"use server"

import { authAction } from "@/lib/actions"
import { menuSchema, menuTypeArray } from "@/lib/db/schema/menu"
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateMenuShema = z.object({
    menuType: z.enum(menuTypeArray),
    menu: menuSchema
});

export const updateMenuAction = authAction(updateMenuShema, async ({ menu, menuType }) => {
    const result = await safeUpsertKeyValueAction(menuType, menuSchema, menu);
    if(result) {    
        revalidatePath(`/admin/settings/menu/${menuType}`, "page");
        revalidatePath("/(main)", "layout");
    }
});