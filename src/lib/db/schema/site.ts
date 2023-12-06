import { z } from "zod";

export const siteSchema = z.object({
    reservationLink: z.string().url(),
    logo:z.string().optional(),
    name:z.string(),
})