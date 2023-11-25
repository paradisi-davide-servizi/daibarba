import Container from "@/lib/components/Container";
import React from "react";
import Image from "next/image";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import { siteSchema } from "@/lib/db/schema/site";
import { StorageImage } from "@/lib/components/StorageImage";
import { aboutSchema } from "@/lib/db/schema/about";
import { ImageBanner } from "@/components/main/banner/ImageBanner";
import { CallToActionTile } from "@/components/main/tile/CallToActionTile";

export default async function AboutPage() {
	const about = await safeFindOneKeyValueAction("about", aboutSchema);
	return (
		<main>
			<ImageBanner label="chi siamo" imageSource={about?.bannerImage} />
			{about?.sections &&
				about.sections.map((s, i) => (
					<Container key={i}>
						<div className=" text-2xl font-semibold tracking-widest uppercase">
							{s.title}
						</div>
						<hr className=" w-full border-[1px] border-accent-foreground my-4" />
						<div className=" text-justify">{s.body}</div>
					</Container>
				))}
			<Container>
				<CallToActionTile label="scopri il menù" href="/menu" />
			</Container>
		</main>
	);
}
