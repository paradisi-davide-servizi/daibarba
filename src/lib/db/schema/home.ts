import { z } from "zod";

export const homeSchema = z.object({
	heroImage: z.string().optional(),
});