"use server"

import { action, authAction } from "."
import { signInSchema, signOutSchema, signUpSchema } from "@/lib/db/schema/auth"
import { redirect } from "next/navigation"

export const signInAction = action(signInSchema, async (input, ctx) => {
    const data = signInSchema.parse(input);
    const { error } = await ctx.supabase.auth.signInWithPassword(data);
    if (error) {
        console.error(error.message);
    }
    redirect("/admin");
});

export const signUpAction = action(signUpSchema, async (input, ctx) => {
    const data = signUpSchema.parse(input);
    const { error } = await ctx.supabase.auth.signUp(data);
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