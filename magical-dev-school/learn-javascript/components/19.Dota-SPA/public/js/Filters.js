import Tiny from "./Tiny/tiny.js";

const filters = [
  {
    name: "attack-type",
    values: ["melee", "ranged"],
  },
  {
    name: "primary-attribute",
    values: ["strength", "agility", "intelligence"],
  },
  {
    name: "role",
    values: [
      "carry",
      "disabler",
      "durable",
      "escape",
      "initiator",
      "jungler",
      "nuker",
      "pusher",
      "support",
    ],
  },
];

export default Tiny({
  state: {},
  afterMount() {
    const values = filters.reduce((acc, current) => {
      return [...acc, ...current.values];
    }, []);

    const newState = {};

    values.forEach((value) => {
      newState[abbreviate(value)] = false;
    });

    this.setState(newState);
    console.log(this.state);
  },

  filterHeroesArrayByCategories(
    heroArray,
    checckedAttackTypes,
    checkedPrimaryAttributes,
    checkedRoles,
  ) {
    return heroArray
      .filter((hero) => {
        return (
          checckedAttackTypes.length === 0 ||
          checckedAttackTypes.includes(hero.attackType)
        );
      })
      .filter((hero) => {
        return (
          checkedPrimaryAttributes.length === 0 ||
          checkedPrimaryAttributes.includes(hero.primaryAttribute)
        );
      })
      .filter((hero) => {
        return (
          checkedRoles.length === 0 ||
          hero.roles.some((role) => checkedRoles.includes(role))
        );
      });
  },

  getCheckedFilters() {
    const checckedAttackTypes = [
      ...this.element.querySelectorAll("#attack-type input:checked"),
    ].map((chcekBox) => chcekBox.id);

    const checkedPrimaryAttributes = [
      ...this.element.querySelectorAll("#primary-attribute input:checked"),
    ].map((checkedPrimaryAttribute) => checkedPrimaryAttribute.id);

    const checkedRoles = [
      ...this.element.querySelectorAll("#role input:checked"),
    ].map((role) => role.id);

    return { checckedAttackTypes, checkedPrimaryAttributes, checkedRoles };
  },

  filterHeroes() {
    const { checckedAttackTypes, checkedPrimaryAttributes, checkedRoles } =
      this.getCheckedFilters();

    return this.filterHeroesArrayByCategories(
      this.props.allHeroes,
      checckedAttackTypes,
      checkedPrimaryAttributes,
      checkedRoles,
    );
  },

  saveFilterState(event) {
    const checkbox = event.target;
    this.state[checkbox.id] = checkbox.checked;

    const filteredHeroes = this.filterHeroes();
    this.emit("filter-heroes", { filteredHeroes });
  },

  template() {
    return `
    <section class="filters" tiny-listener="[change, saveFilterState]">
      <h2 id="filters">Filters</h2>
      <fieldset class="flow">
          <legend>Filter by</legend>
          ${filters
            .map((filter) => {
              return `
              <div class="box filter-group" id="${filter.name}">
                <p class="box__title">${filter.name.replace("-", "")}</p>

                ${filter.values
                  .map((value) => {
                    return `
                    <div class="checkbox">
                        <input
                            type="checkbox"
                            id="${abbreviate(value)}"
                            name="${abbreviate(value)}"
                            ${this.state[abbreviate(value)] ? "checked" : ""}
                        />
                        <label for="${abbreviate(value)}">
                            <span
                                class="checkbox__fakebox"
                            ></span>
                            <svg
                                height="1em"
                                width="1.33em"
                                viewBox="0 0 20 15"
                            >
                                <path
                                  d="M0 8l2-2 5 5L18 0l2 2L7 15z"
                                  fill="#bc4736"
                                  fill-rule="nonzero"
                                />
                            </svg>
                            <span>${value.slice(0, 1).toUpperCase() + value.slice(1)}</span>
                        </label>
                    </div>

                  `;
                  })
                  .join("")}

              </div>
            `;
            })
            .join("")}
      </fieldset>

    </section>
    `;
  },
});

function abbreviate(value) {
  if (value !== "strength" && value !== "agility" && value !== "intelligence")
    return value;

  return value.slice(0, 3);
}
