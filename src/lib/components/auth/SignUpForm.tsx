"use client";
import { signUpSchema } from "@/lib/db/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { signUpAction } from "@/lib/actions/auth";
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
