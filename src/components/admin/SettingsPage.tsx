"use client";

import { Container } from "@/lib/components/Container";
import { ReactNode } from "react";
import { LuLoader2 } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function SettingsPage({
	title,
	children,
	isLoading,
	isRootPage,
}: {
	title: string;
	children?: ReactNode;
	isLoading?: boolean;
	isRootPage?: boolean;
}) {
	const router = useRouter();
	function navigateBack() {
		if (!isRootPage) {
			router.back();
		}
	}
	return (
		<main>
			<Card>
				<CardHeader className="p-2 py-4 md:p-6">
					<div className="flex flex-row justify-start items-center gap-2">
						
							<Button
								variant="link"
								className="p-0"
								onClick={() => navigateBack()}>
								<FaArrowLeft size={25} />
							</Button>
						
						<CardTitle>{title}</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="relative p-2 py-4 md:px-6 pt-0">
					{children}
					{isLoading && (
						<div className="absolute top-0 left-0 h-full w-full bg-[#ffffffaa] backdrop-blur-sm flex flex-col items-center justify-center">
							<div className="animate-spin">
								<LuLoader2 size={45} />
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</main>
	);
}
