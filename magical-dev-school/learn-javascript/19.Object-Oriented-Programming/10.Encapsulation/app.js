class Car {
  constructor() {
    this.fuel = 50;
  }

  addFuel(newFuel) {
    this.fuel = this.fuel + newFuel;
    if (this.fuel > 100) {
      console.log("Too much fuel it should be maximum of 100L");
      this.fuel = 100;
    }
  }
}

const opelCorse = new Car();

opelCorse.addFuel(100);
