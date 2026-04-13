const books = [...document.querySelectorAll(".book")];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
});

const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    rootMargin: "0px 0px -10px 0px",
  },
);

books.forEach((book) => {
  observer.observe(book);
  fadeInObserver.observe(book);
});
