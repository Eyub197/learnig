const popoverTriggers = [...document.querySelectorAll(".popover-trigger")];

function calculatePopoverPosition(popoverTrigger, popover) {
  const popoverTriggerRect = popoverTrigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const space = 20;

  const { position } = popover.dataset;

  switch (position) {
    case "top":
      return {
        top: popoverTriggerRect.top - popoverRect.height - space,
        left:
          (popoverTriggerRect.left + popoverTriggerRect.right) / 2 -
          popoverRect.width / 2,
      };
    case "left":
      return {
        top:
          (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 -
          popoverRect.height / 2,
        left: popoverTriggerRect.left - popoverRect.width - space,
      };
    case "right":
      return {
        top:
          (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 -
          popoverRect.height / 2,
        left: popoverTriggerRect.right + space,
      };
    case "bottom":
      return {
        top: popoverTriggerRect.bottom + space,
        left:
          (popoverTriggerRect.left + popoverTriggerRect.right) / 2 -
          popoverRect.width / 2,
      };
  }
}

function generateUniqueString(length) {
  return (
    "A" +
    Math.random()
      .toString(36)
      .substring(2, 2 + length)
  );
}

function createPopover(popoverTrigger) {
  const { popoverPosition, target, content } = popoverTrigger.dataset;
  const id = generateUniqueString(5);
  const popoverDiv = document.createElement("div");
  popoverDiv.classList.add("popover");
  popoverDiv.dataset.position = popoverPosition;
  popoverDiv.id = id;
  popoverTrigger.dataset.target = id;
  const popoverContent = document.createElement("p");
  popoverContent.textContent = content;
  popoverDiv.appendChild(popoverContent);
  document.body.appendChild(popoverDiv);

  return popoverDiv;
}

function getPopover(popoverTrigger) {
  return document.querySelector(`#${popoverTrigger.dataset.target}`);
}

popoverTriggers.forEach((popoverTrigger) => {
  const popover = getPopover(popoverTrigger) || createPopover(popoverTrigger);
  const { top, left } = calculatePopoverPosition(popoverTrigger, popover);

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;

  popover.setAttribute("hidden", true);
});

document.addEventListener("click", (event) => {
  const popoverTrigger = event.target.closest(".popover-trigger");
  if (!popoverTrigger) return;

  const popover = document.querySelector(`#${popoverTrigger.dataset.target}`);

  if (popover.hasAttribute("hidden")) {
    popover.removeAttribute("hidden");
  } else {
    popover.setAttribute("hidden", true);
  }
});

document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".popover-trigger") &&
    !event.target.closest(".popover")
  ) {
    const popovers = [...document.querySelectorAll(".popover")];
    popovers.forEach((popover) => popover.setAttribute("hidden", true));
  }
});
