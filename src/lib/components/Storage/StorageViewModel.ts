import { createStorageFolderAction, deleteStorageItemsAction, listStorageAction, renameStorageItemAction } from "@/lib/actions/storage";
import { callServerAction } from "@/lib/utils/actionUtils";
import { ObservableProperty, ReactiveObject, ReactiveProperty } from "@/lib/utils/rxjs/reactiveObject";
import { filterOnObservable } from "@/lib/utils/rxjs/rxjsUtils";
import { combinePaths, splitPath, uploadFilesToStorage } from "@/lib/utils/storageUtils";
import { map, merge, switchMap } from "rxjs";

export class StorageItemViewModel extends ReactiveObject {
    name: string;
    size: number;
    updatedAt?: Date;
    storagePath: string;
    storage: StorageViewModel;
    isSelected = this.reactiveProperty(false);
    isRenaming = this.reactiveProperty(false);
    type: "folder" | string;
    constructor({
        name,
        size,
        type,
        storage,
        updatedAt,
        storagePath,
    }: {
        name: string;
        size: number;
        updatedAt?: Date;
        storagePath: string;
        type: "folder" | string;
        storage: StorageViewModel;
    }) {
        super();
        this.name = name;
        this.size = size;
        this.type = type;
        this.storage = storage;
        this.updatedAt = updatedAt;
        this.storagePath = storagePath;
    }
    onDragStart(event: React.DragEvent<HTMLDivElement>) {
        event.dataTransfer.clearData();
        const currentPath = combinePaths(this.storagePath, this.name);
        event.dataTransfer.setData("text/plain", currentPath);
    }
    onDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
    }
    async onDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
        const dropData = event.dataTransfer.getData("text");
        if (dropData === "") {
            // uploading a file
            const path = this.type === "folder"
                ? combinePaths(this.storagePath, this.name)
                : this.storagePath;
            this.storage.uploadFiles(path, event.dataTransfer.files)
        }
        else {
            // moving a file
            if (this.type === "folder") {
                // to this folder
                const [, storageItemName] = splitPath(dropData);
                if (!storageItemName) {
                    return;
                }
                const newPath = combinePaths(this.storagePath, this.name, storageItemName);
                await this.storage.renameItem(dropData, newPath);
            }
            else {
                // to parent folder
                const [, storageItemName] = splitPath(dropData);
                if (!storageItemName) {
                    return;
                }
                const newPath = combinePaths(this.storagePath, storageItemName);
                await this.storage.renameItem(dropData, newPath);
            }
        }
    }
}

export class StorageViewModel extends ReactiveObject {

    storageName: string;
    onNavigateTo?: (filePath: string) => void;

    currentPath: ReactiveProperty<string>;
    uploadingFiles: ReactiveProperty<File[]>;
    storageItems: ObservableProperty<StorageItemViewModel[] | undefined>;
    selectedItems: ObservableProperty<StorageItemViewModel[] | undefined>;

    constructor({
        storageName,
        initialPath,
        onNavigateTo,
    }: {
        storageName: string;
        initialPath?: string;
        onNavigateTo?: (filePath: string) => void;
    }) {
        super();
        this.storageName = storageName;
        this.onNavigateTo = onNavigateTo;
        this.uploadingFiles = this.reactiveProperty<File[]>([]);
        this.currentPath = this.reactiveProperty(initialPath || "");

        const storageItems$ = merge(
            this.currentPath.pipe(map(_ => undefined)),
            this.currentPath.pipe(
                switchMap(async path => {
                    return await callServerAction(listStorageAction, {
                        storageName,
                        path: path
                    }) || []
                }),
                map(fileObjects => {
                    if (fileObjects.error) {
                        return [];
                    }
                    return fileObjects.data
                        ?.filter((fs) => !fs.name.startsWith("."))
                        .map(
                            (fs) =>
                                new StorageItemViewModel({
                                    storage: this,
                                    name: fs.name,
                                    type: (fs.metadata?.["mimetype"] as string) || "folder",
                                    size: fs.metadata?.["size"] || 0,
                                    updatedAt: fs.updated_at
                                        ? new Date(fs.updated_at)
                                        : undefined,
                                    storagePath: this.currentPath.value,
                                })
                        );
                })
            ))

        this.storageItems = this.observableProperty<StorageItemViewModel[] | undefined>(storageItems$, []);

        const selectedItems$ = this.storageItems.pipe(
            filterOnObservable(storageItem => storageItem.isSelected, s => s),
        )

        this.selectedItems = this.observableProperty<StorageItemViewModel[] | undefined>(selectedItems$, []);
    }


    async createNewStorageFolder() {
        await callServerAction(createStorageFolderAction, {
            storageName: this.storageName,
            path: this.currentPath.value,
        });
        this.currentPath.value = this.currentPath.value;
    }
    async deleteSelectedItems() {
        await callServerAction(deleteStorageItemsAction, {
            paths: this.selectedItems.value?.map((storageItem) => {
                const itemPath = storageItem.storagePath;
                const itemName = storageItem.name;
                return combinePaths(itemPath, itemName);
            }) || [],
            storageName: this.storageName,
        });
        this.currentPath.value = this.currentPath.value;
    }
    navigateTo(storageItem: StorageItemViewModel) {
        const newPath = combinePaths(storageItem.storagePath, storageItem.name);
        if (storageItem.type === "folder") {
            this.currentPath.value = newPath;
        } else {
            this.onNavigateTo?.(newPath);
        }
    }
    navigateBack() {
        const [previousPath] = splitPath(this.currentPath.value);
        this.currentPath.value = previousPath;
    }
    selectItem(storageItem: StorageItemViewModel, select: "click" | "context" | "multiselect") {
        const deselectOthers = select === "click"
            || (select === "context" && this.selectedItems.value?.length === 1);
        if (deselectOthers) {
            if (select === "click"
                && storageItem.isSelected.value
                && !storageItem.isRenaming.value
                && this.selectedItems.value?.length === 1) {
                this.navigateTo(storageItem);
            }
            for (const storageItem of this.storageItems.value || []) {
                storageItem.isSelected.value = false;
            }
        }
        storageItem.isSelected.value = true;
    }
    selectAllItems() {
        for (const storageItem of this.storageItems.value || []) {
            storageItem.isSelected.value = true;
        }
    }
    onDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
    }
    async onDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
        const dropData = event.dataTransfer.getData("text");
        if (dropData === "") {
            // uploading a file to this folder
            this.uploadFiles(this.currentPath.value, event.dataTransfer.files);
        }
        else {
            // moving a file to this folder
            const [, storageItemName] = splitPath(dropData);
            if (!storageItemName) {
                return;
            }
            const newPath = combinePaths(this.currentPath.value, storageItemName);
            await this.renameItem(dropData, newPath);
        }
    }
    async uploadFiles(storageFolderPath: string, fileList: FileList) {
        if (fileList.length === 0) {
            return;
        }
        if (this.currentPath.value !== storageFolderPath) {
            this.currentPath.value = storageFolderPath;
        }
        const files = Array.from(fileList);
        this.uploadingFiles.value = files;
        await uploadFilesToStorage({
            files,
            storageFolderPath,
            storage: this.storageName,
            options: {
                upsert: true
            },
            onFileUploaded: (result) => {
                this.uploadingFiles.value = this.uploadingFiles.value
                    .filter(uploadingFile => uploadingFile.name !== result.name)
            },
        });
        this.uploadingFiles.value = [];
        this.currentPath.value = this.currentPath.value;
    }
    startRenamingItem() {
        if (this.selectedItems.value?.length !== 1) {
            return;
        }
        const [selectedItem] = this.selectedItems.value;
        if (selectedItem.isRenaming.value) {
            return;
        }
        selectedItem.isRenaming.value = true;
    }
    async endRenamingItem(newName: string) {
        if (this.selectedItems.value?.length !== 1) {
            return
        }
        const [selectedItem] = this.selectedItems.value;
        selectedItem.isSelected.value = false;
        if (!selectedItem.isRenaming.value) {
            return;
        }
        selectedItem.isRenaming.value = false;
        if (selectedItem.name === newName) {
            return;
        }
        const currentPath = combinePaths(this.currentPath.value, selectedItem.name);
        const newPath = combinePaths(this.currentPath.value, newName);
        await this.renameItem(currentPath, newPath);
    }
    async renameItem(currentPath: string, newPath: string) {
        const renameStorageItemResult = await callServerAction(renameStorageItemAction, {
            storageName: this.storageName,
            currentPath,
            newPath,
        })
        if (renameStorageItemResult.error) {
            return;
        }
        this.currentPath.value = this.currentPath.value;
    }
}