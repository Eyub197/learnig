// constructur functions

// function Human(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;

//   this.sayName = function () {
//     console.log(`first name ${this.firstName} last name ${this.lastName}`);
//   };
// }

// const melih = new Human("Melih", "Eyub");

// class Human{
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
// // }

// function Human(firstName, lastName) {
//   return {
//     firstName,
//     lastName,
//   };
// }

// const eyub = Human("Eyub", "Eyub");

const Human = {
  init(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    return this;
  },
};

const eyub = Object.create(Human).init("Eyub", "Eyub");

console.log(eyub);
