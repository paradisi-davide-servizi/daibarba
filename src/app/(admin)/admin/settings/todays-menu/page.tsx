import { MenuForm } from "@/components/admin/MenuForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Container from "@/lib/components/Container";
import { menuSchema } from "@/lib/db/schema/menu";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import React from "react";

export default async function TodaysMenu() {
	const values = await safeFindOneKeyValueAction("todays-menu", menuSchema);
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Menù del giorno</CardTitle>
					</CardHeader>
					<CardContent>
						<MenuForm values={values} storeKey={"todays-menu"} />
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}
