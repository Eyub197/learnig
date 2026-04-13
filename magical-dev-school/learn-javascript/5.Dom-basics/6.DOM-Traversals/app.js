const characters = document.querySelector(".characters");
const humans = characters.querySelector(".humans");
const allHumans = humans.children;
const hobits = characters.children[0];
const merry = hobits.children[2];
const elves = merry.closest(".characters").children[2];
const glorfindel = elves.children[1];
const elrond = glorfindel.nextElementSibling;
const legolas = glorfindel.previousElementSibling;
const charactersTwo =
  characters.lastElementChild.lastElementChild.closest(".characters");
console.log(charactersTwo);
