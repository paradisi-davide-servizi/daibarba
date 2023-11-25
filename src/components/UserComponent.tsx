import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import SignOutForm from "../lib/components/auth/SignOutForm";

export default async function UserComponent() {
	const supabase = createServerActionClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session?.user) {
		return <Link href={"/signin"}>Sign In</Link>;
	}
	return (
		<div className=" flex flex-col gap-y-4">
			<pre>{JSON.stringify(session?.user, null, 2)}</pre>
            <SignOutForm/>
		</div>
	);
}
