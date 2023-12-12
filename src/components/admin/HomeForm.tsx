"use client";

import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { homeSchema } from "@/lib/db/schema/home";
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";
import { StorageFile } from "@/lib/db/schema/file";
import { upsertKeyValueAction } from "@/lib/actions/keyValue";

export function HomeForm({
	values,
	images,
}: {
	values?: z.infer<typeof homeSchema>;
	images: StorageFile[];
}) {
	return (
		<AutoForm
			values={values}
			formSchema={homeSchema}
			onSubmit={async (formData) => {
				await safeUpsertKeyValueAction("home", homeSchema, formData);
			}}
			fieldConfig={{
				hero: {
					image: {
						fieldType: "select",
						values: images.map(
							(image) =>
								[image.storagePath, image.storagePath] as [
									string,
									string
								]
						),
					},
				},
			}}>
			<AutoFormSubmit>Salva impostazioni</AutoFormSubmit>
		</AutoForm>
	);
}
