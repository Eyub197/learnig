const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  history.replaceState({ value: "first page" }, "", "/hello");
  history.replaceState({ value: "second page" }, "", "/second page");
});

window.addEventListener("popstate", (event) => {
  console.log(event.state);
});
