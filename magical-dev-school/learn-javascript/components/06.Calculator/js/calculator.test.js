import Calculator from "./calculator.js";
const calculator = Calculator();
console.log(calculator);
function runTest(test) {
  calculator.pressKeys(...test.keys);
  console.assert(calculator.displayValue === test.result, test.message);
  calculator.resetCalculator();
}

function testFullCalculator() {
  calculator.pressKeys("5", "times", "9", "equal");
  calculator.resetCalculator();
  const { firstValue, operator, modifierValue } = calculator.state;
  console.assert(calculator.displayValue === "0", "Full Clear: Display is 0");
  console.assert(!firstValue, "Full Clear: No first value");
  console.assert(!operator, "Full Clear: No operator value");
  console.assert(!modifierValue, "Full Clear: No modifier value");
}

testFullCalculator();

const tests = [
  // --- Happy Path Tests ---
  // These test the basic, expected functionality of the calculator for common use cases.
  {
    message: "[Happy Path] Number key",
    keys: ["2"],
    result: "2",
  },
  {
    message: "[Happy Path] Number Number",
    keys: ["3", "5"],
    result: "35",
  },
  {
    message: "[Happy Path] Number Decimal Number",
    keys: ["4", "decimal", "5"],
    result: "4.5",
  },
  {
    message: "[Happy Path] Addition",
    keys: ["4", "plus", "5", "equal"],
    result: "9",
  },
  {
    message: "[Happy Path] Subtraction",
    keys: ["9", "minus", "5", "equal"],
    result: "4",
  },
  {
    message: "[Happy Path] Multiplication",
    keys: ["4", "times", "5", "equal"],
    result: "20",
  },
  {
    message: "[Happy Path] Division",
    keys: ["4", "0", "divide", "5", "equal"],
    result: "8",
  },

  // --- Easy Edge Cases ---
  // These test common but less frequent scenarios and simple "weird" inputs.
  {
    message: "[Easy Edge] Decimal key",
    keys: ["decimal"],
    result: "0.",
  },
  {
    message: "[Easy Edge] Number Decimal",
    keys: ["4", "decimal"],
    result: "4.",
  },
  {
    message: "[Easy Edge] Decimal Decimal",
    keys: ["decimal", "decimal"],
    result: "0.",
  },
  {
    message: "[Easy Edge] Decimal Number Decimal",
    keys: ["2", "decimal", "4", "decimal", "5"],
    result: "2.45",
  },
  {
    message: "[Easy Edge] Number Equal",
    keys: ["5", "equal"],
    result: "5",
  },
  {
    message: "[Easy Edge] Number Decimal Equal",
    keys: ["5", "decimal", "5", "equal"],
    result: "5.5",
  },
  {
    message: "[Easy Edge] Decimal Equal",
    keys: ["2", "decimal", "equal"],
    result: "2",
  },
  {
    message: "[Easy Edge] Equal",
    keys: ["equal"],
    result: "0",
  },
  {
    message: "[Easy Edge] Equal Number",
    keys: ["equal", "3"],
    result: "3",
  },
  {
    message: "[Easy Edge] Number Equal Number",
    keys: ["5", "equal", "3"],
    result: "3",
  },
  {
    message: "[Easy Edge] Equal Decimal",
    keys: ["equal", "decimal"],
    result: "0.",
  },
  {
    message: "[Easy Edge] Number, Equal, Decimal",
    keys: ["5", "equal", "decimal"],
    result: "0.",
  },
  {
    message: "[Easy Edge] Operator Decimal",
    keys: ["times", "decimal"],
    result: "0.",
  },
  {
    message: "[Easy Edge] Number Operator Decimal",
    keys: ["5", "times", "decimal"],
    result: "0.",
  },
  {
    message: "[Easy Edge] Number Operator Operator",
    keys: ["9", "times", "divide"],
    result: "9",
  },

  // --- Hard Edge Cases ---
  // These test complex sequences and state management logic to uncover deeper bugs.
  {
    // After 1+1=2, pressing + 1 = should result in 3. This tests if state is cleared properly after equals.
    message: "[Hard Edge] Calculation + Operator",
    keys: ["1", "plus", "1", "equal", "plus", "1", "equal"],
    result: "3",
  },
  {
    // For 9 - 5 -, the calculator should compute 9 - 5 and display 4, using 4 as the first number for the next operation.
    message: "[Hard Edge] Operator calculations",
    keys: ["9", "minus", "5", "minus"],
    result: "4",
  },
  {
    // Continuously pressing an operator should perform the calculation at each step.
    message: "[Hard Edge] Operator follow-up calculation",
    keys: ["1", "plus", "2", "plus", "3", "plus", "4", "plus", "5", "plus"],
    result: "15",
  },
  {
    // When the second operand is missing, the first operand should be used. 7 / = should be 7 / 7 = 1.
    message: "[Hard Edge] Number Operator Equal (e.g., 7 / =)",
    keys: ["7", "divide", "equal"],
    result: "1",
  },
  {
    // Tests if the calculator remembers the second operand (`modifierValue`) to re-apply the last operation.
    // 8-5=3, then pressing equals again should perform 3-5, resulting in -2.
    message:
      "[Hard Edge] Number Operator Number Equal Equal (repeats last operation)",
    keys: ["8", "minus", "5", "equal", "equal"],
    result: "-2",
  },
  {
    // A combination of missing operand and repeating equals. 9-9=0, then 0-9=-9.
    message:
      "[Hard Edge] Number Operator Equal Equal (repeats last operation with first number)",
    keys: ["9", "minus", "equal", "equal"],
    result: "-9",
  },
  {
    // JavaScript's division by zero results in Infinity. The calculator should reflect this.
    message: "[Hard Edge] Division by zero",
    keys: ["5", "divide", "0", "equal"],
    result: "Infinity",
  },
  {
    // JavaScript's 0 / 0 results in NaN.
    message: "[Hard Edge] Zero divided by zero",
    keys: ["0", "divide", "0", "equal"],
    result: "NaN",
  },
];

tests.forEach((test) => {
  console.log(test);
  runTest(test);
});
