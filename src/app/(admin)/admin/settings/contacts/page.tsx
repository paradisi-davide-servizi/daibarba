import { Container } from "@/lib/components/Container";
import React, { cache } from "react";
import { contactsSchema } from "@/lib/db/schema/contacts";
import { ContactsForm } from "@/components/admin/ContactsForm";
import { MenuForm } from "@/components/admin/MenuForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	
	cachedFindOneKeyValue,
	callServerAction,
	safeFindOneKeyValueAction,
} from "@/lib/utils/actionUtils";
import { findManyFilesAction } from "@/lib/actions/file";
import { unstable_cache } from "next/cache";

const getContacts = cachedFindOneKeyValue("contacts", contactsSchema);

export default async function ContactsPage() {
	const values = await getContacts();
	const images = await callServerAction(findManyFilesAction, {});
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Contatti</CardTitle>
					</CardHeader>
					<CardContent>
						<ContactsForm values={values} images={images || []} />
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}
