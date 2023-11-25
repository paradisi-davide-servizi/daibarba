import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import Container from "@/lib/components/Container";
import SignUpForm from "@/lib/components/auth/SignUpForm";
import { signUpSchema } from "@/lib/db/schema/auth";
import React from "react";

export default function SignUpPage() {
	return (
		<main>
			<Container>
				<SignUpForm />
			</Container>
		</main>
	);
}
