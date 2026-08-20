import "./reset.css";
import "./styles.css";

document.addEventListener("click", (event) => {
	const elem = event.target;

	// Ignore clicks on everything except ripple buttons
	if (!elem.getAttribute("data-ripple")) {
		return;
	}

	if (!matchMedia("prefers-reduced-motion: no-preference").matches) {
		return;
	}

	const { left, top } = elem.getBoundingClientRect();

	const relativeX = event.clientX - left;
	const relativeY = event.clientY - top;

	const particle = document.createElement("span");

	particle.classList.add("ripple");
	particle.style.left = `${relativeX}px`;
	particle.style.top = `${relativeY}px`;
	elem.appendChild(particle);

	window.setTimeout(() => {
		particle.remove();
	}, 1000);
});
