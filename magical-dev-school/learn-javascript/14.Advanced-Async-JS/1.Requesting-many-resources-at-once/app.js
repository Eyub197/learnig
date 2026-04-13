const [firstPromise, secondPromise, thirdPromise] = await Promise.all([
  fetch("https://jsonplaceholder.typicode.com/todos/1"),
  fetch("https://jsonplaceholder.typicode.com/todos/2"),
  fetch("https://jsonplaceholder.typicode.com/todos/3"),
]);

const [todoOne, todoTwo, todoThree] = await Promise.all([
  firstPromise.json(),
  secondPromise.json(),
  thirdPromise.json(),
]);

console.log(todoOne, todoTwo, todoThree);

const [todoFour, todoFive, todoSix] = await Promise.all([
  axios.get("https://jsonplaceholder.typicode.com/todos/4"),
  axios.get("https://jsonplaceholder.typicode.com/todos/5"),
  axios.get("https://jsonplaceholder.typicode.com/todos/6"),
]);

console.log(todoFive.data, todoFive.data, todoSix.data);
