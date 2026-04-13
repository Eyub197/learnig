const name = "eyub";
const age = "age";
const city = "city";

const object = {
  name,
  sayName() {
    console.log(this.name);
  },
  [age]: 15,
  [city]: "varna",
};

console.log(object.city);
