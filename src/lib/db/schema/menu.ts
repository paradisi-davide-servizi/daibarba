import { z } from "zod";

export const menuEntrySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.coerce.number()
})
export const menuCategorySchema = z.object({
    name: z.string(),
    entries: z.array(menuEntrySchema)
})

export const menuTypeArray = ["special", "today", "a-la-carte"] as const;
export type MenuType = typeof menuTypeArray[number];

export const menuSchema = z.object({
    title: z.string(),
    description: z.string(),
    callToAction: z.string(),
    isVisible: z.boolean().default(true),
    bannerImage: z.string().optional(),
    categories: z.array(menuCategorySchema),
})

export const updateMenuSchema = z.object({
    menu: menuSchema,
    menuType: z.enum(menuTypeArray),
})

export const findMenuSchema = z.object({
    menuType: z.enum(menuTypeArray),
})