const people = [
  "Benjamin Franklin",
  "Thomas Edison",
  "Franklin Roosevelt",
  "Mahatma Gandhi",
  "Napoleon Bonaparte",
  "Abraham Lincoln",
];

const winstonAndAlbert = ["Winston Churchill", "Albert Eintein", ...people];

const darwinDisney = [...people, "Charles Darwin", "Walt Disney"];
const indexOfGandhi = people.indexOf("Mahatma Gandhi");
const copy = people.slice();
copy.splice(indexOfGandhi + 1, 0, "Pablo Picasso", "Ludwig van Beethoven");

const [first, second, ...rest] = people;

const endRemoved = people.slice(0, -2);

console.log(endRemoved);

const anotherCopy = people.slice();

anotherCopy.splice(indexOfGandhi, 1);

console.log(anotherCopy);
