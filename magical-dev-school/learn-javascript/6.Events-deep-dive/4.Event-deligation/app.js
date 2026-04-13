const list = document.querySelector("ul");

list.addEventListener("click", (event) => {
  if (event.target.closest("li")) {
    console.log(event.target);
  }
});
