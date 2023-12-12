"use client";
import React, { ReactNode } from "react";
import { z } from "zod";
import { Form } from "../form";
import { DefaultValues, useForm, useFormContext } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../button";
import { cn } from "@/lib/utils";

import { FieldConfig } from "./types";
import {
	ZodObjectOrWrapped,
	getDefaultValues,
	getObjectFormSchema,
} from "./utils";
import AutoFormObject from "./fields/object";
import { useToast } from "../use-toast";

export function AutoFormSubmit({ children }: { children?: React.ReactNode }) {
	const { formState } = useFormContext();
	return (
		<Button disabled={formState.isSubmitting} type="submit" className=" w-full">
			{children ?? "Submit"}
		</Button>
	);
}

function AutoForm<SchemaType extends z.AnyZodObject>({
	formSchema,
	values: valuesProp,
	onValuesChange: onValuesChangeProp,
	onParsedValuesChange,
	onSubmit: onSubmitProp,
	fieldConfig,
	children,
	className,
}: {
	formSchema: SchemaType;
	values?: Partial<z.infer<SchemaType>>;
	onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
	onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
	onSubmit?: (values: z.infer<SchemaType>) => Promise<void>;
	fieldConfig?: FieldConfig<SchemaType>;
	children?: React.ReactNode;
	className?: string;
}) {
	const objectFormSchema = getObjectFormSchema(formSchema);
	const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> =
		getDefaultValues(objectFormSchema);

	const form = useForm<z.infer<typeof objectFormSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
		values: valuesProp,
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {

		const parsedValues = formSchema.safeParse(values);
		if (!parsedValues.success) {
			errorToast(parsedValues.error);
			return;
		}

		try {
			await onSubmitProp?.(parsedValues.data);
		} catch (error) {
			errorToast(error);
			return;
		}

		toast({ title: "Impostazioni salvate" });

		function errorToast(error: any) {
			let message;
			if (error instanceof Error) message = error.message;
			else if (error instanceof z.ZodError) message = error.message;
			else message = String(error);
			toast({
				title: "Errore",
				description: message,
				variant: "destructive",
			});
		}
	}

	const { toast } = useToast();

	return (
		<Form {...form}>
			<form
				onSubmit={async (e) => {
					await form.handleSubmit(onSubmit)(e);
				}}
				onChange={() => {
					const values = form.getValues();
					onValuesChangeProp?.(values);
					const parsedValues = formSchema.safeParse(values);
					if (parsedValues.success) {
						onParsedValuesChange?.(parsedValues.data);
					}
				}}
				className={cn("space-y-5", className)}>
				<AutoFormObject
					schema={objectFormSchema}
					form={form}
					fieldConfig={fieldConfig}
				/>
				{children}
				{/* {JSON.stringify(form.formState.errors)} */}
			</form>
		</Form>
	);
}

export default AutoForm;
