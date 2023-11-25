import {MainFooter} from "@/components/main/MainFooter";
import { MainNavBar } from "@/components/main/navbar/MainNavBar";
import {
	safeFindOneKeyValueAction,
} from "@/lib/utils/actionUtils";
import StyledLink from "@/lib/components/StyledLink";
import { siteSchema } from "@/lib/db/schema/site";
import { contactsSchema } from "@/lib/db/schema/contacts";

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
	return (
		<>
			<MainNavBar
				socials={contacts?.socials}
				telephone={{
					showInNavbar: true,
					number: contacts?.telephoneNumbers[0],
				}}>
				<StyledLink href="/">Home</StyledLink>
				<StyledLink href="/about">Chi siamo</StyledLink>
				<StyledLink href="/todays-menu">Menù del giorno</StyledLink>
				<StyledLink href="/menu">Menù alla carta</StyledLink>
				<StyledLink href="/contacts">Contatti</StyledLink>
				<StyledLink
					href={site?.reservationLink || "/"}
					className=" border-2 border-accent-foreground text-accent-foreground">
					Prenota
				</StyledLink>
			</MainNavBar>
			<div className=" mt-16">{children}</div>
			<MainFooter
				emails={contacts?.emails}
				socials={contacts?.socials}
				locations={contacts?.locations}
				telephoneNumbers={contacts?.telephoneNumbers}
			/>
		</>
	);
}
