export default function Carousel(carouselElement) {
  const nextButton = createNextButton();
  const previousButton = createPreviousButton();
  const carouselContents = carouselElement.querySelector(".carousel__contents");
  const slides = [...carouselContents.querySelectorAll(".carousel__slide")];
  setSlides(slides);
  const liveRegion = carouselElement.querySelector("[role='status']");
  const dotsContainer = createDots(slides);
  const dots = [...dotsContainer.children];
  carouselElement.insertBefore(previousButton, carouselElement.children[0]);
  carouselElement.appendChild(nextButton);
  carouselElement.appendChild(dotsContainer);

  const carousel = {
    get getCurrentSlideIndex() {
      const currentSlide = carouselContents.querySelector(".is-selected");
      return slides.findIndex((slide) => slide === currentSlide);
    },

    switchSlide(currentSlideIndex, targetSlideIndex) {
      const currentSlide = slides[currentSlideIndex];
      const targetSlide = slides[targetSlideIndex];
      const nextPosition = getComputedStyle(targetSlide).left;

      const currentLink = slides[currentSlideIndex].querySelector("a");
      const targetLink = slides[targetSlideIndex].querySelector("a");

      currentLink.setAttribute("tabindex", "-1");
      targetLink.removeAttribute("tabindex");

      carouselContents.style.transform = `translateX(-${nextPosition})`;
      currentSlide.classList.remove("is-selected");
      targetSlide.classList.add("is-selected");
      liveRegion.textContent = `Slides ${targetSlideIndex + 1} of ${slides.length} slides selected`;
    },

    highlightDot(currentDotIndex, targetDotIndex) {
      const currentDot = dots[currentDotIndex];
      const targetDot = dots[targetDotIndex];

      currentDot.classList.remove("is-selected");
      targetDot.classList.add("is-selected");
    },

    showAndHideArrows(targetSlideIndex) {
      if (targetSlideIndex == 0) {
        previousButton.setAttribute("hidden", true);
        nextButton.removeAttribute("hidden");
      } else if (targetSlideIndex == dots.length - 1) {
        nextButton.setAttribute("hidden", true);
        previousButton.removeAttribute("hidden");
      } else {
        previousButton.removeAttribute("hidden");
        nextButton.removeAttribute("hidden");
      }
    },

    showNextSlide() {
      const currentSlideIndex = carousel.getCurrentSlideIndex;
      const nextSlideIndex = currentSlideIndex + 1;

      carousel.switchSlide(currentSlideIndex, nextSlideIndex);
      carousel.showAndHideArrows(nextSlideIndex);
      carousel.highlightDot(currentSlideIndex, nextSlideIndex);
    },

    showPreviousSlide() {
      const currentSlideIndex = carousel.getCurrentSlideIndex;
      const previousSlideIndex = currentSlideIndex - 1;

      carousel.switchSlide(currentSlideIndex, previousSlideIndex);
      carousel.showAndHideArrows(previousSlideIndex);
      carousel.highlightDot(currentSlideIndex, previousSlideIndex);
    },

    handleDotClick(event) {
      if (!event.target.closest(".carousel__dots")) return;

      const dot = event.target;
      const currentSlideIndex = carousel.getCurrentSlideIndex;
      const targetSlideIndex = dots.findIndex((d) => d === dot);

      carousel.switchSlide(currentSlideIndex, targetSlideIndex);
      carousel.highlightDot(currentSlideIndex, targetSlideIndex);
      carousel.showAndHideArrows(targetSlideIndex);
    },

    handleLeftAndRightArrowKeys(event) {
      const { key } = event;
      if (key !== "ArrowRight" && key !== "ArrowLeft") return;

      const currentSlideIndex = carousel.getCurrentSlideIndex;
      const targetSlideIndex =
        key === "ArrowRight" ? currentSlideIndex + 1 : currentSlideIndex - 1;

      if (!slides[targetSlideIndex]) return;

      carousel.switchSlide(currentSlideIndex, targetSlideIndex);
      carousel.highlightDot(currentSlideIndex, targetSlideIndex);
      carousel.showAndHideArrows(targetSlideIndex);

      const targetLink = slides[targetSlideIndex].querySelector("a");
      targetLink.focus({ preventScroll: true });

      setTimeout(() => {
        carouselContents.parentElement.scrollLeft = 0;
      }, 0);
    },
  };

  nextButton.addEventListener("click", carousel.showNextSlide);
  previousButton.addEventListener("click", carousel.showPreviousSlide);
  dotsContainer.addEventListener("click", carousel.handleDotClick);
  carouselContents.addEventListener(
    "keydown",
    carousel.handleLeftAndRightArrowKeys,
  );

  return carousel;
}

function createDots(slides) {
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("carousel__dots");
  dotsContainer.setAttribute("aria-hidden", true);

  slides.forEach((slide) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel__dot");
    dot.setAttribute("tabindex", -1);

    if (slide.classList.contains("is-selected")) {
      dot.classList.add("is-selected");
    }

    dotsContainer.appendChild(dot);
  });
  return dotsContainer;
}

function createPreviousButton() {
  const previousButton = document.createElement("button");
  previousButton.setAttribute("aria-label", "previous-slide");
  previousButton.classList.add("carousel__button", "previous-button");
  previousButton.setAttribute("hidden", true);
  previousButton.innerHTML = `
<svg id="left" viewBox="0 0 54 69.007">
  <path d="M47 0L3.44 34.502 47 69.007z" />
</svg>
`;

  return previousButton;
}

function createNextButton() {
  const nextButton = document.createElement("button");
  nextButton.setAttribute("aria-label", "next-slide");
  nextButton.classList.add("carousel__button", "next-button");
  nextButton.innerHTML = `
<svg viewBox="0 0 54 69.007">
  <path d="M5-.121l43.56 34.502L5 68.886z" />
</svg>`;

  return nextButton;
}

function setSlides(slides) {
  slides.forEach((slide, index) => {
    const slideWidth = slide.getBoundingClientRect().width;
    slide.style.left = `${index * slideWidth}px`;
  });
}
