"use client";

import { signOutAction } from "@/lib/actions/auth";
import React from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
	callServerAction
} from "@/lib/utils/actionUtils";

export default function SignOutForm() {
	return (
		<Button
			variant={"destructive"}
			onClick={() => callServerAction(signOutAction, {})}>
			Sign Out
		</Button>
	);
}
