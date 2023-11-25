import { ControllerRenderProps, FieldValues } from "react-hook-form";
import * as z from "zod";
import { INPUT_COMPONENTS } from "./config";

export type FieldConfigItem = {
  description?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    showLabel?: boolean;
  };
  fieldType?:
  | keyof typeof INPUT_COMPONENTS
  | React.FC<AutoFormInputComponentProps>;

  renderParent?: (props: {
    children: React.ReactNode;
  }) => React.ReactElement | null;
};

export type FieldConfig<SchemaType extends z.AnyZodObject> = {
  // If SchemaType.key is an object, create a nested FieldConfig, otherwise FieldConfigItem
  [Key in keyof SchemaType["shape"]]?: SchemaType["shape"][Key] extends z.AnyZodObject ?
  FieldConfig<SchemaType["shape"][Key]> :
  FieldConfigItem;
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
