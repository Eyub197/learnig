import apiKey from "./config.js";

const CONFIG = {
  cssSelectors: {
    SEARCH_PANEL: "form",
    SEARCH_BOX: ".search-box",
    MAP: "#map",
    ADD_SEARCH_BOX_BUTTON: "[data-js='add-searchbox']",
    INITIAL_SEARCH_INPUT: "input[type='search']",
    DIRECTION_PANEL: ".directions-panel",
    ERROR_INDICATOR: ".search-panel__error",
    DELETE_ICON: ".search-box__delete-icon",
    AUTOCOMPLETE_ELEMENT: "gmp-place-autocomplete",
    WAYPOINT_TEMPLATE: "#waypoint-template",
    ACTIONS_TEMPLATE: "#actions-template",
    SEARCH_PANEL_BODY: ".search-panel__body",
    WAYPOINT: "[name='waypoint']",
  },
  MAXIMUM_NUMBER_OF_WAYPOINTS: 10,
  DEFAULT_MAP_SETTING: {
    center: {
      lat: 43.2047,
      lng: 27.9105,
    },
    zoom: 12,
  },
};

let map;
let locations = ["", ""];

fetchGoogleMapsApi();

async function initMap() {
  const mapElement = document.querySelector(CONFIG.cssSelectors.MAP);
  const searchPanel = document.querySelector(CONFIG.cssSelectors.SEARCH_PANEL);
  const searchPanelBody = searchPanel.querySelector(
    CONFIG.cssSelectors.SEARCH_PANEL_BODY,
  );
  const waypointTemplate = document.querySelector(
    CONFIG.cssSelectors.WAYPOINT_TEMPLATE,
  );

  const directionsPanel = searchPanel.querySelector(
    CONFIG.cssSelectors.DIRECTION_PANEL,
  );
  const errorIndicator = searchPanel.querySelector(
    CONFIG.cssSelectors.ERROR_INDICATOR,
  );

  function renderSearchBoxes() {
    searchPanelBody.innerHTML = "";

    locations.forEach((location, index) => {
      const searchBoxFragment = waypointTemplate.content.cloneNode(true);
      const searchBox = searchBoxFragment.querySelector(
        CONFIG.cssSelectors.SEARCH_BOX,
      );
      const autocompleElem = searchBox.querySelector(
        CONFIG.cssSelectors.AUTOCOMPLETE_ELEMENT,
      );
      const deleleteButton = searchBox.querySelector(
        CONFIG.cssSelectors.DELETE_ICON,
      );

      google.maps.event.addListener(map, "idle", () => {
        const bounds = map.getBounds();
        if (!bounds) return;
        autocompleElem.locationRestriction = bounds;
      });

      autocompleElem.value = location;
      deleleteButton.setAttribute("data-index", index);
      if (index === 0) {
        autocompleElem.placeholder = "Starting point";
        autocompleElem.setAttribute("name", "starting-point");
      } else if (index === locations.length - 1) {
        autocompleElem.placeholder = "End point";
        autocompleElem.setAttribute("name", "destination");
      } else {
        autocompleElem.placeholder = "Waypoint";
        autocompleElem.setAttribute("name", "waypoint");
      }

      searchPanelBody.appendChild(searchBox);
    });

    const actionsTemplate = document.querySelector(
      CONFIG.cssSelectors.ACTIONS_TEMPLATE,
    );
    const actionsFragment = actionsTemplate.content.cloneNode(true);
    searchPanelBody.appendChild(actionsFragment);

    const waypoints = [
      ...searchPanelBody.querySelectorAll(CONFIG.cssSelectors.WAYPOINT),
    ];

    const lastWaypoint = waypoints[waypoints.length - 1];
    if (waypoints.length > 0) {
      setTimeout(() => {
        if (lastWaypoint) lastWaypoint.focus();
      }, 50);
    }

    if (locations.length <= 2) {
      const allCloseButtons = [
        ...searchPanelBody.querySelectorAll(CONFIG.cssSelectors.DELETE_ICON),
      ];

      allCloseButtons.forEach((closeButton) =>
        closeButton.setAttribute("hidden", true),
      );
    }
  }

  const directionsRenderer = new google.maps.DirectionsRenderer();

  const {} = await google.maps.importLibrary("places");

  map = new google.maps.Map(mapElement, {
    center: CONFIG.DEFAULT_MAP_SETTING.center,
    zoom: CONFIG.DEFAULT_MAP_SETTING.zoom,
  });
  renderSearchBoxes();

  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(directionsPanel);

  function handleError(result) {
    const errors = {
      NVALID_REQUEST: "Request was invalid",
      MAX_WAYPOINTS_EXCEEDED: "Too many waypoints in the request",
      NOT_FOUND:
        "At least one origin, destination, or waypoint cannot be geocoded",
      OVER_QUERY_LIMIT: "Too many requests in a short period of time",
      REQUEST_DENIED: "Not allowed to use directions service",
      UNKNOWN_ERROR: "Server error",
      ZERO_RESULTS: "Cannot find a route between origin and destination.",
      WAYPOINT_TEMPLATE: "#waypoint-template",
    };
    const erorMessage = errors[result.status];
    errorIndicator.textContent = erorMessage;
  }

  function calcRoute(origin, destination, waypoints) {
    const directionsServices = new google.maps.DirectionsService();
    const request = {
      origin,
      destination,
      waypoints,
      travelMode: "DRIVING",
    };

    directionsServices.route(request, (result, status) => {
      if (status !== "OK") {
        handleError(result);
        return;
      }
      directionsRenderer.setDirections(result);
      errorIndicator.textContent = "";
    });
  }

  function handlePanelClicks(event) {
    if (event.target.closest(CONFIG.cssSelectors.ADD_SEARCH_BOX_BUTTON)) {
      handleAddWaypoint(event);
    }

    if (event.target.closest(CONFIG.cssSelectors.DELETE_ICON)) {
      handleDeleteSearchPanel(event);
    }
  }

  function handleAddWaypoint() {
    const allAutocompleteElements = [
      ...searchPanel.querySelectorAll(CONFIG.cssSelectors.AUTOCOMPLETE_ELEMENT),
    ];

    locations = allAutocompleteElements.map((element) => element.value);
    locations.splice(locations.length - 1, 0, "");
    renderSearchBoxes();
  }

  function handleDeleteSearchPanel(event) {
    const index = parseInt(event.target.dataset.index);

    locations = locations.filter((_, i) => i !== index);
    renderSearchBoxes();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(searchPanel);
    const origin = formData.get("starting-point");
    const destination = formData.get("destination");
    const waypoints = formData
      .getAll("waypoint")
      .map((waypoint) => ({ location: waypoint }));
    calcRoute(origin, destination, waypoints);
  }

  searchPanel.addEventListener("click", handlePanelClicks);
  searchPanel.addEventListener("submit", handleSubmit);
}

window.initMap = initMap;

function fetchGoogleMapsApi() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=initMap`;
  script.setAttribute("async", true);
  document.head.appendChild(script);
}

// let map;

// const varna = {
//   lat: 43.2047,
//   lng: 27.9105,
// };

// const razgrad = {
//   lat: 43.5333,
//   lng: 26.5167,
// };

// function getSearchBoxes() {
//   return [...document.querySelectorAll(".search-box")];
// }

// async function initMap() {
//   const directionsRenderer = new google.maps.DirectionsRenderer();
//   const form = document.querySelector("form");
//   const inputSearchBoxes = form.querySelectorAll("input[type='search']");
//   const addSearchBox = form.querySelector("[data-js='add-searchbox']");
//   const autocompletes = [];

//   const {} = await google.maps.importLibrary("places");

//   map = new google.maps.Map(document.getElementById("map"), {
//     center: varna,
//     zoom: 12,
//   });

//   directionsRenderer.setMap(map);
//   directionsRenderer.setPanel(document.querySelector(".directions-panel"));

//   function calcRoute(origin, destination, waypoints) {
//     const directionsServices = new google.maps.DirectionsService();
//     const request = {
//       origin,
//       destination,
//       waypoints,
//       travelMode: "DRIVING",
//     };

//     directionsServices.route(request, (result, status) => {
//       const errorIndicator = form.querySelector(".search-panel__error");
//       if (status !== "OK") {
//         const errors = {
//           NVALID_REQUEST: "Request was invalid",
//           MAX_WAYPOINTS_EXCEEDED: "Too many waypoints in the request",
//           NOT_FOUND:
//             "At least one origin, destination, or waypoint cannot be geocoded",
//           OVER_QUERY_LIMIT: "Too many requests in a short period of time",
//           REQUEST_DENIED: "Not allowed to use directions service",
//           UNKNOWN_ERROR: "Server error",
//           ZERO_RESULTS: "Cannot find a route between origin and destination.",
//         };
//         const erorMessage = errors[result.status];
//         errorIndicator.textContent = erorMessage;
//         return;
//       }
//       directionsRenderer.setDirections(result);
//       errorIndicator.textContent = "";
//     });
//   }

//   function createFirstRenderAutoCompleates(inputSearchBox, index) {
//     const searchBox = inputSearchBox.closest(".search-box");
//     const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement(
//       {},
//     );

//     placeAutocomplete.name = index === 0 ? "starting-point" : "destination";
//     placeAutocomplete.id = "place-autocomplete-input";
//     placeAutocomplete.placeholder = inputSearchBox.placeholder;

//     inputSearchBox.insertAdjacentElement("beforebegin", placeAutocomplete);
//     searchBox.removeChild(inputSearchBox);
//     autocompletes.push(placeAutocomplete);
//   }

//   inputSearchBoxes.forEach((inputSearchBox, index) => {
//     createFirstRenderAutoCompleates(inputSearchBox, index);

//     google.maps.event.addListener(map, "idle", () => {
//       const bounds = map.getBounds();
//       if (!bounds) return;
//       autocompletes.forEach((element) => {
//         element.locationRestriction = bounds;
//       });
//     });
//   });

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const formData = new FormData(form);

//     const origin = formData.get("starting-point");
//     const destination = formData.get("destination");
//     const waypoints = formData
//       .getAll("waypoint")
//       .map((waypoint) => ({ location: waypoint }));

//     calcRoute(origin, destination, waypoints);
//   });

//   addSearchBox.addEventListener("click", (event) => {
//     let boxes = getSearchBoxes();

//     if (boxes.length >= 10) {
//       return;
//     }

//     const lastBox = boxes[boxes.length - 1];
//     const newWaypoint = lastBox.cloneNode(true);
//     const newWaypointAutocomplete = newWaypoint.querySelector(
//       "gmp-place-autocomplete",
//     );
//     newWaypointAutocomplete.placeholder = "Waypoint";
//     newWaypointAutocomplete.name = "waypoint";

//     lastBox.insertAdjacentElement("beforebegin", newWaypoint);
//     boxes = getSearchBoxes();

//     boxes.forEach((box) => {
//       const deleteButton = box.querySelector(".search-box__delete-icon");
//       deleteButton.removeAttribute("hidden");
//     });
//   });

//   form.addEventListener("click", (event) => {
//     const deleteButton = event.target.closest(".search-box__delete-icon");

//     if (!deleteButton) return;

//     const searchBoxes = getSearchBoxes();

//     if (searchBoxes.length <= 2) {
//       return;
//     }

//     const searchBox = deleteButton.closest(".search-box");
//     searchBox.parentElement.removeChild(searchBox);
//     const remainingBoxes = getSearchBoxes();

//     if (remainingBoxes.length <= 2) {
//       remainingBoxes.forEach((box) => {
//         box
//           .querySelector(".search-box__delete-icon")
//           .setAttribute("hidden", true);
//       });
//     }

//     const lastSerchBox = remainingBoxes[remainingBoxes.length - 1];
//     const lastAutocomplete = lastSerchBox.querySelector(
//       "gmp-place-autocomplete",
//     );
//     f;
//     lastAutocomplete.placeholder = "Ending point";
//     lastAutocomplete.name = "destination";

//     const firstSearchBox = remainingBoxes[0];
//     const firstAutocomplete = firstSearchBox.querySelector(
//       "gmp-place-autocomplete",
//     );
//     firstAutocomplete.placeholder = "Starting point";
//     firstAutocomplete.name = "starting-point";
//   });
// }

// function fetchGoogleMapsApi() {
//   const apiKey = "AIzaSyCAuHUlYFBo-uuK48W_Nvy7_sN-JW0_fqI";
//   const script = document.createElement("script");
//   script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=initMap`;
//   script.setAttribute("async", true);
//   document.head.appendChild(script);
// }

// fetchGoogleMapsApi();
