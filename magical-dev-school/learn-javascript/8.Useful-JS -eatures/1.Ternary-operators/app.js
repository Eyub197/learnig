function wash() {
  console.log("wash");
}

function eat() {
  console.log("eat");
}

const fruitBasket = ["apple", "pear", "orange"];
const indexOfApple = fruitBasket.indexOf("apple");

indexOfApple == 2 ? eat() : wash();
