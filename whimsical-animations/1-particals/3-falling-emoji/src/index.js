import { random, range, sample } from "lodash";
import "./reset.css";
import "./styles.css";

const emojiWrapper = document.querySelector(".emojiWrapper");
const emojiesArray = ["🎉", "👍", "☕", "🎊", "💸"];

window.setInterval(() => {
	const emojiEl = document.createElement("div");
	const emoji = sample(emojiesArray);
	const animationDuration = `${Math.random() * 2 + 1}`;

	emojiEl.classList.add("emoji");
	emojiEl.setAttribute("aria-hidden", true);
	emojiEl.textContent = emoji;
	emojiEl.style.animationDuration = `${animationDuration}s`;
	emojiEl.style.left = `${Math.random() * 100}%`;
	emojiWrapper.appendChild(emojiEl);

	window.setTimeout(
		() => {
			emojiEl.remove();
		},
		animationDuration * 1000 + 200,
	);
}, 200);
