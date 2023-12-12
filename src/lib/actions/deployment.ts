"use server"

import { z } from "zod";
import { authAction } from "."

export const redeployAction = authAction(z.object({}), async () => {
    await fetch(process.env.REDEPLOY_URL!, {
        method: "POST",
    });
})