import { animate } from "motion";
import "./reset.css";
import "./styles.css";

const button = document.querySelector("button");
const path = button.querySelector("path");

let isPlaying = false;

function handleClick() {
	isPlaying = !isPlaying;

	const prefersReducedMotion = checkPrefersReducedMotion();

	const pathInstructinos = isPlaying
		? "M 4,4 L 20,4, L 20,20 L 4,20 Z"
		: "M 5,3 L 19,12 L 19,12 L 5,21 Z";

	animate(
		path,
		{
			d: pathInstructinos,
		},
		prefersReducedMotion
			? { duration: 0 }
			: {
					type: "spring",
					stiffness: 300,
					damping: isPlaying ? 15 : 30,
				},
	);
}

button.addEventListener("click", handleClick);

function checkPrefersReducedMotion() {
	return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}

/*
  Motion Cheatsheet:

  animate() is the main function we’ll be using.
  It takes two arguments:

  1. The element to animate
  2. An object of the properties/values to change.

  For example:

    animate(
      button,
      { opacity: 0 }
    );
*/
