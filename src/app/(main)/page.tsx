import HeroSection from "@/lib/components/HeroSection";
import Image from "next/image";
import Container from "@/lib/components/Container";
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

export default async function Home() {
	const home = await safeFindOneKeyValueAction("home", homeSchema);
	const site = await safeFindOneKeyValueAction("site", siteSchema);
	const menu = await safeFindOneKeyValueAction("menu", menuSchema);
	const todaysMenu = await safeFindOneKeyValueAction(
		"todays-menu",
		menuSchema
	);
	return (
		<main>
			<Container className=" min-h-screen">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<Tile
						href={"/about"}
						label="Dai Barba!"
						initialOpacity={1}
						image={{
							storageName: "daibarba",
							source: home?.heroImage,
						}}
						className="order-1 md:col-span-3 h-72 md:h-96 text-white text-4xl md:text-5xl"
					/>
					<Tile
						href={"/todays-menu"}
						label="Menù del giorno"
						image={{
							storageName: "daibarba",
							source: todaysMenu?.bannerImage,
						}}
						className="order-2 md:col-span-2 h-32 md:h-60 text-white"
					/>
					<Tile
						label="Prenota"
						href={site?.reservationLink || "/"}
						className="order-3 h-32 md:h-60 border-2 border-accent-foreground  text-accent-foreground"
					/>
					<Tile
						href={"/menu"}
						label="Menù alla carta"
						image={{
							storageName: "daibarba",
							source: menu?.bannerImage,
						}}
						className="order-4 md:order-5 md:col-span-2 h-32 md:h-60 text-white"
					/>
					<Tile
						href={""}
						label="Carta dei vini"
						className="order-5 md:order-4 h-32 md:h-60 border-2 border-accent-foreground text-accent-foreground"
					/>
				</div>
			</Container>

			{/* <Container className=" bg-accent-foreground text-white">
				<div className="py-16">ciao</div>
			</Container>

			<Container className="">
				<div className="py-16">ciao</div>
			</Container> */}

		</main>
	);
}
