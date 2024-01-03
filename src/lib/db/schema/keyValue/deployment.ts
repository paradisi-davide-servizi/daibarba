import { z } from "zod";
import { getElapsedTime } from "../../../utils/timeUtils";

export const REDEPLOY_TIME_MS = 5 * 60 * 1000;

export const deploymentSchema = z.object({
    date: z.string().datetime().transform(date => new Date(date))
})

export type Deployment = z.infer<typeof deploymentSchema>