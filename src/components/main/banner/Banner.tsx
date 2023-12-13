import React, { MutableRefObject, ReactNode, RefObject } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva("relative w-full overflow-hidden shadow-lg flex flex-row items-stretch", {
	variants: {
		size: {
			default: "min-h-[20rem]",
			fixed: "h-[20rem]",
			fullScreen: "h-[100vh]",
			hero: "md:h-[calc(100vh-12rem)] h-[calc(100vh-8rem)]",
		},
	},
	defaultVariants: {
		size: "default",
	},
});
export type BannerVariants = VariantProps<typeof bannerVariants>;

export function Banner({
	children,
	size,
}: { children?: ReactNode } & BannerVariants) {
	return <div className={bannerVariants({ size })}>{children}</div>;
}
