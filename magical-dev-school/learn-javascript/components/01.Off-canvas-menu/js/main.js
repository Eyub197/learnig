document.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    event.target.focus();
  }
});

const button = document.querySelector("button");
const nav = document.querySelector(".nav");

function isOffCnavasMenuOpen() {
  return document.body.classList.contains("is-sidebar-active");
}

function openOffCanvasMenu() {
  document.body.classList.toggle("is-sidebar-active");
  nav.focus();
}

function closeOffCanvasMenu() {
  document.body.classList.remove("is-sidebar-active");
  button.focus();
}

button.addEventListener("click", () => {
  isOffCnavasMenuOpen() ? closeOffCanvasMenu() : openOffCanvasMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isOffCnavasMenuOpen()) {
    closeOffCanvasMenu();
  }
});
