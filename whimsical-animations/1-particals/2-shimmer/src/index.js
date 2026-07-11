import "./reset.css";
import "./styles.css";

const btn = document.querySelector(".buyButton");
const SHIMMER_DURATION = 1000;

function generateShimmer() {
	const isMotionEnabled = window.matchMedia(
		"(prefers-reduced-motion: no-preference)",
	).matches;

	if (!isMotionEnabled) return;

	const shimmer = document.createElement("span");
	shimmer.classList.add("shimmer");
	shimmer.style.animationDuration = `${SHIMMER_DURATION}ms`;

	btn.appendChild(shimmer);

	setTimeout(() => {
		shimmer.remove();
	}, SHIMMER_DURATION);
}

btn.addEventListener("mouseenter", generateShimmer);
btn.addEventListener("focus", generateShimmer);

/*
  DOM manipulation cheatsheet:

  - Set an inline style:
    `element.style.backgroundColor = "white";`
  - Destroy an element:
    `element.remove();`
*/
