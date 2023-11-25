import { emailSchema } from "@/lib/db/schema/contacts";
import Link from "next/link";
import React from "react";
import { z } from "zod";

export function EmailLink({ email }: { email: z.infer<typeof emailSchema> }) {
	return (
		<p>
			{email.label ? `${email.label}: ` : ""}
			<Link href={`mailto:${email.email}`} className=" underline">
				{email.email}
			</Link>
		</p>
	);
}
export function EmailLinks({
	emails,
	className,
}: {
	className?: string;
	emails?: z.infer<typeof emailSchema>[];
}) {
	return (
		<>
			{(emails?.length || 0) > 0 && (
				<div className={className}>
					{emails?.map((e, i) => (
						<EmailLink key={i} email={e} />
					))}
				</div>
			)}
		</>
	);
}
