import { ImageBanner } from "@/components/main/banner/ImageBanner";
import Menu from "@/components/main/menu/Menu";
import { ReservationTile } from "@/components/main/tile/ReservationTile";
import { Container } from "@/lib/components/Container";
import { MenuType, menuSchema, menuTypeArray } from "@/lib/db/schema/keyValue/menu";
import { getKeyValueAction } from "@/lib/utils/actionUtils";

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
	const { data: menu } = await getKeyValueAction(slug, menuSchema);
	return (
		<main>
			<ImageBanner imageSource={menu?.bannerImage} size={"fixed"}>
				<div className="text-4xl md:text-7xl w-full h-full flex flex-row items-center justify-center text-white uppercase text-center tracking-widest">
					{menu?.title}
				</div>
			</ImageBanner>
			<Container>
				<Menu menu={menu} />
				<ReservationTile
					text={"accent"}
					href={menu?.reservationLink || ""}
				/>
			</Container>
		</main>
	);
}
