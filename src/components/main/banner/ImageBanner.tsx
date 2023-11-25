import { StorageImage } from "@/lib/components/StorageImage";
import { StorageFile } from "@/lib/db/schema/file";
import React, { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Banner, BannerFull, BannerCenter } from "./Banner";
import BannerParallax from "./BannerParallax";

export function ImageBanner({
	label,
	imageSource,
}: {
	label?: string;
	imageSource?: StorageFile | string;
}) {
	return (
		<Banner>
			<BannerFull>
				<BannerParallax>
					<StorageImage
						alt="logo"
						width={500}
						height={500}
						image={{
							storageName: "daibarba",
							source: imageSource,
						}}
						className=" w-full h-full object-cover brightness-75"
					/>
				</BannerParallax>
			</BannerFull>
			<BannerCenter>
				<h2 className="uppercase font-bold text-center tracking-widest text-white text-5xl">
					{label}
				</h2>
			</BannerCenter>
		</Banner>
	);
}
