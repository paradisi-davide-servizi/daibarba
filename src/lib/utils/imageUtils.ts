import { decode } from "jpeg-js";
import pica from "pica";
import { rgbaToThumbHash, thumbHashToDataURL } from "thumbhash";

type BlurDataInfo = {
	width: number;
	height: number;
	toWidth: number;
	toHeight: number;
	blurData: string;
};

export async function generateBlurDataURL(image: File): Promise<BlurDataInfo> {
	const imageBuffer = await image.arrayBuffer();
	const { width, height, data } = decode(imageBuffer, {
		useTArray: true,
	});

	let toHeight = 0;
	let toWidth = 0;
	if (width >= height) {
		toWidth = 100;
		toHeight = Math.floor((height / width) * 100);
	} else {
		toHeight = 100;
		toWidth = Math.floor((width / height) * 100);
	}

	const resized = await pica().resizeBuffer({
		src: data,
		width,
		height,
		toWidth,
		toHeight,
	});

	const thumbhash = rgbaToThumbHash(toWidth, toHeight, resized);
	const blurData = thumbHashToDataURL(thumbhash);

	return {
		width,
		height,
		toWidth,
		toHeight,
		blurData,
	};
}