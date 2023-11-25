import { z } from "zod";

export const menuEntrySchema = z.object({
    name: z.string(),
    description:z.string().optional(),
    price: z.coerce.number()
})
export const menuCategorySchema = z.object({
    name: z.string(),
    entries: z.array(menuEntrySchema)
})
export const menuSchema = z.object({
    bannerImage:z.string().optional(),
    categories: z.array(menuCategorySchema)
})