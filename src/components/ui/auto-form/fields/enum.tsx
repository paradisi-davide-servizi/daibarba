import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../select";
import { AutoFormInputComponentProps } from "../types";
import { getBaseSchema } from "../utils";
import * as z from "zod";

export default function AutoFormEnum({
	label,
	isRequired,
	field,
	fieldConfigItem,
	zodItem,
}: AutoFormInputComponentProps) {
	let values: [string, string][] = [];
	if (!!fieldConfigItem.values) {
		values = fieldConfigItem.values;
	} else {
		const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)
			._def.values;
		if (!Array.isArray(baseValues)) {
			values = Object.entries(baseValues);
		} else {
			values = baseValues.map((value) => [value, value]);
		}
	}
	function findItem(value: any) {
		return values.find((item) => item[0] === value);
	}
	return (
		<FormItem>
			<FormLabel>
				{label}
				{isRequired && <span className="text-destructive"> *</span>}
			</FormLabel>
			<FormControl>
				<Select
					defaultValue={field.value}
					onValueChange={field.onChange}>
					<SelectTrigger>
						<SelectValue
							className="w-full"
							placeholder={
								field.value || fieldConfigItem.inputProps?.placeholder 
							}>
							{field.value
								? findItem(field.value)?.[1]
								: "Select an option"}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{values.map(([value, label]) => (
							<SelectItem value={label} key={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FormControl>
			{fieldConfigItem.description && (
				<FormDescription>{fieldConfigItem.description}</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	);
}
