import SettingsPage from "@/components/admin/SettingsPage";
import { Container } from "@/lib/components/Container";
import RedeployForm from "@/lib/components/RedeployForm";
import StyledLink from "@/lib/components/StyledLink";
import SignOutForm from "@/lib/components/auth/SignOutForm";
import { menuTypeArray } from "@/lib/db/schema/keyValue/menu";

export default function Admin() {
	return (
		<SettingsPage title={"Admin"} isRootPage={true}>
			<div className=" flex flex-col gap-4">
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
				<RedeployForm/>
				<SignOutForm/>
			</div>
		</SettingsPage>
	);
}
