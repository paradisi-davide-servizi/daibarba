"use server"

import { z } from "zod";
import { authAction } from ".";
import { getKeyValueAction, setKeyValueAction } from "../utils/actionUtils";
import { getElapsedTime } from "../utils/timeUtils";
import { deploymentSchema, REDEPLOY_TIME_MS } from "../db/schema/keyValue/deployment";

export const redeployAction = authAction(z.object({}), async () => {
    const { data: lastDeployment } = await getKeyValueAction("deployment", deploymentSchema);
    if (getElapsedTime(lastDeployment?.date) > REDEPLOY_TIME_MS) {
        await setKeyValueAction("deployment", deploymentSchema, {
            date: new Date().toISOString()
        });
        await fetch(process.env.REDEPLOY_URL!, {
            method: "POST",
        });
    }
})