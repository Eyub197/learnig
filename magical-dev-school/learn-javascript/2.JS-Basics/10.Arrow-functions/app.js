const ten = () => 10;

const logger = (valueToLog) => {
  console.log(valueToLog);
};

const add = (numberOne, numberTwo) => {
  return numberOne + numberTwo;
};

const multiply = (numberOne, numberTwo) => {
  return numberOne * numberTwo;
};

logger(multiply(10, 20));
