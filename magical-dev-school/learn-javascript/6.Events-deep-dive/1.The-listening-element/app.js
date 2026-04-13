const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  console.log("with event");
  console.log(event.currentTarget);
});

button.addEventListener("click", function () {
  console.log("with this");
  console.log(this);
});
