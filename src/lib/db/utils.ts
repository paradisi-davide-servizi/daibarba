import { FieldConfig } from "@/components/ui/auto-form/types";
import { z } from "zod";

export type FormConfig<Schema extends z.AnyZodObject> = {
    fieldConfig: FieldConfig<Schema>,
    formSchema: Schema
}

export function createFormConfig<Schema extends z.AnyZodObject, Args = undefined>(
    formSchema: Schema,
    fieldConfig: (returnConfig: (fieldConfig: FieldConfig<Schema>) => void, args?: Args) => void): (args?: Args) => FormConfig<Schema> {

    function createFieldConfig() {
        return (args?: Args) => {
            let returnConfig: FieldConfig<Schema>;
            fieldConfig(config => {
                returnConfig = config;
            }, args)
            return returnConfig!;
        }
    }

    return (args?: Args) => ({
        formSchema,
        fieldConfig: createFieldConfig()(args)
    });
}