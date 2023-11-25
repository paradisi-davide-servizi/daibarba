import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Container from "@/lib/components/Container";
import { siteSchema } from "@/lib/db/schema/site";
import { safeFindOneKeyValueAction } from "@/lib/utils/actionUtils";
import { SiteForm } from "@/components/admin/SiteForm";
import { UploadImageForm } from "@/components/admin/UploadImageForm";

export default async function UploadPage() {
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Carica Immagine</CardTitle>
					</CardHeader>
					<CardContent>
						<UploadImageForm/>
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}