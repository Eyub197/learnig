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
		particle.style.top = `${Math.floor(Math.random() * 100)}%`;
		particle.style.left = `${Math.floor(Math.random() * 100)}%`;

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
