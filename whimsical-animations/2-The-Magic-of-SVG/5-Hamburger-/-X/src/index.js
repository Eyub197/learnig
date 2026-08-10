import { animate, convertOffsetToTimes } from "motion";
import "./reset.css";
import "./styles.css";

const button = document.querySelector("button");
const line1 = button.querySelector("line:first-of-type");
const line2 = button.querySelector("line:last-child");

let isMenuOpen = false;

function handleClick() {
	isMenuOpen = !isMenuOpen;
	const preferceReducedMotion = checkPrefersReducedMotion();

	if (isMenuOpen) {
		animate(
			line1,
			{
				y1: 6,
				y2: 18,
			},
			{ duration: preferceReducedMotion ? 0 : 1 },
		);

		animate(
			line2,
			{
				y1: 18,
				y2: 6,
			},
			{ duration: preferceReducedMotion ? 0 : 1 },
		);
	} else {
		animate(
			line1,
			{
				y1: 8,
				y2: 8,
			},

			{ duration: preferceReducedMotion ? 0 : 1 },
		);

		animate(
			line2,
			{
				y1: 16,
				y2: 16,
			},

			{ duration: preferceReducedMotion ? 0 : 1 },
		);
	}

	// TODO: Update the icon based on the `isMenuOpen` variable.
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
