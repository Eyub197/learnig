import { random, range, sample, times } from "lodash";
import {
	checkPrefersReducedMotion,
	clampedNormalize,
	convertDegreesToRadians,
	convertPolarToCartesian,
	normalize,
	setupCanvas,
} from "./utils";
import "./reset.css";
import "./styles.css";

const PARTICLES_PER_SECOND = 200;
const COLORS = [
	"hsl(354deg 75% 70%)", // Red
	"hsl(34deg 85% 65%)", // Orange
	"hsl(55deg 96% 70%)", // Yellow
	"hsl(90deg 50% 60%)", // Green
	"hsl(210deg 85% 65%)", // Blue
	"hsl(265deg 88% 70%)", // Lilac
];

const canvas = document.querySelector("canvas");
const button = document.querySelector("button");
let isRunning = false;
let lastTimestamp = performance.now();
let particles = [];

const { ctx, canvasDimensions } = setupCanvas(canvas);

function generateParticle() {
	const angle = random(180, 360);
	const velocity = random(5, 10);

	const [xVelocity, yVelocity] = convertPolarToCartesian(angle, velocity);

	const radius = random(20, 60);

	return {
		createdAt: performance.now(),
		x: canvasDimensions.width / 2,
		y: canvasDimensions.height + radius,
		xVelocity,
		yVelocity,
		color: sample(COLORS),
		lifespan: random(500, 1500),
		radius,
	};
}

function draw() {
	if (checkPrefersReducedMotion()) {
		return;
	}

	ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

	const now = performance.now();
	const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
	lastTimestamp = now;

	if (isRunning) {
		const numOfNewParticles = PARTICLES_PER_SECOND * deltaTime;
		const newParticles = times(numOfNewParticles, generateParticle);
		particles.push(...newParticles);
	}

	particles.forEach((particle) => {
		particle.x += particle.xVelocity;
		particle.y += particle.yVelocity;

		const particleAge = now - particle.createdAt;
		const particleScale = clampedNormalize(
			particleAge,
			0,
			particle.lifespan,
			1,
			0,
		);

		ctx.beginPath();
		ctx.arc(
			particle.x,
			particle.y,
			particle.radius * particleScale,
			0,
			2 * Math.PI,
		);
		ctx.fillStyle = particle.color;
		ctx.fill();
	});

	window.requestAnimationFrame(draw);
}

draw();

window.setInterval(() => {
	const now = performance.now();
	particles = particles.filter((particle) => {
		return now - particle.createdAt < particle.lifespan;
	});
}, 5000);

button.addEventListener("click", () => {
	isRunning = !isRunning;
});
