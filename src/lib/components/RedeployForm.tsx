"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { useInterval } from "usehooks-ts";
import { redeployAction } from "../actions/deployment";
import {
	isExecutingAction,
	useKeyValue
} from "../utils/actionHooks";
import { callServerAction } from "../utils/actionUtils";
import { getElapsedTime, msToTime } from "../utils/timeUtils";
import { deploymentSchema, REDEPLOY_TIME_MS } from "../db/schema/keyValue/deployment";

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
		if (lastDeployment.data) {
			const elapsedTime = getElapsedTime(lastDeployment.data.date);
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
					lastDeployment.update();
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
