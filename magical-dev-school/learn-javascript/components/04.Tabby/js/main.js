// The css is the harder part
//
// Whenever is selcted we have an White border bottom with an negative margin to offseet the border from the content
// we will need to select every header thing. add event listeners to them and then on click remove the is-selected class from the previous clicked and then ad dit to the now O

import Taby from "./tabby.js";

const tabbies = [...document.querySelectorAll(".tabby")];

document.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    event.target.focus();
  }
});

tabbies.forEach((tabby) => {
  if (tabbies.length > 0) {
    new Taby(tabby);
  }
});
