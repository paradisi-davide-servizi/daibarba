import { z } from "zod";
import { createFormConfig } from "../../utils";

export const siteSchema = z.object({
    name: z.string()
        .describe("Nome del sito"),
    description: z.string()
        .optional()
        .describe("descrizione del sito"),
    icon: z.string()
        .optional()
        .describe("Icona del sito"),
    logo: z.string()
        .optional()
        .describe("Logo del sito"),
    reservationLink: z.string()
        .optional()
        .describe("Link di prenotazione"),
}).describe("Site")

export const siteFormConfig = createFormConfig(siteSchema, (returnConfig) => {
    returnConfig({
        logo: {
            fieldType: "storage",
        },
        icon: {
            fieldType: "storage"
        },
        description: {
            fieldType: "textarea"
        }
    })
})