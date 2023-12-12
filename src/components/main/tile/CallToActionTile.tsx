import React from "react";
import { Tile } from "./Tile";
import { VariantProps, cva } from "class-variance-authority";

const ctaTileVariants = cva("w-full min-h-[4rem] md:min-h-[6rem] border-2 border-accent-foreground", {
	variants: {
		text: {
			default: "",
			accent: "text-accent-foreground",
		},
	},
	defaultVariants: {
		text: "default",
	},
});
export type CallToActionVariants = VariantProps<typeof ctaTileVariants>;

export async function CallToActionTile({
	label,
	href,
	text,
}: {
	label: string;
	href: string;
} & CallToActionVariants) {
	return (
		<Tile
			href={href}
			label={label}
			className={ctaTileVariants({ text })}
		/>
	);
}
