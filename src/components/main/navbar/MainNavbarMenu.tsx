"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPhone } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { socialSchema, telephoneNumberSchema } from "@/lib/db/schema/contacts";
import { z } from "zod";
import { StorageImage } from "@/lib/components/StorageImage";

export function Navbar({
	logo,
	isOpen,
	children,
	telephone,
	className,
	setIsOpen,
}: {
	isOpen: boolean;
	logo?: ReactNode;
	children?: ReactNode;
	className?: string;
	telephone?: {
		showInNavbar: boolean;
		number?: z.infer<typeof telephoneNumberSchema>;
	};
	setIsOpen: (isOpen: (value: boolean) => boolean) => void;
}) {
	const hamburgerLine = `h-1 w-8 my-1 bg-stone-800 transition ease transform duration-300`;

	return (
		<div className={cn("flex-row items-center justify-between", className)}>
			<Link href={"/"}>{logo}</Link>
			<div className=" flex flex-row items-center gap-x-4">
				{telephone?.showInNavbar && telephone.number && (
					<Link
						href={`tel:${telephone.number.prefix}${telephone.number.number}`}>
						<FaPhone size={25} />
					</Link>
				)}
				<button
					className="flex flex-col h-12 w-12 justify-center items-center group"
					onClick={() => setIsOpen((isOpen) => !isOpen)}>
					<div
						className={`${hamburgerLine} ${
							isOpen ? "rotate-45 translate-y-3" : ""
						}`}
					/>
					<div
						className={`${hamburgerLine} ${
							isOpen ? "opacity-0" : ""
						}`}
					/>
					<div
						className={`${hamburgerLine} ${
							isOpen ? "-rotate-45 -translate-y-3" : ""
						}`}
					/>
				</button>
			</div>
			<div
				className={cn(
					"fixed top-24 right-0 h-full w-full translate-x-full overflow-y-auto overscroll-y-none transition duration-500 z-50",
					isOpen ? "translate-x-0" : ""
				)}>
				{children}
			</div>
		</div>
	);
}
