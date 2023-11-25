"use client";
import { signInSchema } from "@/lib/db/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../components/ui/form";
import { signInAction } from "@/lib/actions/auth";
import { Input } from "../../../components/ui/input";
import { ZodForm, useZodForm, ZodFormField } from "@/lib/components/ZodForm";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";

export default function SignInForm() {
	return (
		<AutoForm
			formSchema={signInSchema}
			onSubmit={async (formData) => {
				await signInAction(formData);
			}}>
			<AutoFormSubmit>Sign In</AutoFormSubmit>
		</AutoForm>
	);
}
