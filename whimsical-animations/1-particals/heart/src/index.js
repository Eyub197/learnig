import { range, random } from "lodash";
import { normalize } from "../../../utils";
import "./reset.css";
import "./styles.css";

const btn = document.querySelector(".particleButton");

const MIN_DISTANCE = 32;
const MAX_DISTANCE = 64;
const MIN_FADE_DURATION = 1000 - 500;
const MAX_FADE_DURATION = 1000 + 500;
const MAX_FADE_DALAY = 500;
const MAX_FADE_ADJUST = 500;
const NUM_OF_PARTICLES = 15;
const PARTICLE_DELAY = 150;

function colorShifting(particle) {
	particle.style.backgroundColor = `hsl(${random(0, 360)}deg 90% 85%)`;
	particle.style.setProperty("--hue-rotation", "720deg");
}

btn.style.setProperty("--pop-circle-duration", `${PARTICLE_DELAY}ms`);

btn.addEventListener("click", () => {
	btn.classList.toggle("liked");
	const isLiked = btn.classList.contains("liked");
	if (!isLiked) {
		return;
	}

	const isMotionEnabled = window.matchMedia(
		"(prefers-reduced-motion: no-preference)",
	).matches;

	if (!isMotionEnabled) return;

	const particles = [];
	range(NUM_OF_PARTICLES).forEach((index) => {
		const particle = document.createElement("span");
		particle.classList.add("particle");
		colorShifting(particle);

		let angle = normalize(index, 0, NUM_OF_PARTICLES, 0, 360);
		angle += random(-40, 40);

		const distance = random(MIN_DISTANCE, MAX_DISTANCE);

		particle.style.setProperty("--angle", `${angle}deg`);
		particle.style.setProperty("--distance", `${distance}px`);

		particle.style.setProperty(
			"--fade-duration",
			normalize(
				distance,
				MIN_DISTANCE,
				MAX_DISTANCE,
				MIN_FADE_DURATION,
				MAX_FADE_DURATION,
			) +
				random(-200, 200) +
				"ms",
		);

		particle.style.setProperty(
			"--fade-delay",
			normalize(distance, MIN_DISTANCE, MAX_DISTANCE, 0, MAX_FADE_DALAY) +
				random(0, MAX_FADE_ADJUST) +
				"ms",
		);

		particle.style.setProperty(
			"--pop-duration",
			normalize(distance, MIN_DISTANCE, MAX_DISTANCE, 400, 800) +
				random(-200, 200) +
				"ms",
		);
		particle.style.setProperty("--size", `${random(9, 15)}px`);
		particle.style.setProperty("--twinkle-duration", `${random(150, 300)}ms`);
		particle.style.setProperty("--twinkle-amount", `${random(3.325, 1, true)}`);

		particles.push(particle);
	});

	window.setTimeout(() => {
		particles.forEach((particle) => {
			btn.append(particle);
		});
	}, PARTICLE_DELAY);

	// window.setTimeout(
	// 	() => {
	// 		particles.forEach((particle) => {
	// 			particle.remove();
	// 		});
	// 	},
	// 	MAX_FADE_DURATION + MAX_FADE_DALAY + MAX_FADE_ADJUST + PARTICLE_DELAY + 200,
	// );
});
