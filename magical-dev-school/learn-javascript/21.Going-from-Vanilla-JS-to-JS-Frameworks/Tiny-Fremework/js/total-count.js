import Tiny from "../Tiny/tiny.js";

export default Tiny({
  template() {
    const parentCount = this.props.parentCount;
    const childCount = this.props.childCount;
    return `
      <div class="component total-component flow text">
          <h2>Total Count</h2>
          <ul>
            <li>Parent Count: ${parentCount}</li>
            <li>Child Count: ${childCount}</li>
             <li>Child Count: ${parentCount + childCount}</li>
            </ul>
      </div>;
    `;
  },
});
