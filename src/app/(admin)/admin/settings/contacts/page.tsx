"use client";

import SettingsForm from "@/components/admin/SettingsForm";
import SettingsPage from "@/components/admin/SettingsPage";
import { contactsFormConfig, contactsSchema } from "@/lib/db/schema/keyValue/contacts";
import {
	isExecutingAction,
	useAction,
	useKeyValue,
} from "@/lib/utils/actionHooks";
import { setKeyValueAction } from "@/lib/utils/actionUtils";

export default function ContactsPage() {
	const contacts = useKeyValue("contacts", contactsSchema);
	return (
		<SettingsPage
			title="Contatti"
			isLoading={isExecutingAction(contacts)}>
			<SettingsForm
				values={contacts.data}
				submitText="Salva impostazioni"
				formConfig={contactsFormConfig()}
				onSubmit={async (input) => {
					await setKeyValueAction("contacts", contactsSchema, input);
				}}
			/>
		</SettingsPage>
	);
}
