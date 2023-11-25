"use server"

import { action, authAction } from "."
import { signInSchema, signOutSchema, signUpSchema } from "@/lib/db/schema/auth"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

export const signInAction = action(signInSchema, async (input, ctx) => {
    const data = signInSchema.parse(input);
    const supabase = createServerActionClient({ cookies });
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
        console.error(error.message);
    }
    redirect("/admin");
});

export const signUpAction = action(signUpSchema, async (input, ctx) => {
    const data = signUpSchema.parse(input);
    const supabase = createServerActionClient({ cookies });
    const { error } = await supabase.auth.signUp(data);
    if (error) {
        console.error(error.message);
    }
    redirect("/signin");
});

export const signOutAction = authAction(signOutSchema, async (input, ctx) => {
    const { error } = await ctx.supabase.auth.signOut(input);
    if (error) {
        console.error(error.message);
    }
    redirect("/");
});