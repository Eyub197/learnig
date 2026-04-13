const body = document.body;
const menuButton = document.querySelector(".toggle-menu");
const menu = document.querySelector(".nav");
const closeButton = menu.querySelector(".close-button");

/**
 * Checks if OffcanvasMenu is open
 * @returns Boolean
 */
function isOffcanvasMenuOpen() {
  return body.classList.contains("offsite-is-open");
}

/**
 * Opens OffcanvasMenu
 */
function openOffcanvasMenu() {
  body.classList.add("offsite-is-open");
  menu.focus();
  menuButton.setAttribute("aria-expanded", "true");
}

/**
 * Closes OffcanvasMenu
 */
function closeOffcanvasMenu() {
  body.classList.remove("offsite-is-open");
  menuButton.focus();
  menuButton.setAttribute("aria-expanded", "false");
}

// Opens or closes OffcanvasMenu when button is clicked
menuButton.addEventListener("click", (event) => {
  isOffcanvasMenuOpen() ? closeOffcanvasMenu() : openOffcanvasMenu();
});

// Closes OffcanvasMenu when escape key pressed
document.addEventListener("keydown", (event) => {
  if (isOffcanvasMenuOpen() && event.key === "Escape") {
    closeOffcanvasMenu();
  }
});

closeButton.addEventListener("click", closeOffcanvasMenu);

document.addEventListener("keydown", (event) => {
  const { key } = event;

  if (!event.shiftKey) return;
  if (key !== "Tab") return;

  if (event.target === menu || event.target === closeButton) {
    event.preventDefault();
    menuButton.focus();
  }
});
