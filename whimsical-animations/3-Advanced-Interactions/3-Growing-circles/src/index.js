import { throttle } from "lodash";
import { clampedNormalize, getDistanceBetweenPoints, normalize } from "./utils";
import "./reset.css";
import "./styles.css";

const svg = document.querySelector("svg");
const circles = [...svg.querySelectorAll("circle")];

const VIEW_BOX = 300;
svg.setAttribute("viewBox", `0 0 ${VIEW_BOX} ${VIEW_BOX}`);

window.addEventListener("pointermove", (event) => {
	if (checkPrefersReducedMotion()) {
		return;
	}

	const bb = getThrottledBoundingBox();

	const relativeX = event.clientX - bb.left;
	const relativeY = event.clientY - bb.top;

	const normalizedX = normalize(relativeX, 0, bb.width, 0, VIEW_BOX);
	const normalizedY = normalize(relativeY, 0, bb.height, 0, VIEW_BOX);

	const cursorPoints = {
		x: normalizedX,
		y: normalizedY,
	};

	circles.forEach((circle) => {
		const circleCenterPoint = {
			x: Number(circle.getAttribute("cx")),
			y: Number(circle.getAttribute("cy")),
		};

		const distance = getDistanceBetweenPoints(circleCenterPoint, cursorPoints);
		console.log(distance);

		circle.setAttribute("r", clampedNormalize(distance, 0, 400, 100, 4));
	});
});

const getThrottledBoundingBox = throttle(() => {
	return svg.getBoundingClientRect();
}, 500);

function checkPrefersReducedMotion() {
	return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}
