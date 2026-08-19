import { normalize, clampedNormalize } from "./utils";
import "./reset.css";
import "./styles.css";

const wrapper = document.querySelector(".wrapper");
const fellow = wrapper.querySelector(".fellow");

window.addEventListener("pointermove", (event) => {
	const cursorPoint = {
		x: event.clientX,
		y: event.clientY,
	};

	const bb = wrapper.getBoundingClientRect();

	const centerPoint = {
		x: bb.left + bb.width / 2,
		y: bb.top + bb.height / 2,
	};

	const distance = getDistanceBetweenPoints(cursorPoint, centerPoint);

	fellow.style.setProperty(
		"--blur-radius",
		`${clampedNormalize(distance, 50, 200, 0, 20)}px`,
	);

	fellow.style.setProperty(
		"--translate-y",
		`${clampedNormalize(distance, 15, 150, 0, 16)}px`,
	);
});

function getDistanceBetweenPoints(p1, p2) {
	const deltaX = p1.x - p2.x;
	const deltaY = p1.y - p2.y;

	return Math.sqrt(deltaX ** 2 + deltaY ** 2);
}
