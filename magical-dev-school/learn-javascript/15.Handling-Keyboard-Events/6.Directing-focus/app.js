const buttons = document.querySelectorAll("button");
const buttonFirst = buttons[0];
const buttonSecond = buttons[1];

buttonFirst.addEventListener("click", (event) => {
  console.log("clicked");
  buttonSecond.focus();
});
