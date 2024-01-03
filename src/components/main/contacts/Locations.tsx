import { locationSchema } from "@/lib/db/schema/keyValue/contacts";
import React from "react";
import { z } from "zod";

export function Location({ location }: { location: z.infer<typeof locationSchema> }) {
	return <p>{location.address}</p>;
}
export function Locations({
	locations,
	className,
}: {
	className?: string;
	locations?: z.infer<typeof locationSchema>[];
}) {
	return (
		<>
			{(locations?.length || 0) > 0 && (
				<div className={className}>
					{locations?.map((l, i) => (
						<Location key={i} location={l} />
					))}
				</div>
			)}
		</>
	);
}
