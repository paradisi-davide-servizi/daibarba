import Container from "@/lib/components/Container";
import React from "react";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import { aboutSchema } from "@/lib/db/schema/about";
import { AboutForm } from "@/components/admin/AboutForm";
import { ContactsForm } from "@/components/admin/ContactsForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function AboutPage() {
	const values = await safeFindOneKeyValueAction("about", aboutSchema);
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Chi siamo</CardTitle>
					</CardHeader>
					<CardContent>
						<AboutForm values={values} />
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}
