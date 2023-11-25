import { z } from "zod";

export function file(maxSize: number) {
	return z.instanceof(File)
		.refine(file => file.size <= maxSize, `Max size is ${Math.floor(maxSize / 1024 / 1024)}mb`)
}

export as namespace zUtils;