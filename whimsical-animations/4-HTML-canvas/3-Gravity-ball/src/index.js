import { checkPrefersReducedMotion, setupCanvas } from "./utils";
import "./reset.css";
import "./styles.css";

const canvas = document.querySelector("canvas");
const { ctx, canvasWidth, canvasHeight } = setupCanvas(canvas);

const GRAVITY = 0.25;

const ball = {
	x: canvasWidth / 2,
	y: canvasHeight / 2,
	radius: 32,
	fill: "deeppink",
	velocityY: 1,
};

const groundLevel = canvasHeight - ball.radius;

function draw() {
	if (checkPrefersReducedMotion()) {
		return;
	}

	const { x, y, radius, fill } = ball;

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	ball.velocityY += GRAVITY;
	ball.y += ball.velocityY;

	if (ball.y > groundLevel) {
		ball.y = groundLevel;
		ball.velocityY *= -1;
	}

	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fillStyle = fill;
	ctx.fill();

	window.requestAnimationFrame(draw);
}

draw();
