import GoogleMap from "@/components/main/GoogleMap";
import { ImageBanner } from "@/components/main/banner/ImageBanner";
import { EmailLinks } from "@/components/main/contacts/EmailLinks";
import { Locations } from "@/components/main/contacts/Locations";
import { TelephoneNumberLinks } from "@/components/main/contacts/TelephoneLinks";
import { Timetables } from "@/components/main/contacts/Timetable";
import { Container } from "@/lib/components/Container";
import { contactsSchema } from "@/lib/db/schema/keyValue/contacts";
import { getKeyValueAction } from "@/lib/utils/actionUtils";

export default async function ContactsPage() {
	const { data: contacts } = await getKeyValueAction(
		"contacts",
		contactsSchema
	);
	return (
		<main>
			<ImageBanner imageSource={contacts?.image} size={"fixed"}>
				<div className="text-4xl md:text-7xl w-full h-full flex flex-row items-center justify-center text-white uppercase text-center tracking-widest">
					contatti
				</div>
			</ImageBanner>
			<Container className=" py-20">
				<div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className=" order-1 md:order-2 flex flex-col gap-y-4">
						<div className=" font-semibold uppercase text-2xl text-accent-foreground">
							Dove e quando
						</div>
						<div className="flex flex-col gap-y-4">
							<Locations locations={contacts?.locations} />
						</div>
						<div className="flex flex-col gap-y-4">
							<TelephoneNumberLinks
								telephoneNumbers={contacts?.telephoneNumbers}
							/>
						</div>
						<div className="flex flex-col gap-y-4">
							<EmailLinks emails={contacts?.emails} />
						</div>
						<div className="flex flex-col gap-y-4">
							<Timetables timetables={contacts?.timeTables} />
						</div>
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
