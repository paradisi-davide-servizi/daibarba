import React from "react";
import { CallToActionTile, CallToActionVariants } from "./CallToActionTile";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import { siteSchema } from "@/lib/db/schema/site";

export async function ReservationTile({ text }: {} & CallToActionVariants) {
	const site = await safeFindOneKeyValueAction("site", siteSchema);
	return (
		<CallToActionTile
			text={text}
			label="prenota un tavolo"
			href={site?.reservationLink || ""}
		/>
	);
}
