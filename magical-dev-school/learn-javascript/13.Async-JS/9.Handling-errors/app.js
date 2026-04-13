// try {
//   const response = await fetch("https://api.github.com/user/repos");
//   const body = await response.json();

//   if (!response.ok) {
//     throw body;
//   }
// } catch (error) {
//   console.log(`API Error `, error.message);
// }

const request = new XMLHttpRequest();

request.addEventListener("load", (event) => {
  const response = JSON.parse(event.target.response);
  if (response.status > 400) {
    console.log(response.message);
  }
});

request.open("get", "https://api.github.com/user/repos");
request.send();
