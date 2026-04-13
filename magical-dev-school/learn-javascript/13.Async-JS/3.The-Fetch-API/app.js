const response = await fetch("https://api.github.com/users/zellwk/repos");
const data = await response.json();
const moreThen50Stars = data.filter((repo) => repo.stargazers_count > 50);

console.log(moreThen50Stars);

// fetch("https://api.github.com/users/zellwk/repos")
//   .then((response) => response.json())
//   .then((data) => console.log(data));
