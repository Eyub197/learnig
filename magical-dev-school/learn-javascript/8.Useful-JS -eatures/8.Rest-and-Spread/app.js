function logger(...numbers) {
  numbers.forEach((number) => console.log(number));
}

const person = {
  name: "Melih",
  gender: "I don't want to say",
  city: "Varna",
  age: 67,
};

const melihSrank = {
  playsVideoGames: false,
  ...person,
};

const numbers = [1, 2, 3, 4, 5];
const numbersTwo = 6;

const allNumbers = [...numbers, numbersTwo];

console.log(allNumbers);
logger(...allNumbers);

const [numberOne, ...otherNumbers] = allNumbers;
console.log(otherNumbers);

const { name, ...other } = person;

console.log(melihSrank);
