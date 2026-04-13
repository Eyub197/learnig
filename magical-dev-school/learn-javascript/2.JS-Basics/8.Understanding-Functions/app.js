function logger(textToLog) {
  console.log(textToLog);
}

function add(numberOne, numberTwo) {
  return numberOne + numberTwo;
}

function multiply(numberOne, numberTwo) {
  return numberOne * numberTwo;
}

logger("This is text to log");
logger(add(10, 20));
logger(multiply(10, 40));
