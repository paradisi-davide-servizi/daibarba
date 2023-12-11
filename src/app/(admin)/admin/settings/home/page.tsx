import { Container } from "@/lib/components/Container";
import React from "react";
import { MenuForm } from "../../../../../components/admin/MenuForm";
import { menuSchema } from "@/lib/db/schema/menu";
import { SiteForm } from "@/components/admin/SiteForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { homeSchema } from "@/lib/db/schema/home";
import { HomeForm } from "@/components/admin/HomeForm";
import {
	callServerAction,
	safeFindOneKeyValueAction,
} from "@/lib/utils/actionUtils";
import { findManyFilesAction } from "@/lib/actions/file";

export default async function HomePage() {
	const values = await safeFindOneKeyValueAction("home", homeSchema, {
		revalidate: 0,
	});
	const images = await callServerAction(findManyFilesAction, {
		revalidate: 0,
	});
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Home</CardTitle>
					</CardHeader>
					<CardContent>
						<HomeForm values={values} images={images || []} />
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}
