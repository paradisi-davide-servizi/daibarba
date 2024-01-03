import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/components/ThemeProvider";
import { cn } from "@/lib/utils";
import AuthProvider from "@/lib/components/auth/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { getKeyValueAction } from "@/lib/utils/actionUtils";
import { getPublicUrl } from "@/lib/components/StorageImage";
import { siteSchema } from "@/lib/db/schema/keyValue/site";

const inter = Lora({ subsets: ["latin"], weight: "variable" });

export async function generateMetadata(): Promise<Metadata> {
	const { data: site } = await getKeyValueAction("site", siteSchema);
	const icon = getPublicUrl("daibarba", site?.icon || "");
	return {
		title: site?.name,
		description: site?.description,
		icons: icon,
	};
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="it" suppressHydrationWarning>
			<body className={cn(inter.className, "text-stone-800 bg-white")}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					disableTransitionOnChange>
					<AuthProvider>
						{children}
						<Toaster />
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
