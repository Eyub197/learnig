import "./reset.css";
import "./styles.css";

const btn = document.querySelector(".particleButton");
const fragment = document.createDocumentFragment();
const starLayer = document.querySelector(".starsLayer");

btn.addEventListener("click", () => {
	for (let i = 0; i < 10; i++) {
		const star = document.createElement("div");
		star.classList.add("star");
		star.textContent = "⭐";
		star.style.left = `${Math.floor(Math.random() * 100)}%`;
		star.style.top = `${Math.floor(Math.random() * 100)}%`;

		fragment.appendChild(star);
	}

	starLayer.appendChild(fragment);
});

/*
  DOM manipulation cheatsheet:

  - Select an element:
    `document.querySelector('.someCssSelector');`
  - Create new elements:
    `document.createElement('tagName');`
  - Add a CSS class:
    `element.classList.add('className');`
  - Add the element to the DOM:
    `parentNode.appendChild(childNode);`
  - Add text to a node:
    `element.innerText = "Stuff";`
*/
