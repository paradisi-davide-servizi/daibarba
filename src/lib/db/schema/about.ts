import { z } from "zod";

export const aboutSectionSchema = z.object({
    title:z.string(),
    image: z.string().optional(),
    body: z.string(),
})

export const aboutSchema = z.object({
    bannerImage: z.string().optional(),
    sections: z.array(aboutSectionSchema)
})