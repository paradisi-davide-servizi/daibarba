import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Container }from "@/lib/components/Container";
import { siteSchema } from "@/lib/db/schema/site";
import { SiteForm } from "@/components/admin/SiteForm";
import { callServerAction, getKeyValueAction } from "@/lib/utils/actionUtils";
import { findManyFilesAction } from "@/lib/actions/file";
import { unstable_noStore } from "next/cache";

export const dynamic = 'force-dynamic'
export default async function BusinessInfoPage() {
	const values = await getKeyValueAction(
		"site",
		siteSchema
	);
	const images = await callServerAction(findManyFilesAction, {});
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Impostazioni generali</CardTitle>
					</CardHeader>
					<CardContent>
						<SiteForm values={values} images={images || []}/>
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}