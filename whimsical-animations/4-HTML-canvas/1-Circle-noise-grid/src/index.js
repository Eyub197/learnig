import { random, range } from "lodash";
import { normalize, setupCanvas } from "./utils";
import "./reset.css";
import "./styles.css";

const canvas = document.querySelector("canvas");
const { ctx, canvasWidth, canvasHeight } = setupCanvas(canvas);
const NUMBER_OF_ROWS = 20;
const NUMBER_OF_COLUMNS = 20;

// Acceptance Criteria:
// - A 20-by-20 grid of circles
// - Random background colors from
//   hsl(210deg 15% 6%) to hsl(210deg 15% 100%).

function draw() {
	range(NUMBER_OF_ROWS).forEach((row) => {
		range(NUMBER_OF_COLUMNS).forEach((column) => {
			const cellSize = canvasWidth / NUMBER_OF_COLUMNS;
			const radius = cellSize / 2;
			ctx.beginPath();
			const x = normalize(row, 0, NUMBER_OF_ROWS, 0, canvasWidth) + radius;
			const y =
				normalize(column, 0, NUMBER_OF_COLUMNS, 0, canvasHeight) + radius;
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			ctx.fillStyle = `hsl(210deg 15% ${random(6, 100)}%)`;
			ctx.fill();
		});
	});
}

draw();
