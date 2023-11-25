import Container from "@/lib/components/Container";
import StyledLink from "@/lib/components/StyledLink";
import React from "react";

export default function Admin() {
	return (
		<Container>
			<div className=" flex flex-col">
				<StyledLink href={"/admin/settings/site"}>
					Impostazioni del sito
				</StyledLink>
				<StyledLink href={"/admin/settings/home"}>Home</StyledLink>
				<StyledLink href={"/admin/settings/about"}>
					Chi siamo
				</StyledLink>
				<StyledLink href={"/admin/settings/contacts"}>
					Contatti
				</StyledLink>
				<StyledLink href={"/admin/settings/menu"}>
					Menù alla carta
				</StyledLink>
				<StyledLink href={"/admin/settings/todays-menu"}>
					Menù del giorno
				</StyledLink>
				<StyledLink href={"/admin/upload"}>
					Carica immagine
				</StyledLink>
			</div>
		</Container>
	);
}
