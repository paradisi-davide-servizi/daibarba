"use client";

import { siteSchema } from "@/lib/db/schema/site";
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";

export function SiteForm({ values }: { values?: z.infer<typeof siteSchema> }) {
	return (
		<AutoForm
			values={values}
			formSchema={siteSchema}
			onSubmit={async (formData) => {
				await safeUpsertKeyValueAction("site", siteSchema, formData);
			}}>
			<AutoFormSubmit>Salva impostazioni</AutoFormSubmit>
		</AutoForm>
	);
}
