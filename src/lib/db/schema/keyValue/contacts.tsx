import { Timetable } from "@/components/main/contacts/Timetable";
import { z } from "zod";
import { createFormConfig } from "../../utils";
import { phoneNumberRegExp } from "../../../utils/regexUtils";
import { TelephoneNumberLink } from "@/components/main/contacts/TelephoneLinks";
import { EmailLink } from "@/components/main/contacts/EmailLinks";
import { SocialNetworkLink } from "@/components/main/contacts/SocialNetworkLinks";
import { Location } from "@/components/main/contacts/Locations";

export const emailSchema = z
	.object({
		label: z.string().optional().describe("Etichetta dell'indirizzo email"),
		email: z
			.string()
			.email("Indirizzo email non valido")
			.describe("Indirizzo email"),
	})
	.describe("Indirizzo email");

export const telephoneNumberSchema = z
	.object({
		label: z
			.string()
			.optional()
			.describe("Etichetta del numero di telefono"),
		number: z
			.string()
			.regex(phoneNumberRegExp, "Numero di telefono non valido")
			.describe("Numero di telefono"),
	})
	.describe("Numero di telefono");

export const socialEnumSchema = z
	.enum(["facebook", "instagram", "twitter", "tripadvisor", "threads"])
	.describe("Social network");

export const socialSchema = z
	.object({
		social: socialEnumSchema.describe("Social network"),
		link: z
			.string()
			.url("Url non valido")
			.describe("Link alla pagina social"),
	})
	.describe("Social network");

export const locationSchema = z
	.object({
		address: z.string().describe("Indirizzo"),
		businessName: z.string().optional().describe("Nome della attività"),
	})
	.describe("Posizione");

export const timeIntervalSchema = z
	.object({
		startTime: z.string().describe("Orario di apertura"),
		endTime: z.string().describe("Orario di chiusura"),
	})
	.describe("Intervallo orario");

export const timetableSchema = z
	.object({
		label: z.string().describe("Etichetta della tabella orari"),
		timeIntervals: z.array(timeIntervalSchema).describe("Intervalli orari"),
	})
	.describe("Tabella degli orari");

export const contactsSchema = z
	.object({
		emails: z.array(emailSchema).describe("Indirizzi email"),
		socials: z.array(socialSchema).describe("Pagine social"),
		locations: z.array(locationSchema).describe("Luoghi e posizioni"),
		timeTables: z.array(timetableSchema).describe("Tabelle degli orari"),
		telephoneNumbers: z
			.array(telephoneNumberSchema)
			.describe("Numeri di telefono"),
		image: z
			.string()
			.optional()
			.describe("Immagine nella pagina dei contatti"),
	})
	.describe("Contatti");

export const contactsFormConfig = createFormConfig(
	contactsSchema,
	(returnConfig) => {
		returnConfig({
			image: {
				fieldType: "storage",
			},
			socials: {
				render: {
					renderType: "dialog",
					trigger: (value) => (
						<SocialNetworkLink
							social={{
								social: value.social || "facebook",
								link: value.link || "www.facebook.it",
							}}
							iconSize={35}
						/>
					),
				},
			},
			locations: {
				render: {
					renderType: "dialog",
					trigger: (value) => (
						<Location
							location={{
								address: value.address || "indirizzo",
								businessName:
									value.businessName || "Nome della attività",
							}}
						/>
					),
				},
			},
			emails: {
				render: {
					renderType: "dialog",
					trigger: (value) => (
						<EmailLink
							email={{
								label: value.label || "Email",
								email: value.email || "nome@email.it",
							}}
						/>
					),
				},
			},
			telephoneNumbers: {
				render: {
					renderType: "dialog",
					trigger: (value) => (
						<TelephoneNumberLink
							telephoneNumber={{
								label: value.label || "Numero di telefono",
								number: value.number || "+00 000-000-0000",
							}}
						/>
					),
				},
			},
			timeTables: {
				render: {
					renderType: "dialog",
					trigger: (value) => (
						<Timetable
							timetable={{
								label: value.label || "Tabella degli orari",
								timeIntervals: value.timeIntervals || [
									{ startTime: "00:00", endTime: "00:00" },
								],
							}}
						/>
					),
				},
			},
		});
	}
);

export const contactSchema = z.object({
	name: z.string().optional().describe("Nome e cognome"),
	email: z.string().email().describe("Email"),
	message: z.string().describe("Messaggio"),
});

export const contactFormConfig = createFormConfig(
	contactSchema,
	(returnConfig) => {
		returnConfig({
			message: {
				fieldType: "textarea",
			},
		});
	}
);
