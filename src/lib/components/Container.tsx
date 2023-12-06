import React, { ReactNode } from "react";
import { cn } from "../utils";

export function Container({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex flex-col items-center p-8 w-full h-full",
				className
			)}>
			<div className="max-w-4xl w-full h-full">
				{children}
			</div>
		</div>
	);
}