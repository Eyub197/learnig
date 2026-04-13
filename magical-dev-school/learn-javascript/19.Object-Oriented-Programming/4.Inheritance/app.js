// constructur functions

// ===copy paste inheritence===

// function Human(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;

//   this.sayName = function () {
//     console.log(`first name ${this.firstName} last name ${this.lastName}`);
//   };
// }

//=== prototype inheritence===

// function Human(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;

//   this.sayName = function () {};
// }

// Human.prototype.sayName = function () {
//   console.log(`first name ${this.firstName} last name ${this.lastName}`);
// };

// const melih = new Human("Melih", "Eyub");

// === copy paste inhertance

// class Human {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.sayName = function () {
//       console.log(firstName, lastName);
//     };
//   }
// }

// === prototype inheritence

// class Human {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }

//   sayName() {
//     console.log(firstName, lastName);
//   }
// }
// const eyub = new Human("Eyub", "Eyu");
// }

// const eyub = Human("Eyub", "Eyub");

// OLOO
// copy-paste inheritance

// const Human = {
//   init(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.sayName = function () {
//       console.log(firstName, lastName);
//     };
//     return this;
//   },
// };

// === delegation inheritance

const Human = {
  init(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    return this;
  },
  sayName() {
    console.log(firstName, lastName);
  },
};

const eyub = Object.create(Human).init("Eyub", "Eyub");
console.log(eyub);

// Factory functions
// Normally dont really use them with factory functions the prototypepel  inheritance
