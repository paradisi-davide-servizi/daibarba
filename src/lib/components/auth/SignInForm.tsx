"use client";
import { signInSchema } from "@/lib/db/schema/auth";
import React from "react";
import { signInAction } from "@/lib/actions/auth";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { callServerAction } from "@/lib/utils/actionUtils";

export default function SignInForm() {
	return (
		<AutoForm
			formSchema={signInSchema}
			onSubmit={async (formData) => {
				await callServerAction(signInAction, formData);
			}}
			fieldConfig={{
				password: {
					inputProps: {
						type:"password"
					}
				}
			}}>
			<AutoFormSubmit>Sign In</AutoFormSubmit>
		</AutoForm>
	);
}
