// const response = await fetch("https://jsonplaceholder.typicode.com/posts/56");
// const data = await response.json();

const request = new XMLHttpRequest();

request.addEventListener("load", (event) => {
  console.log(event.target.response);
});

// request.open("GET", "https://jsonplaceholder.typicode.com/posts/1");
// request.send();

// const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     title: "Eyub",
//     status: "published",
//     body: "Path to senior js",
//   }),
// });

// const data = await response.json();

// request.open("post", "https://jsonplaceholder.typicode.com/posts");
// request.setRequestHeader("Content-Type", "application/json");
// request.send(
//   JSON.stringify({
//     title: "Eyub",
//     status: "published",
//     body: "Path to senior js",
//   }),
// );

// const response = await fetch("https://jsonplaceholder.typicode.com/posts/59", {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     title: "Eyub",
//     status: "published",
//     body: "Path to senior js",
//   }),
// });

// const data = await response.json();

// request.open("PUT", "https://jsonplaceholder.typicode.com/posts/59");
// request.setRequestHeader("Content-Type", "application/json");
// request.send(
//   JSON.stringify({
//     title: "Eyub",
//     status: "published",
//     body: "Path to senior js",
//   }),
// );

// const response = await fetch("https://jsonplaceholder.typicode.com/posts/90", {
//   method: "DELETE",
// });

// const data = await response.json();

request.open("DELETE", "https://jsonplaceholder.typicode.com/posts/90");
request.send();
// console.log(data);
