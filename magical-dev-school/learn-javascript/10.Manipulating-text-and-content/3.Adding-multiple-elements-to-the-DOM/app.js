const characters = document.querySelector(".characters");
const humans = document.createElement("ul");
humans.classList.add("humans");

// humans.innerHTML = `
//   <li>Gandalf</li>
//   <li>Saruman</li>
//   <li>Aragon</li>
//   <li>Bormir</li>
//   <li>Faramir</li>
//   `;

// characters.appendChild(humans);

const humansToAdd = ["Gandalf", "Saruman", "Aragorn", "Boromir", "Faramir"];
const humansFragement = document.createDocumentFragment();

humansToAdd.forEach((human) => {
  const humanItem = document.createElement("li");
  humanItem.textContent = human;
  humansFragement.appendChild(humanItem);
});

humans.appendChild(humansFragement);
characters.appendChild(humans);

const elves = characters.querySelector(".elves");
const elvesToAdd = ["Glorfindel", "Elrond"];

const elvesFragment = document.createDocumentFragment();

elvesToAdd.forEach((elv) => {
  const elvItem = document.createElement("li");
  elvItem.textContent = elv;
  elvesFragment.appendChild(elvItem);
});

elves.insertBefore(elvesFragment, elves.lastElementChild);
