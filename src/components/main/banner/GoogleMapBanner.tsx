import { StorageImage } from "@/lib/components/StorageImage";
import { StorageFile } from "@/lib/db/schema/file";
import React from "react";
import GoogleMap from "../GoogleMap";
import { locationSchema } from "@/lib/db/schema/contacts";
import { z } from "zod";
import { Banner, BannerFull } from "./Banner";

export default function GoogleMapBanner({
	location,
}: {
	location?: z.infer<typeof locationSchema>;
}) {
	return (
		<Banner>
			<BannerFull>
				<GoogleMap
					zoom={15}
					lang="it"
					className=" h-full w-full"
					location={location}
				/>
			</BannerFull>
		</Banner>
	);
}
