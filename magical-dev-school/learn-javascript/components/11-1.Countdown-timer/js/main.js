const currentDate = new Date();
const targetDate = new Date(
  currentDate.getFullYear() + 2,
  currentDate.getMonth(),
  1,
);

function toMiliseconds(unit) {
  const seconds = 1000;
  const minutes = 60 * seconds;
  const hour = 60 * minutes;
  const day = 24 * hour;

  switch (unit) {
    case "seconds":
      return seconds;
    case "minutes":
      return minutes;
    case "hours":
      return hour;
    case "days":
      return day;
  }
}

function getDaysInMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
}

function getMonthDiffrence(endDate, startDate) {
  const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  let monthDiff = yearDiff * 12 + (endDate.getMonth() - startDate.getMonth());

  const tempDate = new Date(endDate);
  tempDate.setMonth(endDate.getMonth() - monthDiff);
  if (tempDate < startDate) monthDiff--;

  const daysDiff = Array.from({ length: monthDiff })
    .map((_, index) => {
      const tempDate = new Date(startDate);
      tempDate.setMonth(startDate.getMonth() + index);
      return getDaysInMonth(tempDate);
    })
    .reduce((acc, cur) => acc + cur, 0);

  return {
    months: monthDiff,
    days: daysDiff,
    ms: daysDiff * toMiliseconds("days"),
  };
}

function isLeapYear(year) {
  const feb29 = new Date(year, 1, 29);
  return feb29.getDate() === 29;
}

function getDaysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

function getYearDiffrence(endDate, startDate) {
  let yearDiff = endDate.getFullYear() - startDate.getFullYear();

  const tempDate = new Date(endDate);
  tempDate.setFullYear(endDate.getFullYear() - yearDiff);
  if (tempDate < startDate) yearDiff--;

  const dayDiff = Array.from({ length: yearDiff })
    .map((_, index) => {
      const tempDate = new Date(startDate);
      tempDate.setFullYear(tempDate.getFullYear() + index);

      const year = tempDate.getFullYear();
      const month = tempDate.getMonth();
      const isMarchOnwards = month > 1;

      return isMarchOnwards ? getDaysInYear(year + 1) : getDaysInYear(year);
    })
    .reduce((acc, curr) => acc + curr, 0);

  return {
    years: yearDiff,
    days: dayDiff,
    ms: dayDiff * toMiliseconds("days"),
  };
}

function getCountDown(endDate, startDate) {
  const yearDiff = getYearDiffrence(endDate, startDate);

  const tempDate = new Date(startDate);
  tempDate.setFullYear(tempDate.getFullYear() + yearDiff.years);

  const monthDiff = getMonthDiffrence(endDate, tempDate);
  const diffrence = endDate - startDate - yearDiff.ms - monthDiff.ms;

  const days = Math.floor(diffrence / toMiliseconds("days"));
  const hours = Math.floor(
    (diffrence % toMiliseconds("days")) / toMiliseconds("hours"),
  );
  const minutes = Math.floor(
    (diffrence % toMiliseconds("hours")) / toMiliseconds("minutes"),
  );
  const seconds = Math.floor(
    (diffrence % toMiliseconds("minutes")) / toMiliseconds("seconds"),
  );

  return {
    years: yearDiff.years,
    months: monthDiff.months,
    days,
    hours,
    minutes,
    seconds,
  };
}

function updateBoxes() {
  const currentDate = new Date();
  const values = getCountDown(targetDate, currentDate);

  const boxes = document.querySelectorAll(".timer__box");

  boxes.forEach((box) => {
    const unit = box.getAttribute("data-unit");
    const timerNumber = box.firstElementChild;
    timerNumber.textContent = values[unit];
  });
}

function setCountDownTarget(endDate) {
  const target = document.querySelector(".countdown__target").firstElementChild;
  target.textContent = `Time to ${endDate.toLocaleString("en-GB", { year: "numeric", day: "numeric", month: "long" })}`;
  target.dataset.datetime =
    endDate.toLocaleString("en-GB", { year: "numeric" }) +
    "-" +
    endDate.toLocaleString("en-GB", { month: "2-digit" }) +
    "-" +
    endDate.toLocaleString("en-GB", { day: "2-digit" });
}

updateBoxes();
setCountDownTarget(targetDate);

setInterval(updateBoxes, 1000);
