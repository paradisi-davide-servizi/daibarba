"use client";

import SettingsForm from "@/components/admin/SettingsForm";
import SettingsPage from "@/components/admin/SettingsPage";
import { siteSchema, siteFormConfig } from "@/lib/db/schema/keyValue/site";
import {
	isExecutingAction,
	useAction,
	useKeyValue,
} from "@/lib/utils/actionHooks";
import { setKeyValueAction } from "@/lib/utils/actionUtils";

export default function BusinessInfoPage() {
	const site = useKeyValue("site", siteSchema);
	return (
		<SettingsPage
			title="Impostazioni generali"
			isLoading={isExecutingAction(site)}>
			<SettingsForm
				values={site.data}
				submitText="Salva impostazioni"
				formConfig={siteFormConfig()}
				onSubmit={async (input) => {
					await setKeyValueAction("site", siteSchema, input);
				}}
			/>
		</SettingsPage>
	);
}
