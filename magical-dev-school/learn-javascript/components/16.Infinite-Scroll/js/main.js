const BASE_URL = `https://api.learnjavascript.today/letters`;
const lettersWrapper = document.querySelector(".letters");
const spinner = document.querySelector(".spinner");
const section = document.querySelector("section");
const loadMoreButton = document.querySelector(".load-more-button");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.click();
    }
  });
});

observer.observe(loadMoreButton);

function hideElement(element) {
  element.setAttribute("hidden", true);
}

function showElement(element) {
  element.removeAttribute("hidden");
}

async function fetchLetters() {
  const urlToFetch =
    document.body.dataset.nextPage || `${BASE_URL}?limit=6&page=1`;

  const resposne = await fetch(urlToFetch);

  if (!resposne.ok) {
    throw new Error("No more images to fetch");
  }

  const data = await resposne.json();
  document.body.dataset.nextPage = data.nextPage;

  return data.letters;
}

async function addLetterToDom() {
  if (loadMoreButton.hasAttribute("hidden")) return;

  showElement(spinner);
  hideElement(loadMoreButton);
  try {
    const letters = await fetchLetters();
    const framgent = document.createDocumentFragment();
    letters.forEach((letter) => {
      const wrapper = document.createElement("li");
      wrapper.innerHTML = `
      <a class="letter" href="${letter.shotUrl}">
        <span>${letter.creator}</span>
        <img src="${letter.imageUrl}" alt="dribble image" width="400" height="300" />
      </a>`;
      framgent.appendChild(wrapper);
    });
    lettersWrapper.appendChild(framgent);
    hideElement(spinner);
    showElement(loadMoreButton);
  } catch (error) {
    hideElement(spinner);
    showElement(section);
  }
}

loadMoreButton.addEventListener("click", addLetterToDom);
