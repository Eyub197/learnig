import { random, range } from "lodash";
import "./reset.css";
import "./styles.css";

const FADE_DURATION = 1000;
const FADE_DELAY = 300;

window.addEventListener("click", (event) => {
	const isMotionEnabled = window.matchMedia(
		"(prefers-reduced-motion: no-preference)",
	).matches;

	const x = event.clientX;
	const y = event.clientY;

	const particles = [];
	const numOfParticles = isMotionEnabled ? 5 : 3;

	range(numOfParticles).forEach(() => {
		const particle = document.createElement("img");

		particle.setAttribute("alt", "");
		particle.setAttribute(
			"src",
			"https://sandpack-bundler.vercel.app/img/wand-sparkle.svg",
		);
		particle.classList.add("star");
		particle.style.left = `${x}px`;
		particle.style.top = `${y}px`;

		let angle, distance, popDuration;
		if (isMotionEnabled) {
			angle = random(225 - 20, 225 + 20);
			distance = random(30, 60);
			popDuration = 1000;
		} else {
			angle = random(225 - 60, 225 + 60);
			distance = random(6, 25);
			popDuration = 0;
		}

		const rotation = random(90, 360);

		particle.style.setProperty("--angle", angle + "deg");
		particle.style.setProperty("--distance", distance + "px");
		particle.style.setProperty("--rotation", rotation + "deg");

		particle.style.setProperty("--pop-duration", popDuration + "ms");
		particle.style.setProperty("--fade-duration", FADE_DURATION + "ms");
		particle.style.setProperty("--fade-delay", FADE_DELAY + "ms");

		particles.push(particle);
		document.body.appendChild(particle);
	});

	window.setTimeout(
		() => {
			particles.forEach((particle) => {
				particle.remove();
			});
		},
		FADE_DURATION + FADE_DELAY + 200,
	);
});

const convertPolarToCartesian = (angle, distance) => {
	const angleInRadians = convertDegreesToRadians(angle);
	const x = Math.cos(angleInRadians) * distance;
	const y = Math.sin(angleInRadians) * distance;

	return [x, y];
};

const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;
