import Tiny from "./Tiny/tiny.js";
import Filters from "./Filters.js";

export default Tiny({
  components: {
    Filters,
  },

  state: {
    displayedHeroes: [],
    allHeroes: [],
  },

  filterHeroes(event) {
    this.setState({ displayedHeroes: event.detail.filteredHeroes });
  },

  template() {
    const heroes =
      this.state.displayedHeroes.length > 0
        ? this.state.displayedHeroes
        : this.props.allHeroes;

    return `
        <header class="site-header">
            <div class="wrap">
                <a href="/">
                    <img src="/images/logo.png" alt="Dota 2 Logo" />
                </a>
            </div>
        </header>

        <main tiny-listener="[filter-heroes, filterHeroes]">
          <div class="wrap">
            <div class="site-title">
                <h1>Heroes List</h1>
                <p>Filter heroes based on these attributes</p>
            </div>

             <div class="sidebar-content">
              <div class="sidebar flow">
                <div tiny-component="Filters" tiny-props="[allHeroes, props.allHeroes]"></div>
              </div>

              <div class="content">
                 <ul class="heroes-list">
                  ${heroes
                    .map((hero) => {
                      return `
                      <li class="hero">
                        <a href="/heroes/${hero.npcHeroName}">
                          <span class="hero__name">${hero.name}</span>
                          <img src="${hero.imageUrl}" alt="${hero.name} icon" />
                          </a>
                      </li>

                    `;
                    })
                    .join("")}

                 </ul>
              </div>
             </div>
        </main>
      `;
  },
});
