import { Container }from "@/lib/components/Container";
import React, { cache } from "react";
import { contactsSchema } from "@/lib/db/schema/contacts";
import { ContactsForm } from "@/components/admin/ContactsForm";
import { MenuForm } from "@/components/admin/MenuForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { callServerAction, safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import { findManyFilesAction } from "@/lib/actions/file";
import { unstable_noStore } from "next/cache";

export const dynamic = 'force-dynamic'
export default async function ContactsPage() {
	const values = await safeFindOneKeyValueAction("contacts", contactsSchema);
	const images = await callServerAction(findManyFilesAction, {});
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Contatti</CardTitle>
					</CardHeader>
					<CardContent>
						<ContactsForm values={values} images={images || []}/>
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}
