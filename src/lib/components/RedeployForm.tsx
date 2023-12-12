"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { callServerAction } from "../utils/actionUtils";
import { redeployAction } from "../actions/deployment";

export default function RedeployForm() {
	return (
		<Button
			variant={"secondary"}
			onClick={async () => await callServerAction(redeployAction, {})}>
			Redeploy
		</Button>
	);
}
