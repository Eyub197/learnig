import { checkPrefersReducedMotion, setupCanvas } from "./utils";
import "./reset.css";
import "./styles.css";

const canvas = document.querySelector("canvas");
const { ctx, canvasWidth, canvasHeight } = setupCanvas(canvas);

const ball = {
	x: canvasWidth / 2,
	y: canvasHeight / 2,
	radius: 32,
	fill: "deeppink",
};

function draw() {
	const { x, y, radius, fill } = ball;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fillStyle = fill;
	ctx.fill();
}

draw();
