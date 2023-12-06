"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";

function useParallax(outputRange: string[]) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const y = useTransform(scrollYProgress, [0, 1], outputRange);
	return { ref, y };
}

export function BannerParallax({ children }: { children?: ReactNode }) {
	const { ref, y } = useParallax(["-100%", "0%"]);
	return (
		<div className="absolute top-0 left-0 h-full w-full -z-50">
			<motion.div
				style={{ y: y || "0%" }}
				className="w-full h-full"
				ref={ref}>
				<div className="w-full h-[200%]">{children}</div>
			</motion.div>
		</div>
	);
}
