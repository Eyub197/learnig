import { random, range } from "lodash";
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

		btn.appendChild(particle);
		particles.push(particle);

		particle.style.setProperty(
			"--transform-x",
			Math.floor(Math.random() * 65 - 32) + "px",
		);
		particle.style.setProperty(
			"--transform-y",
			Math.floor(Math.random() * 65 - 32) + "px",
		);
		particle.style.animationDuration = FADE_DURATION + "ms";
	});

	window.setTimeout(() => {
		particles.forEach((particle) => {
			particle.remove();
		});
	}, FADE_DURATION + 200);
});
