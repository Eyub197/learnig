const BASE_URL = "https://api.opendota.com/api";

const heroesList = document.querySelector(".heroes-list");
const filters = document.querySelector(".filters");
const state = {
  allHeroes: [],
  filtered: [],
};

async function initHeroes() {
  const response = await fetch(`${BASE_URL}/constants/heroes`);
  const heroes = await response.json();
  const heroesArray = Object.values(heroes);
  const heroesArrayMassaged = heroesArray.map((hero) => ({
    attackType: hero["attack_type"].toLowerCase(),
    imageUrl: hero.img,
    primaryAttribute: hero["primary_attr"].toLowerCase().slice(0, 3),
    roles: hero.roles.map((role) => role.toLowerCase()),
    name: hero["localized_name"],
  }));
  state.allHeroes = heroesArrayMassaged;
}

function addHeroToDOM(hero) {
  const wrapper = document.createElement("li");
  wrapper.classList.add("hero");

  const link = document.createElement("a");
  link.href = "#";
  link.innerHTML = `
        <span class="hero__name">${hero.name}</span>
        <img src="http://cdn.dota2.com${hero.imageUrl}" alt="${hero.name} icon" />
        `;
  wrapper.appendChild(link);
  heroesList.appendChild(wrapper);
}

async function renderHeroes() {
  heroesList.innerHTML = "";
  state.filtered.length !== 0
    ? state.filtered.forEach(addHeroToDOM)
    : state.allHeroes.forEach(addHeroToDOM);
}

function filterHeroesArrayByCategories(
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
}

function getCheckedFilters() {
  const checckedAttackTypes = [
    ...filters.querySelectorAll("#attack-type input:checked"),
  ].map((chcekBox) => chcekBox.id);

  const checkedPrimaryAttributes = [
    ...filters.querySelectorAll("#primary-attribute input:checked"),
  ].map((checkedPrimaryAttribute) => checkedPrimaryAttribute.id);

  const checkedRoles = [...filters.querySelectorAll("#role input:checked")].map(
    (role) => role.id,
  );

  return { checckedAttackTypes, checkedPrimaryAttributes, checkedRoles };
}

function filterHeroesByCategories() {
  const { checckedAttackTypes, checkedPrimaryAttributes, checkedRoles } =
    getCheckedFilters();

  state.filtered = filterHeroesArrayByCategories(
    state.allHeroes,
    checckedAttackTypes,
    checkedPrimaryAttributes,
    checkedRoles,
  );
}

filters.addEventListener("change", (event) => {
  filterHeroesByCategories();
  renderHeroes();
});

await initHeroes();
renderHeroes();
