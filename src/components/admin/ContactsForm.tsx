"use client"

import { contactsSchema } from "@/lib/db/schema/contacts";
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";

export function ContactsForm({ values }: { values?: z.infer<typeof contactsSchema> }) {
	return (
		<AutoForm
			values={values}
			formSchema={contactsSchema}
			onSubmit={async (formData) => {
				await safeUpsertKeyValueAction("contacts", contactsSchema, formData);
			}}>
			<AutoFormSubmit>Salva impostazioni</AutoFormSubmit>
		</AutoForm>
	);
}
