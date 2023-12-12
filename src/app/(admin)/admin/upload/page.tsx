import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Container }from "@/lib/components/Container";
import { siteSchema } from "@/lib/db/schema/site";
import { SiteForm } from "@/components/admin/SiteForm";
import { UploadFileForm } from "@/components/admin/UploadFileForm";

export const dynamic = 'force-dynamic'
export default async function UploadPage() {
	return (
		<main>
			<Container>
				<Card>
					<CardHeader>
						<CardTitle>Carica File</CardTitle>
					</CardHeader>
					<CardContent>
						<UploadFileForm/>
					</CardContent>
				</Card>
			</Container>
		</main>
	);
}