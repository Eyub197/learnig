const button = document.querySelector(".jsModalButton");
const modalOverlay = document.querySelector(".jsModalOverlay");
const modalCloseButton = modalOverlay.querySelector(".jsModalClose");

function wave() {
  const waveTimeline = gsap.timeline();
  waveTimeline.set(".wave-hand", { transformOrigin: "bottom center" });
  waveTimeline.from(".wave-hand", {
    scale: 0.25,
    opacity: 0,
    duration: 0.5,
    ease: "back.out",
  });

  waveTimeline.to(".wave-hand", {
    rotation: 15,
    duration: 0.2,
  });

  waveTimeline.to(".wave-hand", {
    rotation: -15,
    duration: 0.2,
  });

  waveTimeline.to(".wave-hand", {
    rotation: 15,
    duration: 0.2,
  });

  waveTimeline.to(".wave-hand", {
    duration: 0.2,
    rotation: -15,
  });

  // 4. Return to the starting rotation
  waveTimeline.to(".wave-hand", {
    duration: 0.2,
    rotation: 0,
    duration: 0.2,
    ease: "power2.out",
  });
}

button.addEventListener("click", () => {
  document.body.classList.add("is-modal-open");
  wave();
});

modalCloseButton.addEventListener("click", () => {
  document.body.classList.remove("is-modal-open");
});

modalOverlay.addEventListener("click", (event) => {
  if (!event.target.closest(".modal")) {
    document.body.classList.remove("is-modal-open");
  }
});
