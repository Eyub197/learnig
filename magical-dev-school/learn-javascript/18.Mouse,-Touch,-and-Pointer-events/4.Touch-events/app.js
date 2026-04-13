document.addEventListener("touchmove", (event) => {
  console.log("moving");
});

document.addEventListener("touchstart", (event) => {
  console.log("Starting to Touch myself");
});

document.addEventListener("touchend", (event) => {
  console.log("Stoping to Touch myself");
});
