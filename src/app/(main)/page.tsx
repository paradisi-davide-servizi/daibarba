import Image from "next/image";
import { Container } from "@/lib/components/Container";
import Link from "next/link";
import StyledLink from "@/lib/components/StyledLink";
import { cn } from "@/lib/utils";
import { Tile } from "@/components/main/tile/Tile";
import { siteSchema } from "@/lib/db/schema/site";
import { menuSchema, menuTypeArray } from "@/lib/db/schema/menu";
import { homeSchema } from "@/lib/db/schema/home";
import "../globals.css";
import { Timetables } from "@/components/main/contacts/Timetable";
import { contactsSchema } from "@/lib/db/schema/contacts";
import { ImageBanner } from "@/components/main/banner/ImageBanner";
import Center from "@/lib/components/Center";
import { Banner } from "@/components/main/banner/Banner";
import GoogleMap from "@/components/main/GoogleMap";
import { StorageImage } from "@/lib/components/StorageImage";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { CallToActionTile } from "@/components/main/tile/CallToActionTile";
import { FaCircle, FaDotCircle } from "react-icons/fa";
import { getKeyValueAction } from "@/lib/utils/actionUtils";
import { ReservationTile } from "@/components/main/tile/ReservationTile";

function HeroSection({ home }: { home?: z.infer<typeof homeSchema> }) {
	return (
		<>
			<ImageBanner size={"hero"} imageSource={home?.hero.image} priority gradient={"light"}>
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
						image={{
							storageName: "daibarba",
							source: home?.hero.overlayImage,
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
	href,
}: {
	menu?: z.infer<typeof menuSchema>;
	align: "start" | "end";
	href: string;
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
									<div className=" flex flex-col items-center justify-center h-full">
										{menu?.description}
									</div>
								</div>
								<CallToActionTile
									href={href}
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
				<ImageBanner imageSource={contacts?.bannerImage}>
					<Container>
						<div className="flex flex-col md:flex-row justify-start items-center gap-4">
							<GoogleMap
								zoom={15}
								lang="it"
								className="w-full h-96 md:w-[35vw]"
								location={contacts?.locations?.[0]}
							/>
							<Timetables
								className=" text-xl md:text-2xl gap-y-4	flex flex-col items-center justify-end text-white text-center"
								timetables={contacts?.timeTables}
							/>
						</div>
					</Container>
				</ImageBanner>
			</div>
		</>
	);
}

export default async function Home() {
	const site = await getKeyValueAction("site", siteSchema);
	const home = await getKeyValueAction("home", homeSchema);
	const contacts = await getKeyValueAction("contacts", contactsSchema);

	const menus = await Promise.all(
		menuTypeArray.map(async (menuKey) => ({
			menuKey,
			menu: await getKeyValueAction(menuKey, menuSchema),
		}))
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
							key={menuKey}
							menu={menu}
							href={`menu/${menuKey}`}
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
