import { z } from "zod";

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .refine(psw => passwordRegex.test(psw)),
    confirmPassword: z.string()
        .refine(psw => passwordRegex.test(psw)),
})/*.superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match"
        });
    }
});*/

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .refine(psw => passwordRegex.test(psw)),
})

export const signOutSchema = z.object({
    scope:z.enum(["global", "local", "others"])
});