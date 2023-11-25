import Link from "next/link";
import React from "react";
import { PropsOfComponent } from "../utils/typeUtils";
import { cn } from "../utils";

export default function StyledLink({
	className,
	children,
	...props
}: PropsOfComponent<typeof Link>) {
	return (
		<Link {...props} className={cn("p-4 group", className)}>
			<div className="inline-block relative after:bg-current after:h-0.5 after:absolute after:bottom-0 after:left-0 origin-bottom-right after:w-full after:scale-x-0 group-hover:after:scale-x-100 hover:after:scale-x-100 after:transition-all">
				{children}
			</div>
		</Link>
	)
}
