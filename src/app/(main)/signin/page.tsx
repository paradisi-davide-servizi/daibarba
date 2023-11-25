import SignInForm from "@/lib/components/auth/SignInForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
	return (
		<main>
			<div className=" flex flex-col gap-y-4">
				<SignInForm />
				<Separator />
				<Button asChild>
					<Link href={"/signup"}>Sign Up</Link>
				</Button>
			</div>
		</main>
	);
}
