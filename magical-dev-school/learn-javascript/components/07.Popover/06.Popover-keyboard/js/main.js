import Popover from "./popover.js";

const popoverTriggers = [...document.querySelectorAll(".popover-trigger")];

popoverTriggers.forEach((popoverTrigger) => {
  Popover(popoverTrigger);
});
