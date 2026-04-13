const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("clicked");
  button.classList.toggle("is-clicked");
});
