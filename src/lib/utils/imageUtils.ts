import { decode as decode_jpeg } from "jpeg-js";
import { decode as decode_png } from "fast-png"
import pica from "pica";
import { rgbaToThumbHash, thumbHashToDataURL } from "thumbhash";

type BlurDataInfo = {
	width: number;
	height: number;
	blurData: string;
};

type DecodedImageJPEG = {
	type: "jpeg",
	width: number,
	height: number,
	data: Uint8Array
};

type DecodedImagePNG = {
	type: "png",
	width: number,
	height: number,
	data: Uint8Array | Uint8ClampedArray | Uint16Array
}

type DecodedImage = DecodedImageJPEG | DecodedImagePNG;

export async function decodeImage(image: File): Promise<DecodedImage | undefined> {
	const imageBuffer = await image.arrayBuffer();
	switch (image.type) {
		case "image/jpeg":
			return {
				type: "jpeg",
				...decode_jpeg(imageBuffer, {
					useTArray: true,
				})
			};
		case "image/png":
			return {
				type: "png",
				...decode_png(imageBuffer)
			};
		default:
			return undefined;
	}
}

export async function generateBlurDataURLFromDecodedJPEG(decoded: DecodedImageJPEG) {

	let toHeight = 0;
	let toWidth = 0;

	if (decoded.width >= decoded.height) {
		toWidth = 100;
		toHeight = Math.floor((decoded.height / decoded.width) * 100);
	} else {
		toHeight = 100;
		toWidth = Math.floor((decoded.width / decoded.height) * 100);
	}

	const resized = await pica().resizeBuffer({
		height: decoded.height,
		width: decoded.width,
		src: decoded.data,
		toHeight,
		toWidth,
	});

	const thumbhash = rgbaToThumbHash(toWidth, toHeight, resized);
	return thumbHashToDataURL(thumbhash);
}

export async function generateBlurDataURL(image: File): Promise<BlurDataInfo> {

	const decoded = await decodeImage(image);
	if (!decoded) {
		throw new Error("Unable to decode image")
	}

	let blurData = ""
	switch (decoded.type) {
		case "jpeg":
			blurData = await generateBlurDataURLFromDecodedJPEG(decoded);
			break;
	}

	return {
		blurData,
		width:decoded.width,
		height:decoded.height,
	};
}