"use server"

import { action, authAction } from "@/lib/actions"
import { MenuType, findMenuSchema, menuSchema, menuTypeArray, updateMenuSchema } from "@/lib/db/schema/menu"
import { cacheFindOneKeyValue, safeFindOneKeyValueAction, safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { z } from "zod";

export const updateMenuAction = authAction(updateMenuSchema, async ({ menu, menuType }) => {
    const result = await safeUpsertKeyValueAction(menuType, menuSchema, menu);
    if(result) {    
        revalidateTag(menuType);
    }
});