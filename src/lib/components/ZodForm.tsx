"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "postcss";
import React, { ReactNode } from "react";
import {
	ControllerFieldState,
	ControllerRenderProps,
	FieldPath,
	FieldValues,
	UseFormReturn,
	UseFormStateReturn,
	useForm,
} from "react-hook-form";
import { z } from "zod";

export function useZodForm<Schema extends z.Schema>(formSchema: Schema) {
	return useForm<z.infer<Schema>>({
		resolver: zodResolver(formSchema),
	});
}

export function ZodForm<Schema extends z.Schema, Data>({
	form,
	children,
	onSubmit,
	submitText,
}: {
	submitText: string;
	children?: ReactNode;
	form: UseFormReturn<z.infer<Schema>>;
	onSubmit: (formData: z.infer<Schema>) => Promise<Data>;
}) {
	return (
		<Form {...form}>
			<form
				className=" flex flex-col gap-y-4"
				onSubmit={form.handleSubmit(async (formData) => {
					await onSubmit(formData);
				})}>
				{children}
				<Button type="submit" disabled={form.formState.isSubmitting}>
					{submitText}
				</Button>
			</form>
			
			{JSON.stringify(form.formState.isSubmitting)}
		</Form>
	);
}
1;
export function ZodFormField<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>
>({
	form,
	name,
	render,
}: {
	name: TName;
	form: UseFormReturn<TFieldValues>;
	render: ({
		field,
		fieldState,
		formState,
	}: {
		field: ControllerRenderProps<TFieldValues, TName>;
		fieldState: ControllerFieldState;
		formState: UseFormStateReturn<TFieldValues>;
	}) => React.ReactElement;
}) {
	return (
		<FormField
			name={name}
			control={form.control}
			render={(props) => (
				<FormItem>
					<FormLabel>{props.field.name}</FormLabel>
					<FormControl>{render(props)}</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
