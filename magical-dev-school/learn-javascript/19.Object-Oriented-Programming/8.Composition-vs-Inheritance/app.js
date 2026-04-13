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
// }

// class Designer extends Human {
//   constructor(firstName, lastName) {
//     super(firstName, lastName);
//   }
// }

// class Unicorn extends Human {
//   constructor(firstName, lastName) {
//     super(firstName, lastName);
//   }
// }
// class Robot {
//   tired = "Never";
//   constructor(firstName) {
//     this.firstName = firstName;
//   }
// }

const canCode = {
  code(thing) {
    console.log(`He can do this ${thing} `);
  },
};

const canDesign = {
  design(thing) {
    console.log(`He can do design ${thing} `);
  },
};

// Object.assign(Developer.prototype, canCode);
// Object.assign(Designer.prototype, canDesign);
// Object.assign(Unicorn.prototype, canCode, canDesign);

// const futureEyub = new Unicorn("Eyub", "Eyub");

// futureEyub.design("Web app");
// futureEyub.code("App");

// const robot = new Robot("Ai agent");
// Object.assign(Robot.prototype, canCode, canDesign);
// robot.code("App");
// robot.design("design");

// const Human = {
//   init(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     return this;
//   },
// };

// const Developer = Object.create(Human);
// const eyub = Object.create(Developer).init("Eyub", "Eyub");
// Object.assign(Developer, canCode);

// eyub.code("Startup");

function Human(firstName, lastName) {
  return {
    firstName,
    lastName,
  };
}

function Developer(firstName, lastName) {
  const developer = Human(firstName, lastName);
  return Object.assign(developer, canCode);
}

const eyub = Developer("Eyub", "Eyub");
eyub.code("app");
