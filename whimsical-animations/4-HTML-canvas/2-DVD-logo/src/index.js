import DVD_URI from "./logo";
import { checkPrefersReducedMotion, setupCanvas } from "./utils";
import "./reset.css";
import "./styles.css";

const canvas = document.querySelector("canvas");
const { ctx, canvasWidth, canvasHeight } = setupCanvas(canvas);

const img = new Image();
img.addEventListener("load", draw);
img.src = DVD_URI;

const logo = {
	width: 200,
	height: 88,
	x: 0,
	y: 0,
	velocityY: 1,
	velocityX: 1,
};

function draw() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	if (checkPrefersReducedMotion()) {
		ctx.drawImage(
			img,
			canvasWidth / 2 - logo.width,
			canvasHeight / 2 - logo.height,
			logo.width,
			logo.height,
		);
		return;
	}

	ctx.drawImage(img, logo.x, logo.y, logo.width, logo.height);

	const isLogoBeyondBoundsVertically =
		logo.y > canvasHeight - logo.height || logo.y < 0;
	const isLogoBeyondBoundsHorizontally =
		logo.x > canvasWidth - logo.width || logo.x < 0;

	if (isLogoBeyondBoundsVertically) {
		logo.velocityY *= -1;
	}
	if (isLogoBeyondBoundsHorizontally) {
		logo.velocityX *= -1;
	}

	logo.y += logo.velocityY;
	logo.x += logo.velocityX;
	window.requestAnimationFrame(draw);
}
