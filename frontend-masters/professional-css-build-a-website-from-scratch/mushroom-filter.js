const cards = [...document.querySelectorAll(".mushroom-guide .card")];
const seasonFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const noReusltMessage = document.querySelector(".no-matches");

const currentFilters = {
	season: "all",
	edible: "all",
};

cards.forEach((card, index) => {
	const mushromId = `card-${index + 1}`;
	card.style.viewTransitionName = mushromId;
});

function updateFilter(event) {
	const filterType = event.target.name;
	currentFilters[filterType] = event.target.value;

	if (!document.startViewTransition) {
		filterType();
		return;
	}
	document.startViewTransition(() => filterCards());
}

function filterCards() {
	let hasVisbleCards = false;

	cards.forEach((card) => {
		const season = card.querySelector("[data-season]").dataset.season;
		const edible = card.querySelector("[data-edible]").dataset.edible;

		const matchesSeason = currentFilters.season === season;
		const matchesEdible = currentFilters.edible === edible;

		if (
			(matchesSeason || currentFilters.season === "all") &&
			(matchesEdible || currentFilters.edible === "all")
		) {
			card.hidden = false;
			hasVisbleCards = true;
		} else {
			card.hidden = true;
		}

		if (hasVisbleCards) {
			noReusltMessage.hidden = true;
		} else {
			noReusltMessage.hidden = false;
		}
	});
}

function enableFiltering() {
	// If they dont have js enabled
	seasonFilter.hidden = false;
	edibleFilter.hidden = false;
}

enableFiltering();

seasonFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);
