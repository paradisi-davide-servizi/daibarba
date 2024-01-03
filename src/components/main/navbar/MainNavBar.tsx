"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Navbar } from "./MainNavbarMenu";
import { usePathname } from "next/navigation";
import { z } from "zod";
import {
	SocialNetworkLink,
	SocialNetworkLinks,
} from "../contacts/SocialNetworkLinks";
import { cn } from "@/lib/utils";
import { socialSchema, telephoneNumberSchema } from "@/lib/db/schema/keyValue/contacts";

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
	telephone?: z.infer<typeof telephoneNumberSchema>;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<div className=" flex flex-col md:flex-row">
			<Navbar
				logo={logo}
				isOpen={isOpen}
				telephone={telephone}
				setIsOpen={setIsOpen}
				className={cn(
					"p-4 top-0 md:left-0 w-full h-24 md:h-screen md:w-32 bg-white flex flex-row md:flex-col-reverse z-50 shadow-2xl md:fixed"
				)}>
				<div className="w-screen md:w-[calc(100vw-8rem)] h-[calc(100dvh-6rem)] md:h-screen flex flex-col justify-between items-center p-8">
					<div className=" tracking-wider font-bold  flex flex-col items-center uppercase text-2xl md:text-3xl gap-4 flex-1 justify-start md:justify-center">
						{navItems}
					</div>
					<SocialNetworkLinks
						iconSize={35}
						socials={socials}
						className=" flex flex-row gap-x-2"
					/>
				</div>
			</Navbar>

			<div className={cn("w-full md:ml-32", isOpen ? "h-[calc(100dvh-6rem)] md:h-screen overflow-clip" : "")}>
				{children}
			</div>
		</div>
	);
}
