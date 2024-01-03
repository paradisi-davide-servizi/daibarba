import { z } from "zod";
import { createFormConfig } from "../../utils";

export const heroSectionSchema = z.object({
	title: z.string().optional().describe("Titolo della sezione \"Hero\""),
	image: z.string().optional().describe("Immagine della sezione \"Hero\""),
	overlayImage:z.string().optional().describe("Immagine in overlay della sezione \"Hero\"")
});

export const aboutSectionSchema = z.object({
	image: z.string().optional().describe("Immagine della sezione \"About\""),
})

export const homeSchema = z.object({
	heroSection: heroSectionSchema.describe("Sezione \"Hero\""),
	aboutSection: aboutSectionSchema.describe("Sezione \"About\""),
}).describe("Home");

export const homeFormConfig = createFormConfig(homeSchema, (returnConfig) => {
	returnConfig({
		heroSection: {
			image: {
				fieldType: "storage"
			},
			overlayImage: {
				fieldType: "storage"
			}
		},
		aboutSection: {
			image: {
				fieldType: "storage"
			}
		},
	})
})