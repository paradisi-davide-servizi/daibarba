import { z } from "zod";

export const siteSchema = z.object({
    reservationLink: z.string().url(),
    icon:z.string().optional(),
    logo:z.string().optional(),
    name:z.string(),
    description:z.string().optional(),
})

export const updateSiteSchema = siteSchema.extend({
    revalidatePath: z.string().optional(),
})