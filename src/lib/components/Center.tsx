import React, { ReactNode } from "react";
import { cn } from "../utils";

export default function Center({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"w-full h-full flex flex-col items-center justify-center",
				className
			)}>
			{children}
		</div>
	);
}
