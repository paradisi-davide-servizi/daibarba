import { MainFooter } from "@/components/main/MainFooter";
import { MainNavBar } from "@/components/main/navbar/MainNavBar";
import { StorageImage } from "@/lib/components/StorageImage";
import StyledLink from "@/lib/components/StyledLink";
import { contactsSchema } from "@/lib/db/schema/keyValue/contacts";
import { menuTypeArray, menuSchema } from "@/lib/db/schema/keyValue/menu";
import { siteSchema } from "@/lib/db/schema/keyValue/site";
import { getKeyValueAction } from "@/lib/utils/actionUtils";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: site } = await getKeyValueAction("site", siteSchema);
	const { data: contacts } = await getKeyValueAction(
		"contacts",
		contactsSchema
	);

	if (!site || !contacts) {
		return (
			<div className="flex flex-col justify-center items-center text-5xl font-bold h-screen w-screen">
				SITO IN MANUTENZIONE
			</div>
		);
	}

	const menus = await Promise.all(
		menuTypeArray.map(async (menuKey) => {
			const { data: menu } = await getKeyValueAction(menuKey, menuSchema);
			return {
				menuKey,
				menu,
			};
		})
	);

	return (
		<MainNavBar
			site={site}
			contacts={contacts}
			logo={
				<StorageImage
					image={{ storageName: "daibarba", source: site?.logo }}
					height={100}
					width={100}
					className=" h-24 w-24 object-contain"
				/>
			}
			navItems={
				<>
					<StyledLink href="/">Home</StyledLink>
					{menus
						.filter(({ menu }) => menu?.isVisible)
						.filter(({ menu }) => !menu?.directLinkToReservation)
						.map(({ menu, menuKey }) => (
							<StyledLink key={menuKey} href={`/menu/${menuKey}`}>
								{menu?.title}
							</StyledLink>
						))}
					<StyledLink href="/contacts">Contatti</StyledLink>
					<StyledLink
						href={site?.reservationLink || "/"}
						className=" border-2 border-accent-foreground text-accent-foreground">
						Prenota
					</StyledLink>
				</>
			}>
			{children}
			<MainFooter site={site} contacts={contacts} />
		</MainNavBar>
	);
}
