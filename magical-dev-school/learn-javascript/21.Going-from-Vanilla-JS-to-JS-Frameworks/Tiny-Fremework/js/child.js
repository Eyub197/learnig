import Tiny from "../Tiny/tiny.js";

export default Tiny({
  state: {
    count: 5,
  },

  afterMount() {
    this.emit("child-count", {
      count: this.state.count,
    });
  },

  increaseParentCount(event) {
    this.emit("increase-parent-count", {
      amount: 1,
    });
  },

  increaseCount(event) {
    this.setState({
      count: this.state.count + 1,
    });
    this.emit("child-count", {
      count: this.state.count,
    });
  },

  template() {
    return `
      <div class="component child-component flow">
        <h2>Child Counter</h2>
        <p>Count: ${this.state.count}</p>
        <button tiny-listener="[click, increaseCount]">Increase count by 1</button>
        <button tiny-listener="[click, increaseParentCount]">Increase parent count by 1</button>
      </div>
    `;
  },
});
