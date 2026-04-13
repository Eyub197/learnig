const currentDate = new Date();
const targetDate = new Date(
  currentDate.getFullYear() + 1,
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

function getMonthDiffrence(endDate, startDate) {
  const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  let monthDiff = yearDiff * 12 + (endDate.getMonth() - startDate.getMonth());

  const tempDate = new Date(endDate);
  tempDate.setMonth(endDate.getMonth() - monthDiff);
  if (tempDate < startDate) monthDiff--;

  return monthDiff;
}

function getCountDown(endDate, startDate) {
  const fullMonths = getMonthDiffrence(endDate, startDate);

  const years = Math.floor(fullMonths / 12);
  const months = fullMonths % 12;

  datesAfterFullMonths.setMonth(startDate.getMonth() + fullMonths);
  const diffrence = endDate - datesAfterFullMonths;

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
    years,
    months: months,
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
