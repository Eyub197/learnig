const characters = document.querySelector(".characters");
const hobbits = characters.querySelector(".hobbits");
const elves = hobbits.nextElementSibling;
const humans = elves.nextElementSibling;

const newHobbit = document.createElement("li");
newHobbit.textContent = "Bilbo Baggins";
hobbits.appendChild(newHobbit);

const newElf = document.createElement("li");
newElf.textContent = "Legolas";
elves.insertBefore(newElf, elves.children[0]);

const newHuman = document.createElement("li");
newHuman.textContent = "Aragorn";
humans.insertBefore(newHuman, humans.children[2]);
