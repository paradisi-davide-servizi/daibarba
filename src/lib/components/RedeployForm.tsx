"use client";

import { Button } from "@/components/ui/button";
import { redeployAction } from "../actions/deployment";
import { callServerAction } from "../utils/actionUtils";
import { isExecutingAction, useAction, useKeyValue } from "../utils/actionHooks";
import { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { getElapsedTime, msToTime } from "../utils/timeUtils";
import { useInterval } from "usehooks-ts";
import { deploymentSchema, REDEPLOY_TIME_MS } from "../db/schema/deployment";

export default function RedeployForm() {
	const lastDeployment = useKeyValue("deployment", deploymentSchema);
	const [remainingTime, setRemainingTime] = useState<number | undefined>(
		undefined
	);
	const [elapsedTime, setElapsedTime] = useState<number | undefined>(
		undefined
	);
	const [isDeploying, setIsDeploying] = useState(false);

	useInterval(() => {
		if ( lastDeployment.result.data) {
			const elapsedTime = getElapsedTime( lastDeployment.result.data.date);
			setRemainingTime(REDEPLOY_TIME_MS - elapsedTime);
			setElapsedTime(elapsedTime);
		} else {
			setRemainingTime(undefined);
			setElapsedTime(undefined);
		}
	}, 1000);

	const canRedeploy =
		!isDeploying &&
		!isExecutingAction(lastDeployment) &&
		(elapsedTime || 0) > REDEPLOY_TIME_MS;

	return (
		<Button
			variant={"secondary"}
			disabled={!canRedeploy}
			onClick={async () => {
				if (!isDeploying) {
					setIsDeploying(true);
					await callServerAction(redeployAction, {});
					lastDeployment.execute();
					setIsDeploying(false);
				}
			}}>
			<div className="flex flex-row gap-2">
				Ripubblica
				{!canRedeploy && (
					<div className="flex flex-row">
						{remainingTime ? msToTime(remainingTime) : ""}
						<LuLoader2 size={20} className="animate-spin" />
					</div>
				)}
			</div>
		</Button>
	);
}
