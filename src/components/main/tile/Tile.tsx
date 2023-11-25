import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { PropsOfComponent } from "@/lib/utils/typeUtils";
import { StorageImage } from "@/lib/components/StorageImage";
import { StorageFile } from "@/lib/db/schema/file";
import TileAnimation from "./TileAnimation";

export function Tile({
	label,
	image,
	priority,
	className,
	initialOpacity,
	...props
}: {
	label: string;
	priority?:boolean;
	initialOpacity?: number;
	image?: {
		storageName: string;
		source?: StorageFile | string;
	};
} & PropsOfComponent<typeof Link>) {
	return (
		<Link
			{...props}
			className={cn(
				"relative overflow-hidden uppercase group flex tracking-widest  text-3xl md:text-4xl ",
				className
			)}>
			<h2 className="p-8 group-hover:scale-110 transition-all text-center pointer-events-none w-full flex items-center justify-center font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
				<div className=" group-hover:-translate-y-2 transition-all after:bg-current after:h-1 after:absolute after:-bottom-2 after:left-0 origin-bottom-right after:w-full after:scale-x-0 group-hover:after:scale-x-100 hover:after:scale-x-100 after:transition-all">
					<TileAnimation initialOpacity={initialOpacity}>
						{label}
					</TileAnimation>
				</div>
			</h2>
			{image && (
				<StorageImage
					fill
					image={image}
					priority={priority}
					className=" w-full h-full group-hover:scale-110 transition-all brightness-75 object-cover"
				/>
			)}
		</Link>
	);
}
