import { StorageImage } from "@/lib/components/StorageImage";
import React, { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Banner, BannerVariants } from "./Banner";
import { BannerParallax } from "./BannerParallax";
import { VariantProps, cva } from "class-variance-authority";

export const imageBannerVariants = cva(
	"absolute top-0 left-0 w-full h-full -z-10",
	{
		variants: {
			gradient: {
				default: "bg-[#000000aa]",
				light: "bg-[#00000022]",
				brighten: "bg-[#ffffff77]",
				to_r: "bg-[#000000aa] md:bg-transparent md:bg-gradient-to-r md:from-[#000000bb] md:from-65%",
				to_l: "bg-[#000000aa] md:bg-transparent md:bg-gradient-to-l md:from-[#000000bb] md:from-65%",
				none:"bg-transparent",
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
	imageSource?: string;
} & BannerVariants &
	ImageBannerVariants) {
	return (
		<Banner size={size}>
			<BannerParallax>
				<StorageImage
					alt="logo"
					width={1280}
					height={800}
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
