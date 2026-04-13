import "./modal.js";
import Modal from "./modal.js";
import "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js";
const wavingHand = document.querySelector(".wave-hand");
const timedModalButton = document.querySelector("#timed-modal-button");

function wave() {
  const tl = new TimelineMax({});
  // Sets transform origin
  tl.set(wavingHand, { transformOrigin: "bottom center" });
  tl.from(wavingHand, 0.5, {
    scale: 0.25,
    opacity: 0,
    ease: Back.easeOut.config(1.5),
  });
  tl.to(wavingHand, 0.2, { rotation: 15 });
  tl.to(wavingHand, 0.2, { rotation: -15 });
  tl.to(wavingHand, 0.2, { rotation: 15 });
  tl.to(wavingHand, 0.2, { rotation: -15 });
  tl.to(wavingHand, 0.2, { rotation: 0 });
}

const modal = new Modal({
  modalElement: document.querySelector("#user-triggered-modal"),
  buttonElement: document.querySelector("#user-triggered-modal-button"),
  afterOpen: wave,
  type: "normal",
});

console.log(modal);

timedModalButton.addEventListener("click", (event) => {
  new Modal({
    type: "timed",
    delayBeforeOpening: 1000,
    modalElement: document.querySelector("#timed-modal"),
  });
});

new Modal({
  modalElement: document.querySelector("#scroll-modal"),
  triggerElement: document.querySelector("#scroll-trigger"),
  type: "scroll",
});

new Modal({
  modalElement: document.querySelector("#exit-modal"),
  type: "exit",
});
