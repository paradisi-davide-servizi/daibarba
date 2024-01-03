import { Container } from "@/lib/components/Container";
import React from "react";
import { StorageImage } from "@/lib/components/StorageImage";
import { getKeyValueAction } from "@/lib/utils/actionUtils";
import { siteSchema } from "@/lib/db/schema/keyValue/site";

export default async function NotFound() {
	const { data: site } = await getKeyValueAction("site", siteSchema);
	return (
		<main>
			<Container className="min-h-screen justify-center">
				<div className=" flex flex-col items-center justify-center h-full w-full">
					<StorageImage
						alt="logo"
						width={500}
						height={500}
						image={{
							storageName: "daibarba",
							source: site?.logo,
						}}
					/>
					<p className=" text-4xl font-semibold">
						Ops! qualcosa è andato storto
					</p>
				</div>
			</Container>
		</main>
	);
}
