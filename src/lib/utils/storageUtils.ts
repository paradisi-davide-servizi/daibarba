"use client"

import { findOneFileAction, insertFileAction, upsertFileAction } from "../actions/file";
import { callServerAction } from "./actionUtils";
import { FileMetadata } from "../db/schema/file";
import { generateBlurDataURL } from "./imageUtils";
import fspath from "path";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function uploadFileToStorage(
	storageName: string, file: File,
	getStoragePath: (fileName: string) => string[],
	upsert: boolean) {

	let metadata: FileMetadata | undefined;
	switch (file.type) {
		case "image/jpeg":
		case "image/png":
		case "image/gif":
		case "image/bmp":
		case "image/webp":
			const { width, height, blurData } = await generateBlurDataURL(file);
			metadata = {
				width,
				height,
				blurData,
				alt: file.name,
				size: file.size,
				fileType: "image",
				mimeType: file.type,
			};
			break;
		case "image/x-icon":
		case "image/vnd.microsoft.icon":
			metadata = {
				size: file.size,
				mimeType: file.type,
				fileType: "icon",
			}
			break;
		default:
			metadata = {
				size: file.size,
				mimeType: file.type,
				fileType: "unknown",
			}
	}

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