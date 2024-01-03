import { cn } from "@/lib/utils";
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable
} from "@hello-pangea/dnd";
import { Plus, Trash } from "lucide-react";
import {
	UseFieldArrayMove,
	UseFieldArrayRemove,
	useFieldArray,
	useForm
} from "react-hook-form";
import { MdDragIndicator } from "react-icons/md";
import * as z from "zod";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../accordion";
import { Button } from "../../button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../dialog";
import { Separator } from "../../separator";
import { ArrayConfigItem } from "../types";
import { beautifyObjectName } from "../utils";
import AutoFormObject from "./object";

function AutoFormItemContent<ArrayType extends z.ZodArray<z.AnyZodObject>>({
	name,
	item,
	path,
	form,
	index,
	remove,
	fieldConfigItem,
}: {
	path: string[];
	index: number;
	name: string;
	remove: UseFieldArrayRemove;
	item: z.ZodObject<any, any>;
	form: ReturnType<typeof useForm>;
	fieldConfigItem?: ArrayConfigItem<ArrayType>;
}) {
	const renderType = fieldConfigItem?.render?.renderType;
	const fieldState = form.getFieldState(name, form.formState);
	const fieldValue = form.watch(name);
	if (renderType === "dialog") {
		return (
			<div className="flex flex-row mb-2 md:mb-4 gap-2 md:gap-6 justify-start w-full">
				<Dialog>
					<DialogTrigger asChild>
						<div className="w-full flex flex-col justify-start gap-1 md:gap-2">
							<Button
								type="button"
								variant="outline"
								className={cn(
									"flex-1 h-auto",
									fieldState.error
										? "border-destructive text-destructive hover:text-destructive"
										: ""
								)}>
								<div className="flex flex-row justify-start w-full">
									{fieldConfigItem?.render?.trigger?.(
										fieldValue
									)}
								</div>
							</Button>
							{fieldState.error && (
								<p className=" text-destructive">
									Record non valido
								</p>
							)}
						</div>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto">
						<DialogHeader>
							<DialogTitle>{item.description}</DialogTitle>
						</DialogHeader>
						<AutoFormObject
							form={form}
							schema={item}
							path={[...path, index.toString()]}
							fieldConfig={fieldConfigItem?.fieldConfig}
						/>
					</DialogContent>
				</Dialog>
				<Button
					size="icon"
					type="button"
					variant="secondary"
					onClick={() => remove(index)}>
					<Trash size={16} />
				</Button>
			</div>
		);
	}
	return (
		<div className="mb-4 grid gap-2 md:gap-6 w-full">
			<AutoFormObject
				form={form}
				schema={item}
				path={[...path, index.toString()]}
				fieldConfig={fieldConfigItem?.fieldConfig}
			/>
			<Button
				variant="secondary"
				size="icon"
				type="button"
				onClick={() => remove(index)}>
				<Trash className="h-4 w-4" />
			</Button>
			<Separator />
		</div>
	);
}

function AutoFormArrayItem<ArrayType extends z.ZodArray<z.AnyZodObject>>({
	name,
	item,
	form,
	path,
	index,
	remove,
	draggableId,
	fieldConfigItem,
}: {
	name: string;
	path: string[];
	index: number;
	draggableId: string;
	item: z.ZodObject<any, any>;
	remove: UseFieldArrayRemove;
	form: ReturnType<typeof useForm>;
	fieldConfigItem?: ArrayConfigItem<ArrayType>;
}) {
	return (
		<Draggable index={index} draggableId={draggableId}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					className="flex flex-row">
					<div {...provided.dragHandleProps} className="pt-1 pr-2">
						<MdDragIndicator />
					</div>
					<AutoFormItemContent
						name={name}
						form={form}
						item={item}
						path={path}
						index={index}
						remove={remove}
						fieldConfigItem={fieldConfigItem}
					/>
				</div>
			)}
		</Draggable>
	);
}

function AutoFormArayDragDropContext<
	ArrayType extends z.ZodArray<z.AnyZodObject>
>({
	move,
	path,
	form,
	name,
	item,
	fields,
	remove,
	fieldConfigItem,
}: {
	name: string;
	path: string[];
	item: z.ZodArray<any>;
	move: UseFieldArrayMove;
	remove: UseFieldArrayRemove;
	fields: Record<"id", string>[];
	form: ReturnType<typeof useForm>;
	fieldConfigItem?: ArrayConfigItem<ArrayType>;
}) {
	const onDragEnd = ({ source, destination }: DropResult) => {
		if (destination) {
			move(source.index, destination.index);
		}
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId={path.join(".")} type={name}>
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{fields.map((field, index) => {
							const key = [...path, index.toString()].join(".");
							return (
								<AutoFormArrayItem
									name={key}
									form={form}
									path={path}
									index={index}
									key={field.id}
									remove={remove}
									draggableId={field.id}
									fieldConfigItem={fieldConfigItem}
									item={
										item._def.type as z.ZodObject<any, any>
									}
								/>
							);
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
export default function AutoFormArray<
	ArrayType extends z.ZodArray<z.AnyZodObject>
>({
	name,
	item,
	form,
	path = [],
	fieldConfigItem,
}: {
	name: string;
	path?: string[];
	item: z.ZodArray<any>;
	form: ReturnType<typeof useForm>;
	fieldConfigItem?: ArrayConfigItem<ArrayType>;
}) {
	const { fields, move, remove, append } = useFieldArray({
		control: form.control,
		name: path.join("."),
	});
	const title = item._def.description ?? beautifyObjectName(name);
	return (
		<AccordionItem value={name}>
			<AccordionTrigger>{title}</AccordionTrigger>
			<AccordionContent className="border-l p-2 md:p-3 pl-2 md:pl-6">
				<AutoFormArayDragDropContext
					name={name}
					item={item}
					move={move}
					form={form}
					path={path}
					remove={remove}
					fields={fields}
					fieldConfigItem={fieldConfigItem}
				/>
				<Button
					type="button"
					onClick={() => append({})}
					className="flex items-center">
					<Plus className="mr-2" size={16} />
					Nuovo
				</Button>
			</AccordionContent>
		</AccordionItem>
	);
}
