const date = new Date();

const monthInAYear = [
  { longname: "January", shortName: "Jan" },
  { longname: "February", shortName: "Feb" },
  { longname: "March", shortName: "Mar" },
  { longname: "April", shortName: "Apr" },
  { longname: "May", shortName: "May" },
  { longname: "June", shortName: "Jun" },
  { longname: "July", shortName: "Jul" },
  { longname: "August", shortName: "Aug" },
  { longname: "September", shortName: "Sep" },
  { longname: "Octomber", shortName: "Oct" },
  { longname: "November", shortName: "Nov" },
  { longname: "December", shortName: "Dec" },
];

const daysInAWeek = [
  { fullName: "Sunday", shortName: "Sun" },
  { fullName: "Monday", shortName: "Mon" },
  { fullName: "Tuesday", shortName: "Tue" },
  { fullName: "Wendnesday", shortName: "Wen" },
  { fullName: "Thursday", shortName: "Thur" },
  { fullName: "Friday", shortName: "Fri" },
  { fullName: "Saturday", shortName: "Sat" },
];

const daySuffic = {
  1: "st",
  2: "nd",
  3: "rd",
  4: "th",
  5: "th",
  6: "th",
  7: "th",
  8: "th",
  9: "th",
  10: "th",
  11: "th",
  12: "th",
  13: "th",
  14: "th",
  15: "th",
  16: "th",
  17: "th",
  18: "th",
  19: "th",
  20: "th",
  21: "st",
  22: "ns",
  23: "rd",
  24: "th",
  25: "th",
  26: "th",
  27: "th",
  28: "th",
  29: "th",
  30: "th",
  31: "st",
};

const firstExerciseOtherWay = date.toLocaleDateString();
const firstExercise = `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
const secondExercise = `0${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
const thirdExercise = `${date.getDate()} ${monthInAYear[date.getMonth()].shortName}, ${date.getFullYear()}`;
const fourthExercise = `${date.getDate()} ${monthInAYear[date.getMonth()].shortName}, ${daysInAWeek[date.getDay()].shortName}`;
const fifthExercise = `${daysInAWeek[date.getDay()].fullName}, ${date.getDate()} ${monthInAYear[date.getMonth()].longname}, ${date.getFullYear()}`;
const sixthExercise = `${date.getDate()}${daySuffic[date.getDate()]} ${monthInAYear[date.getMonth()].longname}, ${date.getFullYear()}`;
console.log(sixthExercise);
