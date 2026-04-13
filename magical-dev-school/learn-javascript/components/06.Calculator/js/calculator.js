export default function Calculator() {
  const calculatorElement = createCalculator();
  const keyboard = calculatorElement.querySelector(".calculator__keys");
  const display = calculatorElement.querySelector(".calculator__display");
  const clearButton = keyboard.querySelector("[data-button-type='clear']");

  const state = {
    firstValue: undefined,
    operator: undefined,
    modifierValue: undefined,
    previousButtonType: undefined,
    button: "",
  };

  const calculator = {
    state,
    element: calculatorElement,

    get displayValue() {
      return display.textContent;
    },

    set displayValue(value) {
      display.textContent = value;
    },

    clearOperatorState() {
      const operatorButtons = [
        ...keyboard.querySelectorAll("[data-button-type='operator']"),
      ];

      operatorButtons.forEach((operatorButton) =>
        operatorButton.classList.remove("is-pressed"),
      );
    },

    changeClearButtonTextToCE() {
      clearButton.textContent = "CE";
    },

    pressKey(key) {
      keyboard.querySelector(`[data-key="${key}"]`).click();
    },

    pressKeys(...keys) {
      keys.forEach(calculator.pressKey);
    },

    resetCalculator() {
      calculator.pressKeys("clear", "clear");
    },

    getCalcResult(firstValue, operator, secondValue) {
      firstValue = parseFloat(firstValue);
      secondValue = parseFloat(secondValue);

      let result = "";
      switch (operator) {
        case "plus":
          result = firstValue + secondValue;
          break;
        case "minus":
          result = firstValue - secondValue;
          break;
        case "times":
          result = firstValue * secondValue;
          break;
        case "divide":
          result = firstValue / secondValue;
          break;
      }

      return result.toString();
    },

    handleClearKey() {
      const { previousButtonType } = state;

      calculator.displayValue = "0";
      clearButton.textContent = "AC";

      if (previousButtonType === "clear") {
        delete state.firstValue;
        delete state.operator;
        delete state.modifierValue;
      }
    },

    handleNumberKeys() {
      const curretDisplayValue = calculator.displayValue;
      const { previousButtonType } = state;

      const { key } = state.button.dataset;
      curretDisplayValue === "0"
        ? (calculator.displayValue = key)
        : (calculator.displayValue = curretDisplayValue + key);

      if (previousButtonType === "equal" || previousButtonType === "operator") {
        //    maybe add restartCalculator
        calculator.displayValue = key;
      }
    },

    handleDecimalKey() {
      const curretDisplayValue = calculator.displayValue;
      const { previousButtonType } = state;

      if (curretDisplayValue.includes(".")) return;

      if (previousButtonType === "equal" || previousButtonType === "operator") {
        calculator.displayValue = "0.";
        return;
      }
      calculator.displayValue = `${curretDisplayValue}.`;
    },

    handleOperatorKeys() {
      const curretDisplayValue = calculator.displayValue;
      const { firstValue, operator, previousButtonType } = state;

      const { key } = state.button.dataset;

      if (previousButtonType === "operator" || previousButtonType === "equal")
        return;

      const secondValue = curretDisplayValue;

      if (firstValue && operator) {
        const result = calculator.getCalcResult(
          firstValue,
          operator,
          secondValue,
        );
        calculator.displayValue = result;
        state.firstValue = result;
      } else {
        calculator.displayValue = curretDisplayValue * 1;
        state.firstValue = curretDisplayValue;
      }

      state.button.classList.add("is-pressed");
      state.operator = key;
    },

    handleEqualKey() {
      const currentDisplayValue = calculator.displayValue;
      const { firstValue, operator, modifierValue } = state;

      const secondValue = modifierValue || currentDisplayValue;

      if (firstValue && operator) {
        const result = calculator.getCalcResult(
          firstValue,
          operator,
          secondValue,
        );
        calculator.displayValue = result;
        state.firstValue = result;
        state.modifierValue = secondValue;
      } else {
        calculator.displayValue = currentDisplayValue * 1;
      }
    },

    handleClick(event) {
      if (!event.target.closest("button")) return;

      state.button = event.target;
      const { buttonType } = state.button.dataset;

      calculator.clearOperatorState();

      if (buttonType !== "clear") {
        calculator.changeClearButtonTextToCE();
      }

      switch (buttonType) {
        case "clear":
          calculator.handleClearKey();
          break;
        case "number":
          calculator.handleNumberKeys();
          break;
        case "decimal":
          calculator.handleDecimalKey();
          break;
        case "operator":
          calculator.handleOperatorKeys();
          break;
        case "equal":
          calculator.handleEqualKey();
          break;
      }

      state.previousButtonType = buttonType;
    },

    handleKeydown(event) {
      const { key } = event;

      let keyToChange = key;

      if (key === "+") keyToChange = "plus";
      if (key === "-") keyToChange = "minus";
      if (key === "*") keyToChange = "times";
      if (key === "/") keyToChange = "divide";
      if (key === ".") keyToChange = "decimal";
      if (key === "Backspace") keyToChange = "clear";
      if (key === "Escape") keyToChange = "clear";
      if (key === "Enter") keyToChange = "equal";
      if (key === "=") keyToChange = "equal";
      const button = keyboard.querySelector(`[data-key="${keyToChange}"]`);

      if (!button) return;
      // to not trigger double click whenver we press enter
      event.preventDefault();
      button.click();
    },
  };

  keyboard.addEventListener("click", calculator.handleClick);
  calculatorElement.addEventListener("keydown", calculator.handleKeydown);

  return calculator;
}

function createCalculator() {
  const calculator = document.createElement("div");
  calculator.classList.add("calculator");
  calculator.tabIndex = 0;
  calculator.innerHTML = `
      <div class="helper-message">You can use your keyboard to type</div>
      <div class="calculator__display">0</div>
      <div class="calculator__keys">
        <button tabindex="-1" data-key="plus" data-button-type="operator"> + </button>
        <button tabindex="-1" data-key="minus" data-button-type="operator"> &minus; </button>
        <button tabindex="-1" data-key="times" data-button-type="operator"> &times; </button>
        <button tabindex="-1" data-key="divide" data-button-type="operator"> ÷ </button>
        <button tabindex="-1" data-key="1" data-button-type="number"> 1 </button>
        <button tabindex="-1" data-key="2" data-button-type="number"> 2 </button>
        <button tabindex="-1" data-key="3" data-button-type="number"> 3 </button>
        <button tabindex="-1" data-key="4" data-button-type="number"> 4 </button>
        <button tabindex="-1" data-key="5" data-button-type="number"> 5 </button>
        <button tabindex="-1" data-key="6" data-button-type="number"> 6 </button>
        <button tabindex="-1" data-key="7" data-button-type="number"> 7 </button>
        <button tabindex="-1" data-key="8" data-button-type="number"> 8 </button>
        <button tabindex="-1" data-key="9" data-button-type="number"> 9 </button>
        <button tabindex="-1" data-key="0" data-button-type="number"> 0 </button>
        <button tabindex="-1" data-key="decimal" data-button-type="decimal"> . </button>
        <button tabindex="-1" data-key="clear" data-button-type="clear"> AC </button>
        <button tabindex="-1" data-key="equal" data-button-type="equal"> = </button>
      </div>
    </div>
    `;
  return calculator;
}
