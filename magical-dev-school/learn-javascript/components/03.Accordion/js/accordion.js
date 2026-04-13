function getContentHeight(accordion) {
  const accordionInner = accordion.querySelector(".accordion__inner");
  return accordionInner.getBoundingClientRect().height;
}

function isAccordionOpen(accordion) {
  return accordion.classList.contains("is-open");
}

function closeAccordion(accordion) {
  accordion.classList.remove("is-open");
  accordion.querySelector(".accordion__content").style.height = "0";
  const accordionHeaderButton = accordion.querySelector("button");
  accordionHeaderButton.setAttribute("aria-expanded", "false");
  accordionHeaderButton.focus();
}

function openAccordion(accordion) {
  const accordionContent = accordion.querySelector(".accordion__content");
  const height = getContentHeight(accordion);
  accordion.classList.toggle("is-open");
  accordionContent.style.height = `${height}px`;
  const accordionHeaderButton = accordion.querySelector("button");
  accordionHeaderButton.setAttribute("aria-expanded", "true");
}

const accordionContainers = [
  ...document.querySelectorAll(".accordion-container"),
];

if (accordionContainers.length > 0) {
  accordionContainers.forEach((accordionContainer) => {
    accordionContainer.addEventListener("click", (event) => {
      const accordionHeader = event.target.closest(".accordion__header");
      if (!accordionHeader) return;

      const accordion = accordionHeader.parentElement;
      isAccordionOpen(accordion)
        ? closeAccordion(accordion)
        : openAccordion(accordion);
    });

    document.addEventListener("keydown", (event) => {
      const key = event.key;
      const accordion = event.target.closest(".accordion");

      if (key !== "Escape") return;
      if (!accordion) return;

      if (isAccordionOpen(accordion)) {
        closeAccordion(accordion);
      }
    });
  });
}

document.addEventListener("keydown", (event) => {
  if (!event.target.closest(".accordion__header")) return;

  const key = event.key;
  const accordions = [...document.querySelectorAll(".accordion")];
  const accordionIndex = accordions.findIndex(
    (accordion) => accordion === event.target.closest(".accordion"),
  );

  let targeetAccordoin;

  if (key === "ArrowDown") {
    targeetAccordoin = accordions[accordionIndex + 1];
  }

  if (key === "ArrowUp") {
    targeetAccordoin = accordions[accordionIndex - 1];
  }

  if (targeetAccordoin) {
    targeetAccordoin.querySelector("button").focus();
  }
});
