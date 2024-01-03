"use client";

import { FormConfig } from "@/lib/db/utils";
import { HookResult } from "next-safe-action/hook";
import { ReactNode } from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";

export default function SettingsForm<
	Schema extends z.AnyZodObject,
	Data extends z.infer<Schema>
>({
	values,
	children,
	formConfig,
	submitText,
	onSubmit,
}: {
	values?: Data;
	submitText: string;
	children?: ReactNode;
	formConfig: FormConfig<Schema>;
	onSubmit: (values: z.infer<Schema>) => Promise<void>;
}) {
	return (
		<AutoForm
			values={values}
			onSubmit={onSubmit}
			formSchema={formConfig?.formSchema}
			fieldConfig={formConfig.fieldConfig}>
			{children}
			<AutoFormSubmit>{submitText}</AutoFormSubmit>
		</AutoForm>
	);
}
