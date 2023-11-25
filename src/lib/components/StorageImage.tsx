import React from "react";
import Image from "next/image";
import { StorageFile } from "../db/schema/file";
import { callServerAction } from "../utils/actionUtils";
import { findOneFileAction } from "../actions/file";

function getPublicUrl(storageName: string, storagePath: string) {
	return new URL(storagePath, `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${storageName}/`);
}

export async function StorageImage({
	image,
	width,
	height,
	className,
}: {
	alt?: string;
	width?: number;
	height?: number;
	className?: string;
	image?: {
		storageName: string;
		source?: StorageFile | string;
	};
}) {
	let imageFile: StorageFile | undefined = undefined;

	if (typeof image?.source === "string") {
		imageFile = image
			? await callServerAction(findOneFileAction, {
					storagePath: image.source,
			  })
			: undefined;
	} else {
		imageFile = image?.source;
	}

	if (!image?.storageName || !imageFile?.storagePath)
		return <div>Immagine non trovata</div>;

	const metadata = imageFile?.metadata;
	if (metadata?.fileType !== "image") return <div>Immagine non trovata</div>;

	const publicUrl = getPublicUrl(image.storageName, imageFile.storagePath);
	console.log(publicUrl)

	return (
		<Image
			placeholder="blur"
			alt={metadata.alt}
			src={publicUrl.href}
			className={className}
			blurDataURL={metadata.blurData}
			width={width || metadata.width}
			height={height || metadata.height}
		/>
	);
}
