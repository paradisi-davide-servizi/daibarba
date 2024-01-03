import { Container } from "@/lib/components/Container";
import SignInForm from "@/lib/components/auth/SignInForm";

export default function SignInPage() {
	
	return (
		<main>
			<Container className=" min-h-[100vh] items-center justify-center">
				<SignInForm />
			</Container>
		</main>
	);
}
