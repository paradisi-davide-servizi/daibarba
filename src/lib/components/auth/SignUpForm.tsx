"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { signUpAction } from "@/lib/actions/auth";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { callServerAction } from "@/lib/utils/actionUtils";
import { signUpSchema } from "@/lib/db/schema/auth";

export default function SignUpForm() {
	return (
		<AutoForm
			formSchema={signUpSchema}
			onSubmit={async (formData) => {
				await callServerAction(signUpAction, formData);
			}}
			fieldConfig={{
				password: {
					inputProps: {
						type:"password"
					}
				},
				confirmPassword: {
					inputProps: {
						type:"password"
					}
				}
			}}>
			<AutoFormSubmit>Sign Up</AutoFormSubmit>
		</AutoForm>
	);
}
