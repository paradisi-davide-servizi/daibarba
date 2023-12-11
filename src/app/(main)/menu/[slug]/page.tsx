import { Tile } from "@/components/main/tile/Tile";
import Menu from "@/components/main/menu/Menu";
import { Container } from "@/lib/components/Container";
import { MenuType, menuSchema, menuTypeArray } from "@/lib/db/schema/menu";
import React from "react";
import Image from "next/image";
import { siteSchema } from "@/lib/db/schema/site";
import { ImageBanner } from "@/components/main/banner/ImageBanner";
import { ReservationTile } from "@/components/main/tile/ReservationTile";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";

export const dynamicParams = false;

export function generateStaticParams() {
	return menuTypeArray.map((menu) => ({
		slug: menu,
	}));
}
export default async function MenuPage({
	params: { slug },
}: {
	params: { slug: MenuType };
}) {
	const menu = await safeFindOneKeyValueAction(slug, menuSchema);
	return (
		<main>
			<ImageBanner imageSource={menu?.bannerImage} size={"fixed"}>
				<div className=" text-7xl w-full h-full flex flex-row items-center justify-center text-white uppercase text-center tracking-widest">{menu?.title}</div>
			</ImageBanner>
			<Container>
				<Menu menu={menu} />
				<ReservationTile text={"accent"}/>
			</Container>
		</main>
	);
}
