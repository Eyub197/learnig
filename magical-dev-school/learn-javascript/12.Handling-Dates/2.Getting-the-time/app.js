const date = new Date();

const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getMinutes();
const miliseconds = date.getMilliseconds();

const hoursPrefix = {
  1: "am",
  2: "am",
  3: "am",
  4: "am",
  5: "am",
  6: "am",
  7: "am",
  8: "am",
  9: "am",
  10: "am",
  11: "am",
  12: "pm",
  13: "pm",
  14: "pm",
  15: "pm",
  16: "pm",
  17: "pm",
  18: "pm",
  19: "pm",
  20: "pm",
  21: "pm",
  22: "pm",
  23: "pm",
};

console.log(`${hours}:${minutes}${hoursPrefix[hours]}`);
