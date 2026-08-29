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

function removeDialog(viewTransitionNmae) {
	const dialog = document.querySelector(".dialog");
	dialog.style.viewTransitionName = viewTransitionNmae;
	if (document.startViewTransition()) {
		document.startViewTransition(() => {
			dialog.remove();
		});
	} else {
		dialog.remove();
	}
}

window.dialogCancel = function dismiss(elem) {
	removeDialog("dialogCancel");
};

window.dialogConfirm = function confirm(elem) {
	removeDialog("dialogConfirm");
};

toggleBtn.addEventListener("click", () => {
	const dialog = document.querySelector(".dialog");

	if (dialog) {
		dialogCancel();
	} else {
		generate();
	}
});
