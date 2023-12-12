"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { StorageFile, fileMetadataSchema } from "@/lib/db/schema/file";
import { MenuType, menuSchema } from "@/lib/db/schema/menu";
import { safeUpsertKeyValueAction } from "@/lib/utils/actionUtils";
import { z } from "zod";

export function MenuForm({
	menuType,
	values,
	images,
}: {
	menuType: MenuType;
	images: StorageFile[];
	values?: z.infer<typeof menuSchema>;
}) {
	return (
		<AutoForm
			values={values}
			formSchema={menuSchema}
			onSubmit={async (formData) => {
				await safeUpsertKeyValueAction(menuType, menuSchema, formData);
			}}
			fieldConfig={{
				bannerImage: {
					fieldType: "select",
					values: images.map(
						(image) =>
							[image.storagePath, image.storagePath] as [
								string,
								string
							]
					),
				},
				description: {
					fieldType: "textarea",
				},
			}}>
			<AutoFormSubmit>Salva menù</AutoFormSubmit>
		</AutoForm>
	);
}
