const button = document.querySelector("button");

// function clicker() {
//   console.log("clicked");
// }

function removeAfter5times(event) {
  const button = event.currentTarget;
  const prevCount = parseInt(button.dataset.count) || 0;
  const currentCount = prevCount + 1;

  button.dataset.count = currentCount;

  console.log("clicked: ", currentCount);

  if (currentCount === 5) {
    button.removeEventListener("click", removeAfter5times);
  }
}

button.addEventListener("click", removeAfter5times);

// we have a counter
// it grows with 1
// we save it every time
//
//
//
// sudo code () {
// counter
// counter = 1
// we save that 1
// then that one we save to the dataset
// then that dataset we increment it by 1 on every other click
//}
