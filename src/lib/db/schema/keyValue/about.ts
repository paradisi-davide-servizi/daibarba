import { z } from "zod";
import { createFormConfig } from "../../utils";

export const biographySchema = z.object({
    biography: z.string()
        .describe("Biografia dell'autore"),
    image: z.string()
        .describe("Immagine dell'autore")
})
    .describe("Biografia");

export const aboutSchema = z.object({
    paragraph: z.string()
        .describe("Paragrafo descrittivo"),
    authors: z.array(biographySchema)
        .describe("Biografie degli autori")
})
    .describe("About");

export const aboutFormConfig = createFormConfig(aboutSchema, (returnConfig) => {
    returnConfig({
        paragraph: {
            fieldType: "textarea"
        }
    })
});