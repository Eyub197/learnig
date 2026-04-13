// function Car() {
//   let fuel = 50;

//   return {
//     get fuel() {
//       console.log(fuel);
//       return fuel;
//     },

//     set fuel(amount) {
//       fuel = amount;
//       if (fuel > 100) {
//         console.log(
//           "Feul tank capacity is 100 litters. Pouring away execcisve amount",
//         );
//       }
//     },

//     addFuel(amount) {
//       this.fuel = amount + this.fuel;
//     },
//   };
// }

// const car = Car();
// car.addFuel(10);
// car.fuel;

// function Car() {
//   let fuel = 50;

//   Object.assign(Car.prototype, {
//     get fuel() {
//       console.log(fuel);
//       return fuel;
//     },

//     set fuel(amount) {
//       fuel = amount;
//     },
//   });
// }

// const car = new Car();
// car.fuel = 67;
// car.fuel;

// class Car {
//   #fuel = 50;

//   get fuel() {
//     console.log(this.#fuel);
//     return this.#fuel;
//   }

//   set fuel(amount) {
//     this.#fuel = amount;
//   }
// }

// const car = new Car();
// car.fuel = 67;
// car.fuel;

const Car = {
  init() {
    let fuel = 50;
    return {
      get fuel() {
        console.log(fuel);
        return fuel;
      },

      set fuel(amount) {
        fuel = amount;
      },
    };
  },
};

const car = Object.create(Car).init();
console.log(car);
car.fuel;
car.fuel = 230;
car.fuel;
