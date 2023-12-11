"use client";

import { siteSchema } from "@/lib/db/schema/site";
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { StorageFile } from "@/lib/db/schema/file";
import { updateSiteAction, updateSiteSchema } from "@/actions/site";

export function SiteForm({
	values,
	images,
}: {
	values?: z.infer<typeof siteSchema>;
	images: StorageFile[];
}) {
	return (
		<AutoForm
			values={{...values, revalidatePath:""}}
			formSchema={updateSiteSchema}
			onSubmit={async (formData) => {
				await updateSiteAction(formData);
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
