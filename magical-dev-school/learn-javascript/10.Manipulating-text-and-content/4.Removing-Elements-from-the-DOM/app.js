const humans = document.querySelector(".humans");
const aragorn = humans.children[2];
const removedAragorn = humans.removeChild(aragorn);
humans.appendChild(aragorn);
