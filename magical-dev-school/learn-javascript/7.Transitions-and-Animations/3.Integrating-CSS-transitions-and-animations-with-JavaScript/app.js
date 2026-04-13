const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const box5 = document.querySelector(".box5");
const box6 = document.querySelector(".box6");

box1.addEventListener("transitionend", (event) => {
  console.log(event.propertyName);
  console.log("over");
  box1.parentElement.removeChild(box1);
});

box2.addEventListener("transitionend", (event) => {
  console.log("this is box2");
  console.log(event.propertyName);
  box2.parentElement.removeChild(box2);
});

box3.addEventListener("transitionend", (event) => {
  console.log("this is box3");
  console.log(event.propertyName);
  box3.parentElement.removeChild(box3);
});

box4.addEventListener("animationend", (event) => {
  console.log("this is box4");
  console.log(event.animationName);
  box4.parentElement.removeChild(box4);
});

box5.addEventListener("animationend", (event) => {
  console.log("this is box5");
  console.log(event.animationName);
  box5.parentElement.removeChild(box5);
});

box6.addEventListener("animationend", (event) => {
  console.log("this is box6");
  console.log(event.animationName);
  box6.parentElement.removeChild(box6);
});
