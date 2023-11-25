import { Tile } from "@/components/main/tile/Tile";
import Menu from "@/components/main/menu/Menu";
import Container from "@/lib/components/Container";
import { menuSchema } from "@/lib/db/schema/menu";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import React from "react";
import Image from "next/image";
import { siteSchema } from "@/lib/db/schema/site";
import { StorageImage } from "@/lib/components/StorageImage";
import { ImageBanner } from "@/components/main/banner/ImageBanner";
import { ReservationTile } from "@/components/main/tile/ReservationTile";

export default async function TodaysMenuPage() {
	const todaysMenu = await safeFindOneKeyValueAction(
		"todays-menu",
		menuSchema
	);
	return (
		<main>
			<ImageBanner
				label="menù del giorno"
				imageSource={todaysMenu?.bannerImage}
			/>
			<Container>
				<Menu menu={todaysMenu} />
			</Container>
			<Container>
				<ReservationTile />
			</Container>
		</main>
	);
}
