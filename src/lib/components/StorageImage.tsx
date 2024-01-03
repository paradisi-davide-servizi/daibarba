import { FileObject } from "@supabase/storage-js";
import Image from "next/image";
import { ComponentProps } from "react";
import { findStorageFile, getStorageFileMetadata } from "../utils/storageUtils";

export function getPublicUrl(storageName: string, storagePath: string) {
	return new URL(
		storagePath,
		`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${storageName}/`
	);
}

type ImageProps = ComponentProps<typeof Image>;
type ImagePropsExcludeAlt = Omit<ImageProps, "alt">;
type ImagePropsExcludeSrc = Omit<ImagePropsExcludeAlt, "src">;
type StorageImageProps = ImagePropsExcludeSrc;

async function getImageMetadata({ storageFile }: { storageFile: FileObject }) {
	const fileMetadata = await getStorageFileMetadata({
		storageFile,
	});

	const fileMetadataPayload = fileMetadata.data?.payload;
	const blurData =
		fileMetadataPayload?.fileType === "image"
			? fileMetadataPayload.blurData
			: undefined;

	const alt =
		fileMetadataPayload?.fileType === "image"
			? fileMetadataPayload.alt
			: storageFile.name;

	const height =
		fileMetadataPayload?.fileType === "image"
			? fileMetadataPayload.height
			: undefined;

	const width =
		fileMetadataPayload?.fileType === "image"
			? fileMetadataPayload.width
			: undefined;

	return {
		alt,
		width,
		height,
		blurData,
	};
}

export async function StorageImage({
	alt,
	fill,
	image,
	width,
	height,
	blurDataURL,
	...props
}: {
	alt?: string;
	image?: {
		storageName: string;
		source?: string | null;
	};
} & StorageImageProps) {
	if (!image?.storageName || !image.source) {
		return <div>Immagine non trovata</div>;
	}
	const storageFile = await findStorageFile({
		storageFilePath: image.source,
		storage: image.storageName,
	});
	if (!storageFile.data) {
		return <div>Immagine non trovata</div>;
	}
	const publicUrl = getPublicUrl(image.storageName, image.source);
	const metadata = await getImageMetadata({ storageFile: storageFile.data });

	if (fill && (!!height || !!width))
		throw new Error("can't use fill when width or height are specified");

	return (
		<Image
			{...props}
			fill={fill}
			src={publicUrl.href}
			alt={alt || metadata.alt}
			blurDataURL={blurDataURL || metadata.blurData}
			width={width || (fill ? undefined : metadata.width)}
			height={height || (fill ? undefined : metadata.height)}
			placeholder={blurDataURL || metadata.blurData ? "blur" : "empty"}
		/>
	);
}
