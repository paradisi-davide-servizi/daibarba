import Container from "@/lib/components/Container";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import {
	socialSchema,
	emailSchema,
	locationSchema,
	telephoneNumberSchema,
} from "@/lib/db/schema/contacts";
import {
	SocialNetworkLink,
	SocialNetworkLinks,
} from "./contacts/SocialNetworkLinks";
import { TelephoneNumberLinks } from "./contacts/TelephoneLinks";
import { EmailLinks } from "./contacts/EmailLinks";
import { Locations } from "./contacts/Locations";

export function MainFooter({
	emails,
	socials,
	locations,
	telephoneNumbers,
}: {
	emails?: z.infer<typeof emailSchema>[];
	socials?: z.infer<typeof socialSchema>[];
	locations?: z.infer<typeof locationSchema>[];
	telephoneNumbers?: z.infer<typeof telephoneNumberSchema>[];
}) {
	return (
		<Container className=" bg-stone-800 text-white py-8">
			<div className=" flex flex-col md:flex-row w-full md:justify-between items-center gap-y-4">
				<Locations
					locations={locations}
					className="flex flex-col gap-y-1 items-center md:items-start max-w-xs text-center"
				/>
				<div className=" text-center flex flex-col items-center justify-center">
					<div className=" font-semibold">Contattaci</div>
					<TelephoneNumberLinks
						telephoneNumbers={telephoneNumbers}
						className="flex flex-col gap-y-1 items-center md:items-start text-center"
					/>
					<EmailLinks
						emails={emails}
						className="flex flex-col gap-y-1 items-center md:items-start text-center"
					/>
				</div>
				<SocialNetworkLinks
					iconSize={25}
					socials={socials}
					className=" flex flex-row gap-x-2"
				/>
			</div>
		</Container>
	);
}
