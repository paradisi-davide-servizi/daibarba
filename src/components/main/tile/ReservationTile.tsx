import React from "react";
import { CallToActionTile } from "./CallToActionTile";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import { siteSchema } from "@/lib/db/schema/site";

export async function ReservationTile() {
	const site = await safeFindOneKeyValueAction("site", siteSchema);
	return (
		<CallToActionTile
			label="prenota un tavolo"
			href={site?.reservationLink || ""}
		/>
	);
}
