import { getProductById } from '../services/Menu.js';
import { addToCart } from '../services/Order.js';

export default class DetailsPage extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    const styles = document.createElement("style");
    async function loadCSS() {
      const request = await fetch("/components/DetailsPage.css");
      styles.textContent = await request.text();
    }
    loadCSS();
    this.appendChild(styles);

    this.renderData();
  }

  async renderData() {
    if (this.dataset.productId) {
      this.product = await getProductById(this.dataset.productId);
      this.querySelector("h2").textContent = this.product.name;
      this.querySelector("img").src = `/data/images/${this.product.image}`;
      this.querySelector("img").style.viewTransitionName = `image-${this.product.id}`;
      this.querySelector(".description").textContent = this.product.description;
      this.querySelector(".price").textContent = `$ ${this.product.price.toFixed(2)} ea`;
      this.querySelector("button").addEventListener("click", () => {
        addToCart(this.product.id);
        app.router.go('/order');
      });

      return this.product;
    } else {
      alert("Invalid Product ID");
      return null;
    }
  }

}

customElements.define("details-page", DetailsPage);
