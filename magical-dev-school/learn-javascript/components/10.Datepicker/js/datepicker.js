const defaults = {
  initialDate: new Date(),
  inputElement: "",
};

const Config = {
  next: "next",
  previous: "previous",
  monthsInYear: 12,
};

export default function Datepicker(options) {
  options = Object.assign({}, defaults, options);
  const { initialDate, inputElement } = options;

  const state = {
    currentDate: initialDate,
  };

  const datepickerElement = createElement.createDatepicker(state.currentDate);
  const calendarGridElement = datepickerElement.querySelector(
    ".datepicker__date-grid",
  );
  const yearMonthElement = datepickerElement.querySelector(
    ".datepicker__year-month",
  );

  const nextButton = datepickerElement.querySelector(".datepicker__next");
  const previousButton = datepickerElement.querySelector(
    ".datepicker__previous",
  );

  const datepicker = {
    positionDatepickerElement() {
      const inputRect = inputElement.getBoundingClientRect();
      // window scrollY to not break whenver we scroll a little
      datepickerElement.style.left = `${inputRect.left + window.scrollX}px`;
      const oneRem = parseFloat(getComputedStyle(document.body).fontSize);
      datepickerElement.style.top = `${
        inputRect.bottom + window.scrollY + oneRem
      }px`;
    },

    getDateFromTimeEl(timeEl) {
      const datetime = timeEl.getAttribute("datetime");
      const [year, month, day = 1] = datetime
        .split("-")
        .map((num) => parseInt(num));

      return new Date(year, month - 1, day);
    },

    showDatepicker() {
      datepickerElement.removeAttribute("hidden");
      inputElement.dataset.state = "focus";
    },

    hideDatepicker() {
      datepickerElement.setAttribute("hidden", true);
      delete inputElement.dataset.state;
    },

    redraw() {
      calendarGridElement.innerHTML = createElement.calendarGrid(
        state.currentDate,
      ).innerHTML;

      yearMonthElement.innerHTML = createElement.calendarYearMonth(
        state.currentDate,
      ).innerHTML;
    },

    getDaysInMonth() {
      return calendarGridElement.children;
    },

    goToTargetMonth(currentDateIndex, dates, target) {
      if (target === Config.next) {
        nextButton.click();
      }

      if (target === Config.previous) {
        previousButton.click();
      }

      if (![...dates].includes([...dates][currentDateIndex])) {
        dates[dates.length - 1].focus();
        return;
      }

      dates[currentDateIndex].focus();
    },

    goToTargetYear(currentDateIndex, dates, target) {
      if (target === Config.next) {
        Array.from({ length: Config.monthsInYear }).forEach((_) =>
          nextButton.click(),
        );
      }

      if (target === Config.previous) {
        Array.from({ length: Config.monthsInYear }).forEach((_) =>
          previousButton.click(),
        );
      }

      if (![...dates].includes(dates[currentDateIndex])) {
        dates[dates.length - 1].focus();
        return;
      }

      dates[currentDateIndex].focus();
    },

    handleNextButtonClick() {
      const year = state.currentDate.getFullYear();
      const month = state.currentDate.getMonth();
      state.currentDate = new Date(year, month + 1);
      datepicker.redraw();
    },

    handlePreviousButtonClick() {
      const year = state.currentDate.getFullYear();
      const month = state.currentDate.getMonth();
      state.currentDate = new Date(year, month - 1);
      datepicker.redraw();
    },

    handleCalendarGridClick(event) {
      if (!event.target.closest("button")) return;

      const dateEl = event.target;
      const dateEls = [...calendarGridElement.children];
      const timeElem = dateEl.firstElementChild;
      const selectedDate = datepicker.getDateFromTimeEl(timeElem);

      dateEls.forEach((button) => {
        button.setAttribute("tabindex", "-1");
        button.setAttribute("aria-selected", false);
      });

      const day = helpers.toTwoDigitString(selectedDate.getDate());
      const month = helpers.toTwoDigitString(selectedDate.getMonth() + 1);
      const year = selectedDate.getFullYear();

      dateEl.setAttribute("aria-selected", true);
      dateEl.removeAttribute("tabindex");

      inputElement.value = `${day}/${month}/${year}`;
    },

    handleOutsideClick(event) {
      if (event.target.closest(".datepicker")) return;
      if (event.target.closest("input") === inputElement) return;
      datepicker.hideDatepicker();
    },

    handleTabFromInput(event) {
      if (event.shiftKey) return;
      if (event.key !== "Tab") return;
      event.preventDefault();

      const focusables = datepickerElement.querySelectorAll("button");
      const firstFocusable = focusables[0];
      firstFocusable.focus();
    },

    handleTabFromDatepicker(event) {
      if (event.key !== "Tab") return;
      if (!event.target.matches(".datepicker__date")) return;

      const focusables = helpers.getFocusableElements();
      const indexOfInput = focusables.findIndex(
        (focusable) => focusable === inputElement,
      );

      event.preventDefault();
      focusables[indexOfInput + 1].focus();
      datepicker.hideDatepicker();
    },

    handleArrowKeys(event) {
      const { key } = event;

      if (
        key !== "ArrowUp" &&
        key !== "ArrowDown" &&
        key !== "ArrowLeft" &&
        key !== "ArrowRight"
      )
        return;

      event.preventDefault();

      const dates = datepicker.getDaysInMonth();
      const { activeElement } = document;
      const daysInMonth = dates.length;
      if (activeElement === previousButton || activeElement === nextButton) {
        const selectedDate = calendarGridElement.querySelector(
          "[aria-selected='true']",
        );
        if (selectedDate) return selectedDate.focus();
        return dates[0].focus();
      }

      const currentDateIndex = [...dates].findIndex(
        (date) => date === activeElement,
      );

      if (!event.shiftKey) {
        if (key === "ArrowRight") {
          if (dates[daysInMonth - 1] === dates[currentDateIndex]) {
            nextButton.click();
            dates[0].focus();
            return;
          }
          return dates[currentDateIndex + 1].focus();
        }

        if (key === "ArrowLeft") {
          if (currentDateIndex === 0) {
            previousButton.click();
            dates[dates.length - 1].focus();
            return;
          }
          return dates[currentDateIndex - 1].focus();
        }

        if (key === "ArrowUp") {
          if (currentDateIndex < 7) {
            previousButton.click();
            const daysLeft = 7 - currentDateIndex;
            dates[dates.length - daysLeft].focus();
            return;
          }
          return dates[currentDateIndex - 7].focus();
        }

        if (key === "ArrowDown") {
          if (currentDateIndex + 7 >= daysInMonth) {
            nextButton.click();
            const daysLeft = 7 + currentDateIndex;
            dates[daysLeft - daysInMonth].focus();
            return;
          }
          return dates[currentDateIndex + 7].focus();
        }
      }

      if (event.shiftKey) {
        if (key === "ArrowLeft") {
          datepicker.goToTargetMonth(currentDateIndex, dates, Config.previous);
        }

        if (key === "ArrowRight") {
          datepicker.goToTargetMonth(currentDateIndex, dates, Config.next);
        }

        if (key === "ArrowUp") {
          datepicker.goToTargetYear(currentDateIndex, dates, Config.previous);
        }

        if (key === "ArrowDown") {
          datepicker.goToTargetYear(currentDateIndex, dates, Config.next);
        }
      }
    },
  };

  document.body.appendChild(datepickerElement);
  datepicker.positionDatepickerElement();
  datepicker.hideDatepicker();

  document.addEventListener("click", datepicker.handleOutsideClick);
  nextButton.addEventListener("click", datepicker.handleNextButtonClick);
  previousButton.addEventListener(
    "click",
    datepicker.handlePreviousButtonClick,
  );
  calendarGridElement.addEventListener("keydown", datepicker.handleArrowKeys);
  calendarGridElement.addEventListener(
    "click",
    datepicker.handleCalendarGridClick,
  );
  inputElement.addEventListener("click", datepicker.showDatepicker);
  inputElement.addEventListener("focus", datepicker.showDatepicker);
  inputElement.addEventListener("keydown", datepicker.handleTabFromInput);
  datepickerElement.addEventListener(
    "keydown",
    datepicker.handleTabFromDatepicker,
  );
}

const createElement = {
  createDatepicker(date) {
    const datepicker = document.createElement("div");
    datepicker.classList.add("datepicker");

    datepicker.innerHTML = `
        <div class="datepicker__buttons">
          <button class="datepicker__previous" type="button">
            <svg viewBox="0 0 20 20">
              <path fill="currentColor" d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" /></svg>
            </svg>
          </button>
          <button class="datepicker__next" type="button">
            <svg viewBox="0 0 20 20">
              <path fill="currentColor" d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </button>
        </div>

        <div class="datepicker__calendar">
          <div class="datepicker__year-month">
            ${createElement.calendarYearMonth(date).innerHTML}
          </div>
          <div class="datepicker__day-of-week">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
          </div>
          <div class="datepicker__date-grid">
            ${createElement.calendarGrid(date).innerHTML}
          </div>
        </div>

      `;

    return datepicker;
  },

  calendarYearMonth(date) {
    const monthsInAYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const targetYear = date.getFullYear();
    const targetMonth = date.getMonth();
    const datetimeTargetMonth = helpers.toTwoDigitString(targetMonth);

    const div = document.createElement("div");
    const timeEl = document.createElement("time");
    timeEl.setAttribute("datetime", `${targetYear}-${datetimeTargetMonth}`);
    timeEl.textContent = `${monthsInAYear[targetMonth]} ${targetYear}`;
    div.appendChild(timeEl);
    return div;
  },

  calendarGrid(date) {
    const datepickerGrid = document.createElement("div");
    datepickerGrid.classList.add("datepicker__date-grid");
    datepickerGrid.setAttribute("role", "grid");

    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, date.getMonth(), 1).getDay();
    const daysInMonth = new Date(year, date.getMonth() + 1, 0);
    const days = daysInMonth.getDate();

    for (let day = 1; day <= days; day++) {
      const datetimeDay = helpers.toTwoDigitString(day);
      const button = document.createElement("button");
      button.setAttribute("type", "button");
      button.classList.add("datepicker__date");

      if (day !== 1) {
        button.setAttribute("tabindex", "-1");
      }

      if (day === 1) {
        button.style.setProperty(
          "--first-day-of-the-month",
          firstDayOfMonth + 1,
        );
      }

      const datetimeMonth = helpers.toTwoDigitString(date.getMonth() + 1);

      button.innerHTML = `
          <time datetime="${year}-${datetimeMonth}-${datetimeDay}"> ${day}</time>
        `;

      datepickerGrid.appendChild(button);
    }

    return datepickerGrid;
  },
};

const helpers = {
  toTwoDigitString(number) {
    return number.toString().padStart(2, "0");
  },

  getFocusableElements(element = document) {
    return [
      ...element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ];
  },
};
