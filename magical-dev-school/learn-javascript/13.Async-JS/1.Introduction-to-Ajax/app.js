const request = new XMLHttpRequest();

request.addEventListener("load", (event) => {
  console.log(event.target.responseText);
});

request.open("GET", "https://api.github.com/users/Eyub197/repos");
request.send();
