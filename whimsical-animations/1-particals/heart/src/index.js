import { range } from "lodash";
import { random, convertPolarToCartesian } from "../../../utils";
import "./reset.css";
import "./styles.css";

const btn = document.querySelector(".particleButton");

const FADE_DURATION = 1000;

btn.addEventListener("click", () => {
	btn.classList.toggle("liked");

	const isLiked = btn.classList.contains("liked");
	if (!isLiked) {
		return;
	}

	const particles = [];
	range(5).forEach(() => {
		const particle = document.createElement("span");
		particle.classList.add("particle");

		const angle = `${random(0, 360)}`;
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
