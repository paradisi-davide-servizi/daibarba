import React, { ReactNode } from "react";

export function BannerCenter({ children }: { children?: ReactNode }) {
	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			{children}
		</div>
	);
}

export function BannerFull({ children }: { children?: ReactNode }) {
	return (
		<div className="absolute top-0 left-0 h-full w-full">{children}</div>
	);
}

export function Banner({ children }: { children?: ReactNode }) {
	return <div className=" relative w-full h-80 overflow-hidden">{children}</div>;
}
