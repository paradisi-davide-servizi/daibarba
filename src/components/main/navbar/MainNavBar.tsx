"use client";

import { StorageImage } from "@/lib/components/StorageImage";
import { contactsSchema } from "@/lib/db/schema/keyValue/contacts";
import { siteSchema } from "@/lib/db/schema/keyValue/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";
import { z } from "zod";
import { SocialNetworkLinks } from "../contacts/SocialNetworkLinks";

export function MainNavBar({
	site,
	contacts,
	navItems,
	children,
	logo,
}: {
	site: z.infer<typeof siteSchema>;
	contacts: z.infer<typeof contactsSchema>;
	navItems: ReactNode;
	children: ReactNode;
	logo: ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	const hamburgerLine = `h-1 w-8 my-1 bg-stone-800 transition ease transform duration-300`;

	return (
		<div className=" flex flex-col md:flex-row">
			<div className="flex flex-row md:flex-col-reverse items-center justify-between p-4 top-0 md:left-0 w-full h-24 md:h-screen md:w-32 bg-white z-50 shadow-2xl md:fixed">
				<Link href={"/"}>{logo}</Link>
				<div className=" flex flex-row items-center gap-x-4">
					{contacts.telephoneNumbers[0] && (
						<Link
							href={`tel:${contacts.telephoneNumbers[0].number}`}
							className="md:hidden">
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
						"fixed top-24 md:top-0 right-0 md:left-28 h-full w-full bg-white translate-x-full overflow-hidden overscroll-y-none transition duration-500 z-50",
						isOpen ? "translate-x-0" : ""
					)}>
					<div className="w-screen md:w-[calc(100vw-8rem)] h-[calc(100dvh-6rem)] md:h-screen flex flex-col justify-between items-center p-8">
						<div className=" tracking-wider font-bold  flex flex-col items-center uppercase text-2xl md:text-3xl gap-4 flex-1 justify-start md:justify-center">
							{navItems}
						</div>
						<div className="flex flex-row gap-x-2">
							<SocialNetworkLinks
								iconSize={35}
								socials={contacts.socials}
							/>
						</div>
					</div>
				</div>
			</div>
			<div
				className={cn(
					"w-full md:ml-32",
					isOpen
						? "h-[calc(100dvh-6rem)] md:h-screen overflow-clip"
						: ""
				)}>
				{children}
			</div>
		</div>
	);
}
