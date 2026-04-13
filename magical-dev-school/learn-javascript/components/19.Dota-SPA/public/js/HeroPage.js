import Tiny from "./Tiny/tiny.js";

const BASE_URL = "https://api.opendota.com/api";
export default Tiny({
  state: {},
  async apiGetRequest(endpoint = "") {
    const response = await fetch(`${BASE_URL}/constants${endpoint}`);
    return response.json();
  },

  async afterMount() {
    const [lores, allHeroAbilities, abilitiesAdditionInfo] = await Promise.all([
      this.apiGetRequest("/hero_lore"),
      this.apiGetRequest("/hero_abilities"),
      this.apiGetRequest("/abilities"),
    ]);

    console.log(lores, allHeroAbilities, abilitiesAdditionInfo);
    this.setState({
      lores: lores,
      allAbilities: allHeroAbilities,
      heroAbilities: abilitiesAdditionInfo,
    });
  },

  getHeroDescription(npcName) {
    if (!this.state.lores) return "";
    return this.state.lores[npcName];
  },

  getHeroAbilities(npcName) {
    const { allAbilities, heroAbilities } = this.state;

    if (!allAbilities || !heroAbilities) return [];

    const heroAbilitiesObject = allAbilities[`npc_dota_hero_${npcName}`];

    if (!heroAbilitiesObject || !heroAbilitiesObject.abilities) return [];

    const heroAbilitiesTemp = heroAbilitiesObject.abilities.filter(
      (ability) => ability !== "generic_hidden",
    );

    const ourHeroAbilitiesMoreInfo = heroAbilitiesTemp
      .map((heroAbility) => heroAbilities[heroAbility])
      .filter((ability) => ability)
      .map((ability) => ({
        name: ability.dname,
        imgUrl: ability.img,
        description: ability.desc,
      }));

    return ourHeroAbilitiesMoreInfo;
  },

  heroHTML(hero, npcName) {
    const abilities = this.getHeroAbilities(npcName);
    return `
      <div class="single-column flow-2">
        <div class="clear site-title">
          <h1 data-hero-name>${hero.name}</h1>
          <img
            class="hero__img"
            data-hero-image
            src="${hero.imageUrl}"
          />
          <p data-hero-description>${this.getHeroDescription(npcName)}</p>
        </div>

        <section ${abilities.length > 0 ? "" : "hidden"}>
          <h2>Abilities</h2>
          <ul class="abilities flow" data-hero-abilities>
            ${abilities
              .map((ability) => {
                return `
                <li class="ability">
                  <p class="ability__title"> ${ability.name}</p>
                  <img class="ability__img" src="http://cdn.dota2.com${ability.imgUrl}" alt="${ability.name}" />
                  <p class="desc">${ability.description}</p>
                </li>
              `;
              })
              .join("")}
          </ul>
        </section>
      </div>
    `;
  },

  template() {
    const npcName = location.pathname.split("/heroes/")[1];
    const hero = this.props.allHeroes.find(
      (hero) => hero.npcHeroName === npcName,
    );
    if (!hero) return "";

    document.title = `${hero.name} - Dota App`;

    return `
        <div class="hero-page">
            <header class="site-header">
              <div class="wrap">
                <div class="single-column">
                  <a href="/">
                    <img src="/images/logo.png" alt="Dota 2 Logo" />
                  </a>
                </div>
              </div>
            </header>

            <main>
              <div class="wrap">
              ${this.heroHTML(hero, npcName)}
              </div>
            </main>

          </div>
    `;
  },
});
