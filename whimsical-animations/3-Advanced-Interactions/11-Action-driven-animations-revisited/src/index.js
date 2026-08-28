import "./reset.css";
import "./styles.css";

const toggleBtn = document.querySelector(".toggle-btn");

function generate() {
	document.body.insertAdjacentHTML(
		"beforeend",
		`
      <div class="dialog">
        <button class="cancel" onclick="dialogCancel()">
          Cancel
        </button>
        <button class="confirm" onclick="dialogConfirm()">
          Confirm
        </button>
      </div>
    `,
	);
}

window.dialogCancel = function dismiss(elem) {
	document.startViewTransition(() => {
		const dialog = document.querySelector(".dialog");
		dialog.remove();
	});
};

window.dialogConfirm = function confirm(elem) {
	document.startViewTransition(() => {
		const dialog = document.querySelector(".dialog");
		dialog.remove();
	});
};

toggleBtn.addEventListener("click", () => {
	const dialog = document.querySelector(".dialog");

	if (dialog) {
		dialogCancel();
	} else {
		generate();
	}
});
