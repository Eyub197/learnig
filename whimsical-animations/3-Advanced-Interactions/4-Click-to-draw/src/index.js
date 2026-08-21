import { normalize } from "./utils";
import "./reset.css";
import "./styles.css";

const svg = document.querySelector("svg");

svg.addEventListener("click", (event) => {
	const circle = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"circle",
	);

	const previusCircle = svg.querySelector("circle:last-of-type") ?? null;
	const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

	circle.setAttribute("r", 3);
	circle.setAttribute(
		"cx",
		normalize(event.offsetX, 0, svg.clientWidth, 0, 400),
	);
	circle.setAttribute(
		"cy",
		normalize(event.offsetY, 0, svg.clientHeight, 0, 300),
	);
	svg.appendChild(circle);

	const nextCircle = svg.lastElementChild;
	console.log("previus", previusCircle);
	console.log("next", nextCircle);
	if (previusCircle && nextCircle) {
		line.setAttribute("x1", previusCircle.getAttribute("cx"));
		line.setAttribute("y1", previusCircle.getAttribute("cy"));

		line.setAttribute("x2", nextCircle.getAttribute("cx"));
		line.setAttribute("y2", nextCircle.getAttribute("cy"));

		svg.prepend(line);
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
