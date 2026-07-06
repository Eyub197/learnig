import { normalize } from "./utils";
import "./reset.css";
import "./styles.css";

const valueHorizontal = document.querySelector(".value.h");
const valueVertical = document.querySelector(".value.v");

window.addEventListener("pointermove", (event) => {
	const x = event.clientX;
	const y = event.clientY;

	const xAsPrecentage = normalize(x, 0, window.innerWidth, 0, 100);
	const yAsPrecentage = normalize(y, 0, window.innerHeight, 0, 100);

	valueHorizontal.innerText = `${Math.round(xAsPrecentage)}%`;
	valueVertical.innerText = `${Math.round(yAsPrecentage)}%`;
});
