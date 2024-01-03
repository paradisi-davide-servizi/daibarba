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
			logo={
				<StorageImage
					image={{ storageName: "daibarba", source: site?.logo }}
					height={100}
					width={100}
					className=" h-24 w-24 object-contain"
				/>
			}
			socials={contacts?.socials}
			telephone={contacts?.telephoneNumbers[0]}
			navItems={
				<>
					<StyledLink href="/">Home</StyledLink>
					{menus
						.filter(({ menu }) => menu?.isVisible)
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
			<MainFooter
				siteName={site?.name}
				emails={contacts?.emails}
				socials={contacts?.socials}
				locations={contacts?.locations}
				telephoneNumbers={contacts?.telephoneNumbers}
				siteLogo={
					<StorageImage
						image={{ storageName: "daibarba", source: site?.logo }}
						height={200}
						width={200}
						className=" h-32 w-32"
					/>
				}
			/>
		</MainNavBar>
	);
}
