const heroName = "nevermore";
const BASE_URL = "https://api.opendota.com/api";

function capitalize(name) {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
}

const api = {
  async apiGetRequest(endpoint = "") {
    const response = await fetch(`${BASE_URL}/constants${endpoint}`);
    return response.json();
  },

  async getImage() {
    const heroes = await this.apiGetRequest("/heroes");
    const heroesArray = Object.values(heroes);
    const hero = heroesArray.find(
      (hero) => hero.name.replace("npc_dota_hero_", "") === heroName,
    );
    return hero.img;
  },

  async getLore() {
    const heroesLoreObject = await this.apiGetRequest("/hero_lore");
    return heroesLoreObject[heroName];
  },

  async getHeroAbilities() {
    const [allHeroAbilities, abilitiesAdditionInfo] = await Promise.all([
      this.apiGetRequest("/hero_abilities"),
      this.apiGetRequest("/abilities"),
    ]);

    const heroAbilities = allHeroAbilities[
      `npc_dota_hero_${heroName}`
    ].abilities.filter((ability) => ability !== "generic_hidden");

    const ourHeroAbilitiesMoreInfo = heroAbilities
      .map((heroAbility) => abilitiesAdditionInfo[heroAbility])
      .map((ability) => ({
        name: ability.dname,
        imgUrl: ability.img,
        description: ability.desc,
      }));

    return ourHeroAbilitiesMoreInfo;
  },
};

function addHeroAbilitiesToDOM(heroAbilitiesInfo, heroAbilitiesWrapper) {
  heroAbilitiesInfo.forEach((heroAbility) => {
    const heroWrapper = document.createElement("li");
    heroWrapper.classList.add("ability");
    heroWrapper.innerHTML = `
      <p class="ability__title"> ${heroAbility.name}</p>
      <img class="ability__img" src="http://cdn.dota2.com${heroAbility.imgUrl}" alt="${heroAbility.name}" />

      <p class="desc">${heroAbility.description}</p>
      `;
    heroAbilitiesWrapper.appendChild(heroWrapper);
  });
  heroAbilitiesWrapper.closest("section").removeAttribute("hidden");
}

async function init() {
  const heroNameElem = document.querySelector("[data-hero-name]");
  const heroImageElem = document.querySelector("[data-hero-image]");
  const heroDescriptionElem = document.querySelector("[data-hero-description]");
  const heroAbilitiesWrapper = document.querySelector("[data-hero-abilities]");
  heroNameElem.textContent = capitalize(heroName);

  const heroImgSrc = await api.getImage();
  heroImageElem.src = `http://cdn.dota2.com${heroImgSrc}`;

  const heroLore = await api.getLore();
  heroDescriptionElem.textContent = heroLore;
  const heroAbilitiesInfo = await api.getHeroAbilities();
  addHeroAbilitiesToDOM(heroAbilitiesInfo, heroAbilitiesWrapper);
}

init();
