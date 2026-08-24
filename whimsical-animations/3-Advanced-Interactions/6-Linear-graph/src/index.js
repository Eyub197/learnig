import { normalize } from "./utils";
import { checkVariantsDidChange, springValue } from "motion";
import { throttle } from "lodash";
import "./reset.css";
import "./styles.css";

const graph = document.querySelector(".graph");

const SPRING_CONFIG = {
	type: "spring",
	stiffness: 100,
	damping: 20,
};

const springX = springValue(100, SPRING_CONFIG);

const getThrottledBoundingBox = throttle(() => {
	return graph.getBoundingClientRect();
}, 500);

function checkPrefersReducedMotino() {
	return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}

window.addEventListener("mousemove", (event) => {
	if (checkPrefersReducedMotino()) return;

	const { clientX } = event;
	const bb = getThrottledBoundingBox();
	const relativeX = clientX - bb.left;
	const nomralizaedX = normalize(relativeX, 0, bb.width, 0, 100);
	springX.set(nomralizaedX);
});

springX.on("change", (value) => {
	graph.style.clipPath = `polygon(0% 0%, ${value}% 0%, ${value}% 100%, 0% 100%)`;
});
