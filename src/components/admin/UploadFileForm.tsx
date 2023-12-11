"use client";

import React from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { uploadFileToStorage } from "@/lib/utils/storageUtils";

const uploadImageSchema = z.object({
	image: z
		.any()
		.transform((f) => f as File[])
		.optional(),
});

export function UploadFileForm() {
	return (
		<AutoForm
			formSchema={uploadImageSchema}
			onSubmit={async (formData) => {
				const image = formData.image?.[0];
				if (!image) throw new Error("Immagine non selezionata");
				await uploadFileToStorage(
					"daibarba",
					image,
					(fileName) => ["images", fileName],
					true
				);
			}}
            fieldConfig={{
                image: {
                    fieldType:"file"
                }
            }}>
			<AutoFormSubmit>Carica file</AutoFormSubmit>
		</AutoForm>
	);
}
