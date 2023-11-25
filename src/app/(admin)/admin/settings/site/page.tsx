import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Container from "@/lib/components/Container";
import { siteSchema } from "@/lib/db/schema/site";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import { SiteForm } from "@/components/admin/SiteForm";

export default async function BusinessInfoPage() {
	const values = await safeFindOneKeyValueAction(
		"site",
		siteSchema
	);
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Impostazioni generali</CardTitle>
					</CardHeader>
					<CardContent>
						<SiteForm values={values} />
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}