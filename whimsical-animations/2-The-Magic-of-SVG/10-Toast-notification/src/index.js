import "./reset.css";
import "./styles.css";

const toast = document.querySelector(".toast");
const toggleBtn = document.querySelector(".toggle-toast");
const dismissBtn = document.querySelector(".dismiss-toast");

let isToastVisible = false;

function handleToggleToast(newValue) {
	isToastVisible = typeof newValue === "boolean" ? newValue : !isToastVisible;

	if (isToastVisible) {
		toast.classList.remove("hidden");
		toast.removeAttribute("aria-hidden");
		toast.removeAttribute("inert");
	} else {
		toast.classList.add("hidden");
		toast.setAttribute("aria-hidden", true);
		toast.setAttribute("inert", true);
	}
}

toggleBtn.addEventListener("click", () => handleToggleToast());
dismissBtn.addEventListener("click", () => handleToggleToast(false));
