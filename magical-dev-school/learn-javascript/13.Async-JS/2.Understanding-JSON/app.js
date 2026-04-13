const request = new XMLHttpRequest();

request.addEventListener("load", (event) => {
  const repos = JSON.parse(event.target.response).map((repo) => {
    return {
      name: repo.name,
      url: repo["html_url"],
    };
  });

  const ol = document.createElement("ol");

  repos.forEach((repo) => {
    ol.innerHTML += `<li><a href=${repo.url}>${repo.name}</a></li>`;
  });
  document.body.appendChild(ol);
});

request.open("GET", "https://api.github.com/users/Eyub197/repos");
request.send();
