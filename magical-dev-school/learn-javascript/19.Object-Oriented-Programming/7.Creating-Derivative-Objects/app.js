// class Human {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
// }

// class Developer extends Human {
//   constructor(firstName, lastName) {
//     super(firstName, lastName);
//   }
//   code(thing) {
//     console.log(`${this.role} coded ${thing}`);
//   }
//   role = "Founder";
// }

// function Human(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
// }

// Human.prototype.sayName = function () {
//   console.log(`My name is ${this.firstName} ${this.lastName}`);
// };

// function Developer(firstName, lastName) {
//   Human.call(this, firstName, lastName);
// }

// Developer.prototype = Object.create(Human.prototype);
// Developer.prototype.constructor = Developer;

// Developer.prototype.code = function (thing) {
//   console.log(`${this.firstName} coded ${thing}`);
// };

// const eyub = new Developer("Eyub", "Eyub");
// eyub.code("app");

// const Human = {
//   init(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     return this;
//   },
// };

// const eyub = Object.create(Human).init("Eyub", "Eyub");

// Object.assign(eyub, {
//   code() {
//     console.log("Eyub coded this");
//   },
// });

// eyub.code();

function Human(firstName, lastName) {
  return {
    firstName,
    lastName,
  };
}

function Developer(firstName, lastName) {
  const developer = Human(firstName, lastName);

  return Object.assign(developer, {
    code() {
      console.log("Eyub coded this");
    },
  });
}

const eyub = Developer("Eyub", "Eyub");
eyub.code();
