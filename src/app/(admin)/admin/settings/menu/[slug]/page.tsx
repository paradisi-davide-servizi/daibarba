import { Container } from "@/lib/components/Container";
import React from "react";
import { MenuForm } from "../../../../../../components/admin/MenuForm";
import { MenuType, menuSchema, menuTypeArray } from "@/lib/db/schema/menu";
import { SiteForm } from "@/components/admin/SiteForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { callServerAction, safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import { findManyFilesAction } from "@/lib/actions/file";

export const dynamicParams = false;

export function generateStaticParams() {
	return menuTypeArray.map((menu) => ({
		slug: menu,
	}));
}

export default async function TodaysMenuPage({
	params: { slug },
}: {
	params: { slug: MenuType };
}) {
	const menu = await safeFindOneKeyValueAction(slug, menuSchema);
	const images = await callServerAction(findManyFilesAction, {});
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle className=" uppercase">{menu?.title || slug}</CardTitle>
					</CardHeader>
					<CardContent>
						<MenuForm values={menu} menuType={slug} images={images || []}/>
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}
