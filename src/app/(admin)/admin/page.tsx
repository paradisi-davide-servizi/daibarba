import { Container } from "@/lib/components/Container";
import StyledLink from "@/lib/components/StyledLink";
import SignOutForm from "@/lib/components/auth/SignOutForm";
import { menuTypeArray } from "@/lib/db/schema/menu";
import React from "react";

export default function Admin() {
	return (
		<Container>
			<div className=" flex flex-col">
				<StyledLink href={"/admin/settings/site"}>
					Impostazioni del sito
				</StyledLink>
				<StyledLink href={"/admin/settings/home"}>Home</StyledLink>
				{menuTypeArray.map((menuKey) => (
					<StyledLink
						key={menuKey}
						href={`/admin/settings/menu/${menuKey}`}>
						{menuKey}
					</StyledLink>
				))}
				<StyledLink href={"/admin/settings/contacts"}>
					Contatti
				</StyledLink>
				<StyledLink href={"/admin/upload"}>Carica immagine</StyledLink>
				<SignOutForm/>
			</div>
		</Container>
	);
}
