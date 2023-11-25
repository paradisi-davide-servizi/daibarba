import { z } from "zod";

export const emailSchema = z.object({
    label: z.string().optional(),
    email: z.string().email()
})

export const telephoneNumberSchema = z.object({
    label: z.string().optional(),
    prefix: z.string(),
    number: z.string()
})

export const socialsSchema = z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    tripadvisor: z.string().optional(),
    threads: z.string().optional(),
})

export const socialEnumSchema = z.enum(["facebook", "instagram", "twitter", "tripadvisor", "threads"]);

export const socialSchema = z.object({
    social: socialEnumSchema,
    link: z.string().url()
})

export const locationSchema = z.object({
    address: z.string(),
    businessName: z.string().optional()
})

export const timeIntervalSchema = z.object({
    startTime: z.string(),
    endTime: z.string()
})

export const timetableSchema = z.object({
    label: z.string(),
    timeIntervals: z.array(timeIntervalSchema),
})

export const contactsSchema = z.object({
    bannerImage: z.string().optional(),
    emails: z.array(emailSchema),
    socials: z.array(socialSchema),
    locations: z.array(locationSchema),
    timeTables: z.array(timetableSchema),
    telephoneNumbers: z.array(telephoneNumberSchema),
})