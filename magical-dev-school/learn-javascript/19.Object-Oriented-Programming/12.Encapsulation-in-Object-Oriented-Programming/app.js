// function Car() {
//   let fuel = 50;
//   return {
//     getFuel() {
//       return fuel;
//     },
//     addFuel(amount) {
//       fuel = fuel + amount;
//       if (fuel > 100) {
//         console.log(`Maximum limit of fule reached 100 plase enter less`);
//         fuel = 100;
//       }
//     },
//   };
// }

// const opelCorsa = Car();
// opelCorsa.addFuel(51);
// console.log(opelCorsa.getFuel());

// function Car() {
//   let fuel = 50;
//   this.getFuel = function () {
//     return fuel;
//   };

//   this.addFuel = function () {
//     fuel = fuel + amount;
//     if (fuel > 100) {
//       console.log(`Maximum limit of fule reached 100 plase enter less`);
//       fuel = 100;
//     }
//   };
// }

// const car = new Car();

// class Car {
//   constructor() {
//     let fuel = 50;
//     this.getFuel = function () {
//       return fuel;
//     };

//     this.addFuel = function () {
//       fuel = fuel + amount;
//       if (fuel > 100) {
//         console.log(`Maximum limit of fule reached 100 plase enter less`);
//         fuel = 100;
//       }
//     };
//   }
// }

// const Car = {
//   init() {
//     let fuel = 50;
//     this.getFuel = function () {
//       return fuel;
//     };

//     this.addFuel = function () {
//       fuel = fuel + amount;
//       if (fuel > 100) {
//         console.log(`Maximum limit of fule reached 100 plase enter less`);
//         fuel = 100;
//       }
//     };
//     return this;
//   },
// };

// const car = Object.create(Car).init();
// console.log(car.getFuel());

class Car {
  #fuel = 50;
  constructor(fuel) {
    // Prefixed fuel with an underscore
    // PRIVEATE BY CONVECTOIN
    //   this._fuel = 50;
    this.#fuel = fuel;
    this.getFuel = function () {
      return this.#fuel;
    };
  }
}

const car = new Car(100);
console.log(car.fuel2);
