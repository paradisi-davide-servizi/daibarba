"use client";
import { signUpSchema } from "@/lib/db/schema/auth";
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
import { signUpAction } from "@/lib/actions/auth";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { ZodFormField, ZodForm, useZodForm } from "@/lib/components/ZodForm";
import { supabase } from "./AuthProvider";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";

export default function SignUpForm() {
	return (
		<AutoForm
			formSchema={signUpSchema}
			onSubmit={async (formData) => {
				await signUpAction(formData);
			}}>
			<AutoFormSubmit>Sign Up</AutoFormSubmit>
		</AutoForm>
	);
}
