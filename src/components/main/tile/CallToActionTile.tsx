import { siteSchema } from "@/lib/db/schema/site";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import React from "react";
import { Tile } from "./Tile";

export async function CallToActionTile({
	label,
	href,
}: {
	label: string;
	href: string;
}) {
	return (
		<Tile
			href={href}
			label={label}
			className="w-full h-20 md:h-24 border-2 border-accent-foreground  text-accent-foreground"
		/>
	);
}
