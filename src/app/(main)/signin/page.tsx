import SignInForm from "@/lib/components/auth/SignInForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { Container } from "@/lib/components/Container";
import StyledLink from "@/lib/components/StyledLink";

export default function SignInPage() {
	return (
		<main>
			<Container className=" min-h-[100vh] items-center justify-center">
				<SignInForm />
			</Container>
		</main>
	);
}
