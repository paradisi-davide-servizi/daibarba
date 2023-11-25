import React, { ReactNode } from "react";
import { cn } from "../utils";

export default function HeroSection({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("relative w-full flex flex-col items-center justify-center", className)}>
			{children}
		</div>
	);
}
