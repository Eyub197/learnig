import DVD_URI from "./logo";
import { setupCanvas } from "./utils";
import "./reset.css";
import "./styles.css";

const canvas = document.querySelector("canvas");
const { ctx, canvasWidth, canvasHeight } = setupCanvas(canvas);

const img = new Image();
img.addEventListener("load", draw);
img.src = DVD_URI;

const INITIAL_VELOCITY_Y = 1;
const INITIAL_VELOCITY_X = 1;

const logo = {
	width: 200,
	height: 88,
	x: 0,
	y: 0,
	velocityY: INITIAL_VELOCITY_Y,
	velocityX: INITIAL_VELOCITY_X,
};

function draw() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(img, logo.x, logo.y, logo.width, logo.height);

	if (logo.y > canvasHeight - logo.height) {
		logo.velocityY = INITIAL_VELOCITY_Y * -1;
	} else if (logo.y < 0) {
		logo.velocityY = INITIAL_VELOCITY_Y;
	}

	if (logo.x > canvasWidth - logo.width) {
		logo.velocityX = INITIAL_VELOCITY_X * -1;
	} else if (logo.x < 0) {
		logo.velocityX = INITIAL_VELOCITY_X;
	}

	logo.y += logo.velocityY;
	logo.x += logo.velocityX;
	window.requestAnimationFrame(draw);
}
