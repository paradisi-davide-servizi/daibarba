import Container from "@/lib/components/Container";
import React from "react";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import { contactsSchema } from "@/lib/db/schema/contacts";
import { ContactsForm } from "@/components/admin/ContactsForm";
import { MenuForm } from "@/components/admin/MenuForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function ContactsPage() {
	const values = await safeFindOneKeyValueAction("contacts", contactsSchema);
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Contatti</CardTitle>
					</CardHeader>
					<CardContent>
						<ContactsForm values={values} />
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}
