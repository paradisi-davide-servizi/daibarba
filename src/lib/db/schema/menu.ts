import { z } from "zod";

export const allergensSchema = z.object({
    one: z.boolean()
        .optional()
        .describe("Cereali contenenti glutine"),

    two: z.boolean()
        .optional()
        .describe("Crostacei e prodotti a base di crostacei"),

    three: z.boolean()
        .optional()
        .describe("Uova e prodotti a base di uova"),

    four: z.boolean()
        .optional()
        .describe("Pesce e prodotti della pesca"),

    five: z.boolean()
        .optional()
        .describe("Arachidi e prodotti a base di arachidi"),

    six: z.boolean()
        .optional()
        .describe("Soia e prodotti a base di soia"),

    seven: z.boolean()
        .optional()
        .describe("Latte e prodotti a base di latte"),

    eight: z.boolean()
        .optional()
        .describe("Frutta a guscio"),

    nine: z.boolean()
        .optional()
        .describe("Sedano e prodotti a base di sedano"),

    ten: z.boolean()
        .optional()
        .describe("Senape e prodotti a base di senape"),

    eleven: z.boolean()
        .optional()
        .describe("Semi di sesamo e prodotti a base di semi di sesamo"),

    twelve: z.boolean()
        .optional()
        .describe("Anidride solforosa e solfiti"),

    thirteen: z.boolean()
        .optional()
        .describe("Lupini e prodotti a base di lupini"),

    fourteen: z.boolean()
        .optional()
        .describe("Molluschi e prodotti a base di molluschi"),
})

export const menuEntrySchema = z.object({
    name: z.string()
        .describe("Nome"),

    description: z.string()
        .optional()
        .describe("Descrizione"),

    price: z.coerce.number()
        .optional()
        .describe("Prezzo"),

    allergens: allergensSchema
        .describe("Allergeni"),

    frozenAtOrigin: z.boolean()
        .optional()
        .describe("Prodotto congelato all'origine"),
})

export const menuCategorySchema = z.object({
    name: z.string()
        .describe("Nome"),

    entries: z.array(menuEntrySchema)
        .describe("Lista dei piatti"),
}).describe("categoria")

export const menuTypeArray = ["special", "today", "a-la-carte"] as const;
export type MenuType = typeof menuTypeArray[number];

export const menuSchema = z.object({
    title: z.string()
        .describe("Titolo del menù"),

    description: z.string()
        .describe("Descrizione"),

    callToAction: z.string()
        .describe("Testo della call to action"),

    reservationLink: z.string()
        .url()
        .describe("Link di prenotazione"),

    bannerImage: z.string()
        .optional()
        .describe("Immagine del menù"),

    isVisible: z.boolean()
        .default(true)
        .describe("Mostra menù"),

    categories: z.array(menuCategorySchema)
        .describe("Categorie del menù"),
})

export const updateMenuSchema = z.object({
    menu: menuSchema,
    menuType: z.enum(menuTypeArray),
})

export const findMenuSchema = z.object({
    menuType: z.enum(menuTypeArray),
})