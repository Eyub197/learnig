import { normalize, clamp } from "./utils";
import "./reset.css";
import "./styles.css";

const slider = document.querySelector("#slider");
const box = document.querySelector(".box");

/*
  The requirements:

  • “skew” should range from 25° to 0°
  • “rotate” should range from 225° to -45°
  • “radius” should range from 50% to 5%
  • “scaleY” should grow from 0.01 to 1 over the
    *first half* of the range. When “value” is
    50+, scale should stay at 1.
  • “boxHue” should stay at 0° for the first half
    of the range, and then scale from 0° to 45°
    over the *second half* of the range.
  • “bgLightness” should stay at 6% for the first 75%
    of the range, and then scale from 6% to 26%
    over the final 25% of the range.
*/

// the slider is in the middle 50%, so its 0. how can I make it stay at 0. I sohuld force it ot be in that range

function transformBox(value) {
	// TODO: use `normalize` to derive these parameters.
	// `value` is a number between 0 and 100.
	const skew = normalize(value, 0, 100, 25, 0);
	const rotate = normalize(value, 0, 100, 255, -45);
	const radius = normalize(value, 0, 100, 50, 5);
	const scaleY = clamp(normalize(value, 0, 50, 0.01, 1), 0.01, 1);
	const boxHue = clamp(normalize(value, 50, 100, 0, 45), 0, 45);
	const bgLightness = clamp(normalize(value, 75, 100, 6, 26), 6, 26);

	// No changes necessary below this point.
	box.style.transform = `
    scaleY(${scaleY})
    rotate(${rotate}deg)
    skewX(${skew}deg)
  `;
	box.style.borderRadius = radius + "%";
	box.style.backgroundColor = `hsl(${boxHue}deg 100% 60%)`;

	document.documentElement.style.backgroundColor = `hsl(210deg 15% ${bgLightness}%)`;
}

slider.addEventListener("input", (event) => {
	const value = Number(event.target.value);

	transformBox(value);
});

// Initialize the box based on an initial value of 0:
transformBox(0);
