const button = document.querySelector("button");

button.addEventListener("click", () => {
  button.style.setProperty("color", "red");
  button.style.backgroundColor = "blue";
  button.style.width = "200px";
  button.style.height = "300px";
});
