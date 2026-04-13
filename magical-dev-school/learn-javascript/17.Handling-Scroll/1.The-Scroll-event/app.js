// document.addEventListener("scroll", () => {
//   console.log(window.scrollY);
// });

// const element = document.querySelector(".scrollable");
// element.addEventListener("scroll", (event) => {
//   console.log(element.scrollTop);
// });

const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  window.scroll({
    top: 500,
    behavior: "smooth",
  });
});
