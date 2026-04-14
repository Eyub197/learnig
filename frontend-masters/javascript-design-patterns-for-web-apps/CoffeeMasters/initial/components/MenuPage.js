import ProductItem from './ProductItem.js';

export default class MenuPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.appendChild(content);
    this.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/MenuPage.css");
      styles.textContent = await request.text();
    }
    loadCSS();

    this.render();
    window.addEventListener("appmenuchange", () => {
      this.render();
    });
  }

  render() {
    if (app.store.menu) {
      this.querySelector("#menu").innerHTML = "";
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
                <h3>${category.name}</h3>
                <ul class='category'>
                </ul>`;
        this.querySelector("#menu").appendChild(liCategory);

        category.products.forEach(product => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.querySelector("#menu").innerHTML = `Loading...`;
    }
  }

}

customElements.define("menu-page", MenuPage);
