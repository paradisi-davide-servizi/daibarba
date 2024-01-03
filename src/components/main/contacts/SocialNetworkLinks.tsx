import { socialSchema } from "@/lib/db/schema/keyValue/contacts";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { z } from "zod";

export function SocialNetworkLink({
	social,
	iconSize,
}: {
	social: z.infer<typeof socialSchema>;
	iconSize: number;
}) {
	function SocialNetworkIcon() {
		switch (social.social) {
			case "facebook":
				return <FaFacebookF size={iconSize} />;
			case "instagram":
				return <FaInstagram size={iconSize} />;
			case "threads":
				return <FaThreads size={iconSize} />;
			case "tripadvisor":
				return <FaTripadvisor size={iconSize} />;
			case "twitter":
				return <FaXTwitter size={iconSize} />;
		}
	}
	return (
		<Link href={social.link}>
			<SocialNetworkIcon />
		</Link>
	);
}

export function SocialNetworkLinks({
	socials,
	iconSize,
	className,
}: {
	iconSize: number;
	className?: string;
	socials?: z.infer<typeof socialSchema>[];
}) {
	return (
		<>
			{(socials?.length || 0) > 0 && (
				<div className={className}>
					{socials?.map((s, i) => (
						<SocialNetworkLink
							key={i}
							social={s}
							iconSize={iconSize}
						/>
					))}
				</div>
			)}
		</>
	);
}
