export default async function Typeahead(typeaheadElement) {
  const url = `https://restcountries.com/v3.1/all?fields=name,flags`;
  const input = typeaheadElement.querySelector(".typeahead__input");
  const predictionsList = typeaheadElement.querySelector("ul");
  let userEnterdValue = "";

  const countries = await getCountries();
  const state = {
    matches: [],
    highlightedItem: -1,
  };

  async function getCountries() {
    const response = await fetch(url);
    const countries = await response.json();

    return countries.map((country) => ({
      name: country.name.common,
      flag: {
        svg: country.flags.svg,
        alt: country.flags.alt,
      },
    }));
  }

  const typeahead = {
    get inputValue() {
      return input.value.toLowerCase().trim();
    },

    hide() {
      predictionsList.setAttribute("hidden", true);
    },

    show() {
      predictionsList.innerHTML = state.matches.join("");
      predictionsList.removeAttribute("hidden");
    },

    boldSearchTerms(prediction, inputValue) {
      const match = prediction.substring(0, inputValue.length);
      const rest = prediction.substring(inputValue.length);
      return `<span class="search-match">${match}</span>${rest}`;
    },

    highlightItem(highlightedIndex) {
      state.highlightedItem = highlightedIndex;
      if (highlightedIndex === -1) return;
      [...predictionsList.children].forEach((element) =>
        element.classList.remove("is-highlighted"),
      );
      const element = predictionsList.children[highlightedIndex];
      element.classList.add("is-highlighted");
      input.value = element.textContent;
    },

    handleInput(event) {
      if (!typeahead.inputValue) return typeahead.hide();

      const predictions = countries.filter((prediction) =>
        prediction.name.toLowerCase().startsWith(typeahead.inputValue),
      );

      if (predictions.length > 0) {
        predictionsList.removeAttribute("hidden");
      }

      const listItems = predictions.map((prediction) => {
        const boldName = typeahead.boldSearchTerms(
          prediction.name,
          typeahead.inputValue,
        );
        return `<li role='option'><img src=${prediction.flag.svg} alt=${prediction.flag.alt}>${boldName}</li>`;
      });

      state.matches = listItems;
      typeahead.show();
    },

    handleListItemClick(event) {
      const listElem = event.target.closest("li");
      if (!listElem) return;
      input.value = listElem.textContent;
      typeahead.hide();
    },

    handleClickOutsideTypeahead(event) {
      if (!event.target.closest(".typeahead")) {
        typeahead.hide();
      }
    },

    handleUpDownArrows(event) {
      const { key } = event;
      if (key !== "ArrowUp" && key !== "ArrowDown") return;
      if (state.matches.length === 0) return;
      // the positoin of the cursor to be in the end
      event.preventDefault();

      if (state.highlightedItem === -1) {
        userEnterdValue = input.value.trim();
        if (key === "ArrowDown") {
          typeahead.highlightItem(0);
        }

        if (key === "ArrowUp") {
          typeahead.highlightItem(state.matches.length - 1);
        }
        return;
      }

      if (state.highlightedItem === 0 && key === "ArrowUp") {
        typeahead.highlightItem(-1);
        input.value = userEnterdValue;
        return;
      }

      if (
        state.highlightedItem === state.matches.length - 1 &&
        key === "ArrowDown"
      ) {
        typeahead.highlightItem(-1);
        input.value = userEnterdValue;
        return;
      }
      if (key === "ArrowUp") {
        typeahead.highlightItem(state.highlightedItem - 1);
      }

      if (key === "ArrowDown") {
        typeahead.highlightItem(state.highlightedItem + 1);
      }
    },

    handleTabKey(event) {
      if (event.key !== "Tab") return;
      typeahead.hide();
    },

    get isPredictionListOpen() {
      return !predictionsList.hasAttribute("hidden");
    },

    handleEnterKey(event) {
      if (event.key !== "Enter") return;

      // prevents user from submitting form when selecting an item
      if (typeahead.isPredictionListOpen) event.preventDefault();

      typeahead.hide();
    },

    handleEscapeKey(event) {
      if (event.key !== "Escape") return;
      typeahead.hide();
      input.value = userEnterdValue;
    },
  };
  // evenet listeners

  document.addEventListener("click", typeahead.handleClickOutsideTypeahead);
  predictionsList.addEventListener("click", typeahead.handleListItemClick);
  input.addEventListener("input", typeahead.handleInput);
  input.addEventListener("keydown", typeahead.handleUpDownArrows);
  input.addEventListener("keydown", typeahead.handleTabKey);
  input.addEventListener("keydown", typeahead.handleEnterKey);
  input.addEventListener("keydown", typeahead.handleEscapeKey);
}
