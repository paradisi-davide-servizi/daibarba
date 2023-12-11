import { locationSchema } from "@/lib/db/schema/contacts";
import React from "react";
import { z } from "zod";

export default function GoogleMap({
	zoom,
    lang,
	location,
	className,
}: {
	zoom: number;
    lang:string;
	className?: string;
	location?: z.infer<typeof locationSchema>;
}) {
	let fullAddress = encodeURIComponent(location?.address || "");
	if(!!location?.businessName) {
		const businessName = encodeURIComponent(location.businessName);
		fullAddress = `${fullAddress}+${businessName}`;
	}
	const src = `https://maps.google.com/maps?width=100%25&height=600&hl=${lang}&q=${fullAddress}&t=&z=${zoom}&ie=UTF8&iwloc=B&output=embed`
    return <iframe src={src} className={className}/>
}
