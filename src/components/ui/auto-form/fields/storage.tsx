import { Storage } from "@/lib/components/Storage/Storage";
import { splitPath } from "@/lib/utils/storageUtils";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../dialog";
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../form";
import { Input } from "../../input";
import { PopoverContent } from "../../popover";
import { AutoFormInputComponentProps } from "../types";

export default function AutoFormStorage({
	label,
	isRequired,
	field,
	fieldConfigItem,
	zodItem,
	fieldProps,
}: AutoFormInputComponentProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [initialPath] = splitPath(field.value || "");
	return (
		<FormItem className="flex flex-col items-stretch justify-stretch">
			<FormLabel>
				{label}
				{isRequired && <span className="text-destructive"> *</span>}
			</FormLabel>
			<FormControl>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger>
						<Input readOnly value={field.value} />
					</DialogTrigger>
					<DialogContent className="max-w-[80vw] max-h-[80vh] min-w-[80vw] min-h-[80vh] overflow-auto">
						<Storage
							storageName="daibarba"
							initialPath={initialPath}
							onNavigateTo={(path) => {
								field.onChange(path);
								setIsOpen(false);
							}}
						/>
					</DialogContent>
				</Dialog>
			</FormControl>
			{fieldConfigItem.description && (
				<FormDescription>{fieldConfigItem.description}</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	);
}
