const date = new Date(2019, 3, 1);

const options = { weekday: "short" };
const optionsSecond = { day: "2-digit", year: "numeric", month: "2-digit" };
const firstExercisePartOne = date.toLocaleString("en-US", options);

function getToLocaleString(options) {
  return date.toLocaleString("en-US", options);
}

const firstEx = `${firstExercisePartOne} ${getToLocaleString(optionsSecond)}`;

const secondEx = `getToLocaleString({ month: "long", year: "numeric" })}`;

const thridEx = `${getToLocaleString({ day: "numeric" })} ${getToLocaleString({ month: "long" })} ${getToLocaleString({ year: "numeric" })}`;

const fourthEx = `${getToLocaleString({ month: "short" })} ${getToLocaleString({ day: "numeric" })} ${getToLocaleString({ year: "numeric" })}`;

const fifthEx = `${getToLocaleString({ year: "numeric" })}-${getToLocaleString({ month: "2-digit" })}-${getToLocaleString({ day: "2-digit" })}`;

console.log(fifthEx);
// Jan 3 2019
// 2019-03-02
