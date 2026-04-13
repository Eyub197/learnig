const element = [...document.querySelectorAll("div")];
const observer = new IntersectionObserver(callback);

function callback(entries) {
  entries.forEach((entry) => console.log(entry));
}
element.forEach((element) => observer.observe(element));
