import "./reset.css";
import "./styles.css";
import { TOASTS } from "./data";

const wrapper = document.querySelector(".wrapper");

function checkPrefersReducedMotion() {
	return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}
// This function generates the initial set of notifications:
function generate() {
	TOASTS.forEach(({ id, content }) => {
		wrapper.insertAdjacentHTML(
			"beforeend",
			`
        <div class="notification" style="view-transition-name: notification-${id}">
          ${content}
          <button onclick="dismiss(this)">
            <svg viewBox="0 0 24 24">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
            <span class="visually-hidden">
              Delete notification
            </span>
          </button>
        </div>
      `,
		);
	});
}

// This function is called when one of the “dismiss”
// buttons is clicked. It removes the clicked notification:

window.dismiss = function dismiss(elem) {
	const notification = elem.parentNode;

	if (document.startViewTransition && !checkPrefersReducedMotion()) {
		document.startViewTransition(() => {
			notification.remove();
		});
	} else {
		notification.remove();
	}
};

generate();
