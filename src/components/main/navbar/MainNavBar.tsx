"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Navbar } from "./MainNavbarMenu";
import { usePathname } from "next/navigation";
import { socialSchema, telephoneNumberSchema } from "@/lib/db/schema/contacts";
import { z } from "zod";
import { SocialNetworkLink, SocialNetworkLinks } from "../contacts/SocialNetworkLinks";

export function MainNavBar({
	socials,
	children,
	telephone,
}: {
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
				isOpen={isOpen}
				logo="/logo.png"
				telephone={telephone}
				setIsOpen={setIsOpen}
				className="fixed p-4 top-0 w-full shadow-md bg-white h-16 flex md:hidden">
				<div className="min-w-full h-[calc(100dvh-4rem)] bg-white flex flex-col justify-between items-center p-4">
					<div className=" tracking-wider font-bold  flex flex-col items-center uppercase text-2xl">
						{children}
					</div>
					<SocialNetworkLinks
						iconSize={35}
						socials={socials}
						className=" flex flex-row gap-x-2"
					/>
				</div>
			</Navbar>
			<Navbar
				isOpen={isOpen}
				logo="/logo.png"
				setIsOpen={setIsOpen}
				className="fixed p-4 top-0 w-full shadow-md bg-white h-16 hidden md:flex text-center">
				<div className="min-w-full h-[calc(100dvh-4rem)] bg-white flex flex-col justify-between items-center p-4">
					<div className=" tracking-wider float-right font-bold flex flex-col items-center gap-y-4 uppercase text-3xl">
						{children}
					</div>
					<SocialNetworkLinks
						iconSize={35}
						socials={socials}
						className=" flex flex-row gap-x-2"
					/>
				</div>
			</Navbar>
		</>
	);
}
