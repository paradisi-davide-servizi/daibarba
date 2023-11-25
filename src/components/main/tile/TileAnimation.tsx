"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export default function TileAnimation({
	children,
	initialOpacity,
}: {
	children?: ReactNode;
	initialOpacity?: number;
}) {
	return (
		<motion.div
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			initial={{ opacity: initialOpacity || 0 }}
			viewport={{ once: true, margin: "-15px" }}>
			{children}
		</motion.div>
	);
}
