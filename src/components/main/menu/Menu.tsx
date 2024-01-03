import { Separator } from "@/components/ui/separator";
import { StorageImage } from "@/lib/components/StorageImage";
import StyledLink from "@/lib/components/StyledLink";
import {
	menuEntrySchema,
	allergensSchema,
	menuCategorySchema,
	menuSchema,
} from "@/lib/db/schema/keyValue/menu";
import { notEmpty } from "@/lib/utils/typeUtils";
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
			<div>
				<p>
					<span className=" font-semibold">{menuEntry.name}</span>
					{menuEntry.description && (
						<span className=" font-semibold">: </span>
					)}
					{menuEntry.description && (
						<span>{menuEntry.description}</span>
					)}
				</p>
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
			{(menuEntry.price || 0) > 0 && (
				<p className=" font-semibold ">{menuEntry.price}€</p>
			)}
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
			<h2 className="flex flex-row justify-between uppercase font-semibold text-2xl text-accent-foreground tracking-widest">
				{menuCategory.name}
				{(menuCategory.price || 0) > 0 && (
					<p className=" font-semibold ">{menuCategory.price}€</p>
				)}
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
		<div className="flex flex-col py-8 gap-8">
			{menu?.menuImage && (
				<StorageImage
					priority
					width={800}
					height={1200}
					image={{
						storageName: "daibarba",
						source: menu.menuImage,
					}}
				/>
			)}
			{menu?.categories && (
				<div className=" flex flex-col gap-y-8">
					{menu.categories.map((c, i) => (
						<MenuCategory menuCategory={c} key={i} />
					))}
				</div>
			)}
			{notEmpty(menu?.footer) && (
				<div className=" text-xl font-semibold">{menu.footer}</div>
			)}
		</div>
	);
}
