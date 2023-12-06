import { Tile } from "@/components/main/tile/Tile";
import Menu from "@/components/main/menu/Menu";
import { Container } from "@/lib/components/Container";
import { menuSchema } from "@/lib/db/schema/menu";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import React from "react";
import Image from "next/image";
import { siteSchema } from "@/lib/db/schema/site";
import { ImageBanner } from "@/components/main/banner/ImageBanner";
import { ReservationTile } from "@/components/main/tile/ReservationTile";

export default async function MenuPage() {
	const site = await safeFindOneKeyValueAction("site", siteSchema);
	const menu = await safeFindOneKeyValueAction("menu", menuSchema);
	return (
		<main>
			<ImageBanner imageSource={menu?.bannerImage}>
				menù alla carta
			</ImageBanner>
			<Container>
				<Menu menu={menu} />
			</Container>
			<Container>
				<ReservationTile />
			</Container>
		</main>
	);
}
