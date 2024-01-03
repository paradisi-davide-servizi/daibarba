import { ControllerRenderProps, FieldValues } from "react-hook-form";
import * as z from "zod";
import { INPUT_COMPONENTS } from "./config";
import { ReactNode } from "react";

export type FieldConfigItem = {
  description?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    showLabel?: boolean;
  };
  fieldType?:
  | keyof typeof INPUT_COMPONENTS
  | React.FC<AutoFormInputComponentProps>;
  values?: [string, string][];
  hidden?: boolean;
  renderParent?: (props: {
    children: React.ReactNode;
  }) => React.ReactElement | null;
};

type ArrayConfigItemRenderer<SchemaType extends z.AnyZodObject> = {
  renderType: "fieldList"
} | {
  renderType: "dialog",
  trigger: (value: Partial<z.infer<SchemaType>>) => ReactNode
}

export type ArrayConfigItem<ArraySchemaType extends z.ZodArray<z.AnyZodObject>> = {
  render?: ArrayConfigItemRenderer<ArraySchemaType["_def"]["type"]>
  fieldConfig?: ArraySchemaType["_def"]["type"] extends z.AnyZodObject
  ? FieldConfig<ArraySchemaType["_def"]["type"]>
  : never
}

export type FieldConfig<SchemaType extends z.AnyZodObject> = {
  // If SchemaType.key is an object, create a nested FieldConfig, otherwise FieldConfigItem
  [Key in keyof SchemaType["shape"]]?: SchemaType["shape"][Key] extends z.AnyZodObject
  ? FieldConfig<SchemaType["shape"][Key]>
  : SchemaType["shape"][Key] extends z.ZodArray<z.AnyZodObject>
  ? ArrayConfigItem<SchemaType["shape"][Key]>
  : FieldConfigItem;
};

/**
 * A FormInput component can handle a specific Zod type (e.g. "ZodBoolean")
 */
export type AutoFormInputComponentProps = {
  zodInputProps: React.InputHTMLAttributes<HTMLInputElement>;
  field: ControllerRenderProps<FieldValues, any>;
  fieldConfigItem: FieldConfigItem;
  label: string;
  isRequired: boolean;
  fieldProps: any;
  zodItem: z.ZodAny;
};
