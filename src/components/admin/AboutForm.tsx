"use client"

import { aboutSchema } from "@/lib/db/schema/about";
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";

export function AboutForm({ values }: { values?: z.infer<typeof aboutSchema> }) {
	return (
		<AutoForm
			values={values}
			formSchema={aboutSchema}
			onSubmit={async (formData) => {
				await safeUpsertKeyValueAction("about", aboutSchema, formData);
			}}>
			<AutoFormSubmit>Salva impostazioni</AutoFormSubmit>
		</AutoForm>
	);
}
