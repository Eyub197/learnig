const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  console.log("clicked");
});

button.addEventListener("keydown", (event) => {
  console.log(event.key);
});
