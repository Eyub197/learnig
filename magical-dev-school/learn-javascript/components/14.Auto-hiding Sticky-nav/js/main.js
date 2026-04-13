// Start writing JavaScript here!

const nav = document.querySelector("nav");

document.addEventListener("scroll", (event) => {
  const previousPosition = document.body.dataset.previousScrollPosition;
  const currentPosition = window.scrollY;
  const navBounds = nav.getBoundingClientRect();
  const navTop = parseFloat(navBounds.top);
  const navHeight = parseFloat(navBounds.height);
  const difference = currentPosition - parseFloat(previousPosition) || 0;

  const navTopValue = Math.abs(navTop - difference);

  if (navTopValue > navHeight) {
    nav.style.top = `-${navHeight}px`;
  } else {
    const navTopValue = navTop - difference;

    if (navTopValue > 0) {
      nav.style.top = "0px";
    } else {
      nav.style.top = `${navTopValue}px`;
    }
  }
  document.body.dataset.previousScrollPosition = window.scrollY;
});

// how can I make it so only time
