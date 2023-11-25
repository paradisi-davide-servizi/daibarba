"use client";

import { signOutAction } from "@/lib/actions/auth";
import { signOutSchema } from "@/lib/db/schema/auth";
import React from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";

export default function SignOutForm() {
	return (
		<Button
			variant={"destructive"}
			onClick={() => signOutAction({ scope: "global" })}>
			Sign Out
		</Button>
	);
}
