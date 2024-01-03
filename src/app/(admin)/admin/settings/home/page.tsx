"use client";

import SettingsForm from "@/components/admin/SettingsForm";
import SettingsPage from "@/components/admin/SettingsPage";
import { homeFormConfig, homeSchema } from "@/lib/db/schema/keyValue/home";
import {
	isExecutingAction,
	useAction,
	useKeyValue,
} from "@/lib/utils/actionHooks";
import { setKeyValueAction } from "@/lib/utils/actionUtils";

export default function HomePage() {
	const home = useKeyValue("home", homeSchema);
	return (
		<SettingsPage title="Home" isLoading={isExecutingAction(home)}>
			<SettingsForm
				values={home.data}
				submitText="Salva impostazioni"
				formConfig={homeFormConfig()}
				onSubmit={async (input) => {
					await setKeyValueAction("home", homeSchema, input);
				}}
			/>
		</SettingsPage>
	);
}
