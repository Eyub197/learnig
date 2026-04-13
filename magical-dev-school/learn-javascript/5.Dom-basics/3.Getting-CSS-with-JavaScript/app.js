const div = document.querySelector(".jsDiv");

const color = div.style.color;
const backgroundColor = div.style.backgroundColor;
const fontSize = div.style.fontSize;

console.log(color);
console.log(backgroundColor);
console.log(fontSize);

const computedStyles = getComputedStyle(div);
console.log(
  computedStyles.color,
  computedStyles.backgroundColor,
  computedStyles.fontSize,
);
