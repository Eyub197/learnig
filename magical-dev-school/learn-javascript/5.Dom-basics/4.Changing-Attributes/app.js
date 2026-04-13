const p = document.querySelector(".jsP");

p.setAttribute("data-system", "linux");
const system = p.getAttribute("data-system");
console.log(system);
p.dataset.location = "Varna";
const pLocation = p.dataset.location;
console.log(pLocation);
p.removeAttribute("data-location");
