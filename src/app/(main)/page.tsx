import GoogleMap from "@/components/main/GoogleMap";
import { ImageBanner } from "@/components/main/banner/ImageBanner";
import { Timetables } from "@/components/main/contacts/Timetable";
import { CallToActionTile } from "@/components/main/tile/CallToActionTile";
import { ReservationTile } from "@/components/main/tile/ReservationTile";
import Center from "@/lib/components/Center";
import { Container } from "@/lib/components/Container";
import { StorageImage } from "@/lib/components/StorageImage";
import { cn } from "@/lib/utils";
import { getKeyValueAction } from "@/lib/utils/actionUtils";
import { FaCircle } from "react-icons/fa";
import { z } from "zod";
import "../globals.css";
import { contactsSchema } from "@/lib/db/schema/keyValue/contacts";
import { homeSchema } from "@/lib/db/schema/keyValue/home";
import {
	MenuType,
	menuSchema,
	menuTypeArray,
} from "@/lib/db/schema/keyValue/menu";
import { siteSchema } from "@/lib/db/schema/keyValue/site";

function HeroSection({ home }: { home?: z.infer<typeof homeSchema> }) {
	return (
		<>
			<ImageBanner
				priority
				size={"hero"}
				gradient={"light"}
				imageSource={home?.heroSection.image}>
				<Center>
					{/* <div className=" flex flex-col gap-2 uppercase tracking-widest text-center items-center justify-center">
						{home?.hero.prefix && (
							<div className=" text-2xl md:text-3xl text-green-500">
								{home?.hero.prefix}
							</div>
						)}
						{home?.hero.title && (
							<div className=" text-7xl md:text-8xl text-white">
								{home?.hero.title}
							</div>
						)}
						{home?.hero.postfix && (
							<div className=" text-2xl md:text-3xl text-red-500">
								{home?.hero.postfix}
							</div>
						)}
					</div> */}
					<StorageImage
						priority
						width={500}
						height={500}
						quality={100}
						image={{
							storageName: "daibarba",
							source: home?.heroSection.overlayImage,
						}}
						className="w-5/6 h-5/6 object-contain"
					/>
				</Center>
			</ImageBanner>
		</>
	);
}

function MenuSection({
	menu,
	align,
	menuKey,
}: {
	align: "start" | "end";
	menu?: z.infer<typeof menuSchema>;
	menuKey: MenuType;
}) {
	return (
		<>
			<FaCircle
				size={15}
				className="text-accent-foreground self-center"
			/>
			<div className=" flex flex-col">
				<div
					className={cn(
						" text-2xl md:text-4xl uppercase tracking-widest font-semibold  from-[#D6AD60] to-[#B68D40]  text-white px-8 py-6",
						align === "end"
							? "justify-start text-left bg-gradient-to-l"
							: "justify-end text-right bg-gradient-to-r"
					)}>
					{menu?.title}
				</div>
				<ImageBanner
					imageSource={menu?.bannerImage}
					gradient={align === "start" ? "to_r" : "to_l"}>
					<Container>
						<div
							className={cn(
								" flex flex-row w-full h-full items-center",
								align === "start"
									? "justify-start text-left"
									: "justify-end text-right"
							)}>
							<div className="flex flex-col md:w-[65%] relative text-white gap-4 md:gap-8 w-full h-full">
								<div className=" text-justify text-md md:text-lg flex-1">
									<div
										className={cn(
											"flex flex-col justify-center h-full gap-2 text-justify",
											align === "start"
												? "items-start"
												: "items-end"
										)}>
										{menu?.menuDate && (
											<div className=" text-xl font-semibold">
												{menu.menuDate}
											</div>
										)}
										{menu?.description}
									</div>
								</div>
								<CallToActionTile
									href={
										menu?.directLinkToReservation
											? menu.reservationLink
											: `menu/${menuKey}`
									}
									label={menu?.callToAction || ""}
								/>
							</div>
						</div>
					</Container>
				</ImageBanner>
			</div>
		</>
	);
}

function ContactsSection({
	contacts,
	align,
}: {
	align: "start" | "end";
	contacts?: z.infer<typeof contactsSchema>;
}) {
	return (
		<>
			<FaCircle
				size={15}
				className=" text-accent-foreground self-center"
			/>
			<div className=" flex flex-col">
				<div
					className={cn(
						" text-2xl md:text-4xl uppercase tracking-widest font-semibold  from-[#D6AD60] to-[#B68D40]  text-white px-8 py-6",
						align === "end"
							? "justify-start text-left bg-gradient-to-l"
							: "justify-end text-right bg-gradient-to-r"
					)}>
					contatti
				</div>
				<ImageBanner imageSource={contacts?.image}>
					<Container>
						<div className="flex flex-col md:flex-row justify-start items-center gap-4">
							<GoogleMap
								zoom={15}
								lang="it"
								className="w-full h-96 md:w-[35vw]"
								location={contacts?.locations?.[0]}
							/>
							<div className=" text-xl md:text-2xl gap-y-4	flex flex-col items-center justify-end text-white text-center">
								<Timetables timetables={contacts?.timeTables} />
							</div>
						</div>
					</Container>
				</ImageBanner>
			</div>
		</>
	);
}

export default async function Home() {
	const { data: site } = await getKeyValueAction("site", siteSchema);
	const { data: home } = await getKeyValueAction("home", homeSchema);
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
		<main className="flex flex-col items-center">
			<HeroSection home={home} />
			<div className=" w-full md:max-w-4xl flex flex-col items-stretch p-5 md:py-8 gap-8 md:gap-12">
				<ReservationTile
					text={"accent"}
					href={site?.reservationLink || ""}
				/>
				{menus
					.filter(({ menu }) => menu?.isVisible)
					.map(({ menu, menuKey }, i) => (
						<MenuSection
							menu={menu}
							key={menuKey}
							menuKey={menuKey}
							align={i % 2 === 0 ? "start" : "end"}
						/>
					))}
				<ContactsSection
					contacts={contacts}
					align={menus.length % 2 === 0 ? "start" : "end"}
				/>
			</div>
		</main>
	);
}
