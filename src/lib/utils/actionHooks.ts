"use client"

import { SafeAction } from "next-safe-action";
import { HookActionStatus, HookCallbacks, useAction as _useAction } from "next-safe-action/hook";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { findOneKeyValueAction } from "../actions/keyValue";
import { useToast } from "@/components/ui/use-toast";
import { useEffectWhenChanged } from "./hooks";

export function useAction<Schema extends z.ZodTypeAny, const Data>(
    safeAction: SafeAction<Schema, Data>,
    input: z.input<Schema> | undefined,
    callbacks?: HookCallbacks<Schema, Data> | undefined) {

    const { result, reset, execute, status } = _useAction(safeAction, callbacks);
    const [data, setData] = useState<Data | undefined>(undefined);
    const { toast } = useToast();

    const update = useCallback(() => {
        reset();
        if (input) {
            execute(input);
        }
    }, [execute, input, reset]);

    useEffectWhenChanged((input) => {
        reset();
        if (input) {
            execute(input);
        }
    }, input);

    useEffect(() => {
        try {
            if (result.fetchError) {
                throw result.fetchError;
            }
            if (result.serverError) {
                throw result.serverError;
            }
            if (result.validationError) {
                throw result.validationError;
            }
            setData(result.data);
        }
        catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else if (error instanceof z.ZodError) message = error.message;
            else message = JSON.stringify(error);
            toast({
                title: "Errore",
                description: message,
                variant: "destructive",
            });
        }
    }, [result, toast])

    return { execute, update, data, status };
}

export function useKeyValue<Schema extends z.ZodTypeAny>(key: string, schema: Schema) {
    const [value, setValue] = useState<z.infer<Schema> | undefined>(undefined);
    const { data, execute, ...otherProps } = useAction(findOneKeyValueAction, { key });

    useEffect(() => {
        const value = data?.value;
        const parsedValue = schema.safeParse(value);
        if (parsedValue.success) {
            setValue(parsedValue.data as z.infer<Schema>)
        }
    }, [data, schema]);

    return { data: value, execute, ...otherProps }
}

export function isExecutingAction(...actions: { status: HookActionStatus }[]) {
    return actions.some(action => action.status === "executing");
}