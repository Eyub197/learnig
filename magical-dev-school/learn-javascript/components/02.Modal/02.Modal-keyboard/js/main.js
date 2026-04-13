/* global TimelineMax Back */
const modalButton = document.querySelector(".jsModalButton");
const modalCloseButton = document.querySelector(".jsModalClose");
const modalOverlay = document.querySelector(".modal-overlay");
const wavingHand = document.querySelector(".wave-hand");
const modal = document.querySelector(".modal");
const main = document.querySelector("main");
function wave(hand) {
  const tl = new TimelineMax({});
  // Sets transform origin
  tl.set(hand, { transformOrigin: "bottom center" });
  tl.from(hand, 0.5, {
    scale: 0.25,
    opacity: 0,
    ease: Back.easeOut.config(1.5),
  });
  tl.to(hand, 0.2, { rotation: 15 });
  tl.to(hand, 0.2, { rotation: -15 });
  tl.to(hand, 0.2, { rotation: 15 });
  tl.to(hand, 0.2, { rotation: -15 });
  tl.to(hand, 0.2, { rotation: 0 });
}

function trapFocus(event) {
  const focusables = [...modal.querySelectorAll("input, button")];
  const firstFocusable = focusables[0];
  const lastFocusable = focusables[focusables.length - 1];
  if (
    document.activeElement === firstFocusable &&
    event.key === "Tab" &&
    event.shiftKey
  ) {
    event.preventDefault();
    lastFocusable.focus();
  }

  if (
    document.activeElement === lastFocusable &&
    event.key === "Tab" &&
    !event.shiftKey
  ) {
    event.preventDefault();
    firstFocusable.focus();
  }
}

function openModal() {
  modalOverlay.classList.add("is-open");
  wave(wavingHand);
  const firstInput = modal.querySelector("input");
  firstInput.focus();

  document.addEventListener("keydown", trapFocus);
  modalButton.setAttribute("aria-expanded", "true");
  main.setAttribute("aria-hidden", "true");
}

function closeModal() {
  modalOverlay.classList.remove("is-open");
  modalButton.focus();
  document.removeEventListener("keydown", trapFocus);
  modalButton.setAttribute("aria-expanded", "false");
  main.setAttribute("aria-hidden", "false");
}

modalButton.addEventListener("click", openModal);

modalCloseButton.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (event) => {
  if (!event.target.closest(".modal")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
