"use client";

import { Container } from "@/lib/components/Container";
import { z } from "zod";

import StyledLink from "@/lib/components/StyledLink";
import { contactsSchema } from "@/lib/db/schema/keyValue/contacts";
import { siteSchema } from "@/lib/db/schema/keyValue/site";
import { EmailLinks } from "./contacts/EmailLinks";
import { Locations } from "./contacts/Locations";
import { SocialNetworkLinks } from "./contacts/SocialNetworkLinks";
import { TelephoneNumberLinks } from "./contacts/TelephoneLinks";

export function MainFooter({
	site,
	contacts,
}: {
	site: z.infer<typeof siteSchema>;
	contacts: z.infer<typeof contactsSchema>;
}) {
	return (
		<Container className="bg-stone-900 text-white py-8">
			<div className=" flex flex-col w-full gap-4">
				<div className=" flex flex-col md:flex-row w-full items-center md:items-start justify-between text-center gap-2">
					<div className=" flex-shrink-0 font-semibold text-xl uppercase text-accent-foreground">
						{site.name}
					</div>
					<div className="flex flex-col md:flex-row justify-between gap-2 md:text-right flex-1 md:pl-8">
						<Locations locations={contacts.locations} />
					</div>
				</div>
				<div className=" text-center flex flex-col md:flex-row justify-between  items-center gap-2">
					<div className=" font-semibold text-xl uppercase  text-accent-foreground">
						Contattaci
					</div>
					<div className="flex flex-col md:flex-row justify-between items-center gap-2 flex-1 md:pl-32">
						<TelephoneNumberLinks
							telephoneNumbers={contacts.telephoneNumbers}
						/>
						<EmailLinks emails={contacts.emails} />
					</div>
				</div>
				<div className=" flex flex-col md:flex-row justify-between items-center text-sm text-stone-400 gap-2">
					DAI BARBA © 2024 P. IVA 12744940961
					{site.privacyNormsLink && (
						<StyledLink href={site.privacyNormsLink}>
							Normative sulla privacy
						</StyledLink>
					)}
					{site.cookiePolicyLink && (
						<StyledLink href={site.cookiePolicyLink}>
							Policy dei cookies
						</StyledLink>
					)}
				</div>
				<div className="flex flex-row gap-4 w-full items-center justify-center">
					<SocialNetworkLinks
						iconSize={25}
						socials={contacts.socials}
					/>
				</div>
			</div>
		</Container>
	);
}
