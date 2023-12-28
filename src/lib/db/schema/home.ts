import { z } from "zod";

export const heroSchema = z.object({
	image: z.string().optional(),
	overlayImage: z.string().optional(),
})
export const homeSchema = z.object({
	hero: heroSchema,
});