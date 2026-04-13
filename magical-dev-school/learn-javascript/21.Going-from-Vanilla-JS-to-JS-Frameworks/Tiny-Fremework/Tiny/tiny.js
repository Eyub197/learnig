const initial = {
  components: {},
  props: {},
  mounted: false,
  afterMount() {},
};

export default function Tiny(options) {
  options = Object.assign({}, initial, options);

  const element =
    typeof options.selector === "string"
      ? document.querySelector(options.selector)
      : options.selector;

  options.element = element;

  function _addEventListener(options) {
    const listenerElements =
      options.element.querySelectorAll("[tiny-listener]");

    for (const listenerElement of listenerElements) {
      const attribute = listenerElement.getAttribute("tiny-listener");

      const values = _parseAttributeStrings(attribute);

      for (let index = 0; index < values.length - 1; index += 2) {
        const eventName = values[index];
        const fn = values[index + 1];
        listenerElement.addEventListener(eventName, options[fn].bind(options));
      }
    }
  }

  function _render(comp) {
    comp.element.innerHTML = comp.template();
    _addEventListener(comp);
    _renderChildComponent(comp);
  }

  options.setState = function (newState) {
    const entries = Object.entries(newState);

    for (const entry of entries) {
      options.state[entry[0]] = entry[1];
    }

    _render(options);
  };

  options.emit = function (eventName, detail, eventOpts = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail,
      ...eventOpts,
    });
    options.element.dispatchEvent(event);
  };

  function _renderChildComponent(options) {
    const compEls = options.element.querySelectorAll("[tiny-component]");

    for (const compEl of compEls) {
      const compName = compEl.getAttribute("tiny-component");
      const comp = options.components[compName];

      compEl.innerHTML = comp.template();
      comp.element = compEl;
      _addProps(comp);
      _render(comp);

      if (!comp.mounted) {
        comp.mounted = true;
        comp.afterMount();
      }
    }
  }

  function _addProps(comp) {
    const attribute = comp.element.getAttribute("tiny-props");
    if (!attribute) return;

    const props = _parseAttributeStrings(attribute);

    for (let index = 0; index < props.length; index += 2) {
      const prop = props[index];
      let value = props[index + 1];

      if (value.includes(".")) {
        value = value
          .split(".")
          .reduce((acc, current) => acc[current], options);

        comp.props[prop] = value;
        continue;
      }

      if (options[value]) {
        comp.props[prop] = options[value];
        continue;
      }
      comp.props[prop] = value;
    }
  }

  function _parseAttributeStrings(string) {
    return string
      .trim()
      .replace(/[[\],]/g, "")
      .split(/\s+/);
  }

  if (options.selector) {
    _render(options);
    options.mounted = true;
    options.afterMount();
  }

  return options;
}
