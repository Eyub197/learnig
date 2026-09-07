import { random, range } from "lodash";
import { checkPrefersReducedMotion, normalize, setupCanvas } from "./utils";
import "./reset.css";
import "./styles.css";

const canvas = document.querySelector("canvas");
const { ctx, canvasDimensions } = setupCanvas(canvas);
const mousePoints = { x: 0, y: 0 };

const NUM_OF_ROWS = 20;
const NUM_OF_COLS = 20;

const cells = range(NUM_OF_ROWS).map((rowIndex) =>
	range(NUM_OF_COLS).map((colIndex) => {
		return {
			rowIndex,
			colIndex,
			baseLightness: random(6, 90),
		};
	}),
);

window.addEventListener("pointermove", (event) => {
	const bb = canvas.getBoundingClientRect();

	mousePoints.x = event.clientX - bb.x;
	mousePoints.y = event.clientY - bb.y;
});

function draw() {
	const prefersReducedMotion = checkPrefersReducedMotion();
	ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

	cells.forEach((row) => {
		row.forEach(({ rowIndex, colIndex, baseLightness }) => {
			const cellSize = canvasDimensions.width / NUM_OF_COLS;
			const radius = cellSize / 2;
			const centerX =
				normalize(colIndex, 0, NUM_OF_COLS, 0, canvasDimensions.width) + radius;
			const centerY =
				normalize(rowIndex, 0, NUM_OF_ROWS, 0, canvasDimensions.height) +
				radius;

			const deltaX = centerX - mousePoints.x;
			const deltaY = centerY - mousePoints.y;
			const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

			const lightness =
				distance <= 30 && !prefersReducedMotion ? 100 : baseLightness;

			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
			ctx.fillStyle = `hsl(210deg 15% ${lightness}%)`;
			ctx.fill();
		});
	});
	window.requestAnimationFrame(draw);
}

draw();
