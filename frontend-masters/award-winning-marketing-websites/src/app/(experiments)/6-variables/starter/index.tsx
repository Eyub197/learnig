"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";
import React, { useEffect } from "react";
import { distance } from "@/lib/math";

export default function Page() {
	const titleRef = React.useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const controller = new AbortController();
		window.addEventListener(
			"mousemove",
			(event) => {
				const mouseX = event.clientX;
				const mouseY = event.clientY;

				const screenWidth = window.innerWidth;
				const screenHeight = window.innerHeight;

				const centerX = screenWidth / 2;
				const centerY = screenHeight / 2;

				const d = distance(mouseX, mouseY, centerX, centerY);
				const maxDistance = distance(0, 0, centerX, centerY);

				if (titleRef.current) {
					titleRef.current.style.setProperty(
						"--distance",
						(d / maxDistance).toString(),
					);
				}
			},
			{
				signal: controller.signal,
			},
		);

		controller.signal.aborted;

		return () => {
			controller.abort();
		};
	});

	return (
		<div
			className={cn(
				"w-screen h-screen text-white flex items-center justify-center",
				s.grid,
			)}
		>
			<script
				src="//unpkg.com/react-scan/dist/auto.global.js"
				crossOrigin="anonymous"
			/>
			<h1
				ref={titleRef}
				className={cn(
					"uppercase text-[10vh] leading-none relative",
					s["title"],
				)}
			>
				Variables
			</h1>
		</div>
	);
}
