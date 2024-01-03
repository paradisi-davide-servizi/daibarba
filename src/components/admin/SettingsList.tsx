"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { z } from "zod";
import { isExecutingAction, useAction } from "@/lib/utils/actionHooks";
import { SafeAction } from "next-safe-action";
import StyledLink from "@/lib/components/StyledLink";
import { callServerAction } from "@/lib/utils/actionUtils";
import { FaTrash } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";

export default function SettingsList<
	FindItemsSchema extends z.AnyZodObject,
	DeleteItemSchema extends z.AnyZodObject,
	Data
>({
	listName,
	findItems,
	deleteItem,
	addItemText,
}: {
	listName: string;
	addItemText: string;
	findItems: {
		action: SafeAction<FindItemsSchema, Data[]>;
		sort?: (a: Data, b: Data) => number;
		transform: (item: Data) => {
			node: ReactNode;
			key: string;
		};
	};
	deleteItem: {
		action: SafeAction<DeleteItemSchema, Data>;
		args: (item: Data) => z.infer<DeleteItemSchema>;
	};
}) {
	const items = useAction(findItems.action, {});
	const sortedItems = !!findItems.sort
		? items.data?.sort(findItems.sort)
		: items.data;
	return (
		<div className="relative">
			<div className=" flex flex-col gap-4 pb-4">
				{sortedItems?.map((item) => {
					const { key, node } = findItems.transform(item);
					return (
						<div
							className=" flex flex-row justify-start items-center"
							key={key[0]}>
							<StyledLink
								href={`/admin/settings/${listName}/${key}`}
								className="flex-1">
								{node}
							</StyledLink>
							<Button
								size="sm"
								variant="destructive"
								onClick={async () => {
									const args = deleteItem.args(item);
									await callServerAction(
										deleteItem.action,
										args
									);
									items.execute({});
								}}>
								<FaTrash />
							</Button>
						</div>
					);
				})}
			</div>
			<Link href={`/admin/settings/${listName}/create`}>
				<Button>{addItemText}</Button>
			</Link>
			{isExecutingAction(items) && (
				<div className="absolute top-0 left-0 h-full w-full bg-[#ffffffaa] backdrop-blur-sm flex flex-col items-center justify-center">
					<div className="animate-spin">
						<LuLoader2 size={45} />
					</div>
				</div>
			)}
		</div>
	);
}
