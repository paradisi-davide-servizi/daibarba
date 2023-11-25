import Container from "@/lib/components/Container";
import React from "react";
import { MenuForm } from "../../../../../components/admin/MenuForm";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import { menuSchema } from "@/lib/db/schema/menu";
import { SiteForm } from "@/components/admin/SiteForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function TodaysMenuPage() {
	const values = await safeFindOneKeyValueAction("menu", menuSchema);
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Menù alla carta</CardTitle>
					</CardHeader>
					<CardContent>
						<MenuForm values={values} storeKey={"menu"} />
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}
