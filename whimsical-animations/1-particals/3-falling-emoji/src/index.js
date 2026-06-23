import { random, range, sample } from "lodash";
import "./reset.css";
import "./styles.css";

const emojiWrapper = document.querySelector(".emojiWrapper");
const emojiesArray = ["🎉", "👍", "☕", "🎊", "💸"];

emojiesArray.forEach((emoji) => {
	const emojiEl = document.createElement("div");
	emojiEl.classList.add("emoji");
	emojiEl.setAttribute("aria-hidden", true);
	emojiEl.textContent = emoji;
	emojiEl.style.animationDuration = `${Math.random() * 2 + 1}s`;
	emojiWrapper.appendChild(emojiEl);
});
