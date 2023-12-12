import { StorageImage } from "@/lib/components/StorageImage";
import { StorageFile } from "@/lib/db/schema/file";
import React, { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Banner, BannerVariants } from "./Banner";
import { BannerParallax } from "./BannerParallax";
import { VariantProps, cva } from "class-variance-authority";

export const imageBannerVariants = cva(
	"absolute top-0 left-0 w-full h-full from-[#000000dd] from-65% to-[#00000055] -z-10",
	{
		variants: {
			gradient: {
				default: "bg-[#000000dd]",
				to_r: "bg-gradient-to-r",
				to_l: "bg-gradient-to-l",
			},
		},
		defaultVariants: {
			gradient: "default",
		},
	}
);

export type ImageBannerVariants = VariantProps<typeof imageBannerVariants>;

export function ImageBanner({
	size,
	children,
	gradient,
	imageSource,
	priority,
}: {
	priority?: boolean;
	children?: ReactNode;
	imageSource?: StorageFile | string;
} & BannerVariants &
	ImageBannerVariants) {
	return (
		<Banner size={size}>
			<BannerParallax>
				<StorageImage
					alt="logo"
					width={500}
					height={500}
					priority={priority}
					image={{
						storageName: "daibarba",
						source: imageSource,
					}}
					className=" w-full h-full object-cover"
				/>
			</BannerParallax>
			<div className={imageBannerVariants({ gradient })} />
			{children}
		</Banner>
	);
}
