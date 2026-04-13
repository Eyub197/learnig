const link = document.querySelector("a");
const checkbox = document.querySelector("input");

link.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    console.log(event.eventPhase);
    console.log("in capturing state");
  },
  true,
);

checkbox.addEventListener("click", (event) => {
  console.log(event.eventPhase);
  console.log("Bubbling");
});
