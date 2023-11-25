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
	getMetadata: (file: File) => Promise<FileMetadata>,
	upsert: boolean) {

	const fileName = fspath.basename(file.name);
	const storagePath = fspath.join(...getStoragePath(fileName));

	const supabase = createClientComponentClient();
	const storage = supabase.storage.from(storageName);
	const uploadFileResut = await storage.upload(storagePath, file, { upsert });

	if (uploadFileResut.error)
		throw uploadFileResut.error;
	if (!uploadFileResut.data)
		throw new Error("File not uploaded");

	const metadata = await getMetadata(file);

	await callServerAction(upsertFileAction, {
		storagePath,
		metadata,
	})

	return storagePath;
}

export async function uploadImageToStorage(
	storageName: string, image: File,
	getStoragePath: (fileName: string) => string[],
	upsert: boolean) {
	return uploadFileToStorage(storageName, image, getStoragePath, async image => {
		const { width, height, blurData } = await generateBlurDataURL(image);
		return {
			width,
			height,
			blurData,
			alt: image.name,
			size: image.size,
			fileType: "image",
			mimeType: image.type,
		};
	}, upsert)
}