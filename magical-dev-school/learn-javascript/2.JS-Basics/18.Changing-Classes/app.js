const addRedClass = document.querySelector(".add");
const removeClass = document.querySelector(".remove");
const haveBlue = document.querySelector(".contains1");
const haveBlueTwo = document.querySelector(".contains2");
const mrToggle = document.querySelector(".toggle");

addRedClass.classList.add("red");
removeClass.classList.remove("remove");

checkIfContainsClass(haveBlue, "blue");
checkIfContainsClass(haveBlueTwo, "blue");

mrToggle.classList.toggle("red");

function checkIfContainsClass(element, cssClass) {
  if (!element.classList.contains(cssClass)) {
    console.log("does no contain");
    return;
  }

  console.log("contain");
}
