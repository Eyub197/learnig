import { animate } from "motion";
import "./reset.css";
import "./styles.css";

const button = document.querySelector("button");
const line1 = button.querySelector("line:first-of-type");
const line2 = button.querySelector("line:last-child");

const VIEWBOX_SIZE = 24;
const INSET_X_BY = 6;

let isMenuOpen = false;

function handleFlatten() {
	if (checkPrefersReducedMotion()) {
		return;
	}

	const duration = 0.1;

	[line1, line2].forEach((line) => {
		const lineInset = 5;

		animate(
			line,
			{
				x1: lineInset,
				y1: VIEWBOX_SIZE * 0.5,
				x2: VIEWBOX_SIZE - lineInset,
				y2: VIEWBOX_SIZE * 0.5,
			},
			{ duration },
		);
	});
}

function handleClick() {
	isMenuOpen = !isMenuOpen;
	const preferceReducedMotion = checkPrefersReducedMotion();
	const duration = preferceReducedMotion ? 0 : 0.3;

	if (isMenuOpen) {
		animate(
			line1,
			{
				x1: INSET_X_BY,
				y1: INSET_X_BY,
				x2: VIEWBOX_SIZE - INSET_X_BY,
				y2: VIEWBOX_SIZE - INSET_X_BY,
			},
			{ duration },
		);

		animate(
			line2,
			{
				x1: INSET_X_BY,
				y1: VIEWBOX_SIZE - INSET_X_BY,
				x2: VIEWBOX_SIZE - INSET_X_BY,
				y2: INSET_X_BY,
			},
			{ duration },
		);
	} else {
		animate(
			line1,
			{
				x1: 5,
				y1: 8,
				x2: 19,
				y2: 8,
			},

			{ duration },
		);

		animate(
			line2,
			{
				x1: 5,
				y1: 16,
				x2: 19,
				y2: 16,
			},

			{ duration },
		);
	}

	// TODO: Update the icon based on the `isMenuOpen` variable.
}

button.addEventListener("pointerdown", handleFlatten);
button.addEventListener("click", handleClick);

function checkPrefersReducedMotion() {
	return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}

/* prod solution but I think that will not be that needed because in react it would be diffrent
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

/* import { animate } from 'motion';
import './reset.css';
import './styles.css';

const button = document.querySelector('button');
const menuSvg = document.querySelector('.menu-toggle');
const line1 = button.querySelector('line:first-child');
const line2 = button.querySelector('line:last-child');

const INSET_X_BY = 6;

let viewBoxWidth, viewBoxHeight, hamburgerData;
let isMenuOpen = false;

// This function runs on page load. It saves a bunch of information about the SVG, including its viewBox size and all of the points for the hamburger icon:
function initialize() {
  // If the HTML no longer includes this SVG, log an
  // error for debugging purposes
  if (!menuSvg) {
    console.error(
      'Could not locate hamburger SVG. This means that the icon will not morph to an “X” when the menu is opened.'
    );
    return;
  }

  const viewBoxString = menuSvg.getAttribute('viewBox');

  const viewBoxValues = viewBoxString
    .split(' ')
    .map(Number);

  viewBoxWidth = viewBoxValues[2];
  viewBoxHeight = viewBoxValues[3];

  hamburgerData = [
    {
      x1: Number(line1.getAttribute('x1')),
      y1: Number(line1.getAttribute('y1')),
      x2: Number(line1.getAttribute('x2')),
      y2: Number(line1.getAttribute('y2')),
    },
    {
      x1: Number(line2.getAttribute('x1')),
      y1: Number(line2.getAttribute('y1')),
      x2: Number(line2.getAttribute('x2')),
      y2: Number(line2.getAttribute('y2')),
    },
  ];
}

function handleClick() {
  const prefersReducedMotion =
    checkPrefersReducedMotion();
  const duration = prefersReducedMotion ? 0 : 0.3;

  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    // This part is mostly unchanged, except we’re
    // using the derived viewBoxWidth/viewBoxHeight,
    // rather than the VIEWBOX_SIZE constant (which
    // could get out of sync from the underlying HTML).
    animate(
      line1,
      {
        x1: INSET_X_BY,
        y1: INSET_X_BY,
        x2: viewBoxWidth - INSET_X_BY,
        y2: viewBoxHeight - INSET_X_BY,
      },
      { duration }
    );
    animate(
      line2,
      {
        x1: INSET_X_BY,
        y1: viewBoxHeight - INSET_X_BY,
        x2: viewBoxWidth - INSET_X_BY,
        y2: INSET_X_BY,
      },
      { duration }
    );
  } else {
    // When animating back to the hamburger icon,
    // we’ll use the initial values plucked from
    // the HTML, rather than making our own
    // calculations here:
    animate(line1, hamburgerData[0], { duration });
    animate(line2, hamburgerData[1], { duration });
  }
}

// Run that initialize function to grab the info
// we need from the HTML:
initialize();

button.addEventListener('click', handleClick);

function checkPrefersReducedMotion() {
  return !window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;
}
 */
