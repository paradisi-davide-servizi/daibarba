"use client";

import SettingsForm from "@/components/admin/SettingsForm";
import SettingsPage from "@/components/admin/SettingsPage";
import { MenuType, menuSchema, menuFormConfig } from "@/lib/db/schema/keyValue/menu";
import {
	isExecutingAction,
	useAction,
	useKeyValue,
} from "@/lib/utils/actionHooks";
import { setKeyValueAction } from "@/lib/utils/actionUtils";

export default function BusinessInfoPage({
	params: { slug },
}: {
	params: { slug: MenuType };
}) {
	const menu = useKeyValue(slug, menuSchema);
	return (
		<SettingsPage title={slug} isLoading={isExecutingAction(menu)}>
			<SettingsForm
				values={menu.data}
				submitText="Salva menù"
				formConfig={menuFormConfig()}
				onSubmit={async (input) => {
					await setKeyValueAction(slug, menuSchema, input);
				}}
			/>
		</SettingsPage>
	);
}
