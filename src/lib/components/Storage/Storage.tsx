"use client";

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaFile, FaFolder } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useKeyboard, useKeyboardCallback } from "@/lib/utils/hooks";
import { formatBytes } from "@/lib/utils/stringUtils";
import { viewModelProviderFactory } from "@/lib/utils/rxjs/viewModelProviderFactory";
import Image from "next/image";
import { LuLoader2 } from "react-icons/lu";
import { useOnClickOutside } from "usehooks-ts";
import { combinePaths } from "../../utils/storageUtils";
import { getPublicUrl } from "../StorageImage";
import { StorageItemViewModel, StorageViewModel } from "./StorageViewModel";
import { useObservableProperty } from "@/lib/utils/rxjs/rxjsHooks";

function StorageItemPreview({
	storageName,
	storageItem,
}: {
	storageName: string;
	storageItem: StorageItemViewModel;
}) {
	switch (storageItem.type) {
		case "image/jpeg":
		case "image/png":
		case "image/webp":
			const imagePath = combinePaths(
				storageItem.storagePath,
				storageItem.name
			);
			return (
				<Image
					alt=""
					width={50}
					height={50}
					className="object-contain"
					src={getPublicUrl(storageName, imagePath).href}
				/>
			);
		case "folder":
			return <FaFolder size={32} />;
		default:
			return <FaFile size={32} />;
	}
}

function StorageItemName({
	storage,
	storageItem,
}: {
	storage?: StorageViewModel;
	storageItem: StorageItemViewModel;
}) {
	const isRenaming = useObservableProperty(storageItem.isRenaming);
	const [newName, setNewName] = useState(storageItem.name);
	const inputRef = useRef<HTMLInputElement>(null);
	useOnClickOutside(inputRef, () => {
		if (isRenaming) {
			storage?.endRenamingItem(newName);
		}
	});
	useKeyboardCallback(["Enter"], () => {
		if (isRenaming) {
			storage?.endRenamingItem(newName);
		}
	});
	if (isRenaming) {
		return (
			<Input
				type="text"
				ref={inputRef}
				value={newName}
				onChange={(e) => setNewName(e.target.value)}
			/>
		);
	}
	return storageItem.name;
}

function StorageItem({
	storage,
	storageItem,
}: {
	storage?: StorageViewModel;
	storageItem: StorageItemViewModel;
}) {
	const keyboard = useKeyboard(["Control"]);
	const isSelected = useObservableProperty(storageItem.isSelected);
	const isRenaming = useObservableProperty(storageItem.isRenaming);
	const selectedItems = useObservableProperty(storage?.selectedItems);

	return (
		<TableRow
			draggable={!isRenaming}
			key={storageItem.name}
			data-state={isSelected && "selected"}
			onClick={() =>
				storage?.selectItem(
					storageItem,
					keyboard.has("Control") ? "multiselect" : "click"
				)
			}
			onContextMenu={() => storage?.selectItem(storageItem, "context")}
			onDrop={(event) => storageItem.onDrop(event)}
			onDragOver={(event) => storageItem.onDragOver(event)}
			onDragStart={(event) => storageItem.onDragStart(event)}>
			<TableCell>
				{storage?.storageName && (
					<StorageItemPreview
						storageItem={storageItem}
						storageName={storage.storageName}
					/>
				)}
			</TableCell>
			<TableCell className="break-all">
				<StorageItemName storage={storage} storageItem={storageItem} />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{storageItem.type}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{storageItem.updatedAt?.toLocaleDateString("it-IT") || ""}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{formatBytes(storageItem.size)}
			</TableCell>
		</TableRow>
	);
}

function StorageHeader() {
	const viewModel = useStorageViewModel();
	const currentPath = useObservableProperty(viewModel?.currentPath);
	const selectedItems = useObservableProperty(viewModel?.selectedItems);
	const uploadingFiles = useObservableProperty(viewModel?.uploadingFiles);
	return (
		<>
			<div
				className="flex flex-row items-center justify-start gap-2"
				onDragOver={() => viewModel?.navigateBack()}>
				<button onClick={() => viewModel?.navigateBack()}>
					<FaArrowLeft size={15} />
				</button>
				<p className="text-lg">
					./<span>{currentPath}</span>
				</p>
			</div>
			<div className="flex flex-row text-xs gap-2 ">
				{selectedItems?.length ?? 0} elementi selezionati
				<Separator orientation="vertical" />
				{uploadingFiles?.length ?? 0} file da caricare
			</div>
		</>
	);
}

function StorageTable() {
	const viewModel = useStorageViewModel();
	const storageItems = useObservableProperty(viewModel?.storageItems);
	return (
		(storageItems && (
			<Table className="table-fixed">
				<TableHeader>
					<TableRow>
						<TableHead className="w-24 md:w-32"></TableHead>
						<TableHead>Nome</TableHead>
						<TableHead className="hidden md:table-cell">Tipo</TableHead>
						<TableHead className="hidden md:table-cell">
							Ultima modifica
						</TableHead>
						<TableHead className="hidden md:table-cell">
							Dimensione
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{storageItems.map((storageItem) => (
						<StorageItem
							storage={viewModel}
							key={storageItem.name}
							storageItem={storageItem}
						/>
					))}
				</TableBody>
			</Table>
		)) || (
			<div className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center">
				<div className="animate-spin">
					<LuLoader2 size={45} />
				</div>
			</div>
		)
	);
}

function StorageContextMenuItems() {
	const viewModel = useStorageViewModel();
	const storageItems = useObservableProperty(viewModel?.storageItems) || [];
	const selectedItems = useObservableProperty(viewModel?.selectedItems) || [];
	return (
		<>
			<ContextMenuItem
				inset
				onClick={() => viewModel?.createNewStorageFolder()}>
				Nuova cartella
			</ContextMenuItem>
			<ContextMenuItem
				inset
				disabled={storageItems.length === 0}
				onClick={() => viewModel?.selectAllItems()}>
				Seleziona tutto
			</ContextMenuItem>
			<ContextMenuItem
				inset
				disabled={selectedItems?.length !== 1}
				onClick={() => viewModel?.startRenamingItem()}>
				Rinomina
			</ContextMenuItem>
			<ContextMenuItem
				className=" text-destructive"
				inset
				onClick={() => viewModel?.deleteSelectedItems()}
				disabled={selectedItems.length === 0}>
				Elimina elementi ({selectedItems?.length})
			</ContextMenuItem>
		</>
	);
}

function StorageContainer({ className }: { className?: string }) {
	const viewModel = useStorageViewModel();
	return (
		<div
			className={className}
			onDrop={(event) => viewModel?.onDrop(event)}
			onDragOver={(event) => viewModel?.onDragOver(event)}>
			<div className="w-full h-full flex flex-col gap-2">
				<StorageHeader />
				<Separator />
				<ContextMenu>
					<ContextMenuTrigger className=" relative overflow-auto h-full w-full">
						<StorageTable />
					</ContextMenuTrigger>
					<ContextMenuContent className="w-64">
						<StorageContextMenuItems />
					</ContextMenuContent>
				</ContextMenu>
			</div>
		</div>
	);
}

const [StorageViewModelProvider, useStorageViewModel] =
	viewModelProviderFactory(
		({
			storageName,
			initialPath,
			onNavigateTo,
		}: {
			storageName: string;
			initialPath?: string;
			onNavigateTo?: (filePath: string) => void;
		}) => new StorageViewModel({ storageName, initialPath, onNavigateTo })
	);

export function Storage({
	className,
	storageName,
	initialPath,
	onNavigateTo,
}: {
	className?: string;
	storageName: string;
	initialPath?: string;
	onNavigateTo?: (filePath: string) => void;
}) {
	return (
		<StorageViewModelProvider
			args={{
				storageName,
				initialPath,
				onNavigateTo,
			}}>
			<StorageContainer className={className} />
		</StorageViewModelProvider>
	);
}
