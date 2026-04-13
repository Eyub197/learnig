const popovers = [];

export default function Popover(triggerElement) {
  const popoverElement = getPopover() || createPopover();

  function getPopover() {
    return document.querySelector(`#${triggerElement.dataset.target}`);
  }

  function createPopover(popoverTrigger) {
    const popover = document.createElement("div");
    popover.classList.add("popover");
    popover.dataset.position = triggerElement.dataset.popoverPosition;

    const id = generateUniqueString(5);

    popover.id = id;
    triggerElement.dataset.target = id;

    const p = document.createElement("p");
    p.textContent = triggerElement.dataset.content;

    popover.appendChild(p);
    document.body.appendChild(popover);
    return popover;
  }

  const popover = {
    hide() {
      popoverElement.setAttribute("hidden", true);
    },

    show() {
      popoverElement.removeAttribute("hidden");
    },

    calculatePosition() {
      const popoverTriggerRect = triggerElement.getBoundingClientRect();
      const popoverRect = popoverElement.getBoundingClientRect();
      const { position } = popoverElement.dataset;
      const space = 20;
      if (position === "top") {
        return {
          left:
            (popoverTriggerRect.left + popoverTriggerRect.right) / 2 -
            popoverRect.width / 2,
          top: popoverTriggerRect.top - popoverRect.height - space,
        };
      }
      if (position === "left") {
        return {
          left: popoverTriggerRect.left - popoverRect.width - space,
          top:
            (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 -
            popoverRect.height / 2,
        };
      }
      if (position === "right") {
        return {
          left: popoverTriggerRect.right + space,
          top:
            (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 -
            popoverRect.height / 2,
        };
      }
      if (position === "bottom") {
        return {
          left:
            (popoverTriggerRect.left + popoverTriggerRect.right) / 2 -
            popoverRect.width / 2,
          top: popoverTriggerRect.bottom + space,
        };
      }
    },

    handleClick() {
      popoverElement.hasAttribute("hidden") ? popover.show() : popover.hide();
    },

    handleTriggerTab(event) {
      const { key } = event;

      if (key !== "Tab") return;
      if (event.shiftKey) return;

      const focusables = getAllFocusableElements(popoverElement);

      if (popoverElement.hasAttribute("hidden")) return;
      if (focusables.length === 0) return;

      event.preventDefault();
      focusables[0].focus();
    },

    handlePopoverTab(event) {
      const { key } = event;

      if (key !== "Tab") return;
      const focusables = getAllFocusableElements(popover);

      if (focusables[0] === document.activeElement && event.shiftKey) {
        event.preventDefault();
        popoverTrigger.focus();
      }
      if (focusables[focusables.length - 1] === document.activeElement) {
        event.preventDefault();
        popoverTrigger.nextElementSibling.focus();
      }
    },
    handleEscapeKey(event) {
      const { key } = event;
      if (key !== "Escape") return;

      popover.hide();
      triggerElement.focus();
    },
  };

  const popoverPostion = popover.calculatePosition();
  popoverElement.style.top = `${popoverPostion.top}px`;
  popoverElement.style.left = `${popoverPostion.left}px`;
  popover.hide();

  popovers.push(popover);

  triggerElement.addEventListener("click", popover.handleClick);
  document.addEventListener("keydown", popover.handleTriggerTab);
  document.addEventListener("keydown", popover.handlePopoverTab);
  popoverElement.addEventListener("keydown", popover.handleEscapeKey);
  document.addEventListener("click", closeAllPopovers);
}

function generateUniqueString(length) {
  return (
    "A" +
    Math.random()
      .toString(36)
      .substring(2, 2 + length)
  );
}

function getAllFocusableElements(element) {
  return [
    ...element.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]',
    ),
  ];
}

function closeAllPopovers(event) {
  if (
    !event.target.closest(".popover") &&
    !event.target.closest(".popover-trigger")
  ) {
    popovers.forEach((popover) => popover.hide());
  }
}
