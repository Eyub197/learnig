import DVD_URI from "./logo";
import { setupCanvas } from "./utils";
import "./reset.css";
import "./styles.css";

const canvas = document.querySelector("canvas");
const { ctx, canvasWidth, canvasHeight } = setupCanvas(canvas);

const img = new Image();
img.addEventListener("load", draw);
img.src = DVD_URI;

const INITIAL_VELOCITY_Y = 5;

const logo = {
	width: 200,
	height: 88,
	x: 0,
	y: 0,
	velocityY: INITIAL_VELOCITY_Y,
};

function draw() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(img, logo.x, logo.y, logo.width, logo.height);

	logo.y += logo.velocityY;

	if (logo.y > canvasHeight - logo.height) {
		logo.velocityY = INITIAL_VELOCITY_Y * -1;
	} else if (logo.y < 0) {
		logo.velocityY = INITIAL_VELOCITY_Y;
	}

	window.requestAnimationFrame(draw);
}
