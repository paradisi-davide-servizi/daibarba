"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { upsertKeyValueAction } from "@/lib/actions/keyValue";
import { menuSchema } from "@/lib/db/schema/menu";
import { callServerAction } from "@/lib/utils/actionUtils";
import { z } from "zod";

export function MenuForm({
	storeKey,
	values,
}: {
	storeKey: "menu" | "todays-menu";
	values?: z.infer<typeof menuSchema>;
}) {
	return (
		<AutoForm
			values={values}
			formSchema={menuSchema}
			onSubmit={async (formData) => {
				await callServerAction(upsertKeyValueAction, {
					key: storeKey,
					value: formData,
				});
			}}>
			<AutoFormSubmit>Salva menù</AutoFormSubmit>
		</AutoForm>
	);
}
