"use client";

import { contactsSchema } from "@/lib/db/schema/contacts";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { setKeyValueAction } from "@/lib/utils/actionUtils";
import { StorageFile } from "@/lib/db/schema/file";

export function ContactsForm({
	values,
	images,
}: {
	values?: z.infer<typeof contactsSchema>;
	images: StorageFile[];
}) {
	return (
		<AutoForm
			values={values}
			formSchema={contactsSchema}
			onSubmit={async (formData) => {
				await setKeyValueAction(
					"contacts",
					contactsSchema,
					formData
				);
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
			}}>
			<AutoFormSubmit>Salva impostazioni</AutoFormSubmit>
		</AutoForm>
	);
}
