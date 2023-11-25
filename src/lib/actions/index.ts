import "server-only"

import { createClientComponentClient, createRouteHandlerClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../db";

export const action = createSafeActionClient({
	async middleware() {
		return { db };
	},
});

export const authAction = createSafeActionClient({
	async middleware() {
		const supabase = createServerActionClient({ cookies });
		const { data } = await supabase.auth.getUser();
		console.log(data.user)
		if (!data.user) {
			redirect("/");
		}
		return { supabase, db, userId: data.user.id };
	},
});
