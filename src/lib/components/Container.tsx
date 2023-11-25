import React, { ReactNode } from "react";
import { cn } from "../utils";

export default function Container({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex flex-col items-center p-8",
				className
			)}>
			<div className="max-w-5xl w-full h-full">
				{children}
			</div>
		</div>
	);
}
