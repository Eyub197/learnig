import { range } from "lodash";
import { random } from "../../../utils";
import "./reset.css";
import "./styles.css";

const btn = document.querySelector(".particleButton");

const FADE_DURATION = 100;

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

		const x = `${random(-48, 48)}px`;
		const y = `${random(-48, 48)}px`;

		particle.style.setProperty("--x", x);
		particle.style.setProperty("--y", y);

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
