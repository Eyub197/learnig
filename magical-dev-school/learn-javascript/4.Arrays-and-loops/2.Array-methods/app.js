const people = [
  "Benjamin Franklin",
  "Thomas Edison",
  "Franklin Roosevelt",
  "Mahatma Gandhi",
  "Napoleon Bonaparte",
  "Abraham Lincoln",
];

const indexOfMahtma = people.indexOf("Mahatma Gandhi");
console.log(indexOfMahtma);

const addingFirst = people.slice();
addingFirst.unshift("Winston Churchill", "Albert Einstein");

const addingSecond = people.slice();
addingSecond.splice(0, 0, "Winston Churchill", "Alvert Einstein");

const addThird = people.slice();
addThird.push("Charles Darwin", "Walt Disney");

const addFourth = people.slice();
addFourth.splice(addFourth.length, 0, "Charles Darwin", "Walt Disney");

const addFifth = people.slice();
addFifth.splice(indexOfMahtma + 1, 0, "Pablo Picasso", "Ludwig van Beethoven");

const removeFirst = people.slice();
removeFirst.shift();
removeFirst.shift();

const removeSecond = people.slice();
removeSecond.splice(0, 2);

const removeThird = people.slice();
removeThird.pop();
removeThird.pop();

const removeFourth = people.slice();
removeFourth.splice(removeFourth.length - 2, 2);

const removeGandhi = people.slice();
removeGandhi.splice(indexOfMahtma, 1);

console.log(removeGandhi);
