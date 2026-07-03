import { random, range } from "lodash";
import "./reset.css";
import "./styles.css";

const FADE_DURATION = 1000;
const FADE_DELAY = 300;

window.addEventListener("click", (event) => {
	const x = event.clientX;
	const y = event.clientY;

	const particles = [];

	range(5).forEach(() => {
		const particle = document.createElement("img");
		particle.setAttribute("alt", "");
		particle.setAttribute(
			"src",
			"https://sandpack-bundler.vercel.app/img/wand-sparkle.svg",
		);
		particle.classList.add("star");
		particle.style.left = `${x}px`;
		particle.style.top = `${y}px`;

		const angle = random(20, 60);
		const radius = random(20, 60);

		const [dx, dy] = convertPolarToCartesian(angle, radius);
		const rotation = random(90, 360);

		particle.style.setProperty("--x", `-${dx}px`);
		particle.style.setProperty("--y", `-${dy}px`);
		particle.style.setProperty("--rotation", `${rotation}deg`);

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
