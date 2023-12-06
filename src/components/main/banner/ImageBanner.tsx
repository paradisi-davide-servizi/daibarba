import { StorageImage } from "@/lib/components/StorageImage";
import { StorageFile } from "@/lib/db/schema/file";
import React, { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Banner, BannerVariants } from "./Banner";
import { BannerParallax } from "./BannerParallax";
import { VariantProps } from "class-variance-authority";

export function ImageBanner({
	size,
	children,
	imageSource,
}: {
	children?: ReactNode;
	imageSource?: StorageFile | string;
} & BannerVariants) {
	return (
		<Banner size={size}>
			<BannerParallax>
				<StorageImage
					alt="logo"
					width={500}
					height={500}
					image={{
						storageName: "daibarba",
						source: imageSource,
					}}
					className=" w-full h-full object-cover brightness-[35%]"
				/>
			</BannerParallax>
			{children}
		</Banner>
	);
}
