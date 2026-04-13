const defaults = {
  buttonElement: "",
  modalElement: "",
  afterOpen() {},
  type: "normal",
};

function getKeyboardFocusableElements(element) {
  return [
    ...element.querySelectorAll(
      "a, button, textarea, input, select, details, [tabindex]",
    ),
  ]
    .filter((el) => !el.hasAttribute("disabled"))
    .filter(
      (el) => !el.hasAttribute("tabindex") || el.getAttribute("tabindex") > 0,
    );
}

export default class Modal {
  constructor(settings) {
    settings = Object.assign({}, defaults, settings);
    const { type, modalElement } = settings;
    let modal;

    switch (type) {
      case "normal":
        modal = new UserTriggeredModal(settings);
        break;
      case "timed":
        modal = new TimeModal(settings);
        break;
      case "scroll":
        modal = new ScrollModal(settings);
        break;
      case "exit":
        modal = new ExitIntentModal(settings);
        break;
    }

    this.open = modal.open;
    this.close = modal.close;
    this.modalElement = modalElement;
    this.overlayElement = modalElement.parentElement;
    this.modalContent = this.modalElement.querySelector(".modal__content");
    const closeButton = modalElement.querySelector(".jsModalClose");

    closeButton.addEventListener("click", modal.close);

    this.overlayElement.addEventListener("click", (event) => {
      if (!event.target.closest(".modal")) {
        this.close();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (modal.isOpen && event.key === "Escape") {
        this.close();
      }
    });
  }
}

class BaseModal {
  constructor(settings) {
    const { buttonElement, modalElement, afterOpen } = settings;

    this.overlayElement = modalElement.parentElement;
    this.modalElement = modalElement;
    this.buttonElement = buttonElement;
    this.afterOpen = afterOpen;
    this.modalContent = this.modalElement.querySelector(".modal__content");
    this.open = this.open;
    this.close = this.close;
    this.trapFocus = this.trapFocus;
  }

  get siblingElements() {
    return [...this.overlayElement.parentElement.children].filter(
      (element) => element !== this.overlayElement,
    );
  }

  get isOpen() {
    return this.overlayElement.classList.contains("is-open");
  }

  showSiblingElements() {
    this.siblingElements.forEach((element) =>
      element.removeAttribute("hidden"),
    );
  }

  hideSiblingElements() {
    this.siblingElements.forEach((element) =>
      element.setAttribute("hidden", "true"),
    );
  }

  trapFocus = (event) => {
    const focusables = getKeyboardFocusableElements(this.modalElement);
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (
      document.activeElement === lastFocusable &&
      event.key === "Tab" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      firstFocusable.focus();
    }

    if (
      document.activeElement === firstFocusable &&
      event.key === "Tab" &&
      event.shiftKey
    ) {
      event.preventDefault();
      lastFocusable.focus();
    }
  };

  open = () => {
    this.overlayElement.classList.add("is-open");
    if (this.afterOpen) this.afterOpen();

    const focusableElements = getKeyboardFocusableElements(this.modalContent);
    if (focusableElements[0]) focusableElements[0].focus();

    document.addEventListener("keydown", this.trapFocus);

    this.hideSiblingElements();
  };

  close = () => {
    this.overlayElement.classList.remove("is-open");
    document.removeEventListener("keydown", this.trapFocus);
    this.showSiblingElements();
  };
}

class UserTriggeredModal extends BaseModal {
  constructor(settings) {
    super(settings);

    const parentClose = this.close;
    const parentOpen = this.open;

    this.close = () => {
      parentClose();
      this.buttonElement.focus();
      this.buttonElement.setAttribute("aria-expanded", "false");
    };

    this.open = () => {
      parentOpen();
      this.buttonElement.setAttribute("aria-expanded", "true");
    };

    this.buttonElement.addEventListener("click", this.open);
  }
}

class TimeModal extends BaseModal {
  constructor(settings) {
    super(settings);
    setTimeout(() => {
      this.open();
    }, settings.delayBeforeOpening);
  }
}

class ScrollModal extends BaseModal {
  constructor(settings) {
    super(settings);

    const { triggerElement, modalElement } = settings;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.open();
          this.observer.unobserve(triggerElement);
        }
      });
    });
    this.observer.observe(triggerElement);
  }
}

class ExitIntentModal extends BaseModal {
  lastScrollTop = 0;
  constructor(settings) {
    super(settings);

    document.addEventListener(
      "mouseleave",
      (event) => {
        if (event.clientY < 0) {
          this.open();
        }
      },
      { once: true },
    );

    // mobile scroll
    // const scrollContainer = document.querySelector("main");
    // scrollContainer.addEventListener(
    //   "scroll",
    //   (event) => {
    //     const currentScroll = event.target.scrollTop;

    //     if (
    //       currentScroll < this.lastScrollTop &&
    //       this.lastScrollTop - currentScroll > 30
    //     ) {
    //       this.open();
    //     }

    //     this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    //   },
    //   { passive: true },
    // );
  }
}
