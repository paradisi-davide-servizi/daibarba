"use client";

import { siteSchema } from "@/lib/db/schema/site";
import { setKeyValueAction } from "@/lib/utils/actionUtils";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { StorageFile } from "@/lib/db/schema/file";

export function SiteForm({
	values,
	images,
}: {
	values?: z.infer<typeof siteSchema>;
	images: StorageFile[];
}) {
	return (
		<AutoForm
			values={values}
			formSchema={siteSchema}
			onSubmit={async (formData) => {
				await setKeyValueAction("site", siteSchema, formData);
			}}
			fieldConfig={{
				logo: {
					fieldType: "select",
					values: images.map(
						(image) =>
							[image.storagePath, image.storagePath] as [
								string,
								string
							]
					),
				},
				icon: {
					fieldType: "select",
					values: images.map(
						(image) =>
							[image.storagePath, image.storagePath] as [
								string,
								string
							]
					),
				},
			}}>
			<AutoFormSubmit>Salva impostazioni</AutoFormSubmit>
		</AutoForm>
	);
}
