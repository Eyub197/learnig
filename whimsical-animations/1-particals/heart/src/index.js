import { range } from "lodash";
import { random, convertPolarToCartesian } from "../../../utils";
import "./reset.css";
import "./styles.css";

const btn = document.querySelector(".particleButton");

const FADE_DURATION = 1000;
const NUM_OF_PARTICLES = 5;
const JITTER = 40;

btn.addEventListener("click", () => {
	btn.classList.toggle("liked");

	const isLiked = btn.classList.contains("liked");
	if (!isLiked) {
		return;
	}

	const particles = [];
	
	range(NUM_OF_PARTICLES).forEach((index) => {
		const particle = document.createElement("span");
		particle.classList.add("particle");

		const angle = (360 / NUM_OF_PARTICLES) * index + random(-JITTER, JITTER);
		const distance = `${random(32, 64)}`;

		const [x, y] = convertPolarToCartesian(angle, distance);
		particle.style.setProperty("--x", `${x}px`);
		particle.style.setProperty("--y", `${y}px`);

		particle.style.setProperty("--fade-duration", `${FADE_DURATION}ms`);
		btn.appendChild(particle);
		particles.push(particle);
	});

	window.setTimeout(() => {
		particles.forEach((particle) => {
			particle.remove();
		});
	}, FADE_DURATION + 200);
});
