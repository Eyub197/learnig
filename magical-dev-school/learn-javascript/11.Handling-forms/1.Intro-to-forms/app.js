const form = document.querySelector("form");

form.addEventListener("submit", (evnet) => {
  evnet.preventDefault();
  console.log("submited");
});
