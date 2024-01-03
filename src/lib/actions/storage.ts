"use server"

import { z } from "zod";
import { authAction } from ".";
import StorageFileApi from "@supabase/storage-js/dist/module/packages/StorageFileApi"
import { combinePaths, getUniqueStorageItemName, splitPath } from "../utils/storageUtils";

const listStorageItemsSchema = z.object({
    storageName: z.string(),
    path: z.string(),
    options: z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
        search: z.string().optional(),
        sortBy: z.object({
            column: z.string().optional(),
            order: z.string().optional()
        }).optional(),
    }).optional()
});

const deleteStorageItemSchema = z.object({
    storageName: z.string(),
    paths: z.string().array(),
});

const createStorageFolderSchema = z.object({
    storageName: z.string(),
    path: z.string(),
});

const renameStorageItemSchema = z.object({
    storageName: z.string(),
    currentPath: z.string(),
    newPath: z.string(),
});

export const listStorageAction = authAction(listStorageItemsSchema, async (input, ctx) => {
    const storage = ctx.supabase.storage.from(input.storageName);
    const storageList = await storage.list(input.path, input.options);
    if (storageList.error) {
        throw storageList.error;
    }
    return storageList.data;
});

export const deleteStorageItemsAction = authAction(deleteStorageItemSchema, async (input, ctx) => {
    const storage = ctx.supabase.storage.from(input.storageName);

    const paths = input.paths.map((path) => {
        return path.includes(".")
            ? path
            : combinePaths(path, ".emptyFolderPlaceholder")
    })

    const storageList = await storage.remove(paths);
    if (storageList.error) {
        throw storageList.error;
    }

    return storageList.data;
});

export const createStorageFolderAction = authAction(createStorageFolderSchema, async (input, ctx) => {
    const storage = ctx.supabase.storage.from(input.storageName);
    const storageList = await storage.list(input.path);
    if (storageList.error) {
        throw storageList.error;
    }
    const newFolderName = getUniqueStorageItemName("Nuova cartella", storageList.data);
    const path = combinePaths(input.path, newFolderName, ".emptyFolderPlaceholder");
    const emptyFolderPlaceholder = await storage.upload(path, "");
    if (emptyFolderPlaceholder.error) {
        throw emptyFolderPlaceholder.error;
    }
    const [folderPath] = splitPath(emptyFolderPlaceholder.data.path);
    return folderPath;
});

async function getNewUniqueStorageItemPath(storage: StorageFileApi, newItemPath: string) {
    const [newFolderPath, newItemName] = splitPath(newItemPath);
    if(!newFolderPath || !newItemName) {
        throw new Error("Invalid path");
    }
    const storageItemsInNewPath = await storage.list(newFolderPath);
    if (storageItemsInNewPath.error) {
        throw storageItemsInNewPath.error;
    }
    const uniqueStorageItemName = getUniqueStorageItemName(newItemName, storageItemsInNewPath.data);
    return combinePaths(newFolderPath, uniqueStorageItemName);
}

async function getCurrentStorageItemBeingRenamed(storage: StorageFileApi, currentItemPath: string) {
    const [currentFolderPath, currentItemName] = splitPath(currentItemPath);
    if(!currentFolderPath || !currentItemName) {
        throw new Error("Invalid path");
    }
    const storageItemsInCurrentPath = await storage.list(currentFolderPath);
    if (storageItemsInCurrentPath.error) {
        throw storageItemsInCurrentPath.error;
    }
    const storageItemBeingRenamed = storageItemsInCurrentPath.data.find(storageItem => storageItem.name === currentItemName);
    if (!storageItemBeingRenamed) {
        throw new Error("Not found");
    }
    return storageItemBeingRenamed;
}

async function renameFolder(storage: StorageFileApi, currentFolderPath: string, newFolderPath: string) {
    const fileObjects = await storage.list(currentFolderPath);
    if (fileObjects.error) {
        throw fileObjects.error;
    }
    for (const fileObject of fileObjects.data) {
        const currentSubItemPath = combinePaths(currentFolderPath, fileObject.name);
        const newSubItemPath = combinePaths(newFolderPath, fileObject.name);
        if (!fileObject.metadata) {
            // fileObject is a folder
            renameFolder(storage, currentSubItemPath, newSubItemPath)
        }
        else {
            // fileObject is a file
            renameFile(storage, currentSubItemPath, newSubItemPath);
        }
    }
}
async function renameFile(storage: StorageFileApi, currentFilePath: string, newFilePath: string) {
    const moveResult = await storage.move(currentFilePath, newFilePath);
    if (moveResult.error) {
        throw moveResult.error;
    }
}

export const renameStorageItemAction = authAction(renameStorageItemSchema, async (input, ctx) => {
    const storage = ctx.supabase.storage.from(input.storageName);
    const newUniqueStorageItemPath = await getNewUniqueStorageItemPath(storage, input.newPath);
    const currentStorageItemBeingRenamed = await getCurrentStorageItemBeingRenamed(storage, input.currentPath);
    if (!currentStorageItemBeingRenamed.metadata) {
        // fileObject is a folder
        renameFolder(storage, input.currentPath, newUniqueStorageItemPath);
    }
    else {
        // fileObject is a file
        renameFile(storage, input.currentPath, newUniqueStorageItemPath);
    }
})