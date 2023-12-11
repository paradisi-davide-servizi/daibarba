"use server"

import { authAction } from "@/lib/actions"
import { menuSchema, menuTypeArray, updateMenuSchema } from "@/lib/db/schema/menu"
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export const updateMenuAction = authAction(updateMenuSchema, async ({ menu, menuType }) => {
    const result = await safeUpsertKeyValueAction(menuType, menuSchema, menu);
    if(result) {    
        revalidateTag(menuType);
    }
});