function Human(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.sayName = function () {
    console.log(`first name ${this.firstName} last name ${this.lastName}`);
  };
}

const melih = new Human("Melih", "Eyub");
const eyub = new Human("Eyub", "Eyub");
const teoman = new Human("Teoman", "Akselov");

melih.sayName();

console.log(melih, eyub, teoman);
