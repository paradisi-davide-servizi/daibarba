import { z } from "zod";

export const allergensSchema = z.object({
    one: z.boolean()
        .optional()
        .describe("Cereali contenenti glutine (1)"),

    two: z.boolean()
        .optional()
        .describe("Crostacei e prodotti a base di crostacei (2)"),

    three: z.boolean()
        .optional()
        .describe("Uova e prodotti a base di uova (3)"),

    four: z.boolean()
        .optional()
        .describe("Pesce e prodotti della pesca (4)"),

    five: z.boolean()
        .optional()
        .describe("Arachidi e prodotti a base di arachidi (5)"),

    six: z.boolean()
        .optional()
        .describe("Soia e prodotti a base di soia (6)"),

    seven: z.boolean()
        .optional()
        .describe("Latte e prodotti a base di latte (7)"),

    eight: z.boolean()
        .optional()
        .describe("Frutta a guscio (8)"),

    nine: z.boolean()
        .optional()
        .describe("Sedano e prodotti a base di sedano (9)"),

    ten: z.boolean()
        .optional()
        .describe("Senape e prodotti a base di senape (10)"),

    eleven: z.boolean()
        .optional()
        .describe("Semi di sesamo e prodotti a base di semi di sesamo (11)"),

    twelve: z.boolean()
        .optional()
        .describe("Anidride solforosa e solfiti (12)"),

    thirteen: z.boolean()
        .optional()
        .describe("Lupini e prodotti a base di lupini (13)"),

    fourteen: z.boolean()
        .optional()
        .describe("Molluschi e prodotti a base di molluschi (14)"),
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
        .optional()
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