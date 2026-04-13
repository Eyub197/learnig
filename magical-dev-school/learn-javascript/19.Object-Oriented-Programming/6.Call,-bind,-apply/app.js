// Bind

// function sayThis() {
//   console.log(this);
// }

// const object = {
//   property: "value",
// };

// const boundSayThis = sayThis.bind(object);

// console.log(boundSayThis);
// const button = document.querySelector("button");

// function Human(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.sayName = function () {
//     console.log(`${this.firstName} ${this.lastName}`);
//   };
// }

// const zell = new Human("Zell", "Liew");

// const sayName = zell.sayName.bind(zell);
// button.addEventListener("click", sayName);

// function sayName(firstName, lastName) {
//   console.log(`${firstName} ${lastName}`);
// }

// const sayEyub = sayName.bind(null, "Eyub");
// sayEyub("Eyub");

// function sayThis() {
//   console.log(this);
// }

// const object = { property: "value" };

// sayThis(); // Window
// sayThis.call(object); // { property: 'value' }

const nodeList = document.querySelectorAll("li");
const textArray = Array.prototype.map.call(
  nodeList,
  (elemnet) => elemnet.textContent,
);

console.log(textArray);
