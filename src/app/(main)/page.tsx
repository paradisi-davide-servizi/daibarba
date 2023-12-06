import Image from "next/image";
import { Container } from "@/lib/components/Container";
import Link from "next/link";
import StyledLink from "@/lib/components/StyledLink";
import { findOneKeyValueAction } from "@/lib/actions/keyValue";
import {
	callServerAction,
	safeFindOneKeyValueAction,
} from "@/lib/utils/actionUtils";
import { cn } from "@/lib/utils";
import { Tile } from "@/components/main/tile/Tile";
import { siteSchema } from "@/lib/db/schema/site";
import { findOneFileAction } from "@/lib/actions/file";
import { menuSchema } from "@/lib/db/schema/menu";
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

function HeroSection({ home }: { home?: z.infer<typeof homeSchema> }) {
	return (
		<>
			<ImageBanner size={"hero"} imageSource={home?.hero.image}>
				<Center>
					<div className=" flex flex-col gap-2 uppercase tracking-widest text-center items-center justify-center">
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
					</div>
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
			{menu?.isVisible && (
				<>
					<FaCircle size={15} className="text-red-800" />
					<ImageBanner imageSource={menu?.bannerImage}>
						<Container className="">
							<div className="flex flex-row justify-start items-start">
								<div
									className={cn(
										" flex flex-row w-full h-full items-center",
										align === "start"
											? "justify-start text-left"
											: "justify-end text-right"
									)}>
									<div className="flex flex-col md:max-w-[50vw] relative text-white gap-4 md:gap-8">
										<div className=" text-4xl uppercase tracking-widest font-semibold">
											{menu.title}
										</div>
										<div className=" text-justify">
											{menu.description}
										</div>
										<CallToActionTile
											href={href}
											label={menu.callToAction}
										/>
									</div>
								</div>
							</div>
						</Container>
					</ImageBanner>
				</>
			)}
		</>
	);
}

function ContactsSection({
	contacts,
}: {
	contacts?: z.infer<typeof contactsSchema>;
}) {
	return (
		<>
			<FaCircle size={15} className="text-red-800" />
			<ImageBanner imageSource={contacts?.bannerImage}>
				<Container className="">
					<div className="flex flex-col md:flex-row justify-start items-center gap-4">
						<GoogleMap
							zoom={15}
							lang="it"
							className="w-full h-96 md:w-[35vw]"
							location={contacts?.locations?.[0]}
						/>
						<Timetables
							className=" text-xl md:text-2xl	flex flex-col items-center justify-end text-white text-center"
							timetables={contacts?.timeTables}
						/>
					</div>
				</Container>
			</ImageBanner>
		</>
	);
}

export default async function Home() {
	const home = await safeFindOneKeyValueAction("home", homeSchema);
	const site = await safeFindOneKeyValueAction("site", siteSchema);
	const menu = await safeFindOneKeyValueAction("menu", menuSchema);
	const contacts = await safeFindOneKeyValueAction(
		"contacts",
		contactsSchema
	);
	const todaysMenu = await safeFindOneKeyValueAction(
		"todays-menu",
		menuSchema
	);
	const specialMenu = await safeFindOneKeyValueAction(
		"special-menu",
		menuSchema
	);
	return (
		<main className="flex flex-col items-center md:px-24 md:p-16 md:gap-12 gap-4">
			<HeroSection home={home} />
			<MenuSection menu={specialMenu} align="start" href="special-menu" />
			<MenuSection menu={todaysMenu} align="end" href="todays-menu" />
			<MenuSection menu={menu} align="start" href="menu" />
			<ContactsSection contacts={contacts} />

			{/* <ImageBanner
				size={"fullScreen"}
				imageSource={home?.timetablesImage}>
				<BannerFull>
					<Container>
						<div className=" flex flex-row items-center gap-8 w-full h-full justify-center">
							<div className="relative w-full">
								<div className=" mt-[100%]"></div>
								<GoogleMap
									zoom={15}
									lang="it"
									className=" absolute top-0 left-0 w-full h-full"
									location={contacts?.locations?.[0]}
								/>
							</div>
							<BannerTitle>
								<Timetables
									className=" text-xl md:text-2xl	flex flex-col items-end justify-end text-right"
									timetables={contacts?.timeTables}
								/>
							</BannerTitle>
						</div>
					</Container>
				</BannerFull>
			</ImageBanner> */}
		</main>
	);
}
