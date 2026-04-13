const people = [
  { firstName: "Benjamin", lastName: "Franklin", yearOfDeath: 1790 },
  { firstName: "Thomas", lastName: "Edison", yearOfDeath: 1931 },
  { firstName: "Franklin", lastName: "Roosevelt", yearOfDeath: 1945 },
  { firstName: "Napolean", lastName: "Bonaparte", yearOfDeath: 1821 },
  { firstName: "Abraham", lastName: "Lincoln", yearOfDeath: 1865 },
  { firstName: "Mother", lastName: "Theresa", yearOfDeath: 1962 },
  { firstName: "Mahatma", lastName: "Gandhi", yearOfDeath: 1948 },
  { firstName: "Winston", lastName: "Churchill", yearOfDeath: 1965 },
  { firstName: "Charles", lastName: "Darwin", yearOfDeath: 1882 },
  { firstName: "Albert", lastName: "Einstein", yearOfDeath: 1955 },
  { firstName: "Pablo", lastName: "Picasso", yearOfDeath: 1973 },
  { firstName: "Ludwig", lastName: "Beethoven", yearOfDeath: 1827 },
  { firstName: "Walt", lastName: "Disney", yearOfDeath: 1966 },
  { firstName: "Henry", lastName: "Ford", yearOfDeath: 1947 },
  { firstName: "Steve", lastName: "Jobs", yearOfDeath: 2012 },
];

people.forEach((person) => console.log(person.firstName));

const onlyFirstNames = [];
people.forEach((person) => onlyFirstNames.push(person.firstName));

const diedAfter1950 = [];
people.forEach((person) => {
  if (person.yearOfDeath > 1950) {
    diedAfter1950.push(person);
  }
});

console.log(diedAfter1950);

let charelsDarvinIndex = 0;

people.forEach((person, index) => {
  if (person.firstName === "Charles" && person.lastName === "Darwin")
    charelsDarvinIndex = index;
});

console.log(charelsDarvinIndex);
