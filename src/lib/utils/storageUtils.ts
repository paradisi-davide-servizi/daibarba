import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import StorageFileApi from "@supabase/storage-js/dist/module/packages/StorageFileApi";
import { findOneFileMetadataAction, upsertFileMetadataAction } from "../actions/fileMetadata";
import { callServerAction } from "./actionUtils";
import { generateBlurDataURL } from "./imageUtils";
import { notEmpty } from "./typeUtils";
import { FileObject } from "@supabase/storage-js"
import { StorageFileMetadataPayload } from "../db/schema/fileMetadata";

export function getMetadataPayloadHandle(file: File): {
	mimeType: string,
	isSupported: boolean,
	getMetadataPayload: () => Promise<StorageFileMetadataPayload>
} {
	switch (file.type) {
		case "image/jpeg":
		case "image/png":
			return {
				isSupported: true,
				mimeType: file.type,
				getMetadataPayload: async () => {
					const { width, height, blurData } = await generateBlurDataURL(file);
					return {
						width,
						height,
						blurData,
						alt: file.name,
						size: file.size,
						fileType: "image",
						mimeType: file.type,
					};
				}
			}
		case "image/x-icon":
		case "image/vnd.microsoft.icon":
			return {
				isSupported: true,
				mimeType: file.type,
				getMetadataPayload: async () => {
					return {
						size: file.size,
						mimeType: file.type,
						fileType: "icon",
					}
				}
			}
		default:
			return {
				mimeType: file.type,
				isSupported: false,
				getMetadataPayload: async () => {
					return {
						size: file.size,
						mimeType: file.type,
						fileType: "unknown",
					}
				}
			}
	}
}

export type StorageFileApiAccessor = string | { storageFileApi: StorageFileApi };
function getStorageFileApi(storage: StorageFileApiAccessor): StorageFileApi {
	if (typeof storage === "string") {
		const supabase = createClientComponentClient();
		return supabase.storage.from(storage);
	}
	else {
		return storage.storageFileApi;
	}
}

export async function findStorageFile({
	storage,
	storageFilePath
}: {
	storage: StorageFileApiAccessor,
	storageFilePath: string | { storageFolderPath: string, storageFileName: string }
}) {

	const storageFileApi = getStorageFileApi(storage);

	let storageFolderPath, storageFileName: string | undefined = "";
	if (typeof storageFilePath === "string") {
		[storageFolderPath, storageFileName] = splitPath(storageFilePath);
	}
	else {
		storageFolderPath = storageFilePath.storageFolderPath;
		storageFileName = storageFilePath.storageFileName;
	}

	const findStorageFileResult = await storageFileApi.list(storageFolderPath, { search: storageFileName });
	if (findStorageFileResult.error) {
		return {
			error: findStorageFileResult.error,
			data: undefined,
		}
	}

	const storageFile = findStorageFileResult.data.at(0);
	if (!storageFile) {
		return {
			error: new Error("File not found"),
			data: undefined,
		}
	}

	return {
		data: storageFile,
		error: undefined,
	}
}

type UploadResult = {
	name: string;
	data: FileObject;
	error: undefined;
} | {
	name: string;
	data: undefined;
	error: Error | string | Partial<Record<"id" | "payload", string[]>>;
};

export async function getStorageFileMetadata({ storageFile }: { storageFile: FileObject }) {
	return await callServerAction(findOneFileMetadataAction, {
		id: storageFile.id
	});
}

export async function uploadFileToStorage({
	file,
	options,
	storage,
	storageItems,
	storageFolderPath,
}: {
	file: File,
	storageFolderPath: string,
	options?: { upsert?: boolean }
	storage: StorageFileApiAccessor,
	storageItems: { name: string }[]
}): Promise<UploadResult> {

	const storageFileApi = getStorageFileApi(storage);

	if (!storageItems) {
		const fileObjects = await storageFileApi.list(storageFolderPath);
		if (fileObjects.error) {
			return {
				error: fileObjects.error,
				data: undefined,
				name: file.name,
			}
		}
		storageItems = fileObjects.data.map(f => ({ name: f.name }));
	}

	const storageFileName = getUniqueStorageItemName(file.name, storageItems);
	const storageFilePath = combinePaths(storageFolderPath, storageFileName);
	const uploadFileResut = await storageFileApi.upload(storageFilePath, file, options);
	if (uploadFileResut.error) {
		return {
			error: uploadFileResut.error,
			data: undefined,
			name: file.name,
		}
	}

	const uploadedFileResult = await findStorageFile({
		storageFilePath: { storageFolderPath, storageFileName },
		storage,
	})

	if (uploadedFileResult.error) {
		return {
			error: uploadedFileResult.error,
			data: undefined,
			name: file.name,
		}
	}

	const metadataHandle = getMetadataPayloadHandle(file);
	if (!metadataHandle.isSupported) {
		return {
			error: new Error(`MIME type ${file.type} is not supported`),
			data: undefined,
			name: file.name,
		}
	}

	const metadataPayload = await metadataHandle.getMetadataPayload();
	if (metadataPayload.fileType === "unknown") {
		return {
			error: new Error(`Unknown metadata for MIME type ${file.type}`),
			data: undefined,
			name: file.name,
		}
	}

	const upsertFileMetadataResult = await callServerAction(upsertFileMetadataAction, {
		id: uploadedFileResult.data.id,
		payload: metadataPayload,
	});
	if (upsertFileMetadataResult.error) {
		return {
			error: upsertFileMetadataResult.error,
			data: undefined,
			name: file.name,
		}
	}

	return {
		data: uploadedFileResult.data,
		error: undefined,
		name: file.name,
	}
}

export async function uploadFilesToStorage({
	files,
	options,
	storage,
	onFileUploaded,
	storageFolderPath,
}: {
	files: File[],
	storageFolderPath: string;
	options?: { upsert: boolean };
	storage: StorageFileApiAccessor;
	onFileUploaded?: (result: UploadResult) => void;
}) {

	const storageFileApi = getStorageFileApi(storage);

	const fileObjects = await storageFileApi.list(storageFolderPath);
	if (fileObjects.error) {
		throw fileObjects.error;
	}

	const storageItems = fileObjects.data.map(f => ({ name: f.name }));
	const uploadResults = new Map<string, UploadResult>();

	for (const file of files) {
		const uploadedFileResult = await uploadFileToStorage({
			storage: { storageFileApi },
			storageFolderPath,
			storageItems,
			options,
			file,
		});
		uploadResults.set(file.name, uploadedFileResult);
		onFileUploaded?.(uploadedFileResult);
	}
}

export function getUniqueStorageItemName(baseName: string, storageItems: { name: string }[]) {
	const matchExpr = /(?<fileName>^[A-Za-z0-9]+(?: +[A-Za-z0-9]+)*)\ *(\((?<indexStr>[0-9])\))*(?<ext>\.[a-zA-Z]*)*/;

	const matchGroups = baseName.match(matchExpr)?.groups;
	const baseFileName = matchGroups?.["fileName"];
	const baseExt = matchGroups?.["ext"] || "";

	const storageItemsWithSimilarNames = storageItems.filter(storageItem => {
		const matchGroups = storageItem.name.match(matchExpr)?.groups;
		const fileName = matchGroups?.["fileName"];
		const ext = matchGroups?.["ext"] || "";
		return fileName === baseFileName && ext === baseExt;
	})

	const indices = new Set<number>();
	for (const storageItem of storageItemsWithSimilarNames) {
		const matchGroups = storageItem.name.match(matchExpr)?.groups;
		const indexStr = matchGroups?.["indexStr"] || "1";
		indices.add(Number.parseInt(indexStr))
	}

	let missingIndex = 0;
	for (let i = 1; i <= indices.size + 2; i++) {
		if (!indices.has(i)) {
			missingIndex = i;
			break;
		}
	}

	if (missingIndex > 1) {
		return `${baseFileName} (${missingIndex})${baseExt}`;
	}

	return `${baseFileName}${baseExt}`;
}

export function combinePaths(...paths: string[]) {
	return paths.filter(notEmpty).join("/");
}

export function splitPath(fullPath: string): [path: string, name: string | undefined] {
	const groups = fullPath.match(/^(?<path>.+)\/(?<name>[^\/]+)$/)?.groups;
	const path = groups?.["path"];
	const name = groups?.["name"];
	if (path) {
		return [path, name];
	}
	return ["", undefined];
}