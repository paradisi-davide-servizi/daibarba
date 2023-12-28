import React from "react";
import { CallToActionTile, CallToActionVariants } from "./CallToActionTile";
import { getKeyValueAction } from "@/lib/utils/actionUtils";
import { siteSchema } from "@/lib/db/schema/site";

export async function ReservationTile({ text, href }: { href:string } & CallToActionVariants) {
	const site = await getKeyValueAction("site", siteSchema);
	return (
		<CallToActionTile
			text={text}
			href={href}
			label="prenota un tavolo"
		/>
	);
}
