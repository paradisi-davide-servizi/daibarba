import "server-only"

import { createClientComponentClient, createRouteHandlerClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../db";

export const action = createSafeActionClient({
	handleReturnedServerError(e) {
		return {
			serverError: e.message
		}
	},
	handleServerErrorLog(e) {
		console.error("Action error:", e.message)
	},
	async middleware() {
		return { db };
	},
});

export const authAction = createSafeActionClient({
	handleReturnedServerError(e) {
		return {
			serverError: e.message
		}
	},
	handleServerErrorLog(e) {
		console.error("Action error:", e.message)
	},
	async middleware() {
		const supabase = createServerActionClient({ cookies });
		const { data: { user }, error } = await supabase.auth.getUser();
		if (error || !user) {
			redirect("/");
		}
		return { supabase, db, userId: user.id };
	},
});
