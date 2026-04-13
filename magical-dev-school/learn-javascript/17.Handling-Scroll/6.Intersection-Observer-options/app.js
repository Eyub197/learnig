const elemenst = [...document.querySelectorAll("div")];

const observer = new IntersectionObserver(callback, {
  threshold: [0, 0.5, 1],
});

elemenst.forEach((elemenst) => observer.observe(elemenst));

function callback(entries) {
  entries.forEach((entry) => console.log(entry));
}
