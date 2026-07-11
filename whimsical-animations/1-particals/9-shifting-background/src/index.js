import { normalize } from "./utils";
import "./reset.css";
import "./styles.css";

window.addEventListener("pointermove", (event) => {
	const x = event.clientX;
	const y = event.clientY;

	// TODO: hue should range between 50deg and 200deg, from
	// left to right, based on “x” position:
	const hue = normalize(x, 0, window.innerWidth, 50, 200);

	// TODO: saturation should range between 100% and 25%,
	// from top to bottom, based on “y” position:
	const saturation = normalize(y, 0, window.innerHeight, 100, 25);

	const background = `hsl(${hue}deg ${saturation}% 75%)`;
	document.documentElement.style.background = background;
});
