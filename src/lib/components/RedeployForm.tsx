"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function RedeployForm() {
	return (
		<Button
			variant={"secondary"}
			onClick={async () => {
				await fetch(process.env.REDEPLOY_URL!, {
					method: "POST",
				});
			}}>
			Redeploy
		</Button>
	);
}
