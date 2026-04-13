import Tiny from "../Tiny/tiny.js";
import child from "./child.js";
import totalCount from "./total-count.js";
import descendant from "./descendant.js";
Tiny({
  selector: "main",

  state: {
    count: 10,
  },

  components: {
    child,
    totalCount,
    descendant,
  },

  increaseSelfCount(event) {
    const amount = event.detail.amount;

    this.setState({
      count: this.state.count + amount,
    });
  },

  increaseCount(event) {
    this.setState({
      count: this.state.count + 1,
    });
  },

  setChildCount(event) {
    this.setState({
      childCount: event.detail.count,
    });
  },

  template() {
    return `
    <div
      class="component parent-component flow"
      tiny-listener="[increase-parent-count, increaseSelfCount] [child-count setChildCount]"
      >
      <h1>Parent Counter</h1>
      <p>Count: ${this.state.count}</p>
      <button tiny-listener="[click, increaseCount]" >Increase count by 1</button>

      <div tiny-component="descendant" tiny-props="[count, state.count]">

      <div class="half">
        <div tiny-component="child"></div>
        <div tiny-component="totalCount" tiny-props="[parentCount, state.count] [childCount, state.childCount]"></div>
        </div>
  </div>`;
  },
});
