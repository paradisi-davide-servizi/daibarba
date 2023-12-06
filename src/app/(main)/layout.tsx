import { MainFooter } from "@/components/main/MainFooter";
import { MainNavBar } from "@/components/main/navbar/MainNavBar";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import StyledLink from "@/lib/components/StyledLink";
import { siteSchema } from "@/lib/db/schema/site";
import { contactsSchema } from "@/lib/db/schema/contacts";
import { StorageImage } from "@/lib/components/StorageImage";
import { menuSchema } from "@/lib/db/schema/menu";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const site = await safeFindOneKeyValueAction("site", siteSchema);
	const contacts = await safeFindOneKeyValueAction(
		"contacts",
		contactsSchema
	);
	const menu = await safeFindOneKeyValueAction("menu", menuSchema);
	const todaysMenu = await safeFindOneKeyValueAction(
		"todays-menu",
		menuSchema
	);
	const specialMenu = await safeFindOneKeyValueAction(
		"special-menu",
		menuSchema
	);
	return (
		<MainNavBar
			logo={
				<StorageImage
					image={{ storageName: "daibarba", source: site?.logo }}
					height={100}
					width={100}
					className=" h-24 w-24"
				/>
			}
			socials={contacts?.socials}
			telephone={{
				showInNavbar: true,
				number: contacts?.telephoneNumbers[0],
			}}
			navItems={
				<>
					<StyledLink href="/">Home</StyledLink>
					{specialMenu?.isVisible && (
						<StyledLink href="/special-menu">
							{specialMenu.title}
						</StyledLink>
					)}
					{todaysMenu?.isVisible && (
						<StyledLink href="/todays-menu">
							{todaysMenu.title}
						</StyledLink>
					)}
					{menu?.isVisible && (
						<StyledLink href="/menu">{menu.title}</StyledLink>
					)}
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
