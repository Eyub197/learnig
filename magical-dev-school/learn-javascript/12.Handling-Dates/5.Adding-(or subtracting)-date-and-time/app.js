const date = new Date(2019, 3, 28);

const socond = 1000;
const minute = 60 * socond;
const hour = 60 * minute;
const day = 24 * hour;

const next20Days = new Date(date.getTime() + day * 20);
const prvious30days = new Date(date.getTime() - day * 30);

const arugmentNew20Days = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() + 20,
);

const arugmentNew30Days = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() - 30,
);

const tempDate = new Date(date);
tempDate.setDate(date.getDate() + 20);

const secondTempDate = new Date(date);
secondTempDate.setDate(date.getDate() - 30);

console.log(`original ${date}`);
console.log(`target date ${secondTempDate}`);
