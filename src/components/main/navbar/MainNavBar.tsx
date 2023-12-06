"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Navbar } from "./MainNavbarMenu";
import { usePathname } from "next/navigation";
import { socialSchema, telephoneNumberSchema } from "@/lib/db/schema/contacts";
import { z } from "zod";
import {
	SocialNetworkLink,
	SocialNetworkLinks,
} from "../contacts/SocialNetworkLinks";
import { cn } from "@/lib/utils";

export function MainNavBar({
	logo,
	socials,
	children,
	telephone,
	navItems,
}: {
	logo?: ReactNode;
	navItems?: ReactNode;
	children?: ReactNode;
	socials?: z.infer<typeof socialSchema>[];
	telephone?: {
		showInNavbar: boolean;
		number?: z.infer<typeof telephoneNumberSchema>;
	};
}) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<>
			<Navbar
				logo={logo}
				isOpen={isOpen}
				telephone={telephone}
				setIsOpen={setIsOpen}
				className={cn(
					"p-4 top-0 w-full bg-white h-24 flex md:hidden  z-50"
				)}>
				<div className="min-w-full h-[calc(100dvh-6rem)] bg-white flex flex-col justify-between items-center p-4">
					<div className=" tracking-wider font-bold  flex flex-col items-center uppercase text-2xl gap-4">
						{navItems}
					</div>
					<SocialNetworkLinks
						iconSize={35}
						socials={socials}
						className=" flex flex-row gap-x-2"
					/>
				</div>
			</Navbar>
			<Navbar
				logo={logo}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				className={cn(
					"p-4 top-0 w-full bg-white h-24 hidden md:flex text-center z-50"
				)}>
				<div className="min-w-full h-[calc(100dvh-6rem)] bg-white flex flex-col justify-between items-center p-4">
					<div className=" tracking-wider float-right font-bold flex flex-col items-center uppercase text-3xl gap-4">
						{navItems}
					</div>
					<SocialNetworkLinks
						iconSize={35}
						socials={socials}
						className=" flex flex-row gap-x-2"
					/>
				</div>
			</Navbar>
			<div className={cn("mt-6rem", isOpen ? "h-[calc(100dvh-6rem)] overflow-hidden" : "")}>
				{children}
			</div>
		</>
	);
}
