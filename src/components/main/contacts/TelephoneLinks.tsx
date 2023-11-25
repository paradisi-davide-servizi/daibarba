import { telephoneNumberSchema } from "@/lib/db/schema/contacts";
import Link from "next/link";
import React from "react";
import { z } from "zod";

export function TelephoneNumberLink({
	telephoneNumber,
}: {
	telephoneNumber: z.infer<typeof telephoneNumberSchema>;
}) {
	return (
		<p>
			{telephoneNumber.label ? `${telephoneNumber.label}: ` : ""}
			<Link
				href={`tel:${telephoneNumber.prefix} ${telephoneNumber.number}`}
				className=" underline">
				{`${telephoneNumber.prefix} ${telephoneNumber.number}`}
			</Link>
		</p>
	);
}
export function TelephoneNumberLinks({
	telephoneNumbers,
	className,
}: {
	className?: string;
	telephoneNumbers?: z.infer<typeof telephoneNumberSchema>[];
}) {
	return (
		<>
			{(telephoneNumbers?.length || 0) > 0 && (
				<div className={className}>
					{telephoneNumbers?.map((t, i) => (
						<TelephoneNumberLink key={i} telephoneNumber={t} />
					))}
				</div>
			)}
		</>
	);
}
