const starWarasList = document.querySelector("#star-wars");

const goodGyus = Array.from(
  starWarasList.querySelectorAll("[data-type='good-guy']"),
);

goodGyus.forEach((goodGuy) => goodGuy.classList.add("yay"));

const badGuys = Array.from(
  starWarasList.querySelectorAll("[data-type='villain']"),
);

badGuys.forEach((badGuy) => badGuy.classList.add("nay"));

const allCharacters = Array.from(starWarasList.querySelectorAll(".character"));
allCharacters.forEach((character) => character.classList.add("star-wars"));

console.log(allCharacters);
