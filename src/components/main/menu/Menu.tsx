import { Separator } from "@/components/ui/separator";
import StyledLink from "@/lib/components/StyledLink";
import {
	allergensSchema,
	menuCategorySchema,
	menuEntrySchema,
	menuSchema,
} from "@/lib/db/schema/menu";
import React from "react";
import { z } from "zod";

function MenuEntry({
	menuEntry,
}: {
	menuEntry: z.infer<typeof menuEntrySchema>;
}) {
	const allergenKeys = Object.keys(allergensSchema.shape) as (keyof z.infer<
		typeof allergensSchema
	>)[];
	const allergens = allergenKeys
		.map((key, i) => [menuEntry.allergens?.[key], i] as [boolean, number])
		.filter(([value]) => value)
		.map(([, number]) => number + 1);

	return (
		<div className="flex flex-row justify-between items-start gap-x-8">
			<p>
				<span className=" font-semibold">{menuEntry.name}</span>
				{menuEntry.description && (
					<span className=" font-semibold">: </span>
				)}
				{menuEntry.description && <span>{menuEntry.description}</span>}
				<div>
					{allergens.length > 0 && (
						<span className=" text-sm font-semibold">
							{" "}
							*({allergens.join("/")})
						</span>
					)}
					{menuEntry.frozenAtOrigin && (
						<span className=" text-sm font-semibold"> **</span>
					)}
				</div>
			</p>
			{menuEntry.price && <p className=" font-semibold ">{menuEntry.price}€</p>}
		</div>
	);
}

function MenuCategory({
	menuCategory,
}: {
	menuCategory: z.infer<typeof menuCategorySchema>;
}) {
	return (
		<div className=" flex flex-col">
			<h2 className=" uppercase font-semibold text-2xl text-accent-foreground tracking-widest">
				{menuCategory.name}
			</h2>
			<hr className=" w-full border-[1px] border-accent-foreground my-4" />

			<div className=" flex flex-col gap-y-4">
				{menuCategory.entries.map((e, i) => (
					<MenuEntry menuEntry={e} key={i} />
				))}
			</div>
		</div>
	);
}

export default function Menu({ menu }: { menu?: z.infer<typeof menuSchema> }) {
	return (
		<div className=" py-8">
			{menu?.categories && (
				<div className=" flex flex-col gap-y-8">
					{menu.categories.map((c, i) => (
						<MenuCategory menuCategory={c} key={i} />
					))}
				</div>
			)}
		</div>
	);
}
