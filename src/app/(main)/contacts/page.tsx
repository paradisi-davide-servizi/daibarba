import Container from "@/lib/components/Container";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import React from "react";
import { contactsSchema } from "@/lib/db/schema/contacts";
import { ImageBanner } from "@/components/main/banner/ImageBanner";
import GoogleMapBanner from "@/components/main/banner/GoogleMapBanner";
import GoogleMap from "@/components/main/GoogleMap";
import { EmailLinks } from "@/components/main/contacts/EmailLinks";
import { TelephoneNumberLinks } from "@/components/main/contacts/TelephoneLinks";
import { Locations } from "@/components/main/contacts/Locations";
import { Timetables } from "@/components/main/contacts/Timetable";

export default async function ContactsPage() {
	const contacts = await safeFindOneKeyValueAction(
		"contacts",
		contactsSchema
	);
	return (
		<main>
			<ImageBanner label="contatti" imageSource={contacts?.bannerImage} />
			<Container className=" py-20">
				<div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className=" order-1 md:order-2 flex flex-col gap-y-4">
						<div className=" font-semibold uppercase text-2xl text-accent-foreground">
							Dove e quando
						</div>
						<Locations
							locations={contacts?.locations}
							className=" flex flex-col gap-y-4"
						/>
						<TelephoneNumberLinks
							telephoneNumbers={contacts?.telephoneNumbers}
							className=" flex flex-col gap-y-4"
						/>
						<EmailLinks
							emails={contacts?.emails}
							className=" flex flex-col gap-y-4"
						/>
						<Timetables
							timetables={contacts?.timeTables}
							className=" flex flex-col gap-y-4"
						/>
					</div>
					<div className="relative order-2 md:order-1">
						<div className=" mt-[100%]"></div>
						<GoogleMap
							zoom={15}
							lang="it"
							className=" absolute top-0 left-0 w-full h-full"
							location={contacts?.locations?.[0]}
						/>
					</div>
				</div>
			</Container>
		</main>
	);
}
