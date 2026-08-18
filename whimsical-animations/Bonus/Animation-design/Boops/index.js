const btn = document.querySelector(".btn");
const booped = document.querySelector(".boop-target");

btn.addEventListener("mouseenter", () => {
	booped.classList.add("is-booped");

	window.setTimeout(() => {
		booped.classList.remove("is-booped");
	}, 150);
});
