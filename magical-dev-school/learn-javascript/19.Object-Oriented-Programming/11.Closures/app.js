// function ouside(message) {
//   return (aditionalMessage) => {
//     console.log(`${message}${aditionalMessage}`);
//   };
// }

// const inside = ouside("I like touching myself");
// inside("While watching top and jerry");

// function Human(firstName, lastName) {
//   return {
//     firstName,
//     lastName,
//     sayFirstName() {
//       console.log(firstName);
//     },
//   };
// }

// const eyub = Human("Eyub", "Eyub");
// eyub.sayFirstName();
// console.log(eyub.lastName);

const listItems = document.querySelectorAll("li");

for (const listItem of listItems) {
  const textContent = listItem.textContent;
  listItem.addEventListener("click", (event) => {
    console.log(textContent);
  });
}

function sayName(fistName, lastName) {
  console.log(`${fistName} ${lastName}`);
}

const sayEyubName = sayName.bind(null, "Eyub");
sayEyubName("Eyub");
