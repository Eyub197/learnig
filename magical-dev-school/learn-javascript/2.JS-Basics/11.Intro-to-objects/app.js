const object = {
  name: "object!!1",
  "Something Not": 1,

  printMenu: function () {
    console.log("menu");
  },

  printTypeOfMenu: function (typeOfMenu) {
    console.log(typeOfMenu);
    this.printMenu();
  },
};

console.log(object.name);
console.log(object["Something Not"]);

object.name = "Melih";
console.log(object.name);
object["Something Not"] = 2;
console.log(object["Something Not"]);
object.printMenu();
object.printTypeOfMenu("Submenu");
