"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import fspath from "path";
import { upsertFileAction } from "../actions/file";
import { FileMetadata } from "../db/schema/file";
import { callServerAction } from "./actionUtils";
import { generateBlurDataURL } from "./imageUtils";

export function getMetadataHandle(file: File): {
	mimeType: string,
	isSupported: boolean,
	getMetadata: () => Promise<FileMetadata>
} {
	switch (file.type) {
		case "image/jpeg":
		case "image/png":
			return {
				isSupported: true,
				mimeType: file.type,
				getMetadata: async () => {
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
				getMetadata: async () => {
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
				getMetadata: async () => {
					return {
						size: file.size,
						mimeType: file.type,
						fileType: "unknown",
					}
				}
			}
	}
}

export async function uploadFileToStorage(
	storageName: string, file: File,
	getStoragePath: (fileName: string) => string[],
	upsert: boolean) {

	const metadataHandle = getMetadataHandle(file);
	if (!metadataHandle.isSupported)
		throw new Error(`MIME type ${file.type} is not supported`);

	const metadata = await metadataHandle.getMetadata();
	if (metadata.fileType === "unknown")
		throw new Error(`Unknown metadata for MIME type ${file.type}`);

	const fileName = fspath.basename(file.name);
	const storagePath = fspath.join(...getStoragePath(fileName));

	await callServerAction(upsertFileAction, {
		storagePath,
		metadata,
	})

	const supabase = createClientComponentClient();
	const storage = supabase.storage.from(storageName);
	const uploadFileResut = await storage.upload(storagePath, file, { upsert });

	if (uploadFileResut.error)
		throw uploadFileResut.error;
	if (!uploadFileResut.data)
		throw new Error("File not uploaded");

	return storagePath;
}