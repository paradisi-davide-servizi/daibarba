"use client"

import { SafeAction } from "next-safe-action";
import { HookActionStatus, useAction as _useAction } from "next-safe-action/hook";
import { useEffect, useState } from "react";
import { z } from "zod";
import { findOneKeyValueAction } from "../actions/keyValue";

export function useAction<Schema extends z.ZodTypeAny, const Data>(safeAction: SafeAction<Schema, Data>, input: z.input<Schema>) {
    const action = _useAction(safeAction);
    useEffect(() => {
        action.execute(input)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return action;
}

export function useKeyValue<Schema extends z.ZodTypeAny>(key: string, schema: Schema) {
    const [value, setValue] = useState<z.infer<Schema> | undefined>(undefined);
    const { result, execute: _execute, ...otherProps } = useAction(findOneKeyValueAction, { key });

    useEffect(() => {
        const value = result?.data?.value;
        const parsedValue = schema.safeParse(value);
        if (parsedValue.success) {
            setValue(parsedValue.data as z.infer<Schema>)
        }
    }, [result, schema]);

    function execute() {
        _execute({ key })
    }

    return { result: { ...result, data: value }, execute, ...otherProps }
}

export function isExecutingAction(...actions: { status: HookActionStatus }[]) {
    return actions.some(action => action.status === "executing");
}