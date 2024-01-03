import { telephoneNumberSchema } from "@/lib/db/schema/keyValue/contacts";
import Link from "next/link";
import { FaPhone } from "react-icons/fa";
import { z } from "zod";

export function TelephoneNumberLink({
	telephoneNumber,
}: {
	telephoneNumber: z.infer<typeof telephoneNumberSchema>;
}) {
	return (
		<p className=" flex flex-row items-center gap-x-2">
			<FaPhone />
			{telephoneNumber.label ? `${telephoneNumber.label}: ` : ""}
			<Link href={`tel:${telephoneNumber.number}`} className=" underline">
				{telephoneNumber.number}
			</Link>
		</p>
	);
}
export function TelephoneNumberLinks({
	telephoneNumbers,
}: {
	telephoneNumbers?: z.infer<typeof telephoneNumberSchema>[];
}) {
	return (
		<>
			{(telephoneNumbers?.length || 0) > 0 &&
				telephoneNumbers?.map((t, i) => (
					<TelephoneNumberLink key={i} telephoneNumber={t} />
				))}
		</>
	);
}
