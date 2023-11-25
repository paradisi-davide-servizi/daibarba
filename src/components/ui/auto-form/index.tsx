"use client";
import React from "react";
import { z } from "zod";
import { Form } from "../form";
import { DefaultValues, useForm } from "react-hook-form";

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
	return (
		<Button type="submit" className=" w-full">
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
	onSubmit?: (values: z.infer<SchemaType>) => void;
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

	function onSubmit(values: z.infer<typeof formSchema>) {
		const parsedValues = formSchema.safeParse(values);
		if (parsedValues.success) {
			onSubmitProp?.(parsedValues.data);
		}
	}

	const { toast } = useToast();

	return (
		<Form {...form}>
			<form
				onSubmit={async (e) => {
					try {
						await form.handleSubmit(onSubmit)(e);
						toast({ title: "Impostazioni salvate" });
					} catch (error) {
						let message;
						if (error instanceof Error) message = error.message;
						else message = String(error);
						toast({
							title: "Errore",
							description: message,
							variant: "destructive",
						});
					}
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
			</form>
		</Form>
	);
}

export default AutoForm;
