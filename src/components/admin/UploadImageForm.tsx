"use client";

import React from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { uploadImageToStorage } from "@/lib/utils/storageUtils";
import { callServerAction } from "@/lib/utils/actionUtils";
import { upsertFileAction } from "@/lib/actions/file";

const uploadImageSchema = z.object({
	image: z
		.any()
		.transform((f) => f as File[])
		.optional(),
});

export function UploadImageForm() {
	return (
		<AutoForm
			formSchema={uploadImageSchema}
			onSubmit={async (formData) => {
				const image = formData.image?.[0];
				if (!image) throw new Error("Immagine non selezionata");
				await uploadImageToStorage(
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
