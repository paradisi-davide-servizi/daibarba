"use server"

import { action, authAction } from "."
import { signInSchema, signUpSchema } from "@/lib/db/schema/auth"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import { z } from "zod";

export const signInAction = action(signInSchema, async (input, ctx) => {
    const data = signInSchema.parse(input);
    const supabase = createServerActionClient({ cookies });
    const { error, data: { user } } = await supabase.auth.signInWithPassword(data);
    if (error) {
        throw error;
    }
    if (!user) {
        throw new Error("Invalid user")
    }
    redirect("/admin");
});

export const signUpAction = action(signUpSchema, async (input, ctx) => {
    const data = signUpSchema.parse(input);
    const supabase = createServerActionClient({ cookies });
    const { error, data: { user } } = await supabase.auth.signUp(data);
    if (error) {
        throw error;
    }
    if (!user) {
        throw new Error("Invalid user")
    }
    redirect("/signin");
});

export const signOutAction = authAction(z.object({}), async (input, ctx) => {
    const { error } = await ctx.supabase.auth.signOut();
    if (error) {
        throw error;
    }
    redirect("/");
});