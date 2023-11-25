"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { ReactNode } from "react";

export default function BannerParallax({
	children,
}: {
	children?: ReactNode;
}) {
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	return (
		<motion.div style={{ y }} className="w-full h-full">
			{children}
		</motion.div>
	);
}
