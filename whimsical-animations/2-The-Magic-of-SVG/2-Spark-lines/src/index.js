import "./reset.css";
import "./styles.css";
import { normalize } from "./utils";

const SVG_WIDTH = 200;
const SVG_HEIGHT = 100;

// `values` is an array of numbers.
// Those numbers range from 0 to 20 (0 being the lowest possible
// value, corresponding to the bottom of the SVG).
function drawSparkLine(svg, values) {
	svg.setAttribute("width", SVG_WIDTH);
	svg.setAttribute("height", SVG_HEIGHT);

	// TODO: calculate `pointsString`.
	// This should be a string in the format of:
	// "x1,y1 x2,y2 x3,y3 ..."

	// my solutino it works :) but there was someting better
	// let pointsString = "";

	// values.forEach((value, index) => {
	// 	const x = Math.round(normalize(index, 0, 20, 0, SVG_WIDTH));
	// 	const y = Math.round(normalize(value, 0, values.length - 1, SVG_HEIGHT, 0));
	// 	pointsString += `${x},${y} `;
	// });

	const normalizedValues = values.map((value, index) => {
		const x = Math.round(normalize(index, 0, 20, 0, SVG_WIDTH));
		const y = Math.round(normalize(value, 0, values.length - 1, SVG_HEIGHT, 0));
		return `${x},${y}`;
	});

	const pointsString = normalizedValues.join(" ");
	const polyline = svg.querySelector("polyline");
	polyline.setAttribute("points", pointsString);
}

const DATA = [
	0, 5, 12, 11, 18, 5, 2, 13, 13, 19, 20, 15, 14, 5, 6, 9, 1, 16, 20, 10, 16,
];

drawSparkLine(document.querySelector("svg"), DATA);
// 0,100 50,75 120,40 110,45 180,10 50,75 20,90 130,35 130,35 190,5 200,0 150,25 140,30 50,75 60,70 90,55 10,95 160,20 200,0 100,50 160,20
