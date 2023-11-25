import Container from "@/lib/components/Container";
import React from "react";
import Image from "next/image";

export default function NotFound() {
	return (
		<main>
			<Container className="min-h-screen justify-center">
				<div className=" flex flex-col items-center justify-center h-full w-full">
					<Image
						src={"/logo.png"}
						alt="logo"
						width={500}
						height={500}
					/>
        <p className=" text-4xl font-semibold">Ops! qualcosa è andato storto</p>
				</div>
			</Container>
		</main>
	);
}
