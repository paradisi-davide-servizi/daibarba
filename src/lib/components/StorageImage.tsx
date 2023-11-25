import React, { ComponentProps } from "react";
import Image from "next/image";
import { StorageFile } from "../db/schema/file";
import { callServerAction } from "../utils/actionUtils";
import { findOneFileAction } from "../actions/file";

function getPublicUrl(storageName: string, storagePath: string) {
	return new URL(
		storagePath,
		`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${storageName}/`
	);
}

type ImageProps = ComponentProps<typeof Image>;
type ImagePropsExcludeAlt = Omit<ImageProps, "alt">;
type ImagePropsExcludeSrc = Omit<ImagePropsExcludeAlt, "src">;
type StorageImageProps = ImagePropsExcludeSrc;

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
		source?: StorageFile | string;
	};
} & StorageImageProps) {
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
