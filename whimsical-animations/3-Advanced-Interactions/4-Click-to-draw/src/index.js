import { normalize } from "./utils";
import "./reset.css";
import "./styles.css";

const svg = document.querySelector("svg");
const points = [];
let polyline;

function convertPointsToString(points) {
	let output = "";

	points.forEach(({ x, y }) => {
		output += `${x},${y} `;
	});

	return output;
}

svg.addEventListener("click", (event) => {
	const x = normalize(event.offsetX, 0, svg.clientWidth, 0, 400);
	const y = normalize(event.offsetY, 0, svg.clientHeight, 0, 300);
	points.push({ x, y });

	const circle = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"circle",
	);

	circle.setAttribute("r", 3);
	circle.setAttribute("cx", x);
	circle.setAttribute("cy", y);
	svg.appendChild(circle);

	if (points.length === 2) {
		polyline = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"polyline",
		);

		svg.prepend(polyline);
	}

	if (points.length >= 2) {
		const poinstString = convertPointsToString(points);
		polyline.setAttribute("points", poinstString);
	}
});

/*
  NOTE: to create SVG elements in JS, you’ll need to
  use the `createElementNS` method. Otherwise, you’ll
  wind up with an HTML element instead.
  Here’s an example:

  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
*/
