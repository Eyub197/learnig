import Calculator from "./calculator.js";
import "./calculator.test.js";

const calculator = Calculator().element;
const container = document.querySelector(".container");
container.appendChild(calculator);
