const header = document.querySelector(".site-header");
const navToogle = header.querySelector("[aria-controls='primary-nav']");

navToogle.addEventListener("click", () => {
	const navOpened = navToogle.getAttribute("aria-expanded");

	if (navOpened === "false") {
		navToogle.setAttribute("aria-expanded", true);
	} else {
		navToogle.setAttribute("aria-expanded", false);
	}
});

const resizeObserver = new ResizeObserver(() => {
	document.body.classList.add("resizing");

	requestAnimationFrame(() => {
		document.body.classList.remove("resizing");
	});
});

resizeObserver.observe(document.body);
