// Start writing JavaScript here!
// So we have one wrapper that has backButton the carousel and next backButton
// The carousel is bassicly X amount of images hidden in a container.
// We move the left property of the carousel to see the others hidden tabs
// we get a button. When clicked we add or remove the pixels of the next image.
// If we are in the last or first image we remove the appropiate button
// then the dots there are below everything just centered. Whenver we click a do we remvoe a class from them and add it to the clicked dots
// We find the current tab and we select the one with index + 1

// whenever the next button is clicked we need to get the next slides left position and move it accordingly
// this will happen with getBoundingClientRect()
// for that we will need the

import Carousel from "./carousel.js";
const carousels = [...document.querySelectorAll(".carousel")];

if (carousels.length > 0) {
  carousels.forEach((carousel) => {
    Carousel(carousel);
  });
}
