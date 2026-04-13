import Tiny from "./Tiny/tiny.js";
import HeroesList from "./HeroesList.js";
import HeroPage from "./HeroPage.js";

Tiny({
  state: {
    allHeroes: [],
  },
  selector: document.body,

  components: {
    HeroesList,
    HeroPage,
  },

  async afterMount() {
    const BASE_URL = "https://api.opendota.com/api";
    const response = await fetch(`${BASE_URL}/constants/heroes`);
    const heroes = await response.json();
    const heroesArray = Object.values(heroes);
    const heroesArrayMassaged = heroesArray.map((hero) => ({
      attackType: hero["attack_type"].toLowerCase(),
      imageUrl: `http://cdn.dota2.com${hero.img}`,
      primaryAttribute: hero["primary_attr"].toLowerCase().slice(0, 3),
      roles: hero.roles.map((role) => role.toLowerCase()),
      npcHeroName: hero.name.replace("npc_dota_hero_", ""),
      name: hero["localized_name"],
    }));

    this.setState({
      allHeroes: heroesArrayMassaged,
    });
  },

  template() {
    const path = location.pathname;

    if (path === "/") {
      return `<div tiny-component="HeroesList" tiny-props="[allHeroes, state.allHeroes]"></div>`;
    }

    if (path.includes("/heroes/")) {
      return `<div tiny-component="HeroPage" tiny-props="[allHeroes, state.allHeroes]"></div>`;
    }
  },
});
