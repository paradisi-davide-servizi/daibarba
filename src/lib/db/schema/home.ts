import { z } from "zod";

export const heroSchema = z.object({
	title: z.string(),
	image: z.string().optional(),
	prefix: z.string().optional(),
	postfix: z.string().optional(),
})
export const homeSchema = z.object({
	hero: heroSchema,
	timetablesImage: z.string().optional(),
});