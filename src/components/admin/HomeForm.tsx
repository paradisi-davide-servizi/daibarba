"use client";

import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { homeSchema } from "@/lib/db/schema/home";
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";

export function HomeForm({ values }: { values?: z.infer<typeof homeSchema> }) {
	return (
		<AutoForm
			values={values}
			formSchema={homeSchema}
			onSubmit={async (formData) => {
				await safeUpsertKeyValueAction("home", homeSchema, formData);
			}}>
			<AutoFormSubmit>Salva impostazioni</AutoFormSubmit>
		</AutoForm>
	);
}
